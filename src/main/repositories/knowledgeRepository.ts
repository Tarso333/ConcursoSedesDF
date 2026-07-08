import { asc, count, eq, sql } from 'drizzle-orm'
import type {
  KnowledgeEntry,
  KnowledgeKind,
  TopicKnowledgeView,
  TopicStatus,
  TopicTreeNode
} from '@shared/domain'
import { getDb } from '../db/connection'
import {
  answers,
  disciplines,
  flashcards,
  knowledgeEntries,
  questions,
  topicProgress,
  topics
} from '../db/schema'
import { nowSql } from '../lib/sqlDate'

/**
 * Árvore de tópicos/subtópicos de uma disciplina, com contadores de conteúdo
 * e progresso do usuário. Preparada para milhares de tópicos: 5 consultas
 * agregadas por disciplina, montagem da árvore em memória.
 */
export function getContentTree(disciplineId: number): TopicTreeNode[] {
  const db = getDb()

  const rows = db
    .select({
      id: topics.id,
      parentId: topics.parentId,
      name: topics.name,
      orderIndex: topics.orderIndex
    })
    .from(topics)
    .where(eq(topics.disciplineId, disciplineId))
    .orderBy(asc(topics.orderIndex), asc(topics.id))
    .all()

  const questionCounts = new Map<number, number>()
  for (const r of db
    .select({ topicId: questions.topicId, c: count() })
    .from(questions)
    .where(eq(questions.disciplineId, disciplineId))
    .groupBy(questions.topicId)
    .all()) {
    if (r.topicId != null) questionCounts.set(r.topicId, r.c)
  }

  const answerAgg = new Map<number, { answered: number; correct: number }>()
  for (const r of db
    .select({
      topicId: questions.topicId,
      answered: count(),
      correct: sql<number>`coalesce(sum(case when ${answers.isCorrect} then 1 else 0 end), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(eq(questions.disciplineId, disciplineId))
    .groupBy(questions.topicId)
    .all()) {
    if (r.topicId != null) answerAgg.set(r.topicId, { answered: Number(r.answered), correct: Number(r.correct) })
  }

  const flashcardCounts = new Map<number, number>()
  for (const r of db
    .select({ topicId: flashcards.topicId, c: count() })
    .from(flashcards)
    .innerJoin(topics, eq(flashcards.topicId, topics.id))
    .where(eq(topics.disciplineId, disciplineId))
    .groupBy(flashcards.topicId)
    .all()) {
    if (r.topicId != null) flashcardCounts.set(r.topicId, r.c)
  }

  const knowledgeCounts = new Map<number, number>()
  for (const r of db
    .select({ topicId: knowledgeEntries.topicId, c: count() })
    .from(knowledgeEntries)
    .innerJoin(topics, eq(knowledgeEntries.topicId, topics.id))
    .where(eq(topics.disciplineId, disciplineId))
    .groupBy(knowledgeEntries.topicId)
    .all()) {
    knowledgeCounts.set(r.topicId, r.c)
  }

  const progressMap = new Map<number, TopicStatus>()
  for (const r of db
    .select({ topicId: topicProgress.topicId, status: topicProgress.status })
    .from(topicProgress)
    .innerJoin(topics, eq(topicProgress.topicId, topics.id))
    .where(eq(topics.disciplineId, disciplineId))
    .all()) {
    progressMap.set(r.topicId, r.status)
  }

  const nodes = new Map<number, TopicTreeNode>()
  for (const t of rows) {
    const agg = answerAgg.get(t.id) ?? { answered: 0, correct: 0 }
    nodes.set(t.id, {
      id: t.id,
      parentId: t.parentId,
      name: t.name,
      orderIndex: t.orderIndex,
      questionCount: questionCounts.get(t.id) ?? 0,
      flashcardCount: flashcardCounts.get(t.id) ?? 0,
      knowledgeCount: knowledgeCounts.get(t.id) ?? 0,
      answeredCount: agg.answered,
      accuracy: agg.answered > 0 ? agg.correct / agg.answered : 0,
      status: progressMap.get(t.id) ?? 'NAO_ESTUDADO',
      children: []
    })
  }

  const roots: TopicTreeNode[] = []
  for (const node of nodes.values()) {
    const parent = node.parentId != null ? nodes.get(node.parentId) : undefined
    if (parent) parent.children.push(node)
    else roots.push(node)
  }
  return roots
}

export function getTopicKnowledge(topicId: number): TopicKnowledgeView {
  const db = getDb()

  const topicRow = db
    .select({
      id: topics.id,
      name: topics.name,
      parentId: topics.parentId,
      disciplineId: disciplines.id,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color
    })
    .from(topics)
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(topics.id, topicId))
    .get()
  if (!topicRow) throw new Error('Tópico não encontrado.')

  const parent = topicRow.parentId
    ? db.select({ name: topics.name }).from(topics).where(eq(topics.id, topicRow.parentId)).get()
    : undefined

  const entries: KnowledgeEntry[] = db
    .select({
      id: knowledgeEntries.id,
      topicId: knowledgeEntries.topicId,
      kind: sql<KnowledgeKind>`${knowledgeEntries.kind}`,
      title: knowledgeEntries.title,
      body: knowledgeEntries.body,
      reference: knowledgeEntries.reference,
      url: knowledgeEntries.url,
      orderIndex: knowledgeEntries.orderIndex
    })
    .from(knowledgeEntries)
    .where(eq(knowledgeEntries.topicId, topicId))
    .orderBy(asc(knowledgeEntries.orderIndex), asc(knowledgeEntries.id))
    .all()

  const questionCount =
    db.select({ c: count() }).from(questions).where(eq(questions.topicId, topicId)).get()?.c ?? 0
  const answerAgg = db
    .select({
      answered: count(),
      correct: sql<number>`coalesce(sum(case when ${answers.isCorrect} then 1 else 0 end), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(eq(questions.topicId, topicId))
    .get()
  const flashcardCount =
    db.select({ c: count() }).from(flashcards).where(eq(flashcards.topicId, topicId)).get()?.c ?? 0

  const progress = db.select().from(topicProgress).where(eq(topicProgress.topicId, topicId)).get()

  const answered = Number(answerAgg?.answered ?? 0)
  const correct = Number(answerAgg?.correct ?? 0)

  return {
    topicId: topicRow.id,
    topicName: topicRow.name,
    parentName: parent?.name ?? null,
    disciplineId: topicRow.disciplineId,
    disciplineName: topicRow.disciplineName,
    disciplineColor: topicRow.disciplineColor,
    status: progress?.status ?? 'NAO_ESTUDADO',
    lastStudiedAt: progress?.lastStudiedAt ?? null,
    entries,
    stats: {
      questionCount,
      answeredCount: answered,
      correctCount: correct,
      accuracy: answered > 0 ? correct / answered : 0,
      flashcardCount
    }
  }
}

/** Progresso é do usuário: upsert em topic_progress, sem tocar no conteúdo. */
export function setTopicStatus(topicId: number, status: TopicStatus): void {
  const db = getDb()
  const studiedAt = status === 'NAO_ESTUDADO' ? null : nowSql()
  db.insert(topicProgress)
    .values({ topicId, status, lastStudiedAt: studiedAt, updatedAt: nowSql() })
    .onConflictDoUpdate({
      target: topicProgress.topicId,
      set: { status, lastStudiedAt: studiedAt, updatedAt: nowSql() }
    })
    .run()
}

/** Usado pelo seed para não duplicar conteúdo já cadastrado num tópico. */
export function topicHasKnowledge(topicId: number): boolean {
  const c =
    getDb().select({ c: count() }).from(knowledgeEntries).where(eq(knowledgeEntries.topicId, topicId)).get()
      ?.c ?? 0
  return c > 0
}
