// Learning Analytics Engine — NÚCLEO PURO (sem DB/Electron/rede/relógio).
// Recebe o event log fotografado (AnalyticsInput) e deriva TODAS as métricas
// por replay determinístico. Modelo central de domínio de um tópico:
//
//   domínio = acurácia_com_recência × fator_volume × fator_retenção
//
//   • acurácia_com_recência: cada resposta pesa 0.5^(idade/21d) — respostas
//     novas contam mais (curva de evolução).
//   • fator_volume: min(1, n/5) — poucas respostas ⇒ pouca confiança.
//   • fator_retenção: 0.55 + 0.45×0.5^(dias_sem_prática/30) — sem prática o
//     domínio decai (curva de esquecimento) até um piso.
//
// A MESMA função, avaliada em datas passadas (replay) gera a curva de
// aprendizado; avaliada em datas futuras (sem novos eventos) gera a curva de
// esquecimento. Indicadores ficam num REGISTRO extensível (Open/Closed).
import type {
  CurvePoint,
  DisciplineHeatmapRow,
  GraphAnalytics,
  LearningAnalytics,
  LearningProfileTrait,
  LearningTrend,
  TopicConfidenceRef,
  TopicDelta,
  TopicMasteryCell,
  TopicStatus
} from '@shared/domain'
import {
  bottlenecks,
  chainCoverage,
  degreeCentrality,
  type GraphEdge,
  learningChains
} from '../graph/engine'
import { ANALYTICS_CONFIG, type AnalyticsConfig } from './config'

// ───────────────────────── Entrada (event log) ─────────────────────────
export interface AnalyticsAnswerEvent {
  dayIso: string
  topicId: number | null
  disciplineId: number
  correct: boolean
  seconds: number | null
  source: string
}

export interface AnalyticsReviewEvent {
  dayIso: string
  rating: number // 1..4 (FSRS)
}

export interface AnalyticsInput {
  todayIso: string
  disciplines: { id: number; name: string; color: string }[]
  topics: { id: number; disciplineId: number; name: string; status: TopicStatus }[]
  answers: AnalyticsAnswerEvent[]
  reviews: AnalyticsReviewEvent[]
  activityDays: string[] // dias distintos com qualquer atividade
  relations: GraphEdge[] // grafo de aprendizagem (M18) — apenas consumido
}

// ───────────────────────── Utilitários puros ─────────────────────────
const MS_DAY = 86_400_000
const dayMs = (iso: string): number => new Date(`${iso}T12:00:00`).getTime()
const daysBetween = (fromIso: string, toIso: string): number =>
  Math.round((dayMs(toIso) - dayMs(fromIso)) / MS_DAY)
const addDaysIso = (iso: string, days: number): string =>
  new Date(dayMs(iso) + days * MS_DAY).toISOString().slice(0, 10)
const round1 = (n: number): number => Math.round(n * 10) / 10

/** Domínio derivado (0..100) de um conjunto de respostas numa data. */
export function masteryAt(
  events: AnalyticsAnswerEvent[],
  asOfIso: string,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): number | null {
  let wSum = 0
  let wCorrect = 0
  let n = 0
  let lastDay: string | null = null
  for (const e of events) {
    if (e.dayIso > asOfIso) continue
    const age = daysBetween(e.dayIso, asOfIso)
    const w = Math.pow(0.5, age / cfg.recencyHalfLifeDays)
    wSum += w
    if (e.correct) wCorrect += w
    n += 1
    if (lastDay == null || e.dayIso > lastDay) lastDay = e.dayIso
  }
  if (n === 0 || wSum === 0 || lastDay == null) return null
  const accuracy = wCorrect / wSum
  const volume = Math.min(1, n / cfg.volumeTarget)
  const gap = daysBetween(lastDay, asOfIso)
  const retention =
    cfg.retentionFloor + (1 - cfg.retentionFloor) * Math.pow(0.5, Math.max(0, gap) / cfg.retentionHalfLifeDays)
  return Math.round(accuracy * volume * retention * 100)
}

