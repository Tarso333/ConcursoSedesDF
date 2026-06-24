import { count, eq, sql } from 'drizzle-orm'
import type { Achievement, GamificationProgress } from '@shared/domain'
import { getDb } from '../db/connection'
import { achievements, answers, decks, gamification, mockExams, settings, srsReviews } from '../db/schema'

const XP_PER_LEVEL = 120

interface Stats {
  totalAnswers: number
  simulados: number
  maxSimScore: number
  reviews: number
  decks: number
  streak: number
}

interface AchievementDef {
  code: string
  name: string
  description: string
  icon: string
  earned: (s: Stats) => boolean
}

const CATALOG: AchievementDef[] = [
  { code: 'primeira-questao', name: 'Primeiro passo', description: 'Resolveu sua primeira questão', icon: 'Footprints', earned: (s) => s.totalAnswers >= 1 },
  { code: 'cem-questoes', name: 'Maratonista', description: '100 questões resolvidas', icon: 'Activity', earned: (s) => s.totalAnswers >= 100 },
  { code: 'mil-questoes', name: 'Incansável', description: '1.000 questões resolvidas', icon: 'Flame', earned: (s) => s.totalAnswers >= 1000 },
  { code: 'primeiro-simulado', name: 'Hora do teste', description: 'Concluiu um simulado', icon: 'ClipboardCheck', earned: (s) => s.simulados >= 1 },
  { code: 'nota-70', name: 'Linha de corte', description: '70% ou mais em um simulado', icon: 'Target', earned: (s) => s.maxSimScore >= 70 },
  { code: 'streak-7', name: 'Uma semana firme', description: '7 dias seguidos de estudo', icon: 'CalendarCheck', earned: (s) => s.streak >= 7 },
  { code: 'streak-30', name: 'Hábito de aço', description: '30 dias seguidos de estudo', icon: 'Trophy', earned: (s) => s.streak >= 30 },
  { code: 'cem-revisoes', name: 'Memória de elefante', description: '100 revisões concluídas', icon: 'Brain', earned: (s) => s.reviews >= 100 },
  { code: 'primeiro-deck', name: 'Colecionador', description: 'Criou seu primeiro deck', icon: 'Layers', earned: (s) => s.decks >= 1 }
]

const nowExpr = sql`(datetime('now'))` as unknown as string

function ensureRow(): void {
  const db = getDb()
  const r = db.select({ id: gamification.id }).from(gamification).where(eq(gamification.id, 1)).get()
  if (!r) db.insert(gamification).values({ id: 1 }).run()
}

function gatherStats(): Stats {
  const db = getDb()
  const totalAnswers = db.select({ c: count() }).from(answers).get()?.c ?? 0
  const simulados = db.select({ c: count() }).from(mockExams).where(eq(mockExams.status, 'CONCLUIDO')).get()?.c ?? 0
  const maxSimScore = db.select({ m: sql<number>`COALESCE(MAX(${mockExams.score}), 0)` }).from(mockExams).get()?.m ?? 0
  const reviews = db.select({ c: count() }).from(srsReviews).get()?.c ?? 0
  const decksCount = db.select({ c: count() }).from(decks).get()?.c ?? 0
  const g = db.select().from(gamification).where(eq(gamification.id, 1)).get()
  return { totalAnswers, simulados, maxSimScore, reviews, decks: decksCount, streak: g?.streakDays ?? 0 }
}

function evaluateAchievements(s: Stats): void {
  const db = getDb()
  const existing = new Set(db.select({ code: achievements.code }).from(achievements).all().map((r) => r.code))
  for (const a of CATALOG) {
    if (a.earned(s) && !existing.has(a.code)) {
      db.insert(achievements)
        .values({ code: a.code, name: a.name, description: a.description, icon: a.icon, unlockedAt: nowExpr })
        .run()
    }
  }
}

function registerActivity(): void {
  ensureRow()
  const db = getDb()
  const g = db.select().from(gamification).where(eq(gamification.id, 1)).get()
  if (!g) return
  const today = new Date().toISOString().slice(0, 10)
  if (g.lastActiveDate === today) return
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
  const streak = g.lastActiveDate === yesterday ? g.streakDays + 1 : 1
  db.update(gamification)
    .set({
      streakDays: streak,
      longestStreak: Math.max(g.longestStreak, streak),
      lastActiveDate: today,
      updatedAt: nowExpr
    })
    .where(eq(gamification.id, 1))
    .run()
}

function addXp(amount: number): void {
  ensureRow()
  const db = getDb()
  const g = db.select().from(gamification).where(eq(gamification.id, 1)).get()
  if (!g) return
  const xp = g.xp + amount
  db.update(gamification)
    .set({ xp, level: 1 + Math.floor(xp / XP_PER_LEVEL), updatedAt: nowExpr })
    .where(eq(gamification.id, 1))
    .run()
}

export function awardForAnswer(isCorrect: boolean): void {
  addXp(isCorrect ? 10 : 3)
  registerActivity()
  evaluateAchievements(gatherStats())
}

export function awardForReview(): void {
  addXp(5)
  registerActivity()
  evaluateAchievements(gatherStats())
}

export function awardForSimulado(correct: number, isOficial: boolean): void {
  addXp(correct * 5 + (isOficial ? 50 : 20))
  registerActivity()
  evaluateAchievements(gatherStats())
}

export function getGamification(): GamificationProgress {
  ensureRow()
  const db = getDb()
  const g = db.select().from(gamification).where(eq(gamification.id, 1)).get()
  const stats = gatherStats()
  evaluateAchievements(stats)
  const unlocked = new Map(db.select().from(achievements).all().map((r) => [r.code, r.unlockedAt]))
  const list: Achievement[] = CATALOG.map((a) => ({
    code: a.code,
    name: a.name,
    description: a.description,
    icon: a.icon,
    unlocked: unlocked.has(a.code),
    unlockedAt: unlocked.get(a.code) ?? null
  }))
  const today = new Date().toISOString().slice(0, 10)
  const answeredToday = db.select({ c: count() }).from(answers).where(sql`date(${answers.createdAt}) = ${today}`).get()?.c ?? 0
  const dailyGoal = db.select({ q: settings.dailyGoalQuestions }).from(settings).where(eq(settings.id, 1)).get()
  const xp = g?.xp ?? 0
  const level = g?.level ?? 1
  return {
    xp,
    level,
    xpIntoLevel: xp - (level - 1) * XP_PER_LEVEL,
    xpForNextLevel: XP_PER_LEVEL,
    streakDays: g?.streakDays ?? 0,
    longestStreak: g?.longestStreak ?? 0,
    dailyGoalQuestions: dailyGoal?.q ?? 30,
    answeredToday,
    achievements: list
  }
}
