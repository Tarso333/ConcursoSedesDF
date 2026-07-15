// Adaptador Cebraspe / CESPE (Centro de Seleção — UnB).
// O Cebraspe usa numeração hierárquica densa ("1 X. 1.1 Y. 1.2 Z.") e provas
// de itens Certo/Errado. A numeração hierárquica é justamente o que o parser
// genérico já resolve (tópicos "N" + subtópicos "N.M"). Herda o genérico.
import type { BankAdapter } from './types'
import { GENERIC_PATTERNS } from './generic'

export const CEBRASPE_ADAPTER: BankAdapter = {
  id: 'cebraspe',
  label: 'Cebraspe / CESPE',
  matches: (up) => /\bCEBRASPE\b|\bCESPE\b|CENTRO DE SELECAO/.test(up),
  patterns: GENERIC_PATTERNS
}
