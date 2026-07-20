// Expansão da disciplina ENGENHARIA DE SOFTWARE — ABGF 2026 (FCC, E05).
// APENAS DADOS. Preenche os tópicos que ainda estavam em 0% de cobertura de
// conhecimento (SDLC, Padrões de Projeto, DDD, Microsserviços, Integração/APIs,
// Fundamentos de Linguagens, Linguagens/Frameworks, APF). Nomes de tópico
// EXATOS aos do currículo (casam com o seed idempotente por tópico).
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo FCC)'
const ES = 'engenharia-software'

const T_SDLC = 'Ciclo de vida de desenvolvimento (SDLC); levantamento, análise e especificação de requisitos'
const T_FUND = 'Fundamentos de linguagens: tipos de dados; estruturas de controle; modularização; programação assíncrona'
const T_PADROES = 'Padrões de projeto (design patterns)'
const T_DDD = 'Domain Driven Design (DDD); refatoração; débito técnico'
const T_MICRO = 'Microsserviços; orientação a eventos; serverless; MVC'
const T_INTEG = 'Integração de sistemas: APIs REST; API gateway; integração síncrona/assíncrona; segurança de APIs'
const T_LING = 'Linguagens e frameworks: Java, Python, JavaScript e PHP; frameworks web (conceitos)'
const T_APF = 'Análise de pontos de função e métricas de software (IFPUG/NESMA)'

