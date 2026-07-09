// Grafo de aprendizagem do SEDES DF 2026 — relações autoradas (dados).
// Nenhuma engine conhece este arquivo; ele apenas alimenta topic_relations.
// No futuro, o importador de edital gravará estas mesmas relações.
import type { SeedRelation } from './types'

const t = (disciplineSlug: string, topic: string): { disciplineSlug: string; topic: string } => ({
  disciplineSlug,
  topic
})

export const SEDES_RELATIONS: SeedRelation[] = [
  // ── Trilha da Assistência Social (o coração dos específicos) ──
  {
    from: t('marcos-normativos', 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)'),
    to: t('fundamentos-assistencia', 'Política Nacional de Assistência Social (PNAS/2004)'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'A PNAS materializa a LOAS — entenda a lei antes da política.'
  },
  {
    from: t('fundamentos-assistencia', 'Política Nacional de Assistência Social (PNAS/2004)'),
    to: t('organizacao-suas', 'Sistema Único de Assistência Social (SUAS)'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'O SUAS operacionaliza a PNAS.'
  },
  {
    from: t('fundamentos-assistencia', 'Política Nacional de Assistência Social (PNAS/2004)'),
    to: t('fundamentos-assistencia', 'Proteção Social Básica e Proteção Social Especial'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('fundamentos-assistencia', 'Proteção Social Básica e Proteção Social Especial'),
    to: t('organizacao-suas', 'CRAS — Centro de Referência de Assistência Social'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Os níveis de proteção explicam o papel do CRAS.'
  },
  {
    from: t('fundamentos-assistencia', 'Proteção Social Básica e Proteção Social Especial'),
    to: t('organizacao-suas', 'CREAS — Centro de Referência Especializado'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('organizacao-suas', 'CRAS — Centro de Referência de Assistência Social'),
    to: t('organizacao-suas', 'CREAS — Centro de Referência Especializado'),
    kind: 'ESTUDADO_JUNTO',
    strength: 1,
    note: 'A banca cobra a distinção CRAS × CREAS.'
  },
  {
    from: t('marcos-normativos', 'NOB-SUAS 2012'),
    to: t('organizacao-suas', 'Sistema Único de Assistência Social (SUAS)'),
    kind: 'COMPLEMENTA',
    strength: 0.75
  },
  {
    from: t('marcos-normativos', 'Tipificação Nacional de Serviços Socioassistenciais (Res. CNAS 109/2009)'),
    to: t('organizacao-suas', 'Níveis de proteção e complexidade'),
    kind: 'COMPLEMENTA',
    strength: 0.75
  },
  {
    from: t('organizacao-suas', 'Sistema Único de Assistência Social (SUAS)'),
    to: t('gestao-assistencia', 'Gestão do SUAS e níveis de gestão'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('marcos-normativos', 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)'),
    to: t('beneficios-socioassistenciais', 'Benefício de Prestação Continuada (BPC/LOAS)'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'O BPC nasce no art. 20 da LOAS.'
  },
  {
    from: t('beneficios-socioassistenciais', 'Benefício de Prestação Continuada (BPC/LOAS)'),
    to: t('beneficios-socioassistenciais', 'Critérios de elegibilidade do BPC'),
    kind: 'CONTINUIDADE',
    strength: 1
  },
  {
    from: t('beneficios-socioassistenciais', 'Benefícios eventuais'),
    to: t('beneficios-socioassistenciais', 'Benefício de Prestação Continuada (BPC/LOAS)'),
    kind: 'SEMELHANTE',
    strength: 0.5,
    note: 'Contraste clássico de prova: eventual × continuado.'
  },
  {
    from: t('programas-socioassistenciais', 'Cadastro Único (CadÚnico)'),
    to: t('programas-socioassistenciais', 'Programas de transferência de renda'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'O CadÚnico é a porta de entrada dos programas.'
  },
  {
    from: t('instrumentos-df', 'Programas próprios do DF (DF Social)'),
    to: t('programas-socioassistenciais', 'Programas de transferência de renda'),
    kind: 'DEPENDE_DE',
    strength: 0.5,
    note: 'Entenda o modelo nacional antes dos programas distritais.'
  },

  // ── Política para Mulheres ──
  {
    from: t('politica-mulheres', 'Formas de violência doméstica e familiar'),
    to: t('politica-mulheres', 'Medidas protetivas de urgência'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('politica-mulheres', 'Lei Maria da Penha (Lei 11.340/2006)'),
    to: t('politica-mulheres', 'Formas de violência doméstica e familiar'),
    kind: 'CONTINUIDADE',
    strength: 1
  },
  {
    from: t('politica-mulheres', 'Lei Maria da Penha (Lei 11.340/2006)'),
    to: t('politica-mulheres', 'Lei do Feminicídio (Lei 13.104/2015)'),
    kind: 'RELACIONADO',
    strength: 0.5
  },

  // ── Direito administrativo → licitações (trilha transversal) ──
  {
    from: t('direito-const-adm', 'Princípios da Administração Pública (LIMPE)'),
    to: t('direito-const-adm', 'Atos administrativos'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('direito-const-adm', 'Princípios da Administração Pública (LIMPE)'),
    to: t('licitacoes', 'Princípios e objetivos da Lei 14.133/2021'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Os princípios gerais fundamentam a lei de licitações.'
  },
  {
    from: t('licitacoes', 'Princípios e objetivos da Lei 14.133/2021'),
    to: t('licitacoes', 'Modalidades de licitação'),
    kind: 'CONTINUIDADE',
    strength: 1
  },
  {
    from: t('licitacoes', 'Modalidades de licitação'),
    to: t('licitacoes', 'Etapas do processo licitatório'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('licitacoes', 'Etapas do processo licitatório'),
    to: t('licitacoes', 'Contratação direta (dispensa e inexigibilidade)'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },

  // ── Regime jurídico ──
  {
    from: t('regime-juridico-df', 'LC 840/2011 — disposições gerais'),
    to: t('regime-juridico-df', 'Provimento, vacância e formas de ingresso'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('regime-juridico-df', 'Provimento, vacância e formas de ingresso'),
    to: t('regime-juridico-df', 'Deveres, proibições e responsabilidades'),
    kind: 'CONTINUIDADE',
    strength: 0.5
  },

  // ── Arquivologia ──
  {
    from: t('arquivologia', 'Tipos de arquivo (corrente, intermediário, permanente)'),
    to: t('arquivologia', 'Tabela de temporalidade e ciclo de vida documental'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'As três idades explicam a temporalidade.'
  },
  {
    from: t('arquivologia', 'Protocolo: recebimento, registro, distribuição e tramitação'),
    to: t('arquivologia', 'Métodos de arquivamento'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.5
  },

  // ── Língua Portuguesa ──
  {
    from: t('lingua-portuguesa', 'Classes de palavras (morfologia)'),
    to: t('lingua-portuguesa', 'Sintaxe: concordância verbal e nominal'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('lingua-portuguesa', 'Sintaxe: concordância verbal e nominal'),
    to: t('lingua-portuguesa', 'Regência verbal e nominal; crase'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('lingua-portuguesa', 'Compreensão e interpretação de textos'),
    to: t('lingua-portuguesa', 'Coesão e coerência textual'),
    kind: 'RELACIONADO',
    strength: 0.5
  },

  // ── Primeiros Socorros ──
  {
    from: t('primeiros-socorros', 'Suporte básico de vida (SBV)'),
    to: t('primeiros-socorros', 'Parada cardiorrespiratória e RCP'),
    kind: 'PRE_REQUISITO',
    strength: 1
  },
  {
    from: t('primeiros-socorros', 'Parada cardiorrespiratória e RCP'),
    to: t('primeiros-socorros', 'OVACE (engasgo) e desobstrução de vias aéreas'),
    kind: 'REVISAO_RECOMENDADA',
    strength: 0.5,
    note: 'Manobras que a banca cobra em conjunto.'
  }
]
