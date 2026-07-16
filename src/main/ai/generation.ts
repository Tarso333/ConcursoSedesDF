// Geração de conteúdo por IA (M22) — OPCIONAL e revisável.
// Todo conteúdo é salvo EXCLUSIVAMENTE nas engines existentes:
//   Knowledge Engine (knowledge_entries) · Relationship Engine (topic_relations)
//   Flashcards (flashcards + srs_cards, fila FSRS) · Questões (questions/options).
// Nenhum armazenamento paralelo. Idempotência: questões por seed_key namespaced
// "ai:"; relações por (origem, destino, tipo); deck por nome no concurso.
import { and, eq, max } from 'drizzle-orm'
import type { Contest, GenerationRequest, GenerationResult } from '@shared/domain'
import { getDb } from '../db/connection'
import {
  decks,
  disciplines,
  flashcards,
  knowledgeEntries,
  questionOptions,
  questions,
  srsCards,
  topicRelations,
  topics
} from '../db/schema'
import { nowSql } from '../lib/sqlDate'
import { getTopicKnowledge } from '../repositories/knowledgeRepository'
import { createActiveProvider } from './factory'
import {
  type GeneratedFlashcard,
  type GeneratedQuestion,
  parseGenerated,
  promptFor
} from './generationSchema'

export const AI_DECK_NAME = 'Gerados por IA'
const AI_SOURCE = 'Gerada por IA (revisar)'

function fnv1a(str: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16)
}

// ───────────────────────── persistência via engines ─────────────────────────

function nextOrderIndex(topicId: number): number {
  const r = getDb()
    .select({ m: max(knowledgeEntries.orderIndex) })
    .from(knowledgeEntries)
    .where(eq(knowledgeEntries.topicId, topicId))
    .get()
  return (r?.m ?? -1) + 1
}

function saveKnowledge(topicId: number, kind: string, title: string, body: string): number {
  getDb()
    .insert(knowledgeEntries)
    .values({ topicId, kind, title, body, orderIndex: nextOrderIndex(topicId) })
    .run()
  return 1
}

function getOrCreateAiDeck(contestId: number, disciplineId: number): number {
  const db = getDb()
  const existing = db
    .select({ id: decks.id })
    .from(decks)
    .where(and(eq(decks.contestId, contestId), eq(decks.name, AI_DECK_NAME)))
    .get()
  if (existing) return existing.id
  const res = db
    .insert(decks)
    .values({
      contestId,
      name: AI_DECK_NAME,
      disciplineId,
      description: 'Flashcards gerados pelo Tutor IA — revise e edite à vontade.'
    })
    .run()
  return Number(res.lastInsertRowid)
}

function saveFlashcards(contestId: number, disciplineId: number, topicId: number, cards: GeneratedFlashcard[]): number {
  const db = getDb()
  const deckId = getOrCreateAiDeck(contestId, disciplineId)
  let saved = 0
  for (const c of cards) {
    const dup = db
      .select({ id: flashcards.id })
      .from(flashcards)
      .where(and(eq(flashcards.deckId, deckId), eq(flashcards.front, c.front.trim())))
      .get()
    if (dup) continue
    const res = db
      .insert(flashcards)
      .values({ deckId, topicId, front: c.front.trim(), back: c.back.trim() })
      .run()
    db.insert(srsCards).values({ flashcardId: Number(res.lastInsertRowid), due: nowSql() }).run()
    saved++
  }
  return saved
}

function saveQuestions(
  contest: Contest,
  disciplineId: number,
  topicId: number,
  items: GeneratedQuestion[]
): number {
  const db = getDb()
  let saved = 0
  for (const q of items) {
    const seedKey = `ai:${contest.slug}:${fnv1a(q.enunciado)}`
    const dup = db.select({ id: questions.id }).from(questions).where(eq(questions.seedKey, seedKey)).get()
    if (dup) continue
    const res = db
      .insert(questions)
      .values({
        disciplineId,
        topicId,
        type: 'ME',
        statement: q.enunciado.trim(),
        difficulty: q.dificuldade,
        explanation: q.comentario.trim(),
        source: AI_SOURCE,
        seedKey
      })
      .run()
    const questionId = Number(res.lastInsertRowid)
    q.alternativas.forEach((text, i) => {
      db.insert(questionOptions)
        .values({
          questionId,
          letter: String.fromCharCode(65 + i),
          text: text.trim(),
          isCorrect: i === q.corretaIndex,
          orderIndex: i
        })
        .run()
    })
    saved++
  }
  return saved
}

