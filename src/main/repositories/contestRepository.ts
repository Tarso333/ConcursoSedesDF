import { asc, eq } from 'drizzle-orm'
import type { Contest, ExamConfig } from '@shared/domain'
import type { ContestUpdateInput } from '@shared/ipc'
import { getDb } from '../db/connection'
import { contests, settings } from '../db/schema'

type ContestRow = typeof contests.$inferSelect

function parseExamConfig(raw: string | null): ExamConfig | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ExamConfig
    return Array.isArray(parsed?.blocks) ? parsed : null
  } catch {
    return null
  }
}

function toDto(row: ContestRow): Contest {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role,
    board: row.board,
    examDate: row.examDate,
    city: row.city,
    salary: row.salary,
    benefits: row.benefits,
    examConfig: parseExamConfig(row.examConfig)
  }
}

export function listContests(): Contest[] {
  return getDb().select().from(contests).orderBy(asc(contests.id)).all().map(toDto)
}

export function getContest(id: number): Contest | undefined {
  const row = getDb().select().from(contests).where(eq(contests.id, id)).get()
  return row ? toDto(row) : undefined
}

/**
 * Resolve o concurso ativo do usuário (settings.active_contest_id).
 * Fallback: primeiro concurso cadastrado (persistido de volta em settings).
 */
export function getActiveContest(): Contest {
  const db = getDb()
  const s = db.select({ activeContestId: settings.activeContestId }).from(settings).where(eq(settings.id, 1)).get()

  if (s?.activeContestId != null) {
    const active = getContest(s.activeContestId)
    if (active) return active
  }

  const first = db.select().from(contests).orderBy(asc(contests.id)).get()
  if (!first) throw new Error('Nenhum concurso cadastrado — o seed inicial não foi executado.')
  if (s) db.update(settings).set({ activeContestId: first.id }).where(eq(settings.id, 1)).run()
  return toDto(first)
}

export function getActiveContestId(): number {
  return getActiveContest().id
}

export function setActiveContest(id: number): Contest {
  const contest = getContest(id)
  if (!contest) throw new Error('Concurso não encontrado.')
  getDb().update(settings).set({ activeContestId: id }).where(eq(settings.id, 1)).run()
  return contest
}

export function updateContest(id: number, input: ContestUpdateInput): Contest {
  const db = getDb()
  const patch: Partial<ContestRow> = {}
  if (input.name !== undefined) patch.name = input.name
  if (input.role !== undefined) patch.role = input.role
  if (input.board !== undefined) patch.board = input.board
  if (input.examDate !== undefined) patch.examDate = input.examDate
  if (input.city !== undefined) patch.city = input.city
  if (input.salary !== undefined) patch.salary = input.salary
  if (input.benefits !== undefined) patch.benefits = input.benefits
  if (Object.keys(patch).length > 0) db.update(contests).set(patch).where(eq(contests.id, id)).run()
  const updated = getContest(id)
  if (!updated) throw new Error('Concurso não encontrado.')
  return updated
}
