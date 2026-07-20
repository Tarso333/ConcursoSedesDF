// Expansão de ENGENHARIA DE SOFTWARE (Arquitetura Tecnológica) — DATAPREV
// 2026 (FGV, Perfil 2). APENAS DADOS. Preenche tópicos que estavam em 0% de
// cobertura de conhecimento (ciclo de vida, metodologias, qualidade,
// requisitos, análise/projeto OO). Nomes de tópico EXATOS ao currículo.
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo FGV)'
const ARQ = 'engenharia-software'

const T_CICLO = 'Ciclo de vida do software'
const T_MET = 'Metodologias de desenvolvimento de software'
const T_QUAL = 'Qualidade de software'
const T_REQ = 'Engenharia de requisitos'
const T_APOO = 'Análise e projeto orientados a objetos'

export const DATAPREV_ES_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: ARQ,
    topic: T_CICLO,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Ciclo de vida e modelos de processo',
        body:
          '# Ciclo de vida do software\n\n' +
          'Fases gerais: concepção → requisitos → projeto → implementação → testes → implantação → manutenção.\n\n' +
          '| Modelo | Traço |\n| --- | --- |\n' +
          '| Cascata | sequencial; requisitos estáveis; mudança cara |\n' +
          '| Iterativo-incremental | ciclos com feedback (ágil, RUP) |\n' +
          '| Espiral | dirigido a RISCO (análise por volta) |\n' +
          '| Em V | testes espelham cada fase |\n\n' +
          'A **manutenção** costuma ser a fase mais longa/custosa (corretiva, adaptativa, evolutiva, preventiva).'
      },
      { kind: 'CONCEITO', title: 'Tipos de manutenção', body: 'Corretiva (defeitos), adaptativa (mudança de ambiente), evolutiva/perfectiva (novos requisitos/melhorias) e preventiva (evitar falhas futuras).' },
      { kind: 'PEGADINHA', body: '"A manutenção evolutiva corrige defeitos" — ERRADO: corrigir defeito é CORRETIVA; evolutiva adiciona/melhora funcionalidades.' },
      { kind: 'PALAVRA_CHAVE', title: 'cascata · espiral=risco · V · manutenção corretiva/adaptativa/evolutiva' }
    ]
  },
  {
    disciplineSlug: ARQ,
    topic: T_MET,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Metodologias: prescritivas × ágeis',
        body:
          '# Metodologias de desenvolvimento\n\n' +
          '- **Prescritivas/pesadas** (cascata, RUP): muita documentação, fases definidas.\n' +
          '- **Ágeis** (Scrum, XP, Kanban): entregas curtas, feedback, adaptação (Manifesto Ágil: indivíduos > processos; software funcionando > documentação; colaboração > contrato; responder a mudanças > seguir plano).\n' +
          '- **RUP**: iterativo, dirigido a casos de uso e a risco; fases (concepção, elaboração, construção, transição) × disciplinas.'
      },
      { kind: 'PEGADINHA', body: '"O Manifesto Ágil despreza documentação e planejamento" — ERRADO: apenas valoriza MAIS software funcionando e resposta a mudanças; os itens da direita têm valor.' },
      { kind: 'PALAVRA_CHAVE', title: 'prescritivo × ágil · RUP iterativo · Manifesto Ágil' }
    ]
  },
  {
    disciplineSlug: ARQ,
    topic: T_QUAL,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Qualidade de software (ISO/IEC 25010)',
        body:
          '# Qualidade de software\n\n' +
          '## Atributos (ISO/IEC 25010 — qualidade do produto)\n' +
          'Adequação funcional, **desempenho/eficiência**, compatibilidade, **usabilidade**, **confiabilidade**, **segurança**, **manutenibilidade** e **portabilidade**.\n\n' +
          '- **Qualidade do produto** (atributos acima) × **qualidade em uso** (eficácia, eficiência, satisfação, ausência de risco, cobertura de contexto).\n' +
          '- **Verificação × validação**: verificação = conforme a especificação; validação = atende à necessidade real.\n' +
          '- Modelos de maturidade de PROCESSO: **CMMI** e **MPS.BR** (níveis).'
      },
      { kind: 'CONCEITO', title: 'Qualidade do produto × em uso', body: 'Produto = características internas/externas do software (25010). Em uso = como o usuário atinge seus objetivos com ele em um contexto real.' },
      { kind: 'PEGADINHA', body: '"Segurança e usabilidade não são atributos de qualidade de software" — ERRADO: ambos são características da ISO/IEC 25010.' },
      { kind: 'PALAVRA_CHAVE', title: 'ISO 25010 · produto × em uso · CMMI/MPS.BR · V&V' }
    ]
  },
  {
    disciplineSlug: ARQ,
    topic: T_REQ,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Engenharia de requisitos',
        body:
          '# Engenharia de requisitos\n\n' +
          'Atividades: **elicitação** (levantar) → **análise** (negociar/priorizar) → **especificação** (documentar) → **validação** (conferir com o cliente) → **gerência** (rastreabilidade e mudanças).\n\n' +
          '- **Funcionais** (o que faz) × **não funcionais** (qualidades: desempenho, segurança, usabilidade).\n' +
          '- Técnicas de elicitação: entrevista, workshop/JAD, questionário, observação, **prototipação**, análise de documentos.\n' +
          '- **Validação ≠ verificação**: validar é conferir se o requisito reflete a real necessidade.'
      },
      { kind: 'PEGADINHA', body: '"Requisito não funcional descreve uma função do sistema" — ERRADO: não funcional é atributo de QUALIDADE/restrição; função é requisito funcional.' },
      { kind: 'PALAVRA_CHAVE', title: 'elicitação→análise→especificação→validação→gerência' }
    ]
  },
  {
    disciplineSlug: ARQ,
    topic: T_APOO,
    entries: [
      {
        kind: 'RESUMO',
        title: 'Análise e projeto orientados a objetos',
        body:
          '# Análise e projeto OO\n\n' +
          '- **Análise OO**: entender o domínio e modelar as classes conceituais (o QUE), independente de tecnologia.\n' +
          '- **Projeto OO**: decidir COMO implementar (responsabilidades, colaborações, padrões, camadas).\n' +
          '- Notação: **UML** (classes, sequência, casos de uso, atividades).\n' +
          '- Princípios de responsabilidade: **GRASP** (Information Expert, Creator, Controller, baixo acoplamento, alta coesão) e **SOLID**.'
      },
      { kind: 'CONCEITO', title: 'Análise × projeto', body: 'Análise foca no problema/domínio (o quê); projeto foca na solução/implementação (como). A UML apoia ambos.' },
      { kind: 'PALAVRA_CHAVE', title: 'análise=problema · projeto=solução · UML · GRASP/SOLID' }
    ]
  }
]

