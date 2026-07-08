import type { ExamConfig } from '@shared/domain'
import type { SeedDiscipline } from '../curriculum'
import type { SeedQuestion } from '../questions'

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
}
