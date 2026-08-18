// M29 — Banco de questões estilo FCC (Conhecimentos Gerais, peso 1).
// APENAS DADOS; idempotente por seed_key. Comentário alternativa por
// alternativa. Cobre as disciplinas de CG, com ênfase nas que estavam com
// baixa cobertura (LP, Inglês, Direito, Sustentabilidade, Análise de Dados).
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

const LP = 'lingua-portuguesa'
const ING = 'lingua-inglesa'
const RLM = 'raciocinio-logico'
const DIR = 'direito-const-adm'
const ETICA = 'etica-governanca-compliance'
const PROT = 'protecao-dados-seguranca'
const ECO = 'economia-financas-garantias'
const SUST = 'sustentabilidade-asg'
const NAD = 'nocoes-analise-dados'

export const ABGF_BANK_GERAIS: SeedQuestion[] = [
  // ───────────────────── Língua Portuguesa ─────────────────────
  {
    disciplineSlug: LP, topic: 'Significação das palavras: sinonímia, antonímia, polissemia, denotação e conotação', type: 'ME', difficulty: 'FACIL',
    statement: 'Na frase "O diretor abriu o coração na reunião", a expressão destacada foi empregada em sentido:',
    options: [
      { text: 'denotativo, indicando cirurgia.' },
      { text: 'conotativo, significando falar com sinceridade.', correct: true },
      { text: 'literal, referindo-se ao órgão.' },
      { text: 'técnico, próprio da medicina.' },
      { text: 'onomatopaico.' }
    ],
    explanation:
      'A)/C)/D) ERRADAS — não há sentido literal/técnico: ninguém foi operado. B) CORRETA — "abrir o coração" é linguagem CONOTATIVA (figurada): falar com sinceridade. E) ERRADA — onomatopeia é a reprodução de sons (ex.: "tic-tac"), o que não ocorre aqui.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Concordância verbal e nominal', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão.',
    options: [
      { text: 'Fazem dois anos que ele trabalha na ABGF.' },
      { text: 'Faz dois anos que ele trabalha na ABGF.', correct: true },
      { text: 'Houveram muitos problemas na auditoria.' },
      { text: 'Deve existir falhas no processo.' },
      { text: 'Aluga-se casas na região.' }
    ],
    explanation:
      'A) ERRADA — o verbo "fazer" indicando tempo decorrido é IMPESSOAL: fica no singular ("Faz dois anos"). B) CORRETA — "Faz dois anos" segue a impessoalidade do verbo fazer indicando tempo. C) ERRADA — "haver" no sentido de existir é impessoal: "Houve muitos problemas". D) ERRADA — o auxiliar concorda: "Devem existir falhas". E) ERRADA — na voz passiva sintética o verbo concorda com o sujeito: "Alugam-se casas".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Morfossintaxe', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em "Precisamos de servidores que sejam dedicados", a oração destacada classifica-se como subordinada adjetiva:',
    options: [
      { text: 'restritiva.', correct: true },
      { text: 'explicativa.' },
      { text: 'substantiva objetiva direta.' },
      { text: 'adverbial causal.' },
      { text: 'coordenada assindética.' }
    ],
    explanation:
      'A) CORRETA — "que sejam dedicados" restringe/especifica quais servidores, sem vírgula: adjetiva RESTRITIVA. B) ERRADA — a explicativa viria entre vírgulas e generalizaria. C) ERRADA — não exerce função de substantivo (objeto), mas de adjetivo (qualifica "servidores"). D) ERRADA — não exprime circunstância adverbial de causa. E) ERRADA — é subordinada, introduzida por pronome relativo, não coordenada.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Reescrita de frases e parágrafos: substituição, reorganização e equivalência de estruturas', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Assinale a reescrita que preserva o sentido de "Embora estivesse cansado, concluiu o relatório".',
    options: [
      { text: 'Porque estava cansado, concluiu o relatório.' },
      { text: 'Estava cansado, mas concluiu o relatório.', correct: true },
      { text: 'Se estivesse cansado, concluiria o relatório.' },
      { text: 'Estava tão cansado que concluiu o relatório.' },
      { text: 'Concluiu o relatório para ficar cansado.' }
    ],
    explanation:
      'A) ERRADA — "porque" indica causa, mudando o sentido concessivo. B) CORRETA — "mas" (adversativa) preserva a concessão de "embora": a oposição entre cansaço e a conclusão. C) ERRADA — "se" introduz condição hipotética, não concessão. D) ERRADA — "tão...que" indica consequência, não concessão. E) ERRADA — "para" indica finalidade, alterando totalmente o sentido.',
    source: S
  },

  // ───────────────────── Língua Inglesa ─────────────────────
  {
    disciplineSlug: ING, topic: 'Vocabulário técnico-financeiro em inglês', type: 'ME', difficulty: 'FACIL',
    statement: 'In a financial report, the term "liability" is best translated into Portuguese as:',
    options: [
      { text: 'ativo.' },
      { text: 'passivo (obrigação/dívida).', correct: true },
      { text: 'lucro.' },
      { text: 'receita.' },
      { text: 'patrimônio.' }
    ],
    explanation:
      'A) ERRADA — "ativo" é "asset". B) CORRETA — "liability" designa uma obrigação/dívida: passivo. C) ERRADA — "lucro" é "profit". D) ERRADA — "receita" é "revenue". E) ERRADA — "patrimônio (líquido)" é "equity".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Itens gramaticais relevantes à compreensão de texto', type: 'ME', difficulty: 'MEDIO',
    statement: 'Choose the option that correctly completes the sentence in the passive voice: "The new guarantee policy ___ by the board last month."',
    options: [
      { text: 'approves' },
      { text: 'was approved', correct: true },
      { text: 'has approving' },
      { text: 'approving' },
      { text: 'is approve' }
    ],
    explanation:
      'A) ERRADA — "approves" está na voz ativa, presente. B) CORRETA — a voz passiva no passado usa "was/were + particípio": "was approved". C)/D)/E) ERRADAS — não formam a estrutura passiva correta (verbo to be + past participle); "has approving" e "is approve" são agramaticais.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Estratégias de leitura: informações específicas, inferência e predição, organização semântica e discursiva', type: 'ME', difficulty: 'MEDIO',
    statement: 'The reading strategy of looking quickly through a text to find a specific piece of information (e.g., a date or a number) is known as:',
    options: [
      { text: 'skimming.' },
      { text: 'scanning.', correct: true },
      { text: 'brainstorming.' },
      { text: 'paraphrasing.' },
      { text: 'proofreading.' }
    ],
    explanation:
      'A) ERRADA — "skimming" é a leitura rápida para captar a ideia GERAL do texto. B) CORRETA — "scanning" é buscar informação ESPECÍFICA (dados, nomes, números). C) ERRADA — "brainstorming" é geração de ideias, não estratégia de leitura. D) ERRADA — "paraphrasing" é reescrever com outras palavras. E) ERRADA — "proofreading" é revisão de erros.',
    source: S
  },

  // ───────────────────── Raciocínio Lógico ─────────────────────
  {
    disciplineSlug: RLM, topic: 'Lógica sentencial (proposicional)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A negação lógica da proposição "Todo servidor é eficiente" é:',
    options: [
      { text: 'Nenhum servidor é eficiente.' },
      { text: 'Algum servidor não é eficiente.', correct: true },
      { text: 'Todo servidor é ineficiente.' },
      { text: 'Nenhum servidor é ineficiente.' },
      { text: 'Todo servidor é eficiente e dedicado.' }
    ],
    explanation:
      'A) ERRADA — "nenhum" é o contrário extremo, não a negação lógica. B) CORRETA — a negação de "todo A é B" é "existe (algum) A que não é B". C) ERRADA — "todo é ineficiente" também é afirmação universal, não a negação de existência. D) ERRADA — reforça a afirmação, não a nega. E) ERRADA — acrescenta informação, não nega.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Lógica sentencial (proposicional)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Pela equivalência lógica, a proposição "Se chove, então a rua molha" é equivalente a:',
    options: [
      { text: 'Se a rua molha, então chove.' },
      { text: 'Se a rua não molha, então não chove.', correct: true },
      { text: 'Chove e a rua não molha.' },
      { text: 'Se não chove, então a rua não molha.' },
      { text: 'A rua molha, logo chove.' }
    ],
    explanation:
      'A) ERRADA — é a recíproca (inverte antecedente e consequente), não equivalente. B) CORRETA — é a CONTRAPOSITIVA: "~q → ~p" é logicamente equivalente a "p → q". C) ERRADA — é a NEGAÇÃO da condicional (p ∧ ~q). D) ERRADA — é a inversa (~p → ~q), não equivalente. E) ERRADA — afirma o consequente, falácia.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas', type: 'ME', difficulty: 'FACIL',
    statement: 'Um produto que custava R$ 200,00 teve aumento de 15%. O novo preço é:',
    options: [
      { text: 'R$ 215,00.' },
      { text: 'R$ 230,00.', correct: true },
      { text: 'R$ 300,00.' },
      { text: 'R$ 260,00.' },
      { text: 'R$ 240,00.' }
    ],
    explanation:
      'A) ERRADA — R$ 215,00 corresponderia a um aumento de apenas R$ 15 (7,5%). B) CORRETA — 15% de 200 = 30; 200 + 30 = R$ 230,00. C)/D)/E) ERRADAS — correspondem a percentuais diferentes (50%, 30% e 20%, respectivamente).',
    source: S
  },

  // ───────────────────── Direito Constitucional e Administrativo ─────────────────────
  {
    disciplineSlug: DIR, topic: 'Regime jurídico-administrativo: princípios expressos e implícitos da Administração Pública', type: 'ME', difficulty: 'FACIL',
    statement: 'Os princípios expressos da Administração Pública, previstos no caput do art. 37 da CF/1988, são:',
    options: [
      { text: 'legalidade, impessoalidade, moralidade, publicidade e eficiência.', correct: true },
      { text: 'legalidade, isonomia, proporcionalidade, economicidade e celeridade.' },
      { text: 'supremacia, indisponibilidade, autotutela, motivação e razoabilidade.' },
      { text: 'legalidade, moralidade, ampla defesa, contraditório e devido processo.' },
      { text: 'eficiência, transparência, segurança jurídica, boa-fé e finalidade.' }
    ],
    explanation:
      'A) CORRETA — o mnemônico "LIMPE" (Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência) reúne os princípios EXPRESSOS do art. 37. B)/C)/E) ERRADAS — citam princípios IMPLÍCITOS ou de outras searas, não os expressos do caput. D) ERRADA — mistura princípios do processo (ampla defesa, contraditório) com os administrativos expressos.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista', type: 'ME', difficulty: 'MEDIO',
    statement: 'A Lei nº 13.303/2016 (Lei das Estatais), aplicável à ABGF, dispõe que o regime de pessoal das empresas públicas e sociedades de economia mista é:',
    options: [
      { text: 'estatutário, regido pela Lei nº 8.112/1990.' },
      { text: 'celetista, regido pela CLT, com ingresso por concurso público.', correct: true },
      { text: 'livre nomeação e exoneração, sem concurso.' },
      { text: 'temporário, pela Lei nº 8.745/1993.' },
      { text: 'misto, metade estatutário e metade celetista.' }
    ],
    explanation:
      'A) ERRADA — a Lei 8.112 rege servidores estatutários da União, não empregados de estatais. B) CORRETA — as estatais adotam o regime CELETISTA (CLT), com ingresso por concurso público (art. 37, II, CF). C) ERRADA — o ingresso exige concurso, salvo cargos em comissão específicos. D) ERRADA — a contratação temporária é para necessidade excepcional na Administração direta/autárquica. E) ERRADA — não há regime "misto" para o pessoal permanente das estatais.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Sobre a extinção dos atos administrativos, assinale a alternativa correta.',
    options: [
      { text: 'A anulação decorre de razões de conveniência e oportunidade.' },
      { text: 'A revogação atinge ato válido, por conveniência e oportunidade, com efeitos ex nunc.', correct: true },
      { text: 'A anulação produz efeitos ex nunc (a partir de agora).' },
      { text: 'A revogação só pode ser feita pelo Poder Judiciário.' },
      { text: 'Ato ilegal deve ser sempre revogado, nunca anulado.' }
    ],
    explanation:
      'A) ERRADA — a anulação decorre de ILEGALIDADE, não de conveniência. B) CORRETA — a revogação recai sobre ato válido/legal, por mérito (conveniência e oportunidade), com efeitos NÃO retroativos (ex nunc). C) ERRADA — a anulação tem efeitos ex tunc (retroativos), pois o ato era ilegal desde a origem. D) ERRADA — a revogação é ato da própria Administração; o Judiciário anula por ilegalidade. E) ERRADA — ato ilegal é ANULADO, não revogado.',
    source: S
  },

  // ───────────────────── Ética, Governança e Compliance ─────────────────────
  {
    disciplineSlug: ETICA, topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa', type: 'ME', difficulty: 'MEDIO',
    statement: 'No modelo das Três Linhas de Defesa, a auditoria interna ocupa a:',
    options: [
      { text: 'primeira linha, executando os controles no dia a dia.' },
      { text: 'terceira linha, provendo avaliação independente sobre governança, riscos e controles.', correct: true },
      { text: 'segunda linha, supervisionando riscos e conformidade.' },
      { text: 'quarta linha, junto aos órgãos externos.' },
      { text: 'primeira e segunda linhas simultaneamente.' }
    ],
    explanation:
      'A) ERRADA — a 1ª linha é a gestão operacional que executa e possui os controles. B) CORRETA — a auditoria interna é a 3ª linha: avaliação INDEPENDENTE e objetiva. C) ERRADA — a 2ª linha são as funções de risco e compliance que monitoram a 1ª. D) ERRADA — não há "quarta linha" no modelo clássico (auditores externos ficam fora do modelo). E) ERRADA — a auditoria não acumula 1ª/2ª linhas, sob pena de perder independência.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Anticorrupção: Lei nº 12.846/2013 e Decreto nº 11.129/2022; leniência; OCDE, FCPA e UK Bribery Act', type: 'ME', difficulty: 'MEDIO',
    statement: 'A Lei nº 12.846/2013 (Lei Anticorrupção) caracteriza-se por prever a responsabilização:',
    options: [
      { text: 'exclusivamente penal e apenas de pessoas físicas.' },
      { text: 'objetiva, administrativa e civil, de pessoas jurídicas por atos lesivos à Administração.', correct: true },
      { text: 'subjetiva, dependente de dolo comprovado da empresa.' },
      { text: 'somente de agentes públicos, não de empresas.' },
      { text: 'apenas em contratos internacionais.' }
    ],
    explanation:
      'A) ERRADA — a lei não é penal e alcança PESSOAS JURÍDICAS. B) CORRETA — prevê responsabilidade OBJETIVA (independe de dolo/culpa) nas esferas administrativa e civil das empresas. C) ERRADA — justamente por ser objetiva, dispensa a prova de dolo. D) ERRADA — o foco é a pessoa jurídica (sem excluir a responsabilização individual em outras leis). E) ERRADA — aplica-se a atos lesivos nacionais e também estrangeiros, não só internacionais.',
    source: S
  },

  // ───────────────────── Proteção de Dados ─────────────────────
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'FACIL',
    statement: 'Na LGPD, a pessoa natural a quem se referem os dados pessoais que são objeto de tratamento é o:',
    options: [
      { text: 'controlador.' },
      { text: 'titular.', correct: true },
      { text: 'operador.' },
      { text: 'encarregado (DPO).' },
      { text: 'agente de tratamento.' }
    ],
    explanation:
      'A) ERRADA — o controlador decide sobre o tratamento dos dados. B) CORRETA — o titular é a pessoa natural a quem os dados se referem. C) ERRADA — o operador trata dados em nome do controlador. D) ERRADA — o encarregado (DPO) é o canal entre controlador, titulares e ANPD. E) ERRADA — "agente de tratamento" é o gênero que engloba controlador e operador.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre as bases legais da LGPD, assinale a alternativa correta.',
    options: [
      { text: 'O consentimento é a única base legal possível para tratar dados pessoais.' },
      { text: 'Existem várias bases legais além do consentimento, como cumprimento de obrigação legal e legítimo interesse.', correct: true },
      { text: 'O tratamento de dados nunca dispensa o consentimento do titular.' },
      { text: 'O legítimo interesse autoriza qualquer tratamento sem limites.' },
      { text: 'Dados sensíveis podem ser tratados livremente, sem base legal.' }
    ],
    explanation:
      'A) ERRADA — o consentimento é uma entre as dez bases legais do art. 7º. B) CORRETA — há outras hipóteses (obrigação legal, execução de contrato, legítimo interesse, tutela da saúde etc.). C) ERRADA — muitas hipóteses dispensam consentimento (ex.: obrigação legal). D) ERRADA — o legítimo interesse é limitado por finalidade e pelos direitos do titular. E) ERRADA — dados sensíveis têm bases legais ainda MAIS restritas (art. 11).',
    source: S
  },

  // ───────────────────── Economia e Finanças ─────────────────────
  {
    disciplineSlug: ECO, topic: 'Macroeconomia: PIB; política fiscal e monetária; Selic; câmbio; inflação; balanço de pagamentos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Quando o Banco Central eleva a taxa Selic para conter a inflação, o efeito esperado, ceteris paribus, é:',
    options: [
      { text: 'aumento imediato do consumo e do crédito.' },
      { text: 'encarecimento do crédito e desaquecimento da demanda agregada.', correct: true },
      { text: 'aumento automático das exportações.' },
      { text: 'redução da taxa de câmbio para zero.' },
      { text: 'expansão da base monetária.' }
    ],
    explanation:
      'A) ERRADA — juros mais altos DESESTIMULAM consumo e crédito. B) CORRETA — a Selic maior encarece o crédito, reduz consumo/investimento e esfria a demanda, pressionando a inflação para baixo. C) ERRADA — não há relação automática de aumento das exportações. D) ERRADA — a política monetária não zera o câmbio; tende a valorizar a moeda local, não anulá-la. E) ERRADA — juros altos configuram política CONTRACIONISTA, reduzindo a expansão monetária.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No apoio oficial às exportações brasileiras, o Fundo de Garantia à Exportação (FGE) tem por função:',
    options: [
      { text: 'financiar diretamente o consumidor final estrangeiro.' },
      { text: 'lastrear a cobertura do Seguro de Crédito à Exportação (SCE) contra riscos comerciais e políticos.', correct: true },
      { text: 'fixar a taxa de câmbio das exportações.' },
      { text: 'substituir o Banco Central na política monetária.' },
      { text: 'conceder isenção tributária às importações.' }
    ],
    explanation:
      'A) ERRADA — o FGE não financia diretamente o consumidor; garante operações. B) CORRETA — o FGE é o fundo público que dá lastro ao SCE, cobrindo riscos comerciais e políticos das exportações (área de atuação da ABGF). C) ERRADA — não fixa câmbio, atribuição do regime cambial/BCB. D) ERRADA — não desempenha política monetária. E) ERRADA — não trata de isenção de importações.',
    source: S
  },

  // ───────────────────── Sustentabilidade / ASG ─────────────────────
  {
    disciplineSlug: SUST, topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro', type: 'ME', difficulty: 'FACIL',
    statement: 'A Agenda 2030 da ONU é composta por quantos Objetivos de Desenvolvimento Sustentável (ODS)?',
    options: [
      { text: '8 objetivos.' },
      { text: '17 objetivos.', correct: true },
      { text: '30 objetivos.' },
      { text: '10 objetivos.' },
      { text: '25 objetivos.' }
    ],
    explanation:
      'A) ERRADA — 8 eram os antigos Objetivos de Desenvolvimento do Milênio (ODM), antecessores. B) CORRETA — a Agenda 2030 tem 17 ODS e 169 metas. C)/D)/E) ERRADAS — não correspondem ao número oficial de ODS.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021', type: 'ME', difficulty: 'MEDIO',
    statement: 'A sigla ASG (em inglês, ESG), cada vez mais relevante para o setor financeiro, refere-se a critérios:',
    options: [
      { text: 'Ambientais, Sociais e de Governança.', correct: true },
      { text: 'Administrativos, Sociais e Gerenciais.' },
      { text: 'Ambientais, Sanitários e Geográficos.' },
      { text: 'de Auditoria, Segurança e Gestão.' },
      { text: 'Ambientais, Setoriais e Globais.' }
    ],
    explanation:
      'A) CORRETA — ASG = Ambiental, Social e Governança (ESG: Environmental, Social, Governance). B)/C)/D)/E) ERRADAS — expandem a sigla de forma incorreta; nenhuma corresponde ao conceito consagrado no mercado financeiro.',
    source: S
  },

  // ───────────────────── Noções de Análise de Dados ─────────────────────
  {
    disciplineSlug: NAD, topic: 'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação', type: 'ME', difficulty: 'MEDIO',
    statement: 'No método CRISP-DM, a primeira fase do ciclo de análise de dados é:',
    options: [
      { text: 'a modelagem.' },
      { text: 'o entendimento do negócio.', correct: true },
      { text: 'a implantação.' },
      { text: 'a preparação dos dados.' },
      { text: 'a avaliação.' }
    ],
    explanation:
      'A) ERRADA — a modelagem vem depois da preparação dos dados. B) CORRETA — o CRISP-DM inicia pelo "Business Understanding": entender o problema e os objetivos de negócio. C) ERRADA — a implantação (deployment) é a última fase. D) ERRADA — a preparação vem após entender negócio e dados. E) ERRADA — a avaliação precede a implantação, não abre o ciclo.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Indicadores de desempenho (KPIs): conceito e boas práticas; Ishikawa, Cinco Porquês e Pareto', type: 'ME', difficulty: 'MEDIO',
    statement: 'A ferramenta da qualidade representada por um gráfico de "espinha de peixe", usada para identificar as possíveis causas de um problema, é o diagrama de:',
    options: [
      { text: 'Pareto.' },
      { text: 'Ishikawa (causa e efeito).', correct: true },
      { text: 'Gantt.' },
      { text: 'dispersão.' },
      { text: 'controle.' }
    ],
    explanation:
      'A) ERRADA — o diagrama de Pareto (80/20) prioriza causas por frequência, em barras. B) CORRETA — o diagrama de Ishikawa (espinha de peixe) organiza as causas potenciais de um efeito. C) ERRADA — o gráfico de Gantt é de cronograma de projeto. D) ERRADA — o de dispersão mostra correlação entre variáveis. E) ERRADA — a carta de controle monitora a estabilidade de um processo ao longo do tempo.',
    source: S
  }
]
