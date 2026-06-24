import { type SQL, and, count, desc, eq, sql } from 'drizzle-orm'
import type { ErrorFilter, ErrorLogItem, ErrorStats, ErrorType } from '@shared/domain'
import { getDb } from '../db/connection'
import { disciplines, errorLogs, questions } from '../db/schema'

export function listErrors(filter: ErrorFilter): ErrorLogItem[] {
  const db = getDb()
  const conds: SQL[] = []
  if (filter.disciplineId) conds.push(eq(questions.disciplineId, filter.disciplineId))
  if (filter.status && filter.status !== 'TODOS') conds.push(eq(errorLogs.status, filter.status))

  return db
    .select({
      id: errorLogs.id,
      questionId: errorLogs.questionId,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color,
      statement: questions.statement,
      explanation: questions.explanation,
      correctText: sql<
        string | null
      >`(SELECT o.text FROM question_options o WHERE o.question_id = ${questions.id} AND o.is_correct = 1 LIMIT 1)`,
      errorType: errorLogs.errorType,
      status: errorLogs.status,
      createdAt: errorLogs.createdAt
    })
    .from(errorLogs)
    .innerJoin(questions, eq(errorLogs.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(desc(errorLogs.createdAt))
    .all()
}

export function getErrorStats(): ErrorStats {
  const db = getDb()
  const open = db.select({ c: count() }).from(errorLogs).where(eq(errorLogs.status, 'ABERTO')).get()
  const resolved = db
    .select({ c: count() })
    .from(errorLogs)
    .where(eq(errorLogs.status, 'COMPREENDIDO'))
    .get()
  const byDiscipline = db
    .select({ name: disciplines.name, color: disciplines.color, count: count() })
    .from(errorLogs)
    .innerJoin(questions, eq(errorLogs.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(errorLogs.status, 'ABERTO'))
    .groupBy(disciplines.id)
    .orderBy(desc(count()))
    .all()
  return { open: open?.c ?? 0, resolved: resolved?.c ?? 0, byDiscipline }
}

export function setErrorType(id: number, errorType: ErrorType): void {
  getDb().update(errorLogs).set({ errorType }).where(eq(errorLogs.id, id)).run()
}

export function resolveError(id: number): void {
  getDb()
    .update(errorLogs)
    .set({ status: 'COMPREENDIDO', resolvedAt: sql`(datetime('now'))` as unknown as string })
    .where(eq(errorLogs.id, id))
    .run()
}
