import type { Contest, LearningAnalytics } from '@shared/domain'
import { computeLearningAnalytics, disciplineMastery, masteredTopicSet } from '../analytics/engine'
import { buildAnalyticsInput } from '../analytics/snapshot'

/** Learning Analytics do concurso ativo: coleta (snapshot) + motor puro. */
export function getLearningAnalytics(contest: Contest): LearningAnalytics {
  return computeLearningAnalytics(buildAnalyticsInput(contest))
}

export interface StrategySignals {
  disciplineMastery: Map<number, number> // domínio derivado (recência+esquecimento)
  masteredTopics: Set<number> // dominados (declarado ∪ derivado)
  topicDisciplineById: Map<number, number> // topicId → disciplineId
}

/**
 * Integração com o Strategy Engine (M16): sinais do Learning Analytics
 * calculados numa única fotografia do event log.
 */
export function getStrategySignals(contest: Contest): StrategySignals {
  const input = buildAnalyticsInput(contest)
  return {
    disciplineMastery: disciplineMastery(input),
    masteredTopics: masteredTopicSet(input),
    topicDisciplineById: new Map(input.topics.map((t) => [t.id, t.disciplineId]))
  }
}
