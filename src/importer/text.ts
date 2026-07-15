// Utilitários de texto do Universal Contest Import Engine.
// Puros e determinísticos (sem IA): normalização, slug, título e limpeza.

/** Slug idêntico ao usado pelo seed (para produzir dados compatíveis). */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

/** Remove acentos preservando as letras-base (para comparações robustas). */
export function deaccent(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** Colapsa espaços/quebras redundantes, preservando as quebras de linha. */
export function normalizeWhitespace(s: string): string {
  return s
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Junta palavras quebradas por hífen no fim de linha (comum em PDF). */
export function dehyphenate(s: string): string {
  return s.replace(/(\p{L})-\n(\p{L})/gu, '$1$2')
}

/** Colapsa TODA a pontuação de espaçamento a um espaço simples. */
export function flatten(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

const LOWER_WORDS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'a', 'o', 'as', 'os',
  'à', 'para', 'com', 'no', 'na', 'nos', 'nas', 'ou', 'por'
])

// Siglas comuns em conteúdos de TI/edital que devem permanecer em caixa alta.
const ACRONYMS = new Set([
  'ti', 'tic', 'sql', 'uml', 'html', 'html5', 'css', 'css3', 'api', 'apis',
  'rest', 'json', 'xml', 'tcp', 'ip', 'osi', 'ieee', 'ejb', 'jpa', 'jms',
  'iaas', 'paas', 'saas', 'iac', 'df', 'rh', 'lgpd', 'coso', 'itil', 'devops',
  'devsecops', 'grasp', 'solid', 'tdd', 'bdd', 'orm', 'ci', 'cd'
])

/** Converte um cabeçalho em caixa alta para Título legível, preservando siglas. */
export function titleCase(s: string): string {
  const words = flatten(s.toLowerCase()).split(' ')
  return words
    .map((w, i) => {
      const bare = w.replace(/[^\p{L}\p{N}]/gu, '')
      if (ACRONYMS.has(bare)) return w.toUpperCase()
      if (i > 0 && LOWER_WORDS.has(w)) return w
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')
}

/** Proporção de letras maiúsculas entre as letras da string (0..1). */
export function upperRatio(s: string): number {
  const letters = s.replace(/[^\p{L}]/gu, '')
  if (letters.length === 0) return 0
  const upper = s.replace(/[^\p{Lu}]/gu, '')
  return upper.length / letters.length
}

/** Limpa o texto de um tópico: bordas, pontuação final e ruído de paginação. */
export function cleanTopicText(s: string): string {
  return flatten(s)
    .replace(/^[:.\-–—\s]+/, '')
    .replace(/[.;,\s]+$/, '')
    .trim()
}
