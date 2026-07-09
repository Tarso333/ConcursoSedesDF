// Motor de Estratégia de Estudos — NÚCLEO PURO.
// Nenhum acesso a banco, Electron, rede ou relógio implícito: recebe um
// snapshot (StrategyInput) e devolve um plano determinístico e explicável.
// A fórmula é um REGISTRO DE FATORES: cada fator devolve intensidade (0..1)
// e a própria justificativa; score = Σ peso×intensidade (pesos em config.ts).
// Adicionar um fator novo = adicionar uma entrada em buildFactors().
import type {
  DailyPlan,
  DailyPlanItem,
  DisciplineBlock,
  PlanActivity,
  PlanFactorScore,
  PlanForecast,
  PlanPriority,
  PlanRankingItem
} from '@shared/domain'
import { STRATEGY_CONFIG, type StrategyConfig } from './config'

// ───────────────────────── Entrada (snapshot) ─────────────────────────
export interface StrategyDisciplineInput {
  id: number
  name: string
  color: string
  block: DisciplineBlock
  weight: number // pontos por questão
  examQuestionEstimate: number // incidência estimada na prova
  orderIndex: number
  questionCount: number
  answeredCount: number
  correctCount: number
  masteryPct: number // 0..100 (domínio derivado)
  recentAccuracy: number | null // últimos 7 dias
  previousAccuracy: number | null // dias 8..30
  simAccuracy: number | null // acerto em simulados
  simAnswered: number
  daysSinceLastStudy: number | null // null = nunca estudou
  topicCount: number
  topicsDominado: number
  topicsRevisar: number
  difficultyIndex: number // 0..1 (mix de dificuldade do banco)
  knowledgeCount: number // blocos de conhecimento disponíveis
  occurrenceCount: number // em quantos concursos ativos a disciplina aparece
  graphLeverage: number // 0..1 — alavancagem no grafo (prontos + destravamentos)
  graphReason: string | null // justificativa legível vinda do grafo
}

export interface StrategyInput {
  todayIso: string // yyyy-mm-dd (determinismo: o relógio vem de fora)
  daysUntilExam: number | null
  availableMinutes: number
  activeContestCount: number
  blockCutoffGap: Partial<Record<DisciplineBlock, number>> // 0..1 abaixo do corte
  dueReviewCards: number
  disciplines: StrategyDisciplineInput[]
}

// ───────────────────────── Fatores ─────────────────────────
interface FactorResult {
  value: number
  reason: string | null
}

interface StrategyFactor {
  key: keyof StrategyConfig['weights']
  label: string
  compute: (d: StrategyDisciplineInput, ctx: StrategyInput) => FactorResult
}

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n))
const pctText = (r: number): string => `${Math.round(r * 100)}%`

