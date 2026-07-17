// Pacote de enriquecimento DATAPREV 2026 (FGV, Perfil 2) — M23.
// APENAS DADOS, engines intactas. A DATAPREV já é a mais coberta em
// conhecimento; este pacote reforça as duas dimensões mais fracas — QUESTÕES
// (estilo FGV) e FLASHCARDS — ancoradas aos tópicos já existentes, além de
// algumas relações justificadas. Idempotência: questões por seed_key; deck por
// nome; relações por (origem, destino, tipo).
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck } from '../types'

const S = 'Banco de estudo (estilo FGV)'
const REDES = 'redes-de-computadores'
const BD = 'banco-de-dados'
const ARQ = 'engenharia-software'
const NUVEM = 'nuvem-infraestrutura'
const LING = 'linguagens-frameworks'

// ───────────────────────── QUESTÕES (estilo FGV) ─────────────────────────
export const DATAPREV_PACK_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: REDES,
    topic: 'Noções dos modelos de referência OSI (Open Systems Interconnection)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No modelo OSI, a unidade de dados de protocolo (PDU) da camada de transporte e o equipamento típico da camada de enlace são, respectivamente:',
    options: [
      { text: 'pacote e roteador.' },
      { text: 'segmento e switch.', correct: true },
      { text: 'quadro e hub.' },
      { text: 'bit e roteador.' },
      { text: 'segmento e roteador.' }
    ],
    explanation:
      'CORRETA: "b". Na camada de transporte (4) a PDU é o SEGMENTO; o equipamento típico da camada de enlace (2) é o SWITCH (endereço MAC). "a" mistura rede (pacote/roteador); "c" usa hub (camada 1); "d" bit é da camada física; "e" roteador é camada 3.',
    source: S
  },
  {
    disciplineSlug: REDES,
    topic: 'Arquitetura e pilhas de protocolos TCP/IP',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Uma aplicação de videoconferência em tempo real prioriza baixa latência e tolera perda ocasional de pacotes. O protocolo de transporte adequado e a justificativa corretos são:',
    options: [
      { text: 'TCP, pois garante a entrega ordenada e confiável.' },
      { text: 'UDP, pois não estabelece conexão nem retransmite, reduzindo a latência.', correct: true },
      { text: 'TCP, pois seu controle de congestionamento acelera o tráfego.' },
      { text: 'UDP, pois garante a ordenação dos datagramas.' },
      { text: 'IP, pois opera na camada de transporte.' }
    ],
    explanation:
      'CORRETA: "b". Tempo real prefere UDP: sem handshake e sem retransmissão, minimiza latência (tolera perda). "a"/"c" — as garantias do TCP adicionam atraso; "d" — UDP NÃO ordena; "e" — IP é da camada de rede.',
    source: S
  },
  {
    disciplineSlug: BD,
    topic: 'Modelagem e normalização de dados',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Uma relação encontra-se na 1FN e possui chave primária composta. Um atributo não chave depende apenas de parte da chave. Para normalizar, a forma normal a ser aplicada e a anomalia eliminada são:',
    options: [
      { text: '2FN — dependência parcial.', correct: true },
      { text: '3FN — dependência transitiva.' },
      { text: 'BCNF — determinante que não é chave.' },
      { text: '1FN — atributos multivalorados.' },
      { text: '4FN — dependência multivalorada.' }
    ],
    explanation:
      'CORRETA: "a". Dependência PARCIAL da chave composta viola a 2FN. "b" trata dependência transitiva entre não chaves; "c" trata determinante não candidato; "d" já está satisfeita (1FN); "e" trata dependências multivaloradas.',
    source: S
  },
  {
    disciplineSlug: BD,
    topic: 'SQL (ANSI)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Considere a necessidade de retornar apenas os departamentos cuja média salarial seja superior a R$ 5.000. Em SQL, a cláusula correta para filtrar esse resultado agregado é:',
    options: [
      { text: 'WHERE AVG(salario) > 5000' },
      { text: 'HAVING AVG(salario) > 5000, após GROUP BY departamento.', correct: true },
      { text: 'WHERE salario > 5000' },
      { text: 'ORDER BY AVG(salario)' },
      { text: 'DISTINCT AVG(salario) > 5000' }
    ],
    explanation:
      'CORRETA: "b". Filtro sobre resultado de AGREGAÇÃO exige HAVING (após o GROUP BY). O WHERE (a/c) filtra linhas antes do agrupamento e não aceita funções de agregação; ORDER BY apenas ordena; DISTINCT elimina duplicatas.',
    source: S
  },
  {
    disciplineSlug: BD,
    topic: 'Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Uma política executa backup completo aos domingos e incrementais nos demais dias. Após falha na sexta-feira, para restaurar o estado mais recente é necessário aplicar:',
    options: [
      { text: 'apenas o backup completo de domingo.' },
      { text: 'o completo de domingo e o incremental de quinta.' },
      { text: 'o completo de domingo e todos os incrementais de segunda a quinta.', correct: true },
      { text: 'apenas o incremental de quinta.' },
      { text: 'o completo de domingo e o incremental de sexta.' }
    ],
    explanation:
      'CORRETA: "c". O incremental copia o que mudou desde o ÚLTIMO backup (de qualquer tipo); logo, a restauração exige o completo + TODOS os incrementais na ordem. Se fossem diferenciais, bastaria completo + o último. Não há incremental de sexta (a falha ocorreu antes).',
    source: S
  },
  {
    disciplineSlug: ARQ,
    topic: 'SOLID',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Um módulo de alto nível instancia diretamente uma classe concreta de acesso a dados com o operador "new", dificultando testes e substituições. O princípio SOLID violado é o da:',
    options: [
      { text: 'responsabilidade única (SRP).' },
      { text: 'inversão de dependência (DIP).', correct: true },
      { text: 'substituição de Liskov (LSP).' },
      { text: 'segregação de interfaces (ISP).' },
      { text: 'aberto/fechado (OCP).' }
    ],
    explanation:
      'CORRETA: "b". Depender de implementação concreta (new) em vez de abstração viola o DIP — resolvido com injeção de dependências. "a" trata de coesão; "c" de substituibilidade; "d" de interfaces enxutas; "e" de extensão sem modificação.',
    source: S
  },
  {
    disciplineSlug: ARQ,
    topic: 'Interoperabilidade de sistemas e padrões de integração',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre o estilo arquitetural REST e o verbo HTTP idempotente, é correto afirmar que:',
    options: [
      { text: 'REST é um protocolo baseado em envelope XML, e POST é idempotente.' },
      { text: 'REST é um estilo arquitetural stateless, e PUT é idempotente.', correct: true },
      { text: 'REST exige contrato WSDL, e GET não é idempotente.' },
      { text: 'REST mantém estado de sessão no servidor, e DELETE não é idempotente.' },
      { text: 'REST admite apenas JSON, e POST é idempotente.' }
    ],
    explanation:
      'CORRETA: "b". REST é ESTILO arquitetural, stateless; PUT é idempotente (repetir gera o mesmo estado). "a" descreve SOAP e POST não é idempotente; "c" WSDL é SOAP e GET é idempotente; "d" REST é stateless e DELETE é idempotente; "e" REST aceita várias representações e POST não é idempotente.',
    source: S
  },
  {
    disciplineSlug: NUVEM,
    topic: 'Conceitos de computação em nuvem',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Uma organização deseja implantar suas aplicações sem gerenciar sistema operacional, runtime ou servidores, mantendo o controle apenas do código e dos dados. O modelo de serviço adequado é:',
    options: [
      { text: 'IaaS.' },
      { text: 'PaaS.', correct: true },
      { text: 'SaaS.' },
      { text: 'On-premises.' },
      { text: 'Colocation.' }
    ],
    explanation:
      'CORRETA: "b". PaaS entrega a plataforma (SO, runtime, middleware gerenciados); o cliente cuida só do app e dos dados. IaaS exigiria administrar o SO; SaaS entrega software pronto; on-premises/colocation são infraestrutura própria.',
    source: S
  },
  {
    disciplineSlug: NUVEM,
    topic: 'Contêineres e virtualização: Docker, Harbor, Kubernetes e VMware',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No Kubernetes, a menor unidade implantável, que encapsula um ou mais contêineres compartilhando rede e armazenamento, é o:',
    options: [
      { text: 'container.' },
      { text: 'pod.', correct: true },
      { text: 'node.' },
      { text: 'deployment.' },
      { text: 'service.' }
    ],
    explanation:
      'CORRETA: "b". O POD é a menor unidade implantável do K8s. O Deployment gerencia réplicas de pods; o Service expõe pods; o Node é a máquina; o container é executado DENTRO de um pod.',
    source: S
  },
  {
    disciplineSlug: LING,
    topic: 'Confluent Kafka',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'No Apache Kafka, a garantia de ordenação das mensagens é assegurada:',
    options: [
      { text: 'em todo o tópico, independentemente das partições.' },
      { text: 'dentro de cada partição do tópico.', correct: true },
      { text: 'entre grupos de consumidores distintos.' },
      { text: 'somente quando há um único consumidor no cluster.' },
      { text: 'pela remoção da mensagem após o consumo.' }
    ],
    explanation:
      'CORRETA: "b". O Kafka garante ordem POR PARTIÇÃO (não por tópico inteiro). Para ordenar eventos de uma mesma entidade, usa-se a mesma chave (→ mesma partição). Mensagens permanecem conforme a retenção; não são removidas ao consumir (offsets por consumidor).',
    source: S
  },
  {
    disciplineSlug: LING,
    topic: 'Spring Boot',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre o Spring Boot, assinale a afirmativa correta.',
    options: [
      { text: 'Exige a implantação de um arquivo WAR em servidor de aplicação externo.' },
      { text: 'Oferece autoconfiguração e servidor embarcado, executando como JAR autônomo.', correct: true },
      { text: 'Substitui o Spring Framework, dispensando injeção de dependências.' },
      { text: 'Não possui recursos de monitoramento em produção.' },
      { text: 'Impede a definição de perfis de configuração por ambiente.' }
    ],
    explanation:
      'CORRETA: "b". Boot = autoconfiguração + starters + servidor embarcado (JAR executável) + Actuator (monitoramento). Não substitui o Spring (IoC/DI permanecem); permite perfis (@Profile); WAR externo é opção, não exigência.',
    source: S
  }
]

