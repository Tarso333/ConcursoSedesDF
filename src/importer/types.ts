// Contratos do Universal Contest Import Engine.
// O importador PRODUZ ContestSeed (formato do domínio) — nunca o contrário.
// Importa apenas TIPOS do domínio (dependência de tipo, sem runtime).
import type { DisciplineBlock } from '@shared/domain'
import type { ContestSeed } from '@main/db/seed/contests/types'

/** Metadados extraídos do edital (superset do cabeçalho do ContestSeed). */
export interface ExtractedMeta {
  orgao: string | null
  board: string | null
  role: string | null
  city: string | null
  examDate: string | null // ISO yyyy-mm-dd
  salary: string | null
  benefits: string | null
  jornada: string | null
  /** Campos que a extração NÃO encontrou (para o relatório). */
  missing: string[]
}

/** Um achado do relatório de inconsistências. */
export interface Inconsistency {
  severity: 'info' | 'warn' | 'error'
  stage: 'metadata' | 'exam' | 'curriculum' | 'coverage'
  field?: string
  message: string
}

/** Relatório de cobertura: parser × edital. */
export interface CoverageReport {
  disciplines: number
  topics: number
  subtopics: number
  knowledgePlaceholders: number
  relationPlaceholders: number
  questions: number
  disciplinesWithoutTopics: string[]
  /** Estimativa de cobertura do conteúdo programático (0..100). */
  estimatedProgramCoveragePct: number
}

/** Relatório completo de uma importação. */
export interface ImportReport {
  requestedBank: string | null
  resolvedBank: string
  detectedBank: string | null
  metadata: ExtractedMeta
  exam: {
    blocks: number
    totalQuestions: number
    durationMin: number
    source: 'parsed' | 'fallback'
  }
  coverage: CoverageReport
  inconsistencies: Inconsistency[]
}

/** Resultado de uma importação: o seed pronto + o relatório. */
export interface ImportResult {
  seed: ContestSeed
  report: ImportReport
}

/** Opções da importação (todas opcionais; defaults determinísticos). */
export interface ImportOptions {
  /** Força um adaptador de banca (id). Sem isso, tenta auto-detectar. */
  bank?: string
  /** Slug do concurso. Sem isso, derivado do órgão/nome. */
  slug?: string
  /** Nome do concurso. Sem isso, derivado do órgão + ano. */
  name?: string
  /** Bloco default quando o texto não traz marcador (CG/CE). */
  defaultBlock?: DisciplineBlock
  /** Âncora que marca o INÍCIO do conteúdo programático a recortar. */
  programSectionAnchor?: RegExp
  /** Âncora que marca o FIM do recorte (ex.: próximo perfil/cargo). */
  programSectionEnd?: RegExp
}
