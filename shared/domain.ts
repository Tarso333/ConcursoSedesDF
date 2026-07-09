// Tipos de domínio compartilhados entre main e renderer (formato de transporte).
// Não importar nada do Node/Drizzle aqui — este módulo é neutro.

export type DisciplineBlock = 'GERAL' | 'ESPECIFICO'
export type QuestionType = 'ME' | 'CE' // Múltipla Escolha | Certo/Errado
export type Difficulty = 'FACIL' | 'MEDIO' | 'DIFICIL'
export type AnswerSource = 'BANCO' | 'SIMULADO' | 'REVISAO' | 'DIAGNOSTICO'
export type MockExamMode = 'OFICIAL' | 'DISCIPLINA' | 'PERSONALIZADO' | 'DIAGNOSTICO'
export type MockExamStatus = 'EM_ANDAMENTO' | 'CONCLUIDO'
export type ErrorStatus = 'ABERTO' | 'COMPREENDIDO'
export type GoalPeriod = 'DIARIA' | 'SEMANAL' | 'MENSAL'
export type StudyTaskType = 'TEORIA' | 'QUESTOES' | 'REVISAO' | 'SIMULADO'
export type ThemeMode = 'light' | 'dark'

// ───────── Concurso (agregado central da plataforma) ─────────
// Toda a estrutura da prova é DADO (exam_config), nunca regra fixa em código:
// blocos, contagem de questões, peso por questão, cortes e duração.
export interface ExamBlockConfig {
  block: DisciplineBlock
  label: string // rótulo exibido na UI (ex.: "Conhecimentos Gerais")
  questions: number // nº de questões do bloco na prova oficial
  weightPerQuestion: number // pontos por acerto no bloco
  minScorePct: number // corte de eliminação do bloco (0..100)
}

export interface ExamConfig {
  durationMin: number // duração da prova oficial em minutos
  blocks: ExamBlockConfig[]
  approvalTargetPct?: number // % da pontuação máxima estimada como "nota de aprovação"
}

export interface Contest {
  id: number
  slug: string
  name: string
  role: string | null // cargo
  board: string | null // banca
  examDate: string | null // ISO yyyy-mm-dd
  city: string | null
  salary: string | null
  benefits: string | null
  examConfig: ExamConfig | null
}

export interface ContestUpdateInput {
  name?: string
  role?: string | null
  board?: string | null
  examDate?: string | null
  city?: string | null
  salary?: string | null
  benefits?: string | null
}

export interface Discipline {
  id: number
  slug: string
  name: string
  block: DisciplineBlock
  weight: number
  examQuestionEstimate: number
  color: string
  orderIndex: number
}

export interface Topic {
  id: number
  disciplineId: number
  parentId: number | null
  name: string
  slug: string
  orderIndex: number
}

export interface DisciplineWithStats extends Discipline {
  topicsCount: number
  questionsCount: number
  answeredCount: number
  correctCount: number
  accuracy: number // 0..1
  masteryPct: number // 0..100 — proxy de domínio do conteúdo
}

export interface QuestionOption {
  id: number
  questionId: number
  letter: string
  text: string
  isCorrect: boolean
  orderIndex: number
}

export interface Question {
  id: number
  disciplineId: number
  topicId: number | null
  type: QuestionType
  statement: string
  difficulty: Difficulty
  explanation: string | null
  source: string | null
  year: number | null
  board: string
  options: QuestionOption[]
}

export type QuestionFilterStatus =
  | 'TODAS'
  | 'NAO_RESPONDIDAS'
  | 'ERRADAS'
  | 'ACERTADAS'
  | 'FAVORITAS'

export interface QuestionFilter {
  disciplineId?: number | null
  topicId?: number | null
  difficulty?: Difficulty | null
  type?: QuestionType | null
  status?: QuestionFilterStatus
  search?: string | null
}

export interface QuestionForPractice extends Question {
  disciplineName: string
  disciplineColor: string
  topicName: string | null
  favorite: boolean
  answeredCount: number
  lastCorrect: boolean | null
}

