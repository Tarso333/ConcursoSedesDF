// Contrato da ponte IPC (renderer ↔ main). É a fonte da verdade de tipos da fronteira.
import type {
  AiMessageDTO,
  AiStatus,
  AnswerInput,
  AnswerResult,
  AppInfo,
  ApprovalPlan,
  Contest,
  ContestUpdateInput,
  DashboardOverview,
  Deck,
  DeckInput,
  Discipline,
  DisciplineWithStats,
  DueCard,
  ErrorFilter,
  ErrorLogItem,
  ErrorStats,
  ErrorType,
  Flashcard,
  FlashcardInput,
  GamificationProgress,
  MockAnswerInput,
  MockExamConfig,
  MockExamResult,
  MockExamSession,
  MockHistoryItem,
  QuestionFilter,
  QuestionForPractice,
  ReviewRating,
  ReviewResult,
  ReviewStats,
  Settings,
  StatsOverview,
  StudyPlanView,
  ThemeMode,
  Topic,
  TopicKnowledgeView,
  TopicStatus,
  TopicTreeNode
} from './domain'

// Inputs de canal que vivem no domínio, re-exportados como parte do contrato.
export type { ContestUpdateInput } from './domain'

// Nomes de canais centralizados para evitar strings soltas.
export const IPC = {
  appGetInfo: 'app:getInfo',
  settingsGet: 'settings:get',
  settingsUpdate: 'settings:update',
  contestsList: 'contests:list',
  contestGetActive: 'contests:getActive',
  contestSetActive: 'contests:setActive',
  contestUpdate: 'contests:update',
  catalogDisciplines: 'catalog:disciplines',
  catalogTopics: 'catalog:topics',
  catalogDisciplinesWithStats: 'catalog:disciplinesWithStats',
  contentTree: 'content:tree',
  contentTopic: 'content:topic',
  contentSetTopicStatus: 'content:setTopicStatus',
  dashboardOverview: 'dashboard:overview',
  questionsPractice: 'questions:practice',
  questionsCount: 'questions:count',
  questionsAnswer: 'questions:answer',
  questionsToggleFavorite: 'questions:toggleFavorite',
  errorsList: 'errors:list',
  errorsStats: 'errors:stats',
  errorsSetType: 'errors:setType',
  errorsResolve: 'errors:resolve',
  decksList: 'decks:list',
  deckCreate: 'decks:create',
  deckDelete: 'decks:delete',
  flashcardsList: 'flashcards:list',
  flashcardCreate: 'flashcards:create',
  flashcardDelete: 'flashcards:delete',
  flashcardsGenerateFromErrors: 'flashcards:generateFromErrors',
  reviewDue: 'review:due',
  reviewStats: 'review:stats',
  reviewRate: 'review:rate',
  simCreate: 'sim:create',
  simFinish: 'sim:finish',
  simHistory: 'sim:history',
  simResult: 'sim:result',
  gamificationProgress: 'gamification:progress',
  statsOverview: 'stats:overview',
  planGet: 'plan:get',
  planGenerate: 'plan:generate',
  planToggleTask: 'plan:toggleTask',
  approvalPlan: 'approval:plan',
  aiStatus: 'ai:status',
  aiHistory: 'ai:history',
  aiSend: 'ai:send',
  aiClear: 'ai:clear',
  backupExport: 'backup:export',
  backupImport: 'backup:import'
} as const

export interface SettingsUpdateInput {
  userName?: string
  theme?: ThemeMode
  dailyGoalMinutes?: number
  dailyGoalQuestions?: number
  aiProvider?: string | null
  aiModel?: string | null
  aiApiKey?: string | null
}

// A interface exposta em window.api. Cada método mapeia 1:1 para um canal.
// Observação de arquitetura: o renderer NUNCA envia contestId — o processo
// main resolve o concurso ativo e escopa todas as consultas por ele.
export interface AppApi {
  getInfo(): Promise<AppInfo>
  getSettings(): Promise<Settings>
  updateSettings(input: SettingsUpdateInput): Promise<Settings>
  // Concursos
  listContests(): Promise<Contest[]>
  getActiveContest(): Promise<Contest>
  setActiveContest(id: number): Promise<Contest>
  updateContest(id: number, input: ContestUpdateInput): Promise<Contest>
  getDisciplines(): Promise<Discipline[]>
  getTopics(disciplineId: number): Promise<Topic[]>
  getDisciplinesWithStats(): Promise<DisciplineWithStats[]>
  // Engine de Conhecimento (M15)
  getContentTree(disciplineId: number): Promise<TopicTreeNode[]>
  getTopicKnowledge(topicId: number): Promise<TopicKnowledgeView>
  setTopicStatus(topicId: number, status: TopicStatus): Promise<void>
  getDashboardOverview(): Promise<DashboardOverview>
  getPracticeQuestions(filter: QuestionFilter, limit: number): Promise<QuestionForPractice[]>
  countQuestions(filter: QuestionFilter): Promise<number>
  answerQuestion(input: AnswerInput): Promise<AnswerResult>
  toggleFavorite(questionId: number): Promise<{ favorite: boolean }>
  // Caderno de erros (M4)
  listErrors(filter: ErrorFilter): Promise<ErrorLogItem[]>
  getErrorStats(): Promise<ErrorStats>
  setErrorType(id: number, errorType: ErrorType): Promise<void>
  resolveError(id: number): Promise<void>
  // Flashcards & decks (M5)
  listDecks(): Promise<Deck[]>
  createDeck(input: DeckInput): Promise<Deck>
  deleteDeck(id: number): Promise<void>
  listFlashcards(deckId: number): Promise<Flashcard[]>
  createFlashcard(input: FlashcardInput): Promise<Flashcard>
  deleteFlashcard(id: number): Promise<void>
  generateFlashcardsFromErrors(deckId: number, limit: number): Promise<{ created: number }>
  // Revisão espaçada / FSRS (M6)
  getDueCards(limit: number): Promise<DueCard[]>
  getReviewStats(): Promise<ReviewStats>
  rateCard(srsCardId: number, rating: ReviewRating): Promise<ReviewResult>
  // Simulados (M7)
  createMockExam(config: MockExamConfig): Promise<MockExamSession>
  finishMockExam(examId: number, answers: MockAnswerInput[]): Promise<MockExamResult>
  getMockHistory(): Promise<MockHistoryItem[]>
  getMockResult(examId: number): Promise<MockExamResult>
  // Gamificação (M9)
  getGamification(): Promise<GamificationProgress>
  // Estatísticas (M8)
  getStatsOverview(): Promise<StatsOverview>
  // Planejamento (M10)
  getStudyPlan(): Promise<StudyPlanView>
  generateStudyPlan(dailyMinutes: number): Promise<StudyPlanView>
  toggleStudyTask(id: number): Promise<void>
  // Modo Aprovação (M11)
  getApprovalPlan(): Promise<ApprovalPlan>
  // Tutor IA (M12)
  getAiStatus(): Promise<AiStatus>
  getAiHistory(): Promise<AiMessageDTO[]>
  sendAiMessage(content: string): Promise<AiMessageDTO>
  clearAiHistory(): Promise<void>
  // Backup (M13)
  exportBackup(): Promise<{ ok: boolean; path?: string; canceled?: boolean }>
  importBackup(): Promise<{ ok: boolean; canceled?: boolean }>
}