function normalizeName(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Relações sugeridas: só entre tópicos EXISTENTES do concurso, marcadas p/ revisão. */
function saveSuggestedRelations(contestId: number, sourceTopicId: number, names: string[]): number {
  if (!names.length) return 0
  const db = getDb()
  const all = db
    .select({ id: topics.id, name: topics.name })
    .from(topics)
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contestId))
    .all()
  const byName = new Map(all.map((t) => [normalizeName(t.name), t.id]))
  let saved = 0
  for (const raw of names.slice(0, 6)) {
    const targetId = byName.get(normalizeName(raw))
    if (!targetId || targetId === sourceTopicId) continue
    const exists = db
      .select({ id: topicRelations.id })
      .from(topicRelations)
      .where(
        and(
          eq(topicRelations.sourceTopicId, sourceTopicId),
          eq(topicRelations.targetTopicId, targetId),
          eq(topicRelations.kind, 'RELACIONADO')
        )
      )
      .get()
    if (exists) continue
    db.insert(topicRelations)
      .values({
        sourceTopicId,
        targetTopicId: targetId,
        kind: 'RELACIONADO',
        strength: 0.4,
        bidirectional: true,
        note: 'Sugerida por IA — revisar'
      })
      .run()
    saved++
  }
  return saved
}

// ───────────────────────── orquestração ─────────────────────────

export async function generateContent(contest: Contest, req: GenerationRequest): Promise<GenerationResult> {
  const view = getTopicKnowledge(req.topicId)
  if (!view) throw new Error('Tópico não encontrado.')
  const count = Math.min(Math.max(req.count ?? (req.kind === 'QUESTOES' ? 3 : 6), 1), 10)

  const existing = view.entries
    .slice(0, 6)
    .map((e) => `- [${e.kind}] ${e.title ?? ''}`)
    .join('\n')
  const provider = createActiveProvider()
  const res = await provider.chat({
    model: null,
    json: provider.capabilities.jsonOutput,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content:
          `Você produz material de estudo para o concurso ${contest.name}` +
          `${contest.board ? ` (banca ${contest.board})` : ''}${contest.role ? `, cargo ${contest.role}` : ''}. ` +
          'Responda APENAS com um objeto JSON válido no formato pedido, sem texto fora do JSON.'
      },
      {
        role: 'user',
        content:
          `Tópico: "${view.topicName}" (disciplina: ${view.disciplineName}).\n` +
          (existing ? `Conteúdo JÁ existente no tópico (não repita):\n${existing}\n` : '') +
          `\nTarefa: ${promptFor(req.kind, count)}`
      }
    ]
  })

  const payload = parseGenerated(req.kind, res.content)
  const saved = { knowledgeEntries: 0, flashcards: 0, questions: 0, relations: 0 }
  let preview = ''

  switch (req.kind) {
    case 'RESUMO':
      saved.knowledgeEntries += saveKnowledge(req.topicId, 'RESUMO', 'Resumo — IA', payload.resumo!.trim())
      preview = 'Resumo salvo no tópico (Conteúdo → seção Resumo).'
      break
    case 'MAPA_MENTAL':
      saved.knowledgeEntries += saveKnowledge(req.topicId, 'MAPA_MENTAL', 'Mapa mental — IA', payload.mapa!.trim())
      preview = 'Estrutura de mapa mental salva no tópico.'
      break
    case 'EXPLICACAO':
      saved.knowledgeEntries += saveKnowledge(
        req.topicId,
        'CONCEITO',
        payload.titulo?.trim() || 'Explicação — IA',
        payload.explicacao!.trim()
      )
      preview = 'Explicação salva no tópico (seção Conceitos).'
      break
    case 'EXEMPLOS':
      for (const ex of payload.exemplos ?? []) {
        saved.knowledgeEntries += saveKnowledge(req.topicId, 'OBSERVACAO', `Exemplo — ${ex.titulo}`, ex.texto)
      }
      preview = `${saved.knowledgeEntries} exemplos salvos no tópico.`
      break
    case 'FLASHCARDS':
      saved.flashcards = saveFlashcards(contest.id, view.disciplineId, req.topicId, payload.flashcards ?? [])
      preview = `${saved.flashcards} flashcards no deck "${AI_DECK_NAME}" (já na fila FSRS).`
      break
    case 'QUESTOES':
      saved.questions = saveQuestions(contest, view.disciplineId, req.topicId, payload.questoes ?? [])
      preview = `${saved.questions} questões adicionadas ao banco (fonte: "${AI_SOURCE}").`
      break
  }

  saved.relations = saveSuggestedRelations(contest.id, req.topicId, payload.relacionados ?? [])
  if (saved.relations > 0) preview += ` ${saved.relations} relação(ões) sugerida(s) no grafo.`

  return { kind: req.kind, topicId: req.topicId, topicName: view.topicName, saved, preview }
}
