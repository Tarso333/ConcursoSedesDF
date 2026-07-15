// Adaptador AOCP.
// Formato de conteúdo programático numerado, semelhante às demais bancas.
// Herda o parser genérico.
import type { BankAdapter } from './types'
import { GENERIC_PATTERNS } from './generic'

export const AOCP_ADAPTER: BankAdapter = {
  id: 'aocp',
  label: 'AOCP',
  matches: (up) => /\bAOCP\b/.test(up),
  patterns: GENERIC_PATTERNS
}
