import { copyFileSync, existsSync, rmSync } from 'node:fs'
import { app, dialog } from 'electron'
import { closeDb, getDbPath, getSqlite } from '../db/connection'

export async function exportBackup(): Promise<{ ok: boolean; path?: string; canceled?: boolean }> {
  // Garante que o WAL seja gravado no arquivo .db antes de copiar.
  try {
    getSqlite().pragma('wal_checkpoint(TRUNCATE)')
  } catch {
    /* ok se falhar */
  }
  const date = new Date().toISOString().slice(0, 10)
  const res = await dialog.showSaveDialog({
    title: 'Exportar backup',
    defaultPath: `aprova-sedes-backup-${date}.db`,
    filters: [{ name: 'Banco SQLite', extensions: ['db'] }]
  })
  if (res.canceled || !res.filePath) return { ok: false, canceled: true }
  copyFileSync(getDbPath(), res.filePath)
  return { ok: true, path: res.filePath }
}

export async function importBackup(): Promise<{ ok: boolean; canceled?: boolean }> {
  const res = await dialog.showOpenDialog({
    title: 'Importar backup',
    properties: ['openFile'],
    filters: [{ name: 'Banco SQLite', extensions: ['db'] }]
  })
  if (res.canceled || res.filePaths.length === 0) return { ok: false, canceled: true }

  const confirm = await dialog.showMessageBox({
    type: 'warning',
    buttons: ['Cancelar', 'Importar e reiniciar'],
    defaultId: 1,
    cancelId: 0,
    message: 'Substituir os dados atuais?',
    detail: 'Seus dados atuais serão sobrescritos pelo backup e o app será reiniciado.'
  })
  if (confirm.response !== 1) return { ok: false, canceled: true }

  const dest = getDbPath()
  closeDb()
  for (const suffix of ['-wal', '-shm']) {
    const f = dest + suffix
    if (existsSync(f)) {
      try {
        rmSync(f)
      } catch {
        /* ignora */
      }
    }
  }
  copyFileSync(res.filePaths[0], dest)
  app.relaunch()
  app.exit(0)
  return { ok: true }
}