// ───────────────────────── FLASHCARDS ─────────────────────────
export const DATAPREV_PACK_DECKS: SeedStarterDeck[] = [
  {
    name: 'DATAPREV — Simulado relâmpago (Perfil 2)',
    disciplineSlug: ARQ,
    description: 'Distinções decisivas do Perfil 2 no estilo FGV, para revisão espaçada.',
    cards: [
      {
        front: 'PDU por camada OSI (1 a 4)',
        back: 'Física=bit, Enlace=quadro, Rede=pacote, Transporte=segmento.',
        topic: { disciplineSlug: REDES, topic: 'Noções dos modelos de referência OSI (Open Systems Interconnection)' }
      },
      {
        front: 'TCP × UDP',
        back: 'TCP: conexão, confiável, ordenado. UDP: sem conexão, rápido, sem garantia (tempo real, DNS).',
        topic: { disciplineSlug: REDES, topic: 'Arquitetura e pilhas de protocolos TCP/IP' }
      },
      {
        front: '2FN × 3FN',
        back: '2FN: elimina dependência PARCIAL (só com chave composta). 3FN: elimina dependência TRANSITIVA entre não chaves.',
        topic: { disciplineSlug: BD, topic: 'Modelagem e normalização de dados' }
      },
      {
        front: 'WHERE × HAVING',
        back: 'WHERE filtra linhas antes do GROUP BY; HAVING filtra grupos/agregações depois. Só HAVING aceita AVG/COUNT.',
        topic: { disciplineSlug: BD, topic: 'SQL (ANSI)' }
      },
      {
        front: 'Backup incremental × diferencial',
        back: 'Incremental: desde o último backup de QUALQUER tipo (restaura full+todos). Diferencial: desde o último FULL (restaura full+último).',
        topic: { disciplineSlug: BD, topic: 'Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados' }
      },
      {
        front: 'DIP (SOLID)',
        back: 'Dependa de ABSTRAÇÕES, não de implementações concretas. "new" de classe concreta em módulo de alto nível viola o DIP.',
        topic: { disciplineSlug: ARQ, topic: 'SOLID' }
      },
      {
        front: 'REST — verbos idempotentes',
        back: 'GET, PUT e DELETE são idempotentes; POST não é. REST é estilo arquitetural, stateless.',
        topic: { disciplineSlug: ARQ, topic: 'Interoperabilidade de sistemas e padrões de integração' }
      },
      {
        front: 'IaaS × PaaS × SaaS',
        back: 'IaaS: do SO para cima é seu. PaaS: só app e dados. SaaS: nada, só usa.',
        topic: { disciplineSlug: NUVEM, topic: 'Conceitos de computação em nuvem' }
      },
      {
        front: 'Kubernetes — menor unidade',
        back: 'POD (1+ contêineres com rede/volumes compartilhados). Deployment gerencia réplicas; Service expõe.',
        topic: { disciplineSlug: NUVEM, topic: 'Contêineres e virtualização: Docker, Harbor, Kubernetes e VMware' }
      },
      {
        front: 'Kafka — ordenação',
        back: 'Garantida POR PARTIÇÃO (não por tópico). Mesma chave → mesma partição. Mensagem não some ao consumir.',
        topic: { disciplineSlug: LING, topic: 'Confluent Kafka' }
      },
      {
        front: 'Spring Boot — trio',
        back: 'Autoconfiguração + starters + servidor embarcado (JAR autônomo). Actuator = monitoramento.',
        topic: { disciplineSlug: LING, topic: 'Spring Boot' }
      },
      {
        front: 'Elasticidade × escalabilidade (nuvem)',
        back: 'Escalabilidade: capacidade de crescer. Elasticidade: ajuste AUTOMÁTICO e bidirecional conforme a demanda.',
        topic: { disciplineSlug: NUVEM, topic: 'Benefícios da computação em nuvem' }
      }
    ]
  }
]

// ───────────────────────── RELAÇÕES (justificadas) ─────────────────────────
export const DATAPREV_PACK_RELATIONS: SeedRelation[] = [
  {
    from: { disciplineSlug: BD, topic: 'SQL (ANSI)' },
    to: { disciplineSlug: BD, topic: 'Noções para otimização de performance em larga escala' },
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Dominado o SQL, o passo seguinte é otimização (índices, plano de execução).'
  },
  {
    from: { disciplineSlug: REDES, topic: 'Arquitetura e pilhas de protocolos TCP/IP' },
    to: { disciplineSlug: ARQ, topic: 'Interoperabilidade de sistemas e padrões de integração' },
    kind: 'PRE_REQUISITO',
    strength: 0.6,
    note: 'REST/HTTP dependem da compreensão de TCP/IP e da camada de aplicação.'
  },
  {
    from: { disciplineSlug: NUVEM, topic: 'Conceitos de computação em nuvem' },
    to: { disciplineSlug: NUVEM, topic: 'Contêineres e virtualização: Docker, Harbor, Kubernetes e VMware' },
    kind: 'CONTINUIDADE',
    strength: 0.6,
    note: 'Dos conceitos de nuvem para a plataforma padrão de orquestração de contêineres.'
  }
]
