import { contextBridge, ipcRenderer } from 'electron'
import type {
  AnswerInput,
  DeckInput,
  ErrorFilter,
  ErrorType,
  FlashcardInput,
  QuestionFilter,
  ReviewRating
} from '@shared/domain'
import { IPC, type AppApi, type SettingsUpdateInput } from '@shared/ipc'

const api: AppApi = {
  getInfo: () => ipcRenderer.invoke(IPC.appGetInfo),
  getSettings: () => ipcRenderer.invoke(IPC.settingsGet),
  updateSettings: (input: SettingsUpdateInput) => ipcRenderer.invoke(IPC.settingsUpdate, input),
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
    ipcRenderer.invoke(IPC.reviewRate, srsCardId, rating)
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
