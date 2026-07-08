import type { ExamConfig, KnowledgeKind } from '@shared/domain'
import type { SeedDiscipline } from '../curriculum'
import type { SeedQuestion } from '../questions'

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
}
