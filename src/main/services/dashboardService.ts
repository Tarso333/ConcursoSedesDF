import { differenceInCalendarDays, eachDayOfInterval, format, parseISO, subDays } from 'date-fns'
import { eq, sql } from 'drizzle-orm'
import type { DailyPoint, DashboardOverview, DisciplineScore } from '@shared/domain'
import { getDb } from '../db/connection'
import { answers, gamification, studySessions } from '../db/schema'
import { getDisciplinesWithStats } from '../repositories/catalogRepository'
import { getSettings } from '../repositories/settingsRepository'

const UNKNOWN_ACCURACY = 0.35 // baseline conservador para blocos sem dados

function logistic(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

function last14DaysSeries(): DailyPoint[] {
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
    .where(sql`date(${answers.createdAt}) >= ${startStr}`)
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
    .where(sql`date(${studySessions.startedAt}) >= ${startStr}`)
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

export function getDashboardOverview(): DashboardOverview {
  const db = getDb()
  const settings = getSettings()
  const stats = getDisciplinesWithStats()

  const daysUntilExam = Math.max(0, differenceInCalendarDays(parseISO(settings.examDate), new Date()))

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

  // Acurácia por bloco (para a estimativa de aprovação).
  const agg = { GERAL: { a: 0, c: 0 }, ESPECIFICO: { a: 0, c: 0 } }
  for (const d of stats) {
    agg[d.block].a += d.answeredCount
    agg[d.block].c += d.correctCount
  }
  const accGerais = agg.GERAL.a > 0 ? agg.GERAL.c / agg.GERAL.a : UNKNOWN_ACCURACY
  const accEsp = agg.ESPECIFICO.a > 0 ? agg.ESPECIFICO.c / agg.ESPECIFICO.a : UNKNOWN_ACCURACY

  // Nota esperada na objetiva (pesos reais: gerais 20 pts, específicos 80 pts).
  const expectedScore = 20 * accGerais + 80 * accEsp
  const confidence = Math.min(1, answeredCount / 120)
  const p = logistic((expectedScore - 68) / 7)
  const approvalEstimatePct = Math.max(1, Math.round(100 * p * (0.3 + 0.7 * confidence)))

  // Fortes e fracas (apenas com dados).
  const answered = stats.filter((d) => d.answeredCount > 0)
  const toScore = (d: (typeof stats)[number]): DisciplineScore => ({
    disciplineId: d.id,
    name: d.name,
    block: d.block,
    color: d.color,
    accuracy: d.accuracy,
    answeredCount: d.answeredCount
  })
  const strongDisciplines = [...answered].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map(toScore)
  const weakDisciplines = [...answered].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(toScore)

  // Minutos totais de estudo.
  const minutesRow = db
    .select({ s: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)` })
    .from(studySessions)
    .get()
  const studyMinutesTotal = Math.round(Number(minutesRow?.s ?? 0) / 60)

  // Gamificação.
  const gami = db.select().from(gamification).where(eq(gamification.id, 1)).get()

  return {
    userName: settings.userName,
    examDate: settings.examDate,
    daysUntilExam,
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
    last14Days: last14DaysSeries(),
    approvalEstimatePct
  }
}
