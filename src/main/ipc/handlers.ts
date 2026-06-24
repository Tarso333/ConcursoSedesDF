import { app, ipcMain } from 'electron'
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
import { IPC, type SettingsUpdateInput } from '@shared/ipc'
import { getDbPath } from '../db/connection'
import {
  getDisciplines,
  getDisciplinesWithStats,
  getTopics
} from '../repositories/catalogRepository'
import {
  createDeck,
  createFlashcard,
  deleteDeck,
  deleteFlashcard,
  generateFlashcardsFromErrors,
  listDecks,
  listFlashcards
} from '../repositories/deckRepository'
import {
  getErrorStats,
  listErrors,
  resolveError,
  setErrorType
} from '../repositories/errorRepository'
import {
  answerQuestion,
  countQuestions,
  getPracticeQuestions,
  toggleFavorite
} from '../repositories/questionRepository'
import { getSettings, updateSettings } from '../repositories/settingsRepository'
import { getApprovalPlan } from '../services/approvalService'
import { clearAiHistory, getAiHistory, getAiStatus, sendAiMessage } from '../services/aiService'
import { exportBackup, importBackup } from '../services/backupService'
import { getDashboardOverview } from '../services/dashboardService'
import { getGamification } from '../services/gamificationService'
import { generateStudyPlan, getStudyPlan, toggleStudyTask } from '../services/planningService'
import { getDueCards, getReviewStats, rateCard } from '../services/reviewService'
import {
  createMockExam,
  finishMockExam,
  getMockHistory,
  getMockResult
} from '../services/simuladoService'
import { getStatsOverview } from '../services/statsService'

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC.appGetInfo, () => ({
    version: app.getVersion(),
    dbPath: getDbPath(),
    isPackaged: app.isPackaged
  }))

  ipcMain.handle(IPC.settingsGet, () => getSettings())
  ipcMain.handle(IPC.settingsUpdate, (_e, input: SettingsUpdateInput) => updateSettings(input))

  ipcMain.handle(IPC.catalogDisciplines, () => getDisciplines())
  ipcMain.handle(IPC.catalogTopics, (_e, disciplineId: number) => getTopics(disciplineId))
  ipcMain.handle(IPC.catalogDisciplinesWithStats, () => getDisciplinesWithStats())

  ipcMain.handle(IPC.dashboardOverview, () => getDashboardOverview())

  ipcMain.handle(IPC.questionsPractice, (_e, filter: QuestionFilter, limit: number) =>
    getPracticeQuestions(filter, limit)
  )
  ipcMain.handle(IPC.questionsCount, (_e, filter: QuestionFilter) => countQuestions(filter))
  ipcMain.handle(IPC.questionsAnswer, (_e, input: AnswerInput) => answerQuestion(input))
  ipcMain.handle(IPC.questionsToggleFavorite, (_e, questionId: number) => toggleFavorite(questionId))

  // Caderno de erros (M4)
  ipcMain.handle(IPC.errorsList, (_e, filter: ErrorFilter) => listErrors(filter))
  ipcMain.handle(IPC.errorsStats, () => getErrorStats())
  ipcMain.handle(IPC.errorsSetType, (_e, id: number, errorType: ErrorType) => setErrorType(id, errorType))
  ipcMain.handle(IPC.errorsResolve, (_e, id: number) => resolveError(id))

  // Flashcards & decks (M5)
  ipcMain.handle(IPC.decksList, () => listDecks())
  ipcMain.handle(IPC.deckCreate, (_e, input: DeckInput) => createDeck(input))
  ipcMain.handle(IPC.deckDelete, (_e, id: number) => deleteDeck(id))
  ipcMain.handle(IPC.flashcardsList, (_e, deckId: number) => listFlashcards(deckId))
  ipcMain.handle(IPC.flashcardCreate, (_e, input: FlashcardInput) => createFlashcard(input))
  ipcMain.handle(IPC.flashcardDelete, (_e, id: number) => deleteFlashcard(id))
  ipcMain.handle(IPC.flashcardsGenerateFromErrors, (_e, deckId: number, limit: number) =>
    generateFlashcardsFromErrors(deckId, limit)
  )

  // Revisão espaçada / FSRS (M6)
  ipcMain.handle(IPC.reviewDue, (_e, limit: number) => getDueCards(limit))
  ipcMain.handle(IPC.reviewStats, () => getReviewStats())
  ipcMain.handle(IPC.reviewRate, (_e, srsCardId: number, rating: ReviewRating) =>
    rateCard(srsCardId, rating)
  )

  // Simulados (M7)
  ipcMain.handle(IPC.simCreate, (_e, config: MockExamConfig) => createMockExam(config))
  ipcMain.handle(IPC.simFinish, (_e, examId: number, ans: MockAnswerInput[]) =>
    finishMockExam(examId, ans)
  )
  ipcMain.handle(IPC.simHistory, () => getMockHistory())
  ipcMain.handle(IPC.simResult, (_e, examId: number) => getMockResult(examId))

  // Gamificação (M9)
  ipcMain.handle(IPC.gamificationProgress, () => getGamification())

  // Estatísticas (M8)
  ipcMain.handle(IPC.statsOverview, () => getStatsOverview())

  // Planejamento (M10)
  ipcMain.handle(IPC.planGet, () => getStudyPlan())
  ipcMain.handle(IPC.planGenerate, (_e, dailyMinutes: number) => generateStudyPlan(dailyMinutes))
  ipcMain.handle(IPC.planToggleTask, (_e, id: number) => toggleStudyTask(id))

  // Modo Aprovação (M11)
  ipcMain.handle(IPC.approvalPlan, () => getApprovalPlan())

  // Tutor IA (M12)
  ipcMain.handle(IPC.aiStatus, () => getAiStatus())
  ipcMain.handle(IPC.aiHistory, () => getAiHistory())
  ipcMain.handle(IPC.aiSend, (_e, content: string) => sendAiMessage(content))
  ipcMain.handle(IPC.aiClear, () => clearAiHistory())

  // Backup (M13)
  ipcMain.handle(IPC.backupExport, () => exportBackup())
  ipcMain.handle(IPC.backupImport, () => importBackup())
}