// ───────────────────────── CONHECIMENTO ─────────────────────────
export const ABGF_ES_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: ES,
    topic: T_SDLC,
    entries: [
      {
        kind: 'RESUMO',
        title: 'SDLC e engenharia de requisitos',
        body:
          '# Ciclo de vida (SDLC)\n\n' +
          '| Modelo | Traço |\n| --- | --- |\n' +
          '| **Cascata** | fases sequenciais; requisitos congelados cedo; mudança cara |\n' +
          '| **Iterativo-incremental** | entrega em ciclos com feedback (base do ágil/RUP) |\n' +
          '| **Espiral** | dirigido a RISCO (análise de risco a cada volta) |\n' +
          '| **V** | cada fase de desenvolvimento tem uma fase de teste espelhada |\n\n' +
          '## Requisitos\n' +
          '- **Funcionais**: o que o sistema FAZ. **Não funcionais**: QUALIDADES (desempenho, segurança, usabilidade).\n' +
          '- Processo: elicitação → análise → especificação → validação → gerência.\n' +
          '- Elicitação: entrevista, workshop/JAD, observação, questionário, prototipação.'
      },
      { kind: 'CONCEITO', title: 'Requisito funcional × não funcional', body: '"Emitir apólice em PDF" = funcional. "Emitir em 3s, com criptografia" = não funcional (desempenho/segurança).' },
      { kind: 'DICA', body: 'Modelo em V = teste espelha cada fase; espiral = risco. "Análise de riscos a cada iteração" → ESPIRAL.' },
      { kind: 'PEGADINHA', body: '"Desempenho é requisito funcional porque o usuário percebe" — ERRADO: desempenho/segurança/usabilidade são NÃO funcionais.' },
      { kind: 'PALAVRA_CHAVE', title: 'cascata · espiral=risco · V=testes · funcional×não funcional' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_FUND,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Fundamentos de linguagens',
        body:
          '# Fundamentos de linguagens\n\n' +
          '- **Tipagem**: estática (checa em compilação: Java) × dinâmica (execução: Python/JS); forte × fraca.\n' +
          '- **Estruturas de controle**: sequência, seleção (if/switch), repetição (for/while).\n' +
          '- **Modularização**: dividir em funções/módulos/pacotes → coesão alta e acoplamento baixo; reúso e manutenção.\n' +
          '- **Programação assíncrona**: operações não bloqueantes (callbacks, Promises/async-await, futures) — não trava a thread esperando I/O.\n' +
          '- Paradigmas: imperativo, orientado a objetos, funcional, declarativo.'
      },
      { kind: 'CONCEITO', title: 'Coesão × acoplamento', body: 'Coesão alta (módulo faz UMA coisa bem) e acoplamento baixo (pouca dependência entre módulos) são o objetivo — facilitam manutenção e teste.' },
      { kind: 'PEGADINHA', body: '"Tipagem dinâmica verifica os tipos em tempo de compilação" — ERRADO: dinâmica verifica em EXECUÇÃO; estática é que verifica na compilação.' },
      { kind: 'PALAVRA_CHAVE', title: 'estática×dinâmica · async não bloqueante · coesão/acoplamento' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_PADROES,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Padrões GoF (foco FCC)',
        body:
          '# Padrões de projeto (GoF)\n\n' +
          '| Categoria | Padrões-chave | Gatilho |\n| --- | --- | --- |\n' +
          '| **Criacionais** (5) | Singleton, Factory Method, Abstract Factory, Builder, Prototype | "instância única"→Singleton; "famílias"→Abstract Factory |\n' +
          '| **Estruturais** (7) | Adapter, Facade, Decorator, Proxy, Composite, Bridge | "interface incompatível"→Adapter; "simplificar subsistema"→Facade |\n' +
          '| **Comportamentais** (11) | Observer, Strategy, Template Method, Command, State | "notificar dependentes"→Observer; "trocar algoritmo"→Strategy |\n\n' +
          'Decorator adiciona responsabilidade SEM herança (em runtime); Proxy controla o ACESSO ao objeto real.'
      },
      { kind: 'PEGADINHA', body: '"Observer é padrão criacional" — ERRADO: é comportamental. Adapter converte interface; Facade simplifica subsistema (não confundir).' },
      { kind: 'PALAVRA_CHAVE', title: 'criacional×estrutural×comportamental · Singleton/Adapter/Observer' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_DDD,
    entries: [
      {
        kind: 'RESUMO',
        title: 'DDD, refatoração e débito técnico',
        body:
          '# DDD\n' +
          '- **Linguagem ubíqua** (vocabulário único negócio↔código), **bounded context** (fronteira do modelo).\n' +
          '- Blocos táticos: **entidade** (identidade), **objeto de valor** (imutável, sem identidade), **agregado** (raiz garante consistência), **repositório**.\n\n' +
          '# Refatoração\n' +
          'Melhorar a ESTRUTURA interna SEM mudar o comportamento observável (com testes).\n\n' +
          '# Débito técnico\n' +
          'Custo futuro de escolhas rápidas de hoje; "paga juros" na manutenção.'
      },
      { kind: 'CONCEITO', title: 'Entidade × objeto de valor', body: 'Entidade tem IDENTIDADE (Apólice nº 123); objeto de valor é definido pelos atributos e imutável (CEP, dinheiro).' },
      { kind: 'PEGADINHA', body: '"Refatorar é corrigir bugs e adicionar features" — ERRADO: refatoração NÃO muda comportamento; mexe só na estrutura.' },
      { kind: 'PALAVRA_CHAVE', title: 'linguagem ubíqua · agregado · refatorar não muda comportamento' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_MICRO,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Microsserviços, eventos, serverless e MVC',
        body:
          '# Estilos arquiteturais\n\n' +
          '- **Monólito**: uma unidade de implantação; simples de operar.\n' +
          '- **Microsserviços**: serviços pequenos e independentes, **dados próprios (database per service)**, deploy separado; custo = complexidade distribuída.\n' +
          '- **Orientado a eventos**: componentes reagem a eventos via broker (pub/sub); desacoplamento temporal.\n' +
          '- **Serverless (FaaS)**: funções sob demanda, escala automática, paga por execução; atenção a cold start.\n' +
          '- **MVC**: Model (dados/regra), View (apresentação), Controller (orquestra a entrada).'
      },
      { kind: 'PEGADINHA', body: '"Em microsserviços, os serviços compartilham o mesmo banco" — ERRADO: cada serviço é dono dos seus dados; compartilhar banco recria o acoplamento.' },
      { kind: 'PALAVRA_CHAVE', title: 'database per service · pub/sub · FaaS · MVC' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_INTEG,
    entries: [
      {
        kind: 'RESUMO',
        title: 'REST, API gateway e segurança de APIs',
        body:
          '# Integração de sistemas\n\n' +
          '## REST\n' +
          'Estilo ARQUITETURAL sobre HTTP, **stateless**. Verbos: GET (ler, idempotente), POST (criar, NÃO idempotente), PUT (substituir, idempotente), PATCH, DELETE (idempotente). Códigos: 200, 201, 204, 400, **401 (não autenticado) × 403 (sem permissão)**, 404, 500.\n\n' +
          '## SOAP × REST\n' +
          'SOAP = protocolo, envelope XML, contrato WSDL. REST = estilo, JSON/qualquer mídia, OpenAPI.\n\n' +
          '## API Gateway\n' +
          'Ponto único de entrada: roteamento, autenticação, **rate limiting**, agregação, observabilidade.\n\n' +
          '## Segurança de APIs\n' +
          'OAuth2 (autorização) + OpenID Connect (autenticação); JWT; HTTPS/TLS; rate limiting contra abuso.\n\n' +
          '## Síncrono × assíncrono\n' +
          'Síncrono (REST request/response) espera a resposta; assíncrono (mensageria/eventos) desacopla no tempo.'
      },
      { kind: 'CONCEITO', title: 'Idempotência', body: 'Operação idempotente produz o mesmo efeito 1 ou N vezes. GET/PUT/DELETE são idempotentes; POST não.' },
      { kind: 'DICA', body: '401 = não autenticado (quem é você?); 403 = autenticado, mas sem permissão. OAuth2 autoriza; OIDC autentica.' },
      { kind: 'PEGADINHA', body: '"REST é um protocolo baseado em XML" — ERRADO: REST é ESTILO arquitetural e usa tipicamente JSON; protocolo XML é o SOAP.' },
      { kind: 'PALAVRA_CHAVE', title: 'REST stateless · verbos idempotentes · gateway · OAuth2/OIDC' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_LING,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Linguagens e frameworks web',
        body:
          '# Linguagens e frameworks\n\n' +
          '- **Java**: compilada para bytecode (JVM), tipagem estática forte; frameworks Spring/Spring Boot.\n' +
          '- **Python**: interpretada, tipagem dinâmica; Django/Flask/FastAPI; forte em dados/IA.\n' +
          '- **JavaScript**: linguagem da web no navegador (e no servidor via Node.js); React/Angular/Vue (front), Express (back).\n' +
          '- **PHP**: web server-side; Laravel/Symfony.\n\n' +
          '## Framework × biblioteca\n' +
          'No **framework**, o controle é dele (Inversão de Controle: "não me chame, eu chamo você"); a **biblioteca** você chama quando quer.\n' +
          '## MVC nos frameworks web\n' +
          'A maioria organiza a aplicação em Model-View-Controller; ORMs mapeiam objetos ↔ tabelas.'
      },
      { kind: 'PEGADINHA', body: '"Biblioteca e framework são a mesma coisa" — ERRADO: no framework há INVERSÃO DE CONTROLE (ele chama seu código); a biblioteca é chamada por você.' },
      { kind: 'PALAVRA_CHAVE', title: 'Java/JVM · Python dados · JS web · IoC framework×lib' }
    ]
  },
  {
    disciplineSlug: ES,
    topic: T_APF,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Análise de Pontos de Função (IFPUG/NESMA)',
        body:
          '# APF\n\n' +
          'Mede o TAMANHO FUNCIONAL pela ótica do usuário — independe de tecnologia.\n\n' +
          '## 5 tipos de função\n' +
          '- Dados: **ALI** (Arquivo Lógico Interno — mantido pela aplicação) e **AIE** (Arquivo de Interface Externa — só referenciado).\n' +
          '- Transações: **EE** (Entrada Externa — altera ALI), **SE** (Saída Externa — com processamento/derivação) e **CE** (Consulta Externa — recuperação simples).\n\n' +
          'Complexidade (baixa/média/alta) → pontos; NESMA é compatível com IFPUG.'
      },
      { kind: 'DICA', body: 'SE × CE: com CÁLCULO/dado derivado → SE; recuperação direta → CE. ALI = mantido DENTRO; AIE = só lido de FORA.' },
      { kind: 'PEGADINHA', body: '"APF mede o esforço em horas" — ERRADO: mede TAMANHO funcional; esforço deriva depois (produtividade × pontos).' },
      { kind: 'PALAVRA_CHAVE', title: 'ALI · AIE · EE · SE · CE · tamanho funcional' }
    ]
  }
]

