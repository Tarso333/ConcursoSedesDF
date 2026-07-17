// Pacote de enriquecimento de conteúdo do SEDES DF 2026 (Quadrix) — M23.
// APENAS DADOS, engines intactas. Preenche disciplinas que estavam com 0% de
// cobertura de conhecimento e adiciona os primeiros flashcards do concurso.
// Idempotência: conhecimento por tópico (só entra se o tópico não tem nada);
// questões por seed_key; deck por nome; relações por (origem, destino, tipo).
import type { SeedQuestion } from '../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from './types'

const Q = 'Banco de estudo (estilo Quadrix — lei seca)'

// ───────────────────────── CONHECIMENTO ─────────────────────────
export const SEDES_PACK_KNOWLEDGE: SeedTopicKnowledge[] = [
  // ── Gestão da Assistência Social (estava 0%) ──
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Financiamento (FNAS e pisos de proteção)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Financiamento do SUAS — fundos e pisos',
        body:
          '# Financiamento do SUAS\n\n' +
          'O SUAS é cofinanciado pelos **três entes** (União, estados/DF e municípios), de forma **automática e regular**, do **fundo nacional aos fundos estaduais/municipais** (repasse fundo a fundo).\n\n' +
          '## Fundos\n' +
          '- **FNAS** (Fundo Nacional de Assistência Social): gere os recursos federais.\n' +
          '- Cada ente tem seu fundo (FEAS, FDAS/FMAS), com **conselho** e **plano** correspondentes — condição para receber repasses.\n\n' +
          '## Pisos (blocos de financiamento por nível de proteção)\n' +
          '| Proteção | Exemplos de pisos |\n| --- | --- |\n' +
          '| **Básica** | Piso Básico Fixo (PAIF/CRAS), Piso Básico Variável (SCFV) |\n' +
          '| **Especial média complexidade** | Piso Fixo de Média Complexidade (PAEFI/CREAS) |\n' +
          '| **Especial alta complexidade** | Piso de Alta Complexidade I e II (acolhimento) |\n\n' +
          'Condições para o repasse: fundo + conselho + plano de assistência social, todos **em funcionamento**.'
      },
      {
        kind: 'CONCEITO',
        title: 'Repasse fundo a fundo',
        body: 'Transferência **automática e regular** de recursos do FNAS diretamente aos fundos dos entes, sem necessidade de convênio, condicionada à existência de fundo, conselho e plano.'
      },
      { kind: 'DICA', body: 'A Quadrix cobra a tríade **Conselho + Fundo + Plano** como condição para o cofinanciamento. Decore: sem os três, não há repasse.' },
      { kind: 'PEGADINHA', body: '"O financiamento do SUAS é exclusivamente federal" — **ERRADO**: é **cofinanciamento** dos três entes federados.' },
      { kind: 'PALAVRA_CHAVE', title: 'FNAS · fundo a fundo · pisos' },
      { kind: 'PALAVRA_CHAVE', title: 'Conselho + Fundo + Plano' }
    ]
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Controle social e conselhos de assistência social',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Controle social no SUAS',
        body:
          '# Controle social\n\n' +
          'Participação da sociedade na **formulação, fiscalização e deliberação** das políticas de assistência social. Instrumentos: **conselhos** e **conferências**.\n\n' +
          '## Conselhos (CNAS, CAS/DF, CMAS)\n' +
          '- **Paritários**: metade governo, metade sociedade civil.\n' +
          '- **Deliberativos** e permanentes; aprovam planos, orçamento do fundo e prestação de contas.\n\n' +
          '## Conferências\n' +
          'Espaços periódicos de avaliação e definição de diretrizes, convocadas pelos conselhos.'
      },
      { kind: 'CONCEITO', title: 'Paridade', body: 'Composição meio a meio entre representantes governamentais e da sociedade civil — garante o equilíbrio no controle social.' },
      { kind: 'PEGADINHA', body: '"Os conselhos de assistência social têm caráter apenas consultivo" — **ERRADO**: são **deliberativos** (e também fiscalizadores), não meramente consultivos.' },
      { kind: 'PALAVRA_CHAVE', title: 'conselho paritário e deliberativo' }
    ]
  },
  // ── Programas Socioassistenciais (estava 0%) ──
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Cadastro Único (CadÚnico)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'CadÚnico — porta de entrada dos programas sociais',
        body:
          '# Cadastro Único (CadÚnico)\n\n' +
          'Instrumento de **identificação e caracterização socioeconômica** das famílias de **baixa renda**, usado para selecionar beneficiários de diversos programas (Bolsa Família/PBF, BPC, Tarifa Social, etc.).\n\n' +
          '## Público\n' +
          '- Famílias com renda mensal de até **meio salário mínimo por pessoa**, OU\n' +
          '- Renda total de até **três salários mínimos**.\n\n' +
          '## Regras\n' +
          '- Cadastro por **família** (unidade), com um **Responsável pela Unidade Familiar (RF)** — preferencialmente **mulher**.\n' +
          '- Deve ser **atualizado a cada 2 anos** (ou sempre que houver mudança).'
      },
      { kind: 'CONCEITO', title: 'Responsável Familiar (RF)', body: 'Membro da família, com 16+ anos, que responde pelas informações do cadastro — preferencialmente a mulher da família.' },
      { kind: 'DICA', body: 'Grave os limites: **½ salário mínimo por pessoa** ou **3 salários mínimos no total**. Atualização a cada **2 anos**.' },
      { kind: 'PEGADINHA', body: '"Estar no CadÚnico garante o recebimento do Bolsa Família" — **ERRADO**: o CadÚnico é pré-requisito, mas o benefício depende dos critérios específicos de cada programa.' },
      { kind: 'PALAVRA_CHAVE', title: '½ SM per capita · 3 SM total · RF' }
    ]
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'SCFV — proteção básica em grupo',
        body:
          '# SCFV\n\n' +
          'Serviço da **Proteção Social Básica**, ofertado de forma **complementar ao PAIF**, organizado em **grupos** por ciclo de vida (crianças, adolescentes, jovens, adultos e idosos).\n\n' +
          '- Objetivo: **prevenir** situações de risco, fortalecer vínculos familiares e comunitários e desenvolver a autonomia.\n' +
          '- Vinculado ao **CRAS** (referência e contrarreferência).\n' +
          '- Caráter **preventivo e proativo**, pautado na convivência.'
      },
      { kind: 'PEGADINHA', body: '"O SCFV é serviço da Proteção Social Especial" — **ERRADO**: é da **Proteção Social Básica**, complementar ao PAIF.' },
      { kind: 'PALAVRA_CHAVE', title: 'SCFV · PAIF · CRAS · prevenção' }
    ]
  },
  // ── Regime Jurídico dos Servidores do DF (estava 0%) ──
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Provimento, vacância e formas de ingresso',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Provimento e vacância (LC 840/2011)',
        body:
          '# Provimento e vacância — LC 840/2011\n\n' +
          '## Formas de provimento\n' +
          'Nomeação, promoção, readaptação, reversão, reintegração, recondução e aproveitamento.\n\n' +
          '## Formas de vacância\n' +
          'Exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável e falecimento.\n\n' +
          '## Nomeação e posse\n' +
          '- **Posse**: até **30 dias** da publicação da nomeação.\n' +
          '- **Exercício**: até **15 dias** da posse.\n' +
          '- **Estágio probatório**: **3 anos** (avaliação de aptidão e capacidade).'
      },
      { kind: 'CONCEITO', title: 'Exoneração × demissão', body: 'Exoneração NÃO tem caráter punitivo (a pedido ou de cargo em comissão). Demissão é **penalidade** disciplinar.' },
      { kind: 'DICA', body: 'Prazos-chave da LC 840: posse **30 dias**, exercício **15 dias**, estágio probatório **3 anos**. A Quadrix adora trocar esses números.' },
      { kind: 'PEGADINHA', body: '"Demissão e exoneração são sinônimos" — **ERRADO**: demissão é punição; exoneração não tem natureza punitiva.' },
      { kind: 'PALAVRA_CHAVE', title: 'posse 30d · exercício 15d · probatório 3 anos' }
    ]
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Deveres, proibições e responsabilidades',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Deveres, proibições e responsabilização',
        body:
          '# Deveres × proibições × responsabilidades\n\n' +
          '## Responsabilidades (podem ser cumulativas)\n' +
          '- **Civil**: dano ao erário ou a terceiros (indenização).\n' +
          '- **Penal**: crime ou contravenção.\n' +
          '- **Administrativa**: infração funcional (apurada por PAD).\n\n' +
          'As três esferas são **independentes**; a absolvição penal só repercute nas demais se negar o **fato** ou a **autoria**.\n\n' +
          '## Penalidades disciplinares\n' +
          'Advertência, suspensão, demissão, cassação de aposentadoria/disponibilidade, destituição de cargo em comissão.'
      },
      { kind: 'PEGADINHA', body: '"A absolvição no processo penal sempre extingue a punição administrativa" — **ERRADO**: só quando nega a existência do fato ou a autoria.' },
      { kind: 'PALAVRA_CHAVE', title: 'civil · penal · administrativa (independentes)' }
    ]
  },
  // ── Administração de Materiais e Patrimônio (estava 0%) ──
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão de estoques e armazenagem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Gestão de estoques — conceitos de prova',
        body:
          '# Gestão de estoques\n\n' +
          '## Indicadores\n' +
          '- **Ponto de pedido**: nível de estoque que dispara nova compra.\n' +
          '- **Estoque de segurança**: reserva para oscilações de demanda/prazo.\n' +
          '- **Estoque máximo/mínimo**: limites de controle.\n' +
          '- **Giro de estoque**: quantas vezes o estoque se renova no período.\n\n' +
          '## Métodos de avaliação\n' +
          '- **PEPS/FIFO**: primeiro que entra, primeiro que sai.\n' +
          '- **UEPS/LIFO**: último que entra, primeiro que sai.\n' +
          '- **Custo médio ponderado**.\n\n' +
          '## Curva ABC\n' +
          'Classifica itens por **valor/importância**: A (poucos itens, muito valor), B (intermediário), C (muitos itens, pouco valor).'
      },
      { kind: 'CONCEITO', title: 'Curva ABC', body: 'Aplicação do princípio de Pareto ao estoque: ~20% dos itens (classe A) concentram ~80% do valor — merecem controle rigoroso.' },
      { kind: 'DICA', body: 'PEPS = FIFO (First In First Out); UEPS = LIFO. A Quadrix costuma cobrar a correspondência das siglas.' },
      { kind: 'PEGADINHA', body: '"Na curva ABC, os itens A são os mais numerosos" — **ERRADO**: A são **poucos** itens, de **maior** valor.' },
      { kind: 'PALAVRA_CHAVE', title: 'PEPS/FIFO · UEPS/LIFO · curva ABC · ponto de pedido' }
    ]
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão patrimonial: tombamento, inventário e baixa de bens',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Ciclo do bem patrimonial público',
        body:
          '# Gestão patrimonial\n\n' +
          '- **Tombamento** (aqui = registro patrimonial): incorporação do bem ao patrimônio com número de identificação (não confundir com tombamento de patrimônio histórico).\n' +
          '- **Inventário**: levantamento físico e contábil periódico dos bens; confere existência, localização e estado.\n' +
          '- **Baixa**: exclusão do bem do patrimônio (por alienação, inservibilidade, doação, extravio).\n\n' +
          '## Bens inservíveis (classificação)\n' +
          '**Ocioso** (não usado), **recuperável** (conserto < 50% do valor), **antieconômico** (manutenção onerosa) e **irrecuperável** (não serve mais).'
      },
      { kind: 'PEGADINHA', body: 'Bem **recuperável** é aquele cujo conserto é **viável** (custo até ~50% do valor); acima disso tende a ser **antieconômico/irrecuperável**.' },
      { kind: 'PALAVRA_CHAVE', title: 'tombamento · inventário · baixa · inservível' }
    ]
  },
  // ── Atendimento ao Público (estava 0%) ──
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Redação oficial e comunicações administrativas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Redação oficial — princípios e o padrão ofício',
        body:
          '# Redação oficial (Manual da Presidência, 3ª ed.)\n\n' +
          '## Qualidades\n' +
          '**Clareza, concisão, formalidade, impessoalidade, uso do padrão culto e uniformidade.**\n\n' +
          '## Padrão ofício\n' +
          'A 3ª edição do Manual **unificou** ofício, memorando e aviso em um único documento: o **ofício** (padrão ofício). Estrutura: tipo e número, local e data, endereçamento, assunto, texto, fecho, identificação do signatário.\n\n' +
          '## Fechos\n' +
          '- **Respeitosamente**: para autoridade **superior**.\n' +
          '- **Atenciosamente**: para autoridade de **mesma hierarquia ou inferior**.\n\n' +
          '## Pronomes de tratamento\n' +
          'Concordância sempre na **3ª pessoa** (ex.: "Vossa Excelência **está** ciente").'
      },
      { kind: 'CONCEITO', title: 'Impessoalidade na redação oficial', body: 'A comunicação parte do serviço/órgão (não da pessoa), voltada ao interesse público — daí a ausência de marcas pessoais e a padronização.' },
      { kind: 'DICA', body: 'Fecho: **Respeitosamente** (sobe) × **Atenciosamente** (mesmo nível/desce). A 3ª ed. do Manual acabou com memorando/aviso: tudo é **ofício**.' },
      { kind: 'PEGADINHA', body: '"Vossa Excelência sois bem-vindo" — **ERRADO**: pronome de tratamento exige verbo na **3ª pessoa**: "Vossa Excelência **é** bem-vinda".' },
      { kind: 'PALAVRA_CHAVE', title: 'padrão ofício · fechos · 3ª pessoa' }
    ]
  },
  // ── Legislação (GERAL, estava 0%) ──
  {
    disciplineSlug: 'legislacao',
    topic: 'Ética no serviço público',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Ética no serviço público (Decreto 1.171/1994)',
        body:
          '# Código de Ética do servidor (Decreto 1.171/1994)\n\n' +
          '- A dignidade, o decoro, o zelo e a eficácia são **primados maiores**; o servidor não pode desprezar o elemento **ético** da conduta.\n' +
          '- **Moralidade administrativa**: distinguir o **legal do ilegal**, o **justo do injusto**, o **conveniente do inconveniente**, mas também o **honesto do desonesto**.\n' +
          '- A **publicidade** de ato administrativo é requisito de eficácia e moralidade; a **cortesia** e a **presteza** são deveres.\n' +
          '- **Comissão de Ética**: existe em todo órgão; pode aplicar a **censura** (única penalidade prevista no Código de Ética).'
      },
      { kind: 'PEGADINHA', body: '"A penalidade aplicável pela Comissão de Ética é a suspensão" — **ERRADO**: a única penalidade do Decreto 1.171/94 é a **censura**.' },
      { kind: 'DICA', body: 'Para o servidor, atrasar o serviço é conduta antiética: "deixar o cidadão à espera" é vedado. Cortesia e presteza são deveres expressos.' },
      { kind: 'PALAVRA_CHAVE', title: 'Decreto 1.171/94 · censura · moralidade' }
    ]
  },
  // ── Conhecimentos do DF (GERAL, estava 0%) ──
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Brasília — construção e símbolos',
        body:
          '# Formação de Brasília\n\n' +
          '- **Inauguração**: 21 de abril de **1960**, no governo **Juscelino Kubitschek** (JK), meta-síntese do plano "50 anos em 5".\n' +
          '- **Plano Piloto**: urbanista **Lúcio Costa** (formato de avião/cruz); arquitetura de **Oscar Niemeyer**; paisagismo de **Burle Marx**.\n' +
          '- **Patrimônio Cultural da Humanidade (UNESCO)** em **1987** — primeira cidade moderna a receber o título.\n' +
          '- Os operários da construção ("**candangos**") vieram sobretudo do Nordeste.'
      },
      { kind: 'DICA', body: 'Trinca clássica da Quadrix: **Lúcio Costa** (urbanismo/Plano Piloto), **Niemeyer** (arquitetura), **Burle Marx** (paisagismo). Inauguração **21/04/1960**.' },
      { kind: 'PEGADINHA', body: '"O Plano Piloto foi projetado por Oscar Niemeyer" — **ERRADO**: o Plano Piloto é de **Lúcio Costa**; Niemeyer projetou os edifícios.' },
      { kind: 'PALAVRA_CHAVE', title: 'JK · 21/04/1960 · Lúcio Costa · candangos' }
    ]
  }
]

