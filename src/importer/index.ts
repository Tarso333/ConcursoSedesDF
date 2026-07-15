// Universal Contest Import Engine — API pública.
//
// Módulo INDEPENDENTE: transforma um edital (PDF ou texto) em um ContestSeed
// determinístico, compatível com todas as engines (Multi Contest, Knowledge,
// Relationship, Learning Analytics, Strategy) — sem alterá-las e sem IA.
//
// O domínio NÃO importa este módulo; as engines apenas consomem o ContestSeed
// produzido. Ver docs/IMPORTER.md e o ADR-015 em DECISIONS.md.
export { importContestFromPdf, importContestFromText } from './pipeline'
export { extractPdfText } from './pdf'
export { emitSeedModule, summarize } from './emit'
export { registerAdapter, listAdapters, detectAdapter, resolveAdapter } from './adapters/registry'
export type { BankAdapter, AdapterContext, AdapterPatterns } from './adapters/types'
export type {
  ImportOptions,
  ImportResult,
  ImportReport,
  CoverageReport,
  Inconsistency,
  ExtractedMeta
} from './types'
