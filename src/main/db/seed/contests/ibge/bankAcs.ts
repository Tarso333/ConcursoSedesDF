// M28 — Banco de questões IBFC do ACS: Noções de Administração/Situações
// Gerenciais e Conhecimentos Técnicos (Censo). APENAS DADOS; idempotente por
// seed_key. Comentário alternativa a alternativa; dificuldade ~35/45/20.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo IBFC)'
const ADM = 'administracao-situacoes-gerenciais'
const CT = 'conhecimentos-tecnicos-censo'

export const IBGE_BANK_ACS_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: ADM, topic: 'Aspectos gerais da Administração; organizações como sistemas abertos', type: 'ME', difficulty: 'FACIL',
    statement: 'A escola da Administração que se concentrou na racionalização do trabalho no nível operacional, com o estudo de tempos e movimentos, foi a:',
    options: [
      { text: 'Teoria das Relações Humanas.' },
      { text: 'Administração Científica de Taylor.', correct: true },
      { text: 'Teoria Burocrática de Weber.' },
      { text: 'Teoria dos Sistemas.' },
      { text: 'Teoria Contingencial.' }
    ],
    explanation:
      'A) ERRADA — as Relações Humanas (Mayo) focaram o fator humano e os grupos informais. B) CORRETA — Taylor (Administração Científica) racionalizou o trabalho operário com tempos e movimentos. C) ERRADA — Weber tratou da burocracia (normas, hierarquia, impessoalidade). D) ERRADA — a Teoria dos Sistemas vê a organização como sistema aberto. E) ERRADA — a Contingencial defende que não há um único modo ideal (depende do contexto).',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Funções administrativas', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um supervisor define as metas diárias de coleta, distribui as áreas entre os recenseadores, acompanha o trabalho em campo e, ao final, confere os resultados com o previsto. Essas ações correspondem, respectivamente, às funções administrativas de:',
    options: [
      { text: 'organização, direção, controle e planejamento.' },
      { text: 'planejamento, organização, direção e controle.', correct: true },
      { text: 'controle, planejamento, organização e direção.' },
      { text: 'direção, controle, planejamento e organização.' },
      { text: 'planejamento, controle, organização e direção.' }
    ],
    explanation:
      'Definir metas = PLANEJAMENTO; distribuir áreas/tarefas = ORGANIZAÇÃO; acompanhar/conduzir = DIREÇÃO; conferir resultados com o previsto = CONTROLE. B) CORRETA — segue exatamente essa ordem (PODC). A)/C)/D)/E) ERRADAS — embaralham a correspondência entre a ação e a função.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Motivação, comunicação e liderança', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na hierarquia das necessidades de Maslow, a necessidade de reconhecimento, status e prestígio situa-se no nível de:',
    options: [
      { text: 'necessidades fisiológicas.' },
      { text: 'necessidades de segurança.' },
      { text: 'necessidades sociais.' },
      { text: 'necessidades de estima.', correct: true },
      { text: 'necessidades de autorrealização.' }
    ],
    explanation:
      'A) ERRADA — fisiológicas são as básicas (fome, sono). B) ERRADA — segurança envolve proteção e estabilidade. C) ERRADA — sociais são afeto e pertencimento. D) CORRETA — estima abrange reconhecimento, status e prestígio. E) ERRADA — autorrealização é o topo (crescimento e realização do potencial).',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Motivação, comunicação e liderança', type: 'ME', difficulty: 'FACIL',
    statement: 'Segundo a Teoria X e Y de McGregor, a Teoria Y pressupõe que as pessoas:',
    options: [
      { text: 'evitam o trabalho e precisam de controle rígido.' },
      { text: 'buscam responsabilidade e podem se autodirigir.', correct: true },
      { text: 'só reagem a punições.' },
      { text: 'não têm criatividade.' },
      { text: 'trabalham apenas por dinheiro.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — descrevem a visão PESSIMISTA da Teoria X (controle, punição, ausência de iniciativa). B) CORRETA — a Teoria Y é otimista: as pessoas gostam de trabalhar, buscam responsabilidade e são capazes de autodireção e autocontrole.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Processo decisório e resolução de problemas', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma decisão rotineira, repetitiva, para a qual a organização já possui um procedimento padrão, é classificada como decisão:',
    options: [
      { text: 'não programada.' },
      { text: 'programada.', correct: true },
      { text: 'estratégica.' },
      { text: 'de incerteza total.' },
      { text: 'intuitiva.' }
    ],
    explanation:
      'A) ERRADA — não programadas são novas e complexas, sem rotina definida. B) CORRETA — decisões programadas são rotineiras e seguem procedimentos preestabelecidos. C) ERRADA — estratégica refere-se ao nível/alcance, não à repetitividade. D) ERRADA — a existência de procedimento reduz a incerteza. E) ERRADA — a rotina dispensa a intuição pura.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Responsabilidade, coordenação, autoridade, poder e delegação', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Um gestor consegue influenciar a equipe porque os membros o admiram e desejam ser como ele. Na tipologia de French e Raven, esse poder é o poder:',
    options: [
      { text: 'legítimo.' },
      { text: 'de recompensa.' },
      { text: 'coercitivo.' },
      { text: 'de referência.', correct: true },
      { text: 'de competência.' }
    ],
    explanation:
      'A) ERRADA — poder legítimo decorre do cargo/autoridade formal. B) ERRADA — de recompensa vem da capacidade de premiar. C) ERRADA — coercitivo baseia-se na punição. D) CORRETA — poder de referência baseia-se na identificação/admiração (carisma). E) ERRADA — de competência (perito) vem do conhecimento técnico reconhecido.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho', type: 'ME', difficulty: 'MEDIO',
    statement: 'Considere: eficiência, eficácia e efetividade. Um programa que utiliza poucos recursos, atinge as metas previstas e ainda gera transformação social duradoura é, respectivamente:',
    options: [
      { text: 'eficaz, eficiente e efetivo.' },
      { text: 'eficiente, eficaz e efetivo.', correct: true },
      { text: 'efetivo, eficiente e eficaz.' },
      { text: 'eficiente, efetivo e eficaz.' },
      { text: 'eficaz, efetivo e eficiente.' }
    ],
    explanation:
      'Poucos recursos (meios) = EFICIENTE; atinge as metas (fins) = EFICAZ; transformação duradoura (impacto) = EFETIVO. B) CORRETA — segue exatamente essa ordem. A)/C)/D)/E) ERRADAS — trocam os conceitos (a pegadinha clássica eficiência × eficácia).',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Avaliação de desempenho', type: 'ME', difficulty: 'MEDIO',
    statement: 'O método de avaliação de desempenho em que o servidor é avaliado por seu chefe, seus pares, seus subordinados e por si mesmo é conhecido como:',
    options: [
      { text: 'escala gráfica.' },
      { text: 'avaliação 360 graus.', correct: true },
      { text: 'incidentes críticos.' },
      { text: 'avaliação por objetivos.' },
      { text: 'distribuição forçada.' }
    ],
    explanation:
      'A) ERRADA — escala gráfica usa fatores pontuados por um único avaliador. B) CORRETA — a avaliação 360° reúne múltiplas fontes (chefe, pares, subordinados e autoavaliação). C) ERRADA — incidentes críticos registram fatos marcantes (positivos/negativos). D) ERRADA — APO compara resultados com metas acordadas. E) ERRADA — distribuição forçada enquadra avaliados em uma curva.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Compromisso com a qualidade nos serviços prestados', type: 'ME', difficulty: 'FACIL',
    statement: 'No ciclo PDCA, a etapa em que se verificam os resultados obtidos, comparando-os com o planejado, é a etapa:',
    options: [
      { text: 'Plan (planejar).' },
      { text: 'Do (executar).' },
      { text: 'Check (verificar).', correct: true },
      { text: 'Act (agir).' },
      { text: 'Start (iniciar).' }
    ],
    explanation:
      'A) ERRADA — "Plan" define metas e métodos. B) ERRADA — "Do" executa o planejado. C) CORRETA — "Check" verifica/mede os resultados frente ao planejado. D) ERRADA — "Act" padroniza o que deu certo ou corrige desvios. E) ERRADA — "Start" não faz parte do ciclo PDCA.',
    source: S
  },
  {
    disciplineSlug: ADM, topic: 'Controle', type: 'ME', difficulty: 'MEDIO',
    statement: 'O controle exercido DURANTE a execução das atividades, permitindo correções em tempo real, é classificado como controle:',
    options: [
      { text: 'prévio (preventivo).' },
      { text: 'concomitante.', correct: true },
      { text: 'posterior (corretivo).' },
      { text: 'estratégico.' },
      { text: 'orçamentário.' }
    ],
    explanation:
      'A) ERRADA — o controle prévio ocorre ANTES, para evitar problemas. B) CORRETA — o controle concomitante acontece DURANTE a execução (monitoramento em tempo real). C) ERRADA — o posterior ocorre APÓS o fato. D)/E) ERRADAS — referem-se a nível/objeto do controle, não ao momento.',
    source: S
  },
  // ── Conhecimentos Técnicos (Censo) ──
  {
    disciplineSlug: CT, topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências', type: 'ME', difficulty: 'MEDIO',
    statement: 'Durante a operação censitária, o indicador que expressa a proporção de unidades já recenseadas em relação ao total previsto para a área é a:',
    options: [
      { text: 'produtividade.' },
      { text: 'cobertura.', correct: true },
      { text: 'pendência.' },
      { text: 'amostragem.' },
      { text: 'rotatividade.' }
    ],
    explanation:
      'A) ERRADA — produtividade mede o volume de coletas por recenseador/tempo. B) CORRETA — cobertura é a proporção do previsto que já foi recenseado. C) ERRADA — pendência são as unidades ainda não resolvidas. D) ERRADA — amostragem é técnica de seleção, não indicador de andamento. E) ERRADA — rotatividade refere-se à troca de pessoal.',
    source: S
  },
  {
    disciplineSlug: CT, topic: 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta', type: 'ME', difficulty: 'FACIL',
    statement: 'A coleta do Censo em áreas sem sinal de internet e a posterior transmissão quando há conectividade caracterizam a operação em modo:',
    options: [
      { text: 'exclusivamente online.' },
      { text: 'online e offline (com transmissão posterior).', correct: true },
      { text: 'apenas em papel.' },
      { text: 'por telefone.' },
      { text: 'sem registro de logs.' }
    ],
    explanation:
      'A) ERRADA — a coleta não depende de estar sempre online. B) CORRETA — o DMC permite coletar offline e transmitir quando há Wi-Fi/4G. C) ERRADA — a coleta é digital (DMC), não em papel. D) ERRADA — não é feita por telefone. E) ERRADA — há registros/logs de transmissão que o supervisor acompanha.',
    source: S
  },
  {
    disciplineSlug: CT, topic: 'Mediação com informantes e articulação institucional local', type: 'ME', difficulty: 'MEDIO',
    statement: 'À luz da Lei nº 5.534/1968, a prestação de informações ao IBGE pelos informantes é:',
    options: [
      { text: 'facultativa e sem qualquer sigilo.' },
      { text: 'obrigatória, com garantia de sigilo e uso exclusivamente estatístico.', correct: true },
      { text: 'obrigatória, mas os dados podem ser divulgados individualmente.' },
      { text: 'facultativa, com sigilo garantido.' },
      { text: 'obrigatória apenas para órgãos públicos.' }
    ],
    explanation:
      'A) ERRADA — a prestação é obrigatória e há sigilo. B) CORRETA — a lei torna a informação obrigatória, resguardando o sigilo e a finalidade estatística. C) ERRADA — os dados individuais NÃO podem ser divulgados. D) ERRADA — não é facultativa. E) ERRADA — a obrigatoriedade alcança os informantes em geral, não só órgãos públicos.',
    source: S
  },
  {
    disciplineSlug: CT, topic: 'Conhecimentos técnicos do 12º Censo Agropecuário, Florestal e Aquícola (apostila oficial)', type: 'ME', difficulty: 'FACIL',
    statement: 'O Censo Agropecuário do IBGE tem por objeto retratar:',
    options: [
      { text: 'a população residente em domicílios urbanos.' },
      { text: 'a estrutura e a produção dos estabelecimentos agropecuários, florestais e aquícolas.', correct: true },
      { text: 'o fluxo de veículos nas rodovias federais.' },
      { text: 'os preços ao consumidor nas capitais.' },
      { text: 'o desempenho das escolas públicas.' }
    ],
    explanation:
      'A) ERRADA — população em domicílios é objeto do Censo Demográfico. B) CORRETA — o Censo Agropecuário investiga os estabelecimentos agropecuários (estrutura, produção, área, pessoal ocupado). C)/D)/E) ERRADAS — trânsito, preços e educação são objeto de outras pesquisas, não do Censo Agropecuário.',
    source: S
  }
]