export const DATAPREV_ES_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ARQ, topic: T_CICLO, type: 'ME', difficulty: 'MEDIO',
    statement: 'A manutenção de software que consiste em adaptar o sistema a mudanças no ambiente operacional (novo SO, novo hardware ou nova legislação) é classificada como:',
    options: [
      { text: 'corretiva.' }, { text: 'adaptativa.', correct: true }, { text: 'evolutiva.' }, { text: 'preventiva.' }, { text: 'emergencial.' }
    ],
    explanation: 'CORRETA: "b". Adaptativa responde a mudanças no AMBIENTE. Corretiva conserta defeitos; evolutiva/perfectiva adiciona/melhora funções; preventiva evita falhas futuras.',
    source: S
  },
  {
    disciplineSlug: ARQ, topic: T_MET, type: 'ME', difficulty: 'MEDIO',
    statement: 'Segundo o Manifesto Ágil, entre os valores prioritários está:',
    options: [
      { text: 'processos e ferramentas acima de indivíduos e interações.' },
      { text: 'software funcionando mais que documentação abrangente.', correct: true },
      { text: 'seguir um plano acima de responder a mudanças.' },
      { text: 'negociação de contratos acima da colaboração com o cliente.' },
      { text: 'documentação exaustiva antes de qualquer entrega.' }
    ],
    explanation: 'CORRETA: "b". O Manifesto valoriza mais software funcionando que documentação abrangente. As demais invertem os quatro valores (os itens à direita têm valor, mas os da esquerda valem mais).',
    source: S
  },
  {
    disciplineSlug: ARQ, topic: T_QUAL, type: 'ME', difficulty: 'MEDIO',
    statement: 'Na norma ISO/IEC 25010, "manutenibilidade" e "portabilidade" são exemplos de:',
    options: [
      { text: 'requisitos funcionais.' },
      { text: 'características de qualidade do produto de software.', correct: true },
      { text: 'fases do ciclo de vida.' },
      { text: 'níveis do CMMI.' },
      { text: 'papéis do Scrum.' }
    ],
    explanation: 'CORRETA: "b". A ISO/IEC 25010 define características de qualidade do PRODUTO (funcionalidade, desempenho, usabilidade, confiabilidade, segurança, manutenibilidade, portabilidade, compatibilidade). Não são requisitos funcionais nem fases/níveis/papéis.',
    source: S
  },
  {
    disciplineSlug: ARQ, topic: T_REQ, type: 'ME', difficulty: 'MEDIO',
    statement: 'A atividade da engenharia de requisitos responsável por confirmar, junto às partes interessadas, se os requisitos especificados refletem as reais necessidades é a:',
    options: [
      { text: 'elicitação.' }, { text: 'validação.', correct: true }, { text: 'verificação de código.' }, { text: 'codificação.' }, { text: 'implantação.' }
    ],
    explanation: 'CORRETA: "b". A VALIDAÇÃO confere se os requisitos correspondem à necessidade real do cliente. Elicitação é levantar; verificação de código/codificação/implantação são fases posteriores e distintas.',
    source: S
  },
  {
    disciplineSlug: ARQ, topic: T_APOO, type: 'ME', difficulty: 'FACIL',
    statement: 'Na diferença entre análise e projeto orientados a objetos, é correto afirmar que a análise:',
    options: [
      { text: 'define os detalhes de implementação e a tecnologia.' },
      { text: 'foca no entendimento do problema e do domínio, independentemente da tecnologia.', correct: true },
      { text: 'ocorre somente após a codificação.' },
      { text: 'dispensa o uso da UML.' },
      { text: 'é sinônimo de teste de sistema.' }
    ],
    explanation: 'CORRETA: "b". A análise foca no PROBLEMA/domínio (o quê), independente de tecnologia; o projeto trata da SOLUÇÃO (como). Ambos usam UML; a análise antecede a codificação.',
    source: S
  }
]

