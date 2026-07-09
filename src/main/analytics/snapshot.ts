// Coleta do Learning Analytics — única camada com acesso a dados.
// O "event log" já existe nas tabelas de uso (answers, srs_reviews,
// study_sessions, topic_progress): aqui apenas fotografamos, sem gravar nada.
import { format } from 'date-fns'
import { eq, sql } from 'drizzle-orm'
import type { Contest, TopicStatus } from '@shared/domain'
import { getDb } from '../db/connection'
import {
  answers,
  decks,
  disciplines,
  flashcards,
  questions,
  srsCards,
  srsReviews,
  studySessions,
  topicProgress,
  topics
} from '../db/schema'
import type { AnalyticsInput } from './engine'

export function buildAnalyticsInput(contest: Contest): AnalyticsInput {
  const db = getDb()

  const discRows = db
    .select({ id: disciplines.id, name: disciplines.name, color: disciplines.color })
    .from(disciplines)
    .where(eq(disciplines.contestId, contest.id))
    .orderBy(disciplines.orderIndex)
    .all()

  const topicRows = db
    .select({
      id: topics.id,
      disciplineId: topics.disciplineId,
      name: topics.name,
      status: sql<TopicStatus>`coalesce(${topicProgress.status}, 'NAO_ESTUDADO')`
    })
    .from(topics)
    .leftJoin(topicProgress, eq(topicProgress.topicId, topics.id))
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .all()

  const answerRows = db
    .select({
      dayIso: sql<string>`date(${answers.createdAt})`,
      topicId: questions.topicId,
      disciplineId: questions.disciplineId,
      correct: answers.isCorrect,
      timeMs: answers.timeMs,
      source: answers.source
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contest.id))
    .orderBy(answers.createdAt)
    .all()

  const reviewRows = db
    .select({
      dayIso: sql<string>`date(${srsReviews.review})`,
      rating: srsReviews.rating
    })
    .from(srsReviews)
    .innerJoin(srsCards, eq(srsReviews.srsCardId, srsCards.id))
    .innerJoin(flashcards, eq(srsCards.flashcardId, flashcards.id))
    .innerJoin(decks, eq(flashcards.deckId, decks.id))
    .where(eq(decks.contestId, contest.id))
    .all()

  // Dias distintos com atividade (respostas ∪ revisões ∪ sessões).
  const activityDays = new Set<string>()
  for (const a of answerRows) activityDays.add(a.dayIso)
  for (const r of reviewRows) activityDays.add(r.dayIso)
  for (const s of db
    .select({ dayIso: sql<string>`date(${studySessions.startedAt})` })
    .from(studySessions)
    .where(eq(studySessions.contestId, contest.id))
    .groupBy(sql`date(${studySessions.startedAt})`)
    .all()) {
    activityDays.add(s.dayIso)
  }

  return {
    todayIso: format(new Date(), 'yyyy-MM-dd'),
    disciplines: discRows,
    topics: topicRows,
    answers: answerRows.map((a) => ({
      dayIso: a.dayIso,
      topicId: a.topicId,
      disciplineId: a.disciplineId,
      correct: Boolean(a.correct),
      seconds: a.timeMs > 0 ? a.timeMs / 1000 : null,
      source: a.source
    })),
    reviews: reviewRows.map((r) => ({ dayIso: r.dayIso, rating: r.rating })),
    activityDays: [...activityDays].sort()
  }
}
