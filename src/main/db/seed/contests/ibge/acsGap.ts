// Preenchimento das lacunas do ACS: tópicos que ainda estavam sem conhecimento
// em Administração/Situações Gerenciais e em Conhecimentos Técnicos. APENAS
// DADOS; nomes de tópico EXATOS aos do currículo do ACS.
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo IBFC)'
const ADM = 'administracao-situacoes-gerenciais'
const CT = 'conhecimentos-tecnicos-censo'

const T_ASP = 'Aspectos gerais da Administração; organizações como sistemas abertos'
const T_GER = 'Noções básicas de gerência e gestão de organizações e de pessoas'
const T_CENSO = 'Conhecimentos técnicos do 12º Censo Agropecuário, Florestal e Aquícola (apostila oficial)'
const T_MED = 'Mediação com informantes e articulação institucional local'

export const ACS_GAP_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: ADM, topic: T_ASP,
    entries: [
      {
        kind: 'RESUMO', title: 'Fundamentos da Administração e sistema aberto',
        body:
          '# Aspectos gerais\n\n' +
          'Administrar é alcançar objetivos com e por meio de pessoas, de forma eficiente e eficaz.\n\n' +
          '## Escolas\n' +
          'Científica (Taylor), Clássica (Fayol), Relações Humanas (Mayo), Burocrática (Weber), Sistêmica.\n\n' +
          '## Organização como sistema aberto\n' +
          'Entradas → processamento → saídas + **retroalimentação**, em constante troca com o ambiente (por isso o supervisor precisa ajustar as equipes conforme a realidade de campo).'
      },
      { kind: 'PEGADINHA', body: '"Sistema aberto não sofre influência do ambiente" — ERRADO: é justamente o que TROCA com o ambiente.' },
      { kind: 'PALAVRA_CHAVE', title: 'Taylor · Fayol · sistema aberto · feedback' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_GER,
    entries: [
      {
        kind: 'RESUMO', title: 'Gerência e gestão de pessoas',
        body:
          '# Gerência e gestão de pessoas\n\n' +
          '- **Gerência**: conduzir uma unidade para atingir metas, alinhando pessoas e recursos.\n' +
          '- **Gestão de pessoas**: atrair, desenvolver, avaliar e reter talentos; foco no desempenho e no clima.\n' +
          '- Papéis do gerente (Mintzberg): interpessoais (líder, símbolo, ligação), informacionais (monitor, disseminador, porta-voz) e decisórios (empreendedor, gestor de conflitos, alocador de recursos, negociador).\n' +
          '- Para o supervisor de campo: definir metas claras, dar feedback, remover obstáculos e desenvolver a equipe.'
      },
      { kind: 'DICA', body: 'Mintzberg agrupa os papéis do gerente em 3 categorias: interpessoais, informacionais e decisórios — cobrança recorrente.' },
      { kind: 'PALAVRA_CHAVE', title: 'gestão de pessoas · papéis de Mintzberg · feedback' }
    ]
  },
  {
    disciplineSlug: CT, topic: T_CENSO,
    entries: [
      {
        kind: 'RESUMO', title: '12º Censo Agropecuário, Florestal e Aquícola',
        body:
          '# 12º Censo Agropecuário\n\n' +
          '- O **Censo Agropecuário** é a grande pesquisa do IBGE que retrata a estrutura e a produção do setor agropecuário, florestal e aquícola do país (estabelecimentos, área, produção, pessoal ocupado, tecnologia).\n' +
          '- **Unidade de investigação**: o **estabelecimento agropecuário** (unidade de produção sob uma administração).\n' +
          '- Coleta por **entrevista** com o produtor/informante, usando dispositivo móvel de coleta (DMC).\n' +
          '- **Sigilo estatístico** (Lei nº 5.534/1968): as informações são confidenciais e de uso exclusivamente estatístico.\n\n' +
          '_O conteúdo técnico detalhado está na apostila oficial (Anexo IV do edital); este resumo situa o supervisor no objeto e nos conceitos-base._'
      },
      { kind: 'CONCEITO', title: 'Estabelecimento agropecuário', body: 'Unidade de produção agropecuária, florestal ou aquícola, contínua ou não, subordinada a uma única administração — a unidade de coleta do Censo Agropecuário.' },
      { kind: 'OBSERVACAO', body: 'A disciplina "Conhecimentos Técnicos" remete à apostila oficial do IBGE (link no edital). Aprofunde-a na fonte; aqui ficam os conceitos estruturantes do Censo.' },
      { kind: 'PALAVRA_CHAVE', title: 'estabelecimento agropecuário · DMC · sigilo estatístico' }
    ]
  },
  {
    disciplineSlug: CT, topic: T_MED,
    entries: [
      {
        kind: 'RESUMO', title: 'Mediação com informantes e articulação local',
        body:
          '# Mediação e articulação\n\n' +
          '- Ao encontrar **resistência** do informante, o supervisor faz a **mediação**: escuta, esclarece a finalidade e o sigilo da pesquisa, reforça a obrigatoriedade legal de prestar informação ao IBGE e busca a colaboração.\n' +
          '- **Articulação institucional**: contato com autoridades e instituições locais (prefeituras, sindicatos rurais, cooperativas) para viabilizar o acesso e a legitimidade da coleta.\n' +
          '- Postura: cordialidade, imparcialidade, firmeza quanto às normas e registro das ocorrências.\n' +
          '- Obrigatoriedade: a Lei nº 5.534/1968 torna **obrigatória** a prestação de informações ao IBGE, resguardado o sigilo.'
      },
      { kind: 'PEGADINHA', body: '"A prestação de informações ao IBGE é facultativa" — ERRADO: é OBRIGATÓRIA por lei (Lei 5.534/1968), com sigilo garantido.' },
      { kind: 'PALAVRA_CHAVE', title: 'mediação · articulação local · obrigatoriedade + sigilo' }
    ]
  }
]

