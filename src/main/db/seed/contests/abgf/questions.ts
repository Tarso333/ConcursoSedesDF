// Base inicial de questões da ABGF 2026 — itens ORIGINAIS no estilo FCC
// (múltipla escolha, 5 alternativas), organizados por disciplina, tópico,
// dificuldade e tipo, com comentário. Não reproduz provas protegidas.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

export const ABGF_QUESTIONS: SeedQuestion[] = [
  // ───────── Língua Portuguesa ─────────
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Concordância verbal e nominal',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Está correta a concordância verbal em:',
    options: [
      { text: 'Fazem dez anos que a agência foi criada.' },
      { text: 'Houveram divergências na análise dos riscos.' },
      { text: 'Existem garantias que amparam a operação.', correct: true },
      { text: 'Tratam-se de operações de longo prazo.' },
      { text: 'Aluga-se salas para a filial.' }
    ],
    explanation:
      '"Existir" é verbo pessoal e concorda com o sujeito ("garantias"). "Fazer" (tempo) e "haver" (existir) são impessoais; "trata-se de" fica no singular; "alugam-se salas" (passiva sintética).',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Emprego do sinal indicativo de crase',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O sinal indicativo de crase está corretamente empregado em:',
    options: [
      { text: 'O relatório foi enviado à diretoria para análise.', correct: true },
      { text: 'Começaremos à trabalhar após o edital.' },
      { text: 'Entregou o parecer à ele ontem.' },
      { text: 'As operações foram analisadas à partir de critérios técnicos.' },
      { text: 'Fomos à um seminário sobre garantias.' }
    ],
    explanation:
      'Em "enviado à diretoria" há preposição "a" + artigo "a" (palavra feminina determinada). Não ocorre crase antes de verbo, pronome pessoal, artigo indefinido ou na locução "a partir de".',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Compreensão e interpretação de textos de gêneros variados',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Em um texto dissertativo, o conector "todavia" introduz, em relação ao enunciado anterior, ideia de:',
    options: [
      { text: 'causa' },
      { text: 'oposição', correct: true },
      { text: 'conclusão' },
      { text: 'condição' },
      { text: 'finalidade' }
    ],
    explanation: '"Todavia" é conjunção adversativa: introduz contraste/oposição, como "mas", "porém", "contudo", "entretanto".',
    source: S
  },

  // ───────── Língua Inglesa ─────────
  {
    disciplineSlug: 'lingua-inglesa',
    topic: 'Compreensão e interpretação de textos técnicos em língua inglesa',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'In the sentence "The export credit insurance covers losses arising from commercial and political risks", the word "arising" is closest in meaning to:',
    options: [
      { text: 'preventing' },
      { text: 'resulting', correct: true },
      { text: 'declining' },
      { text: 'insuring' },
      { text: 'exceeding' }
    ],
    explanation: '"Arising from" = "resulting from" (decorrentes de). O seguro cobre perdas RESULTANTES de riscos comerciais e políticos.',
    source: S
  },
  {
    disciplineSlug: 'lingua-inglesa',
    topic: 'Vocabulário técnico-financeiro em inglês',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No vocabulário técnico-financeiro em inglês, o termo "default" significa:',
    options: [
      { text: 'lucro extraordinário' },
      { text: 'inadimplência/descumprimento de obrigação', correct: true },
      { text: 'taxa de câmbio' },
      { text: 'garantia real' },
      { text: 'valor de mercado' }
    ],
    explanation: '"Default" designa o descumprimento de uma obrigação financeira (inadimplência) — conceito central em crédito e garantias.',
    source: S
  },

  // ───────── Raciocínio Lógico ─────────
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Equivalências lógicas; leis de De Morgan; implicações',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A negação da proposição "Se o fundo é público, então há supervisão" é:',
    options: [
      { text: 'Se o fundo não é público, então não há supervisão.' },
      { text: 'O fundo é público e não há supervisão.', correct: true },
      { text: 'O fundo não é público ou há supervisão.' },
      { text: 'Se há supervisão, então o fundo é público.' },
      { text: 'O fundo não é público e há supervisão.' }
    ],
    explanation: 'Negação do condicional: ~(p → q) ≡ p ∧ ~q — afirma o antecedente e nega o consequente.',
    source: S
  },
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Quantificadores; afirmações e negações',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A negação de "Todos os analistas conhecem SQL" é:',
    options: [
      { text: 'Nenhum analista conhece SQL.' },
      { text: 'Todos os analistas desconhecem SQL.' },
      { text: 'Pelo menos um analista não conhece SQL.', correct: true },
      { text: 'Alguns analistas conhecem SQL.' },
      { text: 'Existe analista que conhece SQL.' }
    ],
    explanation: 'A negação do quantificador universal ("todo A é B") é o existencial negativo: "algum A não é B".',
    source: S
  },
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Uma equipe conclui 40 chamados em 8 horas. Mantida a mesma produtividade, quantos chamados conclui em 14 horas?',
    options: [
      { text: '60' },
      { text: '64' },
      { text: '70', correct: true },
      { text: '72' },
      { text: '80' }
    ],
    explanation: 'Regra de três simples e direta: 40/8 = 5 chamados por hora → 5 × 14 = 70.',
    source: S
  },

  // ───────── Direito Constitucional e Administrativo ─────────
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Quanto ao regime de pessoal das empresas públicas federais, é correto afirmar que seus empregados:',
    options: [
      { text: 'são estatutários, com estabilidade após 3 anos.' },
      { text: 'são celetistas, admitidos por concurso público.', correct: true },
      { text: 'são celetistas, dispensados de concurso público.' },
      { text: 'ocupam cargos públicos efetivos regidos pela Lei nº 8.112/1990.' },
      { text: 'são contratados por tempo determinado, sem processo seletivo.' }
    ],
    explanation:
      'Empresas estatais têm pessoal regido pela CLT (empregos públicos), mas a admissão exige concurso público (art. 37, II, CF). Não há estabilidade estatutária.',
    source: S
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A revogação do ato administrativo:',
    options: [
      { text: 'decorre de vício de legalidade e opera efeitos retroativos.' },
      { text: 'pode ser realizada pelo Poder Judiciário no exercício da função jurisdicional.' },
      { text: 'funda-se em conveniência e oportunidade e opera efeitos ex nunc.', correct: true },
      { text: 'é obrigatória sempre que o ato for anulável.' },
      { text: 'atinge atos vinculados e direitos adquiridos.' }
    ],
    explanation:
      'Revogação = mérito (conveniência/oportunidade), pela própria Administração, efeitos ex nunc; anulação = ilegalidade, efeitos ex tunc. Atos vinculados e direitos adquiridos não se revogam.',
    source: S
  },

  // ───────── Ética, Governança e Compliance ─────────
  {
    disciplineSlug: 'etica-governanca-compliance',
    topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No modelo das três linhas, a auditoria interna posiciona-se como:',
    options: [
      { text: 'primeira linha, executando os controles do dia a dia.' },
      { text: 'segunda linha, monitorando riscos e compliance.' },
      { text: 'terceira linha, com avaliação independente e objetiva.', correct: true },
      { text: 'instância externa, equivalente à auditoria independente.' },
      { text: 'órgão de assessoria da primeira linha, sem independência.' }
    ],
    explanation:
      'A 1ª linha é a gestão operacional; a 2ª, as funções de riscos/compliance; a auditoria interna é a 3ª linha — avaliação independente que reporta à alta administração/conselho.',
    source: S
  },
  {
    disciplineSlug: 'etica-governanca-compliance',
    topic: 'PLD/FT: Lei nº 9.613/1998; GAFI/FATF; COAF; KYC/KYO; PEP; listas restritivas (OFAC, ONU, UE)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No âmbito da prevenção à lavagem de dinheiro, a sigla KYC refere-se a:',
    options: [
      { text: 'comunicação obrigatória de operações ao COAF.' },
      { text: 'procedimentos de conhecimento do cliente.', correct: true },
      { text: 'lista restritiva do Conselho de Segurança da ONU.' },
      { text: 'cadastro de pessoas politicamente expostas.' },
      { text: 'acordo internacional de troca de informações fiscais.' }
    ],
    explanation:
      'KYC (Know Your Customer — Conheça Seu Cliente) reúne procedimentos de identificação, qualificação e monitoramento do cliente, pilar do programa de PLD/FT.',
    source: S
  },
  {
    disciplineSlug: 'etica-governanca-compliance',
    topic: 'Anticorrupção: Lei nº 12.846/2013 e Decreto nº 11.129/2022; leniência; OCDE, FCPA e UK Bribery Act',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'A responsabilização das pessoas jurídicas prevista na Lei nº 12.846/2013 (Lei Anticorrupção) é:',
    options: [
      { text: 'subjetiva, dependente de comprovação de dolo dos dirigentes.' },
      { text: 'objetiva, nos âmbitos administrativo e civil.', correct: true },
      { text: 'exclusivamente penal.' },
      { text: 'aplicável apenas a empresas estatais.' },
      { text: 'afastada quando houver programa de integridade.' }
    ],
    explanation:
      'A Lei Anticorrupção estabelece responsabilização OBJETIVA (independe de culpa) administrativa e civil da pessoa jurídica; o programa de integridade atenua sanções, não as afasta.',
    source: S
  },

  // ───────── Proteção de Dados ─────────
  {
    disciplineSlug: 'protecao-dados-seguranca',
    topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Segundo a LGPD, o agente de tratamento que realiza o tratamento de dados EM NOME do controlador é o:',
    options: [
      { text: 'encarregado' },
      { text: 'operador', correct: true },
      { text: 'titular' },
      { text: 'controlador conjunto' },
      { text: 'agente da ANPD' }
    ],
    explanation:
      'Operador trata dados em nome do controlador (que toma as decisões). O encarregado (DPO) é o canal de comunicação entre controlador, titulares e ANPD.',
    source: S
  },
  {
    disciplineSlug: 'protecao-dados-seguranca',
    topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre as bases legais da LGPD, é correto afirmar:',
    options: [
      { text: 'o consentimento é a única base legal admitida.' },
      { text: 'o cumprimento de obrigação legal dispensa o consentimento do titular.', correct: true },
      { text: 'o legítimo interesse aplica-se inclusive a dados sensíveis.' },
      { text: 'dados anonimizados são considerados dados pessoais.' },
      { text: 'a execução de contrato exige consentimento específico.' }
    ],
    explanation:
      'Há dez bases legais autônomas (art. 7º); obrigação legal/regulatória é uma delas e independe de consentimento. Legítimo interesse NÃO vale para dados sensíveis (art. 11).',
    source: S
  },

  // ───────── Economia, SFN e Garantias ─────────
  {
    disciplineSlug: 'economia-financas-garantias',
    topic: 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No Seguro de Crédito à Exportação, a decretação de moratória ou a imposição de restrições à transferência de divisas pelo país do importador caracterizam risco:',
    options: [
      { text: 'comercial' },
      { text: 'político', correct: true },
      { text: 'operacional' },
      { text: 'cambial ordinário' },
      { text: 'de crédito privado' }
    ],
    explanation:
      'Atos de governo estrangeiro (moratória, restrição cambial, guerra) configuram risco POLÍTICO. A inadimplência/insolvência do importador é risco COMERCIAL.',
    source: S
  },
  {
    disciplineSlug: 'economia-financas-garantias',
    topic: 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O Fundo de Garantia à Exportação (FGE), instituído pela Lei nº 9.818/1999, destina-se a:',
    options: [
      { text: 'financiar diretamente a produção exportável de pequenas empresas.' },
      { text: 'dar cobertura às garantias prestadas pela União no Seguro de Crédito à Exportação.', correct: true },
      { text: 'garantir depósitos bancários até determinado limite.' },
      { text: 'estabilizar a taxa de câmbio em operações de comércio exterior.' },
      { text: 'substituir o resseguro privado no mercado doméstico.' }
    ],
    explanation:
      'O FGE é fundo de natureza contábil cuja finalidade é lastrear as coberturas do SCE concedidas em nome da União — principal instrumento de apoio soberano às exportações.',
    source: S
  },
  {
    disciplineSlug: 'economia-financas-garantias',
    topic: 'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No Sistema Financeiro Nacional, o órgão normativo máximo, responsável por formular a política da moeda e do crédito, é:',
    options: [
      { text: 'o Banco Central do Brasil' },
      { text: 'a Comissão de Valores Mobiliários' },
      { text: 'o Conselho Monetário Nacional', correct: true },
      { text: 'o Tesouro Nacional' },
      { text: 'a Superintendência de Seguros Privados' }
    ],
    explanation: 'O CMN é o órgão normativo do SFN; o BCB executa/supervisiona (bancos) e a CVM regula o mercado de valores mobiliários.',
    source: S
  },
  {
    disciplineSlug: 'economia-financas-garantias',
    topic: 'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'A operação pela qual o ressegurador transfere a outro ressegurador parte dos riscos que assumiu denomina-se:',
    options: [
      { text: 'cosseguro' },
      { text: 'retrocessão', correct: true },
      { text: 'stop loss' },
      { text: 'seguro facultativo' },
      { text: 'excedente de responsabilidade' }
    ],
    explanation:
      'Cadeia de pulverização do risco: seguro (segurado→seguradora) → resseguro (seguradora→ressegurador) → RETROCESSÃO (ressegurador→outro ressegurador). Cosseguro é a divisão do MESMO seguro entre seguradoras.',
    source: S
  },

  // ───────── Sustentabilidade / ASG ─────────
  {
    disciplineSlug: 'sustentabilidade-asg',
    topic: 'Finanças sustentáveis: green bonds, títulos verdes, créditos de carbono, blended finance; taxonomia sustentável',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Green bonds são:',
    options: [
      { text: 'créditos de carbono negociados em bolsa.' },
      { text: 'títulos de dívida cujos recursos se destinam a projetos com benefícios ambientais.', correct: true },
      { text: 'subsídios governamentais a energias renováveis.' },
      { text: 'ações de empresas do setor de saneamento.' },
      { text: 'linhas de crédito exclusivas para agricultura familiar.' }
    ],
    explanation:
      'Green bonds (títulos verdes) são instrumentos de dívida com destinação vinculada a projetos ambientais (energia limpa, transporte sustentável etc.).',
    source: S
  },
  {
    disciplineSlug: 'sustentabilidade-asg',
    topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'A Agenda 2030 da ONU estrutura-se em:',
    options: [
      { text: '8 Objetivos do Milênio' },
      { text: '17 Objetivos de Desenvolvimento Sustentável', correct: true },
      { text: '21 metas climáticas vinculantes' },
      { text: '12 princípios do Equador' },
      { text: '10 compromissos do Pacto Global' }
    ],
    explanation: 'A Agenda 2030 contém 17 ODS (e 169 metas), sucedendo os 8 Objetivos de Desenvolvimento do Milênio.',
    source: S
  },

  // ───────── Noções de Análise de Dados (CG) ─────────
  {
    disciplineSlug: 'nocoes-analise-dados',
    topic: 'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No CRISP-DM, a primeira etapa do ciclo de análise de dados é:',
    options: [
      { text: 'preparação dos dados' },
      { text: 'modelagem' },
      { text: 'entendimento do negócio', correct: true },
      { text: 'avaliação' },
      { text: 'implantação' }
    ],
    explanation:
      'O CRISP-DM inicia pelo ENTENDIMENTO DO NEGÓCIO (objetivos e requisitos), seguido de entendimento dos dados, preparação, modelagem, avaliação e implantação.',
    source: S
  },
  {
    disciplineSlug: 'nocoes-analise-dados',
    topic: 'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em um conjunto de salários com valores extremos muito altos (outliers), a medida de posição MENOS sensível a esses extremos é:',
    options: [
      { text: 'a média aritmética' },
      { text: 'a mediana', correct: true },
      { text: 'a variância' },
      { text: 'o desvio padrão' },
      { text: 'a amplitude' }
    ],
    explanation: 'A mediana depende da posição central, não dos valores extremos — por isso é robusta a outliers, ao contrário da média.',
    source: S
  },

  // ───────── Fundamentos de Sistemas e Redes ─────────
  {
    disciplineSlug: 'fundamentos-sistemas-redes',
    topic: 'Protocolos de transporte (TCP, UDP)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Comparando TCP e UDP, é correto afirmar que o TCP:',
    options: [
      { text: 'é orientado a conexão e garante entrega ordenada dos segmentos.', correct: true },
      { text: 'é mais rápido por dispensar confirmações.' },
      { text: 'é usado nas consultas comuns do DNS.' },
      { text: 'não realiza controle de congestionamento.' },
      { text: 'transmite sem estabelecer conexão prévia.' }
    ],
    explanation:
      'TCP: three-way handshake, confirmações, ordenação e controle de congestionamento (confiável). UDP: sem conexão e sem garantias — usado em DNS, streaming e DHCP.',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-sistemas-redes',
    topic: 'Modelo TCP/IP; endereçamento IPv4 e IPv6',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Os endereços IPv4 e IPv6 possuem, respectivamente:',
    options: [
      { text: '32 e 64 bits' },
      { text: '32 e 128 bits', correct: true },
      { text: '64 e 128 bits' },
      { text: '16 e 32 bits' },
      { text: '64 e 256 bits' }
    ],
    explanation: 'IPv4 = 32 bits (notação decimal pontuada); IPv6 = 128 bits (hexadecimal, grupos separados por ":").',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-sistemas-redes',
    topic: 'Complexidade de algoritmos',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'A busca binária em um vetor ORDENADO de n elementos possui complexidade de tempo, no pior caso, igual a:',
    options: [
      { text: 'O(1)' },
      { text: 'O(log n)', correct: true },
      { text: 'O(n)' },
      { text: 'O(n log n)' },
      { text: 'O(n²)' }
    ],
    explanation: 'A busca binária divide o espaço de busca pela metade a cada passo → O(log n). Exige o vetor previamente ordenado.',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-sistemas-redes',
    topic: 'Listas, pilhas, filas, vetores e matrizes',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A estrutura de dados que segue a política LIFO (último a entrar, primeiro a sair) é:',
    options: [
      { text: 'fila' },
      { text: 'pilha', correct: true },
      { text: 'árvore binária' },
      { text: 'tabela hash' },
      { text: 'lista circular' }
    ],
    explanation: 'Pilha = LIFO (push/pop no topo). Fila = FIFO (primeiro a entrar, primeiro a sair).',
    source: S
  },

  // ───────── Banco de Dados ─────────
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Modelo relacional; formas normais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Uma relação está na 3ª Forma Normal quando, além de atender à 2FN:',
    options: [
      { text: 'não possui atributos multivalorados.' },
      { text: 'não possui dependências transitivas de atributos não chave.', correct: true },
      { text: 'não possui dependências parciais da chave composta.' },
      { text: 'possui apenas chaves simples.' },
      { text: 'todas as dependências são multivaloradas.' }
    ],
    explanation:
      '1FN: atributos atômicos; 2FN: elimina dependência PARCIAL; 3FN: elimina dependência TRANSITIVA (atributo não chave dependendo de outro não chave).',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Consultas, junções e subconsultas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Em SQL, para retornar TODAS as linhas da tabela A e apenas as correspondências existentes na tabela B, utiliza-se:',
    options: [
      { text: 'INNER JOIN' },
      { text: 'LEFT JOIN', correct: true },
      { text: 'CROSS JOIN' },
      { text: 'FULL JOIN' },
      { text: 'SELF JOIN' }
    ],
    explanation:
      'LEFT (OUTER) JOIN preserva todas as linhas da tabela à esquerda (A), preenchendo com NULL quando não há correspondência em B.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O repositório que armazena dados BRUTOS, em formato nativo (estruturados ou não), para uso analítico posterior, é o:',
    options: [
      { text: 'Data Warehouse' },
      { text: 'Data Mart' },
      { text: 'Data Lake', correct: true },
      { text: 'OLTP' },
      { text: 'CMDB' }
    ],
    explanation:
      'Data Lake guarda dados brutos em formato nativo (schema-on-read). O DW armazena dados integrados e modelados (schema-on-write); Data Mart é um recorte departamental do DW.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'NoSQL: tipos e casos de uso',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Para armazenar sessões de usuário com acesso ultrarrápido por chave, o tipo de banco NoSQL mais adequado é:',
    options: [
      { text: 'orientado a grafos' },
      { text: 'chave-valor', correct: true },
      { text: 'colunar' },
      { text: 'relacional distribuído' },
      { text: 'orientado a documentos com esquema rígido' }
    ],
    explanation: 'Bancos chave-valor (ex.: Redis) oferecem leitura/escrita O(1) por chave — caso clássico: cache e sessões.',
    source: S
  },

  // ───────── Segurança e Cibersegurança ─────────
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'Código malicioso: vírus, worm, trojan, ransomware, spyware, keylogger, rootkit',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O código malicioso que cifra os arquivos da vítima e exige pagamento para restabelecer o acesso é o:',
    options: [
      { text: 'worm' },
      { text: 'ransomware', correct: true },
      { text: 'keylogger' },
      { text: 'rootkit' },
      { text: 'adware' }
    ],
    explanation:
      'Ransomware sequestra dados por criptografia e exige resgate. Worm se autopropaga; keylogger captura teclas; rootkit oculta a presença do invasor.',
    source: S
  },
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'SAML2, OAuth2, OpenID Connect e JWT',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Sobre os protocolos de autenticação e autorização, é correto afirmar:',
    options: [
      { text: 'OAuth2 é um protocolo de AUTORIZAÇÃO delegada; OpenID Connect adiciona a camada de autenticação sobre ele.', correct: true },
      { text: 'JWT é um protocolo de autenticação que substitui o OAuth2.' },
      { text: 'SAML2 destina-se exclusivamente a APIs REST.' },
      { text: 'OpenID Connect é o componente de autorização do SAML2.' },
      { text: 'RBAC é um protocolo de federação de identidades.' }
    ],
    explanation:
      'OAuth2 delega AUTORIZAÇÃO (acesso a recursos); OIDC acrescenta AUTENTICAÇÃO (id_token). JWT é formato de token; SAML2 é federação via XML (comum em SSO corporativo); RBAC é modelo de controle de acesso.',
    source: S
  },
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'Segurança ofensiva (noções): OWASP Top 10; testes de segurança e gestão de vulnerabilidades',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O ataque em que comandos SQL maliciosos são inseridos em campos de entrada para manipular o banco de dados é conhecido como:',
    options: [
      { text: 'Cross-Site Scripting (XSS)' },
      { text: 'SQL Injection', correct: true },
      { text: 'CSRF' },
      { text: 'DNS spoofing' },
      { text: 'buffer overflow' }
    ],
    explanation:
      'SQL Injection explora entradas não sanitizadas para executar SQL arbitrário — presença constante no OWASP Top 10 (categoria Injection). Prevenção: consultas parametrizadas.',
    source: S
  },
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'Bases de conhecimento: CVE, NVD e CVSS',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O CVSS (Common Vulnerability Scoring System) tem por finalidade:',
    options: [
      { text: 'catalogar identificadores únicos de vulnerabilidades.' },
      { text: 'atribuir pontuação de severidade a vulnerabilidades.', correct: true },
      { text: 'listar malwares conhecidos e suas assinaturas.' },
      { text: 'certificar fornecedores de software seguro.' },
      { text: 'registrar incidentes reportados à autoridade nacional.' }
    ],
    explanation:
      'CVE identifica (catálogo); NVD é a base que enriquece os CVEs; CVSS pontua a SEVERIDADE (0–10), orientando a priorização da correção.',
    source: S
  },

  // ───────── Engenharia de Software ─────────
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na programação orientada a objetos, o mecanismo pelo qual uma subclasse redefine o comportamento de um método herdado é:',
    options: [
      { text: 'encapsulamento' },
      { text: 'polimorfismo (sobrescrita)', correct: true },
      { text: 'composição' },
      { text: 'abstração de dados' },
      { text: 'injeção de dependências' }
    ],
    explanation:
      'A sobrescrita (override) é expressão do polimorfismo: o mesmo método assume comportamentos diferentes conforme a classe concreta do objeto.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Microsserviços; orientação a eventos; serverless; MVC',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em relação ao estilo arquitetural de microsserviços, é correto afirmar:',
    options: [
      { text: 'todos os serviços compartilham obrigatoriamente o mesmo banco de dados.' },
      { text: 'cada serviço é implantável de forma independente e se comunica por interfaces leves.', correct: true },
      { text: 'a arquitetura elimina a necessidade de monitoramento.' },
      { text: 'o acoplamento entre serviços é maior que no monólito.' },
      { text: 'é sinônimo de arquitetura em camadas MVC.' }
    ],
    explanation:
      'Microsserviços: serviços pequenos, autônomos, com deploy independente e dados próprios, comunicando-se por APIs/eventos — reduzem acoplamento, mas aumentam a complexidade operacional.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Integração de sistemas: APIs REST; API gateway; integração síncrona/assíncrona; segurança de APIs',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em uma API REST, o método HTTP idempotente adequado para SUBSTITUIR integralmente um recurso existente é:',
    options: [
      { text: 'POST' },
      { text: 'PUT', correct: true },
      { text: 'PATCH' },
      { text: 'OPTIONS' },
      { text: 'HEAD' }
    ],
    explanation:
      'PUT substitui o recurso por completo e é idempotente (repetir produz o mesmo estado). POST cria (não idempotente); PATCH altera parcialmente.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O teste que verifica isoladamente o menor componente testável do código (ex.: uma função) é o teste:',
    options: [
      { text: 'de integração' },
      { text: 'unitário', correct: true },
      { text: 'de carga' },
      { text: 'de aceitação' },
      { text: 'exploratório' }
    ],
    explanation: 'Teste unitário exercita a menor unidade isoladamente (com mocks/stubs); integração verifica a interação entre módulos.',
    source: S
  },

  // ───────── Nuvem e Infraestrutura ─────────
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Modelos de serviço: IaaS, PaaS e SaaS',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No modelo de serviço em nuvem no qual o cliente gerencia apenas suas aplicações e dados, sem administrar servidores, sistema operacional ou runtime, tem-se:',
    options: [
      { text: 'IaaS' },
      { text: 'PaaS', correct: true },
      { text: 'SaaS' },
      { text: 'nuvem privada' },
      { text: 'colocation' }
    ],
    explanation:
      'PaaS: a plataforma (SO, runtime, middleware) é do provedor; o cliente cuida da aplicação e dos dados. No IaaS o cliente administra do SO para cima; no SaaS apenas usa.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Contêineres e orquestração: Docker; Kubernetes',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No Kubernetes, a menor unidade implantável, que pode conter um ou mais contêineres, é o:',
    options: [
      { text: 'node' },
      { text: 'pod', correct: true },
      { text: 'cluster' },
      { text: 'service' },
      { text: 'namespace' }
    ],
    explanation:
      'O Pod é a menor unidade de implantação do K8s (contêineres que compartilham rede/armazenamento). Deployments gerenciam réplicas de pods; Services dão endereço estável.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Backup: completo, incremental e diferencial; retenção e restauração',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Sobre estratégias de backup, o backup DIFERENCIAL copia:',
    options: [
      { text: 'apenas os dados alterados desde o último backup de qualquer tipo.' },
      { text: 'todos os dados alterados desde o último backup COMPLETO.', correct: true },
      { text: 'a totalidade dos dados a cada execução.' },
      { text: 'somente os arquivos de sistema.' },
      { text: 'os dados alterados desde o último incremental.' }
    ],
    explanation:
      'Diferencial: tudo desde o último COMPLETO (restauração = completo + último diferencial). Incremental: desde o último backup de QUALQUER tipo (restauração exige a cadeia inteira).',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na pilha de observabilidade moderna, a ferramenta tipicamente utilizada para VISUALIZAÇÃO de métricas em dashboards é:',
    options: [
      { text: 'Prometheus' },
      { text: 'Grafana', correct: true },
      { text: 'Ansible' },
      { text: 'GitLab' },
      { text: 'RAID' }
    ],
    explanation:
      'Prometheus coleta/armazena métricas (séries temporais); Grafana visualiza em dashboards; Elasticsearch indexa logs; Zabbix é monitoramento tradicional de infraestrutura.',
    source: S
  },

  // ───────── DevOps ─────────
  {
    disciplineSlug: 'devops-cicd',
    topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A prática de integrar o código com frequência, executando build e testes automatizados a cada alteração, denomina-se:',
    options: [
      { text: 'entrega contínua' },
      { text: 'integração contínua', correct: true },
      { text: 'implantação azul-verde' },
      { text: 'infraestrutura como código' },
      { text: 'versionamento semântico' }
    ],
    explanation:
      'CI = integração frequente + build/testes automáticos a cada commit, detectando defeitos cedo. CD (delivery) mantém o artefato sempre pronto para produção.',
    source: S
  },
  {
    disciplineSlug: 'devops-cicd',
    topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No Git, o comando que integra as alterações de um branch em outro é:',
    options: [
      { text: 'git clone' },
      { text: 'git merge', correct: true },
      { text: 'git status' },
      { text: 'git stash' },
      { text: 'git tag' }
    ],
    explanation: 'git merge incorpora o histórico de um branch no branch atual. clone copia repositório; stash guarda alterações temporárias.',
    source: S
  },
  {
    disciplineSlug: 'devops-cicd',
    topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na Infraestrutura como Código, a abordagem DECLARATIVA caracteriza-se por:',
    options: [
      { text: 'descrever o ESTADO desejado, deixando à ferramenta o caminho para alcançá-lo.', correct: true },
      { text: 'listar passo a passo os comandos a executar.' },
      { text: 'exigir intervenção manual a cada mudança.' },
      { text: 'ser exclusiva de ambientes on-premises.' },
      { text: 'dispensar controle de versão dos arquivos.' }
    ],
    explanation:
      'Declarativo = descreve O QUE se quer (estado final) — a ferramenta converge; imperativo = COMO fazer (sequência de comandos). IaC versionada é reprodutível e auditável.',
    source: S
  },

  // ───────── Dados, ML e IA ─────────
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Noções de aprendizado de máquina',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Agrupar clientes por similaridade de comportamento, SEM rótulos previamente conhecidos, é tarefa típica de:',
    options: [
      { text: 'classificação supervisionada' },
      { text: 'regressão linear' },
      { text: 'agrupamento (clustering) não supervisionado', correct: true },
      { text: 'aprendizado por reforço' },
      { text: 'séries temporais' }
    ],
    explanation:
      'Sem rótulos = aprendizado NÃO supervisionado; agrupar por similaridade = clustering (ex.: k-means). Classificação/regressão exigem dados rotulados.',
    source: S
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No contexto de modelos de linguagem (LLMs), o fenômeno de "alucinação" refere-se a:',
    options: [
      { text: 'interrupção do treinamento por falta de dados.' },
      { text: 'geração de conteúdo plausível, porém factualmente incorreto.', correct: true },
      { text: 'vazamento de dados pessoais do treinamento.' },
      { text: 'viés de seleção na amostra de treinamento.' },
      { text: 'sobreajuste aos dados de validação.' }
    ],
    explanation:
      'Alucinação: o modelo produz afirmações fluentes e convincentes sem base factual — risco central para governança e uso responsável de IA generativa.',
    source: S
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Um coeficiente de correlação linear r = −0,95 entre duas variáveis indica:',
    options: [
      { text: 'relação causal negativa comprovada.' },
      { text: 'forte associação linear inversa entre as variáveis.', correct: true },
      { text: 'ausência de relação entre as variáveis.' },
      { text: 'que 95% dos dados são outliers.' },
      { text: 'fraca associação positiva.' }
    ],
    explanation:
      '|r| próximo de 1 = associação linear forte; sinal negativo = inversa (uma sobe, outra desce). Correlação NÃO implica causalidade.',
    source: S
  },

  // ───────── Gestão de TI ─────────
  {
    disciplineSlug: 'gestao-ti',
    topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na ITIL v4, a prática cujo objetivo é RESTAURAR a operação normal do serviço o mais rapidamente possível é a gestão de:',
    options: [
      { text: 'problemas' },
      { text: 'incidentes', correct: true },
      { text: 'mudanças' },
      { text: 'configuração' },
      { text: 'capacidade' }
    ],
    explanation:
      'Incidente = interrupção/degradação não planejada; a gestão de incidentes restaura o serviço rápido. A gestão de problemas investiga a CAUSA RAIZ.',
    source: S
  },
  {
    disciplineSlug: 'gestao-ti',
    topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No framework Scrum, o evento com duração máxima fixa (time-box) destinado a planejar o trabalho da iteração é:',
    options: [
      { text: 'a Daily Scrum' },
      { text: 'o Sprint Planning', correct: true },
      { text: 'a Sprint Review' },
      { text: 'a Retrospectiva' },
      { text: 'o Refinamento do backlog' }
    ],
    explanation:
      'Sprint Planning abre a Sprint definindo objetivo e itens do backlog. Daily = sincronização diária (15min); Review = inspeção do incremento; Retrospectiva = melhoria do processo.',
    source: S
  },
  {
    disciplineSlug: 'gestao-ti',
    topic: 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Sobre a relação entre COBIT 2019 e ITIL, é correto afirmar que o COBIT:',
    options: [
      { text: 'substitui a ITIL na operação diária dos serviços.' },
      { text: 'foca a GOVERNANÇA de TI, enquanto a ITIL foca a gestão de serviços.', correct: true },
      { text: 'é um framework exclusivo de segurança da informação.' },
      { text: 'trata apenas de gerenciamento de projetos.' },
      { text: 'é incompatível com frameworks de mercado.' }
    ],
    explanation:
      'COBIT responde "o quê/por quê" (governança, objetivos de controle, avaliação); ITIL responde "como" (práticas operacionais de serviço). São complementares.',
    source: S
  }
]