export interface AnswerInput {
  questionId: number
  selectedOptionId: number
  timeMs: number
  source?: AnswerSource
}

export interface AnswerResult {
  isCorrect: boolean
  correctOptionId: number
  explanation: string | null
}

// ───────── Engine de Conhecimento (M15) ─────────
// Conhecimento = conteúdo do edital (imutável durante o estudo).
// Progresso = estado do usuário (entidades próprias; nunca mistura).
//
// KnowledgeEntry é um bloco de conteúdo tipado (padrão content-block):
// adicionar um novo tipo = novo valor de `kind` + um renderizador na UI —
// sem migration e sem alterar funcionalidades existentes (Open/Closed).
export type KnowledgeKind =
  | 'RESUMO' // corpo em markdown
  | 'CONCEITO' // title = conceito, body = definição
  | 'LEGISLACAO' // reference = dispositivo legal, body = teor/comentário
  | 'JURISPRUDENCIA' // reference = tribunal/tese, body = entendimento
  | 'DICA' // dica de prova
  | 'PEGADINHA' // pegadinha comum da banca
  | 'OBSERVACAO'
  | 'PALAVRA_CHAVE' // title = termo
  | 'LINK' // url + title
  | 'VIDEO' // url + title
  | 'PDF' // url/caminho + title
  | 'MAPA_MENTAL' // reservado (futuro): body = estrutura do mapa

export interface KnowledgeEntry {
  id: number
  topicId: number
  kind: KnowledgeKind
  title: string | null
  body: string | null // markdown
  reference: string | null // referência normativa/fonte
  url: string | null
  orderIndex: number
}

export type TopicStatus = 'NAO_ESTUDADO' | 'ESTUDANDO' | 'REVISAR' | 'DOMINADO'

export interface TopicTreeNode {
  id: number
  parentId: number | null
  name: string
  orderIndex: number
  questionCount: number
  flashcardCount: number
  knowledgeCount: number
  answeredCount: number
  accuracy: number // 0..1 (derivada das respostas)
  status: TopicStatus
  children: TopicTreeNode[]
}

export interface TopicKnowledgeView {
  topicId: number
  topicName: string
  parentName: string | null
  disciplineId: number
  disciplineName: string
  disciplineColor: string
  status: TopicStatus
  lastStudiedAt: string | null
  connections: TopicConnections
  entries: KnowledgeEntry[]
  stats: {
    questionCount: number
    answeredCount: number
    correctCount: number
    accuracy: number // 0..1
    flashcardCount: number
  }
}

// ───────── Caderno de erros (M4) ─────────
export type ErrorType = 'CONTEUDO' | 'INTERPRETACAO' | 'DISTRACAO' | 'PEGADINHA' | 'CHUTE' | 'REVISAR'

export interface ErrorLogItem {
  id: number
  questionId: number
  disciplineName: string
  disciplineColor: string
  statement: string
  explanation: string | null
  correctText: string | null
  errorType: string | null
  status: ErrorStatus
  createdAt: string
}

export interface ErrorFilter {
  disciplineId?: number | null
  status?: ErrorStatus | 'TODOS'
}

export interface ErrorStats {
  open: number
  resolved: number
  byDiscipline: { name: string; color: string; count: number }[]
}

// ───────── Flashcards & decks (M5) ─────────
export interface Deck {
  id: number
  name: string
  disciplineId: number | null
  description: string | null
  cardCount: number
  dueCount: number
}

export interface Flashcard {
  id: number
  deckId: number
  front: string
  back: string
  sourceQuestionId: number | null
}

export interface DeckInput {
  name: string
  disciplineId?: number | null
  description?: string | null
}

export interface FlashcardInput {
  deckId: number
  front: string
  back: string
}

// ───────── Revisão espaçada / FSRS (M6) ─────────
export type ReviewRating = 1 | 2 | 3 | 4 // Errei | Difícil | Bom | Fácil

export interface DueCard {
  srsCardId: number
  flashcardId: number
  deckId: number
  deckName: string
  front: string
  back: string
  state: number
}

export interface ReviewResult {
  nextDue: string
  intervalDays: number
}

