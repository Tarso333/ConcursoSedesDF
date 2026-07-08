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
