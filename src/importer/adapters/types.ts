// Contrato de adaptador por banca. O pipeline consome adaptadores; os
// adaptadores NUNCA importam o pipeline (evita ciclo). Adicionar uma banca =
// novo arquivo + registro, sem tocar no pipeline principal (Open/Closed).
import type { ExamConfig } from '@shared/domain'
import type { SeedDiscipline } from '@main/db/seed/curriculum'
import type { ExtractedMeta } from '../types'

/** Contexto imutável passado às heurísticas (foto do texto do edital). */
export interface AdapterContext {
  /** Texto bruto extraído do PDF. */
  rawText: string
  /** Texto com espaçamento normalizado (quebras preservadas). */
  normalizedText: string
  /** Texto sem acento, em caixa alta (para detecção robusta). */
  deaccentedUpper: string
  /** Ano de referência inferido (para nome/slug), se houver. */
  year: number | null
}

/** Padrões (regex) que parametrizam as etapas genéricas do pipeline. */
export interface AdapterPatterns {
  /** Linha que rotula o início do bloco de Conhecimentos Gerais/Básicos. */
  blockGeral: RegExp
  /** Linha que rotula o início do bloco de Conhecimentos Específicos. */
  blockEspecifico: RegExp
  /** Termos que uma linha-cabeçalho NÃO pode conter (seções, rodapés). */
  headingStopword: RegExp
}

/**
 * Adaptador de banca. Fornece assinatura (detecção), padrões e — opcionalmente
 * — refinamentos pós-parse. Todos os hooks são chamados PELO pipeline.
 */
export interface BankAdapter {
  id: string // 'fgv', 'fcc', 'quadrix', 'cebraspe', 'aocp', 'generic'
  label: string
  /** Reconhece o edital pela banca (recebe texto sem acento, caixa alta). */
  matches(deaccentedUpper: string): boolean
  patterns: AdapterPatterns
  /** Ajusta os metadados extraídos (ex.: formato de data/salário da banca). */
  refineMetadata?(meta: ExtractedMeta, ctx: AdapterContext): ExtractedMeta
  /** Ajusta/define a estrutura da prova (ex.: pesos típicos da banca). */
  refineExam?(exam: ExamConfig | null, ctx: AdapterContext): ExamConfig | null
  /** Ajusta o currículo (ex.: aninhamento específico da banca). */
  refineCurriculum?(disciplines: SeedDiscipline[], ctx: AdapterContext): SeedDiscipline[]
}
