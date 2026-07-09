import type { Contest, LearningAnalytics } from '@shared/domain'
import { computeLearningAnalytics, disciplineMastery } from '../analytics/engine'
import { buildAnalyticsInput } from '../analytics/snapshot'

/** Learning Analytics do concurso ativo: coleta (snapshot) + motor puro. */
export function getLearningAnalytics(contest: Contest): LearningAnalytics {
  return computeLearningAnalytics(buildAnalyticsInput(contest))
}

/**
 * Integração com o Strategy Engine (M16): domínio por disciplina derivado
 * pelo modelo do analytics (recência + esquecimento), usado na previsão.
 */
export function getDisciplineMastery(contest: Contest): Map<number, number> {
  return disciplineMastery(buildAnalyticsInput(contest))
}
