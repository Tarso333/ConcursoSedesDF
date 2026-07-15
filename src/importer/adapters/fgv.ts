// Adaptador FGV (Fundação Getulio Vargas) — ex.: DATAPREV 2026.
// A FGV usa conteúdo programático numerado ("1 ... 2 ... 7.1 ...") com
// disciplinas em caixa alta seguidas de ":". Herda o parser genérico.
import type { BankAdapter } from './types'
import { GENERIC_PATTERNS } from './generic'

export const FGV_ADAPTER: BankAdapter = {
  id: 'fgv',
  label: 'FGV — Fundação Getulio Vargas',
  matches: (up) => /\bFGV\b|FUNDACAO GETULIO VARGAS/.test(up),
  patterns: GENERIC_PATTERNS,
  refineExam: (exam) => {
    // A FGV frequentemente organiza a prova em Módulo I (CG) e Módulo II (CE).
    // Se a extração já achou blocos, mantém; senão deixa o fallback agir.
    return exam
  }
}
