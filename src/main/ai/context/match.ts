// Resolução determinística de tópico a partir da pergunta (sem IA):
// tokens normalizados (sem acento, minúsculos) com sobreposição pontuada.
// Puro e testável.

export function normalizeTokens(text: string): string[] {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 3)
}

export interface TopicCandidate {
  topicId: number
  name: string
}

/**
 * Pontua candidatos pela sobreposição de tokens da pergunta com o nome do
 * tópico. Empate → nome mais específico (mais tokens casados / mais longo).
 */
export function matchTopic(question: string, candidates: TopicCandidate[]): TopicCandidate | null {
  const qTokens = new Set(normalizeTokens(question))
  if (qTokens.size === 0) return null
  let best: { c: TopicCandidate; score: number } | null = null
  for (const c of candidates) {
    const tTokens = normalizeTokens(c.name)
    if (tTokens.length === 0) continue
    let hit = 0
    for (const t of tTokens) if (qTokens.has(t)) hit++
    if (hit === 0) continue
    // score: proporção do NOME coberta (especificidade) + bônus por nº de hits
    const score = hit / tTokens.length + hit * 0.05
    if (!best || score > best.score) best = { c, score }
  }
  // exige que ao menos metade do nome do tópico esteja presente na pergunta
  // OU 2+ tokens casados (nomes longos de edital raramente aparecem inteiros).
  if (!best) return null
  const tTokens = normalizeTokens(best.c.name)
  let hits = 0
  for (const t of tTokens) if (qTokens.has(t)) hits++
  return hits >= 2 || hits / tTokens.length >= 0.5 ? best.c : null
}
