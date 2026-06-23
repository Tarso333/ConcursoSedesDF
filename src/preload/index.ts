import { contextBridge, ipcRenderer } from 'electron'
import { IPC, type AppApi, type SettingsUpdateInput } from '@shared/ipc'

const api: AppApi = {
  getInfo: () => ipcRenderer.invoke(IPC.appGetInfo),
  getSettings: () => ipcRenderer.invoke(IPC.settingsGet),
  updateSettings: (input: SettingsUpdateInput) => ipcRenderer.invoke(IPC.settingsUpdate, input),
  getDisciplines: () => ipcRenderer.invoke(IPC.catalogDisciplines),
  getTopics: (disciplineId: number) => ipcRenderer.invoke(IPC.catalogTopics, disciplineId),
  getDisciplinesWithStats: () => ipcRenderer.invoke(IPC.catalogDisciplinesWithStats),
  getDashboardOverview: () => ipcRenderer.invoke(IPC.dashboardOverview)
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