// ───────────────────────── QUESTÕES (estilo Quadrix) ─────────────────────────
export const SEDES_PACK_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Financiamento (FNAS e pisos de proteção)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O financiamento do Sistema Único de Assistência Social (SUAS) é de responsabilidade exclusiva da União, por meio do Fundo Nacional de Assistência Social.',
    options: [{ text: 'Certo' }, { text: 'Errado', correct: true }],
    explanation:
      'ERRADO. O SUAS é COFINANCIADO pelos três entes federados (União, estados/DF e municípios), em regime de repasse fundo a fundo. O FNAS gere apenas a parcela federal; cada ente possui seu próprio fundo, conselho e plano — condição para receber os repasses.',
    source: Q
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Controle social e conselhos de assistência social',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A respeito dos conselhos de assistência social, assinale a alternativa correta.',
    options: [
      { text: 'Possuem caráter meramente consultivo.' },
      { text: 'São compostos majoritariamente por representantes do governo.' },
      { text: 'São paritários e deliberativos, com metade de representantes governamentais e metade da sociedade civil.', correct: true },
      { text: 'Têm mandato exclusivo para fiscalizar, sem poder de deliberação.' },
      { text: 'São órgãos do Poder Judiciário.' }
    ],
    explanation:
      'CORRETA: "c". Os conselhos (CNAS, CAS/DF, CMAS) são PARITÁRIOS (metade governo, metade sociedade civil) e DELIBERATIVOS. Erradas: "a" e "d" (são deliberativos, não só consultivos/fiscalizadores); "b" (paridade veda a maioria governamental); "e" (integram o Executivo/controle social, não o Judiciário).',
    source: Q
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Cadastro Único (CadÚnico)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O Cadastro Único para Programas Sociais (CadÚnico) destina-se à identificação de famílias de baixa renda. É considerada de baixa renda, para inscrição, a família com renda mensal per capita de até:',
    options: [
      { text: 'um salário mínimo.' },
      { text: 'meio salário mínimo, ou renda total de até três salários mínimos.', correct: true },
      { text: 'dois salários mínimos.' },
      { text: 'um quarto do salário mínimo, sem outro critério.' },
      { text: 'três salários mínimos per capita.' }
    ],
    explanation:
      'CORRETA: "b". O CadÚnico admite famílias com renda per capita de até MEIO salário mínimo OU renda total de até TRÊS salários mínimos. As demais confundem os limites (o critério per capita é ½ SM; o total é 3 SM).',
    source: Q
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'O Serviço de Convivência e Fortalecimento de Vínculos (SCFV) integra a Proteção Social Especial e é ofertado no CREAS.',
    options: [{ text: 'Certo' }, { text: 'Errado', correct: true }],
    explanation:
      'ERRADO. O SCFV integra a PROTEÇÃO SOCIAL BÁSICA, é complementar ao PAIF e vincula-se ao CRAS (não ao CREAS). Tem caráter preventivo, organizado em grupos por ciclo de vida.',
    source: Q
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Provimento, vacância e formas de ingresso',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Segundo a LC nº 840/2011 (regime jurídico dos servidores do DF), o prazo para o servidor empossado entrar em exercício é de:',
    options: [
      { text: '30 dias contados da posse.' },
      { text: '15 dias contados da posse.', correct: true },
      { text: '30 dias contados da nomeação.' },
      { text: '15 dias contados da nomeação.' },
      { text: '45 dias contados da posse.' }
    ],
    explanation:
      'CORRETA: "b". Na LC 840/2011: POSSE em até 30 dias da nomeação; EXERCÍCIO em até 15 dias da posse; estágio probatório de 3 anos. As demais trocam o marco (nomeação × posse) ou o prazo (30 × 15).',
    source: Q
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Deveres, proibições e responsabilidades',
    type: 'CE',
    difficulty: 'DIFICIL',
    statement:
      'As responsabilidades civil, penal e administrativa do servidor são independentes entre si; contudo, a absolvição criminal que negue a existência do fato repercute nas demais esferas.',
    options: [{ text: 'Certo', correct: true }, { text: 'Errado' }],
    explanation:
      'CERTO. As três esferas são independentes e podem ser cumuladas. A exceção é a absolvição penal que nega a EXISTÊNCIA DO FATO ou a AUTORIA — essa, sim, repercute nas esferas civil e administrativa, afastando a responsabilização.',
    source: Q
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão de estoques e armazenagem',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na classificação de materiais pela curva ABC, os itens da classe "A" caracterizam-se por:',
    options: [
      { text: 'serem os mais numerosos e de menor valor.' },
      { text: 'representarem poucos itens que concentram a maior parte do valor.', correct: true },
      { text: 'terem giro de estoque nulo.' },
      { text: 'dispensarem controle rigoroso.' },
      { text: 'serem sempre itens perecíveis.' }
    ],
    explanation:
      'CORRETA: "b". A curva ABC aplica o princípio de Pareto: a classe A reúne POUCOS itens que concentram a MAIOR parte do valor — por isso exigem controle rigoroso. "a" descreve a classe C; "c", "d" e "e" não têm relação com o critério (valor/importância).',
    source: Q
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão patrimonial: tombamento, inventário e baixa de bens',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O bem público cuja recuperação é possível, mas cujo custo do conserto supera amplamente o benefício de mantê-lo em uso, é classificado como:',
    options: [
      { text: 'ocioso.' },
      { text: 'recuperável.' },
      { text: 'antieconômico.', correct: true },
      { text: 'irrecuperável.' },
      { text: 'inalienável.' }
    ],
    explanation:
      'CORRETA: "c". Antieconômico é o bem cuja manutenção/recuperação é onerosa demais frente ao benefício. Ocioso = em condições de uso, mas não utilizado; recuperável = conserto viável (custo ~até 50%); irrecuperável = não serve mais nem pode ser recuperado.',
    source: Q
  },
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Redação oficial e comunicações administrativas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'De acordo com o Manual de Redação Oficial da Presidência da República (3ª edição), o fecho "Respeitosamente" deve ser empregado em comunicações dirigidas a:',
    options: [
      { text: 'autoridades de mesma hierarquia.' },
      { text: 'autoridades hierarquicamente superiores.', correct: true },
      { text: 'subordinados.' },
      { text: 'particulares.' },
      { text: 'qualquer destinatário, indistintamente.' }
    ],
    explanation:
      'CORRETA: "b". "Respeitosamente" é usado para autoridades SUPERIORES; "Atenciosamente" para autoridades de mesma hierarquia ou inferiores. A 3ª edição unificou ofício/memorando/aviso no "padrão ofício".',
    source: Q
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Ética no serviço público',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Conforme o Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal (Decreto nº 1.171/1994), a única penalidade aplicável pela Comissão de Ética é a censura.',
    options: [{ text: 'Certo', correct: true }, { text: 'Errado' }],
    explanation:
      'CERTO. A penalidade prevista no Decreto 1.171/1994 aplicável pela Comissão de Ética é a CENSURA. Suspensão, advertência e demissão são penalidades do regime disciplinar (estatutário), não do Código de Ética.',
    source: Q
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Sobre a construção de Brasília, assinale a alternativa correta.',
    options: [
      { text: 'Foi inaugurada em 1960, tendo o Plano Piloto sido concebido por Lúcio Costa.', correct: true },
      { text: 'Foi inaugurada em 1970, no governo de Getúlio Vargas.' },
      { text: 'Teve seu Plano Piloto concebido por Oscar Niemeyer.' },
      { text: 'Recebeu o título de Patrimônio Cultural da Humanidade já no ano de sua inauguração.' },
      { text: 'Foi construída majoritariamente por trabalhadores da região Sul.' }
    ],
    explanation:
      'CORRETA: "a". Inauguração em 21/04/1960 (governo JK); Plano Piloto de Lúcio Costa. Erradas: "b" (1960, JK); "c" (o Plano é de Lúcio Costa — Niemeyer fez os edifícios); "d" (título da UNESCO em 1987); "e" (os candangos vieram sobretudo do Nordeste).',
    source: Q
  }
]

