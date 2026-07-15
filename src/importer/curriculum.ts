// Parser determinístico de currículo: recorta o conteúdo programático e o
// transforma em SeedDiscipline[] (disciplinas → tópicos → subtópicos).
// Estratégia por disciplina:
//   1) numeração em sequência "1 … 2 … 3 …" (+ subtópicos decimais "N.M");
//   2) fallback por delimitadores (";" depois ",") quando não há numeração.
// Nenhuma IA: apenas numeração, hierarquia, delimitadores e parênteses.
import type { DisciplineBlock } from '@shared/domain'
import type { SeedDiscipline, SeedTopic } from '@main/db/seed/curriculum'
import type { BankAdapter } from './adapters/types'
import { cleanTopicText, deaccent, flatten, slugify, titleCase, upperRatio } from './text'

// Paleta estável para colorir disciplinas de forma determinística.
const PALETTE = [
  '#3b82f6', '#f97316', '#8b5cf6', '#06b6d4', '#22c55e',
  '#ef4444', '#eab308', '#14b8a6', '#ec4899', '#6366f1',
  '#84cc16', '#0ea5e9', '#f59e0b', '#a855f7', '#10b981'
]

interface ParsedTopic {
  name: string
  children: string[]
}

export interface RawDiscipline {
  name: string
  block: DisciplineBlock
  body: string
}

export interface CurriculumResult {
  disciplines: SeedDiscipline[]
  /** Texto da seção efetivamente analisada (para o relatório de cobertura). */
  section: string
  /** Estatísticas para o relatório de cobertura. */
  stats: { topics: number; subtopics: number; disciplinesWithoutTopics: string[] }
}

/** Recorta a região do conteúdo programático (entre âncoras de início/fim). */
export function extractProgramSection(normalizedText: string, anchor?: RegExp, end?: RegExp): string {
  const anchors = anchor
    ? [anchor]
    : [
        /CONTE[UÚ]DO\s+PROGRAM[AÁ]TICO/i,
        /PROGRAMA\s+DAS?\s+DISCIPLINAS/i,
        /DOS?\s+CONHECIMENTOS/i,
        /ANEXO\s+[IVX]+/i
      ]
  let start = 0
  for (const re of anchors) {
    const m = re.exec(normalizedText)
    if (m) {
      start = m.index
      break
    }
  }
  let sliced = normalizedText.slice(start)
  if (end) {
    // procura o fim DEPOIS do início (ignora um casamento na própria âncora).
    const tail = sliced.slice(1)
    const em = end.exec(tail)
    if (em) sliced = sliced.slice(0, em.index + 1)
  }
  return sliced
}

/** Uma linha é provável cabeçalho de disciplina? (caixa alta, sem stopword) */
function isHeading(line: string, adapter: BankAdapter): boolean {
  const t = line.trim().replace(/:$/, '').trim()
  if (t.length < 3 || t.length > 120) return false
  const letters = t.replace(/[^\p{L}]/gu, '')
  if (letters.length < 3) return false
  if (upperRatio(t) < 0.7) return false
  if (adapter.patterns.headingStopword.test(deaccent(t).toUpperCase())) return false
  // Guardas anti-ruído de PDF: cabeçalhos de disciplina não contêm frases
  // (ponto seguido de espaço) — sinal de quebra de linha no meio de um
  // parágrafo/tabela (ex.: "SQLSERVER 2019. 8 Arqui").
  if (/\.\s/.test(t)) return false
  // Anos/decimais soltos denunciam fragmento de tabela — mas referências de
  // lei entre parênteses são legítimas (ex.: "Licitações (Lei 14.133/2021)").
  const bare = t.replace(/\([^)]*\)/g, '')
  if (/\d{4}/.test(bare)) return false
  if (/\b\d{1,2}\.\d/.test(bare)) return false
  // Precisa ter ao menos uma "palavra" alfabética de conteúdo.
  return /\p{L}{2,}/u.test(t)
}

/** Divide a seção em disciplinas (cabeçalho + corpo), rastreando o bloco. */
export function splitDisciplines(
  section: string,
  adapter: BankAdapter,
  defaultBlock: DisciplineBlock
): RawDiscipline[] {
  const lines = section.split('\n')
  const out: RawDiscipline[] = []
  let block: DisciplineBlock = defaultBlock
  let current: RawDiscipline | null = null

  const pushBody = (text: string): void => {
    if (current) current.body += (current.body ? ' ' : '') + text
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue

    // Marcadores de bloco consomem a linha (não viram disciplina).
    if (adapter.patterns.blockEspecifico.test(line)) {
      block = 'ESPECIFICO'
      continue
    }
    if (adapter.patterns.blockGeral.test(line)) {
      block = 'GERAL'
      continue
    }

    // Cabeçalho "DISCIPLINA: 1 Tópico…" — separa nome do corpo inline.
    const colonIdx = line.indexOf(':')
    const headPart = colonIdx >= 0 ? line.slice(0, colonIdx) : line
    if (isHeading(headPart, adapter)) {
      current = { name: titleCase(headPart), block, body: '' }
      out.push(current)
      if (colonIdx >= 0) pushBody(line.slice(colonIdx + 1).trim())
      continue
    }

    pushBody(line)
  }

  return out.filter((d) => d.body.trim().length > 0 || out.length === 1)
}

/** Extrai filhos de uma enumeração entre parênteses (≥2 itens). */
function parenChildren(span: string): string[] {
  const m = /\(([^)]*)\)/.exec(span)
  if (!m) return []
  const inner = m[1]
  const parts = inner
    .split(/[,;]| e /i)
    .map((p) => cleanTopicText(p))
    .filter((p) => p.length >= 2)
  return parts.length >= 2 ? parts : []
}

