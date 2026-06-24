import { type SQL, and, desc, eq, inArray, sql } from 'drizzle-orm'
import type {
  DisciplineBlock,
  MockAnswerInput,
  MockExamConfig,
  MockExamResult,
  MockExamSession,
  MockHistoryItem,
  SimOption,
  SimQuestion
} from '@shared/domain'
import { getDb } from '../db/connection'
import {
  answers,
  disciplines,
  errorLogs,
  mockExamItems,
  mockExams,
  questionOptions,
  questions
} from '../db/schema'
import { nowSql } from '../lib/sqlDate'
import { awardForSimulado } from './gamificationService'

const SECONDS_PER_QUESTION = 180

function pickQuestionIds(opts: {
  block?: DisciplineBlock
  disciplineId?: number | null
  limit: number
}): number[] {
  const db = getDb()
  const conds: SQL[] = []
  if (opts.block) conds.push(eq(disciplines.block, opts.block))
  if (opts.disciplineId) conds.push(eq(questions.disciplineId, opts.disciplineId))
  return db
    .select({ id: questions.id })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(sql`RANDOM()`)
    .limit(Math.max(1, opts.limit))
    .all()
    .map((r) => r.id)
}

function simOptionsByQuestion(ids: number[]): Map<number, SimOption[]> {
  const map = new Map<number, SimOption[]>()
  if (ids.length === 0) return map
  const rows = getDb()
    .select({
      id: questionOptions.id,
      questionId: questionOptions.questionId,
      letter: questionOptions.letter,
      text: questionOptions.text
    })
    .from(questionOptions)
    .where(inArray(questionOptions.questionId, ids))
    .orderBy(questionOptions.orderIndex)
    .all()
  for (const o of rows) {
    const list = map.get(o.questionId) ?? []
    list.push({ id: o.id, letter: o.letter, text: o.text })
    map.set(o.questionId, list)
  }
  return map
}

export function createMockExam(config: MockExamConfig): MockExamSession {
  const db = getDb()
  let ids: number[] = []
  let title = 'Simulado'
  let timeLimitSec: number | null = null

  if (config.mode === 'OFICIAL') {
    ids = [
      ...pickQuestionIds({ block: 'GERAL', limit: 20 }),
      ...pickQuestionIds({ block: 'ESPECIFICO', limit: 40 })
    ]
    title = 'Simulado Oficial Quadrix'
    timeLimitSec = 180 * 60
  } else if (config.mode === 'DISCIPLINA') {
    const n = config.totalQuestions ?? 20
    ids = pickQuestionIds({ disciplineId: config.disciplineId ?? null, limit: n })
    const disc = config.disciplineId
      ? db.select({ name: disciplines.name }).from(disciplines).where(eq(disciplines.id, config.disciplineId)).get()
      : null
    title = disc ? `Simulado — ${disc.name}` : 'Simulado por disciplina'
    timeLimitSec = ids.length * SECONDS_PER_QUESTION
  } else {
    const n = config.totalQuestions ?? 20
    ids = pickQuestionIds({ disciplineId: config.disciplineId ?? null, limit: n })
    title = config.mode === 'DIAGNOSTICO' ? 'Simulado diagnóstico' : 'Simulado personalizado'
    timeLimitSec = ids.length * SECONDS_PER_QUESTION
  }

  if (ids.length === 0) throw new Error('Não há questões suficientes para montar o simulado.')

  const examRes = db
    .insert(mockExams)
    .values({
      title,
      mode: config.mode,
      status: 'EM_ANDAMENTO',
      totalQuestions: ids.length,
      timeLimitSec,
      startedAt: nowSql()
    })
    .run()
  const examId = Number(examRes.lastInsertRowid)

  const items: { itemId: number; questionId: number }[] = []
  ids.forEach((qid, i) => {
    const r = db
      .insert(mockExamItems)
      .values({ mockExamId: examId, questionId: qid, orderIndex: i })
      .run()
    items.push({ itemId: Number(r.lastInsertRowid), questionId: qid })
  })

  const qrows = db
    .select({
      id: questions.id,
      type: questions.type,
      difficulty: questions.difficulty,
      statement: questions.statement,
      disciplineId: questions.disciplineId,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color,
      block: disciplines.block
    })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(inArray(questions.id, ids))
    .all()
  const qmap = new Map(qrows.map((q) => [q.id, q]))
  const optsMap = simOptionsByQuestion(ids)

  const sessionQuestions: SimQuestion[] = items.flatMap((it) => {
    const q = qmap.get(it.questionId)
    if (!q) return []
    return [
      {
        itemId: it.itemId,
        questionId: it.questionId,
        type: q.type,
        difficulty: q.difficulty,
        statement: q.statement,
        disciplineId: q.disciplineId,
        disciplineName: q.disciplineName,
        disciplineColor: q.disciplineColor,
        block: q.block,
        options: optsMap.get(it.questionId) ?? []
      }
    ]
  })

  return { examId, title, mode: config.mode, timeLimitSec, questions: sessionQuestions }
}

