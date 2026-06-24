import { and, count, eq, isNull } from 'drizzle-orm'
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
import { type SeedQuestion, SEED_QUESTIONS } from './questions'
import { SEED_QUESTIONS_BANK } from './questionsBank'
import { SEED_QUESTIONS_BANK_2 } from './questionsBank2'

const ALL_QUESTIONS: SeedQuestion[] = [
  ...SEED_QUESTIONS,
  ...SEED_QUESTIONS_BANK,
  ...SEED_QUESTIONS_BANK_2
]

function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

// Hash determinístico (FNV-1a) para gerar uma chave estável por questão.
function fnv1a(str: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16)
}

function seedKeyFor(q: SeedQuestion): string {
  return `${q.disciplineSlug}-${fnv1a(q.statement)}`
}

function seedQuestion(db: DB, q: SeedQuestion): void {
  const disc = db
    .select({ id: disciplines.id })
    .from(disciplines)
    .where(eq(disciplines.slug, q.disciplineSlug))
    .get()
  if (!disc) return

  const key = seedKeyFor(q)

  // Já semeada?
  const existing = db.select({ id: questions.id }).from(questions).where(eq(questions.seedKey, key)).get()
  if (existing) return

  // Adota uma questão legada (mesmo enunciado, sem seed_key) — evita duplicar
  // as questões inseridas antes da coluna seed_key existir.
  const legacy = db
    .select({ id: questions.id })
    .from(questions)
    .where(and(eq(questions.statement, q.statement), isNull(questions.seedKey)))
    .get()
  if (legacy) {
    db.update(questions).set({ seedKey: key }).where(eq(questions.id, legacy.id)).run()
    return
  }

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
      year: q.year ?? null,
      seedKey: key
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

  // Banco de questões — idempotente por seed_key (permite ampliar em updates
  // futuros sem duplicar nem apagar respostas). Cada questão é isolada: um item
  // problemático nunca derruba o seed inteiro.
  for (const q of ALL_QUESTIONS) {
    try {
      seedQuestion(db, q)
    } catch (e) {
      console.error('[seed] questão ignorada:', q.statement.slice(0, 60), e)
    }
  }
}
