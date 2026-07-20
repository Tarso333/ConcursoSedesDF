// M26 — completude do ACS: subtópicos-folha de "Funções administrativas"
// (Planejamento, Organização, Direção, Controle), que o diagnóstico apontou
// vazios. APENAS DADOS; slug exclusivo do ACS.
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo IBFC)'
const ADM = 'administracao-situacoes-gerenciais'

export const ACS_EXTRA_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: ADM, topic: 'Planejamento',
    entries: [
      {
        kind: 'RESUMO', title: 'Planejamento',
        body:
          '# Planejamento\n\n' +
          'Primeira função administrativa: define **objetivos** e os **meios** para alcançá-los. Reduz incerteza e orienta as demais funções.\n\n' +
          '## Níveis\n' +
          '| Nível | Prazo | Abrangência |\n| --- | --- | --- |\n' +
          '| Estratégico | longo | toda a organização |\n' +
          '| Tático | médio | áreas/setores |\n' +
          '| Operacional | curto | tarefas/rotinas |\n\n' +
          'Metas **SMART**: específicas, mensuráveis, alcançáveis, relevantes e temporais.'
      },
      { kind: 'DICA', body: 'Planejamento responde "o que" e "como". Para o supervisor de campo, prevalece o nível OPERACIONAL (roteiros, escalas, metas diárias).' },
      { kind: 'PALAVRA_CHAVE', title: 'objetivos+meios · estratégico/tático/operacional · SMART' }
    ]
  },
  {
    disciplineSlug: ADM, topic: 'Organização',
    entries: [
      {
        kind: 'RESUMO', title: 'Organização',
        body:
          '# Organização (função)\n\n' +
          'Estrutura os recursos e distribui **tarefas, autoridade e responsabilidades** para executar o que foi planejado (quem faz o quê).\n\n' +
          '- **Departamentalização**: agrupar atividades (por função, produto, cliente, território).\n' +
          '- **Amplitude de controle**: nº de subordinados por gestor (estreita → estrutura alta; larga → achatada).\n' +
          '- **Organograma**: representa a estrutura formal.'
      },
      { kind: 'PEGADINHA', body: 'Não confundir a FUNÇÃO organização (estruturar) com a ORGANIZAÇÃO enquanto instituição (a empresa). O enunciado indica pelo contexto.' },
      { kind: 'PALAVRA_CHAVE', title: 'estrutura · departamentalização · amplitude de controle' }
    ]
  },
  {
    disciplineSlug: ADM, topic: 'Direção',
    entries: [
      {
        kind: 'RESUMO', title: 'Direção',
        body:
          '# Direção\n\n' +
          'Conduz e coordena as PESSOAS para executar as atividades. Envolve **liderança, motivação e comunicação**.\n\n' +
          '- É a função mais ligada ao fator humano e ao "aqui e agora" da execução.\n' +
          '- Para o supervisor: orientar recenseadores, resolver dúvidas, manter a equipe engajada.'
      },
      { kind: 'DICA', body: 'Direção = pessoas em ação. Se a questão fala em liderar/motivar/comunicar durante a execução, a função é DIREÇÃO.' },
      { kind: 'PALAVRA_CHAVE', title: 'pessoas · liderança · motivação · comunicação' }
    ]
  },
  {
    disciplineSlug: ADM, topic: 'Controle',
    entries: [
      {
        kind: 'RESUMO', title: 'Controle',
        body:
          '# Controle\n\n' +
          'Última função: mede o desempenho, **compara** com o planejado (padrões) e **corrige** desvios; realimenta o planejamento.\n\n' +
          '## Etapas\n' +
          '1. Estabelecer padrões. 2. Medir o desempenho. 3. Comparar com o padrão. 4. Ação corretiva.\n\n' +
          '## Tipos\n' +
          'Prévio (preventivo), concomitante (durante) e posterior (após o fato). No campo: acompanhar cobertura, produtividade e pendências.'
      },
      { kind: 'PEGADINHA', body: '"Controle é apenas punir erros" — ERRADO: controle é medir, comparar e CORRIGIR (inclui prevenção e ajuste), não punição.' },
      { kind: 'PALAVRA_CHAVE', title: 'padrão → medir → comparar → corrigir · prévio/concomitante/posterior' }
    ]
  }
]