/** Curva semanal de domínio por replay (do 1º evento até hoje, máx. N pontos). */
export function learningCurve(
  events: AnalyticsAnswerEvent[],
  todayIso: string,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG,
  maxPoints = 12
): CurvePoint[] {
  if (events.length === 0) return []
  const first = events.reduce((min, e) => (e.dayIso < min ? e.dayIso : min), events[0].dayIso)
  const totalDays = Math.max(0, daysBetween(first, todayIso))
  const weeks = Math.min(maxPoints - 1, Math.ceil(totalDays / 7))
  const points: CurvePoint[] = []
  for (let i = weeks; i >= 0; i--) {
    const date = addDaysIso(todayIso, -7 * i)
    const m = masteryAt(events, date, cfg)
    if (m != null) points.push({ date, masteryPct: m })
  }
  return points
}

/** Curva de esquecimento: projeção do modelo sem novos eventos. */
export function forgettingCurve(
  events: AnalyticsAnswerEvent[],
  todayIso: string,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): CurvePoint[] {
  if (events.length === 0) return []
  return [0, 7, 14, 21, 30].flatMap((d) => {
    const date = addDaysIso(todayIso, d)
    const m = masteryAt(events, date, cfg)
    return m == null ? [] : [{ date, masteryPct: m }]
  })
}

/** Tendência: domínio hoje vs. N dias atrás (replay). */
export function trendOf(
  events: AnalyticsAnswerEvent[],
  todayIso: string,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): LearningTrend {
  const now = masteryAt(events, todayIso, cfg)
  const before = masteryAt(events, addDaysIso(todayIso, -cfg.trendWindowDays), cfg)
  if (now == null || before == null) return 'ESTAVEL'
  const delta = now - before
  if (delta >= cfg.trendDeltaPp) return 'MELHORANDO'
  if (delta <= -cfg.trendDeltaPp) return 'PIORANDO'
  return 'ESTAVEL'
}

// ───────────────────────── Métricas de base ─────────────────────────
function withinDays(e: { dayIso: string }, todayIso: string, days: number): boolean {
  const d = daysBetween(e.dayIso, todayIso)
  return d >= 0 && d < days
}

export function rollingAccuracy(
  answers: AnalyticsAnswerEvent[],
  todayIso: string,
  windowDays: number
): { accuracy: number | null; answered: number } {
  const inWindow = answers.filter((a) => withinDays(a, todayIso, windowDays))
  if (inWindow.length === 0) return { accuracy: null, answered: 0 }
  return {
    accuracy: inWindow.filter((a) => a.correct).length / inWindow.length,
    answered: inWindow.length
  }
}

/** Estabilidade: 100 − variação (desvio-padrão) das acurácias semanais. */
export function stabilityIndex(
  answers: AnalyticsAnswerEvent[],
  todayIso: string
): number | null {
  const weekly: number[] = []
  for (let w = 0; w < 6; w++) {
    const start = addDaysIso(todayIso, -7 * (w + 1) + 1)
    const end = addDaysIso(todayIso, -7 * w)
    const inWeek = answers.filter((a) => a.dayIso >= start && a.dayIso <= end)
    if (inWeek.length >= 3) weekly.push(inWeek.filter((a) => a.correct).length / inWeek.length)
  }
  if (weekly.length < 3) return null
  const mean = weekly.reduce((s, v) => s + v, 0) / weekly.length
  const variance = weekly.reduce((s, v) => s + (v - mean) ** 2, 0) / weekly.length
  const std = Math.sqrt(variance)
  return Math.round(100 * (1 - Math.min(1, std / 0.35)))
}

/** Retenção: recall nas revisões FSRS; fallback: domínio atual ÷ pico. */
export function retentionIndex(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): number | null {
  const recentReviews = input.reviews.filter((r) => withinDays(r, input.todayIso, 60))
  if (recentReviews.length >= 10) {
    return Math.round((recentReviews.filter((r) => r.rating >= 3).length / recentReviews.length) * 100)
  }
  // Fallback por tópico: quanto do pico de domínio está preservado hoje.
  const ratios: number[] = []
  for (const t of input.topics) {
    const events = input.answers.filter((a) => a.topicId === t.id)
    if (events.length < cfg.volumeTarget) continue
    const curve = learningCurve(events, input.todayIso, cfg)
    if (curve.length < 2) continue
    const peak = Math.max(...curve.map((p) => p.masteryPct))
    const now = curve[curve.length - 1].masteryPct
    if (peak > 0) ratios.push(Math.min(1, now / peak))
  }
  if (ratios.length === 0) return null
  return Math.round((ratios.reduce((s, v) => s + v, 0) / ratios.length) * 100)
}

