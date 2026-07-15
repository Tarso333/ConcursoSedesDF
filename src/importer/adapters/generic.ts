// Adaptador GENÉRICO — heurísticas-base usadas quando nenhuma banca é
// reconhecida (e reaproveitadas pelas bancas específicas via spread).
import type { AdapterPatterns, BankAdapter } from './types'

// Termos que uma linha em caixa alta pode ter, mas que NÃO são disciplina:
// cabeçalhos de seção, rótulos de bloco/cargo e rodapés de paginação.
export const GENERIC_STOPWORD =
  /\b(PERFIL|ANEXO|M[OÓ]DULO|CARGO|EDITAL|CONCURSO|CONTE[UÚ]DO|PROGRAM[AÁ]TICO|CONHECIMENTOS?\s+(GERAIS|B[AÁ]SICOS|ESPEC[IÍ]FICOS|COMPLEMENTARES)|NIVEL|N[IÍ]VEL|ANALISTA|T[EÉ]CNICO|ESPECIALIDADE|REQUISITOS?|ATRIBUI[CÇ][OÕ]ES|P[AÁ]GINA|SUM[AÁ]RIO)\b/

export const GENERIC_PATTERNS: AdapterPatterns = {
  blockGeral:
    /CONHECIMENTOS\s+(GERAIS|B[AÁ]SICOS|COMPLEMENTARES)|M[OÓ]DULO\s+I\b/i,
  blockEspecifico: /CONHECIMENTOS\s+ESPEC[IÍ]FICOS|M[OÓ]DULO\s+II\b/i,
  headingStopword: GENERIC_STOPWORD
}

export const GENERIC_ADAPTER: BankAdapter = {
  id: 'generic',
  label: 'Genérico (heurístico)',
  matches: () => false, // nunca é auto-detectado; é o fallback do registry
  patterns: GENERIC_PATTERNS
}
