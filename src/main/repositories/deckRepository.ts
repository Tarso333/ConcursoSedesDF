import { and, desc, eq, sql } from 'drizzle-orm'
import type { Deck, DeckInput, Flashcard, FlashcardInput } from '@shared/domain'
import { getDb } from '../db/connection'
import { decks, disciplines, errorLogs, flashcards, questions, srsCards } from '../db/schema'
import { nowSql } from '../lib/sqlDate'

export function listDecks(contestId: number): Deck[] {
  const db = getDb()
  return db
    .select({
      id: decks.id,
      name: decks.name,
      disciplineId: decks.disciplineId,
      description: decks.description,
      cardCount: sql<number>`(SELECT COUNT(*) FROM flashcards fc WHERE fc.deck_id = ${decks.id})`,
      dueCount: sql<number>`(SELECT COUNT(*) FROM srs_cards s JOIN flashcards fc ON fc.id = s.flashcard_id WHERE fc.deck_id = ${decks.id} AND s.due <= datetime('now'))`
    })
    .from(decks)
    .where(eq(decks.contestId, contestId))
    .orderBy(decks.name)
    .all()
}

export function createDeck(contestId: number, input: DeckInput): Deck {
  const db = getDb()
  const res = db
    .insert(decks)
    .values({
      contestId,
      name: input.name,
      disciplineId: input.disciplineId ?? null,
      description: input.description ?? null
    })
    .run()
  return {
    id: Number(res.lastInsertRowid),
    name: input.name,
    disciplineId: input.disciplineId ?? null,
    description: input.description ?? null,
    cardCount: 0,
    dueCount: 0
  }
}

export function deleteDeck(id: number): void {
  getDb().delete(decks).where(eq(decks.id, id)).run()
}

export function listFlashcards(deckId: number): Flashcard[] {
  return getDb()
    .select({
      id: flashcards.id,
      deckId: flashcards.deckId,
      front: flashcards.front,
      back: flashcards.back,
      sourceQuestionId: flashcards.sourceQuestionId
    })
    .from(flashcards)
    .where(eq(flashcards.deckId, deckId))
    .orderBy(desc(flashcards.id))
    .all()
}

export function createFlashcard(input: FlashcardInput): Flashcard {
  const db = getDb()
  const res = db
    .insert(flashcards)
    .values({ deckId: input.deckId, front: input.front, back: input.back })
    .run()
  const id = Number(res.lastInsertRowid)
  db.insert(srsCards).values({ flashcardId: id, due: nowSql() }).run()
  return { id, deckId: input.deckId, front: input.front, back: input.back, sourceQuestionId: null }
}

export function deleteFlashcard(id: number): void {
  getDb().delete(flashcards).where(eq(flashcards.id, id)).run()
}

export function generateFlashcardsFromErrors(deckId: number, limit: number): { created: number } {
  const db = getDb()

  // Os erros usados são sempre do concurso ao qual o deck pertence.
  const deck = db.select({ contestId: decks.contestId }).from(decks).where(eq(decks.id, deckId)).get()
  if (!deck?.contestId) return { created: 0 }

  const rows = db
    .select({
      questionId: questions.id,
      statement: questions.statement,
      explanation: questions.explanation,
      correctText: sql<
        string | null
      >`(SELECT o.text FROM question_options o WHERE o.question_id = ${questions.id} AND o.is_correct = 1 LIMIT 1)`
    })
    .from(errorLogs)
    .innerJoin(questions, eq(errorLogs.questionId, questions.id))
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(
      and(
        eq(disciplines.contestId, deck.contestId),
        eq(errorLogs.status, 'ABERTO'),
        sql`NOT EXISTS (SELECT 1 FROM flashcards fc WHERE fc.deck_id = ${deckId} AND fc.source_question_id = ${questions.id})`
      )
    )
    .groupBy(questions.id)
    .limit(Math.max(1, Math.min(limit, 100)))
    .all()

  let created = 0
  for (const r of rows) {
    const back = [r.correctText ? `Resposta correta: ${r.correctText}` : null, r.explanation]
      .filter(Boolean)
      .join('\n\n')
    const res = db
      .insert(flashcards)
      .values({ deckId, front: r.statement, back, sourceQuestionId: r.questionId })
      .run()
    db.insert(srsCards).values({ flashcardId: Number(res.lastInsertRowid), due: nowSql() }).run()
    created += 1
  }
  return { created }
}