/** Velocidade de aprendizagem: dias médios do 1º contato até dominar. */
export function learningVelocityDays(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): number | null {
  const durations: number[] = []
  for (const t of input.topics) {
    const events = input.answers.filter((a) => a.topicId === t.id)
    if (events.length < cfg.volumeTarget) continue
    const curve = learningCurve(events, input.todayIso, cfg)
    const masteredAt = curve.find((p) => p.masteryPct >= cfg.masteredThreshold)
    if (!masteredAt) continue
    const first = events.reduce((min, e) => (e.dayIso < min ? e.dayIso : min), events[0].dayIso)
    durations.push(Math.max(0, daysBetween(first, masteredAt.date)))
  }
  if (durations.length === 0) return null
  return Math.round(durations.reduce((s, v) => s + v, 0) / durations.length)
}

export function avgSeconds(
  answers: AnalyticsAnswerEvent[],
  todayIso: string,
  windowDays: number,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): number | null {
  const times = answers
    .filter((a) => withinDays(a, todayIso, windowDays) && a.seconds != null && a.seconds > 0)
    .map((a) => Math.min(cfg.clampSeconds.max, Math.max(cfg.clampSeconds.min, a.seconds as number)))
  if (times.length === 0) return null
  return round1(times.reduce((s, v) => s + v, 0) / times.length)
}

// ───────────────────────── Registro de indicadores ─────────────────────────
// Open/Closed: novo indicador = nova entrada aqui (nada mais muda).
interface MetricContext {
  input: AnalyticsInput
  cfg: AnalyticsConfig
  retention: number | null
  stability: number | null
  coveragePct: number
  frequencyPct: number
  avgSec30: number | null
  velocityDays: number | null
}

interface IndicatorDef {
  key: string
  label: string
  unit: string
  compute: (ctx: MetricContext) => { value: number | null; detail: string }
}

const INDICATORS: IndicatorDef[] = [
  {
    key: 'retencao',
    label: 'Retenção geral',
    unit: '%',
    compute: (ctx) => ({
      value: ctx.retention,
      detail:
        ctx.retention == null
          ? 'faça revisões e questões para medir'
          : 'quanto do aprendido permanece (revisões FSRS + picos de domínio)'
    })
  },
  {
    key: 'estabilidade',
    label: 'Estabilidade',
    unit: '%',
    compute: (ctx) => ({
      value: ctx.stability,
      detail:
        ctx.stability == null
          ? 'necessárias ≥3 semanas ativas'
          : 'constância da taxa de acerto entre semanas'
    })
  },
  {
    key: 'cobertura',
    label: 'Cobertura do edital',
    unit: '%',
    compute: (ctx) => ({
      value: Math.round(ctx.coveragePct),
      detail: `tópicos com prática efetiva (≥${ctx.cfg.coverageMinAnswers} questões)`
    })
  },
  {
    key: 'tempoQuestao',
    label: 'Tempo médio por questão',
    unit: 's',
    compute: (ctx) => ({
      value: ctx.avgSec30,
      detail: ctx.avgSec30 == null ? 'sem respostas cronometradas' : 'média dos últimos 30 dias'
    })
  },
  {
    key: 'frequencia',
    label: 'Frequência de estudo',
    unit: '%',
    compute: (ctx) => ({
      value: Math.round(ctx.frequencyPct),
      detail: 'dias com atividade nos últimos 14 dias'
    })
  },
  {
    key: 'tempoDominio',
    label: 'Tempo médio para dominar',
    unit: 'dias',
    compute: (ctx) => ({
      value: ctx.velocityDays,
      detail:
        ctx.velocityDays == null
          ? 'nenhum tópico dominado ainda'
          : `do 1º contato até domínio ≥${ctx.cfg.masteredThreshold}%`
    })
  }
]

