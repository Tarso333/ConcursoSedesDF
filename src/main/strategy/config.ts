// Configuração do Motor de Estratégia — TODOS os pesos e limiares num único
// lugar. Ajustar a fórmula = editar este arquivo (nada mais muda).
// A soma dos pesos dos fatores é 100 → o score final fica em 0..100.

export interface StrategyConfig {
  /** Peso de cada fator na fórmula (Σ = 100). */
  weights: {
    peso: number // peso por questão da disciplina na prova
    incidencia: number // nº estimado de questões da disciplina
    urgencia: number // proximidade da data da prova
    desempenho: number // taxa de erro nas questões
    cobertura: number // quanto do conteúdo ainda não foi praticado
    esquecimento: number // tempo sem estudar a disciplina
    dominio: number // domínio declarado pelo usuário (status dos tópicos)
    multiConcurso: number // disciplina compartilhada entre concursos ativos
    tendencia: number // evolução recente (queda de acerto)
    dificuldade: number // dificuldade média das questões
    simulado: number // desempenho em simulados
    metaBloco: number // bloco abaixo do corte de eliminação (meta de aprovação)
  }
  /** Limiar de score (0..100) de cada nível de prioridade. */
  priorities: { muitoAlta: number; alta: number; media: number }
  /** Parâmetros de alocação de tempo do plano do dia. */
  allocation: {
    minBlockMinutes: number
    maxBlockMinutes: number
    roundToMinutes: number
    maxItems: number
    fsrsMinutesPerCard: number
    fsrsMinMinutes: number
    fsrsMaxMinutes: number
    minutesPerQuestion: number
  }
  /** Modelo de previsão de conclusão do edital. */
  forecast: {
    minutesPerIncidenceUnit: number // orçamento de estudo por "questão estimada na prova"
    targetAccuracy: number // acerto-alvo usado no impacto esperado
  }
  /** Regra de escolha da atividade (teoria × questões). */
  theory: { minAnswered: number; minAccuracy: number }
}

export const STRATEGY_CONFIG: StrategyConfig = {
  weights: {
    peso: 14,
    incidencia: 12,
    urgencia: 12,
    desempenho: 16,
    cobertura: 8,
    esquecimento: 10,
    dominio: 6,
    multiConcurso: 6,
    tendencia: 4,
    dificuldade: 3,
    simulado: 3,
    metaBloco: 6
  },
  priorities: { muitoAlta: 70, alta: 50, media: 32 },
  allocation: {
    minBlockMinutes: 15,
    maxBlockMinutes: 45,
    roundToMinutes: 5,
    maxItems: 8,
    fsrsMinutesPerCard: 0.6,
    fsrsMinMinutes: 10,
    fsrsMaxMinutes: 30,
    minutesPerQuestion: 1.6
  },
  forecast: { minutesPerIncidenceUnit: 45, targetAccuracy: 0.85 },
  theory: { minAnswered: 5, minAccuracy: 0.5 }
}
