import { and, count, eq, sql } from 'drizzle-orm'
import { type Card as FsrsCard, type Grade, type State, fsrs, generatorParameters } from 'ts-fsrs'
import type { DueCard, ReviewRating, ReviewResult, ReviewStats } from '@shared/domain'
import { getDb } from '../db/connection'
import { decks, flashcards, srsCards, srsReviews } from '../db/schema'
import { parseSqlDate, toSqlDate } from '../lib/sqlDate'
import { awardForReview } from './gamificationService'

const scheduler = fsrs(generatorParameters({ enable_fuzz: true }))

export function getDueCards(contestId: number, limit: number): DueCard[] {
  return getDb()
    .select({
      srsCardId: srsCards.id,
      flashcardId: flashcards.id,
      deckId: decks.id,
      deckName: decks.name,
      front: flashcards.front,
      back: flashcards.back,
      state: srsCards.state
    })
    .from(srsCards)
    .innerJoin(flashcards, eq(srsCards.flashcardId, flashcards.id))
    .innerJoin(decks, eq(flashcards.deckId, decks.id))
    .where(and(eq(decks.contestId, contestId), sql`${srsCards.due} <= datetime('now')`))
    .orderBy(srsCards.due)
    .limit(Math.max(1, Math.min(limit, 200)))
    .all()
}

export function getReviewStats(contestId: number): ReviewStats {
  const db = getDb()
  const dueNow = db
    .select({ c: count() })
    .from(srsCards)
    .innerJoin(flashcards, eq(srsCards.flashcardId, flashcards.id))
    .innerJoin(decks, eq(flashcards.deckId, decks.id))
    .where(and(eq(decks.contestId, contestId), sql`${srsCards.due} <= datetime('now')`))
    .get()
  const total = db
    .select({ c: count() })
    .from(srsCards)
    .innerJoin(flashcards, eq(srsCards.flashcardId, flashcards.id))
    .innerJoin(decks, eq(flashcards.deckId, decks.id))
    .where(eq(decks.contestId, contestId))
    .get()
  const reviewedToday = db
    .select({ c: count() })
    .from(srsReviews)
    .innerJoin(srsCards, eq(srsReviews.srsCardId, srsCards.id))
    .innerJoin(flashcards, eq(srsCards.flashcardId, flashcards.id))
    .innerJoin(decks, eq(flashcards.deckId, decks.id))
    .where(and(eq(decks.contestId, contestId), sql`date(${srsReviews.review}) = date('now')`))
    .get()
  return { dueNow: dueNow?.c ?? 0, total: total?.c ?? 0, reviewedToday: reviewedToday?.c ?? 0 }
}

export function rateCard(srsCardId: number, rating: ReviewRating): ReviewResult {
  const db = getDb()
  const row = db.select().from(srsCards).where(eq(srsCards.id, srsCardId)).get()
  if (!row) throw new Error('Card de revisão não encontrado')

  const card: FsrsCard = {
    due: parseSqlDate(row.due),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: row.elapsedDays,
    scheduled_days: row.scheduledDays,
    reps: row.reps,
    lapses: row.lapses,
    state: row.state as State,
    last_review: row.lastReview ? parseSqlDate(row.lastReview) : undefined
  }

  const now = new Date()
  const { card: nc, log } = scheduler.next(card, now, rating as unknown as Grade)

  db.update(srsCards)
    .set({
      due: toSqlDate(nc.due),
      stability: nc.stability,
      difficulty: nc.difficulty,
      elapsedDays: nc.elapsed_days,
      scheduledDays: nc.scheduled_days,
      reps: nc.reps,
      lapses: nc.lapses,
      state: nc.state,
      lastReview: nc.last_review ? toSqlDate(nc.last_review) : toSqlDate(now)
    })
    .where(eq(srsCards.id, srsCardId))
    .run()

  db.insert(srsReviews)
    .values({
      srsCardId,
      rating: log.rating,
      state: log.state,
      due: toSqlDate(log.due),
      stability: log.stability,
      difficulty: log.difficulty,
      elapsedDays: log.elapsed_days,
      lastElapsedDays: log.last_elapsed_days,
      scheduledDays: log.scheduled_days,
      review: toSqlDate(log.review)
    })
    .run()

  awardForReview()
  return { nextDue: toSqlDate(nc.due), intervalDays: nc.scheduled_days }
}