// ───────────────────────── QUESTÕES (estilo FCC) ─────────────────────────
export const ABGF_ES_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ES, topic: T_SDLC, type: 'ME', difficulty: 'MEDIO',
    statement: 'O modelo de ciclo de vida de software caracterizado pela análise de riscos ao final de cada iteração (volta) é o modelo:',
    options: [
      { text: 'cascata.' }, { text: 'espiral.', correct: true }, { text: 'em V.' }, { text: 'incremental puro.' }, { text: 'big bang.' }
    ],
    explanation: 'CORRETA: "b". O modelo ESPIRAL é dirigido a risco: cada volta inclui análise de riscos. "a" é sequencial; "c" espelha testes por fase; "d" entrega incrementos sem foco em risco; "e" não é modelo estruturado.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_SDLC, type: 'ME', difficulty: 'FACIL',
    statement: 'A exigência de que "o sistema esteja disponível 99,9% do tempo" classifica-se como requisito:',
    options: [
      { text: 'funcional.' }, { text: 'não funcional (disponibilidade).', correct: true }, { text: 'de negócio.' }, { text: 'de domínio.' }, { text: 'de interface.' }
    ],
    explanation: 'CORRETA: "b". Disponibilidade é atributo de QUALIDADE → requisito não funcional. Funcional descreveria uma função executada pelo sistema.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_FUND, type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre tipagem em linguagens de programação, é correto afirmar que a tipagem dinâmica:',
    options: [
      { text: 'verifica os tipos em tempo de compilação.' },
      { text: 'verifica os tipos em tempo de execução, como em Python e JavaScript.', correct: true },
      { text: 'impede a existência de variáveis.' },
      { text: 'é exclusiva de linguagens compiladas.' },
      { text: 'elimina a necessidade de estruturas de controle.' }
    ],
    explanation: 'CORRETA: "b". Tipagem dinâmica resolve tipos em EXECUÇÃO (Python, JS). "a" descreve a estática (Java); "c"/"d"/"e" são falsas.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_PADROES, type: 'ME', difficulty: 'MEDIO',
    statement: 'O padrão de projeto adequado para garantir que uma classe tenha uma única instância, com ponto de acesso global, é o:',
    options: [
      { text: 'Factory Method.' }, { text: 'Singleton.', correct: true }, { text: 'Observer.' }, { text: 'Adapter.' }, { text: 'Strategy.' }
    ],
    explanation: 'CORRETA: "b". Singleton assegura instância única e acesso global. Factory Method cria objetos por subclasses; Observer notifica dependentes; Adapter converte interface; Strategy troca algoritmos.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_PADROES, type: 'ME', difficulty: 'DIFICIL',
    statement: 'Para adicionar responsabilidades a um objeto dinamicamente, em tempo de execução, sem usar herança, aplica-se o padrão:',
    options: [
      { text: 'Decorator.', correct: true }, { text: 'Facade.' }, { text: 'Proxy.' }, { text: 'Composite.' }, { text: 'Builder.' }
    ],
    explanation: 'CORRETA: "a". Decorator agrega comportamento em runtime, envolvendo o objeto, sem herança. Facade simplifica subsistema; Proxy controla acesso; Composite trata árvores; Builder constrói objetos complexos.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_DDD, type: 'ME', difficulty: 'MEDIO',
    statement: 'No Domain-Driven Design, o objeto que NÃO possui identidade própria e é definido apenas por seus atributos, sendo imutável, é denominado:',
    options: [
      { text: 'entidade.' }, { text: 'objeto de valor (value object).', correct: true }, { text: 'agregado.' }, { text: 'repositório.' }, { text: 'serviço de domínio.' }
    ],
    explanation: 'CORRETA: "b". Objeto de valor é imutável e sem identidade (ex.: CEP, dinheiro). Entidade tem identidade; agregado é o conjunto com raiz; repositório persiste a raiz; serviço de domínio contém regra sem estado.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_DDD, type: 'ME', difficulty: 'FACIL',
    statement: 'Refatoração de código é corretamente definida como:',
    options: [
      { text: 'a correção de defeitos identificados em produção.' },
      { text: 'a melhoria da estrutura interna do código sem alterar seu comportamento externo.', correct: true },
      { text: 'a adição de novas funcionalidades ao sistema.' },
      { text: 'a reescrita total do sistema em outra linguagem.' },
      { text: 'a documentação dos requisitos do software.' }
    ],
    explanation: 'CORRETA: "b". Refatorar melhora o design interno MANTENDO o comportamento observável. Corrigir bug ("a") e adicionar feature ("c") mudam o comportamento; "d"/"e" são outras atividades.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_MICRO, type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a característica essencial da arquitetura de microsserviços:',
    options: [
      { text: 'um banco de dados único compartilhado por todos os serviços.' },
      { text: 'serviços autônomos e independentes, cada um responsável pelos próprios dados.', correct: true },
      { text: 'implantação única e monolítica.' },
      { text: 'comunicação obrigatoriamente síncrona.' },
      { text: 'ausência de necessidade de monitoramento.' }
    ],
    explanation: 'CORRETA: "b". Autonomia + database per service definem microsserviços. "a"/"c" recriam o monólito; "d" mensageria assíncrona é comum; "e" observabilidade é mais crítica.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_MICRO, type: 'ME', difficulty: 'MEDIO',
    statement: 'O modelo de computação em que o provedor executa funções sob demanda, com escala automática e cobrança por execução, sem gerenciamento de servidores pelo desenvolvedor, é conhecido como:',
    options: [
      { text: 'monólito.' }, { text: 'serverless (FaaS).', correct: true }, { text: 'MVC.' }, { text: 'cliente-servidor tradicional.' }, { text: 'peer-to-peer.' }
    ],
    explanation: 'CORRETA: "b". Serverless/FaaS executa funções sob demanda com escala automática e cobrança por uso. Os demais não correspondem a essa definição.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_INTEG, type: 'ME', difficulty: 'MEDIO',
    statement: 'Em uma API REST, os códigos de status HTTP 401 e 403 indicam, respectivamente:',
    options: [
      { text: 'recurso não encontrado e erro interno.' },
      { text: 'não autenticado (falta identificação) e autenticado, porém sem permissão.', correct: true },
      { text: 'sucesso e redirecionamento.' },
      { text: 'requisição malformada e recurso criado.' },
      { text: 'sem permissão e não autenticado.' }
    ],
    explanation: 'CORRETA: "b". 401 = não autenticado; 403 = autenticado, mas sem permissão. "e" inverte os dois; "a"/"c"/"d" descrevem outros códigos (404/500, 2xx/3xx, 400/201).',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_INTEG, type: 'ME', difficulty: 'DIFICIL',
    statement: 'Sobre a idempotência dos verbos HTTP em APIs REST, é correto afirmar que:',
    options: [
      { text: 'POST é idempotente e GET não é.' },
      { text: 'GET, PUT e DELETE são idempotentes; POST não é.', correct: true },
      { text: 'nenhum verbo HTTP é idempotente.' },
      { text: 'todos os verbos HTTP são idempotentes.' },
      { text: 'apenas o PATCH é idempotente.' }
    ],
    explanation: 'CORRETA: "b". GET (leitura), PUT (substituição) e DELETE são idempotentes (repetir gera o mesmo estado); POST cria recurso a cada chamada, logo NÃO é idempotente.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_INTEG, type: 'ME', difficulty: 'MEDIO',
    statement: 'O componente que atua como ponto único de entrada para um conjunto de APIs, cuidando de roteamento, autenticação e limitação de taxa (rate limiting), é o:',
    options: [
      { text: 'load balancer de banco de dados.' }, { text: 'API gateway.', correct: true }, { text: 'servidor DNS.' }, { text: 'proxy reverso de arquivos estáticos.' }, { text: 'message broker.' }
    ],
    explanation: 'CORRETA: "b". O API gateway centraliza roteamento, segurança, rate limiting, agregação e observabilidade das APIs — essencial em microsserviços. Os demais têm outras funções.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_LING, type: 'ME', difficulty: 'MEDIO',
    statement: 'A principal diferença entre um framework e uma biblioteca está no conceito de:',
    options: [
      { text: 'linguagem de programação utilizada.' },
      { text: 'inversão de controle: no framework, é ele quem chama o código do desenvolvedor.', correct: true },
      { text: 'quantidade de linhas de código.' },
      { text: 'licença de software.' },
      { text: 'velocidade de execução.' }
    ],
    explanation: 'CORRETA: "b". No framework há INVERSÃO DE CONTROLE (ele chama seu código — "não me chame, eu chamo você"); a biblioteca é invocada pelo desenvolvedor. Os demais itens não definem a distinção.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_APF, type: 'ME', difficulty: 'DIFICIL',
    statement: 'Na Análise de Pontos de Função (IFPUG), um arquivo de dados mantido dentro da fronteira da aplicação pelos seus processos elementares é classificado como:',
    options: [
      { text: 'AIE — Arquivo de Interface Externa.' }, { text: 'ALI — Arquivo Lógico Interno.', correct: true }, { text: 'EE — Entrada Externa.' }, { text: 'SE — Saída Externa.' }, { text: 'CE — Consulta Externa.' }
    ],
    explanation: 'CORRETA: "b". ALI é MANTIDO pela aplicação; AIE é apenas referenciado (mantido por outra). EE/SE/CE são funções de transação.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_APF, type: 'ME', difficulty: 'MEDIO',
    statement: 'Na APF, uma função de transação que recupera dados sem realizar cálculos ou criar dados derivados é classificada como:',
    options: [
      { text: 'Entrada Externa (EE).' }, { text: 'Saída Externa (SE).' }, { text: 'Consulta Externa (CE).', correct: true }, { text: 'Arquivo Lógico Interno (ALI).' }, { text: 'Arquivo de Interface Externa (AIE).' }
    ],
    explanation: 'CORRETA: "c". CE é recuperação SIMPLES de dados (sem cálculo/derivação). A SE envolve processamento/dado derivado; EE altera ALI; ALI/AIE são funções de dados, não de transação.',
    source: S
  },
  {
    disciplineSlug: ES, topic: T_FUND, type: 'ME', difficulty: 'MEDIO',
    statement: 'A programação assíncrona, presente em construções como Promises e async/await, tem como principal benefício:',
    options: [
      { text: 'garantir a execução sequencial e bloqueante das operações.' },
      { text: 'evitar o bloqueio da thread durante operações de I/O, melhorando a responsividade.', correct: true },
      { text: 'eliminar a necessidade de tratamento de erros.' },
      { text: 'converter linguagens dinâmicas em estáticas.' },
      { text: 'dispensar o uso de estruturas de controle.' }
    ],
    explanation: 'CORRETA: "b". O assíncrono não bloqueia a thread enquanto espera I/O, aumentando a responsividade/escala. "a" é o oposto; "c"/"d"/"e" são falsas.',
    source: S
  }
]