function buildFactors(): StrategyFactor[] {
  return [
    {
      key: 'peso',
      label: 'Peso da disciplina',
      compute: (d, ctx) => {
        const maxWeight = Math.max(...ctx.disciplines.map((x) => x.weight), 1)
        const value = d.weight / maxWeight
        return { value, reason: d.weight > 1 ? `peso ${d.weight}× por questão` : null }
      }
    },
    {
      key: 'incidencia',
      label: 'Incidência na prova',
      compute: (d, ctx) => {
        const maxEst = Math.max(...ctx.disciplines.map((x) => x.examQuestionEstimate), 1)
        const value = d.examQuestionEstimate / maxEst
        return {
          value,
          reason: value >= 0.6 ? `~${d.examQuestionEstimate} questões na prova` : null
        }
      }
    },
    {
      key: 'urgencia',
      label: 'Proximidade da prova',
      compute: (_d, ctx) => {
        if (ctx.daysUntilExam == null) return { value: 0.3, reason: null }
        const value = 1 - clamp01(ctx.daysUntilExam / 120)
        return {
          value,
          reason: ctx.daysUntilExam <= 60 ? `faltam ${ctx.daysUntilExam} dias para a prova` : null
        }
      }
    },
    {
      key: 'desempenho',
      label: 'Desempenho nas questões',
      compute: (d) => {
        if (d.answeredCount < 5) {
          return { value: 0.6, reason: `pouca prática (${d.answeredCount} questões respondidas)` }
        }
        const acc = d.correctCount / d.answeredCount
        return { value: 1 - acc, reason: acc < 0.65 ? `desempenho baixo (${pctText(acc)} de acerto)` : null }
      }
    },
    {
      key: 'cobertura',
      label: 'Progresso no edital',
      compute: (d) => {
        const denom = Math.max(10, d.questionCount)
        const value = 1 - clamp01(d.answeredCount / denom)
        return {
          value,
          reason:
            value >= 0.7 && d.questionCount > 0
              ? `apenas ${d.answeredCount} de ${d.questionCount} questões praticadas`
              : null
        }
      }
    },
    {
      key: 'esquecimento',
      label: 'Tempo sem estudar',
      compute: (d) => {
        if (d.daysSinceLastStudy == null) return { value: 0.7, reason: 'disciplina nunca estudada' }
        const value = clamp01(d.daysSinceLastStudy / 14)
        return {
          value,
          reason:
            d.daysSinceLastStudy >= 7 ? `última atividade há ${d.daysSinceLastStudy} dias` : null
        }
      }
    },
    {
      key: 'dominio',
      label: 'Domínio declarado',
      compute: (d) => {
        if (d.topicCount === 0) return { value: 0.5, reason: null }
        let value = 1 - d.topicsDominado / d.topicCount
        let reason: string | null = null
        if (d.topicsRevisar > 0) {
          value = clamp01(value + (d.topicsRevisar / d.topicCount) * 0.5)
          reason = `${d.topicsRevisar} tópico(s) marcados para revisar`
        }
        return { value, reason }
      }
    },
    {
      key: 'multiConcurso',
      label: 'Sinergia entre concursos',
      compute: (d, ctx) => {
        if (ctx.activeContestCount <= 1 || d.occurrenceCount <= 1) return { value: 0, reason: null }
        const value = clamp01((d.occurrenceCount - 1) / (ctx.activeContestCount - 1))
        return { value, reason: `cai em ${d.occurrenceCount} concursos ativos` }
      }
    },
    {
      key: 'tendencia',
      label: 'Tendência de evolução',
      compute: (d) => {
        if (d.recentAccuracy == null || d.previousAccuracy == null) return { value: 0, reason: null }
        const delta = d.previousAccuracy - d.recentAccuracy
        if (delta <= 0.05) return { value: 0, reason: null }
        return { value: clamp01(delta * 3), reason: `queda de ${pctText(delta)} de acerto na última semana` }
      }
    },
    {
      key: 'dificuldade',
      label: 'Dificuldade do conteúdo',
      compute: (d) => ({
        value: clamp01(d.difficultyIndex),
        reason: d.difficultyIndex >= 0.7 ? 'questões majoritariamente difíceis' : null
      })
    },
    {
      key: 'simulado',
      label: 'Histórico de simulados',
      compute: (d) => {
        if (d.simAnswered < 5 || d.simAccuracy == null) return { value: 0, reason: null }
        return {
          value: 1 - d.simAccuracy,
          reason: d.simAccuracy < 0.6 ? `${pctText(d.simAccuracy)} de acerto em simulados` : null
        }
      }
    },
    {
      key: 'metaBloco',
      label: 'Meta de aprovação (corte)',
      compute: (d, ctx) => {
        const gap = ctx.blockCutoffGap[d.block] ?? 0
        if (gap <= 0) return { value: 0, reason: null }
        return { value: clamp01(gap * 2), reason: 'bloco abaixo do corte de eliminação' }
      }
    },
    {
      key: 'grafo',
      label: 'Alavancagem no grafo',
      compute: (d) => ({ value: clamp01(d.graphLeverage), reason: d.graphReason })
    }
  ]
}

// ───────────────────────── Ranking ─────────────────────────
export interface RankedDiscipline {
  discipline: StrategyDisciplineInput
  score: number
  priority: PlanPriority
  activity: PlanActivity
  reasons: string[]
  factors: PlanFactorScore[]
  expectedImpact: string
}

