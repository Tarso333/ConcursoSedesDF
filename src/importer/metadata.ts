// Extração determinística de metadados do edital (regex + heurísticas).
import type { BankAdapter } from './adapters/types'
import type { ExtractedMeta } from './types'
import { flatten } from './text'

const MONTHS: Record<string, string> = {
  janeiro: '01', fevereiro: '02', marco: '03', março: '03', abril: '04',
  maio: '05', junho: '06', julho: '07', agosto: '08', setembro: '09',
  outubro: '10', novembro: '11', dezembro: '12'
}

/** Todas as datas por extenso "11 de outubro de 2026" → ISO. */
function extenseDates(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(/(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/gi)) {
    const mm = MONTHS[m[2].toLowerCase()]
    if (mm) out.push(`${m[3]}-${mm}-${m[1].padStart(2, '0')}`)
  }
  return out
}

/** Todas as datas dd/mm/aaaa (ou dd.mm.aaaa) → ISO. */
function numericDates(text: string): string[] {
  return [...text.matchAll(/(\d{2})[/.](\d{2})[/.](\d{4})/g)].map((m) => `${m[3]}-${m[2]}-${m[1]}`)
}

/** Escolhe a data mais plausível: prefere anos recentes (concursos vigentes). */
function pickDate(candidates: string[]): string | null {
  if (candidates.length === 0) return null
  const recent = candidates.find((d) => Number(d.slice(0, 4)) >= 2015)
  return recent ?? candidates[0]
}

/** Data da prova: prioriza a janela próxima a "prova objetiva". */
function findExamDate(normalized: string): string | null {
  const flat = flatten(normalized)
  const anchor = /prova\s+objetiva|aplica[cç][aã]o\s+das?\s+provas?|realiza[cç][aã]o\s+da\s+prova/i.exec(flat)
  if (anchor) {
    const window = flat.slice(anchor.index, anchor.index + 220)
    const d = pickDate([...extenseDates(window), ...numericDates(window)])
    if (d) return d
  }
  // Datas por extenso são menos ambíguas que dd/mm/aaaa → preferidas.
  return pickDate([...extenseDates(flat), ...numericDates(flat)])
}

/** Salário: maior valor "R$" acima de mil (evita taxa de inscrição). */
function findSalary(normalized: string): string | null {
  const flat = flatten(normalized)
  const anchor = /remunera[cç][aã]o|sal[aá]rio|vencimento|subs[ií]dio/i.exec(flat)
  const scope = anchor ? flat.slice(anchor.index, anchor.index + 260) : flat
  const values = [...scope.matchAll(/R\$\s?([\d.]+,\d{2})/g)]
  const parse = (s: string): number => Number(s.replace(/\./g, '').replace(',', '.'))
  const big = values.map((v) => v[1]).filter((v) => parse(v) >= 1000)
  if (big.length === 0) return null
  if (big.length === 1) return `R$ ${big[0]}`
  const nums = big.map(parse)
  const min = big[nums.indexOf(Math.min(...nums))]
  const max = big[nums.indexOf(Math.max(...nums))]
  return min === max ? `R$ ${max}` : `R$ ${min} a R$ ${max}`
}

/** Cidade no formato "Nome/UF". */
function findCity(normalized: string): string | null {
  const m = /([A-ZÁ-Ú][a-zá-ú]+(?:\s+[A-ZÁ-Ú][a-zá-ú]+)*)\s*\/\s*([A-Z]{2})\b/.exec(normalized)
  return m ? `${m[1]}/${m[2]}` : null
}

/** Cargo/perfil próximo de "Cargo:" ou "Perfil N:". */
function findRole(normalized: string): string | null {
  const flat = flatten(normalized)
  const m =
    /Cargo\s*:?\s*([^.;\n]{4,120})/i.exec(flat) ??
    /Perfil\s+\d+\s*:?\s*([A-ZÁ-Ú][^.;\n]{4,120})/i.exec(flat)
  return m ? cleanInline(m[1]) : null
}

/** Jornada/carga horária. */
function findJornada(normalized: string): string | null {
  const flat = flatten(normalized)
  const m = /(?:jornada|carga hor[aá]ria)[^.\d]{0,20}(\d{1,3})\s*horas?(?:\s*semanais?)?/i.exec(flat)
  return m ? `${m[1]} horas semanais` : null
}

function cleanInline(s: string): string {
  return flatten(s).replace(/[.;,\s]+$/, '').trim()
}

/** Ano de referência (para nome/slug do concurso). */
export function inferYear(normalized: string): number | null {
  const m = [...flatten(normalized).matchAll(/\b(20\d{2})\b/g)].map((x) => Number(x[1]))
  if (m.length === 0) return null
  // ano mais frequente entre os plausíveis (>= ano corrente - 1).
  const counts = new Map<number, number>()
  for (const y of m) counts.set(y, (counts.get(y) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
}

/** Extrai todos os metadados; registra os campos não encontrados. */
export function extractMetadata(normalized: string, adapter: BankAdapter, detected: boolean): ExtractedMeta {
  const board = detected ? adapter.label : findBoard(normalized)
  const meta: ExtractedMeta = {
    orgao: null,
    board,
    role: findRole(normalized),
    city: findCity(normalized),
    examDate: findExamDate(normalized),
    salary: findSalary(normalized),
    benefits: null,
    jornada: findJornada(normalized),
    missing: []
  }
  if (adapter.refineMetadata) {
    const ctx = { rawText: normalized, normalizedText: normalized, deaccentedUpper: '', year: inferYear(normalized) }
    Object.assign(meta, adapter.refineMetadata(meta, ctx))
  }
  for (const [k, v] of Object.entries(meta)) {
    if (k !== 'missing' && (v == null || v === '')) meta.missing.push(k)
  }
  return meta
}

/** Banca por rótulo textual quando nenhum adaptador foi detectado. */
function findBoard(normalized: string): string | null {
  const m = /Banca\s*(?:organizadora)?\s*:?\s*([^.;\n]{3,80})/i.exec(flatten(normalized))
  return m ? cleanInline(m[1]) : null
}
