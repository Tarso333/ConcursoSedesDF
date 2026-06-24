// Contrato da ponte IPC (renderer ↔ main). É a fonte da verdade de tipos da fronteira.
import type {
  AnswerInput,
  AnswerResult,
  AppInfo,
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
  QuestionFilter,
  QuestionForPractice,
  ReviewRating,
  ReviewResult,
  ReviewStats,
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
  reviewRate: 'review:rate'
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
}