// ───────────────────────── Perfil do estudante ─────────────────────────
function buildProfile(ctx: MetricContext): LearningProfileTrait[] {
  const p = ctx.cfg.profile
  const traits: LearningProfileTrait[] = []

  // Velocidade de aprendizagem
  if (ctx.velocityDays == null) {
    traits.push({
      key: 'aprendizagem',
      label: 'Velocidade de aprendizagem',
      classification: 'Dados insuficientes',
      description: 'domine o primeiro tópico para calcular',
      favorable: null
    })
  } else {
    const fast = ctx.velocityDays <= p.fastLearnerDays
    const slow = ctx.velocityDays >= p.slowLearnerDays
    traits.push({
      key: 'aprendizagem',
      label: 'Velocidade de aprendizagem',
      classification: fast ? 'Aprende rápido' : slow ? 'Aprende com calma' : 'Ritmo médio',
      description: `${ctx.velocityDays} dias, em média, do 1º contato ao domínio`,
      favorable: fast ? true : slow ? false : null
    })
  }

  // Retenção
  if (ctx.retention == null) {
    traits.push({
      key: 'retencao',
      label: 'Retenção',
      classification: 'Dados insuficientes',
      description: 'revisões e prática geram esta medida',
      favorable: null
    })
  } else {
    const high = ctx.retention >= p.highRetention
    const low = ctx.retention <= p.lowRetention
    traits.push({
      key: 'retencao',
      label: 'Retenção',
      classification: high ? 'Mantém retenção alta' : low ? 'Esquece rapidamente' : 'Retenção média',
      description: `índice de retenção em ${ctx.retention}%`,
      favorable: high ? true : low ? false : null
    })
  }

  // Hábito de revisão
  const days30 = ctx.input.activityDays.filter((d) => withinDays({ dayIso: d }, ctx.input.todayIso, 30))
  const reviews30 = ctx.input.reviews.filter((r) => withinDays(r, ctx.input.todayIso, 30))
  const perDay = days30.length > 0 ? reviews30.length / days30.length : 0
  traits.push({
    key: 'revisao',
    label: 'Hábito de revisão',
    classification:
      days30.length === 0
        ? 'Dados insuficientes'
        : perDay < p.reviewsPerDayLow
          ? 'Revisa pouco'
          : perDay > p.reviewsPerDayHigh
            ? 'Revisa excessivamente'
            : 'Revisa na medida',
    description: `${reviews30.length} revisões em ${days30.length} dias ativos (30d)`,
    favorable:
      days30.length === 0 ? null : perDay >= p.reviewsPerDayLow && perDay <= p.reviewsPerDayHigh ? true : false
  })

  // Velocidade de resolução
  if (ctx.avgSec30 == null) {
    traits.push({
      key: 'resolucao',
      label: 'Velocidade de resolução',
      classification: 'Dados insuficientes',
      description: 'responda questões cronometradas',
      favorable: null
    })
  } else {
    const fast = ctx.avgSec30 <= p.fastSolverSeconds
    const slow = ctx.avgSec30 >= p.slowSolverSeconds
    traits.push({
      key: 'resolucao',
      label: 'Velocidade de resolução',
      classification: fast ? 'Resolve rápido' : slow ? 'Resolve com calma' : 'Velocidade média',
      description: `${Math.round(ctx.avgSec30)}s por questão (30d)`,
      favorable: fast ? true : slow ? false : null
    })
  }

  // Consistência
  const freq = ctx.frequencyPct / 100
  traits.push({
    key: 'consistencia',
    label: 'Consistência',
    classification:
      freq >= p.consistentFrequency
        ? 'Evolução consistente'
        : freq <= p.irregularFrequency
          ? 'Estudo irregular'
          : 'Consistência média',
    description: `atividade em ${Math.round(ctx.frequencyPct)}% dos últimos 14 dias`,
    favorable: freq >= p.consistentFrequency ? true : freq <= p.irregularFrequency ? false : null
  })

  return traits
}