// ───────────────────────── FLASHCARDS (SEDES não tinha nenhum) ─────────────────────────
export const SEDES_PACK_DECKS: SeedStarterDeck[] = [
  {
    name: 'SEDES — Assistência Social essencial',
    disciplineSlug: 'organizacao-suas',
    description: 'Os conceitos de SUAS/PNAS que a Quadrix mais cobra, prontos para revisão espaçada.',
    cards: [
      {
        front: 'CRAS × CREAS',
        back: 'CRAS = Proteção Social BÁSICA (prevenção, PAIF). CREAS = Proteção Social ESPECIAL (violação de direitos já ocorrida, PAEFI).',
        topic: { disciplineSlug: 'organizacao-suas', topic: 'CRAS — Centro de Referência de Assistência Social' }
      },
      {
        front: 'As 5 seguranças socioassistenciais',
        back: 'Acolhida, convívio (ou vivência familiar/comunitária), renda, desenvolvimento da autonomia e apoio/auxílio (benefícios).',
        topic: { disciplineSlug: 'organizacao-suas', topic: 'Seguranças socioassistenciais (acolhida, convívio, renda, autonomia)' }
      },
      {
        front: 'Cofinanciamento do SUAS',
        back: 'Os TRÊS entes (União, estados/DF, municípios), repasse fundo a fundo. Condição: Conselho + Fundo + Plano.',
        topic: { disciplineSlug: 'gestao-assistencia', topic: 'Financiamento (FNAS e pisos de proteção)' }
      },
      {
        front: 'Conselhos de assistência social — natureza',
        back: 'Paritários (½ governo, ½ sociedade civil) e DELIBERATIVOS (não meramente consultivos).',
        topic: { disciplineSlug: 'gestao-assistencia', topic: 'Controle social e conselhos de assistência social' }
      },
      {
        front: 'CadÚnico — limites de renda',
        back: 'Até ½ salário mínimo por pessoa OU até 3 salários mínimos no total. Atualização a cada 2 anos.',
        topic: { disciplineSlug: 'programas-socioassistenciais', topic: 'Cadastro Único (CadÚnico)' }
      },
      {
        front: 'SCFV — qual proteção?',
        back: 'Proteção Social BÁSICA, complementar ao PAIF, vinculado ao CRAS. Grupos por ciclo de vida; caráter preventivo.',
        topic: { disciplineSlug: 'programas-socioassistenciais', topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)' }
      },
      {
        front: 'BPC/LOAS — o que é?',
        back: '1 salário mínimo mensal ao idoso (65+) ou à pessoa com deficiência com renda per capita inferior a ¼ do SM. É benefício, NÃO aposentadoria; não gera 13º nem pensão.',
        topic: { disciplineSlug: 'beneficios-socioassistenciais', topic: 'Benefício de Prestação Continuada (BPC/LOAS)' }
      },
      {
        front: 'Matricialidade sociofamiliar',
        back: 'A FAMÍLIA é a unidade de referência das ações do SUAS (não o indivíduo isolado).',
        topic: { disciplineSlug: 'fundamentos-assistencia', topic: 'Matricialidade sociofamiliar' }
      }
    ]
  },
  {
    name: 'SEDES — Administrativo e DF',
    disciplineSlug: 'regime-juridico-df',
    description: 'Lei seca do regime jurídico do DF, materiais, redação oficial e Brasília.',
    cards: [
      {
        front: 'LC 840/2011 — prazos de posse e exercício',
        back: 'Posse: até 30 dias da nomeação. Exercício: até 15 dias da posse. Estágio probatório: 3 anos.',
        topic: { disciplineSlug: 'regime-juridico-df', topic: 'Provimento, vacância e formas de ingresso' }
      },
      {
        front: 'Exoneração × demissão',
        back: 'Exoneração NÃO é punição (a pedido/cargo em comissão). Demissão É penalidade disciplinar.',
        topic: { disciplineSlug: 'regime-juridico-df', topic: 'Provimento, vacância e formas de ingresso' }
      },
      {
        front: 'PEPS × UEPS',
        back: 'PEPS = FIFO (primeiro a entrar, primeiro a sair). UEPS = LIFO (último a entrar, primeiro a sair).',
        topic: { disciplineSlug: 'materiais-patrimonio', topic: 'Gestão de estoques e armazenagem' }
      },
      {
        front: 'Curva ABC — classe A',
        back: 'Poucos itens que concentram a maior parte do valor (Pareto). Exigem controle rigoroso.',
        topic: { disciplineSlug: 'materiais-patrimonio', topic: 'Gestão de estoques e armazenagem' }
      },
      {
        front: 'Fechos da redação oficial',
        back: 'Respeitosamente = autoridade superior. Atenciosamente = mesma hierarquia ou inferior.',
        topic: { disciplineSlug: 'atendimento-rotinas', topic: 'Redação oficial e comunicações administrativas' }
      },
      {
        front: 'Comissão de Ética — penalidade',
        back: 'Única penalidade do Decreto 1.171/94: CENSURA.',
        topic: { disciplineSlug: 'legislacao', topic: 'Ética no serviço público' }
      },
      {
        front: 'Brasília — quem fez o quê?',
        back: 'Lúcio Costa (Plano Piloto/urbanismo), Niemeyer (arquitetura), Burle Marx (paisagismo). Inaugurada 21/04/1960 (JK).',
        topic: { disciplineSlug: 'conhecimentos-df', topic: 'História e formação de Brasília' }
      }
    ]
  }
]