function priorityFor(score: number, cfg: StrategyConfig): PlanPriority {
  if (score >= cfg.priorities.muitoAlta) return 'MUITO_ALTA'
  if (score >= cfg.priorities.alta) return 'ALTA'
  if (score >= cfg.priorities.media) return 'MEDIA'
  return 'BAIXA'
}

function accuracyOf(d: StrategyDisciplineInput): number | null {
  return d.answeredCount > 0 ? d.correctCount / d.answeredCount : null
}

function expectedImpactFor(d: StrategyDisciplineInput, cfg: StrategyConfig): string {
  const acc = accuracyOf(d) ?? 0.35
  const potential = d.examQuestionEstimate * d.weight * Math.max(0, cfg.forecast.targetAccuracy - acc)
  const pts = Math.round(potential)
  return pts >= 1 ? `até +${pts} pts na prova` : 'consolida pontos já conquistados'
}

export function rankDisciplines(input: StrategyInput, cfg: StrategyConfig = STRATEGY_CONFIG): RankedDiscipline[] {
  const factors = buildFactors()
  return input.disciplines
    .map((d) => {
      const factorScores: PlanFactorScore[] = factors.map((f) => {
        const { value, reason } = f.compute(d, input)
        const weight = cfg.weights[f.key]
        return {
          key: f.key,
          label: f.label,
          weight,
          value: Math.round(value * 100) / 100,
          points: Math.round(weight * value * 10) / 10,
          reason
        }
      })
      const score = Math.round(factorScores.reduce((s, f) => s + f.points, 0))
      const reasons = factorScores
        .filter((f) => f.reason != null)
        .sort((a, b) => b.points - a.points)
        .map((f) => f.reason as string)
      const acc = accuracyOf(d)
      const needsTheory =
        d.knowledgeCount > 0 && (d.answeredCount < cfg.theory.minAnswered || (acc ?? 1) < cfg.theory.minAccuracy)
      return {
        discipline: d,
        score,
        priority: priorityFor(score, cfg),
        activity: (needsTheory ? 'TEORIA' : 'QUESTOES') as PlanActivity,
        reasons,
        factors: factorScores,
        expectedImpact: expectedImpactFor(d, cfg)
      }
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.discipline.orderIndex - b.discipline.orderIndex ||
        a.discipline.id - b.discipline.id
    )
}

// ───────────────────────── Plano do dia ─────────────────────────
function roundTo(n: number, step: number): number {
  return Math.max(step, Math.round(n / step) * step)
}

function buildFsrsItem(input: StrategyInput, cfg: StrategyConfig): DailyPlanItem {
  const a = cfg.allocation
  const minutes = Math.min(
    a.fsrsMaxMinutes,
    Math.max(a.fsrsMinMinutes, roundTo(input.dueReviewCards * a.fsrsMinutesPerCard, a.roundToMinutes))
  )
  const score = Math.min(95, 55 + Math.round(input.dueReviewCards * 1.5))
  const factor: PlanFactorScore = {
    key: 'esquecimento',
    label: 'Revisões vencidas (FSRS)',
    weight: 100,
    value: Math.round(Math.min(1, input.dueReviewCards / 25) * 100) / 100,
    points: score,
    reason: `${input.dueReviewCards} card(s) vencido(s) hoje`
  }
  return {
    id: 'fsrs',
    activity: 'REVISAO_FSRS',
    disciplineId: null,
    disciplineName: 'Revisão espaçada',
    disciplineColor: 'hsl(245, 75%, 64%)',
    minutes,
    questionTarget: null,
    score,
    priority: priorityFor(score, cfg),
    reasons: [
      `${input.dueReviewCards} card(s) vencido(s) hoje`,
      'revisar no dia certo evita a curva do esquecimento'
    ],
    factors: [factor],
    expectedImpact: 'protege a retenção do que você já aprendeu'
  }
}

function buildForecast(input: StrategyInput, cfg: StrategyConfig): PlanForecast {
  const unitMin = cfg.forecast.minutesPerIncidenceUnit
  const total = input.disciplines.reduce((s, d) => s + d.examQuestionEstimate * unitMin, 0)
  const remaining = input.disciplines.reduce(
    (s, d) => s + d.examQuestionEstimate * unitMin * (1 - clamp01(d.masteryPct / 100)),
    0
  )
  const coveragePct = total > 0 ? Math.round(((total - remaining) / total) * 100) : 0

  const daily = Math.max(1, input.availableMinutes)
  const daysNeeded = Math.ceil(remaining / daily)
  const projected = new Date(`${input.todayIso}T12:00:00`)
  projected.setDate(projected.getDate() + daysNeeded)
  const projectedIso = projected.toISOString().slice(0, 10)

  let finishBeforeExam: boolean | null = null
  let requiredDailyMinutes: number | null = null
  if (input.daysUntilExam != null) {
    finishBeforeExam = daysNeeded <= input.daysUntilExam
    if (!finishBeforeExam && input.daysUntilExam > 0) {
      requiredDailyMinutes = roundTo(remaining / input.daysUntilExam, 5)
    }
  }

  return {
    editalCoveragePct: coveragePct,
    projectedFinishDate: remaining > 0 ? projectedIso : input.todayIso,
    finishBeforeExam,
    requiredDailyMinutes,
    daysUntilExam: input.daysUntilExam
  }
}

export function generateDailyPlan(input: StrategyInput, cfg: StrategyConfig = STRATEGY_CONFIG): DailyPlan {
  const a = cfg.allocation
  const ranked = rankDisciplines(input, cfg)

  const candidates: DailyPlanItem[] = []
  if (input.dueReviewCards > 0) candidates.push(buildFsrsItem(input, cfg))

  const topScore = ranked[0]?.score ?? 1
  for (const r of ranked) {
    const d = r.discipline
    const idealMinutes = roundTo((r.score / Math.max(topScore, 1)) * a.maxBlockMinutes, a.roundToMinutes)
    const minutes = Math.min(a.maxBlockMinutes, Math.max(a.minBlockMinutes, idealMinutes))
    candidates.push({
      id: `d-${d.id}`,
      activity: r.activity,
      disciplineId: d.id,
      disciplineName: d.name,
      disciplineColor: d.color,
      minutes,
      questionTarget: null,
      score: r.score,
      priority: r.priority,
      reasons: r.reasons.slice(0, 5),
      factors: r.factors,
      expectedImpact: r.expectedImpact
    })
  }

  // Alocação determinística: maiores scores primeiro, respeitando o tempo.
  candidates.sort((x, y) => y.score - x.score || x.id.localeCompare(y.id))
  const items: DailyPlanItem[] = []
  let remaining = input.availableMinutes
  for (const c of candidates) {
    if (items.length >= a.maxItems) break
    if (remaining < a.minBlockMinutes) break
    const minutes = Math.min(c.minutes, remaining)
    if (minutes < a.minBlockMinutes && c.activity !== 'REVISAO_FSRS') continue
    const questionTarget =
      c.activity === 'QUESTOES' ? Math.max(5, Math.round(minutes / a.minutesPerQuestion / 5) * 5) : null
    items.push({ ...c, minutes, questionTarget })
    remaining -= minutes
  }
  // Sobra pequena (>= 10min): estende o último bloco.
  if (remaining >= 10 && items.length > 0) {
    const last = items[items.length - 1]
    last.minutes += remaining
    if (last.activity === 'QUESTOES') {
      last.questionTarget = Math.max(5, Math.round(last.minutes / a.minutesPerQuestion / 5) * 5)
    }
    remaining = 0
  }

  const ranking: PlanRankingItem[] = ranked.map((r) => ({
    disciplineId: r.discipline.id,
    name: r.discipline.name,
    color: r.discipline.color,
    block: r.discipline.block,
    score: r.score,
    priority: r.priority,
    activity: r.activity,
    topReason: r.reasons[0] ?? 'manter o ritmo de estudos'
  }))

  return {
    availableMinutes: input.availableMinutes,
    totalPlannedMinutes: items.reduce((s, i) => s + i.minutes, 0),
    items,
    ranking,
    forecast: buildForecast(input, cfg),
    generatedAt: `${input.todayIso}T00:00:00`
  }
}