export interface ReviewStats {
  dueNow: number
  reviewedToday: number
  total: number
}

// ───────── Gamificação (M9) ─────────
export interface Achievement {
  code: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt: string | null
}

export interface GamificationProgress {
  xp: number
  level: number
  xpIntoLevel: number
  xpForNextLevel: number
  streakDays: number
  longestStreak: number
  dailyGoalQuestions: number
  answeredToday: number
  achievements: Achievement[]
}

// ───────── Estatísticas (M8) ─────────
export interface RadarPoint {
  discipline: string
  accuracy: number // 0..100
  block: DisciplineBlock
}

export interface StatsOverview {
  totalAnswered: number
  accuracy: number
  byDifficulty: { difficulty: Difficulty; answered: number; accuracy: number }[]
  radar: RadarPoint[]
  daily: DailyPoint[] // últimos 30 dias
  readinessPct: number
  bestDisciplines: DisciplineScore[]
  worstDisciplines: DisciplineScore[]
}

// ───────── Planejamento (M10) ─────────
export interface StudyTaskItem {
  id: number
  disciplineId: number | null
  disciplineName: string | null
  disciplineColor: string | null
  date: string
  type: StudyTaskType
  title: string
  plannedMinutes: number
  done: boolean
}

export interface StudyPlanView {
  planId: number | null
  startDate: string
  examDate: string
  dailyMinutes: number
  totalTasks: number
  doneTasks: number
  byDate: { date: string; tasks: StudyTaskItem[] }[]
}

// ───────── Modo Aprovação (M11) ─────────
export interface PriorityDiscipline {
  disciplineId: number
  name: string
  color: string
  block: DisciplineBlock
  weight: number
  accuracy: number
  answeredCount: number
  priorityScore: number
  reason: string
}

export interface ApprovalPlan {
  daysUntilExam: number
  approvalEstimatePct: number
  focus: PriorityDiscipline[]
  actions: { label: string; detail: string; route: string }[]
}

// ───────── Motor de Estratégia de Estudos (M16) ─────────
// Determinístico e 100% explicável: cada recomendação carrega o próprio
// score decomposto em fatores (com justificativa legível por fator).
export type PlanActivity = 'TEORIA' | 'QUESTOES' | 'REVISAO_FSRS'
export type PlanPriority = 'MUITO_ALTA' | 'ALTA' | 'MEDIA' | 'BAIXA'

export interface PlanFactorScore {
  key: string
  label: string
  weight: number // peso do fator na fórmula (Σ = 100)
  value: number // intensidade normalizada 0..1
  points: number // contribuição = weight × value
  reason: string | null // justificativa legível (quando saliente)
}

export interface DailyPlanItem {
  id: string
  activity: PlanActivity
  disciplineId: number | null
  disciplineName: string
  disciplineColor: string
  minutes: number
  questionTarget: number | null // para QUESTOES: meta de questões
  score: number // 0..100
  priority: PlanPriority
  reasons: string[]
  factors: PlanFactorScore[] // decomposição completa do score
  expectedImpact: string
}

export interface PlanRankingItem {
  disciplineId: number
  name: string
  color: string
  block: DisciplineBlock
  score: number
  priority: PlanPriority
  activity: PlanActivity
  topReason: string
}

export interface PlanForecast {
  editalCoveragePct: number
  projectedFinishDate: string | null // yyyy-mm-dd
  finishBeforeExam: boolean | null
  requiredDailyMinutes: number | null // p/ concluir antes da prova
  daysUntilExam: number | null
}

export interface DailyPlan {
  availableMinutes: number
  totalPlannedMinutes: number
  items: DailyPlanItem[]
  ranking: PlanRankingItem[]
  forecast: PlanForecast
  generatedAt: string
}

