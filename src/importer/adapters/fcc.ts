// Adaptador FCC (Fundação Carlos Chagas) — ex.: ABGF 2026.
// A FCC (Anexo IV) usa disciplinas em caixa alta e tópicos numerados; a
// habilitação por nota padronizada é decisão de modelagem do seed, não do
// parser. Herda o parser genérico.
import type { BankAdapter } from './types'
import { GENERIC_PATTERNS } from './generic'

export const FCC_ADAPTER: BankAdapter = {
  id: 'fcc',
  label: 'FCC — Fundação Carlos Chagas',
  matches: (up) => /\bFCC\b|FUNDACAO CARLOS CHAGAS/.test(up),
  patterns: GENERIC_PATTERNS
}
