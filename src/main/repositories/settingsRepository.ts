import { eq, sql } from 'drizzle-orm'
import type { Settings } from '@shared/domain'
import type { SettingsUpdateInput } from '@shared/ipc'
import { getDb } from '../db/connection'
import { settings } from '../db/schema'

type SettingsRow = typeof settings.$inferSelect

function toDto(row: SettingsRow): Settings {
  return {
    userName: row.userName,
    theme: row.theme,
    examDate: row.examDate,
    dailyGoalMinutes: row.dailyGoalMinutes,
    dailyGoalQuestions: row.dailyGoalQuestions,
    aiProvider: row.aiProvider,
    aiModel: row.aiModel,
    hasAiKey: Boolean(row.aiApiKey && row.aiApiKey.length > 0)
  }
}

export function getSettings(): Settings {
  const db = getDb()
  let row = db.select().from(settings).where(eq(settings.id, 1)).get()
  if (!row) {
    db.insert(settings).values({ id: 1 }).run()
    row = db.select().from(settings).where(eq(settings.id, 1)).get()
  }
  return toDto(row as SettingsRow)
}

export function updateSettings(input: SettingsUpdateInput): Settings {
  const db = getDb()
  const patch: Partial<SettingsRow> = { updatedAt: sql`(datetime('now'))` as unknown as string }
  if (input.userName !== undefined) patch.userName = input.userName
  if (input.theme !== undefined) patch.theme = input.theme
  if (input.examDate !== undefined) patch.examDate = input.examDate
  if (input.dailyGoalMinutes !== undefined) patch.dailyGoalMinutes = input.dailyGoalMinutes
  if (input.dailyGoalQuestions !== undefined) patch.dailyGoalQuestions = input.dailyGoalQuestions
  if (input.aiProvider !== undefined) patch.aiProvider = input.aiProvider
  if (input.aiModel !== undefined) patch.aiModel = input.aiModel
  if (input.aiApiKey !== undefined) patch.aiApiKey = input.aiApiKey

  // Garante a existência da linha singleton antes de atualizar.
  getSettings()
  db.update(settings).set(patch).where(eq(settings.id, 1)).run()
  return getSettings()
}
