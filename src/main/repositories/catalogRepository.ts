import { count, eq, sql } from 'drizzle-orm'
import type { Discipline, DisciplineWithStats, Topic } from '@shared/domain'
import { getDb } from '../db/connection'
import { answers, disciplines, questions, topics } from '../db/schema'

export function getDisciplines(): Discipline[] {
  const db = getDb()
  return db
    .select({
      id: disciplines.id,
      slug: disciplines.slug,
      name: disciplines.name,
      block: disciplines.block,
      weight: disciplines.weight,
      examQuestionEstimate: disciplines.examQuestionEstimate,
      color: disciplines.color,
      orderIndex: disciplines.orderIndex
    })
    .from(disciplines)
    .orderBy(disciplines.orderIndex)
    .all()
}

export function getTopics(disciplineId: number): Topic[] {
  const db = getDb()
  return db
    .select({
      id: topics.id,
      disciplineId: topics.disciplineId,
      parentId: topics.parentId,
      name: topics.name,
      slug: topics.slug,
      orderIndex: topics.orderIndex
    })
    .from(topics)
    .where(eq(topics.disciplineId, disciplineId))
    .orderBy(topics.orderIndex)
    .all()
}

export function getDisciplinesWithStats(): DisciplineWithStats[] {
  const db = getDb()
  const base = getDisciplines()

  const topicCounts = new Map<number, number>()
  for (const r of db
    .select({ disciplineId: topics.disciplineId, c: count() })
    .from(topics)
    .groupBy(topics.disciplineId)
    .all()) {
    topicCounts.set(r.disciplineId, r.c)
  }

  const questionCounts = new Map<number, number>()
  for (const r of db
    .select({ disciplineId: questions.disciplineId, c: count() })
    .from(questions)
    .groupBy(questions.disciplineId)
    .all()) {
    questionCounts.set(r.disciplineId, r.c)
  }

  const answerAgg = new Map<number, { answered: number; correct: number }>()
  for (const r of db
    .select({
      disciplineId: questions.disciplineId,
      answered: count(),
      correct: sql<number>`coalesce(sum(case when ${answers.isCorrect} then 1 else 0 end), 0)`
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .groupBy(questions.disciplineId)
    .all()) {
    answerAgg.set(r.disciplineId, { answered: Number(r.answered), correct: Number(r.correct) })
  }

  return base.map((d) => {
    const agg = answerAgg.get(d.id) ?? { answered: 0, correct: 0 }
    const accuracy = agg.answered > 0 ? agg.correct / agg.answered : 0
    return {
      ...d,
      topicsCount: topicCounts.get(d.id) ?? 0,
      questionsCount: questionCounts.get(d.id) ?? 0,
      answeredCount: agg.answered,
      correctCount: agg.correct,
      accuracy,
      masteryPct: agg.answered > 0 ? Math.round(accuracy * 100) : 0
    }
  })
}
