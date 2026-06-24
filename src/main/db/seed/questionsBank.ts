// Banco ampliado de questões ORIGINAIS no estilo da banca Quadrix (múltipla
// escolha, 5 alternativas, lei seca/fatos). Não reproduz provas protegidas:
// são itens autorais fiéis ao conteúdo do edital SEDES DF 2026.
import type { SeedQuestion } from './questions'

const SOURCE = 'Banco de estudo (estilo Quadrix)'

export const SEED_QUESTIONS_BANK: SeedQuestion[] = [
  // ───────────────────────── Língua Portuguesa ─────────────────────────
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Regência verbal e nominal; crase',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que o uso do sinal indicativo de crase está correto.',
    options: [
      { text: 'Refiro-me à você.' },
      { text: 'Cheguei à pé ao trabalho.' },
      { text: 'A assistente atende ao público das 8h às 17h.', correct: true },
      { text: 'Entreguei o documento à ele.' },
      { text: 'Estou disposto à ajudar.' }
    ],
    explanation:
      'Há crase em "das 8h às 17h" (preposição a + artigo a, horas definidas). Não há crase antes de pronome pessoal (você, ele), antes de palavra masculina (pé) nem antes de verbo (ajudar).',
    source: SOURCE
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Sintaxe: concordância verbal e nominal',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa correta quanto à concordância verbal.',
    options: [
      { text: 'Houveram muitos candidatos inscritos.' },
      { text: 'Fazem dois anos que estudo para o concurso.' },
      { text: 'Existem vagas para o cargo de técnico.', correct: true },
      { text: 'Tratam-se de questões difíceis.' },
      { text: 'Aluga-se salas comerciais.' }
    ],
    explanation:
      'O verbo "existir" é pessoal e concorda com o sujeito ("vagas"): existem vagas. "Haver" (no sentido de existir) e "fazer" (tempo) são impessoais — ficam no singular: houve, faz. "Tratar-se de" é impessoal (trata-se). "Alugam-se salas" (voz passiva sintética).',
    source: SOURCE
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Classes de palavras (morfologia)',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'Na frase "Ela trabalha muito, mas reclama pouco", as palavras "muito" e "pouco" são advérbios de intensidade e modificam os verbos.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. "Muito" e "pouco", modificando os verbos "trabalha" e "reclama", são advérbios de intensidade e, portanto, invariáveis.',
    source: SOURCE
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Pontuação',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a vírgula foi empregada corretamente.',
    options: [
      { text: 'O servidor, deve zelar pelo patrimônio público.' },
      { text: 'Brasília, capital do país, foi inaugurada em 1960.', correct: true },
      { text: 'Estudou muito porém, não foi aprovado.' },
      { text: 'Os documentos, e os processos foram arquivados.' },
      { text: 'Quem estuda, é aprovado.' }
    ],
    explanation:
      'Em "Brasília, capital do país, foi inaugurada...", as vírgulas isolam o aposto explicativo. Não se separa sujeito de predicado por vírgula, nem se usa vírgula antes de "e" ligando termos da mesma função.',
    source: SOURCE
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras (semântica)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Assinale a alternativa em que as palavras são antônimas.',
    options: [
      { text: 'belo / bonito' },
      { text: 'ascender / subir' },
      { text: 'lícito / ilícito', correct: true },
      { text: 'casa / lar' },
      { text: 'rápido / veloz' }
    ],
    explanation:
      'Antônimos têm sentidos opostos: lícito (permitido) × ilícito (proibido). Os demais pares são sinônimos.',
    source: SOURCE
  },

  // ───────────────────────── Conhecimentos do DF ─────────────────────────
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'Aspectos geográficos do DF',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O Distrito Federal localiza-se na Região Geográfica:',
    options: [
      { text: 'Norte' },
      { text: 'Nordeste' },
      { text: 'Centro-Oeste', correct: true },
      { text: 'Sudeste' },
      { text: 'Sul' }
    ],
    explanation: 'O Distrito Federal situa-se na Região Centro-Oeste, no Planalto Central do Brasil.',
    source: SOURCE
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'Regiões Administrativas',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'O Distrito Federal não pode ser dividido em municípios; sua organização territorial se dá por Regiões Administrativas.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A Constituição veda a divisão do DF em municípios (art. 32). O território é organizado em Regiões Administrativas (RAs).',
    source: SOURCE
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O plano urbanístico de Brasília (Plano Piloto) foi concebido pelo urbanista:',
    options: [
      { text: 'Oscar Niemeyer' },
      { text: 'Lúcio Costa', correct: true },
      { text: 'Juscelino Kubitschek' },
      { text: 'Roberto Burle Marx' },
      { text: 'Athos Bulcão' }
    ],
    explanation:
      'O Plano Piloto foi concebido por Lúcio Costa. Oscar Niemeyer projetou os principais edifícios; Burle Marx, o paisagismo; Athos Bulcão, painéis artísticos.',
    source: SOURCE
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'RIDE — Região Integrada de Desenvolvimento',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A RIDE do Distrito Federal e Entorno integra o DF a municípios dos estados de:',
    options: [
      { text: 'Goiás e Minas Gerais', correct: true },
      { text: 'Goiás e Bahia' },
      { text: 'Minas Gerais e Tocantins' },
      { text: 'Goiás e Tocantins' },
      { text: 'Mato Grosso e Goiás' }
    ],
    explanation:
      'A RIDE-DF reúne o Distrito Federal e municípios de Goiás e de Minas Gerais, para fins de planejamento e desenvolvimento integrado.',
    source: SOURCE
  },

  // ───────────────────────── Política para Mulheres ─────────────────────────
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'De acordo com a Lei Maria da Penha, a conduta que cause dano emocional e diminuição da autoestima, ou que vise degradar ou controlar ações e comportamentos da mulher, configura violência:',
    options: [
      { text: 'Física' },
      { text: 'Patrimonial' },
      { text: 'Psicológica', correct: true },
      { text: 'Sexual' },
      { text: 'Moral' }
    ],
    explanation:
      'O art. 7º, II, define violência psicológica como conduta que cause dano emocional e diminuição da autoestima, ou que prejudique e perturbe o pleno desenvolvimento da mulher, visando degradar ou controlar suas ações.',
    source: SOURCE
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'A retenção, subtração ou destruição de objetos, instrumentos de trabalho e documentos pessoais da mulher caracteriza, segundo a Lei Maria da Penha, violência:',
    options: [
      { text: 'Moral' },
      { text: 'Patrimonial', correct: true },
      { text: 'Psicológica' },
      { text: 'Sexual' },
      { text: 'Física' }
    ],
    explanation:
      'O art. 7º, IV, define a violência patrimonial como a conduta que configure retenção, subtração, destruição parcial ou total de objetos, instrumentos de trabalho, documentos pessoais e recursos econômicos.',
    source: SOURCE
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Conforme a Lei Maria da Penha, é vedada a aplicação, nos casos de violência doméstica e familiar contra a mulher, de penas de cesta básica ou outras de prestação pecuniária, bem como a substituição de pena que implique o pagamento isolado de multa.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O art. 17 veda expressamente a aplicação de penas de cesta básica ou prestação pecuniária, bem como a substituição por pagamento isolado de multa.',
    source: SOURCE
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei do Feminicídio (Lei 13.104/2015)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No Código Penal, o feminicídio é classificado como:',
    options: [
      { text: 'Crime de menor potencial ofensivo' },
      { text: 'Modalidade qualificada de homicídio', correct: true },
      { text: 'Contravenção penal' },
      { text: 'Crime privilegiado' },
      { text: 'Lesão corporal grave' }
    ],
    explanation:
      'A Lei 13.104/2015 inseriu o feminicídio como circunstância qualificadora do homicídio (matar mulher por razões da condição de sexo feminino), além de torná-lo crime hediondo.',
    source: SOURCE
  },

  // ───────────────────────── Legislação (LODF / ética) ─────────────────────────
  {
    disciplineSlug: 'legislacao',
    topic: 'Lei Orgânica do Distrito Federal',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Segundo a Lei Orgânica do DF, o Poder Legislativo do Distrito Federal é exercido pela:',
    options: [
      { text: 'Assembleia Legislativa' },
      { text: 'Câmara dos Deputados' },
      { text: 'Câmara Legislativa do Distrito Federal', correct: true },
      { text: 'Câmara Municipal' },
      { text: 'Câmara Distrital de Vereadores' }
    ],
    explanation:
      'O Poder Legislativo do DF é exercido pela Câmara Legislativa do Distrito Federal, composta por Deputados Distritais.',
    source: SOURCE
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Organização do Estado e dos Poderes (noções)',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'O Distrito Federal acumula competências legislativas reservadas aos Estados e aos Municípios.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Conforme o art. 32, §1º, da Constituição Federal, ao Distrito Federal são atribuídas as competências legislativas reservadas aos Estados e Municípios.',
    source: SOURCE
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Ética no serviço público',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No serviço público, o princípio que impõe ao agente atuar com transparência e dar conhecimento de seus atos, salvo as hipóteses de sigilo legalmente previstas, é o da:',
    options: [
      { text: 'Pessoalidade' },
      { text: 'Publicidade', correct: true },
      { text: 'Discricionariedade' },
      { text: 'Hierarquia' },
      { text: 'Autotutela' }
    ],
    explanation:
      'A publicidade é o dever de transparência e divulgação dos atos administrativos, ressalvadas as hipóteses de sigilo previstas em lei. Integra o LIMPE (art. 37 da CF).',
    source: SOURCE
  },

  // ───────────────────────── Primeiros Socorros ─────────────────────────
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Suporte básico de vida (SBV)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'No atendimento inicial a uma vítima, a primeira providência do socorrista, antes de qualquer manobra, deve ser:',
    options: [
      { text: 'Iniciar imediatamente as compressões torácicas' },
      { text: 'Garantir a segurança do local e a própria proteção', correct: true },
      { text: 'Oferecer água à vítima' },
      { text: 'Aplicar respiração boca a boca' },
      { text: 'Levantar a vítima e transportá-la' }
    ],
    explanation:
      'A segurança da cena (proteger-se e proteger a vítima de novos riscos) é a primeira regra do socorrista. Só então se avalia a vítima e se aciona o socorro.',
    source: SOURCE
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Parada cardiorrespiratória e RCP',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No Brasil, o número de telefone do Serviço de Atendimento Móvel de Urgência (SAMU) é:',
    options: [
      { text: '190' },
      { text: '193' },
      { text: '192', correct: true },
      { text: '197' },
      { text: '199' }
    ],
    explanation:
      'O SAMU é acionado pelo 192. O 190 é a Polícia Militar e o 193, o Corpo de Bombeiros.',
    source: SOURCE
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Parada cardiorrespiratória e RCP',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Nas compressões torácicas da RCP em adulto, a frequência recomendada e a profundidade adequada são, respectivamente:',
    options: [
      { text: '60 a 80/min e 2–3 cm' },
      { text: '100 a 120/min e 5–6 cm', correct: true },
      { text: '140 a 160/min e 1–2 cm' },
      { text: '80 a 100/min e 8–10 cm' },
      { text: '40 a 60/min e 4–5 cm' }
    ],
    explanation:
      'As diretrizes recomendam frequência de 100 a 120 compressões por minuto, com profundidade de 5 a 6 cm no adulto, permitindo o retorno total do tórax entre as compressões.',
    source: SOURCE
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Hemorragias e ferimentos',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Diante de uma hemorragia externa intensa em um membro, a conduta inicial mais adequada é:',
    options: [
      { text: 'Aplicar torniquete imediatamente, antes de qualquer outra medida' },
      { text: 'Lavar o ferimento com água corrente abundante' },
      { text: 'Fazer compressão direta sobre o ferimento com pano limpo', correct: true },
      { text: 'Aguardar o socorro sem intervir' },
      { text: 'Aplicar pó de café no ferimento' }
    ],
    explanation:
      'A medida inicial para conter hemorragia externa é a compressão direta sobre o ferimento com pano limpo. O torniquete é recurso para casos extremos, quando a compressão não controla o sangramento.',
    source: SOURCE
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Queimaduras',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'No atendimento a uma queimadura térmica, recomenda-se resfriar a área com água corrente em temperatura ambiente e não aplicar pasta de dente, manteiga ou outras substâncias caseiras.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Resfria-se a área com água corrente (temperatura ambiente) e evita-se aplicar substâncias caseiras (pasta de dente, manteiga), que aumentam o risco de infecção e dificultam a avaliação.',
    source: SOURCE
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Desmaios, convulsões e estados de choque',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Durante uma crise convulsiva, a conduta correta do socorrista é:',
    options: [
      { text: 'Conter firmemente os movimentos da vítima' },
      { text: 'Colocar um objeto na boca para evitar que morda a língua' },
      { text: 'Proteger a cabeça e afastar objetos que possam feri-la', correct: true },
      { text: 'Oferecer água imediatamente' },
      { text: 'Levantar a vítima e fazê-la andar' }
    ],
    explanation:
      'Na convulsão, protege-se a cabeça, afastam-se objetos perigosos e aguarda-se o fim da crise. Não se deve conter os movimentos nem introduzir objetos na boca.',
    source: SOURCE
  },

  // ───────────────────────── Fundamentos da Assistência Social ─────────────────────────
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Política Nacional de Assistência Social (PNAS/2004)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A assistência social, segundo a Constituição Federal e a LOAS, é prestada:',
    options: [
      { text: 'Apenas a quem contribui para a seguridade social' },
      { text: 'A quem dela necessitar, independentemente de contribuição', correct: true },
      { text: 'Somente a idosos e pessoas com deficiência' },
      { text: 'Mediante pagamento de taxa social' },
      { text: 'Exclusivamente por entidades privadas' }
    ],
    explanation:
      'A assistência social é política não contributiva, prestada a quem dela necessitar, independentemente de contribuição à seguridade social (CF, art. 203; LOAS, art. 1º).',
    source: SOURCE
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Proteção Social Básica e Proteção Social Especial',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A Proteção Social Especial destina-se a famílias e indivíduos:',
    options: [
      { text: 'Em situação de vulnerabilidade, com vínculos preservados' },
      { text: 'Que se encontram em situação de risco pessoal e social, com direitos violados', correct: true },
      { text: 'Que apenas buscam atividades de convivência' },
      { text: 'Com renda acima de três salários mínimos' },
      { text: 'Exclusivamente em zonas rurais' }
    ],
    explanation:
      'A Proteção Social Especial (média e alta complexidade) atende famílias e indivíduos em situação de risco pessoal e social, por ocorrência de violação de direitos. A Básica é preventiva, para vínculos ainda preservados.',
    source: SOURCE
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Matricialidade sociofamiliar',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A matricialidade sociofamiliar significa que a família é tomada como referência central no planejamento e na oferta dos serviços socioassistenciais.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A matricialidade sociofamiliar coloca a família no centro das ações da PNAS, reconhecendo-a como espaço de proteção e mediação na relação com o Estado.',
    source: SOURCE
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Princípios e diretrizes da assistência social',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'São diretrizes da organização da assistência social previstas na LOAS, EXCETO:',
    options: [
      { text: 'Descentralização político-administrativa' },
      { text: 'Participação da população na formulação e controle das ações' },
      { text: 'Primazia da responsabilidade do Estado na condução da política' },
      { text: 'Centralização das ações na esfera federal', correct: true },
      { text: 'Comando único das ações em cada esfera de governo' }
    ],
    explanation:
      'A LOAS (art. 5º) estabelece a descentralização político-administrativa (e não a centralização), a participação popular e a primazia do Estado. A centralização federal contraria a diretriz.',
    source: SOURCE
  },

  // ───────────────────────── Organização SUAS ─────────────────────────
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CRAS — Centro de Referência de Assistência Social',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O serviço estruturante ofertado obrigatoriamente pelo CRAS é o:',
    options: [
      { text: 'PAEFI — Proteção e Atendimento Especializado a Famílias e Indivíduos' },
      { text: 'PAIF — Serviço de Proteção e Atendimento Integral à Família', correct: true },
      { text: 'Serviço de Acolhimento Institucional' },
      { text: 'Abordagem Social de rua' },
      { text: 'Medidas socioeducativas em meio aberto' }
    ],
    explanation:
      'O PAIF é o serviço de Proteção Social Básica ofertado exclusiva e obrigatoriamente no CRAS. O PAEFI é do CREAS (média complexidade).',
    source: SOURCE
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'Níveis de proteção e complexidade',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O Serviço de Acolhimento Institucional (abrigo) é classificado, no SUAS, como Proteção Social:',
    options: [
      { text: 'Básica' },
      { text: 'Especial de média complexidade' },
      { text: 'Especial de alta complexidade', correct: true },
      { text: 'Contributiva' },
      { text: 'Previdenciária' }
    ],
    explanation:
      'Os serviços de acolhimento (abrigo, casa-lar, residência inclusiva) são de Proteção Social Especial de alta complexidade, pois garantem proteção integral a quem está sem referência familiar ou em situação de ameaça.',
    source: SOURCE
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'Descentralização político-administrativa',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O SUAS organiza-se de forma descentralizada e participativa, com comando único das ações em cada esfera de governo.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O SUAS adota a descentralização e a participação, com comando único em cada esfera (União, Estados, DF e Municípios), conforme a LOAS e a NOB-SUAS.',
    source: SOURCE
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CREAS — Centro de Referência Especializado',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O equipamento responsável por ofertar serviços a pessoas em situação de rua, incluindo o Serviço Especializado para População em Situação de Rua, é o:',
    options: [
      { text: 'CRAS' },
      { text: 'Centro POP', correct: true },
      { text: 'Conselho Tutelar' },
      { text: 'CadÚnico' },
      { text: 'Casa de Passagem do idoso' }
    ],
    explanation:
      'O Centro de Referência Especializado para População em Situação de Rua (Centro POP) é a unidade da Proteção Social Especial voltada ao atendimento dessa população.',
    source: SOURCE
  },

  // ───────────────────────── Gestão da Assistência Social ─────────────────────────
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Financiamento (FNAS e pisos de proteção)',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'O principal fundo responsável pelo financiamento federal da política de assistência social é o:',
    options: [
      { text: 'FAT — Fundo de Amparo ao Trabalhador' },
      { text: 'FNAS — Fundo Nacional de Assistência Social', correct: true },
      { text: 'FUNDEB' },
      { text: 'FGTS' },
      { text: 'FNS — Fundo Nacional de Saúde' }
    ],
    explanation:
      'O FNAS é o fundo que financia, no âmbito federal, os benefícios, serviços, programas e projetos de assistência social, com repasses fundo a fundo aos demais entes.',
    source: SOURCE
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Controle social e conselhos de assistência social',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Os Conselhos de Assistência Social são instâncias de caráter permanente e composição paritária entre governo e sociedade civil.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Os conselhos (nacional, estaduais, distrital e municipais) têm caráter permanente, deliberativo e composição paritária entre representantes do governo e da sociedade civil.',
    source: SOURCE
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Gestão do SUAS e níveis de gestão',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'A função da gestão do SUAS que produz e sistematiza informações sobre vulnerabilidades e riscos do território é a:',
    options: [
      { text: 'Vigilância socioassistencial', correct: true },
      { text: 'Defesa de direitos' },
      { text: 'Proteção social' },
      { text: 'Auditoria fiscal' },
      { text: 'Ouvidoria' }
    ],
    explanation:
      'A vigilância socioassistencial é a função que analisa territorialmente a capacidade protetiva das famílias e as situações de risco e vulnerabilidade, apoiando o planejamento dos serviços.',
    source: SOURCE
  },

  // ───────────────────────── Marcos Normativos ─────────────────────────
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'Tipificação Nacional de Serviços Socioassistenciais (Res. CNAS 109/2009)',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'A Tipificação Nacional de Serviços Socioassistenciais (Resolução CNAS nº 109/2009) organiza os serviços por:',
    options: [
      { text: 'Faixa etária dos usuários, apenas' },
      { text: 'Níveis de complexidade do SUAS (básica e especial de média e alta)', correct: true },
      { text: 'Ordem alfabética dos municípios' },
      { text: 'Valor do repasse financeiro' },
      { text: 'Tipo de entidade executora' }
    ],
    explanation:
      'A Tipificação organiza os serviços em três blocos por nível de complexidade: Proteção Social Básica, Proteção Social Especial de Média Complexidade e Proteção Social Especial de Alta Complexidade.',
    source: SOURCE
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'ECA, Estatuto do Idoso e LBI (transversais)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O Estatuto da Criança e do Adolescente (ECA) corresponde à Lei nº:',
    options: [
      { text: '8.069/1990', correct: true },
      { text: '10.741/2003' },
      { text: '13.146/2015' },
      { text: '8.742/1993' },
      { text: '11.340/2006' }
    ],
    explanation:
      'O ECA é a Lei nº 8.069/1990. Estatuto do Idoso: 10.741/03; LBI: 13.146/15; LOAS: 8.742/93; Lei Maria da Penha: 11.340/06.',
    source: SOURCE
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Segundo a LOAS, a assistência social tem por objetivos, entre outros, a proteção social, a vigilância socioassistencial e a defesa de direitos.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O art. 2º da LOAS estabelece como objetivos a proteção social, a vigilância socioassistencial e a defesa de direitos.',
    source: SOURCE
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'Estatuto do Idoso',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O Estatuto do Idoso assegura proteção integral às pessoas com idade igual ou superior a:',
    options: [
      { text: '55 anos' },
      { text: '60 anos', correct: true },
      { text: '65 anos' },
      { text: '70 anos' },
      { text: '50 anos' }
    ],
    explanation:
      'O Estatuto do Idoso (Lei 10.741/2003) destina-se a regular os direitos das pessoas com idade igual ou superior a 60 anos.',
    source: SOURCE
  },

  // ───────────────────────── Programas Socioassistenciais ─────────────────────────
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Cadastro Único (CadÚnico)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O Cadastro Único para Programas Sociais (CadÚnico) tem como finalidade principal:',
    options: [
      { text: 'Conceder aposentadorias por idade' },
      { text: 'Identificar e caracterizar as famílias de baixa renda para acesso a programas sociais', correct: true },
      { text: 'Substituir a carteira de trabalho' },
      { text: 'Registrar empresas prestadoras de serviço' },
      { text: 'Controlar o pagamento de tributos' }
    ],
    explanation:
      'O CadÚnico é o instrumento de identificação e caracterização socioeconômica das famílias de baixa renda, base para seleção e inclusão em diversos programas sociais do governo.',
    source: SOURCE
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O Serviço de Convivência e Fortalecimento de Vínculos (SCFV) integra a Proteção Social Básica e complementa o trabalho social com famílias do PAIF.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O SCFV é serviço da Proteção Social Básica, organizado em grupos por ciclos de vida, e complementa o trabalho social com famílias realizado pelo PAIF.',
    source: SOURCE
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Programas de transferência de renda',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A inscrição atualizada no Cadastro Único é, em regra, condição para o acesso a programas de transferência de renda porque:',
    options: [
      { text: 'Substitui a comprovação de renda por declaração do empregador' },
      { text: 'Permite identificar a renda e a composição familiar para focalização do benefício', correct: true },
      { text: 'Garante automaticamente a concessão de aposentadoria' },
      { text: 'Dispensa qualquer critério de elegibilidade' },
      { text: 'É exigida apenas de servidores públicos' }
    ],
    explanation:
      'O CadÚnico permite identificar renda e composição familiar, viabilizando a focalização (seleção) das famílias elegíveis aos programas de transferência de renda.',
    source: SOURCE
  },

  // ───────────────────────── Benefícios Socioassistenciais ─────────────────────────
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefício de Prestação Continuada (BPC/LOAS)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O Benefício de Prestação Continuada (BPC) é vitalício e pode ser acumulado com aposentadoria do Regime Geral de Previdência Social.',
    options: [
      { text: 'Certo' },
      { text: 'Errado', correct: true }
    ],
    explanation:
      'Errado. O BPC não é vitalício (deve ser revisado a cada dois anos) e, em regra, não pode ser acumulado com outro benefício no âmbito da seguridade social, salvo as exceções legais (ex.: assistência médica).',
    source: SOURCE
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefícios eventuais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'São exemplos de benefícios eventuais da assistência social:',
    options: [
      { text: 'Aposentadoria e pensão por morte' },
      { text: 'Auxílio-natalidade e auxílio por morte (funeral)', correct: true },
      { text: 'Seguro-desemprego e abono salarial' },
      { text: 'FGTS e 13º salário' },
      { text: 'Salário-família e salário-maternidade' }
    ],
    explanation:
      'Os benefícios eventuais (LOAS, art. 22) são provisões suplementares e temporárias em situações de vulnerabilidade temporária, como o auxílio por natalidade e o auxílio por morte (funeral).',
    source: SOURCE
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Critérios de elegibilidade do BPC',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'O valor do Benefício de Prestação Continuada (BPC) corresponde a:',
    options: [
      { text: 'Meio salário mínimo' },
      { text: 'Um salário mínimo', correct: true },
      { text: 'Dois salários mínimos' },
      { text: 'Valor variável conforme a renda' },
      { text: 'Um terço do salário mínimo' }
    ],
    explanation:
      'O BPC garante o pagamento de um salário mínimo mensal à pessoa idosa (65+) ou com deficiência que comprove não possuir meios de manutenção.',
    source: SOURCE
  },

  // ───────────────────────── Instrumentos Socioassistenciais do DF ─────────────────────────
  {
    disciplineSlug: 'instrumentos-df',
    topic: 'Rede socioassistencial do DF',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No Distrito Federal, o órgão gestor da política de assistência social, responsável pela coordenação do SUAS no território, é a:',
    options: [
      { text: 'Secretaria de Saúde do DF' },
      { text: 'Secretaria de Desenvolvimento Social do DF (SEDES)', correct: true },
      { text: 'Secretaria de Educação do DF' },
      { text: 'Secretaria de Economia do DF' },
      { text: 'Defensoria Pública do DF' }
    ],
    explanation:
      'A SEDES é o órgão gestor da política de assistência social no DF, responsável por coordenar o SUAS no território distrital.',
    source: SOURCE
  },
  {
    disciplineSlug: 'instrumentos-df',
    topic: 'Programas próprios do DF (DF Social)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Programas distritais de transferência de renda, como os mantidos pela SEDES, complementam — no território do DF — a rede de proteção social prevista no SUAS.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Programas próprios do DF complementam, no território distrital, a proteção social organizada nacionalmente pelo SUAS, ampliando a cobertura às famílias em vulnerabilidade.',
    source: SOURCE
  },

  // ───────────────────────── Direito Constitucional e Administrativo ─────────────────────────
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Atos administrativos',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'O atributo do ato administrativo que permite à Administração executá-lo diretamente, sem prévia autorização judicial, é a:',
    options: [
      { text: 'Presunção de legitimidade' },
      { text: 'Imperatividade' },
      { text: 'Autoexecutoriedade', correct: true },
      { text: 'Tipicidade' },
      { text: 'Revogabilidade' }
    ],
    explanation:
      'A autoexecutoriedade permite à Administração executar suas decisões por meios próprios, independentemente de autorização do Poder Judiciário.',
    source: SOURCE
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Princípios da Administração Pública (LIMPE)',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'O princípio da impessoalidade veda a promoção pessoal de autoridades na publicidade de atos, programas e obras públicas.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O art. 37, §1º, da CF determina que a publicidade dos atos do Poder Público tenha caráter educativo/informativo, vedada a promoção pessoal de autoridades.',
    source: SOURCE
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Direitos e garantias fundamentais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Os direitos sociais estão previstos na Constituição Federal de 1988 a partir do art. 6º. NÃO é um direito social expressamente arrolado nesse dispositivo:',
    options: [
      { text: 'Educação' },
      { text: 'Saúde' },
      { text: 'Propriedade privada de empresas', correct: true },
      { text: 'Trabalho' },
      { text: 'Assistência aos desamparados' }
    ],
    explanation:
      'O art. 6º arrola direitos sociais como educação, saúde, trabalho, moradia, segurança e assistência aos desamparados. A propriedade privada de empresas não é um direito social desse rol.',
    source: SOURCE
  },

  // ───────────────────────── Regime Jurídico dos Servidores do DF ─────────────────────────
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Provimento, vacância e formas de ingresso',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A forma originária de provimento de cargo público efetivo, precedida de concurso público, é a:',
    options: [
      { text: 'Promoção' },
      { text: 'Readaptação' },
      { text: 'Nomeação', correct: true },
      { text: 'Reversão' },
      { text: 'Reintegração' }
    ],
    explanation:
      'A nomeação é a única forma de provimento originário e, para cargo efetivo, depende de aprovação prévia em concurso público. As demais são formas derivadas.',
    source: SOURCE
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'LC 840/2011 — disposições gerais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Segundo o regime jurídico dos servidores do DF, o prazo geral do estágio probatório para aquisição da estabilidade é de:',
    options: [
      { text: '12 meses' },
      { text: '24 meses' },
      { text: '36 meses', correct: true },
      { text: '48 meses' },
      { text: '6 meses' }
    ],
    explanation:
      'O estágio probatório tem duração de 36 meses (3 anos), período de avaliação de aptidão e capacidade para o desempenho do cargo, ao fim do qual se adquire a estabilidade.',
    source: SOURCE
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Deveres, proibições e responsabilidades',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O servidor público responde civil, penal e administrativamente pelo exercício irregular de suas atribuições, podendo as instâncias ser independentes entre si.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. As responsabilidades civil, penal e administrativa são, em regra, independentes e podem cumular-se, ressalvada a repercussão da decisão penal que negue o fato ou sua autoria.',
    source: SOURCE
  },

  // ───────────────────────── Atendimento ao Público e Rotinas ─────────────────────────
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Redação oficial e comunicações administrativas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'São qualidades essenciais da redação oficial, segundo o Manual de Redação da Presidência da República:',
    options: [
      { text: 'Pessoalidade, subjetividade e rebuscamento' },
      { text: 'Clareza, impessoalidade, formalidade e padronização', correct: true },
      { text: 'Informalidade e uso de gírias' },
      { text: 'Ambiguidade e prolixidade' },
      { text: 'Uso preferencial de termos técnicos obscuros' }
    ],
    explanation:
      'A redação oficial deve primar por clareza, concisão, impessoalidade, formalidade, padronização e uso da norma culta da língua.',
    source: SOURCE
  },
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Qualidade no atendimento ao público',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'No atendimento ao público, a empatia e a escuta atenta às necessidades do usuário contribuem para a qualidade do serviço prestado.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Empatia, cortesia e escuta ativa são atributos centrais da qualidade no atendimento ao público, especialmente em serviços socioassistenciais.',
    source: SOURCE
  },

  // ───────────────────────── Arquivologia e Gestão Documental ─────────────────────────
  {
    disciplineSlug: 'arquivologia',
    topic: 'Tabela de temporalidade e ciclo de vida documental',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O instrumento de gestão de documentos que define prazos de guarda e a destinação final (eliminação ou guarda permanente) é a:',
    options: [
      { text: 'Tabela de temporalidade documental', correct: true },
      { text: 'Lista de protocolo' },
      { text: 'Planilha de inventário de bens' },
      { text: 'Folha de frequência' },
      { text: 'Ata de reunião' }
    ],
    explanation:
      'A tabela de temporalidade documental estabelece os prazos de guarda dos documentos nas fases corrente e intermediária e define sua destinação final: eliminação ou recolhimento ao arquivo permanente.',
    source: SOURCE
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Protocolo: recebimento, registro, distribuição e tramitação',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'No setor de protocolo, são atividades típicas o recebimento, o registro, a autuação, a distribuição e o controle da tramitação dos documentos.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O protocolo concentra as rotinas de recebimento, registro, classificação, autuação, distribuição e controle de tramitação (movimentação) dos documentos.',
    source: SOURCE
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Métodos de arquivamento',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O método de arquivamento que organiza os documentos pela ordem das letras do alfabeto, com base no nome, é o:',
    options: [
      { text: 'Numérico simples' },
      { text: 'Alfabético', correct: true },
      { text: 'Geográfico' },
      { text: 'Cronológico' },
      { text: 'Duplex' }
    ],
    explanation:
      'O método alfabético organiza os documentos pela sequência das letras do alfabeto, normalmente a partir do nome. É de uso simples e direto.',
    source: SOURCE
  },

  // ───────────────────────── Administração de Materiais e Patrimônio ─────────────────────────
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão patrimonial: tombamento, inventário e baixa de bens',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No setor público, o registro de um bem permanente no patrimônio do órgão, com atribuição de número de identificação, denomina-se:',
    options: [
      { text: 'Baixa patrimonial' },
      { text: 'Tombamento', correct: true },
      { text: 'Alienação' },
      { text: 'Depreciação' },
      { text: 'Inventário rotativo' }
    ],
    explanation:
      'O tombamento é o ato de incorporar e registrar o bem permanente no patrimônio, atribuindo-lhe número de identificação (plaqueta), para controle.',
    source: SOURCE
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão de estoques e armazenagem',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'O método de avaliação de estoques em que as primeiras unidades a entrar são as primeiras a sair é conhecido como:',
    options: [
      { text: 'PEPS (FIFO)', correct: true },
      { text: 'UEPS (LIFO)' },
      { text: 'Custo médio ponderado' },
      { text: 'Curva ABC' },
      { text: 'Just in time' }
    ],
    explanation:
      'PEPS (Primeiro que Entra, Primeiro que Sai) — em inglês FIFO — baixa primeiro as unidades mais antigas do estoque.',
    source: SOURCE
  },

  // ───────────────────────── Compras Públicas e Licitações (14.133/2021) ─────────────────────────
  {
    disciplineSlug: 'licitacoes',
    topic: 'Princípios e objetivos da Lei 14.133/2021',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na Lei nº 14.133/2021, a modalidade de licitação obrigatória para a aquisição de bens e serviços comuns é o:',
    options: [
      { text: 'Pregão', correct: true },
      { text: 'Concurso' },
      { text: 'Leilão' },
      { text: 'Diálogo competitivo' },
      { text: 'Convite' }
    ],
    explanation:
      'O pregão é obrigatório para a aquisição de bens e serviços comuns, assim entendidos aqueles cujos padrões de desempenho e qualidade podem ser objetivamente definidos pelo edital.',
    source: SOURCE
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Contratação direta (dispensa e inexigibilidade)',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Quando há inviabilidade de competição — por exemplo, fornecedor exclusivo —, a contratação direta se dá por:',
    options: [
      { text: 'Dispensa de licitação' },
      { text: 'Inexigibilidade de licitação', correct: true },
      { text: 'Pregão eletrônico' },
      { text: 'Concorrência' },
      { text: 'Credenciamento obrigatório' }
    ],
    explanation:
      'A inexigibilidade ocorre quando há inviabilidade de competição (ex.: produtor/fornecedor exclusivo, serviços técnicos singulares). A dispensa pressupõe competição possível, mas afastada por lei.',
    source: SOURCE
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Etapas do processo licitatório',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Pela Lei 14.133/2021, em regra, o julgamento das propostas antecede a habilitação dos licitantes (fase de habilitação posterior).',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A nova lei adota, como regra, a inversão de fases: primeiro o julgamento das propostas e, depois, a habilitação do licitante mais bem classificado, salvo decisão motivada em sentido diverso.',
    source: SOURCE
  }
]
