import { contextBridge, ipcRenderer } from 'electron'
import type { AnswerInput, QuestionFilter } from '@shared/domain'
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
  toggleFavorite: (questionId: number) => ipcRenderer.invoke(IPC.questionsToggleFavorite, questionId)
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
