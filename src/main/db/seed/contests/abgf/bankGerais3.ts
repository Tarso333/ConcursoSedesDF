// M29 (nivelamento CG, parte 2) — Elevar a ~20 questões: Proteção de Dados,
// Economia/Finanças/Garantias, Sustentabilidade/ASG e Noções de Análise de
// Dados. APENAS DADOS; idempotente por seed_key; comentário alternativa por
// alternativa. Enunciados distintos dos já existentes em bankGerais.ts.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

const PROT = 'protecao-dados-seguranca'
const ECO = 'economia-financas-garantias'
const SUST = 'sustentabilidade-asg'
const NAD = 'nocoes-analise-dados'

export const ABGF_BANK_GERAIS3: SeedQuestion[] = [
  // ════════════════════ Proteção de Dados (+16) ════════════════════
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'FACIL',
    statement: 'O órgão da Administração Pública federal responsável por zelar, implementar e fiscalizar o cumprimento da LGPD é a:',
    options: [
      { text: 'ANPD (Autoridade Nacional de Proteção de Dados).', correct: true },
      { text: 'CVM.' },
      { text: 'ANATEL.' },
      { text: 'Receita Federal.' },
      { text: 'ANVISA.' }
    ],
    explanation:
      'A) CORRETA — a ANPD é a autoridade competente para fiscalizar e regulamentar a LGPD. B) ERRADA — a CVM regula o mercado de capitais. C) ERRADA — a ANATEL regula telecomunicações. D) ERRADA — a Receita administra tributos. E) ERRADA — a ANVISA regula vigilância sanitária.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'MEDIO',
    statement: 'Conforme a LGPD, são considerados dados pessoais SENSÍVEIS:',
    options: [
      { text: 'dados sobre origem racial, convicção religiosa, opinião política, saúde ou vida sexual, entre outros.', correct: true },
      { text: 'apenas o nome e o CPF do titular.' },
      { text: 'somente o endereço de e-mail.' },
      { text: 'exclusivamente dados de pessoas jurídicas.' },
      { text: 'quaisquer dados já tornados públicos.' }
    ],
    explanation:
      'A) CORRETA — o art. 5º, II, define como sensíveis dados sobre origem racial/étnica, religião, opinião política, saúde, vida sexual, dado genético/biométrico etc. B)/C) ERRADAS — nome, CPF e e-mail são dados pessoais comuns, não sensíveis. D) ERRADA — a LGPD protege dados de pessoa NATURAL. E) ERRADA — dados públicos não deixam de ter proteção conforme a finalidade.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'MEDIO',
    statement: 'É um direito do titular assegurado pela LGPD:',
    options: [
      { text: 'obter a confirmação da existência de tratamento e o acesso, correção e eliminação de seus dados.', correct: true },
      { text: 'impedir qualquer coleta de dados pelo Estado em qualquer hipótese.' },
      { text: 'exigir remuneração por cada acesso da empresa.' },
      { text: 'apagar dados de terceiros livremente.' },
      { text: 'assumir a titularidade de dados de outras pessoas.' }
    ],
    explanation:
      'A) CORRETA — o art. 18 garante confirmação, acesso, correção, anonimização, portabilidade e eliminação, entre outros. B) ERRADA — há bases legais que autorizam o tratamento (ex.: obrigação legal). C) ERRADA — não há previsão de remuneração por acesso. D) ERRADA — o titular gere os PRÓPRIOS dados, não os de terceiros. E) ERRADA — não se pode assumir titularidade alheia.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O princípio da LGPD que exige limitar o tratamento ao mínimo necessário para atingir a finalidade é o da:',
    options: [
      { text: 'necessidade (minimização).', correct: true },
      { text: 'irrestrição.' },
      { text: 'perpetuidade dos dados.' },
      { text: 'opacidade.' },
      { text: 'coleta ilimitada.' }
    ],
    explanation:
      'A) CORRETA — o princípio da necessidade limita o tratamento ao mínimo indispensável à finalidade. B)/E) ERRADAS — coletar sem limites contraria a minimização. C) ERRADA — há também limitação temporal (não se guardam dados indefinidamente sem base). D) ERRADA — a LGPD prega transparência, não opacidade.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Marco Civil da Internet (Lei nº 12.965/2014): princípios, direitos, deveres e responsabilidades', type: 'ME', difficulty: 'MEDIO',
    statement: 'O Marco Civil da Internet consagra, como um de seus princípios fundamentais, a:',
    options: [
      { text: 'neutralidade da rede.', correct: true },
      { text: 'censura prévia de conteúdo.' },
      { text: 'proibição do acesso à internet.' },
      { text: 'venda obrigatória de dados dos usuários.' },
      { text: 'vigilância irrestrita das comunicações.' }
    ],
    explanation:
      'A) CORRETA — a neutralidade da rede (tratamento isonômico dos pacotes) é princípio central do Marco Civil. B) ERRADA — o Marco Civil protege a liberdade de expressão, vedando censura prévia. C) ERRADA — assegura o acesso, não o proíbe. D) ERRADA — protege os dados dos usuários. E) ERRADA — protege a privacidade e o sigilo das comunicações.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Marco Civil da Internet (Lei nº 12.965/2014): princípios, direitos, deveres e responsabilidades', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Segundo o Marco Civil, em regra, o provedor de aplicações de internet só pode ser responsabilizado civilmente por conteúdo de terceiro se:',
    options: [
      { text: 'após ordem judicial específica, não tomar as providências para retirar o conteúdo.', correct: true },
      { text: 'qualquer usuário reclamar informalmente.' },
      { text: 'o conteúdo tiver mais de mil visualizações.' },
      { text: 'a empresa for estrangeira.' },
      { text: 'o conteúdo for publicado à noite.' }
    ],
    explanation:
      'A) CORRETA — em regra, a responsabilidade surge após descumprir ORDEM JUDICIAL de remoção (art. 19), preservando a liberdade de expressão. B) ERRADA — reclamação informal, por si, não gera responsabilidade. C)/D)/E) ERRADAS — número de visualizações, nacionalidade ou horário não são critérios legais.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Segurança da informação: princípios CID; principais ameaças e ataques; controles defensivos', type: 'ME', difficulty: 'MEDIO',
    statement: 'O princípio da INTEGRIDADE, na segurança da informação, é violado quando:',
    options: [
      { text: 'dados são alterados de forma indevida ou não autorizada.', correct: true },
      { text: 'um sistema fica temporariamente indisponível.' },
      { text: 'uma senha é mantida em segredo.' },
      { text: 'um backup é realizado corretamente.' },
      { text: 'o acesso é concedido ao usuário autorizado.' }
    ],
    explanation:
      'A) CORRETA — a integridade se refere à exatidão e completude; sua violação é a alteração indevida dos dados. B) ERRADA — indisponibilidade afeta a DISPONIBILIDADE. C) ERRADA — manter senha em segredo protege a confidencialidade. D) ERRADA — backup correto reforça a disponibilidade/integridade. E) ERRADA — acesso autorizado é operação normal.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Segurança da informação: princípios CID; principais ameaças e ataques; controles defensivos', type: 'ME', difficulty: 'FACIL',
    statement: 'Uma medida eficaz de proteção da confidencialidade de dados sensíveis em trânsito pela rede é:',
    options: [
      { text: 'a criptografia da comunicação.', correct: true },
      { text: 'a desativação dos firewalls.' },
      { text: 'a divulgação pública das senhas.' },
      { text: 'o uso de protocolos sem cifragem.' },
      { text: 'a remoção de qualquer controle de acesso.' }
    ],
    explanation:
      'A) CORRETA — a criptografia protege a confidencialidade dos dados em trânsito (ex.: TLS). B)/D)/E) ERRADAS — desativar firewall, usar protocolos sem cifra ou remover controles ENFRAQUECE a segurança. C) ERRADA — divulgar senhas é violação grave de confidencialidade.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Gestão de riscos de SI: ISO/IEC 27001 e 27002; classificação da informação; controle de acesso; incidentes', type: 'ME', difficulty: 'MEDIO',
    statement: 'A classificação da informação (ex.: pública, interna, confidencial, secreta) tem por objetivo principal:',
    options: [
      { text: 'definir controles de proteção proporcionais ao grau de sensibilidade da informação.', correct: true },
      { text: 'aumentar o volume de dados armazenados.' },
      { text: 'tornar todos os dados públicos.' },
      { text: 'eliminar a necessidade de controle de acesso.' },
      { text: 'impedir qualquer uso da informação.' }
    ],
    explanation:
      'A) CORRETA — classificar permite aplicar controles adequados ao nível de sensibilidade de cada informação. B) ERRADA — não visa aumentar volume. C) ERRADA — nem toda informação é pública. D) ERRADA — a classificação orienta, e não elimina, o controle de acesso. E) ERRADA — o objetivo é proteger o uso adequado, não impedir todo uso.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Gestão de riscos de SI: ISO/IEC 27001 e 27002; classificação da informação; controle de acesso; incidentes', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um "incidente de segurança da informação" pode ser definido como:',
    options: [
      { text: 'um evento que compromete a confidencialidade, integridade ou disponibilidade da informação.', correct: true },
      { text: 'a instalação rotineira de atualizações aprovadas.' },
      { text: 'o backup diário bem-sucedido.' },
      { text: 'o login normal de um usuário autorizado.' },
      { text: 'a emissão de um relatório gerencial.' }
    ],
    explanation:
      'A) CORRETA — incidente é o evento (ou série) que ameaça ou viola a CID da informação. B)/C)/E) ERRADAS — são operações normais e desejadas. D) ERRADA — login autorizado é uso legítimo, não incidente.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Uso responsável de dados: qualidade; privacidade por design; governança de dados; ética e viés algorítmico', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O conceito de "privacy by design" (privacidade desde a concepção) preconiza que:',
    options: [
      { text: 'a proteção de dados seja incorporada desde a concepção do produto/serviço, e não adicionada depois.', correct: true },
      { text: 'a privacidade só seja considerada após reclamações.' },
      { text: 'os dados sejam sempre públicos por padrão.' },
      { text: 'a segurança seja opcional no projeto.' },
      { text: 'a coleta de dados seja sempre máxima.' }
    ],
    explanation:
      'A) CORRETA — privacy by design integra a privacidade desde o início do projeto, por padrão. B) ERRADA — é abordagem preventiva, não reativa. C) ERRADA — o padrão deve ser protetivo (privacy by default). D) ERRADA — a segurança é requisito, não opcional. E) ERRADA — contraria a minimização de dados.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Uso responsável de dados: qualidade; privacidade por design; governança de dados; ética e viés algorítmico', type: 'ME', difficulty: 'MEDIO',
    statement: 'A técnica que descaracteriza os dados de modo que um titular NÃO possa mais ser identificado, ficando fora do escopo da LGPD, é a:',
    options: [
      { text: 'anonimização.', correct: true },
      { text: 'duplicação.' },
      { text: 'compilação.' },
      { text: 'indexação.' },
      { text: 'replicação.' }
    ],
    explanation:
      'A) CORRETA — a anonimização impede a reidentificação do titular; dados anonimizados, em regra, saem do escopo da LGPD. B)/C)/D)/E) ERRADAS — duplicar, compilar, indexar ou replicar não descaracterizam a identidade do titular.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD', type: 'ME', difficulty: 'MEDIO',
    statement: 'O agente de tratamento que, recebendo instruções do controlador, realiza o tratamento de dados pessoais em seu nome é o:',
    options: [
      { text: 'operador.', correct: true },
      { text: 'titular.' },
      { text: 'encarregado.' },
      { text: 'fiscal da ANPD.' },
      { text: 'auditor externo.' }
    ],
    explanation:
      'A) CORRETA — o operador trata dados em nome e segundo as instruções do controlador. B) ERRADA — o titular é a pessoa dos dados. C) ERRADA — o encarregado (DPO) é o canal de comunicação. D) ERRADA — o fiscal da ANPD é agente estatal de fiscalização, não agente de tratamento. E) ERRADA — auditor externo não é papel definido pela LGPD como agente de tratamento.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Segurança da informação: princípios CID; principais ameaças e ataques; controles defensivos', type: 'ME', difficulty: 'FACIL',
    statement: 'O princípio da segurança da informação que garante que a informação esteja acessível aos usuários autorizados sempre que necessário é a:',
    options: [
      { text: 'disponibilidade.', correct: true },
      { text: 'confidencialidade.' },
      { text: 'integridade.' },
      { text: 'irretratabilidade.' },
      { text: 'anonimização.' }
    ],
    explanation:
      'A) CORRETA — a disponibilidade assegura o acesso à informação quando necessário. B) ERRADA — confidencialidade restringe o acesso aos autorizados. C) ERRADA — integridade garante exatidão/completude. D) ERRADA — irretratabilidade (não repúdio) impede negar autoria. E) ERRADA — anonimização é técnica de proteção de identidade, não pilar da tríade.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Gestão de riscos de SI: ISO/IEC 27001 e 27002; classificação da informação; controle de acesso; incidentes', type: 'ME', difficulty: 'MEDIO',
    statement: 'O controle de acesso baseado no princípio "need to know" (necessidade de conhecer) determina que:',
    options: [
      { text: 'o usuário só acesse as informações estritamente necessárias às suas atividades.', correct: true },
      { text: 'todos os usuários acessem todas as informações.' },
      { text: 'informações confidenciais sejam divulgadas amplamente.' },
      { text: 'não haja registro de acessos.' },
      { text: 'o acesso seja concedido por antiguidade apenas.' }
    ],
    explanation:
      'A) CORRETA — o need to know limita o acesso ao que é necessário à função, alinhado ao menor privilégio. B)/C) ERRADAS — acesso universal e divulgação ampla violam o princípio. D) ERRADA — registrar acessos (log) é boa prática. E) ERRADA — o critério é a necessidade funcional, não a antiguidade.',
    source: S
  },
  {
    disciplineSlug: PROT, topic: 'Uso responsável de dados: qualidade; privacidade por design; governança de dados; ética e viés algorítmico', type: 'ME', difficulty: 'MEDIO',
    statement: 'No uso responsável de dados e IA, o "viés algorítmico" pode ser mitigado, entre outras medidas, por:',
    options: [
      { text: 'uso de dados representativos e auditoria/monitoramento contínuo dos modelos.', correct: true },
      { text: 'ocultar completamente como o modelo decide.' },
      { text: 'ignorar a diversidade dos dados de treino.' },
      { text: 'eliminar qualquer avaliação de desempenho por grupo.' },
      { text: 'aumentar apenas a velocidade de processamento.' }
    ],
    explanation:
      'A) CORRETA — dados representativos, transparência, explicabilidade e monitoramento contínuo ajudam a mitigar vieses. B) ERRADA — a opacidade dificulta identificar e corrigir vieses. C) ERRADA — ignorar a diversidade agrava o viés. D) ERRADA — avaliar por grupo é justamente uma forma de detectar discriminação. E) ERRADA — velocidade não corrige viés.',
    source: S
  },

  // ════════════════════ Economia, Finanças e Garantias (+14) ════════════════════
  {
    disciplineSlug: ECO, topic: 'Microeconomia: oferta e demanda; elasticidades; estruturas e falhas de mercado; assimetria de informação', type: 'ME', difficulty: 'FACIL',
    statement: 'Pela lei da oferta e da demanda, mantidas as demais condições, um aumento na oferta de um bem, com demanda constante, tende a:',
    options: [
      { text: 'reduzir o preço de equilíbrio.', correct: true },
      { text: 'aumentar o preço de equilíbrio.' },
      { text: 'não afetar o preço.' },
      { text: 'zerar a quantidade ofertada.' },
      { text: 'eliminar a demanda.' }
    ],
    explanation:
      'A) CORRETA — mais oferta com demanda constante pressiona o preço de equilíbrio para BAIXO. B) ERRADA — aumento de preço ocorreria com queda de oferta ou aumento de demanda. C) ERRADA — há efeito sobre o preço. D)/E) ERRADAS — a oferta não se anula nem a demanda desaparece por esse deslocamento.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Microeconomia: oferta e demanda; elasticidades; estruturas e falhas de mercado; assimetria de informação', type: 'ME', difficulty: 'MEDIO',
    statement: 'A estrutura de mercado caracterizada por um único vendedor, sem substitutos próximos e com barreiras à entrada, é o:',
    options: [
      { text: 'monopólio.', correct: true },
      { text: 'concorrência perfeita.' },
      { text: 'oligopólio.' },
      { text: 'monopsônio.' },
      { text: 'concorrência monopolística.' }
    ],
    explanation:
      'A) CORRETA — no monopólio há um único ofertante, sem substitutos próximos e com barreiras à entrada. B) ERRADA — concorrência perfeita tem muitos vendedores e produto homogêneo. C) ERRADA — oligopólio tem poucos vendedores. D) ERRADA — monopsônio é um único COMPRADOR. E) ERRADA — concorrência monopolística tem muitos vendedores com produtos diferenciados.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Macroeconomia: PIB; política fiscal e monetária; Selic; câmbio; inflação; balanço de pagamentos', type: 'ME', difficulty: 'MEDIO',
    statement: 'O Produto Interno Bruto (PIB) de um país mede:',
    options: [
      { text: 'o valor de todos os bens e serviços finais produzidos no país em determinado período.', correct: true },
      { text: 'apenas as exportações do país.' },
      { text: 'somente a arrecadação de impostos.' },
      { text: 'a quantidade de dinheiro em circulação.' },
      { text: 'o total da dívida externa.' }
    ],
    explanation:
      'A) CORRETA — o PIB é o valor de mercado de todos os bens e serviços FINAIS produzidos internamente em um período. B) ERRADA — exportações são parte, não o todo. C) ERRADA — arrecadação não é o PIB. D) ERRADA — dinheiro em circulação é agregado monetário. E) ERRADA — dívida externa é outro indicador.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Macroeconomia: PIB; política fiscal e monetária; Selic; câmbio; inflação; balanço de pagamentos', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma política fiscal EXPANSIONISTA caracteriza-se por:',
    options: [
      { text: 'aumento de gastos públicos e/ou redução de impostos para estimular a demanda agregada.', correct: true },
      { text: 'elevação de juros pelo Banco Central.' },
      { text: 'corte de gastos e aumento de impostos.' },
      { text: 'venda de títulos para enxugar a liquidez.' },
      { text: 'redução da base monetária.' }
    ],
    explanation:
      'A) CORRETA — a política FISCAL expansionista amplia gastos e/ou reduz tributos para aquecer a economia. B)/D)/E) ERRADAS — juros, venda de títulos e base monetária são instrumentos de política MONETÁRIA. C) ERRADA — cortar gastos e elevar impostos é política fiscal CONTRACIONISTA.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Finanças públicas: receita e despesa; PPA, LDO e LOA; PDG e SEST; LRF (noções)', type: 'ME', difficulty: 'MEDIO',
    statement: 'No ciclo orçamentário brasileiro, o instrumento que estabelece as diretrizes, metas e prioridades para o exercício seguinte e orienta a elaboração da lei orçamentária anual é a:',
    options: [
      { text: 'LDO (Lei de Diretrizes Orçamentárias).', correct: true },
      { text: 'LOA (Lei Orçamentária Anual).' },
      { text: 'PPA (Plano Plurianual).' },
      { text: 'LRF (Lei de Responsabilidade Fiscal).' },
      { text: 'DRU (Desvinculação de Receitas da União).' }
    ],
    explanation:
      'A) CORRETA — a LDO fixa metas e prioridades e orienta a elaboração da LOA. B) ERRADA — a LOA é o orçamento propriamente dito. C) ERRADA — o PPA tem horizonte de quatro anos (médio prazo). D) ERRADA — a LRF trata de responsabilidade na gestão fiscal. E) ERRADA — a DRU é mecanismo de desvinculação de receitas.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)', type: 'ME', difficulty: 'MEDIO',
    statement: 'No Sistema Financeiro Nacional, o órgão máximo, normativo e deliberativo, que fixa as diretrizes das políticas monetária, creditícia e cambial, é o:',
    options: [
      { text: 'Conselho Monetário Nacional (CMN).', correct: true },
      { text: 'Banco Central do Brasil (BCB).' },
      { text: 'Comissão de Valores Mobiliários (CVM).' },
      { text: 'Tesouro Nacional.' },
      { text: 'Banco do Brasil.' }
    ],
    explanation:
      'A) CORRETA — o CMN é o órgão normativo máximo do SFN, define as diretrizes. B) ERRADA — o BCB é o executor/supervisor das políticas. C) ERRADA — a CVM regula o mercado de valores mobiliários. D) ERRADA — o Tesouro gere a dívida e as contas públicas. E) ERRADA — o Banco do Brasil é instituição financeira operadora.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Os Acordos de Basileia (III) tratam essencialmente de:',
    options: [
      { text: 'requisitos de capital e liquidez para a solidez das instituições financeiras.', correct: true },
      { text: 'regras de trânsito internacional.' },
      { text: 'padrões de rotulagem de alimentos.' },
      { text: 'metas de emissão de carbono.' },
      { text: 'tarifas de importação de veículos.' }
    ],
    explanation:
      'A) CORRETA — Basileia III estabelece exigências de capital, alavancagem e liquidez para fortalecer os bancos. B)/C)/D)/E) ERRADAS — não têm relação com regulação prudencial bancária.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF', type: 'ME', difficulty: 'MEDIO',
    statement: 'O Seguro de Crédito à Exportação (SCE) tem por finalidade cobrir o exportador (ou instituição financiadora) contra:',
    options: [
      { text: 'riscos comerciais e políticos de inadimplência nas operações de exportação.', correct: true },
      { text: 'danos a veículos particulares.' },
      { text: 'acidentes de trabalho domésticos.' },
      { text: 'perdas em apostas esportivas.' },
      { text: 'furto de bens de consumo pessoal.' }
    ],
    explanation:
      'A) CORRETA — o SCE protege contra o não pagamento por riscos comerciais (insolvência do importador) e políticos (ex.: moratória, guerra). B)/C)/D)/E) ERRADAS — não integram o escopo do seguro de crédito à exportação.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No apoio oficial às exportações, o papel institucional da ABGF é, essencialmente, o de:',
    options: [
      { text: 'gestora de fundos garantidores e do seguro de crédito à exportação, apoiando as exportações brasileiras.', correct: true },
      { text: 'banco central emissor de moeda.' },
      { text: 'órgão de arrecadação de tributos federais.' },
      { text: 'agência reguladora de telecomunicações.' },
      { text: 'tribunal de contas.' }
    ],
    explanation:
      'A) CORRETA — a ABGF administra fundos garantidores (como o FGE) e viabiliza o SCE, apoiando o comércio exterior. B)/C)/D)/E) ERRADAS — não correspondem à natureza e às atribuições da ABGF.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades', type: 'ME', difficulty: 'MEDIO',
    statement: 'No mercado securitário, a operação em que a seguradora transfere parte dos riscos assumidos a outra companhia (a resseguradora) é o:',
    options: [
      { text: 'resseguro.', correct: true },
      { text: 'cosseguro.' },
      { text: 'sinistro.' },
      { text: 'prêmio.' },
      { text: 'endosso.' }
    ],
    explanation:
      'A) CORRETA — o resseguro é o "seguro do segurador": a seguradora cede parte do risco à resseguradora. B) ERRADA — no cosseguro várias seguradoras dividem o MESMO risco desde a origem. C) ERRADA — o sinistro é a ocorrência do evento coberto. D) ERRADA — o prêmio é o valor pago pelo segurado. E) ERRADA — o endosso é a alteração formal da apólice.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A "retrocessão", no mercado de resseguros, ocorre quando:',
    options: [
      { text: 'a resseguradora repassa parte dos riscos aceitos a outra resseguradora.', correct: true },
      { text: 'o segurado cancela a apólice.' },
      { text: 'a seguradora devolve o prêmio ao cliente.' },
      { text: 'o corretor recebe sua comissão.' },
      { text: 'ocorre o pagamento da indenização ao segurado.' }
    ],
    explanation:
      'A) CORRETA — a retrocessão é a cessão de riscos de uma resseguradora para outra, pulverizando ainda mais o risco. B) ERRADA — cancelar apólice é ato do segurado. C) ERRADA — devolução de prêmio é estorno. D) ERRADA — comissão do corretor é remuneração. E) ERRADA — pagar a indenização é liquidação do sinistro.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Microeconomia: oferta e demanda; elasticidades; estruturas e falhas de mercado; assimetria de informação', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um bem cuja demanda varia pouco quando o preço muda (ex.: medicamentos essenciais) é classificado como de demanda:',
    options: [
      { text: 'inelástica.', correct: true },
      { text: 'elástica.' },
      { text: 'unitária.' },
      { text: 'perfeitamente elástica.' },
      { text: 'nula.' }
    ],
    explanation:
      'A) CORRETA — na demanda inelástica a quantidade responde pouco à variação de preço (|elasticidade| < 1). B) ERRADA — elástica é quando a quantidade varia muito com o preço. C) ERRADA — unitária tem elasticidade igual a 1. D) ERRADA — perfeitamente elástica é caso extremo (horizontal). E) ERRADA — "nula" não descreve corretamente a baixa sensibilidade.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Finanças públicas: receita e despesa; PPA, LDO e LOA; PDG e SEST; LRF (noções)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A Lei de Responsabilidade Fiscal (LRF) tem como objetivo central:',
    options: [
      { text: 'estabelecer normas de finanças públicas voltadas à responsabilidade na gestão fiscal, com limites e transparência.', correct: true },
      { text: 'autorizar gastos ilimitados pelos entes.' },
      { text: 'extinguir o orçamento público.' },
      { text: 'proibir a arrecadação de tributos.' },
      { text: 'centralizar toda a receita na União.' }
    ],
    explanation:
      'A) CORRETA — a LRF impõe planejamento, limites de despesa (ex.: com pessoal), controle e transparência fiscal. B) ERRADA — a lei justamente LIMITA gastos. C) ERRADA — não extingue o orçamento. D) ERRADA — não proíbe tributos. E) ERRADA — não centraliza a receita.',
    source: S
  },
  {
    disciplineSlug: ECO, topic: 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações', type: 'ME', difficulty: 'MEDIO',
    statement: 'Os fundos garantidores, como instrumentos de mitigação de risco de crédito, atuam essencialmente para:',
    options: [
      { text: 'oferecer garantias que viabilizam operações de crédito/financiamento que, sem elas, teriam risco elevado.', correct: true },
      { text: 'substituir o Banco Central na emissão de moeda.' },
      { text: 'arrecadar tributos estaduais.' },
      { text: 'fiscalizar a folha de pagamento pública.' },
      { text: 'definir a taxa de câmbio oficial.' }
    ],
    explanation:
      'A) CORRETA — os fundos garantidores prestam garantias que reduzem o risco e viabilizam o crédito/financiamento (ex.: exportações). B)/C)/D)/E) ERRADAS — não correspondem à função de um fundo garantidor.',
    source: S
  },

  // ════════════════════ Sustentabilidade / ASG (+16) ════════════════════
  {
    disciplineSlug: SUST, topic: 'Mudanças climáticas: causas e impactos; Acordo de Paris; PNMC (Lei nº 12.187/2009); NDC do Brasil', type: 'ME', difficulty: 'FACIL',
    statement: 'O Acordo de Paris (2015), no âmbito da UNFCCC, tem como objetivo central:',
    options: [
      { text: 'limitar o aquecimento global bem abaixo de 2 °C, buscando 1,5 °C em relação aos níveis pré-industriais.', correct: true },
      { text: 'aumentar a emissão de gases de efeito estufa.' },
      { text: 'proibir o uso de energia renovável.' },
      { text: 'eliminar acordos internacionais sobre clima.' },
      { text: 'estabelecer tarifas de importação de petróleo.' }
    ],
    explanation:
      'A) CORRETA — o Acordo de Paris visa manter o aquecimento bem abaixo de 2 °C, com esforços para 1,5 °C. B) ERRADA — o objetivo é REDUZIR emissões. C) ERRADA — incentiva as renováveis. D) ERRADA — é um marco de cooperação, não de eliminação. E) ERRADA — não trata de tarifas de petróleo.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Mudanças climáticas: causas e impactos; Acordo de Paris; PNMC (Lei nº 12.187/2009); NDC do Brasil', type: 'ME', difficulty: 'MEDIO',
    statement: 'A sigla NDC, no contexto climático, refere-se a:',
    options: [
      { text: 'as Contribuições Nacionalmente Determinadas — metas voluntárias de cada país no Acordo de Paris.', correct: true },
      { text: 'um tipo de imposto sobre carbono municipal.' },
      { text: 'uma norma de contabilidade de bancos.' },
      { text: 'um protocolo de rede de computadores.' },
      { text: 'um índice da bolsa de valores.' }
    ],
    explanation:
      'A) CORRETA — NDC (Nationally Determined Contributions) são as metas de mitigação/adaptação que cada país define no Acordo de Paris. B)/C)/D)/E) ERRADAS — não correspondem ao significado da sigla no contexto climático.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro', type: 'ME', difficulty: 'MEDIO',
    statement: 'As três dimensões clássicas da sustentabilidade (tripé da sustentabilidade / triple bottom line) são:',
    options: [
      { text: 'ambiental, social e econômica.', correct: true },
      { text: 'política, militar e religiosa.' },
      { text: 'jurídica, contábil e fiscal.' },
      { text: 'tecnológica, esportiva e cultural.' },
      { text: 'urbana, rural e industrial.' }
    ],
    explanation:
      'A) CORRETA — o tripé da sustentabilidade abrange as dimensões ambiental, social e econômica (planet, people, profit). B)/C)/D)/E) ERRADAS — não correspondem ao conceito consagrado de triple bottom line.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Finanças sustentáveis: green bonds, títulos verdes, créditos de carbono, blended finance; taxonomia sustentável', type: 'ME', difficulty: 'MEDIO',
    statement: 'Os "green bonds" (títulos verdes) são:',
    options: [
      { text: 'títulos de dívida cujos recursos são destinados a projetos com benefícios ambientais.', correct: true },
      { text: 'ações de empresas de qualquer setor.' },
      { text: 'moedas digitais sem lastro.' },
      { text: 'tributos sobre poluição.' },
      { text: 'seguros de automóveis elétricos.' }
    ],
    explanation:
      'A) CORRETA — green bonds captam recursos vinculados a projetos ambientalmente sustentáveis (energia limpa, eficiência etc.). B) ERRADA — são títulos de dívida, não ações. C) ERRADA — não são criptomoedas. D) ERRADA — não são tributos. E) ERRADA — não são seguros.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Finanças sustentáveis: green bonds, títulos verdes, créditos de carbono, blended finance; taxonomia sustentável', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Um "crédito de carbono" equivale, em regra, a:',
    options: [
      { text: 'uma tonelada de CO2 (ou equivalente) que deixou de ser emitida ou foi removida da atmosfera.', correct: true },
      { text: 'um empréstimo bancário para compra de carvão.' },
      { text: 'um imposto sobre combustíveis.' },
      { text: 'uma ação preferencial de mineradora.' },
      { text: 'um título público federal.' }
    ],
    explanation:
      'A) CORRETA — um crédito de carbono representa 1 tonelada de CO2 equivalente evitada/removida, negociável em mercados de carbono. B)/C)/D)/E) ERRADAS — não correspondem ao conceito de crédito de carbono.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021', type: 'ME', difficulty: 'MEDIO',
    statement: 'O "greenwashing", combatido nas finanças sustentáveis, consiste em:',
    options: [
      { text: 'divulgar uma imagem falsamente sustentável de produtos, serviços ou da própria organização.', correct: true },
      { text: 'lavar equipamentos com produtos ecológicos.' },
      { text: 'plantar árvores em áreas degradadas.' },
      { text: 'reduzir efetivamente as emissões de carbono.' },
      { text: 'publicar relatórios auditados de sustentabilidade.' }
    ],
    explanation:
      'A) CORRETA — greenwashing é a "maquiagem verde": alegações ambientais enganosas ou não comprovadas. B) ERRADA — interpretação literal e incorreta. C)/D)/E) ERRADAS — descrevem práticas sustentáveis reais, o oposto do greenwashing.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No setor financeiro, o "risco de transição" climático refere-se a:',
    options: [
      { text: 'perdas decorrentes do processo de ajuste a uma economia de baixo carbono (mudanças regulatórias, tecnológicas e de mercado).', correct: true },
      { text: 'danos físicos diretos causados por eventos climáticos extremos.' },
      { text: 'a mudança de endereço da sede do banco.' },
      { text: 'a rotatividade de funcionários.' },
      { text: 'a troca do sistema de TI.' }
    ],
    explanation:
      'A) CORRETA — o risco de TRANSIÇÃO advém do ajuste à economia de baixo carbono (novas normas, tecnologias, preferências). B) ERRADA — danos diretos de eventos extremos são o risco FÍSICO. C)/D)/E) ERRADAS — não são riscos climáticos no sentido técnico.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Diversidade e inclusão: direitos humanos; interseccionalidade; inclusão de grupos vulnerabilizados', type: 'ME', difficulty: 'MEDIO',
    statement: 'O conceito de "interseccionalidade", em diversidade e inclusão, refere-se a:',
    options: [
      { text: 'a sobreposição de diferentes marcadores sociais (raça, gênero, classe etc.) que se combinam nas experiências de discriminação.', correct: true },
      { text: 'o cruzamento de duas ruas de uma cidade.' },
      { text: 'a interseção de dois conjuntos matemáticos apenas.' },
      { text: 'a fusão de duas empresas.' },
      { text: 'a divisão de tarefas em um projeto.' }
    ],
    explanation:
      'A) CORRETA — a interseccionalidade analisa como marcadores sociais se sobrepõem, intensificando desigualdades. B)/C)/D)/E) ERRADAS — usam o termo em sentido literal/alheio ao debate de D&I.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro', type: 'ME', difficulty: 'FACIL',
    statement: 'A Agenda 2030 e os ODS foram estabelecidos no âmbito de qual organização?',
    options: [
      { text: 'Organização das Nações Unidas (ONU).', correct: true },
      { text: 'Organização Mundial do Comércio (OMC).' },
      { text: 'Fundo Monetário Internacional (FMI).' },
      { text: 'Organização do Tratado do Atlântico Norte (OTAN).' },
      { text: 'Mercosul.' }
    ],
    explanation:
      'A) CORRETA — os 17 ODS integram a Agenda 2030, adotada pela ONU em 2015. B)/C)/D)/E) ERRADAS — OMC, FMI, OTAN e Mercosul não são a instância que definiu os ODS.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Bioeconomia: conceito, dimensões e cadeias produtivas', type: 'ME', difficulty: 'MEDIO',
    statement: 'A bioeconomia pode ser entendida como o modelo econômico baseado em:',
    options: [
      { text: 'uso sustentável de recursos biológicos e processos renováveis para produzir bens e serviços.', correct: true },
      { text: 'exploração ilimitada de combustíveis fósseis.' },
      { text: 'produção exclusivamente digital, sem insumos naturais.' },
      { text: 'especulação financeira de curto prazo.' },
      { text: 'importação de resíduos tóxicos.' }
    ],
    explanation:
      'A) CORRETA — a bioeconomia aproveita recursos biológicos renováveis de forma sustentável (biotecnologia, cadeias da sociobiodiversidade). B) ERRADA — o modelo busca justamente reduzir a dependência de fósseis. C) ERRADA — envolve insumos biológicos reais. D)/E) ERRADAS — não têm relação com o conceito.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Biodiversidade e Soluções Baseadas na Natureza (SBN); serviços ecossistêmicos; infraestrutura verde e azul', type: 'ME', difficulty: 'MEDIO',
    statement: 'As "Soluções Baseadas na Natureza" (SBN) consistem em:',
    options: [
      { text: 'ações que utilizam ou imitam processos naturais para enfrentar desafios (ex.: restauração de matas para conter enchentes).', correct: true },
      { text: 'obras de concreto que substituem totalmente os ecossistemas.' },
      { text: 'a proibição de qualquer atividade humana.' },
      { text: 'soluções puramente tecnológicas sem relação com a natureza.' },
      { text: 'a extração acelerada de recursos naturais.' }
    ],
    explanation:
      'A) CORRETA — as SBN usam ou imitam a natureza para gerar benefícios (proteção contra desastres, sequestro de carbono, água). B) ERRADA — SBN priorizam soluções verdes, não apenas cinzas (concreto). C) ERRADA — não implicam proibir toda atividade humana. D) ERRADA — são baseadas na natureza, por definição. E) ERRADA — contrariam a extração predatória.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021', type: 'ME', difficulty: 'MEDIO',
    statement: 'A Resolução CMN nº 4.945/2021 exige que as instituições financeiras estabeleçam uma Política de Responsabilidade:',
    options: [
      { text: 'Social, Ambiental e Climática (PRSAC).', correct: true },
      { text: 'apenas Comercial.' },
      { text: 'exclusivamente Tributária.' },
      { text: 'somente Trabalhista.' },
      { text: 'de Marketing Digital.' }
    ],
    explanation:
      'A) CORRETA — a Resolução instituiu a PRSAC, integrando riscos social, ambiental e climático à gestão das instituições. B)/C)/D)/E) ERRADAS — não correspondem ao objeto da norma.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Diversidade e inclusão: direitos humanos; interseccionalidade; inclusão de grupos vulnerabilizados', type: 'ME', difficulty: 'FACIL',
    statement: 'Uma prática efetiva de inclusão no ambiente de trabalho é:',
    options: [
      { text: 'adotar acessibilidade e ações afirmativas para grupos historicamente sub-representados.', correct: true },
      { text: 'padronizar a contratação apenas por indicação pessoal.' },
      { text: 'ignorar necessidades específicas de pessoas com deficiência.' },
      { text: 'restringir vagas a um único perfil.' },
      { text: 'eliminar qualquer política de diversidade.' }
    ],
    explanation:
      'A) CORRETA — acessibilidade e ações afirmativas promovem inclusão real de grupos sub-representados. B)/D) ERRADAS — indicação pessoal e perfil único reduzem a diversidade. C) ERRADA — ignorar acessibilidade exclui pessoas com deficiência. E) ERRADA — eliminar políticas de diversidade contraria a inclusão.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Desafios territoriais: questão urbana e regional; disparidades e segregação socioespacial', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A "segregação socioespacial", nas cidades, manifesta-se por:',
    options: [
      { text: 'a distribuição desigual de grupos sociais no território, com concentração de vulnerabilidades em certas áreas.', correct: true },
      { text: 'a completa igualdade de infraestrutura entre todos os bairros.' },
      { text: 'a ausência de qualquer diferença econômica entre regiões.' },
      { text: 'a distribuição homogênea de serviços públicos.' },
      { text: 'a eliminação das desigualdades urbanas.' }
    ],
    explanation:
      'A) CORRETA — a segregação socioespacial é a separação desigual de grupos no espaço urbano, com desvantagens concentradas. B)/C)/D)/E) ERRADAS — descrevem cenários de igualdade, opostos ao fenômeno da segregação.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Mudanças climáticas: causas e impactos; Acordo de Paris; PNMC (Lei nº 12.187/2009); NDC do Brasil', type: 'ME', difficulty: 'MEDIO',
    statement: 'O principal gás de efeito estufa associado à queima de combustíveis fósseis é o:',
    options: [
      { text: 'dióxido de carbono (CO2).', correct: true },
      { text: 'oxigênio (O2).' },
      { text: 'nitrogênio (N2).' },
      { text: 'hélio (He).' },
      { text: 'argônio (Ar).' }
    ],
    explanation:
      'A) CORRETA — o CO2 é o principal GEE emitido pela queima de combustíveis fósseis. B) ERRADA — o O2 não é gás de efeito estufa. C) ERRADA — o N2 compõe a maior parte do ar, mas não é o GEE em questão. D)/E) ERRADAS — hélio e argônio são gases nobres, não GEE relevantes.',
    source: S
  },
  {
    disciplineSlug: SUST, topic: 'Finanças sustentáveis: green bonds, títulos verdes, créditos de carbono, blended finance; taxonomia sustentável', type: 'ME', difficulty: 'MEDIO',
    statement: 'O "blended finance" (financiamento combinado ou misto) caracteriza-se por:',
    options: [
      { text: 'combinar recursos públicos/filantrópicos com capital privado para viabilizar projetos de desenvolvimento sustentável.', correct: true },
      { text: 'usar exclusivamente recursos de um único banco privado.' },
      { text: 'proibir a participação do setor privado.' },
      { text: 'financiar apenas projetos sem impacto social.' },
      { text: 'misturar diferentes moedas em uma conta.' }
    ],
    explanation:
      'A) CORRETA — blended finance combina capital concessional (público/filantrópico) com privado para mitigar riscos e atrair investimentos sustentáveis. B) ERRADA — a essência é combinar fontes, não uma só. C) ERRADA — busca justamente atrair o setor privado. D) ERRADA — visa impacto positivo. E) ERRADA — não se trata de câmbio de moedas.',
    source: S
  },

  // ════════════════════ Noções de Análise de Dados (+16) ════════════════════
  {
    disciplineSlug: NAD, topic: 'Dados e organizações: tipos de dados e de produtos de dados; organizações orientadas a dados; governança', type: 'ME', difficulty: 'FACIL',
    statement: 'A diferença entre dados ESTRUTURADOS e NÃO ESTRUTURADOS é que os estruturados:',
    options: [
      { text: 'são organizados em formato predefinido (ex.: tabelas de banco de dados).', correct: true },
      { text: 'nunca podem ser armazenados.' },
      { text: 'são sempre imagens e vídeos.' },
      { text: 'não podem ser consultados.' },
      { text: 'existem apenas em papel.' }
    ],
    explanation:
      'A) CORRETA — dados estruturados seguem um esquema definido (linhas/colunas), facilitando consulta. B) ERRADA — são armazenáveis (em SGBDs). C) ERRADA — imagens e vídeos são exemplos de NÃO estruturados. D) ERRADA — são justamente fáceis de consultar (SQL). E) ERRADA — existem em meio digital.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Dados e organizações: tipos de dados e de produtos de dados; organizações orientadas a dados; governança', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma organização "orientada a dados" (data-driven) caracteriza-se por:',
    options: [
      { text: 'basear suas decisões em análises de dados e evidências, não apenas em intuição.', correct: true },
      { text: 'ignorar completamente os dados disponíveis.' },
      { text: 'decidir exclusivamente por opinião pessoal do gestor.' },
      { text: 'proibir a coleta de dados.' },
      { text: 'eliminar indicadores de desempenho.' }
    ],
    explanation:
      'A) CORRETA — a cultura data-driven fundamenta decisões em dados e evidências. B)/C)/D)/E) ERRADAS — descrevem posturas contrárias a uma organização orientada a dados.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Indicadores de desempenho (KPIs): conceito e boas práticas; Ishikawa, Cinco Porquês e Pareto', type: 'ME', difficulty: 'MEDIO',
    statement: 'A técnica dos "Cinco Porquês" (5 Whys) é utilizada para:',
    options: [
      { text: 'identificar a causa raiz de um problema por meio de perguntas sucessivas.', correct: true },
      { text: 'calcular a média de um conjunto de dados.' },
      { text: 'criar gráficos de dispersão.' },
      { text: 'definir o preço de venda de um produto.' },
      { text: 'ordenar tarefas por prioridade financeira.' }
    ],
    explanation:
      'A) CORRETA — os 5 Porquês investigam a causa raiz perguntando "por quê?" repetidamente. B) ERRADA — média é cálculo estatístico. C) ERRADA — gráfico de dispersão é visualização, não análise de causa. D)/E) ERRADAS — não são finalidades da técnica.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Indicadores de desempenho (KPIs): conceito e boas práticas; Ishikawa, Cinco Porquês e Pareto', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O princípio de Pareto, aplicado à análise de problemas, sugere que:',
    options: [
      { text: 'cerca de 80% dos efeitos decorrem de aproximadamente 20% das causas.', correct: true },
      { text: 'todas as causas têm exatamente o mesmo peso.' },
      { text: '100% dos problemas vêm de uma única causa.' },
      { text: 'não é possível priorizar causas.' },
      { text: 'as causas menos frequentes são sempre as mais importantes.' }
    ],
    explanation:
      'A) CORRETA — a regra 80/20 indica que a maior parte dos efeitos vem de poucas causas vitais, orientando a priorização. B) ERRADA — Pareto justamente diferencia o peso das causas. C) ERRADA — não atribui tudo a uma só causa. D) ERRADA — a técnica serve para priorizar. E) ERRADA — o foco recai nas causas mais impactantes (as "poucas vitais").',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Coleta e preparação: outliers, dados faltantes, erros de tipo, viés de seleção; limpeza e validação', type: 'ME', difficulty: 'MEDIO',
    statement: 'O "viés de seleção" em uma análise de dados ocorre quando:',
    options: [
      { text: 'a amostra não representa adequadamente a população, distorcendo as conclusões.', correct: true },
      { text: 'todos os dados são coletados sem exceção.' },
      { text: 'a amostra é perfeitamente aleatória e representativa.' },
      { text: 'não há coleta de dados.' },
      { text: 'os dados são sempre numéricos.' }
    ],
    explanation:
      'A) CORRETA — o viés de seleção surge de uma amostra não representativa, levando a conclusões enviesadas. B) ERRADA — coletar tudo (censo) reduz o viés amostral. C) ERRADA — amostra representativa é o cenário SEM viés. D) ERRADA — sem coleta não há análise. E) ERRADA — o tipo do dado não define o viés de seleção.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Coleta e preparação: outliers, dados faltantes, erros de tipo, viés de seleção; limpeza e validação', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma abordagem comum para tratar "dados faltantes" (missing values) em um conjunto é:',
    options: [
      { text: 'imputar valores (ex.: média/mediana) ou remover registros, conforme o caso.', correct: true },
      { text: 'ignorar a qualidade dos dados totalmente.' },
      { text: 'duplicar aleatoriamente todos os registros.' },
      { text: 'converter todos os números em texto.' },
      { text: 'apagar a base inteira sempre.' }
    ],
    explanation:
      'A) CORRETA — imputação (média, mediana, moda, modelos) ou exclusão criteriosa são técnicas usuais para dados faltantes. B) ERRADA — a qualidade é o foco do tratamento. C)/D) ERRADAS — duplicar ou converter tipos não resolve valores ausentes. E) ERRADA — apagar toda a base é desproporcional.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas', type: 'ME', difficulty: 'FACIL',
    statement: 'O desvio padrão é uma medida de:',
    options: [
      { text: 'dispersão dos dados em torno da média.', correct: true },
      { text: 'posição central dos dados.' },
      { text: 'frequência absoluta.' },
      { text: 'correlação entre duas variáveis.' },
      { text: 'tendência temporal.' }
    ],
    explanation:
      'A) CORRETA — o desvio padrão mede a dispersão (variabilidade) em relação à média. B) ERRADA — posição central é dada por média, mediana e moda. C) ERRADA — frequência é contagem de ocorrências. D) ERRADA — correlação é medida por coeficientes (ex.: Pearson). E) ERRADA — tendência temporal é observada em séries no tempo.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas', type: 'ME', difficulty: 'MEDIO',
    statement: 'A afirmação de que "correlação não implica causalidade" significa que:',
    options: [
      { text: 'duas variáveis podem variar juntas sem que uma seja a causa da outra.', correct: true },
      { text: 'toda correlação prova uma relação de causa e efeito.' },
      { text: 'variáveis correlacionadas nunca têm relação alguma.' },
      { text: 'a causalidade dispensa qualquer análise.' },
      { text: 'correlação e causalidade são sinônimos.' }
    ],
    explanation:
      'A) CORRETA — associação estatística (correlação) não garante que uma variável cause a outra (pode haver terceira variável/coincidência). B)/E) ERRADAS — confundem correlação com causalidade. C) ERRADA — pode haver relação, apenas não necessariamente causal. D) ERRADA — a causalidade exige análise rigorosa (experimentos/controles).',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Visualização e storytelling: tipos de gráficos; boas práticas; narrativa com dados', type: 'ME', difficulty: 'MEDIO',
    statement: 'Para comparar a participação percentual de categorias em um total (ex.: composição de uma carteira), um gráfico adequado é o de:',
    options: [
      { text: 'setores (pizza) ou de barras empilhadas.', correct: true },
      { text: 'linha temporal apenas.' },
      { text: 'dispersão sem categorias.' },
      { text: 'histograma de uma variável contínua.' },
      { text: 'boxplot de outliers.' }
    ],
    explanation:
      'A) CORRETA — gráficos de setores (pizza) ou barras empilhadas mostram bem a composição/proporção de um todo. B) ERRADA — linha temporal é para evolução no tempo. C) ERRADA — dispersão relaciona variáveis numéricas. D) ERRADA — histograma mostra distribuição de frequência de uma variável. E) ERRADA — boxplot resume dispersão e outliers, não composição.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Visualização e storytelling: tipos de gráficos; boas práticas; narrativa com dados', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma boa prática na visualização de dados, para não distorcer a percepção do leitor, é:',
    options: [
      { text: 'usar escalas adequadas e evitar truncar o eixo de forma enganosa.', correct: true },
      { text: 'iniciar o eixo Y em valor arbitrário para exagerar diferenças.' },
      { text: 'usar o máximo de cores e efeitos 3D possível.' },
      { text: 'omitir os rótulos e a legenda.' },
      { text: 'sobrecarregar o gráfico com dados irrelevantes.' }
    ],
    explanation:
      'A) CORRETA — escalas honestas e eixos não truncados de forma enganosa preservam a leitura correta. B) ERRADA — truncar o eixo Y distorce a percepção (má prática). C) ERRADA — excesso de cores/3D confunde e distorce. D) ERRADA — omitir rótulos/legenda prejudica a compreensão. E) ERRADA — dados irrelevantes poluem o gráfico (baixa razão dado-tinta).',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Uso responsável de dados: LGPD aplicada; ética no uso de dados e IA', type: 'ME', difficulty: 'MEDIO',
    statement: 'Ao usar dados pessoais em uma análise, uma medida de conformidade com a LGPD é:',
    options: [
      { text: 'garantir base legal, finalidade específica e, quando possível, anonimização dos dados.', correct: true },
      { text: 'compartilhar os dados livremente com qualquer terceiro.' },
      { text: 'coletar o máximo de dados sem finalidade definida.' },
      { text: 'ignorar os direitos dos titulares.' },
      { text: 'reter os dados indefinidamente sem justificativa.' }
    ],
    explanation:
      'A) CORRETA — base legal, finalidade específica, minimização e anonimização são pilares de conformidade. B) ERRADA — o compartilhamento é limitado e condicionado. C) ERRADA — viola finalidade e necessidade. D) ERRADA — os direitos dos titulares devem ser respeitados. E) ERRADA — a retenção indefinida sem base contraria a LGPD.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação', type: 'ME', difficulty: 'MEDIO',
    statement: 'No CRISP-DM, a fase em que se verifica se o modelo construído atende aos objetivos de negócio, antes de colocá-lo em produção, é a de:',
    options: [
      { text: 'avaliação (evaluation).', correct: true },
      { text: 'entendimento do negócio.' },
      { text: 'preparação dos dados.' },
      { text: 'coleta inicial.' },
      { text: 'descarte dos dados.' }
    ],
    explanation:
      'A) CORRETA — a avaliação checa se o modelo cumpre os objetivos de negócio antes da implantação. B) ERRADA — o entendimento do negócio abre o ciclo. C) ERRADA — a preparação antecede a modelagem. D) ERRADA — a coleta ocorre no entendimento dos dados. E) ERRADA — "descarte" não é fase do CRISP-DM.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas', type: 'ME', difficulty: 'FACIL',
    statement: 'Em um conjunto ordenado de dados, o valor que divide a distribuição exatamente ao meio (50%) é a:',
    options: [
      { text: 'mediana.', correct: true },
      { text: 'média.' },
      { text: 'moda.' },
      { text: 'amplitude.' },
      { text: 'variância.' }
    ],
    explanation:
      'A) CORRETA — a mediana é o valor central que separa os 50% inferiores dos 50% superiores. B) ERRADA — a média é o valor médio aritmético. C) ERRADA — a moda é o valor mais frequente. D) ERRADA — a amplitude é a diferença entre máximo e mínimo. E) ERRADA — a variância mede dispersão.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Dados e organizações: tipos de dados e de produtos de dados; organizações orientadas a dados; governança', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A "governança de dados" em uma organização preocupa-se, principalmente, com:',
    options: [
      { text: 'políticas, papéis e responsabilidades para garantir qualidade, segurança e uso adequado dos dados.', correct: true },
      { text: 'a compra de servidores mais rápidos apenas.' },
      { text: 'a proibição total do uso de dados.' },
      { text: 'a coloração dos gráficos de relatórios.' },
      { text: 'o descarte imediato de todos os dados.' }
    ],
    explanation:
      'A) CORRETA — governança de dados define políticas, papéis (ex.: data steward), padrões de qualidade, segurança e conformidade. B) ERRADA — hardware é infraestrutura, não governança. C) ERRADA — governança viabiliza o uso responsável, não o proíbe. D) ERRADA — estética de gráfico não é governança. E) ERRADA — o descarte segue políticas de retenção, não é regra geral imediata.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Coleta e preparação: outliers, dados faltantes, erros de tipo, viés de seleção; limpeza e validação', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um "erro de tipo" (type error) na preparação de dados ocorre, por exemplo, quando:',
    options: [
      { text: 'um campo que deveria ser numérico contém texto (ex.: "abc" na coluna de idade).', correct: true },
      { text: 'todos os dados estão no formato correto.' },
      { text: 'a média é calculada corretamente.' },
      { text: 'um gráfico é bem formatado.' },
      { text: 'a base é devidamente documentada.' }
    ],
    explanation:
      'A) CORRETA — erro de tipo é a incompatibilidade entre o tipo esperado e o conteúdo real do campo (texto onde se espera número). B)/C)/D)/E) ERRADAS — descrevem situações corretas/desejáveis, não erros de tipo.',
    source: S
  },
  {
    disciplineSlug: NAD, topic: 'Uso responsável de dados: LGPD aplicada; ética no uso de dados e IA', type: 'ME', difficulty: 'MEDIO',
    statement: 'A "explicabilidade" (explainability) de modelos de IA é importante porque:',
    options: [
      { text: 'permite compreender e justificar como o modelo chega às suas decisões, favorecendo transparência e accountability.', correct: true },
      { text: 'aumenta a opacidade das decisões automatizadas.' },
      { text: 'dispensa qualquer supervisão humana.' },
      { text: 'garante que o modelo nunca erre.' },
      { text: 'elimina a necessidade de dados de qualidade.' }
    ],
    explanation:
      'A) CORRETA — a explicabilidade torna as decisões compreensíveis e auditáveis, essencial para confiança e responsabilização. B) ERRADA — é o oposto da opacidade. C) ERRADA — não dispensa supervisão humana. D) ERRADA — explicar não garante ausência de erros. E) ERRADA — dados de qualidade continuam indispensáveis.',
    source: S
  }
]
