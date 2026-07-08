import { differenceInCalendarDays, eachDayOfInterval, format, parseISO, subDays } from 'date-fns'
import { and, eq, sql } from 'drizzle-orm'
import type { Contest, DailyPoint, DashboardOverview, DisciplineScore } from '@shared/domain'
import { getDb } from '../db/connection'
import { answers, disciplines, gamification, questions, studySessions } from '../db/schema'
import { getDisciplinesWithStats } from '../repositories/catalogRepository'
import { getSettings } from '../repositories/settingsRepository'

const UNKNOWN_ACCURACY = 0.35 // baseline conservador para blocos sem dados

function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

function last14DaysSeries(contestId: number): DailyPoint[] {
  const db = getDb()
  const today = new Date()
  const start = subDays(today, 13)
  const startStr = format(start, 'yyyy-MM-dd')

  const answersByDay = new Map<string, { answered: number; correct: number }>()
  for (const r of db
    .select({
      day: sql<string>`date(${answers.createdAt})`,
      answered: sql<number>`count(*)`,
      correct: sql<number>`coalesce(sum(case when ${answers.isCorrect} then 1 else 0 end), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(and(eq(disciplines.contestId, contestId), sql`date(${answers.createdAt}) >= ${startStr}`))
    .groupBy(sql`date(${answers.createdAt})`)
    .all()) {
    answersByDay.set(r.day, { answered: Number(r.answered), correct: Number(r.correct) })
  }

  const minutesByDay = new Map<string, number>()
  for (const r of db
    .select({
      day: sql<string>`date(${studySessions.startedAt})`,
      seconds: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)`
    })
    .from(studySessions)
    .where(
      and(eq(studySessions.contestId, contestId), sql`date(${studySessions.startedAt}) >= ${startStr}`)
    )
    .groupBy(sql`date(${studySessions.startedAt})`)
    .all()) {
    minutesByDay.set(r.day, Math.round(Number(r.seconds) / 60))
  }

  return eachDayOfInterval({ start, end: today }).map((d) => {
    const key = format(d, 'yyyy-MM-dd')
    const a = answersByDay.get(key) ?? { answered: 0, correct: 0 }
    return { date: key, answered: a.answered, correct: a.correct, studyMinutes: minutesByDay.get(key) ?? 0 }
  })
}

export function getDashboardOverview(contest: Contest): DashboardOverview {
  const db = getDb()
  const settings = getSettings()
  const stats = getDisciplinesWithStats(contest.id)

  const daysUntilExam = contest.examDate
    ? Math.max(0, differenceInCalendarDays(parseISO(contest.examDate), new Date()))
    : 0

  // Totais.
  const totalQuestions = stats.reduce((s, d) => s + d.questionsCount, 0)
  const answeredCount = stats.reduce((s, d) => s + d.answeredCount, 0)
  const correctCount = stats.reduce((s, d) => s + d.correctCount, 0)
  const wrongCount = answeredCount - correctCount
  const accuracy = answeredCount > 0 ? correctCount / answeredCount : 0

  // Progresso do edital: média de domínio ponderada pela estimativa de questões.
  const totalWeight = stats.reduce((s, d) => s + d.examQuestionEstimate, 0) || 1
  const editalProgressPct = Math.round(
    stats.reduce((s, d) => s + d.masteryPct * d.examQuestionEstimate, 0) / totalWeight
  )

  // Acurácia por bloco (para a estimativa de aprovação, se houver exam_config).
  const blockAcc = new Map<string, { a: number; c: number }>()
  for (const d of stats) {
    const agg = blockAcc.get(d.block) ?? { a: 0, c: 0 }
    agg.a += d.answeredCount
    agg.c += d.correctCount
    blockAcc.set(d.block, agg)
  }
  const accuracyOfBlock = (block: string): number => {
    const agg = blockAcc.get(block)
    return agg && agg.a > 0 ? agg.c / agg.a : UNKNOWN_ACCURACY
  }

  // Estimativa de aprovação derivada do exam_config (dados do concurso).
  const exam = contest.examConfig
  let approvalEstimatePct: number
  let heavyBlockLabel: string | null = null
  let heavyBlockSharePct: number | null = null

  if (exam && exam.blocks.length > 0) {
    const maxPoints = exam.blocks.reduce((s, b) => s + b.questions * b.weightPerQuestion, 0) || 1
    const expectedScore = exam.blocks.reduce(
      (s, b) => s + accuracyOfBlock(b.block) * b.questions * b.weightPerQuestion,
      0
    )
    const target = ((exam.approvalTargetPct ?? 68) / 100) * maxPoints
    const confidence = Math.min(1, answeredCount / (totalQuestions > 0 ? Math.min(120, totalQuestions) : 120))
    const p = logistic((expectedScore - target) / (maxPoints * 0.07))
    approvalEstimatePct = Math.max(1, Math.round(100 * p * (0.3 + 0.7 * confidence)))

    if (exam.blocks.length > 1) {
      const heaviest = [...exam.blocks].sort(
        (a, b) => b.questions * b.weightPerQuestion - a.questions * a.weightPerQuestion
      )[0]
      heavyBlockLabel = heaviest.label
      heavyBlockSharePct = Math.round(((heaviest.questions * heaviest.weightPerQuestion) / maxPoints) * 100)
    }
  } else {
    // Sem estrutura de prova cadastrada: estimativa a partir da acurácia geral.
    const confidence = Math.min(1, answeredCount / 120)
    const p = logistic((accuracy * 100 - 68) / 7)
    approvalEstimatePct = Math.max(1, Math.round(100 * p * (0.3 + 0.7 * confidence)))
  }

  // Fortes e fracas (apenas com dados).
  const answeredDiscs = stats.filter((d) => d.answeredCount > 0)
  const toScore = (d: (typeof stats)[number]): DisciplineScore => ({
    disciplineId: d.id,
    name: d.name,
    block: d.block,
    color: d.color,
    accuracy: d.accuracy,
    answeredCount: d.answeredCount
  })
  const strongDisciplines = [...answeredDiscs].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map(toScore)
  const weakDisciplines = [...answeredDiscs].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(toScore)

  // Minutos totais de estudo (do concurso ativo).
  const minutesRow = db
    .select({ s: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)` })
    .from(studySessions)
    .where(eq(studySessions.contestId, contest.id))
    .get()
  const studyMinutesTotal = Math.round(Number(minutesRow?.s ?? 0) / 60)

  // Gamificação (do usuário — global).
  const gami = db.select().from(gamification).where(eq(gamification.id, 1)).get()

  return {
    userName: settings.userName,
    contestName: contest.name,
    boardName: contest.board,
    examDate: contest.examDate,
    daysUntilExam,
    heavyBlockLabel,
    heavyBlockSharePct,
    editalProgressPct,
    totalQuestions,
    answeredCount,
    correctCount,
    wrongCount,
    accuracy,
    studyMinutesTotal,
    studyStreakDays: gami?.streakDays ?? 0,
    xp: gami?.xp ?? 0,
    level: gami?.level ?? 1,
    strongDisciplines,
    weakDisciplines,
    last14Days: last14DaysSeries(contest.id),
    approvalEstimatePct
  }
}
