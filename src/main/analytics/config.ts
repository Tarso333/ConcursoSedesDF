// Configuração do Learning Analytics Engine — todos os limiares e janelas
// num único objeto. O modelo de domínio derivado está documentado em
// ANALYTICS.md; ajustar comportamento = editar este arquivo.

export interface AnalyticsConfig {
  /** Meia-vida (dias) do peso de recência de uma resposta. */
  recencyHalfLifeDays: number
  /** Meia-vida (dias) da retenção quando o tópico fica sem prática. */
  retentionHalfLifeDays: number
  /** Piso do fator de retenção (nunca zera o domínio já construído). */
  retentionFloor: number
  /** Nº de respostas para confiança plena no domínio (fator de volume). */
  volumeTarget: number
  /** Domínio (0..100) a partir do qual um tópico é considerado dominado. */
  masteredThreshold: number
  /** Variação (pp) para classificar tendência melhorando/piorando. */
  trendDeltaPp: number
  /** Janela (dias) da comparação de tendência. */
  trendWindowDays: number
  /** Respostas mínimas num tópico para valer como "coberto" no edital. */
  coverageMinAnswers: number
  /** Clamp do tempo por questão (segundos) contra outliers. */
  clampSeconds: { min: number; max: number }
  /** Janelas da taxa de acerto móvel. */
  rollingWindows: number[]
  /** Limiares do Learning Profile. */
  profile: {
    fastLearnerDays: number
    slowLearnerDays: number
    highRetention: number
    lowRetention: number
    fastSolverSeconds: number
    slowSolverSeconds: number
    reviewsPerDayLow: number
    reviewsPerDayHigh: number
    consistentFrequency: number
    irregularFrequency: number
  }
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  recencyHalfLifeDays: 21,
  retentionHalfLifeDays: 30,
  retentionFloor: 0.55,
  volumeTarget: 5,
  masteredThreshold: 70,
  trendDeltaPp: 5,
  trendWindowDays: 14,
  coverageMinAnswers: 3,
  clampSeconds: { min: 5, max: 300 },
  rollingWindows: [7, 15, 30],
  profile: {
    fastLearnerDays: 12,
    slowLearnerDays: 28,
    highRetention: 75,
    lowRetention: 45,
    fastSolverSeconds: 60,
    slowSolverSeconds: 150,
    reviewsPerDayLow: 0.5,
    reviewsPerDayHigh: 4,
    consistentFrequency: 0.7,
    irregularFrequency: 0.3
  }
}
