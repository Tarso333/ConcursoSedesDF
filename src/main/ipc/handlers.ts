import { app, ipcMain } from 'electron'
import type {
  AnswerInput,
  DeckInput,
  ErrorFilter,
  ErrorType,
  FlashcardInput,
  GenerationRequest,
  MockAnswerInput,
  MockExamConfig,
  QuestionFilter,
  ReviewRating,
  TopicStatus
} from '@shared/domain'
import { IPC, type ContestUpdateInput, type SettingsUpdateInput } from '@shared/ipc'
import { getDbPath } from '../db/connection'
import {
  getDisciplines,
  getDisciplinesWithStats,
  getTopics
} from '../repositories/catalogRepository'
import {
  getActiveContest,
  getActiveContestId,
  listContests,
  setActiveContest,
  updateContest
} from '../repositories/contestRepository'
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
  getContentTree,
  getDisciplineGraph,
  getTopicKnowledge,
  setTopicStatus
} from '../repositories/knowledgeRepository'
import {
  answerQuestion,
  countQuestions,
  getPracticeQuestions,
  toggleFavorite
} from '../repositories/questionRepository'
import { getSettings, updateSettings } from '../repositories/settingsRepository'
import { detectProviders } from '../ai/capabilities'
import { createActiveProvider } from '../ai/factory'
import { generateContent } from '../ai/generation'
import { checkAIHealth } from '../ai/health'
import { buildContextSummary, buildSuggestions } from '../ai/summary'
import { clearAiHistory, getAiHistory, getAiStatus, sendAiMessage } from '../services/aiService'
import { getApprovalPlan } from '../services/approvalService'
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
import { getLearningAnalytics } from '../services/analyticsService'
import { getStatsOverview } from '../services/statsService'
import { getDailyPlan } from '../services/strategyService'

