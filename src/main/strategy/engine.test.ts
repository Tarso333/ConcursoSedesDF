// Testes do Motor de Estratégia — o engine é PURO (sem banco/Electron),
// então os testes rodam em Node comum e provam o comportamento da fórmula.
import { describe, expect, it } from 'vitest'
import { STRATEGY_CONFIG, type StrategyConfig } from './config'
import {
  generateDailyPlan,
  rankDisciplines,
  type StrategyDisciplineInput,
  type StrategyInput
} from './engine'

let nextId = 1
function makeDiscipline(overrides: Partial<StrategyDisciplineInput> = {}): StrategyDisciplineInput {
  const id = nextId++
  return {
    id,
    name: `Disciplina ${id}`,
    color: '#6366f1',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 4,
    orderIndex: id,
    questionCount: 10,
    answeredCount: 10,
    correctCount: 7,
    masteryPct: 70,
    recentAccuracy: null,
    previousAccuracy: null,
    simAccuracy: null,
    simAnswered: 0,
    daysSinceLastStudy: 3,
    topicCount: 5,
    topicsDominado: 0,
    topicsRevisar: 0,
    difficultyIndex: 0.5,
    knowledgeCount: 0,
    occurrenceCount: 1,
    graphLeverage: 0,
    graphReason: null,
    ...overrides
  }
}

function makeInput(overrides: Partial<StrategyInput> = {}): StrategyInput {
  return {
    todayIso: '2026-06-24',
    daysUntilExam: 74,
    availableMinutes: 150,
    activeContestCount: 1,
    blockCutoffGap: {},
    dueReviewCards: 0,
    disciplines: [makeDiscipline(), makeDiscipline(), makeDiscipline()],
    ...overrides
  }
}

describe('rankDisciplines', () => {
  it('é determinístico: mesma entrada produz exatamente a mesma saída', () => {
    const input = makeInput()
    expect(rankDisciplines(input)).toEqual(rankDisciplines(input))
  })

  it('ordena por score decrescente com desempate estável pela ordem do edital', () => {
    const ranked = rankDisciplines(makeInput())
    for (let i = 1; i < ranked.length; i++) {
      const prev = ranked[i - 1]
      const cur = ranked[i]
      expect(
        prev.score > cur.score ||
          (prev.score === cur.score && prev.discipline.orderIndex <= cur.discipline.orderIndex)
      ).toBe(true)
    }
  })

  it('desempenho ruim pontua mais que desempenho bom (mais fatores iguais)', () => {
    const weak = makeDiscipline({ answeredCount: 20, correctCount: 6 }) // 30%
    const strong = makeDiscipline({ answeredCount: 20, correctCount: 18 }) // 90%
    const ranked = rankDisciplines(makeInput({ disciplines: [strong, weak] }))
    expect(ranked[0].discipline.id).toBe(weak.id)
    expect(ranked[0].reasons.join(' ')).toContain('desempenho baixo')
  })

  it('disciplina compartilhada entre concursos ganha o fator de sinergia com justificativa', () => {
    const shared = makeDiscipline({ occurrenceCount: 2 })
    const solo = makeDiscipline({ occurrenceCount: 1 })
    const ranked = rankDisciplines(
      makeInput({ activeContestCount: 2, disciplines: [solo, shared] })
    )
    const first = ranked[0]
    expect(first.discipline.id).toBe(shared.id)
    expect(first.reasons.join(' ')).toContain('cai em 2 concursos')
  })

  it('bloco abaixo do corte de eliminação recebe boost (meta de aprovação)', () => {
    const geral = makeDiscipline({ block: 'GERAL', weight: 2, examQuestionEstimate: 4 })
    const esp = makeDiscipline({ block: 'ESPECIFICO', weight: 2, examQuestionEstimate: 4 })
    const ranked = rankDisciplines(
      makeInput({ blockCutoffGap: { GERAL: 0.4 }, disciplines: [esp, geral] })
    )
    expect(ranked[0].discipline.id).toBe(geral.id)
    expect(ranked[0].reasons.join(' ')).toContain('corte de eliminação')
  })

  it('os pesos da fórmula são configuráveis sem alterar o motor', () => {
    const weak = makeDiscipline({ answeredCount: 20, correctCount: 4, weight: 1, examQuestionEstimate: 1 })
    const heavy = makeDiscipline({ answeredCount: 20, correctCount: 18, weight: 2, examQuestionEstimate: 8 })
    const input = makeInput({ disciplines: [weak, heavy] })

    // Config A: só desempenho conta → weak vence.
    const onlyPerformance: StrategyConfig = {
      ...STRATEGY_CONFIG,
      weights: { ...STRATEGY_CONFIG.weights, peso: 0, incidencia: 0, urgencia: 0, desempenho: 100 }
    }
    expect(rankDisciplines(input, onlyPerformance)[0].discipline.id).toBe(weak.id)

    // Config B: só peso/incidência contam → heavy vence.
    const onlyWeight: StrategyConfig = {
      ...STRATEGY_CONFIG,
      weights: {
        ...STRATEGY_CONFIG.weights,
        peso: 50,
        incidencia: 50,
        urgencia: 0,
        desempenho: 0,
        cobertura: 0,
        esquecimento: 0,
        dominio: 0,
        multiConcurso: 0,
        tendencia: 0,
        dificuldade: 0,
        simulado: 0,
        metaBloco: 0,
        grafo: 0
      }
    }
    expect(rankDisciplines(input, onlyWeight)[0].discipline.id).toBe(heavy.id)
  })

  it('alavancagem no grafo (M18) aumenta a prioridade com justificativa', () => {
    const plain = makeDiscipline()
    const leveraged = makeDiscipline({
      graphLeverage: 1,
      graphReason: 'concluir aqui destrava 3 tópico(s) no grafo'
    })
    const ranked = rankDisciplines(makeInput({ disciplines: [plain, leveraged] }))
    expect(ranked[0].discipline.id).toBe(leveraged.id)
    expect(ranked[0].reasons.join(' ')).toContain('destrava 3 tópico(s)')
  })

  it('score alto vira prioridade MUITO_ALTA; toda disciplina tem decomposição completa', () => {
    const critical = makeDiscipline({
      answeredCount: 30,
      correctCount: 6,
      daysSinceLastStudy: 20,
      weight: 2,
      examQuestionEstimate: 4,
      topicsRevisar: 3,
      graphLeverage: 0.6,
      graphReason: 'concluir aqui destrava 2 tópico(s) no grafo'
    })
    const ranked = rankDisciplines(
      makeInput({ daysUntilExam: 10, blockCutoffGap: { ESPECIFICO: 0.5 }, disciplines: [critical] })
    )
    expect(ranked[0].priority).toBe('MUITO_ALTA')
    expect(ranked[0].factors.length).toBe(Object.keys(STRATEGY_CONFIG.weights).length)
    expect(ranked[0].reasons.length).toBeGreaterThan(0)
  })
})

