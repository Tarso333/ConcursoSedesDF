// Contrato da ponte IPC (renderer ↔ main). É a fonte da verdade de tipos da fronteira.
import type {
  AppInfo,
  DashboardOverview,
  Discipline,
  DisciplineWithStats,
  Settings,
  ThemeMode,
  Topic
} from './domain'

// Nomes de canais centralizados para evitar strings soltas.
export const IPC = {
  appGetInfo: 'app:getInfo',
  settingsGet: 'settings:get',
  settingsUpdate: 'settings:update',
  catalogDisciplines: 'catalog:disciplines',
  catalogTopics: 'catalog:topics',
  catalogDisciplinesWithStats: 'catalog:disciplinesWithStats',
  dashboardOverview: 'dashboard:overview'
} as const

export interface SettingsUpdateInput {
  userName?: string
  theme?: ThemeMode
  examDate?: string
  dailyGoalMinutes?: number
  dailyGoalQuestions?: number
  aiProvider?: string | null
  aiModel?: string | null
  aiApiKey?: string | null
}

// A interface exposta em window.api. Cada método mapeia 1:1 para um canal.
export interface AppApi {
  getInfo(): Promise<AppInfo>
  getSettings(): Promise<Settings>
  updateSettings(input: SettingsUpdateInput): Promise<Settings>
  getDisciplines(): Promise<Discipline[]>
  getTopics(disciplineId: number): Promise<Topic[]>
  getDisciplinesWithStats(): Promise<DisciplineWithStats[]>
  getDashboardOverview(): Promise<DashboardOverview>
}