// Padrão "Active Contest": o renderer nunca envia contestId. Cada handler
// resolve o concurso ativo aqui e o injeta explicitamente nas camadas de
// domínio — repositórios e serviços são agnósticos e recebem o escopo.
export function registerIpcHandlers(): void {
  ipcMain.handle(IPC.appGetInfo, () => ({
    version: app.getVersion(),
    dbPath: getDbPath(),
    isPackaged: app.isPackaged
  }))

  ipcMain.handle(IPC.settingsGet, () => getSettings())
  ipcMain.handle(IPC.settingsUpdate, (_e, input: SettingsUpdateInput) => updateSettings(input))

  // Concursos
  ipcMain.handle(IPC.contestsList, () => listContests())
  ipcMain.handle(IPC.contestGetActive, () => getActiveContest())
  ipcMain.handle(IPC.contestSetActive, (_e, id: number) => setActiveContest(id))
  ipcMain.handle(IPC.contestUpdate, (_e, id: number, input: ContestUpdateInput) =>
    updateContest(id, input)
  )

  // Catálogo
  ipcMain.handle(IPC.catalogDisciplines, () => getDisciplines(getActiveContestId()))
  ipcMain.handle(IPC.catalogTopics, (_e, disciplineId: number) => getTopics(disciplineId))
  ipcMain.handle(IPC.catalogDisciplinesWithStats, () => getDisciplinesWithStats(getActiveContestId()))

  // Engine de Conhecimento (M15)
  ipcMain.handle(IPC.contentTree, (_e, disciplineId: number) => getContentTree(disciplineId))
  ipcMain.handle(IPC.contentTopic, (_e, topicId: number) => getTopicKnowledge(topicId))
  ipcMain.handle(IPC.contentSetTopicStatus, (_e, topicId: number, status: TopicStatus) =>
    setTopicStatus(topicId, status)
  )
  ipcMain.handle(IPC.contentGraph, (_e, disciplineId: number) => getDisciplineGraph(disciplineId))

  ipcMain.handle(IPC.dashboardOverview, () => getDashboardOverview(getActiveContest()))

  // Banco de questões
  ipcMain.handle(IPC.questionsPractice, (_e, filter: QuestionFilter, limit: number) =>
    getPracticeQuestions(getActiveContestId(), filter, limit)
  )
  ipcMain.handle(IPC.questionsCount, (_e, filter: QuestionFilter) =>
    countQuestions(getActiveContestId(), filter)
  )
  ipcMain.handle(IPC.questionsAnswer, (_e, input: AnswerInput) => answerQuestion(input))
  ipcMain.handle(IPC.questionsToggleFavorite, (_e, questionId: number) => toggleFavorite(questionId))

  // Caderno de erros (M4)
  ipcMain.handle(IPC.errorsList, (_e, filter: ErrorFilter) => listErrors(getActiveContestId(), filter))
  ipcMain.handle(IPC.errorsStats, () => getErrorStats(getActiveContestId()))
  ipcMain.handle(IPC.errorsSetType, (_e, id: number, errorType: ErrorType) => setErrorType(id, errorType))
  ipcMain.handle(IPC.errorsResolve, (_e, id: number) => resolveError(id))

  // Flashcards & decks (M5)
  ipcMain.handle(IPC.decksList, () => listDecks(getActiveContestId()))
  ipcMain.handle(IPC.deckCreate, (_e, input: DeckInput) => createDeck(getActiveContestId(), input))
  ipcMain.handle(IPC.deckDelete, (_e, id: number) => deleteDeck(id))
  ipcMain.handle(IPC.flashcardsList, (_e, deckId: number) => listFlashcards(deckId))
  ipcMain.handle(IPC.flashcardCreate, (_e, input: FlashcardInput) => createFlashcard(input))
  ipcMain.handle(IPC.flashcardDelete, (_e, id: number) => deleteFlashcard(id))
  ipcMain.handle(IPC.flashcardsGenerateFromErrors, (_e, deckId: number, limit: number) =>
    generateFlashcardsFromErrors(deckId, limit)
  )

  // Revisão espaçada / FSRS (M6)
  ipcMain.handle(IPC.reviewDue, (_e, limit: number) => getDueCards(getActiveContestId(), limit))
  ipcMain.handle(IPC.reviewStats, () => getReviewStats(getActiveContestId()))
  ipcMain.handle(IPC.reviewRate, (_e, srsCardId: number, rating: ReviewRating) =>
    rateCard(srsCardId, rating)
  )

  // Simulados (M7)
  ipcMain.handle(IPC.simCreate, (_e, config: MockExamConfig) =>
    createMockExam(getActiveContest(), config)
  )
  ipcMain.handle(IPC.simFinish, (_e, examId: number, ans: MockAnswerInput[]) =>
    finishMockExam(examId, ans)
  )
  ipcMain.handle(IPC.simHistory, () => getMockHistory(getActiveContestId()))
  ipcMain.handle(IPC.simResult, (_e, examId: number) => getMockResult(examId))

  // Gamificação (M9) — do usuário, global a todos os concursos
  ipcMain.handle(IPC.gamificationProgress, () => getGamification())

  // Estatísticas (M8)
  ipcMain.handle(IPC.statsOverview, () => getStatsOverview(getActiveContest()))

  // Planejamento (M10)
  ipcMain.handle(IPC.planGet, () => getStudyPlan(getActiveContest()))
  ipcMain.handle(IPC.planGenerate, (_e, dailyMinutes: number) =>
    generateStudyPlan(getActiveContest(), dailyMinutes)
  )
  ipcMain.handle(IPC.planToggleTask, (_e, id: number) => toggleStudyTask(id))

  // Modo Aprovação (M11)
  ipcMain.handle(IPC.approvalPlan, () => getApprovalPlan(getActiveContest()))

  // Motor de Estratégia (M16)
  ipcMain.handle(IPC.strategyDailyPlan, (_e, minutes?: number) =>
    getDailyPlan(getActiveContest(), minutes)
  )

  // Learning Analytics (M17)
  ipcMain.handle(IPC.analyticsOverview, () => getLearningAnalytics(getActiveContest()))

  // Tutor IA (M12) — canais preservados; implementação delega à AI Platform.
  ipcMain.handle(IPC.aiStatus, () => getAiStatus())
  ipcMain.handle(IPC.aiHistory, () => getAiHistory(getActiveContestId()))
  ipcMain.handle(IPC.aiSend, (e, content: string) =>
    sendAiMessage(getActiveContest(), content, (text) => {
      if (!e.sender.isDestroyed()) e.sender.send(IPC.aiStreamChunk, text)
    })
  )
  ipcMain.handle(IPC.aiClear, () => clearAiHistory(getActiveContestId()))

  // AI Platform (M22) — provedores, saúde, contexto, sugestões e geração.
  ipcMain.handle(IPC.aiProviders, () => detectProviders())
  ipcMain.handle(IPC.aiModels, async () => {
    const provider = createActiveProvider()
    return provider.listModels ? provider.listModels().catch(() => []) : []
  })
  ipcMain.handle(IPC.aiHealth, () => checkAIHealth())
  ipcMain.handle(IPC.aiContext, () => buildContextSummary(getActiveContest()))
  ipcMain.handle(IPC.aiSuggestions, () => buildSuggestions(getActiveContest()))
  ipcMain.handle(IPC.aiGenerate, (_e, req: GenerationRequest) =>
    generateContent(getActiveContest(), req)
  )

  // Backup (M13)
  ipcMain.handle(IPC.backupExport, () => exportBackup())
  ipcMain.handle(IPC.backupImport, () => importBackup())
}
