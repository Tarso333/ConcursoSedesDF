import { app, ipcMain } from 'electron'
import type { AnswerInput, QuestionFilter } from '@shared/domain'
import { IPC, type SettingsUpdateInput } from '@shared/ipc'
import { getDbPath } from '../db/connection'
import {
  getDisciplines,
  getDisciplinesWithStats,
  getTopics
} from '../repositories/catalogRepository'
import {
  answerQuestion,
  countQuestions,
  getPracticeQuestions,
  toggleFavorite
} from '../repositories/questionRepository'
import { getSettings, updateSettings } from '../repositories/settingsRepository'
import { getDashboardOverview } from '../services/dashboardService'

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
}
