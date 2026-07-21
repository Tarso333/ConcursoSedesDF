// M28 — Banco de questões IBFC do ACA: Noções de Administração (inclui
// atendimento ao público e documentação/arquivo). APENAS DADOS; idempotente
// por seed_key. Comentário alternativa a alternativa; dificuldade ~35/45/20.
import type { SeedQuestion } from '../../questions'

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

export const IBGE_BANK_ACA_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ADM, topic: T_ASP, type: 'ME', difficulty: 'FACIL',
    statement: 'A abordagem burocrática de Max Weber caracteriza-se, entre outros aspectos, por:',
    options: [
      { text: 'informalidade e ausência de normas.' },
      { text: 'hierarquia, impessoalidade e formalização por normas escritas.', correct: true },
      { text: 'decisões baseadas em laços pessoais.' },
      { text: 'inexistência de divisão do trabalho.' },
      { text: 'promoção por afinidade com a chefia.' }
    ],
    explanation:
      'A) ERRADA — a burocracia é formal e regida por normas. B) CORRETA — hierarquia de autoridade, impessoalidade e regras escritas são pilares do modelo weberiano. C) ERRADA — a impessoalidade afasta os laços pessoais. D) ERRADA — há divisão do trabalho e especialização. E) ERRADA — a promoção segue mérito/competência técnica, não afinidade.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_FUNC, type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando as funções administrativas segundo Fayol, "harmonizar e integrar os esforços dos diversos setores" corresponde à função de:',
    options: [
      { text: 'planejamento.' },
      { text: 'organização.' },
      { text: 'coordenação.', correct: true },
      { text: 'direção.' },
      { text: 'controle.' }
    ],
    explanation:
      'A) ERRADA — planejar é definir objetivos e meios. B) ERRADA — organizar é estruturar recursos e atribuições. C) CORRETA — coordenar é harmonizar/integrar os esforços das diferentes partes. D) ERRADA — dirigir é conduzir e motivar pessoas. E) ERRADA — controlar é medir e corrigir.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_MOT, type: 'ME', difficulty: 'DIFICIL',
    statement: 'Na Teoria dos Dois Fatores de Herzberg, a MELHORIA apenas dos fatores higiênicos tende a:',
    options: [
      { text: 'gerar alta motivação e satisfação duradoura.' },
      { text: 'apenas reduzir a insatisfação, sem produzir motivação.', correct: true },
      { text: 'aumentar automaticamente a produtividade em longo prazo.' },
      { text: 'substituir a necessidade de reconhecimento.' },
      { text: 'eliminar a importância do conteúdo do trabalho.' }
    ],
    explanation:
      'A) ERRADA — higiênicos não geram motivação, apenas evitam a insatisfação. B) CORRETA — melhorar salário, condições e supervisão reduz a insatisfação, mas não motiva (isso depende dos fatores motivacionais). C) ERRADA — não há aumento automático e duradouro de produtividade. D) ERRADA — reconhecimento é fator motivacional, não substituível por higiênicos. E) ERRADA — o conteúdo do trabalho (motivacional) permanece essencial.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_MOT, type: 'ME', difficulty: 'FACIL',
    statement: 'No processo de comunicação, o elemento responsável por converter a mensagem em um retorno ao emissor, permitindo verificar se ela foi compreendida, é o:',
    options: [
      { text: 'ruído.' },
      { text: 'feedback.', correct: true },
      { text: 'canal.' },
      { text: 'código.' },
      { text: 'receptor passivo.' }
    ],
    explanation:
      'A) ERRADA — ruído é interferência que prejudica a mensagem. B) CORRETA — o feedback é a resposta do receptor que confirma (ou não) a compreensão. C) ERRADA — canal é o meio de transmissão. D) ERRADA — código é o sistema de sinais (idioma). E) ERRADA — no feedback o receptor deixa de ser passivo e responde.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_GRP, type: 'ME', difficulty: 'MEDIO',
    statement: 'Os grupos que surgem espontaneamente nas organizações, a partir das relações de afinidade entre as pessoas, e não do organograma formal, são denominados grupos:',
    options: [
      { text: 'formais.' },
      { text: 'informais.', correct: true },
      { text: 'funcionais.' },
      { text: 'permanentes.' },
      { text: 'de comando.' }
    ],
    explanation:
      'A) ERRADA — grupos formais são criados pela estrutura oficial (organograma). B) CORRETA — os informais nascem espontaneamente das afinidades. C)/D)/E) ERRADAS — grupos funcionais, permanentes e de comando são tipos de grupos FORMAIS, definidos pela organização.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_DEL, type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre a delegação, assinale a alternativa correta.',
    options: [
      { text: 'Transfere-se a responsabilidade final, isentando o delegante.' },
      { text: 'Transfere-se a autoridade e a execução, mas o delegante permanece responsável.', correct: true },
      { text: 'É o mesmo que centralizar decisões.' },
      { text: 'Ocorre apenas entre pessoas de mesmo nível hierárquico.' },
      { text: 'Elimina a necessidade de acompanhamento.' }
    ],
    explanation:
      'A) ERRADA — a responsabilidade final NÃO se transfere; permanece com quem delega. B) CORRETA — delega-se autoridade/execução, mantendo-se a responsabilidade perante o superior. C) ERRADA — delegação é forma de DESCENTRALIZAR, oposto de centralizar. D) ERRADA — a delegação é descendente (chefe → subordinado). E) ERRADA — o delegante deve acompanhar/controlar o resultado.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_QUAL, type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma característica dos serviços que os distingue dos bens materiais e impede seu armazenamento para uso posterior é a:',
    options: [
      { text: 'tangibilidade.' },
      { text: 'perecibilidade.', correct: true },
      { text: 'durabilidade.' },
      { text: 'padronização total.' },
      { text: 'estocabilidade.' }
    ],
    explanation:
      'A) ERRADA — serviços são INTANGÍVEIS. B) CORRETA — a perecibilidade significa que o serviço não pode ser estocado (um horário de atendimento não usado se perde). C)/E) ERRADAS — serviços não são duráveis nem estocáveis. D) ERRADA — serviços são variáveis (dependem de quem executa), não totalmente padronizados.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ATEND, type: 'ME', difficulty: 'FACIL',
    statement: 'No atendimento ao público, a postura que consiste em ouvir com atenção plena, sem interrupções, buscando compreender integralmente a demanda do cidadão, é a:',
    options: [
      { text: 'escuta ativa.', correct: true },
      { text: 'comunicação unilateral.' },
      { text: 'triagem automática.' },
      { text: 'padronização de respostas.' },
      { text: 'delegação de tarefas.' }
    ],
    explanation:
      'A) CORRETA — escuta ativa é ouvir com atenção plena para compreender a real necessidade. B) ERRADA — comunicação unilateral não considera o retorno do cidadão. C)/D) ERRADAS — triagem e padronização podem ajudar, mas não descrevem a escuta atenta. E) ERRADA — delegação é de gestão, não de atendimento direto.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ATEND, type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando os princípios da Administração Pública, o atendimento ao público deve pautar-se pela IMPESSOALIDADE, o que significa:',
    options: [
      { text: 'atender primeiro quem o servidor conhece.' },
      { text: 'tratar todos os cidadãos igualmente, sem privilégios pessoais.', correct: true },
      { text: 'negar informações ao público.' },
      { text: 'priorizar quem oferece vantagens.' },
      { text: 'atender conforme a simpatia pelo cidadão.' }
    ],
    explanation:
      'A)/D)/E) ERRADAS — privilegiar conhecidos, quem oferece vantagens ou por simpatia fere a impessoalidade. B) CORRETA — impessoalidade é tratamento igualitário, ressalvadas apenas as prioridades legais (idoso, PcD, gestante). C) ERRADA — a publicidade/transparência exige prestar as informações devidas.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ARQ, type: 'ME', difficulty: 'MEDIO',
    statement: 'Documentos que já cumpriram sua finalidade administrativa imediata, mas ainda precisam ser guardados por razões legais antes da destinação final, encontram-se no arquivo:',
    options: [
      { text: 'corrente.' },
      { text: 'intermediário.', correct: true },
      { text: 'permanente.' },
      { text: 'setorial ativo.' },
      { text: 'digital.' }
    ],
    explanation:
      'A) ERRADA — o corrente guarda documentos de uso frequente. B) CORRETA — o intermediário guarda documentos de uso eventual, aguardando o cumprimento de prazos antes da eliminação ou recolhimento. C) ERRADA — o permanente é de guarda definitiva (valor histórico). D)/E) ERRADAS — não são fases da teoria das três idades.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_ARQ, type: 'ME', difficulty: 'FACIL',
    statement: 'O conjunto de operações de recebimento, registro, distribuição e controle da tramitação de documentos em uma organização é o:',
    options: [
      { text: 'inventário.' },
      { text: 'protocolo.', correct: true },
      { text: 'arquivamento permanente.' },
      { text: 'descarte.' },
      { text: 'tombamento.' }
    ],
    explanation:
      'A) ERRADA — inventário é o levantamento de bens/materiais. B) CORRETA — protocolo abrange receber, registrar, distribuir e controlar a tramitação dos documentos. C) ERRADA — o arquivamento permanente é a guarda definitiva. D) ERRADA — descarte é a eliminação após a temporalidade. E) ERRADA — tombamento é registro patrimonial de bens.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: T_FUNC, type: 'ME', difficulty: 'FACIL',
    statement: 'O planejamento de longo prazo, que abrange a organização como um todo e define seus grandes objetivos, é o planejamento:',
    options: [
      { text: 'operacional.' },
      { text: 'tático.' },
      { text: 'estratégico.', correct: true },
      { text: 'emergencial.' },
      { text: 'rotineiro.' }
    ],
    explanation:
      'A) ERRADA — o operacional é de curto prazo e trata de tarefas específicas. B) ERRADA — o tático é de médio prazo, por área/departamento. C) CORRETA — o estratégico é de longo prazo e abrange toda a organização. D)/E) ERRADAS — não são níveis clássicos de planejamento.',
    source: S
  }
]
