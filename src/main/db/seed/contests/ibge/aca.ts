// IBGE 2026 — Agente Censitário Administrativo (ACA). Segundo cargo do IBGE,
// modelado como um Contest próprio (mesmo padrão ABGF/DATAPREV: um contest por
// cargo, pois ACA e ACS têm provas/estruturas diferentes). Compartilha Língua
// Portuguesa e Raciocínio Lógico com o ACS (slugs iguais → multiConcurso).
//
// FONTE: Edital 01/2026 (retificado) IBGE, banca IBFC, Anexo IV do ACA.
// Prova (item 11.1): LP 15 · RLQ 10 · Noções de Administração 35 (= 60).
// Remuneração ACA R$ 2.128,00; ensino médio completo (sem exigência de CNH);
// aprovação ≥18 pts no total e ≥1 pt por disciplina; janela 28–30/09/2026, 4h.
// DECISÃO: a tabela de remuneração do edital (garble de layout) associa
// R$ 2.128,00/ensino médio ao par ACA/ACI (cargos administrativos) —
// leitura adotada e documentada aqui.
import type { ContestSeed } from '../types'
import type { SeedDiscipline } from '../../curriculum'
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'
import {
  IBGE_LP_DISCIPLINE,
  IBGE_RLQ_DISCIPLINE,
  IBGE_RLQ_KNOWLEDGE,
  IBGE_SHARED_DECKS,
  IBGE_SHARED_KNOWLEDGE,
  IBGE_SHARED_QUESTIONS
} from './shared'

const S = 'Banco de estudo (estilo IBFC)'
const ADM = 'nocoes-administracao'

const T_ASP = 'Aspectos gerais da Administração; organizações como sistemas abertos'
const T_FUNC = 'Funções administrativas: planejamento, organização, direção, coordenação e controle'
const T_MOT = 'Motivação, comunicação e liderança'
const T_GRP = 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho'
const T_DEL = 'Responsabilidade, coordenação, autoridade, poder e delegação'
const T_QUAL = 'Qualidade na prestação de serviços'
const T_ATEND = 'Noções de atendimento ao público'
const T_ARQ = 'Noções de documentação e arquivo'

// ───────────────────────── DISCIPLINA (Noções de Administração — ACA) ─────────────────────────
const ACA_ADMIN_DISCIPLINE: SeedDiscipline = {
  slug: ADM,
  name: 'Noções de Administração',
  block: 'ESPECIFICO',
  weight: 1,
  examQuestionEstimate: 35,
  color: '#10b981',
  topics: [T_ASP, T_FUNC, T_MOT, T_GRP, T_DEL, T_QUAL, T_ATEND, T_ARQ]
}

