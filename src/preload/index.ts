import { contextBridge, ipcRenderer } from 'electron'
import type {
  AnswerInput,
  DeckInput,
  ErrorFilter,
  ErrorType,
  FlashcardInput,
  MockAnswerInput,
  MockExamConfig,
  QuestionFilter,
  ReviewRating
} from '@shared/domain'
import { IPC, type AppApi, type ContestUpdateInput, type SettingsUpdateInput } from '@shared/ipc'

const api: AppApi = {
  getInfo: () => ipcRenderer.invoke(IPC.appGetInfo),
  getSettings: () => ipcRenderer.invoke(IPC.settingsGet),
  updateSettings: (input: SettingsUpdateInput) => ipcRenderer.invoke(IPC.settingsUpdate, input),
  listContests: () => ipcRenderer.invoke(IPC.contestsList),
  getActiveContest: () => ipcRenderer.invoke(IPC.contestGetActive),
  setActiveContest: (id: number) => ipcRenderer.invoke(IPC.contestSetActive, id),
  updateContest: (id: number, input: ContestUpdateInput) =>
    ipcRenderer.invoke(IPC.contestUpdate, id, input),
  getDisciplines: () => ipcRenderer.invoke(IPC.catalogDisciplines),
  getTopics: (disciplineId: number) => ipcRenderer.invoke(IPC.catalogTopics, disciplineId),
  getDisciplinesWithStats: () => ipcRenderer.invoke(IPC.catalogDisciplinesWithStats),
  getDashboardOverview: () => ipcRenderer.invoke(IPC.dashboardOverview),
  getPracticeQuestions: (filter: QuestionFilter, limit: number) =>
    ipcRenderer.invoke(IPC.questionsPractice, filter, limit),
  countQuestions: (filter: QuestionFilter) => ipcRenderer.invoke(IPC.questionsCount, filter),
  answerQuestion: (input: AnswerInput) => ipcRenderer.invoke(IPC.questionsAnswer, input),
  toggleFavorite: (questionId: number) => ipcRenderer.invoke(IPC.questionsToggleFavorite, questionId),
  listErrors: (filter: ErrorFilter) => ipcRenderer.invoke(IPC.errorsList, filter),
  getErrorStats: () => ipcRenderer.invoke(IPC.errorsStats),
  setErrorType: (id: number, errorType: ErrorType) =>
    ipcRenderer.invoke(IPC.errorsSetType, id, errorType),
  resolveError: (id: number) => ipcRenderer.invoke(IPC.errorsResolve, id),
  listDecks: () => ipcRenderer.invoke(IPC.decksList),
  createDeck: (input: DeckInput) => ipcRenderer.invoke(IPC.deckCreate, input),
  deleteDeck: (id: number) => ipcRenderer.invoke(IPC.deckDelete, id),
  listFlashcards: (deckId: number) => ipcRenderer.invoke(IPC.flashcardsList, deckId),
  createFlashcard: (input: FlashcardInput) => ipcRenderer.invoke(IPC.flashcardCreate, input),
  deleteFlashcard: (id: number) => ipcRenderer.invoke(IPC.flashcardDelete, id),
  generateFlashcardsFromErrors: (deckId: number, limit: number) =>
    ipcRenderer.invoke(IPC.flashcardsGenerateFromErrors, deckId, limit),
  getDueCards: (limit: number) => ipcRenderer.invoke(IPC.reviewDue, limit),
  getReviewStats: () => ipcRenderer.invoke(IPC.reviewStats),
  rateCard: (srsCardId: number, rating: ReviewRating) =>
    ipcRenderer.invoke(IPC.reviewRate, srsCardId, rating),
  createMockExam: (config: MockExamConfig) => ipcRenderer.invoke(IPC.simCreate, config),
  finishMockExam: (examId: number, ans: MockAnswerInput[]) =>
    ipcRenderer.invoke(IPC.simFinish, examId, ans),
  getMockHistory: () => ipcRenderer.invoke(IPC.simHistory),
  getMockResult: (examId: number) => ipcRenderer.invoke(IPC.simResult, examId),
  getGamification: () => ipcRenderer.invoke(IPC.gamificationProgress),
  getStatsOverview: () => ipcRenderer.invoke(IPC.statsOverview),
  getStudyPlan: () => ipcRenderer.invoke(IPC.planGet),
  generateStudyPlan: (dailyMinutes: number) => ipcRenderer.invoke(IPC.planGenerate, dailyMinutes),
  toggleStudyTask: (id: number) => ipcRenderer.invoke(IPC.planToggleTask, id),
  getApprovalPlan: () => ipcRenderer.invoke(IPC.approvalPlan),
  getAiStatus: () => ipcRenderer.invoke(IPC.aiStatus),
  getAiHistory: () => ipcRenderer.invoke(IPC.aiHistory),
  sendAiMessage: (content: string) => ipcRenderer.invoke(IPC.aiSend, content),
  clearAiHistory: () => ipcRenderer.invoke(IPC.aiClear),
  exportBackup: () => ipcRenderer.invoke(IPC.backupExport),
  importBackup: () => ipcRenderer.invoke(IPC.backupImport)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error fallback sem contextIsolation
  window.api = api
}
