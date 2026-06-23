// Questões-semente (seed). Foco em itens de correção segura (lei seca / fatos).
// Ampliar depois com provas Quadrix anteriores (ver TODO em PESQUISA.md).

export interface SeedOption {
  text: string
  correct?: boolean
}

export interface SeedQuestion {
  disciplineSlug: string
  topic?: string
  type: 'ME' | 'CE'
  difficulty: 'FACIL' | 'MEDIO' | 'DIFICIL'
  statement: string
  options: SeedOption[]
  explanation: string
  source?: string
  year?: number
}

export const SEED_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Segundo a Lei nº 11.340/2006 (Lei Maria da Penha), constituem formas de violência doméstica e familiar contra a mulher, EXCETO:',
    options: [
      { text: 'Violência física' },
      { text: 'Violência psicológica' },
      { text: 'Violência sexual' },
      { text: 'Violência patrimonial' },
      { text: 'Violência ambiental', correct: true }
    ],
    explanation:
      'O art. 7º da Lei Maria da Penha enumera cinco formas: física, psicológica, sexual, patrimonial e moral. "Violência ambiental" não está prevista.'
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Conforme a Lei Maria da Penha, as medidas protetivas de urgência poderão ser concedidas pelo juiz a requerimento do Ministério Público ou a pedido da ofendida.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O art. 19 prevê que as medidas protetivas de urgência poderão ser concedidas a requerimento do MP ou a pedido da ofendida.'
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefício de Prestação Continuada (BPC/LOAS)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O Benefício de Prestação Continuada (BPC) garante um salário mínimo mensal à pessoa com deficiência e à pessoa idosa com idade de:',
    options: [
      { text: '60 anos ou mais' },
      { text: '62 anos ou mais' },
      { text: '65 anos ou mais', correct: true },
      { text: '67 anos ou mais' },
      { text: '70 anos ou mais' }
    ],
    explanation:
      'O art. 20 da LOAS (Lei 8.742/1993) assegura o BPC à pessoa idosa com 65 anos ou mais e à pessoa com deficiência que comprovem não ter meios de prover a própria manutenção nem de tê-la provida por sua família.'
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'A Lei Orgânica da Assistência Social (LOAS), que dispõe sobre a organização da assistência social, é a Lei nº:',
    options: [
      { text: '8.069/1990' },
      { text: '8.742/1993', correct: true },
      { text: '8.080/1990' },
      { text: '10.741/2003' },
      { text: '13.146/2015' }
    ],
    explanation:
      'A LOAS é a Lei nº 8.742/1993. As demais: 8.069/90 (ECA), 8.080/90 (SUS), 10.741/03 (Estatuto do Idoso) e 13.146/15 (LBI).'
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Proteção Social Básica e Proteção Social Especial',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Na Política Nacional de Assistência Social, a proteção de caráter preventivo, voltada a famílias em situação de vulnerabilidade e ofertada principalmente pelo CRAS, é a:',
    options: [
      { text: 'Proteção Social Básica', correct: true },
      { text: 'Proteção Social Especial de média complexidade' },
      { text: 'Proteção Social Especial de alta complexidade' },
      { text: 'Proteção contributiva' },
      { text: 'Proteção previdenciária' }
    ],
    explanation:
      'A Proteção Social Básica tem caráter preventivo e é ofertada essencialmente pelo CRAS, atuando sobre vulnerabilidades antes da violação de direitos.'
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CREAS — Centro de Referência Especializado',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'A unidade pública estatal responsável pela oferta de serviços da Proteção Social Especial de média complexidade, a famílias e indivíduos com direitos violados, é o:',
    options: [
      { text: 'CRAS' },
      { text: 'CREAS', correct: true },
      { text: 'Conselho Tutelar' },
      { text: 'CadÚnico' },
      { text: 'CMAS' }
    ],
    explanation:
      'O CREAS oferta serviços da Proteção Social Especial de média complexidade (ex.: PAEFI). O CRAS atua na Proteção Social Básica.'
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'Seguranças socioassistenciais (acolhida, convívio, renda, autonomia)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'No SUAS, são seguranças socioassistenciais a acolhida, o convívio ou vivência familiar e comunitária, e a sobrevivência (renda e autonomia).',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. As seguranças afiançadas pelo SUAS incluem acolhida, convívio/vivência familiar e comunitária e sobrevivência (renda e autonomia).'
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Parada cardiorrespiratória e RCP',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Na reanimação cardiopulmonar (RCP) de um adulto realizada por socorrista, a relação recomendada entre compressões torácicas e ventilações é de:',
    options: [
      { text: '15 compressões para 2 ventilações' },
      { text: '30 compressões para 2 ventilações', correct: true },
      { text: '5 compressões para 1 ventilação' },
      { text: '15 compressões para 1 ventilação' },
      { text: '30 compressões para 1 ventilação' }
    ],
    explanation:
      'As diretrizes de SBV recomendam o ciclo de 30 compressões para 2 ventilações no adulto, com compressões de 5–6 cm e frequência de 100–120/min.'
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'OVACE (engasgo) e desobstrução de vias aéreas',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'A manobra indicada para desobstrução de vias aéreas por corpo estranho (engasgo/OVACE) em adulto consciente é a manobra de:',
    options: [
      { text: 'Heimlich', correct: true },
      { text: 'Rautek' },
      { text: 'Valsalva' },
      { text: 'Trendelenburg' },
      { text: 'Sellick' }
    ],
    explanation:
      'A manobra de Heimlich (compressões abdominais) é indicada para OVACE em adulto consciente. Rautek é de retirada de vítima; as demais não se aplicam.'
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Modalidades de licitação',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Assinale a alternativa que NÃO corresponde a uma modalidade de licitação prevista na Lei nº 14.133/2021:',
    options: [
      { text: 'Pregão' },
      { text: 'Concorrência' },
      { text: 'Tomada de preços', correct: true },
      { text: 'Leilão' },
      { text: 'Diálogo competitivo' }
    ],
    explanation:
      'A Lei 14.133/2021 prevê: pregão, concorrência, concurso, leilão e diálogo competitivo. As modalidades "tomada de preços" e "convite" foram extintas.'
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Modalidades de licitação',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'A modalidade de licitação introduzida pela Lei nº 14.133/2021, destinada à contratação de objetos que envolvam inovação técnica ou tecnológica, é o(a):',
    options: [
      { text: 'Diálogo competitivo', correct: true },
      { text: 'Pregão eletrônico' },
      { text: 'Concorrência' },
      { text: 'Leilão' },
      { text: 'Concurso' }
    ],
    explanation:
      'O diálogo competitivo é a modalidade inovadora da nova lei, voltada a objetos complexos em que a Administração dialoga com licitantes para desenvolver soluções.'
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Princípios da Administração Pública (LIMPE)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Os princípios expressos da Administração Pública no art. 37 da Constituição Federal (mnemônico LIMPE) são legalidade, impessoalidade, moralidade, publicidade e:',
    options: [
      { text: 'Eficiência', correct: true },
      { text: 'Economicidade' },
      { text: 'Efetividade' },
      { text: 'Razoabilidade' },
      { text: 'Supremacia do interesse público' }
    ],
    explanation:
      'O art. 37, caput, da CF lista Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (LIMPE). A eficiência foi incluída pela EC 19/1998.'
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Tipos de arquivo (corrente, intermediário, permanente)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Os documentos em curso ou consultados com frequência, que tramitam e ainda são de uso corrente do setor, pertencem ao arquivo:',
    options: [
      { text: 'Corrente', correct: true },
      { text: 'Intermediário' },
      { text: 'Permanente' },
      { text: 'Histórico' },
      { text: 'Especial' }
    ],
    explanation:
      'No ciclo de vida documental (teoria das três idades): arquivo corrente (uso frequente), intermediário (aguarda destinação) e permanente (valor histórico/probatório).'
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Brasília, capital federal, foi inaugurada em 21 de abril de:',
    options: [
      { text: '1956' },
      { text: '1958' },
      { text: '1960', correct: true },
      { text: '1961' },
      { text: '1964' }
    ],
    explanation:
      'Brasília foi inaugurada em 21 de abril de 1960, no governo de Juscelino Kubitschek. A construção começou em 1956.'
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Classes de palavras (morfologia)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Na frase "Os candidatos estudaram bastante para a prova", a palavra "bastante" funciona como advérbio de intensidade e, por isso, é invariável.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Como advérbio (modifica o verbo "estudaram"), "bastante" é invariável. Seria variável apenas se fosse pronome/adjetivo qualificando substantivo ("bastantes candidatos").'
  }
]
