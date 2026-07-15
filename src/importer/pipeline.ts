// Pipeline do Universal Contest Import Engine.
// Orquestra as etapas determinísticas: PDF/texto → metadados, estrutura da
// prova, currículo (disciplinas/tópicos/subtópicos), placeholders de
// conhecimento e de relações, e relatórios de cobertura/inconsistências.
// Produz EXCLUSIVAMENTE um ContestSeed (formato consumido pelas engines).
import type { ContestSeed } from '@main/db/seed/contests/types'
import { detectAdapter, resolveAdapter } from './adapters/registry'
import { buildCoverageReport, collectInconsistencies, deriveSlug } from './coverage'
import { buildCurriculum } from './curriculum'
import { buildExam } from './exam'
import { extractMetadata, inferYear } from './metadata'
import { extractPdfText } from './pdf'
import { buildKnowledgePlaceholders, buildRelationPlaceholders } from './placeholders'
import { deaccent, dehyphenate, normalizeWhitespace } from './text'
import type { ExtractedMeta, ImportOptions, ImportReport, ImportResult } from './types'

function buildName(meta: ExtractedMeta, year: number | null): string {
  const base = meta.orgao ?? meta.board ?? 'Concurso'
  return year ? `${base} ${year}` : base
}

function buildBenefits(meta: ExtractedMeta): string | null {
  const parts: string[] = []
  if (meta.benefits) parts.push(meta.benefits)
  if (meta.jornada) parts.push(`Jornada: ${meta.jornada}`)
  return parts.length > 0 ? parts.join('; ') : null
}

/** Importa um concurso a partir do TEXTO já extraído de um edital. */
export function importContestFromText(rawText: string, options: ImportOptions = {}): ImportResult {
  const normalized = normalizeWhitespace(dehyphenate(rawText))
  const deaccentedUpper = deaccent(normalized).toUpperCase()

  const requestedBank = options.bank ?? null
  const detected = detectAdapter(deaccentedUpper)
  const adapter = resolveAdapter(options.bank, deaccentedUpper)
  const bankWasRecognized = adapter.id !== 'generic'

  const meta = extractMetadata(normalized, adapter, bankWasRecognized)
  const curriculum = buildCurriculum(
    normalized,
    adapter,
    options.defaultBlock ?? 'ESPECIFICO',
    options.programSectionAnchor,
    options.programSectionEnd
  )
  const exam = buildExam(normalized, adapter, curriculum.disciplines)
  const knowledge = buildKnowledgePlaceholders(curriculum.disciplines)
  const relations = buildRelationPlaceholders(curriculum.disciplines)

  const year = inferYear(normalized)
  const name = options.name ?? buildName(meta, year)
  const slug = options.slug ?? deriveSlug(name)

  const seed: ContestSeed = {
    slug,
    name,
    role: meta.role,
    board: meta.board,
    examDate: meta.examDate,
    city: meta.city,
    salary: meta.salary,
    benefits: buildBenefits(meta),
    examConfig: exam.exam,
    disciplines: curriculum.disciplines,
    questions: [],
    knowledge,
    relations
  }

  const coverage = buildCoverageReport(seed, curriculum.section, knowledge.length, relations.length)
  const inconsistencies = collectInconsistencies(seed, meta, exam.source, exam.declaredTotalQuestions, coverage)

  const report: ImportReport = {
    requestedBank,
    resolvedBank: adapter.id,
    detectedBank: detected?.id ?? null,
    metadata: meta,
    exam: {
      blocks: exam.exam.blocks.length,
      totalQuestions: exam.exam.blocks.reduce((s, b) => s + b.questions, 0),
      durationMin: exam.exam.durationMin,
      source: exam.source
    },
    coverage,
    inconsistencies
  }

  return { seed, report }
}

/** Importa um concurso a partir do BUFFER de um PDF de edital. */
export function importContestFromPdf(buffer: Buffer, options: ImportOptions = {}): ImportResult {
  return importContestFromText(extractPdfText(buffer), options)
}
