import { app, ipcMain } from 'electron'
import { IPC, type SettingsUpdateInput } from '@shared/ipc'
import { getDbPath } from '../db/connection'
import {
  getDisciplines,
  getDisciplinesWithStats,
  getTopics
} from '../repositories/catalogRepository'
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
}
