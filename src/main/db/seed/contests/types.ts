import type { ExamConfig, KnowledgeKind, RelationKind } from '@shared/domain'
import type { SeedDiscipline } from '../curriculum'
import type { SeedQuestion } from '../questions'

/** Referência a um tópico no seed (disciplina + nome exato do tópico). */
export interface SeedTopicRef {
  disciplineSlug: string
  topic: string
}

/** Relação do grafo de aprendizagem a semear (fortemente tipada). */
export interface SeedRelation {
  from: SeedTopicRef
  to: SeedTopicRef
  kind: RelationKind
  strength?: number // 0..1 (padrão 0.5)
  note?: string
}

/** Um bloco de conhecimento a semear num tópico. */
export interface SeedKnowledgeEntry {
  kind: KnowledgeKind
  title?: string
  body?: string
  reference?: string
  url?: string
}

/** Conhecimento de um tópico (identificado por disciplina + nome do tópico). */
export interface SeedTopicKnowledge {
  disciplineSlug: string
  topic: string
  entries: SeedKnowledgeEntry[]
}

/** Deck inicial de flashcards do concurso (dados; idempotente por nome). */
export interface SeedStarterDeck {
  name: string
  disciplineSlug?: string
  description?: string
  cards: { front: string; back: string; topic?: SeedTopicRef }[]
}

/** Formato de cadastro de um concurso via seed — apenas dados. */
export interface ContestSeed {
  slug: string
  name: string
  role: string | null
  board: string | null
  examDate: string | null
  city: string | null
  salary: string | null
  benefits: string | null
  examConfig: ExamConfig
  disciplines: SeedDiscipline[]
  questions: SeedQuestion[]
  knowledge?: SeedTopicKnowledge[]
  relations?: SeedRelation[]
  starterDecks?: SeedStarterDeck[]
}
