import { and, count, eq, isNull } from 'drizzle-orm'
import type { DB } from '../connection'
import {
  contests,
  disciplines,
  gamification,
  questionOptions,
  questions,
  settings,
  topics
} from '../schema'
import { type ContestSeed, SEED_CONTESTS } from './contests'
import type { SeedQuestion } from './questions'

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

/** Chave estável e namespaced por concurso: `<contest>:<disciplina>-<hash>`. */
function seedKeyFor(contestSlug: string, q: SeedQuestion): string {
  return `${contestSlug}:${q.disciplineSlug}-${fnv1a(q.statement)}`
}

function seedContest(db: DB, seed: ContestSeed): void {
  // Concurso: insere apenas se não existir (dados editados pelo usuário,
  // como a data da prova, nunca são sobrescritos).
  let contest = db.select().from(contests).where(eq(contests.slug, seed.slug)).get()
  if (!contest) {
    db.insert(contests)
      .values({
        slug: seed.slug,
        name: seed.name,
        role: seed.role,
        board: seed.board,
        examDate: seed.examDate,
        city: seed.city,
        salary: seed.salary,
        benefits: seed.benefits,
        examConfig: JSON.stringify(seed.examConfig)
      })
      .run()
    contest = db.select().from(contests).where(eq(contests.slug, seed.slug)).get()
  }
  if (!contest) return
  const contestId = contest.id

  // Disciplinas + tópicos do concurso (apenas se ainda não semeados).
  const discCount = db
    .select({ c: count() })
    .from(disciplines)
    .where(eq(disciplines.contestId, contestId))
    .get()
  if (!discCount || discCount.c === 0) {
    seed.disciplines.forEach((d, i) => {
      const res = db
        .insert(disciplines)
        .values({
          contestId,
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

  // Banco de questões — idempotente por seed_key; permite ampliar em updates
  // sem duplicar nem apagar respostas já registradas.
  for (const q of seed.questions) {
    try {
      seedQuestion(db, contestId, seed.slug, q)
    } catch (e) {
      console.error('[seed] questão ignorada:', q.statement.slice(0, 60), e)
    }
  }
}

function seedQuestion(db: DB, contestId: number, contestSlug: string, q: SeedQuestion): void {
  const disc = db
    .select({ id: disciplines.id })
    .from(disciplines)
    .where(and(eq(disciplines.contestId, contestId), eq(disciplines.slug, q.disciplineSlug)))
    .get()
  if (!disc) return

  const key = seedKeyFor(contestSlug, q)

  // Já semeada?
  const existing = db.select({ id: questions.id }).from(questions).where(eq(questions.seedKey, key)).get()
  if (existing) return

  // Adota questão legada (mesmo enunciado, sem seed_key) DESTE concurso —
  // evita duplicar itens inseridos antes da coluna seed_key existir.
  const legacy = db
    .select({ id: questions.id })
    .from(questions)
    .innerJoin(disciplines, eq(questions.disciplineId, disciplines.id))
    .where(
      and(
        eq(questions.statement, q.statement),
        isNull(questions.seedKey),
        eq(disciplines.contestId, contestId)
      )
    )
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

  // Concursos cadastrados (registro em ./contests).
  for (const contestSeed of SEED_CONTESTS) {
    seedContest(db, contestSeed)
  }

  // Garante um concurso ativo.
  const s = db.select({ activeContestId: settings.activeContestId }).from(settings).where(eq(settings.id, 1)).get()
  if (s && s.activeContestId == null) {
    const first = db.select({ id: contests.id }).from(contests).orderBy(contests.id).get()
    if (first) db.update(settings).set({ activeContestId: first.id }).where(eq(settings.id, 1)).run()
  }
}
