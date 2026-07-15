// Adaptador Quadrix — ex.: SEDES DF 2026.
// O Quadrix costuma listar disciplinas em caixa alta com tópicos numerados
// e itens separados por ponto. Herda o parser genérico.
import type { BankAdapter } from './types'
import { GENERIC_PATTERNS } from './generic'

export const QUADRIX_ADAPTER: BankAdapter = {
  id: 'quadrix',
  label: 'Instituto Quadrix',
  matches: (up) => /\bQUADRIX\b|INSTITUTO QUADRIX/.test(up),
  patterns: GENERIC_PATTERNS
}
