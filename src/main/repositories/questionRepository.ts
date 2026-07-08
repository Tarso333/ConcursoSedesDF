import { type SQL, and, count, eq, inArray, sql } from 'drizzle-orm'
import type {
  AnswerInput,
  AnswerResult,
  QuestionFilter,
  QuestionForPractice,
  QuestionOption
} from '@shared/domain'
import { getDb } from '../db/connection'
import {
  answers,
  disciplines,
  errorLogs,
  questionOptions,
  questionStates,
  questions,
  topics
} from '../db/schema'
import { awardForAnswer } from '../services/gamificationService'

function buildConditions(filter: QuestionFilter): SQL[] {
  const conds: SQL[] = []
  if (filter.disciplineId) conds.push(eq(questions.disciplineId, filter.disciplineId))
  if (filter.topicId) conds.push(eq(questions.topicId, filter.topicId))
  if (filter.difficulty) conds.push(eq(questions.difficulty, filter.difficulty))
  if (filter.type) conds.push(eq(questions.type, filter.type))
  if (filter.search && filter.search.trim()) {
    conds.push(sql`${questions.statement} LIKE ${'%' + filter.search.trim() + '%'}`)
  }

  const answered = sql`(SELECT COUNT(*) FROM answers a WHERE a.question_id = ${questions.id})`
  const lastCorrect = sql`(SELECT a.is_correct FROM answers a WHERE a.question_id = ${questions.id} ORDER BY a.id DESC LIMIT 1)`

  switch (filter.status) {
    case 'NAO_RESPONDIDAS':
      conds.push(sql`${answered} = 0`)
      break
    case 'ERRADAS':
      conds.push(sql`${lastCorrect} = 0`)
      break
    case 'ACERTADAS':
      conds.push(sql`${lastCorrect} = 1`)
      break
    case 'FAVORITAS':
      conds.push(
        sql`EXISTS (SELECT 1 FROM question_states qs WHERE qs.question_id = ${questions.id} AND qs.favorite = 1)`
      )
      break
    default:
      break
  }
  return conds
}

export function countQuestions(contestId: number, filter: QuestionFilter): number {
  const db = getDb()
  const conds = [eq(disciplines.contestId, contestId), ...buildConditions(filter)]
  const row = db
    .select({ c: count() })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(and(...conds))
    .get()
  return row?.c ?? 0
}

function optionsByQuestion(questionIds: number[]): Map<number, QuestionOption[]> {
  const map = new Map<number, QuestionOption[]>()
  if (questionIds.length === 0) return map
  const db = getDb()
  const rows = db
    .select()
    .from(questionOptions)
    .where(inArray(questionOptions.questionId, questionIds))
    .orderBy(questionOptions.orderIndex)
    .all()
  for (const o of rows) {
    const list = map.get(o.questionId) ?? []
    list.push({
      id: o.id,
      questionId: o.questionId,
      letter: o.letter,
      text: o.text,
      isCorrect: o.isCorrect,
      orderIndex: o.orderIndex
    })
    map.set(o.questionId, list)
  }
  return map
}

export function getPracticeQuestions(
  contestId: number,
  filter: QuestionFilter,
  limit: number
): QuestionForPractice[] {
  const db = getDb()
  const conds = [eq(disciplines.contestId, contestId), ...buildConditions(filter)]

  const rows = db
    .select({
      id: questions.id,
      disciplineId: questions.disciplineId,
      topicId: questions.topicId,
      type: questions.type,
      statement: questions.statement,
      difficulty: questions.difficulty,
      explanation: questions.explanation,
      source: questions.source,
      year: questions.year,
      board: questions.board,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color,
      topicName: topics.name,
      favorite: sql<number>`COALESCE((SELECT favorite FROM question_states qs WHERE qs.question_id = ${questions.id}), 0)`,
      answeredCount: sql<number>`(SELECT COUNT(*) FROM answers a WHERE a.question_id = ${questions.id})`,
      lastCorrect: sql<
        number | null
      >`(SELECT a.is_correct FROM answers a WHERE a.question_id = ${questions.id} ORDER BY a.id DESC LIMIT 1)`
    })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .leftJoin(topics, eq(questions.topicId, topics.id))
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(sql`RANDOM()`)
    .limit(Math.max(1, Math.min(limit, 100)))
    .all()

  const optionsMap = optionsByQuestion(rows.map((r) => r.id))

  return rows.map((r) => ({
    id: r.id,
    disciplineId: r.disciplineId,
    topicId: r.topicId,
    type: r.type,
    statement: r.statement,
    difficulty: r.difficulty,
    explanation: r.explanation,
    source: r.source,
    year: r.year,
    board: r.board,
    options: optionsMap.get(r.id) ?? [],
    disciplineName: r.disciplineName,
    disciplineColor: r.disciplineColor,
    topicName: r.topicName,
    favorite: Number(r.favorite) === 1,
    answeredCount: Number(r.answeredCount),
    lastCorrect: r.lastCorrect === null ? null : Number(r.lastCorrect) === 1
  }))
}

export function answerQuestion(input: AnswerInput): AnswerResult {
  const db = getDb()
  const opts = db
    .select({ id: questionOptions.id, isCorrect: questionOptions.isCorrect })
    .from(questionOptions)
    .where(eq(questionOptions.questionId, input.questionId))
    .all()
  const correct = opts.find((o) => o.isCorrect)
  const correctOptionId = correct?.id ?? -1
  const isCorrect = input.selectedOptionId === correctOptionId

  const q = db
    .select({ explanation: questions.explanation })
    .from(questions)
    .where(eq(questions.id, input.questionId))
    .get()

  const res = db
    .insert(answers)
    .values({
      questionId: input.questionId,
      selectedOptionId: input.selectedOptionId,
      isCorrect,
      timeMs: input.timeMs,
      source: input.source ?? 'BANCO'
    })
    .run()

  if (!isCorrect) {
    const openError = db
      .select({ id: errorLogs.id })
      .from(errorLogs)
      .where(and(eq(errorLogs.questionId, input.questionId), eq(errorLogs.status, 'ABERTO')))
      .get()
    if (!openError) {
      db.insert(errorLogs)
        .values({
          questionId: input.questionId,
          answerId: Number(res.lastInsertRowid),
          status: 'ABERTO'
        })
        .run()
    }
  }

  awardForAnswer(isCorrect)
  return { isCorrect, correctOptionId, explanation: q?.explanation ?? null }
}

export function toggleFavorite(questionId: number): { favorite: boolean } {
  const db = getDb()
  const existing = db
    .select({ favorite: questionStates.favorite })
    .from(questionStates)
    .where(eq(questionStates.questionId, questionId))
    .get()

  if (existing) {
    const next = !existing.favorite
    db.update(questionStates)
      .set({ favorite: next, updatedAt: sql`(datetime('now'))` as unknown as string })
      .where(eq(questionStates.questionId, questionId))
      .run()
    return { favorite: next }
  }

  db.insert(questionStates).values({ questionId, favorite: true }).run()
  return { favorite: true }
}