export const DATAPREV_ES_DECKS: SeedStarterDeck[] = [
  {
    name: 'DATAPREV — Arquitetura Tecnológica (expansão)',
    disciplineSlug: ARQ,
    description: 'Ciclo de vida, metodologias, qualidade e requisitos — estilo FGV.',
    cards: [
      { front: 'Manutenção adaptativa × evolutiva', back: 'Adaptativa: mudança de AMBIENTE (SO/hardware/lei). Evolutiva: novos requisitos/melhorias. Corretiva: defeitos.', topic: { disciplineSlug: ARQ, topic: T_CICLO } },
      { front: 'Modelo espiral', back: 'Dirigido a RISCO: análise de riscos a cada volta.', topic: { disciplineSlug: ARQ, topic: T_CICLO } },
      { front: 'Manifesto Ágil — valores', back: 'Indivíduos > processos; software funcionando > documentação; colaboração > contrato; responder a mudanças > seguir plano.', topic: { disciplineSlug: ARQ, topic: T_MET } },
      { front: 'ISO/IEC 25010', back: 'Características de qualidade do PRODUTO: funcional, desempenho, usabilidade, confiabilidade, segurança, manutenibilidade, portabilidade, compatibilidade.', topic: { disciplineSlug: ARQ, topic: T_QUAL } },
      { front: 'Qualidade: produto × em uso', back: 'Produto = características do software. Em uso = eficácia, eficiência, satisfação no contexto real.', topic: { disciplineSlug: ARQ, topic: T_QUAL } },
      { front: 'Processo de requisitos', back: 'Elicitação → análise → especificação → validação → gerência (rastreabilidade e mudanças).', topic: { disciplineSlug: ARQ, topic: T_REQ } },
      { front: 'Validação × verificação (requisitos)', back: 'Validação: reflete a necessidade real? Verificação: está conforme a especificação?', topic: { disciplineSlug: ARQ, topic: T_REQ } },
      { front: 'Análise × projeto OO', back: 'Análise = problema/domínio (o quê). Projeto = solução/implementação (como). UML apoia os dois.', topic: { disciplineSlug: ARQ, topic: T_APOO } }
    ]
  }
]

export const DATAPREV_ES_RELATIONS: SeedRelation[] = [
  {
    from: { disciplineSlug: ARQ, topic: T_CICLO },
    to: { disciplineSlug: ARQ, topic: T_MET },
    kind: 'CONTINUIDADE', strength: 0.75,
    note: 'As metodologias organizam as fases do ciclo de vida.'
  },
  {
    from: { disciplineSlug: ARQ, topic: T_REQ },
    to: { disciplineSlug: ARQ, topic: T_APOO },
    kind: 'PRE_REQUISITO', strength: 0.6,
    note: 'Requisitos elicitados alimentam a análise e o projeto orientados a objetos.'
  },
  {
    from: { disciplineSlug: ARQ, topic: T_QUAL },
    to: { disciplineSlug: ARQ, topic: 'Engenharia de desempenho: técnicas de análise de desempenho' },
    kind: 'RELACIONADO', strength: 0.5,
    note: 'Desempenho/eficiência é atributo de qualidade da ISO/IEC 25010.'
  }
]
