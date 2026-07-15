// Relatório de cobertura e inconsistências: compara a estrutura produzida
// com sinais independentes do próprio edital (numeração, totais declarados).
import type { ContestSeed } from '@main/db/seed/contests/types'
import type { CoverageReport, ExtractedMeta, Inconsistency } from './types'
import { deaccent, flatten } from './text'

function countTopics(seed: ContestSeed): { topics: number; subtopics: number } {
  let topics = 0
  let subtopics = 0
  for (const d of seed.disciplines) {
    for (const t of d.topics) {
      topics++
      if (typeof t !== 'string') subtopics += t.children.length
    }
  }
  return { topics, subtopics }
}

/**
 * Estima a cobertura do programa contando os marcadores numéricos de tópico
 * ("N ") presentes no texto e comparando com os tópicos efetivamente gerados.
 */
function estimateCoverage(normalized: string, generatedTopics: number): number {
  const flat = flatten(normalized)
  // marcadores plausíveis: número 1..2 dígitos seguido de espaço e letra.
  const markers = [...flat.matchAll(/(?:^|[^\d.])(\d{1,2})\s+\p{L}/gu)].length
  if (markers === 0) return generatedTopics > 0 ? 100 : 0
  return Math.min(100, Math.round((generatedTopics / markers) * 100))
}

export function buildCoverageReport(
  seed: ContestSeed,
  sectionText: string,
  knowledgeCount: number,
  relationCount: number
): CoverageReport {
  const { topics, subtopics } = countTopics(seed)
  const without = seed.disciplines.filter((d) => d.topics.length === 0).map((d) => d.name)
  return {
    disciplines: seed.disciplines.length,
    topics,
    subtopics,
    knowledgePlaceholders: knowledgeCount,
    relationPlaceholders: relationCount,
    questions: seed.questions.length,
    disciplinesWithoutTopics: without,
    estimatedProgramCoveragePct: estimateCoverage(sectionText, topics)
  }
}

/** Reúne inconsistências das etapas em uma lista ordenada por severidade. */
export function collectInconsistencies(
  seed: ContestSeed,
  meta: ExtractedMeta,
  examSource: 'parsed' | 'fallback',
  declaredTotalQuestions: number | null,
  coverage: CoverageReport
): Inconsistency[] {
  const out: Inconsistency[] = []

  for (const field of meta.missing) {
    out.push({
      severity: field === 'benefits' || field === 'jornada' || field === 'orgao' ? 'info' : 'warn',
      stage: 'metadata',
      field,
      message: `Metadado não localizado no edital: "${field}".`
    })
  }

  if (examSource === 'fallback') {
    out.push({
      severity: 'warn',
      stage: 'exam',
      message: 'Estrutura da prova não detectada no texto; usados valores-padrão (duração 240min, peso 1).'
    })
  }

  if (declaredTotalQuestions != null) {
    const total = seed.examConfig.blocks.reduce((s, b) => s + b.questions, 0)
    if (Math.abs(total - declaredTotalQuestions) > 0) {
      out.push({
        severity: 'info',
        stage: 'exam',
        message: `Total estimado por disciplina (${total}) difere do total declarado no edital (${declaredTotalQuestions}); estimativas por disciplina são proxies de peso.`
      })
    }
  }

  if (seed.disciplines.length === 0) {
    out.push({ severity: 'error', stage: 'curriculum', message: 'Nenhuma disciplina foi identificada no conteúdo programático.' })
  }
  for (const name of coverage.disciplinesWithoutTopics) {
    out.push({ severity: 'warn', stage: 'curriculum', field: name, message: `Disciplina "${name}" ficou sem tópicos.` })
  }
  if (coverage.estimatedProgramCoveragePct < 60 && seed.disciplines.length > 0) {
    out.push({
      severity: 'warn',
      stage: 'coverage',
      message: `Cobertura estimada baixa (${coverage.estimatedProgramCoveragePct}%): revisar o recorte do conteúdo programático.`
    })
  }

  const order = { error: 0, warn: 1, info: 2 }
  return out.sort((a, b) => order[a.severity] - order[b.severity])
}

/** Deriva o slug do concurso a partir do nome/órgão + ano. */
export function deriveSlug(name: string): string {
  return deaccent(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}