export const ACS_EXTRA_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ADM, topic: 'Controle', type: 'ME', difficulty: 'MEDIO',
    statement: 'No ciclo administrativo, a sequência correta das etapas da função controle é:',
    options: [
      { text: 'corrigir, medir, comparar e padronizar.' },
      { text: 'estabelecer padrões, medir o desempenho, comparar com o padrão e adotar ação corretiva.', correct: true },
      { text: 'planejar, organizar, dirigir e controlar.' },
      { text: 'punir, advertir, suspender e demitir.' },
      { text: 'medir, punir e arquivar.' }
    ],
    explanation:
      'A) ERRADA — inverte a ordem lógica (padrão vem antes de medir). B) CORRETA — padrões → medição → comparação → ação corretiva. C) ERRADA — é o ciclo PODC (as quatro funções), não as etapas do controle. D) ERRADA — descreve regime disciplinar, não a função controle. E) ERRADA — reduz o controle a punição/arquivo.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Planejamento', type: 'ME', difficulty: 'MEDIO',
    statement: 'O planejamento voltado ao curto prazo, que trata das tarefas e rotinas específicas executadas pelas equipes de campo, é classificado como:',
    options: [
      { text: 'estratégico.' },
      { text: 'tático.' },
      { text: 'operacional.', correct: true },
      { text: 'institucional.' },
      { text: 'contingencial.' }
    ],
    explanation:
      'A) ERRADA — estratégico é de longo prazo e abrange toda a organização. B) ERRADA — tático é de médio prazo, por área. C) CORRETA — operacional trata de tarefas/rotinas de curto prazo (o nível do supervisor de campo). D)/E) ERRADAS — não são níveis de planejamento no rol clássico.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Direção', type: 'ME', difficulty: 'FACIL',
    statement: 'A função administrativa que se ocupa de conduzir e motivar as pessoas durante a execução das atividades, por meio de liderança e comunicação, é a:',
    options: [
      { text: 'planejamento.' },
      { text: 'organização.' },
      { text: 'direção.', correct: true },
      { text: 'controle.' },
      { text: 'previsão.' }
    ],
    explanation:
      'A) ERRADA — planejamento define objetivos/meios. B) ERRADA — organização estrutura recursos. C) CORRETA — direção conduz e motiva as pessoas (liderança, comunicação). D) ERRADA — controle mede e corrige. E) ERRADA — previsão integra o planejamento, não a condução de pessoas.',
    source: S
  }
]

export const ACS_EXTRA_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACS — Funções administrativas (detalhe)',
    disciplineSlug: ADM,
    description: 'As quatro funções em detalhe (Planejamento, Organização, Direção, Controle).',
    cards: [
      { front: 'Planejamento — o que define?', back: 'Objetivos e meios. Níveis: estratégico (longo), tático (médio), operacional (curto). Metas SMART.', topic: { disciplineSlug: ADM, topic: 'Planejamento' } },
      { front: 'Organização (função)', back: 'Estrutura recursos e distribui tarefas/autoridade. Departamentalização e amplitude de controle.', topic: { disciplineSlug: ADM, topic: 'Organização' } },
      { front: 'Direção', back: 'Conduz e motiva PESSOAS (liderança, comunicação) durante a execução.', topic: { disciplineSlug: ADM, topic: 'Direção' } },
      { front: 'Controle — etapas', back: 'Padrões → medir → comparar → ação corretiva. Tipos: prévio, concomitante, posterior.', topic: { disciplineSlug: ADM, topic: 'Controle' } }
    ]
  }
]

export const ACS_EXTRA_RELATIONS: SeedRelation[] = [
  { from: { disciplineSlug: ADM, topic: 'Planejamento' }, to: { disciplineSlug: ADM, topic: 'Organização' }, kind: 'CONTINUIDADE', strength: 0.75, note: 'Definido o plano, organiza-se a estrutura para executá-lo.' },
  { from: { disciplineSlug: ADM, topic: 'Organização' }, to: { disciplineSlug: ADM, topic: 'Direção' }, kind: 'CONTINUIDADE', strength: 0.75, note: 'Estruturado o trabalho, dirige-se as pessoas na execução.' },
  { from: { disciplineSlug: ADM, topic: 'Direção' }, to: { disciplineSlug: ADM, topic: 'Controle' }, kind: 'CONTINUIDADE', strength: 0.75, note: 'Executado o trabalho, controla-se o resultado.' },
  { from: { disciplineSlug: ADM, topic: 'Controle' }, to: { disciplineSlug: ADM, topic: 'Planejamento' }, kind: 'REVISAO_RECOMENDADA', strength: 0.6, note: 'O controle realimenta o planejamento (ciclo PODC).' }
]