// ───────────────────────── Agregação principal ─────────────────────────
export function computeLearningAnalytics(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): LearningAnalytics {
  const answers = [...input.answers].sort((a, b) => a.dayIso.localeCompare(b.dayIso))
  const discById = new Map(input.disciplines.map((d) => [d.id, d]))

  // Heatmap do edital (domínio derivado por tópico).
  const heatmap: DisciplineHeatmapRow[] = input.disciplines.map((disc) => {
    const topics = input.topics.filter((t) => t.disciplineId === disc.id)
    const cells: TopicMasteryCell[] = topics.map((t) => {
      const events = answers.filter((a) => a.topicId === t.id)
      return {
        topicId: t.id,
        name: t.name,
        masteryPct: masteryAt(events, input.todayIso, cfg) ?? 0,
        answeredCount: events.length,
        trend: trendOf(events, input.todayIso, cfg)
      }
    })
    const covered = cells.filter((c) => c.answeredCount >= cfg.coverageMinAnswers).length
    const mastery =
      cells.length > 0 ? Math.round(cells.reduce((s, c) => s + c.masteryPct, 0) / cells.length) : 0
    return {
      disciplineId: disc.id,
      name: disc.name,
      color: disc.color,
      coveragePct: cells.length > 0 ? Math.round((covered / cells.length) * 100) : 0,
      masteryPct: mastery,
      topics: cells.sort((a, b) => b.masteryPct - a.masteryPct)
    }
  })

  const coveragePct =
    input.topics.length > 0
      ? (heatmap.reduce((s, d) => s + (d.coveragePct / 100) * d.topics.length, 0) / input.topics.length) * 100
      : 0

  // Destaques da semana (maior evolução / regressão).
  let best: TopicDelta | null = null
  let worst: TopicDelta | null = null
  for (const t of input.topics) {
    const events = answers.filter((a) => a.topicId === t.id)
    if (events.length < 3 || !events.some((a) => withinDays(a, input.todayIso, 7))) continue
    const now = masteryAt(events, input.todayIso, cfg)
    const before = masteryAt(events, addDaysIso(input.todayIso, -7), cfg)
    if (now == null || before == null) continue
    const delta = now - before
    const disc = discById.get(t.disciplineId)
    const ref: TopicDelta = {
      topicId: t.id,
      name: t.name,
      disciplineName: disc?.name ?? '',
      color: disc?.color ?? '#6366f1',
      deltaPp: delta,
      curve: learningCurve(events, input.todayIso, cfg, 8)
    }
    if (delta > 2 && (best == null || delta > best.deltaPp)) best = ref
    if (delta < -2 && (worst == null || delta < worst.deltaPp)) worst = ref
  }

  // Confiança (declarado × derivado).
  const overconfident: TopicConfidenceRef[] = []
  const underconfident: TopicConfidenceRef[] = []
  for (const t of input.topics) {
    const events = answers.filter((a) => a.topicId === t.id)
    const mastery = masteryAt(events, input.todayIso, cfg) ?? 0
    const disc = discById.get(t.disciplineId)
    const ref = {
      topicId: t.id,
      name: t.name,
      disciplineName: disc?.name ?? '',
      declared: t.status,
      masteryPct: mastery
    }
    if (t.status === 'DOMINADO' && mastery < 50) overconfident.push(ref)
    if (
      mastery >= 80 &&
      events.length >= cfg.volumeTarget &&
      (t.status === 'NAO_ESTUDADO' || t.status === 'ESTUDANDO')
    ) {
      underconfident.push(ref)
    }
  }

  // Métodos de estudo.
  const sourceLabels: Record<string, string> = {
    BANCO: 'Banco de questões',
    SIMULADO: 'Simulados',
    REVISAO: 'Revisão',
    DIAGNOSTICO: 'Diagnóstico'
  }
  const bySource = new Map<string, { answered: number; correct: number }>()
  for (const a of answers.filter((x) => withinDays(x, input.todayIso, 60))) {
    const agg = bySource.get(a.source) ?? { answered: 0, correct: 0 }
    agg.answered += 1
    if (a.correct) agg.correct += 1
    bySource.set(a.source, agg)
  }
  const methodStats = [...bySource.entries()]
    .filter(([, v]) => v.answered >= 5)
    .map(([source, v]) => ({
      source,
      label: sourceLabels[source] ?? source,
      answered: v.answered,
      accuracy: v.correct / v.answered
    }))
    .sort((a, b) => b.accuracy - a.accuracy)

  // Contexto para o registro de indicadores + perfil.
  const days14 = input.activityDays.filter((d) => withinDays({ dayIso: d }, input.todayIso, 14))
  const ctx: MetricContext = {
    input: { ...input, answers },
    cfg,
    retention: retentionIndex({ ...input, answers }, cfg),
    stability: stabilityIndex(answers, input.todayIso),
    coveragePct,
    frequencyPct: (days14.length / 14) * 100,
    avgSec30: avgSeconds(answers, input.todayIso, 30, cfg),
    velocityDays: learningVelocityDays({ ...input, answers }, cfg)
  }

  return {
    generatedAt: `${input.todayIso}T00:00:00`,
    graph: computeGraphAnalytics({ ...input, answers }, cfg),
    indicators: INDICATORS.map((def) => {
      const { value, detail } = def.compute(ctx)
      return { key: def.key, label: def.label, value, unit: def.unit, detail }
    }),
    rollingAccuracy: cfg.rollingWindows.map((w) => ({
      windowDays: w,
      ...rollingAccuracy(answers, input.todayIso, w)
    })),
    learningCurve: learningCurve(answers, input.todayIso, cfg),
    forgettingCurve: forgettingCurve(answers, input.todayIso, cfg),
    heatmap,
    biggestImprovement: best,
    biggestRegression: worst,
    profile: buildProfile(ctx),
    overconfident: overconfident.slice(0, 6),
    underconfident: underconfident.slice(0, 6),
    methodStats,
    globalTrend: trendOf(answers, input.todayIso, cfg)
  }
}