describe('generateDailyPlan', () => {
  it('respeita o tempo disponível', () => {
    const plan = generateDailyPlan(makeInput({ availableMinutes: 150 }))
    expect(plan.totalPlannedMinutes).toBeLessThanOrEqual(150)
    expect(plan.items.length).toBeGreaterThan(0)
  })

  it('inclui revisão FSRS quando há cards vencidos (e omite quando não há)', () => {
    const withDue = generateDailyPlan(makeInput({ dueReviewCards: 12 }))
    expect(withDue.items.some((i) => i.activity === 'REVISAO_FSRS')).toBe(true)
    const fsrs = withDue.items.find((i) => i.activity === 'REVISAO_FSRS')
    expect(fsrs?.reasons.join(' ')).toContain('12 card(s) vencido(s)')

    const without = generateDailyPlan(makeInput({ dueReviewCards: 0 }))
    expect(without.items.some((i) => i.activity === 'REVISAO_FSRS')).toBe(false)
  })

  it('atividade de questões carrega meta de questões coerente com o tempo', () => {
    const plan = generateDailyPlan(makeInput())
    const q = plan.items.find((i) => i.activity === 'QUESTOES')
    expect(q).toBeDefined()
    expect(q?.questionTarget).toBeGreaterThan(0)
  })

  it('sugere TEORIA quando há conhecimento disponível e pouca prática', () => {
    const novato = makeDiscipline({ answeredCount: 0, correctCount: 0, knowledgeCount: 5 })
    const plan = generateDailyPlan(makeInput({ disciplines: [novato] }))
    expect(plan.items[0]?.activity).toBe('TEORIA')
  })

  it('previsão: domínio completo conclui hoje; ritmo insuficiente pede mais minutos por dia', () => {
    const done = generateDailyPlan(
      makeInput({ disciplines: [makeDiscipline({ masteryPct: 100 })] })
    )
    expect(done.forecast.projectedFinishDate).toBe('2026-06-24')
    expect(done.forecast.finishBeforeExam).toBe(true)

    const behind = generateDailyPlan(
      makeInput({
        daysUntilExam: 5,
        availableMinutes: 30,
        disciplines: [makeDiscipline({ masteryPct: 0, examQuestionEstimate: 10 })]
      })
    )
    expect(behind.forecast.finishBeforeExam).toBe(false)
    expect(behind.forecast.requiredDailyMinutes).toBeGreaterThan(30)
  })

  it('toda recomendação tem justificativa, impacto e decomposição do score', () => {
    const plan = generateDailyPlan(makeInput({ dueReviewCards: 5 }))
    for (const item of plan.items) {
      expect(item.reasons.length).toBeGreaterThan(0)
      expect(item.expectedImpact.length).toBeGreaterThan(0)
      expect(item.factors.length).toBeGreaterThan(0)
      expect(item.score).toBeGreaterThanOrEqual(0)
      expect(item.score).toBeLessThanOrEqual(100)
    }
  })

  it('o ranking completo acompanha o plano (integração com Estatísticas/Aprovação)', () => {
    const input = makeInput()
    const plan = generateDailyPlan(input)
    expect(plan.ranking.length).toBe(input.disciplines.length)
    expect(plan.ranking[0].topReason.length).toBeGreaterThan(0)
  })
})
