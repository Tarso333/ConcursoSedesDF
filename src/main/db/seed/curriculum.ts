// Currículo do edital SEDES DF 2026 (Quadrix) — cargo Técnico Administrativo.
// Derivado de PESQUISA.md. Estimativas de questões somam 20 (gerais) + 40 (específicos).
// As contagens são estimativas de peso para o planejador; refinar contra o PDF oficial.

export interface SeedDiscipline {
  slug: string
  name: string
  block: 'GERAL' | 'ESPECIFICO'
  weight: number
  examQuestionEstimate: number
  color: string
  topics: string[]
}

export const CURRICULUM: SeedDiscipline[] = [
  // ───────────────────────── Conhecimentos Gerais (peso 1, ~20q) ─────────────────────────
  {
    slug: 'lingua-portuguesa',
    name: 'Língua Portuguesa',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 6,
    color: '#3b82f6',
    topics: [
      'Compreensão e interpretação de textos',
      'Tipologia e gêneros textuais',
      'Ortografia oficial',
      'Acentuação gráfica',
      'Classes de palavras (morfologia)',
      'Sintaxe: concordância verbal e nominal',
      'Regência verbal e nominal; crase',
      'Pontuação',
      'Coesão e coerência textual',
      'Significação das palavras (semântica)'
    ]
  },
  {
    slug: 'conhecimentos-df',
    name: 'Conhecimentos do Distrito Federal',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 4,
    color: '#06b6d4',
    topics: [
      'História e formação de Brasília',
      'Aspectos geográficos do DF',
      'Aspectos sociais, políticos e econômicos do DF',
      'Regiões Administrativas',
      'RIDE — Região Integrada de Desenvolvimento'
    ]
  },
  {
    slug: 'politica-mulheres',
    name: 'Política para Mulheres',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 4,
    color: '#ec4899',
    topics: [
      'Lei Maria da Penha (Lei 11.340/2006)',
      'Formas de violência doméstica e familiar',
      'Medidas protetivas de urgência',
      'Lei do Feminicídio (Lei 13.104/2015)',
      'Rede de enfrentamento à violência contra a mulher',
      'Políticas públicas para mulheres'
    ]
  },
  {
    slug: 'legislacao',
    name: 'Legislação',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 3,
    color: '#8b5cf6',
    topics: [
      'Lei Orgânica do Distrito Federal',
      'Organização do Estado e dos Poderes (noções)',
      'Direitos e garantias fundamentais',
      'Ética no serviço público'
    ]
  },
  {
    slug: 'primeiros-socorros',
    name: 'Noções de Primeiros Socorros',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 3,
    color: '#ef4444',
    topics: [
      'Suporte básico de vida (SBV)',
      'Parada cardiorrespiratória e RCP',
      'OVACE (engasgo) e desobstrução de vias aéreas',
      'Hemorragias e ferimentos',
      'Queimaduras',
      'Fraturas e imobilização',
      'Desmaios, convulsões e estados de choque'
    ]
  },

  // ──────────────────── Conhecimentos Específicos (peso 2, ~40q) ────────────────────
  {
    slug: 'fundamentos-assistencia',
    name: 'Fundamentos da Assistência Social',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 4,
    color: '#10b981',
    topics: [
      'Política Nacional de Assistência Social (PNAS/2004)',
      'Princípios e diretrizes da assistência social',
      'Objetivos da assistência social',
      'Proteções afiançadas',
      'Proteção Social Básica e Proteção Social Especial',
      'Matricialidade sociofamiliar',
      'Territorialização e descentralização'
    ]
  },
  {
    slug: 'organizacao-suas',
    name: 'Organização da Assistência Social (SUAS)',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 4,
    color: '#14b8a6',
    topics: [
      'Sistema Único de Assistência Social (SUAS)',
      'CRAS — Centro de Referência de Assistência Social',
      'CREAS — Centro de Referência Especializado',
      'Seguranças socioassistenciais (acolhida, convívio, renda, autonomia)',
      'Níveis de proteção e complexidade',
      'Descentralização político-administrativa'
    ]
  },
  {
    slug: 'gestao-assistencia',
    name: 'Gestão da Assistência Social',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#22c55e',
    topics: [
      'Gestão do SUAS e níveis de gestão',
      'Financiamento (FNAS e pisos de proteção)',
      'Vigilância socioassistencial',
      'Controle social e conselhos de assistência social',
      'Planos e instâncias de pactuação (CIT/CIB)'
    ]
  },
  {
    slug: 'marcos-normativos',
    name: 'Marcos Normativos da Assistência Social',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 4,
    color: '#84cc16',
    topics: [
      'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)',
      'NOB-SUAS 2012',
      'NOB-RH/SUAS',
      'Tipificação Nacional de Serviços Socioassistenciais (Res. CNAS 109/2009)',
      'ECA, Estatuto do Idoso e LBI (transversais)'
    ]
  },
  {
    slug: 'programas-socioassistenciais',
    name: 'Programas Socioassistenciais',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#eab308',
    topics: [
      'Cadastro Único (CadÚnico)',
      'Programas de transferência de renda',
      'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)',
      'Programas e serviços do SUAS'
    ]
  },
  {
    slug: 'beneficios-socioassistenciais',
    name: 'Benefícios Socioassistenciais',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#f59e0b',
    topics: [
      'Benefício de Prestação Continuada (BPC/LOAS)',
      'Critérios de elegibilidade do BPC',
      'Benefícios eventuais',
      'Articulação com a rede socioassistencial'
    ]
  },
  {
    slug: 'instrumentos-df',
    name: 'Instrumentos Socioassistenciais do DF',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#f97316',
    topics: [
      'Programas próprios do DF (DF Social)',
      'Cartão Prato Cheio e Cartão Material Escolar',
      'Legislação distrital de assistência social',
      'Rede socioassistencial do DF'
    ]
  },
  {
    slug: 'direito-const-adm',
    name: 'Noções de Direito Constitucional e Administrativo',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 4,
    color: '#6366f1',
    topics: [
      'Princípios da Administração Pública (LIMPE)',
      'Atos administrativos',
      'Poderes administrativos',
      'Direitos e garantias fundamentais',
      'Administração direta e indireta'
    ]
  },
  {
    slug: 'regime-juridico-df',
    name: 'Regime Jurídico dos Servidores do DF',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#8b5cf6',
    topics: [
      'LC 840/2011 — disposições gerais',
      'Provimento, vacância e formas de ingresso',
      'Direitos e vantagens do servidor',
      'Deveres, proibições e responsabilidades',
      'Regime disciplinar e processo administrativo'
    ]
  },
  {
    slug: 'atendimento-rotinas',
    name: 'Atendimento ao Público e Rotinas Administrativas',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 2,
    color: '#0ea5e9',
    topics: [
      'Qualidade no atendimento ao público',
      'Trabalho em equipe e relações interpessoais',
      'Redação oficial e comunicações administrativas',
      'Rotinas de escritório'
    ]
  },
  {
    slug: 'arquivologia',
    name: 'Arquivologia e Gestão Documental',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 3,
    color: '#a855f7',
    topics: [
      'Protocolo: recebimento, registro, distribuição e tramitação',
      'Tipos de arquivo (corrente, intermediário, permanente)',
      'Métodos de arquivamento',
      'Tabela de temporalidade e ciclo de vida documental',
      'Preservação e digitalização de documentos'
    ]
  },
  {
    slug: 'materiais-patrimonio',
    name: 'Administração de Materiais e Patrimônio',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 2,
    color: '#d946ef',
    topics: [
      'Classificação de materiais',
      'Gestão de estoques e armazenagem',
      'Gestão patrimonial: tombamento, inventário e baixa de bens'
    ]
  },
  {
    slug: 'licitacoes',
    name: 'Compras Públicas e Licitações (Lei 14.133/2021)',
    block: 'ESPECIFICO',
    weight: 2,
    examQuestionEstimate: 2,
    color: '#f43f5e',
    topics: [
      'Princípios e objetivos da Lei 14.133/2021',
      'Modalidades de licitação',
      'Etapas do processo licitatório',
      'Contratação direta (dispensa e inexigibilidade)'
    ]
  }
]