// ───────── Relationship Engine / Grafo de Aprendizagem (M18) ─────────
// O edital deixa de ser lista: tópicos se relacionam num grafo tipado.
export type RelationKind =
  | 'PRE_REQUISITO' // origem é pré-requisito do destino (origem → destino)
  | 'DEPENDE_DE' // origem depende do destino (destino vem antes)
  | 'COMPLEMENTA' // bidirecional
  | 'ESTUDADO_JUNTO' // bidirecional
  | 'SEMELHANTE' // bidirecional
  | 'CONTINUIDADE' // destino é a continuação natural da origem
  | 'REVISAO_RECOMENDADA' // ao estudar a origem, revisar o destino
  | 'RELACIONADO' // conteúdo relacionado (bidirecional)

export interface RelatedTopicRef {
  topicId: number
  name: string
  disciplineId: number
  disciplineName: string
  disciplineColor: string
  kind: RelationKind
  strength: number // 0..1
  note: string | null
  status: TopicStatus
}

/** Conexões de um tópico, já resolvidas para exibição. */
export interface TopicConnections {
  prerequisites: RelatedTopicRef[] // o que estudar antes
  dependents: RelatedTopicRef[] // o que este tópico destrava
  next: RelatedTopicRef[] // próximos assuntos recomendados
  related: RelatedTopicRef[] // complementares/semelhantes/relacionados
}

export interface UnlockResult {
  unlocked: RelatedTopicRef[] // tópicos que ficaram prontos ao dominar este
}

/** Nó da árvore navegável do grafo (visualização). */
export interface GraphTreeNode {
  topicId: number
  name: string
  disciplineId: number
  disciplineName: string
  status: TopicStatus
  kindFromParent: RelationKind | null
  strength: number
  children: GraphTreeNode[]
}

export interface DisciplineGraphView {
  roots: GraphTreeNode[]
  unlinkedCount: number // tópicos da disciplina ainda sem conexões
}

/** Métricas de grafo calculadas pelo Learning Analytics. */
export interface GraphAnalytics {
  mostConnected: { topicId: number; name: string; disciplineName: string; connections: number }[]
  bottlenecks: { topicId: number; name: string; disciplineName: string; blocks: number }[]
  chains: {
    key: string
    title: string
    coveragePct: number
    topics: { topicId: number; name: string; mastered: boolean }[]
  }[]
}

// ───────── Learning Analytics Engine (M17) ─────────
// Projeções DERIVADAS do event log (answers/srs_reviews/sessões/status).
// Nada é cadastrado manualmente; tudo é recomputável por replay.
export type LearningTrend = 'MELHORANDO' | 'ESTAVEL' | 'PIORANDO'

export interface AnalyticsIndicator {
  key: string
  label: string
  value: number | null // null = dados insuficientes
  unit: string // '%', 's', 'dias', 'min'…
  detail: string // explicação legível do número
}

export interface CurvePoint {
  date: string // yyyy-mm-dd
  masteryPct: number // 0..100
}

export interface TopicMasteryCell {
  topicId: number
  name: string
  masteryPct: number
  answeredCount: number
  trend: LearningTrend
}

export interface DisciplineHeatmapRow {
  disciplineId: number
  name: string
  color: string
  coveragePct: number // tópicos efetivamente praticados
  masteryPct: number // domínio médio derivado
  topics: TopicMasteryCell[]
}

export interface TopicDelta {
  topicId: number
  name: string
  disciplineName: string
  color: string
  deltaPp: number // variação de domínio em pontos percentuais
  curve: CurvePoint[]
}

export interface LearningProfileTrait {
  key: string
  label: string // dimensão (ex.: "Velocidade de aprendizagem")
  classification: string // ex.: "Aprende rápido"
  description: string // como foi calculado
  favorable: boolean | null // null = neutro/dados insuficientes
}

export interface TopicConfidenceRef {
  topicId: number
  name: string
  disciplineName: string
  declared: TopicStatus
  masteryPct: number
}

