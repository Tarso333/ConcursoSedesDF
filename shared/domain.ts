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

export interface Settings {
  userName: string
  theme: ThemeMode
  examDate: string // ISO yyyy-mm-dd
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
  examDate: string
  daysUntilExam: number
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