// ───────────────────────── FLASHCARDS ─────────────────────────
export const ABGF_ES_DECKS: SeedStarterDeck[] = [
  {
    name: 'ABGF — Engenharia de Software (expansão)',
    disciplineSlug: ES,
    description: 'SDLC, padrões, DDD, microsserviços, APIs e APF — no estilo FCC.',
    cards: [
      { front: 'Modelo espiral', back: 'Dirigido a RISCO: análise de riscos a cada iteração/volta.', topic: { disciplineSlug: ES, topic: T_SDLC } },
      { front: 'Modelo em V', back: 'Cada fase de desenvolvimento tem uma fase de TESTE espelhada.', topic: { disciplineSlug: ES, topic: T_SDLC } },
      { front: 'Requisito funcional × não funcional', back: 'Funcional = o que o sistema faz. Não funcional = qualidade (desempenho, segurança, disponibilidade).', topic: { disciplineSlug: ES, topic: T_SDLC } },
      { front: 'Tipagem estática × dinâmica', back: 'Estática: checa tipos na compilação (Java). Dinâmica: em execução (Python, JS).', topic: { disciplineSlug: ES, topic: T_FUND } },
      { front: 'Coesão × acoplamento', back: 'Alta coesão (faz uma coisa bem) + baixo acoplamento (pouca dependência) = objetivo do bom design.', topic: { disciplineSlug: ES, topic: T_FUND } },
      { front: 'Singleton', back: 'Padrão criacional: instância única com ponto de acesso global.', topic: { disciplineSlug: ES, topic: T_PADROES } },
      { front: 'Decorator × herança', back: 'Decorator adiciona responsabilidade em RUNTIME, sem herança (envolve o objeto).', topic: { disciplineSlug: ES, topic: T_PADROES } },
      { front: 'Adapter × Facade', back: 'Adapter CONVERTE interface incompatível; Facade SIMPLIFICA um subsistema.', topic: { disciplineSlug: ES, topic: T_PADROES } },
      { front: 'Entidade × objeto de valor (DDD)', back: 'Entidade tem IDENTIDADE (Apólice nº 123); objeto de valor é imutável e definido pelos atributos (CEP).', topic: { disciplineSlug: ES, topic: T_DDD } },
      { front: 'Refatoração', back: 'Melhora a estrutura interna SEM mudar o comportamento externo (com testes).', topic: { disciplineSlug: ES, topic: T_DDD } },
      { front: 'Débito técnico', back: 'Custo futuro de escolhas rápidas de hoje; "paga juros" na manutenção.', topic: { disciplineSlug: ES, topic: T_DDD } },
      { front: 'Microsserviços — dados', back: 'Database per service: cada serviço é dono dos próprios dados (não compartilha banco).', topic: { disciplineSlug: ES, topic: T_MICRO } },
      { front: 'Serverless (FaaS)', back: 'Funções sob demanda, escala automática, paga por execução, sem gerenciar servidor.', topic: { disciplineSlug: ES, topic: T_MICRO } },
      { front: 'MVC', back: 'Model (dados/regra), View (apresentação), Controller (orquestra a entrada).', topic: { disciplineSlug: ES, topic: T_MICRO } },
      { front: 'HTTP 401 × 403', back: '401 = não autenticado (quem é você?). 403 = autenticado, mas sem permissão.', topic: { disciplineSlug: ES, topic: T_INTEG } },
      { front: 'Verbos idempotentes (REST)', back: 'GET, PUT, DELETE são idempotentes; POST não é.', topic: { disciplineSlug: ES, topic: T_INTEG } },
      { front: 'API gateway', back: 'Ponto único de entrada: roteamento, autenticação, rate limiting, agregação, observabilidade.', topic: { disciplineSlug: ES, topic: T_INTEG } },
      { front: 'OAuth2 × OpenID Connect', back: 'OAuth2 = AUTORIZAÇÃO delegada. OIDC = camada de AUTENTICAÇÃO sobre o OAuth2.', topic: { disciplineSlug: ES, topic: T_INTEG } },
      { front: 'Framework × biblioteca', back: 'Framework: inversão de controle (ele chama seu código). Biblioteca: você a chama.', topic: { disciplineSlug: ES, topic: T_LING } },
      { front: 'APF: ALI × AIE', back: 'ALI: mantido DENTRO da aplicação. AIE: só referenciado (mantido por outra).', topic: { disciplineSlug: ES, topic: T_APF } },
      { front: 'APF: SE × CE', back: 'SE (Saída Externa): com cálculo/derivação. CE (Consulta Externa): recuperação simples.', topic: { disciplineSlug: ES, topic: T_APF } }
    ]
  }
]