function stripParen(span: string): string {
  return span.replace(/\([^)]*\)/g, ' ')
}

/** Dado o número do tópico e seu trecho, separa nome e subtópicos "N.M". */
function splitSubtopics(n: number, span: string): ParsedTopic {
  const subs: { m: number; idx: number }[] = []
  let expected = 1
  let from = 0
  while (true) {
    // O número não pode ser precedido por letra/dígito/ponto (evita falsos
    // marcadores dentro de "802.1", "IPv6", "19C" etc.).
    const re = new RegExp(`(^|[^\\d.\\p{L}])${n}\\.(${expected})(?=\\s+\\p{L})`, 'u')
    const m = re.exec(span.slice(from))
    if (!m) break
    const idx = from + m.index + m[1].length
    subs.push({ m: expected, idx })
    from = idx + `${n}.${expected}`.length
    expected++
  }
  if (subs.length === 0) {
    return { name: cleanTopicText(stripParen(span)), children: parenChildren(span) }
  }
  const name = cleanTopicText(stripParen(span.slice(0, subs[0].idx)))
  const children: string[] = []
  for (let i = 0; i < subs.length; i++) {
    const start = subs[i].idx + `${n}.${subs[i].m}`.length
    const end = i + 1 < subs.length ? subs[i + 1].idx : span.length
    children.push(cleanTopicText(span.slice(start, end)))
  }
  return { name, children }
}

/** Tenta interpretar o corpo como lista numerada "1 … 2 …". */
function parseNumbered(body: string): ParsedTopic[] | null {
  const text = ' ' + flatten(body) + ' '
  const markers: { n: number; idx: number }[] = []
  let expected = 1
  let from = 0
  while (true) {
    // O marcador não pode vir logo após letra/dígito/ponto — assim "IPv6 e",
    // "802.11" e "19C" não viram tópicos numerados falsos. O lookahead tolera
    // um número espúrio entre o marcador e o texto (artefato de paginação,
    // ex.: "17 35 GRASP", onde 35 é o número da página).
    const re = new RegExp(`(^|[^\\d.\\p{L}])(${expected})(?=\\s+(?:\\d{1,3}\\s+)?\\p{L})`, 'u')
    const m = re.exec(text.slice(from))
    if (!m) break
    const idx = from + m.index + m[1].length
    markers.push({ n: expected, idx })
    from = idx + String(expected).length
    expected++
  }
  // Aceita como "numerado" se há ≥2 marcadores em sequência, ou um único
  // marcador "1" logo no início do corpo (disciplina de tópico único).
  if (markers.length === 0) return null
  if (markers.length === 1 && markers[0].idx > 3) return null
  const topics: ParsedTopic[] = []
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].idx + String(markers[i].n).length
    const end = i + 1 < markers.length ? markers[i + 1].idx : text.length
    const span = text.slice(start, end)
    const parsed = splitSubtopics(markers[i].n, span)
    if (parsed.name) topics.push(parsed)
  }
  return topics.length > 0 ? topics : null
}

/** Fallback: separa por ";" e depois "," quando não há numeração. */
function parseDelimited(body: string): ParsedTopic[] {
  const clean = flatten(body).replace(/^:\s*/, '').replace(/\.\s*$/, '')
  const bySemi = clean.split(';').map((s) => s.trim()).filter(Boolean)
  const parts = bySemi.length > 1 ? bySemi : clean.split(',').map((s) => s.trim()).filter(Boolean)
  return parts
    .map((p) => ({ name: cleanTopicText(stripParen(p)), children: parenChildren(p) }))
    .filter((t) => t.name.length >= 2)
}

/** Converte o corpo de uma disciplina em tópicos (numerado ou delimitado). */
export function parseTopics(body: string): SeedTopic[] {
  const parsed = parseNumbered(body) ?? parseDelimited(body)
  return parsed.map((t) =>
    t.children.length > 0 ? { name: t.name, children: t.children } : t.name
  )
}

function countTopic(t: SeedTopic): { topics: number; subtopics: number } {
  return typeof t === 'string'
    ? { topics: 1, subtopics: 0 }
    : { topics: 1, subtopics: t.children.length }
}

/** Monta o currículo completo a partir do texto normalizado. */
export function buildCurriculum(
  normalizedText: string,
  adapter: BankAdapter,
  defaultBlock: DisciplineBlock,
  anchor?: RegExp,
  end?: RegExp
): CurriculumResult {
  const section = extractProgramSection(normalizedText, anchor, end)
  const raw = splitDisciplines(section, adapter, defaultBlock)

  let topicsTotal = 0
  let subtopicsTotal = 0
  const without: string[] = []

  let disciplines: SeedDiscipline[] = raw.map((d, i) => {
    const topics = parseTopics(d.body)
    if (topics.length === 0) without.push(d.name)
    for (const t of topics) {
      const c = countTopic(t)
      topicsTotal += c.topics
      subtopicsTotal += c.subtopics
    }
    return {
      slug: slugify(d.name) || `disciplina-${i + 1}`,
      name: d.name,
      block: d.block,
      weight: 1,
      examQuestionEstimate: Math.max(1, topics.length),
      color: PALETTE[i % PALETTE.length],
      topics
    }
  })

  if (adapter.refineCurriculum) {
    disciplines = adapter.refineCurriculum(disciplines, {
      rawText: normalizedText,
      normalizedText,
      deaccentedUpper: deaccent(normalizedText).toUpperCase(),
      year: null
    })
  }

  return {
    disciplines,
    section,
    stats: { topics: topicsTotal, subtopics: subtopicsTotal, disciplinesWithoutTopics: without }
  }
}