// ───────────────────────── CONHECIMENTO ─────────────────────────
const ACA_ADMIN_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: ADM, topic: T_ASP,
    entries: [
      {
        kind: 'RESUMO', title: 'Administração e a organização como sistema aberto',
        body:
          '# Aspectos gerais da Administração\n\n' +
          'Administrar = alcançar objetivos com e por meio de pessoas, usando recursos de forma eficiente e eficaz.\n\n' +
          '## Escolas (visão geral)\n' +
          '- **Clássica** (Fayol): funções administrativas e princípios gerais.\n' +
          '- **Científica** (Taylor): racionalização do trabalho, tempos e movimentos.\n' +
          '- **Relações Humanas** (Mayo): o fator humano e os grupos informais.\n' +
          '- **Burocrática** (Weber): normas, hierarquia, impessoalidade.\n' +
          '- **Sistêmica**: organização como **sistema aberto** que troca com o ambiente.\n\n' +
          '## Sistema aberto\n' +
          'Entradas (recursos) → processamento → saídas (produtos/serviços) → **retroalimentação** (feedback), em interação com o ambiente.'
      },
      { kind: 'PEGADINHA', body: '"Como sistema aberto, a organização não sofre influência do ambiente" — ERRADO: o sistema ABERTO justamente troca e recebe influência do ambiente (o fechado é que seria isolado).' },
      { kind: 'PALAVRA_CHAVE', title: 'Taylor científica · Fayol clássica · sistema aberto · feedback' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_FUNC,
    entries: [
      {
        kind: 'RESUMO', title: 'Funções administrativas (Fayol / PODC)',
        body:
          '# Funções administrativas\n\n' +
          'Fayol: **prever, organizar, comandar, coordenar e controlar**. Síntese moderna (PODC):\n\n' +
          '| Função | Essência |\n| --- | --- |\n' +
          '| Planejamento | definir objetivos e meios |\n' +
          '| Organização | estruturar recursos e distribuir tarefas |\n' +
          '| Direção | conduzir e motivar pessoas |\n' +
          '| Coordenação | harmonizar esforços/atividades |\n' +
          '| Controle | medir, comparar e corrigir |\n\n' +
          'Níveis: estratégico (longo prazo), tático (áreas) e operacional (tarefas).'
      },
      { kind: 'DICA', body: 'O edital do ACA cita "planejamento, organização, direção, COORDENAÇÃO e controle" — mantenha a coordenação na lista (diferente da versão PODC de 4 funções).' },
      { kind: 'PEGADINHA', body: '"O controle antecede o planejamento no ciclo" — ERRADO: planejamento é a 1ª função; o controle é a última e realimenta o ciclo.' },
      { kind: 'PALAVRA_CHAVE', title: 'prever/organizar/comandar/coordenar/controlar · níveis' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_MOT,
    entries: [
      {
        kind: 'RESUMO', title: 'Motivação, comunicação e liderança',
        body:
          '# Motivação\n' +
          '- **Maslow**: fisiológicas → segurança → sociais → estima → autorrealização.\n' +
          '- **Herzberg**: higiênicos (salário, condições) evitam insatisfação; motivacionais (reconhecimento, responsabilidade) motivam.\n' +
          '- **McGregor**: Teoria X (controle) × Teoria Y (participação).\n\n' +
          '# Comunicação\n' +
          'Elementos: emissor, mensagem, canal, receptor, código, contexto, **feedback**. **Ruído** = qualquer interferência. Barreiras: físicas, semânticas, psicológicas.\n\n' +
          '# Liderança\n' +
          'Estilos: autocrático, democrático, liberal (laissez-faire); **situacional** (adapta-se à maturidade do liderado).'
      },
      { kind: 'PEGADINHA', body: '"Salário é fator motivacional para Herzberg" — ERRADO: é HIGIÊNICO (evita insatisfação, não motiva).' },
      { kind: 'PALAVRA_CHAVE', title: 'Maslow · Herzberg · X/Y · ruído · liderança situacional' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_GRP,
    entries: [
      {
        kind: 'RESUMO', title: 'Grupos, equipes e desempenho',
        body:
          '# Grupo × equipe\n\n' +
          '| | Grupo | Equipe |\n| --- | --- | --- |\n' +
          '| Meta | individuais somadas | comum |\n' +
          '| Responsabilidade | individual | individual e mútua |\n' +
          '| Sinergia | neutra | positiva |\n\n' +
          '- **Grupos formais** (definidos pela organização) × **informais** (surgem espontaneamente).\n' +
          '- **Papéis**: conjunto de comportamentos esperados de quem ocupa uma posição.\n' +
          '- **Eficiência** (meios) × **eficácia** (fins) × **efetividade** (impacto).'
      },
      { kind: 'PEGADINHA', body: '"Eficiência é atingir os objetivos" — ERRADO: atingir objetivo é EFICÁCIA; eficiência é usar bem os recursos (meios).' },
      { kind: 'PALAVRA_CHAVE', title: 'grupo×equipe · formal×informal · eficiência/eficácia/efetividade' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_DEL,
    entries: [
      {
        kind: 'RESUMO', title: 'Autoridade, poder, responsabilidade e delegação',
        body:
          '# Autoridade × poder × delegação\n\n' +
          '- **Autoridade**: direito formal do CARGO. **Poder**: capacidade real de influenciar (bases: legítimo, recompensa, coercitivo, referência, competência).\n' +
          '- **Responsabilidade**: dever de executar e prestar contas.\n' +
          '- **Delegação**: transferir execução e autoridade; a **responsabilidade final permanece com quem delega**.\n' +
          '- **Coordenação**: integrar esforços de diferentes pessoas/setores rumo ao objetivo comum.\n' +
          '- **Centralização × descentralização**: concentrar × distribuir a decisão.'
      },
      { kind: 'PEGADINHA', body: '"Delegar transfere a responsabilidade final" — ERRADO: delega-se autoridade/execução; a responsabilidade perante o superior permanece.' },
      { kind: 'PALAVRA_CHAVE', title: 'delega autoridade, não responsabilidade · centralização×descentralização' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_QUAL,
    entries: [
      {
        kind: 'RESUMO', title: 'Qualidade na prestação de serviços',
        body:
          '# Qualidade em serviços\n\n' +
          '- **PDCA** (Deming): Plan → Do → Check → Act (melhoria contínua).\n' +
          '- **Foco no cliente/usuário**: qualidade é atender e superar necessidades.\n' +
          '- Serviços são **intangíveis**, **perecíveis** (não se estocam), **inseparáveis** (produção e consumo simultâneos) e **variáveis** (dependem de quem executa).\n' +
          '- Dimensões (SERVQUAL): confiabilidade, presteza, segurança, empatia e tangíveis.'
      },
      { kind: 'DICA', body: 'IBFC liga qualidade a PDCA e ao foco no cliente. Serviço tem 4 características: intangibilidade, perecibilidade, inseparabilidade e variabilidade.' },
      { kind: 'PALAVRA_CHAVE', title: 'PDCA · foco no cliente · serviço intangível/perecível' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_ATEND,
    entries: [
      {
        kind: 'RESUMO', title: 'Atendimento ao público',
        body:
          '# Atendimento ao público\n\n' +
          '- Princípios: **presteza, cortesia, empatia, clareza, objetividade e discrição**.\n' +
          '- **Empatia**: compreender a necessidade do usuário do ponto de vista dele.\n' +
          '- Atendimento a pessoas com deficiência, idosos e gestantes: prioridade legal.\n' +
          '- Comunicação: escuta ativa, linguagem acessível, evitar jargões; no serviço público, **impessoalidade** (tratar todos igualmente).\n' +
          '- Gestão de conflitos e reclamações: ouvir, registrar, encaminhar e dar retorno.'
      },
      { kind: 'PEGADINHA', body: '"No atendimento público, pode-se priorizar conhecidos do servidor" — ERRADO: a IMPESSOALIDADE exige tratamento igualitário; prioridade só a quem a lei garante (idoso, PcD, gestante etc.).' },
      { kind: 'PALAVRA_CHAVE', title: 'presteza · empatia · impessoalidade · prioridades legais' }
    ]
  },
  {
    disciplineSlug: ADM, topic: T_ARQ,
    entries: [
      {
        kind: 'RESUMO', title: 'Documentação e arquivo',
        body:
          '# Noções de arquivo\n\n' +
          '## Idades/fases (teoria das três idades)\n' +
          '- **Corrente**: uso frequente, junto ao setor.\n' +
          '- **Intermediário**: uso eventual, aguarda destinação.\n' +
          '- **Permanente**: valor histórico/probatório; guarda definitiva.\n\n' +
          '## Conceitos\n' +
          '- **Protocolo**: recebimento, registro, distribuição e tramitação de documentos.\n' +
          '- **Tabela de temporalidade**: define prazos de guarda e destinação (eliminação × guarda permanente).\n' +
          '- **Métodos de arquivamento**: alfabético, numérico, geográfico, ideográfico/por assunto.'
      },
      { kind: 'PEGADINHA', body: '"Arquivo permanente é o de uso frequente no setor" — ERRADO: uso frequente é o arquivo CORRENTE; o permanente tem valor histórico e guarda definitiva.' },
      { kind: 'PALAVRA_CHAVE', title: 'corrente/intermediário/permanente · protocolo · temporalidade' }
    ]
  }
]

// ───────────────────────── QUESTÕES (ACA — Administração) ─────────────────────────
const ACA_ADMIN_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ADM, topic: T_ASP, type: 'ME', difficulty: 'FACIL',
    statement: 'A abordagem que concebe a organização como um sistema aberto entende que ela:',
    options: [
      { text: 'não realiza trocas com o ambiente.' },
      { text: 'recebe entradas do ambiente, as processa e devolve saídas, com retroalimentação.', correct: true },
      { text: 'funciona de modo totalmente isolado e imutável.' },
      { text: 'dispensa objetivos organizacionais.' },
      { text: 'elimina a necessidade de recursos.' }
    ],
    explanation: 'CORRETA: "b". Sistema aberto: entradas → processamento → saídas + feedback, em interação com o ambiente. "a"/"c" descrevem sistema fechado; "d"/"e" negam elementos básicos da organização.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_FUNC, type: 'ME', difficulty: 'MEDIO',
    statement: 'Segundo a teoria clássica de Fayol, são funções administrativas:',
    options: [
      { text: 'produção, vendas, finanças e contabilidade.' },
      { text: 'prever, organizar, comandar, coordenar e controlar.', correct: true },
      { text: 'recrutar, treinar, avaliar e demitir.' },
      { text: 'comprar, estocar, distribuir e vender.' },
      { text: 'planejar, programar, executar e faturar.' }
    ],
    explanation: 'CORRETA: "b". Fayol definiu as funções administrativas: prever, organizar, comandar, coordenar e controlar. "a" são funções ORGANIZACIONAIS (áreas da empresa), não administrativas; as demais não correspondem.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_MOT, type: 'ME', difficulty: 'MEDIO',
    statement: 'Na comunicação, qualquer interferência que prejudica a transmissão da mensagem entre emissor e receptor é denominada:',
    options: [
      { text: 'feedback.' }, { text: 'ruído.', correct: true }, { text: 'canal.' }, { text: 'código.' }, { text: 'contexto.' }
    ],
    explanation: 'CORRETA: "b". Ruído é toda interferência no processo comunicativo (física, semântica, psicológica). Feedback é a resposta; canal é o meio; código é o sistema de sinais; contexto é a situação.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_GRP, type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre a distinção entre grupo e equipe de trabalho, é correto afirmar que a equipe:',
    options: [
      { text: 'tem metas apenas individuais, sem responsabilidade mútua.' },
      { text: 'compartilha uma meta comum, com responsabilidade mútua e sinergia positiva.', correct: true },
      { text: 'é sempre informal e espontânea.' },
      { text: 'dispensa qualquer coordenação.' },
      { text: 'produz resultado igual à soma dos esforços individuais.' }
    ],
    explanation: 'CORRETA: "b". A equipe tem meta comum, responsabilidade mútua e sinergia (resultado > soma). "a"/"e" descrevem o grupo; "c" confunde com grupo informal; "d" nega a coordenação necessária.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_DEL, type: 'ME', difficulty: 'MEDIO',
    statement: 'Um chefe de setor administrativo do IBGE delega a um assistente a execução do controle de contratos. Sobre essa delegação:',
    options: [
      { text: 'o chefe deixa de ser responsável pelo resultado perante seu superior.' },
      { text: 'transfere-se a execução e a autoridade necessária, mas a responsabilidade final permanece com o chefe.', correct: true },
      { text: 'o assistente passa a ter autoridade formal sobre todo o setor.' },
      { text: 'a delegação só é válida entre chefes de mesmo nível.' },
      { text: 'delegação e centralização significam o mesmo.' }
    ],
    explanation: 'CORRETA: "b". Delega-se autoridade e execução; a responsabilidade final continua com quem delegou. "a" contraria a regra; "c" exagera o alcance; "d" a delegação é descendente; "e" delegação descentraliza, não é centralização.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_QUAL, type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma característica que distingue os serviços dos produtos e afeta a gestão da qualidade é a:',
    options: [
      { text: 'tangibilidade plena.' },
      { text: 'possibilidade de estocagem para uso futuro.' },
      { text: 'inseparabilidade entre produção e consumo, que ocorrem simultaneamente.', correct: true },
      { text: 'total padronização independente de quem executa.' },
      { text: 'durabilidade indefinida.' }
    ],
    explanation: 'CORRETA: "c". Serviços são inseparáveis (produzidos e consumidos ao mesmo tempo), além de intangíveis, perecíveis e variáveis. "a"/"b"/"d"/"e" descrevem produtos, não serviços.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ATEND, type: 'ME', difficulty: 'FACIL',
    statement: 'No atendimento ao público no serviço federal, a atitude de compreender a necessidade do cidadão sob a perspectiva dele é a:',
    options: [
      { text: 'empatia.', correct: true }, { text: 'antipatia.' }, { text: 'pressa.' }, { text: 'parcialidade.' }, { text: 'informalidade excessiva.' }
    ],
    explanation: 'CORRETA: "a". Empatia é colocar-se no lugar do outro para compreender sua necessidade. As demais prejudicam o atendimento ou ferem a impessoalidade.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ATEND, type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando o princípio da impessoalidade no atendimento ao público, é correto que o servidor:',
    options: [
      { text: 'priorize amigos e familiares na fila.' },
      { text: 'trate todos os cidadãos de forma igualitária, respeitando apenas as prioridades legais.', correct: true },
      { text: 'atenda conforme a simpatia pessoal pelo cidadão.' },
      { text: 'recuse atendimento a quem reclama.' },
      { text: 'dispense retorno às solicitações.' }
    ],
    explanation: 'CORRETA: "b". A impessoalidade exige tratamento igualitário; prioridade só para os casos garantidos por lei (idoso, PcD, gestante etc.). As demais violam a impessoalidade e a qualidade do atendimento.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ARQ, type: 'ME', difficulty: 'MEDIO',
    statement: 'Na teoria das três idades dos arquivos, o arquivo cujos documentos são de uso frequente e permanecem junto ao setor que os produziu é o:',
    options: [
      { text: 'permanente.' }, { text: 'intermediário.' }, { text: 'corrente.', correct: true }, { text: 'histórico.' }, { text: 'morto.' }
    ],
    explanation: 'CORRETA: "c". O arquivo CORRENTE guarda documentos de uso frequente, junto ao setor. O intermediário é de uso eventual; o permanente tem valor histórico e guarda definitiva; "histórico" e "morto" não são as denominações técnicas da fase corrente.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ARQ, type: 'ME', difficulty: 'MEDIO',
    statement: 'O instrumento que define os prazos de guarda dos documentos e sua destinação final (eliminação ou guarda permanente) é a:',
    options: [
      { text: 'tabela de temporalidade.', correct: true }, { text: 'lista de protocolo.' }, { text: 'planilha de estoque.' }, { text: 'folha de ponto.' }, { text: 'ata de reunião.' }
    ],
    explanation: 'CORRETA: "a". A tabela de temporalidade estabelece prazos de guarda e destinação dos documentos. As demais têm outras funções (registro/tramitação, controle de material, frequência, registro de reunião).',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_FUNC, type: 'ME', difficulty: 'MEDIO',
    statement: 'A função administrativa responsável por harmonizar e integrar os esforços das diferentes pessoas e setores rumo aos objetivos comuns é a:',
    options: [
      { text: 'coordenação.', correct: true }, { text: 'previsão.' }, { text: 'controle.' }, { text: 'seleção.' }, { text: 'auditoria.' }
    ],
    explanation: 'CORRETA: "a". A coordenação integra e harmoniza esforços. Previsão/planejamento define objetivos; controle mede e corrige; seleção/auditoria não são funções administrativas do rol de Fayol citado no edital.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_MOT, type: 'ME', difficulty: 'DIFICIL',
    statement: 'Um supervisor adapta seu estilo de liderança conforme a maturidade e a competência de cada membro da equipe, sendo mais diretivo com novatos e delegando mais aos experientes. Esse enfoque corresponde à liderança:',
    options: [
      { text: 'autocrática.' }, { text: 'liberal (laissez-faire).' }, { text: 'situacional.', correct: true }, { text: 'carismática pura.' }, { text: 'burocrática.' }
    ],
    explanation: 'CORRETA: "c". A liderança situacional adapta o estilo à maturidade do liderado. Autocrática decide sozinha sempre; liberal deixa a equipe decidir; carismática se baseia no carisma; burocrática segue normas rígidas.',
    source: S
  }
]

// ───────────────────────── FLASHCARDS (ACA — Administração) ─────────────────────────
const ACA_ADMIN_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACA — Noções de Administração',
    disciplineSlug: ADM,
    description: 'O bloco específico do ACA (35 questões), estilo IBFC.',
    cards: [
      { front: 'Organização como sistema aberto', back: 'Entradas → processamento → saídas + feedback, em troca com o ambiente.', topic: { disciplineSlug: ADM, topic: T_ASP } },
      { front: 'Taylor × Fayol', back: 'Taylor: administração CIENTÍFICA (tempos e movimentos). Fayol: teoria CLÁSSICA (funções e princípios).', topic: { disciplineSlug: ADM, topic: T_ASP } },
      { front: 'Funções de Fayol', back: 'Prever, organizar, comandar, coordenar e controlar.', topic: { disciplineSlug: ADM, topic: T_FUNC } },
      { front: 'Coordenação (função)', back: 'Harmonizar e integrar esforços de pessoas/setores rumo ao objetivo comum.', topic: { disciplineSlug: ADM, topic: T_FUNC } },
      { front: 'Ruído na comunicação', back: 'Qualquer interferência na transmissão da mensagem (física, semântica, psicológica).', topic: { disciplineSlug: ADM, topic: T_MOT } },
      { front: 'Herzberg — salário', back: 'Fator HIGIÊNICO: evita insatisfação, não motiva.', topic: { disciplineSlug: ADM, topic: T_MOT } },
      { front: 'Grupo × equipe', back: 'Grupo: metas somadas. Equipe: meta comum, responsabilidade mútua, sinergia positiva.', topic: { disciplineSlug: ADM, topic: T_GRP } },
      { front: 'Delega-se responsabilidade?', back: 'NÃO — só autoridade/execução. A responsabilidade final fica com quem delega.', topic: { disciplineSlug: ADM, topic: T_DEL } },
      { front: 'Autoridade × poder', back: 'Autoridade = direito formal do cargo. Poder = capacidade real de influenciar.', topic: { disciplineSlug: ADM, topic: T_DEL } },
      { front: 'Características do serviço', back: 'Intangível, perecível (não estoca), inseparável (produz e consome junto) e variável.', topic: { disciplineSlug: ADM, topic: T_QUAL } },
      { front: 'PDCA', back: 'Plan → Do → Check → Act: melhoria contínua da qualidade (Deming).', topic: { disciplineSlug: ADM, topic: T_QUAL } },
      { front: 'Impessoalidade no atendimento', back: 'Tratar todos igualmente; prioridade só a quem a lei garante (idoso, PcD, gestante).', topic: { disciplineSlug: ADM, topic: T_ATEND } },
      { front: 'Empatia', back: 'Compreender a necessidade do cidadão sob a perspectiva dele.', topic: { disciplineSlug: ADM, topic: T_ATEND } },
      { front: 'Três idades do arquivo', back: 'Corrente (uso frequente), intermediário (uso eventual), permanente (valor histórico, guarda definitiva).', topic: { disciplineSlug: ADM, topic: T_ARQ } },
      { front: 'Tabela de temporalidade', back: 'Define prazos de guarda e destinação (eliminar × guarda permanente).', topic: { disciplineSlug: ADM, topic: T_ARQ } },
      { front: 'Protocolo', back: 'Recebimento, registro, distribuição e tramitação de documentos.', topic: { disciplineSlug: ADM, topic: T_ARQ } }
    ]
  }
]

// ───────────────────────── RELAÇÕES (ACA) ─────────────────────────
const ACA_RELATIONS: SeedRelation[] = [
  { from: { disciplineSlug: ADM, topic: T_ASP }, to: { disciplineSlug: ADM, topic: T_FUNC }, kind: 'PRE_REQUISITO', strength: 0.75, note: 'A visão da organização fundamenta o processo administrativo.' },
  { from: { disciplineSlug: ADM, topic: T_FUNC }, to: { disciplineSlug: ADM, topic: T_DEL }, kind: 'CONTINUIDADE', strength: 0.5, note: 'Organizar e dirigir concretizam-se via autoridade e delegação.' },
  { from: { disciplineSlug: ADM, topic: T_MOT }, to: { disciplineSlug: ADM, topic: T_GRP }, kind: 'COMPLEMENTA', strength: 0.6, note: 'Motivação e liderança sustentam equipes de alto desempenho.' },
  { from: { disciplineSlug: ADM, topic: T_QUAL }, to: { disciplineSlug: ADM, topic: T_ATEND }, kind: 'CONTINUIDADE', strength: 0.75, note: 'Qualidade em serviços se materializa no atendimento ao público.' },
  { from: { disciplineSlug: ADM, topic: T_ATEND }, to: { disciplineSlug: ADM, topic: T_ARQ }, kind: 'RELACIONADO', strength: 0.4, note: 'Atendimento e documentação/arquivo integram as rotinas administrativas do ACA.' },
  { from: { disciplineSlug: 'lingua-portuguesa', topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)' }, to: { disciplineSlug: ADM, topic: T_ARQ }, kind: 'RELACIONADO', strength: 0.4, note: 'Redação de documentos administrativos conecta-se à gestão documental.' }
]

// ───────────────────────── CONTEST ─────────────────────────
export const IBGE_ACA_CONTEST: ContestSeed = {
  slug: 'ibge-2026-aca',
  name: 'IBGE 2026 — Censo (ACA)',
  role: 'Agente Censitário Administrativo (ACA)',
  board: 'IBFC',
  examDate: '2026-09-28',
  city: 'Nacional (diversos municípios)',
  salary: 'R$ 2.128,00',
  benefits:
    'Contratação temporária (Lei nº 8.745/1993); Edital nº 01/2026 (IBFC); ensino médio completo; jornada 40h semanais; 12º Censo Agropecuário; prova objetiva 60 questões (LP 15 + RLQ 10 + Noções de Administração 35, peso 1, janela 28–30/09/2026, 4h); aprovação: mínimo 18 pts no total e ao menos 1 ponto em cada disciplina',
  examConfig: {
    durationMin: 240,
    blocks: [
      { block: 'GERAL', label: 'Conhecimentos Gerais', questions: 25, weightPerQuestion: 1, minScorePct: 0 },
      { block: 'ESPECIFICO', label: 'Conhecimentos Específicos', questions: 35, weightPerQuestion: 1, minScorePct: 0 }
    ],
    approvalTargetPct: 50
  },
  disciplines: [IBGE_LP_DISCIPLINE, IBGE_RLQ_DISCIPLINE, ACA_ADMIN_DISCIPLINE],
  questions: [...IBGE_SHARED_QUESTIONS, ...ACA_ADMIN_QUESTIONS],
  knowledge: [...IBGE_SHARED_KNOWLEDGE, ...IBGE_RLQ_KNOWLEDGE, ...ACA_ADMIN_KNOWLEDGE],
  relations: ACA_RELATIONS,
  starterDecks: [...IBGE_SHARED_DECKS, ...ACA_ADMIN_DECKS]
}
