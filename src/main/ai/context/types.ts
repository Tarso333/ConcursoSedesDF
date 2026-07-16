// StudyContext — o contexto FORTEMENTE TIPADO enviado a qualquer IA (M22).
// Montado EXCLUSIVAMENTE com dados produzidos pelas engines existentes
// (Multi Contest, Knowledge, Relationship, Analytics, Strategy, FSRS, erros,
// simulados, metas). Nenhuma consulta a tabelas fora do necessário.
import type { KnowledgeKind, RelationKind, TopicStatus } from '@shared/domain'

export interface ContextContest {
  name: string
  role: string | null
  board: string | null
  examDate: string | null
  daysUntilExam: number | null
  city: string | null
}

/** Foco no tópico que casou com a pergunta (Knowledge + Relationship). */
export interface ContextFocus {
  disciplineName: string
  topicId: number
  topicName: string
  status: TopicStatus
  subtopics: string[]
  knowledge: { title: string; kind: KnowledgeKind; excerpt: string }[]
  prerequisites: { name: string; disciplineName: string; kind: RelationKind }[]
  dependents: { name: string; disciplineName: string; kind: RelationKind }[]
  related: { name: string; disciplineName: string; kind: RelationKind }[]
  accuracy: number | null // 0..1 no tópico
}

export interface ContextPerformance {
  totalAnswered: number
  accuracy: number | null // 0..1 geral
  worstDisciplines: { name: string; accuracy: number }[]
  bestDisciplines: { name: string; accuracy: number }[]
}

export interface ContextAnalytics {
  globalTrend: string
  profile: { label: string; classification: string }[]
  indicators: { label: string; value: number | null; unit: string }[]
}

export interface ContextPlan {
  availableMinutes: number
  topPriority: string | null
  coveragePct: number
  items: { discipline: string; activity: string; minutes: number; reason: string }[]
}

export interface ContextReviews {
  dueNow: number
  sample: { front: string; deckName: string }[]
}

export interface ContextErrors {
  open: number
  recent: { questionId: number; statement: string; disciplineName: string }[]
}

export interface ContextMocks {
  count: number
  lastScorePct: number | null
}

export interface ContextGoals {
  dailyGoalMinutes: number
  dailyGoalQuestions: number
  answeredToday: number
  streakDays: number
}

export interface ContextHistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface StudyContext {
  generatedAt: string
  userName: string | null
  contest: ContextContest
  focus: ContextFocus | null
  performance: ContextPerformance
  analytics: ContextAnalytics
  plan: ContextPlan
  reviews: ContextReviews
  errors: ContextErrors
  mocks: ContextMocks
  goals: ContextGoals
  history: ContextHistoryMessage[]
}

/** Opções de montagem (a pergunta orienta o foco por tópico). */
export interface BuildContextOptions {
  question?: string
  historyLimit?: number
  includeHeavyAnalytics?: boolean // Learning Analytics completo (replay)
}
