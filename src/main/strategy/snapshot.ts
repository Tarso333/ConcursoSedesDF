// Snapshot do Motor de Estratégia — única camada com acesso a dados.
// Fotografa o estado do usuário/concurso e entrega um StrategyInput puro
// para o engine (que é 100% testável sem banco).
import { differenceInCalendarDays, format, parseISO } from 'date-fns'
import { and, count, eq, sql } from 'drizzle-orm'
import type { Contest, DisciplineBlock } from '@shared/domain'
import { getDb } from '../db/connection'
import { answers, contests, disciplines, questions, topicProgress, topics } from '../db/schema'
import { getDisciplinesWithStats } from '../repositories/catalogRepository'
import { getDisciplineMastery } from '../services/analyticsService'
import { getReviewStats } from '../services/reviewService'
import type { StrategyDisciplineInput, StrategyInput } from './engine'

interface AccuracyRow {
  disciplineId: number
  answered: number
  correct: number
}

function accuracyByDiscipline(contestId: number, whereExtra: ReturnType<typeof sql>): Map<number, AccuracyRow> {
  const db = getDb()
  const map = new Map<number, AccuracyRow>()
  for (const r of db
    .select({
      disciplineId: questions.disciplineId,
      answered: count(),
      correct: sql<number>`coalesce(sum(case when ${answers.isCorrect} then 1 else 0 end), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(and(eq(disciplines.contestId, contestId), whereExtra))
    .groupBy(questions.disciplineId)
    .all()) {
    map.set(r.disciplineId, {
      disciplineId: r.disciplineId,
      answered: Number(r.answered),
      correct: Number(r.correct)
    })
  }
  return map
}

export function buildStrategyInput(contest: Contest, availableMinutes: number): StrategyInput {
  const db = getDb()
  const stats = getDisciplinesWithStats(contest.id)
  // Integração M17: o domínio usado na previsão vem do Learning Analytics
  // (modelo com recência + esquecimento), não da acurácia bruta.
  const analyticsMastery = getDisciplineMastery(contest)

  // Desempenho recente (7d) × anterior (8–30d) — tendência de evolução.
  const recent = accuracyByDiscipline(contest.id, sql`date(${answers.createdAt}) >= date('now', '-7 day')`)
  const previous = accuracyByDiscipline(
    contest.id,
    sql`date(${answers.createdAt}) BETWEEN date('now', '-30 day') AND date('now', '-8 day')`
  )
  // Histórico de simulados.
  const sims = accuracyByDiscipline(contest.id, sql`${answers.source} = 'SIMULADO'`)

  // Dias desde a última atividade (respostas) por disciplina.
  const lastStudy = new Map<number, number>()
  for (const r of db
    .select({
      disciplineId: questions.disciplineId,
      days: sql<number>`cast(julianday('now') - julianday(max(${answers.createdAt})) as integer)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .groupBy(questions.disciplineId)
    .all()) {
    lastStudy.set(r.disciplineId, Math.max(0, Number(r.days)))
  }

  // Domínio declarado (status dos tópicos) por disciplina.
  const topicAgg = new Map<number, { total: number; dominado: number; revisar: number }>()
  for (const r of db
    .select({
      disciplineId: topics.disciplineId,
      status: sql<string>`coalesce(${topicProgress.status}, 'NAO_ESTUDADO')`,
      c: count()
    })
    .from(topics)
    .leftJoin(topicProgress, eq(topicProgress.topicId, topics.id))
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .groupBy(topics.disciplineId, sql`coalesce(${topicProgress.status}, 'NAO_ESTUDADO')`)
    .all()) {
    const agg = topicAgg.get(r.disciplineId) ?? { total: 0, dominado: 0, revisar: 0 }
    agg.total += Number(r.c)
    if (r.status === 'DOMINADO') agg.dominado += Number(r.c)
    if (r.status === 'REVISAR') agg.revisar += Number(r.c)
    topicAgg.set(r.disciplineId, agg)
  }

  // Índice de dificuldade (mix do banco de questões).
  const difficulty = new Map<number, number>()
  for (const r of db
    .select({
      disciplineId: questions.disciplineId,
      idx: sql<number>`avg(case ${questions.difficulty} when 'FACIL' then 0.2 when 'MEDIO' then 0.5 else 1.0 end)`
    })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .groupBy(questions.disciplineId)
    .all()) {
    difficulty.set(r.disciplineId, Number(r.idx))
  }

  // Conhecimento disponível por disciplina.
  const knowledge = new Map<number, number>()
  for (const r of db
    .select({ disciplineId: topics.disciplineId, c: count() })
    .from(topics)
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(
      and(
        eq(disciplines.contestId, contest.id),
        sql`EXISTS (SELECT 1 FROM knowledge_entries ke WHERE ke.topic_id = ${topics.id})`
      )
    )
    .groupBy(topics.disciplineId)
    .all()) {
    knowledge.set(r.disciplineId, Number(r.c))
  }

  // Sinergia entre concursos: em quantos concursos ativos o slug aparece.
  const occurrences = new Map<string, number>()
  for (const r of db
    .select({ slug: disciplines.slug, c: sql<number>`count(distinct ${disciplines.contestId})` })
    .from(disciplines)
    .groupBy(disciplines.slug)
    .all()) {
    occurrences.set(r.slug, Number(r.c))
  }
  const slugById = new Map<number, string>()
  for (const r of db
    .select({ id: disciplines.id, slug: disciplines.slug })
    .from(disciplines)
    .where(eq(disciplines.contestId, contest.id))
    .all()) {
    slugById.set(r.id, r.slug)
  }
  const activeContestCount = db.select({ c: count() }).from(contests).get()?.c ?? 1

  // Meta de aprovação: gap de cada bloco em relação ao corte de eliminação.
  const blockAcc = new Map<DisciplineBlock, { a: number; c: number }>()
  for (const d of stats) {
    const agg = blockAcc.get(d.block) ?? { a: 0, c: 0 }
    agg.a += d.answeredCount
    agg.c += d.correctCount
    blockAcc.set(d.block, agg)
  }
  const blockCutoffGap: Partial<Record<DisciplineBlock, number>> = {}
  for (const b of contest.examConfig?.blocks ?? []) {
    const agg = blockAcc.get(b.block)
    const acc = agg && agg.a > 0 ? agg.c / agg.a : 0.35
    const cutoff = b.minScorePct / 100
    if (cutoff > 0 && acc < cutoff) blockCutoffGap[b.block] = (cutoff - acc) / cutoff
  }

  const strategyDisciplines: StrategyDisciplineInput[] = stats.map((d) => {
    const rec = recent.get(d.id)
    const prev = previous.get(d.id)
    const sim = sims.get(d.id)
    const tAgg = topicAgg.get(d.id)
    return {
      id: d.id,
      name: d.name,
      color: d.color,
      block: d.block,
      weight: d.weight,
      examQuestionEstimate: d.examQuestionEstimate,
      orderIndex: d.orderIndex,
      questionCount: d.questionsCount,
      answeredCount: d.answeredCount,
      correctCount: d.correctCount,
      masteryPct: analyticsMastery.get(d.id) ?? d.masteryPct,
      recentAccuracy: rec && rec.answered >= 3 ? rec.correct / rec.answered : null,
      previousAccuracy: prev && prev.answered >= 3 ? prev.correct / prev.answered : null,
      simAccuracy: sim && sim.answered > 0 ? sim.correct / sim.answered : null,
      simAnswered: sim?.answered ?? 0,
      daysSinceLastStudy: lastStudy.get(d.id) ?? null,
      topicCount: tAgg?.total ?? d.topicsCount,
      topicsDominado: tAgg?.dominado ?? 0,
      topicsRevisar: tAgg?.revisar ?? 0,
      difficultyIndex: difficulty.get(d.id) ?? 0.5,
      knowledgeCount: knowledge.get(d.id) ?? 0,
      occurrenceCount: occurrences.get(slugById.get(d.id) ?? '') ?? 1
    }
  })

  return {
    todayIso: format(new Date(), 'yyyy-MM-dd'),
    daysUntilExam: contest.examDate
      ? Math.max(0, differenceInCalendarDays(parseISO(contest.examDate), new Date()))
      : null,
    availableMinutes,
    activeContestCount,
    blockCutoffGap,
    dueReviewCards: getReviewStats(contest.id).dueNow,
    disciplines: strategyDisciplines
  }
}