// ───────────────────────── RELAÇÕES (justificadas) ─────────────────────────
export const SEDES_PACK_RELATIONS: SeedRelation[] = [
  {
    from: { disciplineSlug: 'programas-socioassistenciais', topic: 'Cadastro Único (CadÚnico)' },
    to: { disciplineSlug: 'beneficios-socioassistenciais', topic: 'Benefício de Prestação Continuada (BPC/LOAS)' },
    kind: 'PRE_REQUISITO',
    strength: 0.6,
    note: 'O acesso a benefícios/programas pressupõe a inscrição e os dados do CadÚnico.'
  },
  {
    from: { disciplineSlug: 'programas-socioassistenciais', topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)' },
    to: { disciplineSlug: 'organizacao-suas', topic: 'CRAS — Centro de Referência de Assistência Social' },
    kind: 'DEPENDE_DE',
    strength: 0.75,
    note: 'O SCFV é ofertado/referenciado pelo CRAS (Proteção Social Básica).'
  },
  {
    from: { disciplineSlug: 'gestao-assistencia', topic: 'Financiamento (FNAS e pisos de proteção)' },
    to: { disciplineSlug: 'gestao-assistencia', topic: 'Controle social e conselhos de assistência social' },
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'O repasse fundo a fundo exige conselho em funcionamento (aprova plano e contas).'
  },
  {
    from: { disciplineSlug: 'materiais-patrimonio', topic: 'Gestão de estoques e armazenagem' },
    to: { disciplineSlug: 'materiais-patrimonio', topic: 'Gestão patrimonial: tombamento, inventário e baixa de bens' },
    kind: 'CONTINUIDADE',
    strength: 0.5,
    note: 'Do ciclo do material de consumo (estoque) para o ciclo do bem permanente (patrimônio).'
  },
  {
    from: { disciplineSlug: 'legislacao', topic: 'Ética no serviço público' },
    to: { disciplineSlug: 'regime-juridico-df', topic: 'Deveres, proibições e responsabilidades' },
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Deveres éticos e deveres funcionais estatutários se reforçam na apuração de conduta.'
  }
]
