// Context Builder (M22) — monta o StudyContext consumindo SOMENTE as
// engines/serviços existentes (M8–M18). Nenhuma engine foi alterada; o
// builder é um CONSUMIDOR, como o Dashboard ou o Plano do Dia.
import { asc, eq } from 'drizzle-orm'
import { differenceInCalendarDays, parseISO } from 'date-fns'
import type { Contest } from '@shared/domain'
import { getDb } from '../../db/connection'
import { aiMessages, disciplines, topics } from '../../db/schema'
import { getTopicKnowledge } from '../../repositories/knowledgeRepository'
import { getErrorStats, listErrors } from '../../repositories/errorRepository'
import { getSettings } from '../../repositories/settingsRepository'
import { getLearningAnalytics } from '../../services/analyticsService'
import { getGamification } from '../../services/gamificationService'
import { getDueCards, getReviewStats } from '../../services/reviewService'
import { getMockHistory } from '../../services/simuladoService'
import { getStatsOverview } from '../../services/statsService'
import { getDailyPlan } from '../../services/strategyService'
import { matchTopic } from './match'
import type { BuildContextOptions, ContextFocus, StudyContext } from './types'

function daysUntil(examDate: string | null): number | null {
  if (!examDate) return null
  try {
    return differenceInCalendarDays(parseISO(examDate), new Date())
  } catch {
    return null
  }
}

function excerpt(body: string | null, max = 420): string {
  if (!body) return ''
  const flat = body
    .replace(/[#*`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return flat.length > max ? `${flat.slice(0, max)}…` : flat
}

/** Todos os tópicos do concurso (uma única query, via agregado disciplinas). */
function contestTopics(contestId: number): { topicId: number; name: string }[] {
  return getDb()
    .select({ topicId: topics.id, name: topics.name })
    .from(topics)
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contestId))
    .all()
}

function buildFocus(contestId: number, question: string): ContextFocus | null {
  const candidates = contestTopics(contestId)
  const match = matchTopic(question, candidates)
  if (!match) return null
  const view = getTopicKnowledge(match.topicId)
  if (!view) return null
  const children = getDb()
    .select({ name: topics.name })
    .from(topics)
    .where(eq(topics.parentId, match.topicId))
    .orderBy(asc(topics.orderIndex))
    .all()
  const rel = (
    list: { name: string; disciplineName: string; kind: ContextFocus['related'][number]['kind'] }[]
  ): ContextFocus['related'] => list.map((r) => ({ name: r.name, disciplineName: r.disciplineName, kind: r.kind }))
  return {
    disciplineName: view.disciplineName,
    topicId: view.topicId,
    topicName: view.topicName,
    status: view.status,
    subtopics: children.map((c) => c.name),
    knowledge: view.entries
      .filter((e) => e.body || e.title)
      .slice(0, 8)
      .map((e) => ({ title: e.title ?? e.kind, kind: e.kind, excerpt: excerpt(e.body) })),
    prerequisites: rel(view.connections.prerequisites),
    dependents: rel(view.connections.dependents),
    related: rel([...view.connections.next, ...view.connections.related]),
    accuracy: view.stats.answeredCount > 0 ? view.stats.accuracy : null
  }
}

export function buildStudyContext(contest: Contest, options: BuildContextOptions = {}): StudyContext {
  const contestId = contest.id
  const settings = getSettings()
  const gami = getGamification()
  const stats = getStatsOverview(contest)
  const plan = getDailyPlan(contest)
  const reviewStats = getReviewStats(contestId)
  const dueSample = getDueCards(contestId, 5)
  const errorStats = getErrorStats(contestId)
  const recentErrors = listErrors(contestId, { status: 'ABERTO' }).slice(0, 5)
  const mocks = getMockHistory(contestId)

  const analytics = options.includeHeavyAnalytics
    ? (() => {
        const a = getLearningAnalytics(contest)
        return {
          globalTrend: a.globalTrend,
          profile: a.profile.map((p) => ({ label: p.label, classification: p.classification })),
          indicators: a.indicators
            .filter((i) => i.value != null)
            .slice(0, 6)
            .map((i) => ({ label: i.label, value: i.value, unit: i.unit }))
        }
      })()
    : { globalTrend: 'ESTAVEL', profile: [], indicators: [] }

  const history = getDb()
    .select({ role: aiMessages.role, content: aiMessages.content })
    .from(aiMessages)
    .where(eq(aiMessages.contestId, contestId))
    .orderBy(asc(aiMessages.id))
    .all()
    .slice(-(options.historyLimit ?? 8))

  return {
    generatedAt: new Date().toISOString(),
    userName: settings.userName || null,
    contest: {
      name: contest.name,
      role: contest.role,
      board: contest.board,
      examDate: contest.examDate,
      daysUntilExam: daysUntil(contest.examDate),
      city: contest.city
    },
    focus: options.question ? buildFocus(contestId, options.question) : null,
    performance: {
      totalAnswered: stats.totalAnswered,
      accuracy: stats.totalAnswered > 0 ? stats.accuracy : null,
      worstDisciplines: stats.worstDisciplines.slice(0, 3).map((d) => ({ name: d.name, accuracy: d.accuracy })),
      bestDisciplines: stats.bestDisciplines.slice(0, 3).map((d) => ({ name: d.name, accuracy: d.accuracy }))
    },
    analytics,
    plan: {
      availableMinutes: plan.availableMinutes,
      topPriority: plan.ranking[0]?.name ?? null,
      coveragePct: plan.forecast.editalCoveragePct,
      items: plan.items.slice(0, 5).map((i) => ({
        discipline: i.disciplineName,
        activity: i.activity,
        minutes: i.minutes,
        reason: i.reasons[0] ?? ''
      }))
    },
    reviews: {
      dueNow: reviewStats.dueNow,
      sample: dueSample.map((c) => ({ front: c.front, deckName: c.deckName }))
    },
    errors: {
      open: errorStats.open,
      recent: recentErrors.map((e) => ({
        questionId: e.questionId,
        statement: excerpt(e.statement, 160),
        disciplineName: e.disciplineName
      }))
    },
    mocks: {
      count: mocks.length,
      lastScorePct: mocks[0]?.scorePct ?? null
    },
    goals: {
      dailyGoalMinutes: settings.dailyGoalMinutes,
      dailyGoalQuestions: settings.dailyGoalQuestions,
      answeredToday: gami.answeredToday,
      streakDays: gami.streakDays
    },
    history
  }
}