export function getMockResult(examId: number): MockExamResult {
  const db = getDb()
  const exam = db.select().from(mockExams).where(eq(mockExams.id, examId)).get()
  if (!exam) throw new Error('Simulado não encontrado')

  const items = db
    .select({
      itemId: mockExamItems.id,
      questionId: mockExamItems.questionId,
      selectedOptionId: mockExamItems.selectedOptionId,
      isCorrect: mockExamItems.isCorrect,
      statement: questions.statement,
      explanation: questions.explanation,
      disciplineName: disciplines.name,
      color: disciplines.color,
      block: disciplines.block,
      weight: disciplines.weight
    })
    .from(mockExamItems)
    .innerJoin(questions, eq(mockExamItems.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(mockExamItems.mockExamId, examId))
    .orderBy(mockExamItems.orderIndex)
    .all()

  const qids = items.map((i) => i.questionId)
  const correctRows =
    qids.length > 0
      ? db
          .select({ questionId: questionOptions.questionId, id: questionOptions.id })
          .from(questionOptions)
          .where(and(inArray(questionOptions.questionId, qids), eq(questionOptions.isCorrect, true)))
          .all()
      : []
  const correctMap = new Map(correctRows.map((r) => [r.questionId, r.id]))

  let correct = 0
  let answered = 0
  let scorePoints = 0
  let maxPoints = 0
  let geralPoints = 0
  let geralMax = 0
  let espPoints = 0
  let espMax = 0
  const byDisc = new Map<string, { name: string; color: string; correct: number; total: number }>()
  const resultItems = items.map((it) => {
    const isAnswered = it.selectedOptionId != null
    const isCorrect = it.isCorrect === true
    maxPoints += it.weight
    if (it.block === 'GERAL') geralMax += it.weight
    else espMax += it.weight
    if (isAnswered) answered += 1
    if (isCorrect) {
      correct += 1
      scorePoints += it.weight
      if (it.block === 'GERAL') geralPoints += it.weight
      else espPoints += it.weight
    }
    const d = byDisc.get(it.disciplineName) ?? {
      name: it.disciplineName,
      color: it.color,
      correct: 0,
      total: 0
    }
    d.total += 1
    if (isCorrect) d.correct += 1
    byDisc.set(it.disciplineName, d)
    return {
      questionId: it.questionId,
      disciplineName: it.disciplineName,
      statement: it.statement,
      correct: isCorrect,
      answered: isAnswered,
      selectedOptionId: it.selectedOptionId,
      correctOptionId: correctMap.get(it.questionId) ?? -1,
      explanation: it.explanation
    }
  })

  const eliminated =
    exam.mode === 'OFICIAL' && (geralPoints < geralMax * 0.5 || espPoints < espMax * 0.5)

  return {
    examId,
    title: exam.title,
    mode: exam.mode,
    totalQuestions: items.length,
    answered,
    correct,
    scorePoints,
    maxPoints,
    scorePct: maxPoints > 0 ? scorePoints / maxPoints : 0,
    geralPoints,
    geralMax,
    espPoints,
    espMax,
    eliminated,
    byDiscipline: [...byDisc.values()],
    items: resultItems
  }
}

export function finishMockExam(examId: number, submitted: MockAnswerInput[]): MockExamResult {
  const db = getDb()
  const ansMap = new Map(submitted.map((a) => [a.itemId, a]))

  const items = db
    .select({
      itemId: mockExamItems.id,
      questionId: mockExamItems.questionId
    })
    .from(mockExamItems)
    .where(eq(mockExamItems.mockExamId, examId))
    .all()

  const qids = items.map((i) => i.questionId)
  const correctRows =
    qids.length > 0
      ? db
          .select({ questionId: questionOptions.questionId, id: questionOptions.id })
          .from(questionOptions)
          .where(and(inArray(questionOptions.questionId, qids), eq(questionOptions.isCorrect, true)))
          .all()
      : []
  const correctMap = new Map(correctRows.map((r) => [r.questionId, r.id]))

  for (const it of items) {
    const a = ansMap.get(it.itemId)
    const selected = a?.selectedOptionId ?? null
    const isAnswered = selected != null
    const correctId = correctMap.get(it.questionId) ?? -1
    const isCorrect = isAnswered && selected === correctId

    db.update(mockExamItems)
      .set({
        selectedOptionId: selected,
        isCorrect: isAnswered ? isCorrect : null,
        timeMs: a?.timeMs ?? null
      })
      .where(eq(mockExamItems.id, it.itemId))
      .run()

    if (isAnswered) {
      db.insert(answers)
        .values({
          questionId: it.questionId,
          selectedOptionId: selected,
          isCorrect,
          timeMs: a?.timeMs ?? 0,
          source: 'SIMULADO',
          mockExamId: examId
        })
        .run()
      if (!isCorrect) {
        const openErr = db
          .select({ id: errorLogs.id })
          .from(errorLogs)
          .where(and(eq(errorLogs.questionId, it.questionId), eq(errorLogs.status, 'ABERTO')))
          .get()
        if (!openErr) db.insert(errorLogs).values({ questionId: it.questionId, status: 'ABERTO' }).run()
      }
    }
  }

  const result = getMockResult(examId)
  db.update(mockExams)
    .set({ status: 'CONCLUIDO', score: result.scorePct * 100, finishedAt: nowSql() })
    .where(eq(mockExams.id, examId))
    .run()
  awardForSimulado(result.correct, result.mode === 'OFICIAL')
  return result
}

export function getMockHistory(): MockHistoryItem[] {
  return getDb()
    .select({
      id: mockExams.id,
      title: mockExams.title,
      mode: mockExams.mode,
      totalQuestions: mockExams.totalQuestions,
      scorePct: sql<number>`COALESCE(${mockExams.score}, 0) / 100.0`,
      finishedAt: mockExams.finishedAt
    })
    .from(mockExams)
    .where(eq(mockExams.status, 'CONCLUIDO'))
    .orderBy(desc(mockExams.id))
    .all()
}
