import { eachDayOfInterval, format, subDays } from 'date-fns'
import { and, count, eq, sql } from 'drizzle-orm'
import type {
  Contest,
  DailyPoint,
  Difficulty,
  DisciplineScore,
  RadarPoint,
  StatsOverview
} from '@shared/domain'
import { getDb } from '../db/connection'
import { answers, disciplines, questions } from '../db/schema'
import { getDisciplinesWithStats } from '../repositories/catalogRepository'

export function getStatsOverview(contest: Contest): StatsOverview {
  const db = getDb()
  const stats = getDisciplinesWithStats(contest.id)
  const answeredDiscs = stats.filter((d) => d.answeredCount > 0)
  const totalAnswered = stats.reduce((s, d) => s + d.answeredCount, 0)
  const totalCorrect = stats.reduce((s, d) => s + d.correctCount, 0)
  const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0

  const diffRows = db
    .select({
      difficulty: questions.difficulty,
      answered: count(),
      correct: sql<number>`COALESCE(SUM(CASE WHEN ${answers.isCorrect} THEN 1 ELSE 0 END), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .groupBy(questions.difficulty)
    .all()
  const byDifficulty = (['FACIL', 'MEDIO', 'DIFICIL'] as Difficulty[]).map((d) => {
    const r = diffRows.find((x) => x.difficulty === d)
    const a = r ? Number(r.answered) : 0
    const c = r ? Number(r.correct) : 0
    return { difficulty: d, answered: a, accuracy: a > 0 ? c / a : 0 }
  })

  const radar: RadarPoint[] = stats.map((d) => ({
    discipline: d.name,
    accuracy: Math.round(d.accuracy * 100),
    block: d.block
  }))

  const start = subDays(new Date(), 29)
  const startStr = format(start, 'yyyy-MM-dd')
  const dmap = new Map<string, { answered: number; correct: number }>()
  for (const r of db
    .select({
      day: sql<string>`date(${answers.createdAt})`,
      answered: sql<number>`count(*)`,
      correct: sql<number>`COALESCE(SUM(CASE WHEN ${answers.isCorrect} THEN 1 ELSE 0 END), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(and(eq(disciplines.contestId, contest.id), sql`date(${answers.createdAt}) >= ${startStr}`))
    .groupBy(sql`date(${answers.createdAt})`)
    .all()) {
    dmap.set(r.day, { answered: Number(r.answered), correct: Number(r.correct) })
  }
  const daily: DailyPoint[] = eachDayOfInterval({ start, end: new Date() }).map((d) => {
    const k = format(d, 'yyyy-MM-dd')
    const a = dmap.get(k) ?? { answered: 0, correct: 0 }
    return { date: k, answered: a.answered, correct: a.correct, studyMinutes: 0 }
  })

  // Prontidão ponderada pela estrutura da prova (exam_config); sem estrutura,
  // usa a acurácia geral.
  const blockAcc = new Map<string, { a: number; c: number }>()
  for (const d of stats) {
    const agg = blockAcc.get(d.block) ?? { a: 0, c: 0 }
    agg.a += d.answeredCount
    agg.c += d.correctCount
    blockAcc.set(d.block, agg)
  }
  const exam = contest.examConfig
  let readinessPct: number
  if (exam && exam.blocks.length > 0) {
    const maxPoints = exam.blocks.reduce((s, b) => s + b.questions * b.weightPerQuestion, 0) || 1
    const weighted = exam.blocks.reduce((s, b) => {
      const agg = blockAcc.get(b.block)
      const acc = agg && agg.a > 0 ? agg.c / agg.a : 0.35
      return s + acc * b.questions * b.weightPerQuestion
    }, 0)
    readinessPct = Math.round((weighted / maxPoints) * 100)
  } else {
    readinessPct = Math.round(accuracy * 100)
  }

  const toScore = (d: (typeof stats)[number]): DisciplineScore => ({
    disciplineId: d.id,
    name: d.name,
    block: d.block,
    color: d.color,
    accuracy: d.accuracy,
    answeredCount: d.answeredCount
  })

  return {
    totalAnswered,
    accuracy,
    byDifficulty,
    radar,
    daily,
    readinessPct,
    bestDisciplines: [...answeredDiscs].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5).map(toScore),
    worstDisciplines: [...answeredDiscs].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5).map(toScore)
  }
}