// ───────────────────────── RELAÇÕES ─────────────────────────
export const ABGF_ES_RELATIONS: SeedRelation[] = [
  {
    from: { disciplineSlug: ES, topic: T_SDLC },
    to: { disciplineSlug: ES, topic: 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados' },
    kind: 'CONTINUIDADE', strength: 0.6,
    note: 'Requisitos alimentam os critérios de teste (modelo em V: cada fase tem teste espelhado).'
  },
  {
    from: { disciplineSlug: ES, topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências' },
    to: { disciplineSlug: ES, topic: T_PADROES },
    kind: 'PRE_REQUISITO', strength: 1,
    note: 'Os padrões GoF pressupõem classes, herança e polimorfismo.'
  },
  {
    from: { disciplineSlug: ES, topic: T_PADROES },
    to: { disciplineSlug: ES, topic: T_DDD },
    kind: 'COMPLEMENTA', strength: 0.5,
    note: 'DDD tático (agregados, repositórios) dialoga com padrões de projeto e refatoração.'
  },
  {
    from: { disciplineSlug: ES, topic: T_MICRO },
    to: { disciplineSlug: ES, topic: T_INTEG },
    kind: 'DEPENDE_DE', strength: 0.75,
    note: 'Microsserviços se comunicam por APIs/gateway e mensageria — integração é pré-requisito.'
  },
  {
    from: { disciplineSlug: ES, topic: T_FUND },
    to: { disciplineSlug: ES, topic: T_LING },
    kind: 'PRE_REQUISITO', strength: 0.75,
    note: 'Os fundamentos de linguagens sustentam o estudo de linguagens e frameworks concretos.'
  },
  {
    from: { disciplineSlug: ES, topic: T_INTEG },
    to: { disciplineSlug: ES, topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada' },
    kind: 'RELACIONADO', strength: 0.6,
    note: 'Segurança de APIs (OAuth2/OIDC, rate limiting) é aplicação direta do desenvolvimento seguro.'
  }
]
