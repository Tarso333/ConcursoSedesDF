// Extração determinística da estrutura da prova (ExamConfig).
// Os blocos vêm das disciplinas efetivamente encontradas; contagem/duração
// tentam ser lidas do texto, com fallback documentado.
import type { DisciplineBlock, ExamBlockConfig, ExamConfig } from '@shared/domain'
import type { SeedDiscipline } from '@main/db/seed/curriculum'
import type { BankAdapter } from './adapters/types'
import { inferYear } from './metadata'
import { deaccent, flatten } from './text'

const BLOCK_LABEL: Record<DisciplineBlock, string> = {
  GERAL: 'Conhecimentos Gerais',
  ESPECIFICO: 'Conhecimentos Específicos'
}

/** Duração da prova em minutos (texto → minutos), com default 240. */
function findDuration(normalized: string): number | null {
  const flat = flatten(normalized)
  // "das 13h às 17h" → diferença em horas.
  const win = /das?\s+(\d{1,2})\s*h(?:\d{2})?\s+[àa]s?\s+(\d{1,2})\s*h/i.exec(flat)
  if (win) {
    const h = Number(win[2]) - Number(win[1])
    if (h > 0 && h <= 8) return h * 60
  }
  // "4 (quatro) horas" / "duração de 4 horas" / "quatro horas de duração".
  const hs = /(\d{1,2})\s*(?:\([a-zç]+\)\s*)?horas?\s*(?:de\s*)?(?:dura|para)?/i.exec(flat)
  if (hs) {
    const h = Number(hs[1])
    if (h >= 1 && h <= 8) return h * 60
  }
  return null
}

/** Peso por questão do bloco específico (ex.: "peso 2,5"). */
function findWeight(normalized: string): number | null {
  const m = /peso\s+(\d+(?:[,.]\d+)?)/i.exec(flatten(normalized))
  if (!m) return null
  const w = Number(m[1].replace(',', '.'))
  return w > 0 && w <= 10 ? w : null
}

/** Total de questões declarado no edital (ex.: "70 questões"). */
function findTotalQuestions(normalized: string): number | null {
  const m = /(\d{2,3})\s+quest[õo]es/i.exec(deaccent(flatten(normalized)))
  if (!m) return null
  const n = Number(m[1])
  return n >= 10 && n <= 250 ? n : null
}

export interface ExamResult {
  exam: ExamConfig
  source: 'parsed' | 'fallback'
  declaredTotalQuestions: number | null
}

/** Constrói o ExamConfig a partir das disciplinas + sinais do texto. */
export function buildExam(
  normalized: string,
  adapter: BankAdapter,
  disciplines: SeedDiscipline[]
): ExamResult {
  const duration = findDuration(normalized)
  const especWeight = findWeight(normalized)
  const declared = findTotalQuestions(normalized)

  const present: DisciplineBlock[] = []
  for (const b of ['GERAL', 'ESPECIFICO'] as DisciplineBlock[]) {
    if (disciplines.some((d) => d.block === b)) present.push(b)
  }
  if (present.length === 0) present.push('ESPECIFICO')

  const blocks: ExamBlockConfig[] = present.map((b) => {
    const questions = disciplines
      .filter((d) => d.block === b)
      .reduce((s, d) => s + d.examQuestionEstimate, 0)
    return {
      block: b,
      label: BLOCK_LABEL[b],
      questions: Math.max(1, questions),
      weightPerQuestion: b === 'ESPECIFICO' ? (especWeight ?? 1) : 1,
      minScorePct: 0
    }
  })

  let exam: ExamConfig = {
    durationMin: duration ?? 240,
    blocks,
    approvalTargetPct: 60
  }
  const source: ExamResult['source'] = duration != null || especWeight != null || declared != null ? 'parsed' : 'fallback'

  if (adapter.refineExam) {
    const refined = adapter.refineExam(exam, {
      rawText: normalized,
      normalizedText: normalized,
      deaccentedUpper: deaccent(normalized).toUpperCase(),
      year: inferYear(normalized)
    })
    if (refined) exam = refined
  }

  return { exam, source, declaredTotalQuestions: declared }
}