export interface LearningAnalytics {
  generatedAt: string
  graph: GraphAnalytics
  indicators: AnalyticsIndicator[] // registro extensível (Open/Closed)
  rollingAccuracy: { windowDays: number; accuracy: number | null; answered: number }[]
  learningCurve: CurvePoint[] // domínio global por semana (replay)
  forgettingCurve: CurvePoint[] // projeção determinística sem prática
  heatmap: DisciplineHeatmapRow[]
  biggestImprovement: TopicDelta | null // da semana
  biggestRegression: TopicDelta | null
  profile: LearningProfileTrait[]
  overconfident: TopicConfidenceRef[] // declarado dominado, domínio baixo
  underconfident: TopicConfidenceRef[] // domínio alto, não declarado
  methodStats: { source: string; label: string; answered: number; accuracy: number }[]
  globalTrend: LearningTrend
}

// ───────── Tutor IA (M12) ─────────
export interface AiMessageDTO {
  id: number
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface AiStatus {
  configured: boolean
  provider: string | null
  model: string | null
}

// ───────── Simulados (M7) ─────────
export interface MockExamConfig {
  mode: MockExamMode
  disciplineId?: number | null
  totalQuestions?: number
}

export interface SimOption {
  id: number
  letter: string
  text: string
}

export interface SimQuestion {
  itemId: number
  questionId: number
  type: QuestionType
  difficulty: Difficulty
  statement: string
  disciplineId: number
  disciplineName: string
  disciplineColor: string
  block: DisciplineBlock
  options: SimOption[]
}

export interface MockExamSession {
  examId: number
  title: string
  mode: MockExamMode
  timeLimitSec: number | null
  questions: SimQuestion[]
}

export interface MockAnswerInput {
  itemId: number
  selectedOptionId: number | null
  timeMs: number
}

export interface MockResultItem {
  questionId: number
  disciplineName: string
  statement: string
  correct: boolean
  answered: boolean
  selectedOptionId: number | null
  correctOptionId: number
  explanation: string | null
}

export interface MockDisciplineScore {
  name: string
  color: string
  correct: number
  total: number
}

// Pontuação por bloco calculada a partir do exam_config do concurso —
// substitui os antigos campos fixos de "gerais/específicos".
export interface MockBlockScore {
  block: DisciplineBlock
  label: string
  points: number
  max: number
  minScorePct: number
  belowCutoff: boolean
}

export interface MockExamResult {
  examId: number
  title: string
  mode: MockExamMode
  totalQuestions: number
  answered: number
  correct: number
  scorePoints: number
  maxPoints: number
  scorePct: number
  blockScores: MockBlockScore[]
  eliminated: boolean
  byDiscipline: MockDisciplineScore[]
  items: MockResultItem[]
}

export interface MockHistoryItem {
  id: number
  title: string
  mode: MockExamMode
  totalQuestions: number
  scorePct: number
  finishedAt: string | null
}

// Preferências do usuário (globais). Dados do concurso — inclusive a data da
// prova — vivem no agregado Contest; aqui fica apenas o que é da pessoa.
export interface Settings {
  userName: string
  theme: ThemeMode
  dailyGoalMinutes: number
  dailyGoalQuestions: number
  aiProvider: string | null
  aiModel: string | null
  hasAiKey: boolean
}

export interface DisciplineScore {
  disciplineId: number
  name: string
  block: DisciplineBlock
  color: string
  accuracy: number
  answeredCount: number
}

export interface DailyPoint {
  date: string // yyyy-mm-dd
  answered: number
  correct: number
  studyMinutes: number
}

export interface DashboardOverview {
  userName: string
  contestName: string
  boardName: string | null
  examDate: string | null
  daysUntilExam: number
  // Bloco de maior peso total na prova (para o texto de foco na UI); null
  // quando o concurso tem um único bloco ou não tem exam_config.
  heavyBlockLabel: string | null
  heavyBlockSharePct: number | null
  editalProgressPct: number
  totalQuestions: number
  answeredCount: number
  correctCount: number
  wrongCount: number
  accuracy: number // 0..1
  studyMinutesTotal: number
  studyStreakDays: number
  xp: number
  level: number
  strongDisciplines: DisciplineScore[]
  weakDisciplines: DisciplineScore[]
  last14Days: DailyPoint[]
  approvalEstimatePct: number // estimativa de probabilidade de aprovação
}

export interface AppInfo {
  version: string
  dbPath: string
  isPackaged: boolean
}
