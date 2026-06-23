import { and, count, eq } from 'drizzle-orm'
import type { DB } from '../connection'
import {
  disciplines,
  gamification,
  questionOptions,
  questions,
  settings,
  topics
} from '../schema'
import { CURRICULUM } from './curriculum'
import { SEED_QUESTIONS } from './questions'

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

/** Popula o banco de forma idempotente: só insere o que ainda não existe. */
export function runSeed(db: DB): void {
  // Linhas-singleton (settings e gamificação).
  const hasSettings = db.select({ id: settings.id }).from(settings).where(eq(settings.id, 1)).get()
  if (!hasSettings) db.insert(settings).values({ id: 1 }).run()

  const hasGami = db.select({ id: gamification.id }).from(gamification).where(eq(gamification.id, 1)).get()
  if (!hasGami) db.insert(gamification).values({ id: 1 }).run()

  // Catálogo do edital (disciplinas + tópicos).
  const discCount = db.select({ c: count() }).from(disciplines).get()
  if (!discCount || discCount.c === 0) {
    CURRICULUM.forEach((d, i) => {
      const res = db
        .insert(disciplines)
        .values({
          slug: d.slug,
          name: d.name,
          block: d.block,
          weight: d.weight,
          examQuestionEstimate: d.examQuestionEstimate,
          color: d.color,
          orderIndex: i
        })
        .run()
      const disciplineId = Number(res.lastInsertRowid)
      d.topics.forEach((t, ti) => {
        db.insert(topics).values({ disciplineId, name: t, slug: slugify(t), orderIndex: ti }).run()
      })
    })
  }

  // Banco de questões inicial.
  const qCount = db.select({ c: count() }).from(questions).get()
  if (!qCount || qCount.c === 0) {
    for (const q of SEED_QUESTIONS) {
      const disc = db
        .select({ id: disciplines.id })
        .from(disciplines)
        .where(eq(disciplines.slug, q.disciplineSlug))
        .get()
      if (!disc) continue

      let topicId: number | null = null
      if (q.topic) {
        const t = db
          .select({ id: topics.id })
          .from(topics)
          .where(and(eq(topics.disciplineId, disc.id), eq(topics.name, q.topic)))
          .get()
        topicId = t?.id ?? null
      }

      const qres = db
        .insert(questions)
        .values({
          disciplineId: disc.id,
          topicId,
          type: q.type,
          statement: q.statement,
          difficulty: q.difficulty,
          explanation: q.explanation,
          source: q.source ?? 'Questão de estudo (seed)',
          year: q.year ?? null
        })
        .run()
      const questionId = Number(qres.lastInsertRowid)

      q.options.forEach((opt, oi) => {
        const letter = q.type === 'CE' ? (oi === 0 ? 'C' : 'E') : String.fromCharCode(65 + oi)
        db.insert(questionOptions)
          .values({
            questionId,
            letter,
            text: opt.text,
            isCorrect: Boolean(opt.correct),
            orderIndex: oi
          })
          .run()
      })
    }
  }
}