export const ACS_GAP_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ADM, topic: T_GER, type: 'ME', difficulty: 'MEDIO',
    statement: 'Segundo Mintzberg, os papéis gerenciais agrupam-se em três categorias, que são:',
    options: [
      { text: 'operacional, tático e estratégico.' },
      { text: 'interpessoais, informacionais e decisórios.', correct: true },
      { text: 'financeiro, comercial e produtivo.' },
      { text: 'formal, informal e virtual.' },
      { text: 'planejamento, execução e controle.' }
    ],
    explanation: 'CORRETA: "b". Mintzberg agrupa os papéis do gerente em interpessoais, informacionais e decisórios. "a" são níveis organizacionais; "e" são funções administrativas; as demais não correspondem.',
    source: S
  },
  {
    disciplineSlug: CT, topic: T_CENSO, type: 'ME', difficulty: 'MEDIO',
    statement: 'No Censo Agropecuário do IBGE, a unidade de investigação (unidade de coleta) é o:',
    options: [
      { text: 'município.' },
      { text: 'estabelecimento agropecuário.', correct: true },
      { text: 'domicílio urbano.' },
      { text: 'setor censitário isolado.' },
      { text: 'estado da federação.' }
    ],
    explanation: 'CORRETA: "b". A unidade de investigação do Censo Agropecuário é o estabelecimento agropecuário (unidade de produção sob uma administração). Município/estado são recortes territoriais; domicílio urbano é do Censo Demográfico.',
    source: S
  },
  {
    disciplineSlug: CT, topic: T_MED, type: 'ME', difficulty: 'MEDIO',
    statement: 'Diante da recusa de um produtor em prestar informações, a conduta correta do supervisor, à luz da legislação estatística, é:',
    options: [
      { text: 'abandonar a coleta, pois a informação é facultativa.' },
      { text: 'esclarecer a finalidade e o sigilo da pesquisa e informar a obrigatoriedade legal de prestar as informações ao IBGE.', correct: true },
      { text: 'divulgar os dados de vizinhos para pressionar o produtor.' },
      { text: 'preencher o questionário com dados estimados sem entrevista.' },
      { text: 'aplicar multa imediata no local.' }
    ],
    explanation: 'CORRETA: "b". A prestação de informações ao IBGE é obrigatória (Lei 5.534/1968), com sigilo garantido; o supervisor medeia esclarecendo finalidade e sigilo. "a" nega a obrigatoriedade; "c" viola o sigilo; "d" falsifica a coleta; "e" não é atribuição do supervisor no ato.',
    source: S
  }
]

export const ACS_GAP_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACS — Fundamentos & Censo (complemento)',
    disciplineSlug: CT,
    description: 'Fundamentos de administração e conceitos do Censo que faltavam ao ACS.',
    cards: [
      { front: 'Papéis gerenciais (Mintzberg)', back: 'Interpessoais, informacionais e decisórios.', topic: { disciplineSlug: ADM, topic: T_GER } },
      { front: 'Organização como sistema aberto', back: 'Troca com o ambiente: entradas → processamento → saídas + feedback.', topic: { disciplineSlug: ADM, topic: T_ASP } },
      { front: 'Unidade do Censo Agropecuário', back: 'O estabelecimento agropecuário (unidade de produção sob uma administração).', topic: { disciplineSlug: CT, topic: T_CENSO } },
      { front: 'Prestar informação ao IBGE é...', back: 'OBRIGATÓRIO (Lei 5.534/1968), com sigilo estatístico garantido.', topic: { disciplineSlug: CT, topic: T_MED } },
      { front: 'Mediação com informante resistente', back: 'Escutar, esclarecer finalidade e sigilo, reforçar a obrigatoriedade legal e registrar a ocorrência.', topic: { disciplineSlug: CT, topic: T_MED } }
    ]
  }
]

export const ACS_GAP_RELATIONS: SeedRelation[] = [
  { from: { disciplineSlug: ADM, topic: T_ASP }, to: { disciplineSlug: ADM, topic: 'Funções administrativas' }, kind: 'PRE_REQUISITO', strength: 0.75, note: 'A visão sistêmica fundamenta as funções administrativas.' },
  { from: { disciplineSlug: ADM, topic: T_GER }, to: { disciplineSlug: ADM, topic: 'Avaliação de desempenho' }, kind: 'CONTINUIDADE', strength: 0.6, note: 'Gestão de pessoas conduz à avaliação de desempenho da equipe.' },
  { from: { disciplineSlug: CT, topic: T_CENSO }, to: { disciplineSlug: CT, topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências' }, kind: 'PRE_REQUISITO', strength: 0.6, note: 'Conhecer o objeto do Censo é base para supervisionar a coleta.' },
  { from: { disciplineSlug: CT, topic: T_MED }, to: { disciplineSlug: CT, topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências' }, kind: 'COMPLEMENTA', strength: 0.5, note: 'A mediação de resistências integra a supervisão de campo.' }
]