/** Tópicos dominados: declarados DOMINADO ∪ domínio derivado ≥ limiar. */
export function masteredTopicSet(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): Set<number> {
  const mastered = new Set<number>()
  for (const t of input.topics) {
    if (t.status === 'DOMINADO') {
      mastered.add(t.id)
      continue
    }
    const events = input.answers.filter((a) => a.topicId === t.id)
    const m = masteryAt(events, input.todayIso, cfg)
    if (m != null && m >= cfg.masteredThreshold) mastered.add(t.id)
  }
  return mastered
}

/** Métricas de grafo (consome M18: conectividade, gargalos, cadeias). */
export function computeGraphAnalytics(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): GraphAnalytics {
  const topicById = new Map(input.topics.map((t) => [t.id, t]))
  const discById = new Map(input.disciplines.map((d) => [d.id, d]))
  const nameOf = (id: number): { name: string; disciplineName: string } => {
    const t = topicById.get(id)
    return {
      name: t?.name ?? `#${id}`,
      disciplineName: t ? (discById.get(t.disciplineId)?.name ?? '') : ''
    }
  }

  const mastered = masteredTopicSet(input, cfg)
  const centrality = degreeCentrality(input.relations)
  const mostConnected = [...centrality.entries()]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, 5)
    .map(([topicId, degree]) => ({
      topicId,
      ...nameOf(topicId),
      connections: Math.round(degree * 10) / 10
    }))

  const gargalos = bottlenecks(mastered, input.relations)
    .slice(0, 5)
    .map((b) => ({ topicId: b.topicId, ...nameOf(b.topicId), blocks: b.blocks }))

  const chains = learningChains(input.relations)
    .slice(0, 6)
    .map((chain, i) => {
      const first = nameOf(chain[0])
      return {
        key: `chain-${i}`,
        title: `${first.disciplineName}: ${first.name}`,
        coveragePct: chainCoverage(chain, mastered),
        topics: chain.map((id) => ({
          topicId: id,
          name: nameOf(id).name,
          mastered: mastered.has(id)
        }))
      }
    })

  return { mostConnected, bottlenecks: gargalos, chains }
}

// Exposto para integração com o Strategy Engine (M16): domínio por disciplina
// consciente de recência e esquecimento.
export function disciplineMastery(
  input: AnalyticsInput,
  cfg: AnalyticsConfig = ANALYTICS_CONFIG
): Map<number, number> {
  const map = new Map<number, number>()
  for (const d of input.disciplines) {
    const events = input.answers.filter((a) => a.disciplineId === d.id)
    map.set(d.id, masteryAt(events, input.todayIso, cfg) ?? 0)
  }
  return map
}
