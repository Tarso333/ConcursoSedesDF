// Testes do Learning Analytics Engine — motor puro, testável em Node.
import { describe, expect, it } from 'vitest'
import type { TopicStatus } from '@shared/domain'
import {
  type AnalyticsAnswerEvent,
  type AnalyticsInput,
  computeLearningAnalytics,
  forgettingCurve,
  learningCurve,
  masteryAt,
  retentionIndex,
  stabilityIndex,
  trendOf
} from './engine'

const TODAY = '2026-06-24'

function answer(
  dayIso: string,
  correct: boolean,
  overrides: Partial<AnalyticsAnswerEvent> = {}
): AnalyticsAnswerEvent {
  return { dayIso, topicId: 1, disciplineId: 1, correct, seconds: 60, source: 'BANCO', ...overrides }
}

function daysAgo(n: number): string {
  const d = new Date(`${TODAY}T12:00:00`)
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

function makeInput(overrides: Partial<AnalyticsInput> = {}): AnalyticsInput {
  return {
    todayIso: TODAY,
    disciplines: [{ id: 1, name: 'Disciplina 1', color: '#6366f1' }],
    topics: [{ id: 1, disciplineId: 1, name: 'Tópico 1', status: 'NAO_ESTUDADO' as TopicStatus }],
    answers: [],
    reviews: [],
    activityDays: [],
    ...overrides
  }
}

describe('masteryAt (domínio derivado)', () => {
  it('é null sem eventos e cresce com acertos recentes (evolução)', () => {
    expect(masteryAt([], TODAY)).toBeNull()
    const fewCorrect = [answer(daysAgo(1), true), answer(daysAgo(1), true)]
    const manyCorrect = [1, 2, 3, 4, 5].map((i) => answer(daysAgo(i), true))
    const few = masteryAt(fewCorrect, TODAY) as number
    const many = masteryAt(manyCorrect, TODAY) as number
    expect(many).toBeGreaterThan(few) // fator de volume premia prática suficiente
    expect(many).toBeGreaterThanOrEqual(85)
  })

  it('respostas recentes pesam mais que antigas (recência)', () => {
    // Errava antes, acerta agora → domínio alto.
    const improved = [
      answer(daysAgo(60), false),
      answer(daysAgo(55), false),
      answer(daysAgo(50), false),
      answer(daysAgo(2), true),
      answer(daysAgo(1), true)
    ]
    // Acertava antes, erra agora → domínio baixo.
    const regressed = [
      answer(daysAgo(60), true),
      answer(daysAgo(55), true),
      answer(daysAgo(50), true),
      answer(daysAgo(2), false),
      answer(daysAgo(1), false)
    ]
    const up = masteryAt(improved, TODAY) as number
    const down = masteryAt(regressed, TODAY) as number
    expect(up).toBeGreaterThan(down + 20)
  })

  it('sem prática o domínio decai (esquecimento), mas nunca abaixo do piso', () => {
    const events = [1, 2, 3, 4, 5].map((i) => answer(daysAgo(i), true))
    const now = masteryAt(events, TODAY) as number
    const in30 = masteryAt(events, daysAgo(-30)) as number // +30 dias sem praticar
    const in90 = masteryAt(events, daysAgo(-90)) as number
    expect(in30).toBeLessThan(now)
    expect(in90).toBeLessThan(in30)
    expect(in90).toBeGreaterThanOrEqual(Math.round(now * 0.5)) // piso de retenção
  })
})

describe('curvas', () => {
  it('curva de aprendizado sobe com prática crescente (replay semanal)', () => {
    const events: AnalyticsAnswerEvent[] = []
    // 5 semanas: acurácia melhora a cada semana (2/5 → 5/5).
    for (let week = 4; week >= 0; week--) {
      const correctCount = 5 - week
      for (let i = 0; i < 5; i++) {
        events.push(answer(daysAgo(week * 7 + 1), i < correctCount))
      }
    }
    const curve = learningCurve(events, TODAY)
    expect(curve.length).toBeGreaterThanOrEqual(4)
    expect(curve[curve.length - 1].masteryPct).toBeGreaterThan(curve[0].masteryPct)
  })

  it('curva de esquecimento é uma projeção decrescente e determinística', () => {
    const events = [1, 2, 3, 4, 5].map((i) => answer(daysAgo(i), true))
    const proj = forgettingCurve(events, TODAY)
    expect(proj.length).toBe(5) // hoje, +7, +14, +21, +30
    for (let i = 1; i < proj.length; i++) {
      expect(proj[i].masteryPct).toBeLessThanOrEqual(proj[i - 1].masteryPct)
    }
    expect(forgettingCurve(events, TODAY)).toEqual(proj) // determinismo
  })
})

describe('tendência', () => {
  it('detecta MELHORANDO quando acertos recentes superam o passado', () => {
    const events = [
      ...[30, 28, 26, 24, 22, 20].map((i) => answer(daysAgo(i), false)),
      ...[5, 4, 3, 2, 1].map((i) => answer(daysAgo(i), true))
    ]
    expect(trendOf(events, TODAY)).toBe('MELHORANDO')
  })

  it('detecta PIORANDO (regressão) quando o desempenho recente cai', () => {
    const events = [
      ...[30, 28, 26, 24, 22, 20].map((i) => answer(daysAgo(i), true)),
      ...[5, 4, 3, 2, 1].map((i) => answer(daysAgo(i), false))
    ]
    expect(trendOf(events, TODAY)).toBe('PIORANDO')
  })

  it('detecta ESTAVEL quando nada muda', () => {
    const events = [...Array(12).keys()].map((i) => answer(daysAgo(i * 3 + 1), i % 2 === 0))
    expect(['ESTAVEL', 'MELHORANDO', 'PIORANDO']).toContain(trendOf(events, TODAY))
    const steady = [...Array(20).keys()].map((i) => answer(daysAgo(i + 1), true))
    expect(trendOf(steady, TODAY)).toBe('ESTAVEL')
  })
})

describe('estabilidade e retenção', () => {
  it('acurácia constante → estabilidade alta; oscilante → baixa', () => {
    const steady: AnalyticsAnswerEvent[] = []
    const volatile: AnalyticsAnswerEvent[] = []
    for (let week = 0; week < 5; week++) {
      for (let i = 0; i < 5; i++) {
        steady.push(answer(daysAgo(week * 7 + 1), i < 4)) // sempre 80%
        const acc = week % 2 === 0 ? 5 : 1 // alterna 100% / 20%
        volatile.push(answer(daysAgo(week * 7 + 1), i < acc))
      }
    }
    const s = stabilityIndex(steady, TODAY) as number
    const v = stabilityIndex(volatile, TODAY) as number
    expect(s).toBeGreaterThan(v)
    expect(s).toBeGreaterThanOrEqual(90)
  })

  it('retenção usa o recall das revisões FSRS quando há volume', () => {
    const input = makeInput({
      reviews: [...Array(20).keys()].map((i) => ({ dayIso: daysAgo(i + 1), rating: i < 15 ? 3 : 1 }))
    })
    expect(retentionIndex(input)).toBe(75) // 15 de 20 com rating ≥ 3
  })
})

describe('computeLearningAnalytics (agregação)', () => {
  it('cobertura conta apenas tópicos com prática efetiva', () => {
    const input = makeInput({
      topics: [
        { id: 1, disciplineId: 1, name: 'A', status: 'NAO_ESTUDADO' },
        { id: 2, disciplineId: 1, name: 'B', status: 'NAO_ESTUDADO' }
      ],
      answers: [1, 2, 3].map((i) => answer(daysAgo(i), true, { topicId: 1 }))
    })
    const out = computeLearningAnalytics(input)
    expect(out.heatmap[0].coveragePct).toBe(50) // 1 de 2 tópicos coberto
    const cobertura = out.indicators.find((i) => i.key === 'cobertura')
    expect(cobertura?.value).toBe(50)
  })

  it('identifica excesso de confiança (declarado dominado × domínio derivado baixo)', () => {
    const input = makeInput({
      topics: [{ id: 1, disciplineId: 1, name: 'A', status: 'DOMINADO' }],
      answers: [1, 2, 3, 4, 5].map((i) => answer(daysAgo(i), false))
    })
    const out = computeLearningAnalytics(input)
    expect(out.overconfident.length).toBe(1)
    expect(out.overconfident[0].declared).toBe('DOMINADO')
  })

  it('aponta maior evolução da semana com curva anexa', () => {
    const input = makeInput({
      answers: [
        ...[20, 18, 16].map((i) => answer(daysAgo(i), false)),
        ...[3, 2, 1].map((i) => answer(daysAgo(i), true))
      ]
    })
    const out = computeLearningAnalytics(input)
    expect(out.biggestImprovement?.topicId).toBe(1)
    expect(out.biggestImprovement?.deltaPp).toBeGreaterThan(0)
    expect(out.biggestImprovement?.curve.length).toBeGreaterThan(0)
  })

  it('perfil é calculado (nunca manual) e todo indicador tem explicação', () => {
    const input = makeInput({
      answers: [...Array(30).keys()].map((i) => answer(daysAgo((i % 14) + 1), i % 3 !== 0)),
      activityDays: [...Array(10).keys()].map((i) => daysAgo(i + 1))
    })
    const out = computeLearningAnalytics(input)
    expect(out.profile.length).toBe(5)
    for (const t of out.profile) expect(t.classification.length).toBeGreaterThan(0)
    for (const ind of out.indicators) expect(ind.detail.length).toBeGreaterThan(0)
  })

  it('é determinístico: mesma entrada ⇒ mesma saída', () => {
    const input = makeInput({
      answers: [...Array(25).keys()].map((i) => answer(daysAgo(i + 1), i % 2 === 0)),
      reviews: [...Array(12).keys()].map((i) => ({ dayIso: daysAgo(i + 1), rating: (i % 4) + 1 })),
      activityDays: [...Array(8).keys()].map((i) => daysAgo(i + 1))
    })
    expect(computeLearningAnalytics(input)).toEqual(computeLearningAnalytics(input))
  })
})
