// Segundo lote do banco ampliado — questões ORIGINAIS no estilo Quadrix
// (múltipla escolha / certo-errado, lei seca e fatos), fiéis ao edital SEDES DF
// 2026. Itens autorais; não reproduzem provas protegidas.
import type { SeedQuestion } from './questions'

const S = 'Banco de estudo (estilo Quadrix)'

export const SEED_QUESTIONS_BANK_2: SeedQuestion[] = [
  // ───────────────────────── Língua Portuguesa ─────────────────────────
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras (semântica)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em "Aquele servidor é um leão no atendimento ao público", a figura de linguagem empregada é a:',
    options: [
      { text: 'Metáfora', correct: true },
      { text: 'Metonímia' },
      { text: 'Eufemismo' },
      { text: 'Hipérbato' },
      { text: 'Pleonasmo' }
    ],
    explanation:
      'Há metáfora — comparação implícita entre o servidor e um leão (força/disposição), sem conectivo comparativo.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras (semântica)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em "Li Machado de Assis durante as férias", ocorre a figura de linguagem denominada:',
    options: [
      { text: 'Metáfora' },
      { text: 'Metonímia', correct: true },
      { text: 'Antítese' },
      { text: 'Ironia' },
      { text: 'Hipérbole' }
    ],
    explanation:
      'Há metonímia: emprega-se o nome do autor (Machado de Assis) no lugar de sua obra. É a substituição de um termo por outro com relação de proximidade.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Regência verbal e nominal; crase',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa de acordo com a norma-padrão de regência.',
    options: [
      { text: 'Assisti o jogo pela televisão.' },
      { text: 'Assisti ao jogo pela televisão.', correct: true },
      { text: 'Cheguei na repartição às oito horas.' },
      { text: 'Prefiro mais estudar do que descansar.' },
      { text: 'Obedeço meus superiores.' }
    ],
    explanation:
      'No sentido de "ver/presenciar", o verbo "assistir" é transitivo indireto e exige a preposição "a": assistir ao jogo. "Chegar" rege "a" (à repartição); "preferir" não admite "mais... do que"; "obedecer" é transitivo indireto (obedeço a meus superiores).',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Acentuação gráfica',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a palavra é acentuada por ser uma das vogais "i" ou "u" tônicas, formando hiato.',
    options: [
      { text: 'Saída', correct: true },
      { text: 'Pênis' },
      { text: 'Médico' },
      { text: 'Café' },
      { text: 'Português' }
    ],
    explanation:
      'Em "saída", o "i" tônico forma hiato (sa-í-da) e é acentuado. As demais seguem outras regras (paroxítona, proparoxítona, oxítona).',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Classes de palavras (morfologia)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'Na frase "Ela está meio preocupada com a prova", a palavra "meio" é advérbio e, portanto, invariável.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. "Meio", no sentido de "um pouco" (modificando o adjetivo "preocupada"), é advérbio e permanece invariável — não se diz "meia preocupada".',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Coesão e coerência textual',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No período "Estudou bastante; portanto, foi aprovado", a palavra "portanto" estabelece relação de:',
    options: [
      { text: 'Oposição' },
      { text: 'Conclusão', correct: true },
      { text: 'Condição' },
      { text: 'Finalidade' },
      { text: 'Concessão' }
    ],
    explanation: '"Portanto" é conjunção/conector conclusivo: introduz a conclusão decorrente da ideia anterior.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Ortografia oficial',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Assinale a alternativa em que todas as palavras estão grafadas corretamente.',
    options: [
      { text: 'Exceção, privilégio, beneficência', correct: true },
      { text: 'Esceção, previlégio, beneficiência' },
      { text: 'Excessão, privilégio, beneficência' },
      { text: 'Exceção, privilégio, benefissência' },
      { text: 'Esseção, previlégio, beneficência' }
    ],
    explanation: 'A grafia correta é exceção, privilégio e beneficência.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Sintaxe: concordância verbal e nominal',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'Na frase "É proibido entrada de pessoas estranhas", a expressão "é proibido" está correta, pois o sujeito ("entrada") não vem determinado por artigo.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Expressões como "é proibido", "é necessário", "é bom" ficam invariáveis quando o sujeito não é determinado por artigo. Se houvesse o artigo ("É proibida a entrada"), faria-se a concordância.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Compreensão e interpretação de textos',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O sinônimo mais adequado para o adjetivo "lacônico", em "Deu uma resposta lacônica", é:',
    options: [
      { text: 'Prolixa' },
      { text: 'Breve', correct: true },
      { text: 'Agressiva' },
      { text: 'Detalhada' },
      { text: 'Confusa' }
    ],
    explanation: '"Lacônico" significa breve, conciso, com poucas palavras — antônimo de prolixo.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Classes de palavras (morfologia)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Na oração "Nunca me disseram a verdade", a colocação do pronome "me" antes do verbo (próclise) justifica-se:',
    options: [
      { text: 'pela presença de palavra de sentido negativo ("nunca")', correct: true },
      { text: 'por se tratar de início de oração' },
      { text: 'pela presença de verbo no futuro' },
      { text: 'por exigência de ênclise' },
      { text: 'por se tratar de oração interrogativa' }
    ],
    explanation:
      'Palavras de sentido negativo (não, nunca, jamais, nada) atraem o pronome para antes do verbo (próclise).',
    source: S
  },

  // ───────────────────────── Conhecimentos do DF ─────────────────────────
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'Aspectos geográficos do DF',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O grande lago artificial situado em Brasília, criado durante a construção da cidade, é o Lago:',
    options: [
      { text: 'Paranoá', correct: true },
      { text: 'Descoberto' },
      { text: 'Guaíba' },
      { text: 'Tietê' },
      { text: 'Santa Maria' }
    ],
    explanation: 'O Lago Paranoá é o reservatório artificial formado pelo represamento do ribeirão homônimo, integrando o conjunto urbanístico de Brasília.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A ideia de transferência da capital para o interior do país (Planalto Central) já constava de texto constitucional anterior a 1960.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A Constituição de 1891 já previa a futura transferência da capital para o Planalto Central, projeto concretizado apenas em 1960.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Os principais edifícios públicos de Brasília (como o Congresso Nacional e o Palácio da Alvorada) foram projetados pelo arquiteto:',
    options: [
      { text: 'Lúcio Costa' },
      { text: 'Oscar Niemeyer', correct: true },
      { text: 'Roberto Burle Marx' },
      { text: 'Athos Bulcão' },
      { text: 'Juscelino Kubitschek' }
    ],
    explanation:
      'Oscar Niemeyer foi o arquiteto responsável pelos principais edifícios públicos de Brasília. Lúcio Costa fez o Plano Piloto; Burle Marx, o paisagismo.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'Aspectos sociais, políticos e econômicos do DF',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A economia do Distrito Federal apoia-se predominantemente no setor de serviços e na administração pública.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A economia do DF é marcada pela forte presença do setor de serviços e da administração pública, com participação reduzida da indústria e da agropecuária no PIB.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'História e formação de Brasília',
    type: 'CE',
    difficulty: 'FACIL',
    statement: 'O traçado urbanístico do Plano Piloto de Brasília costuma ser associado à forma de um avião (ou de uma cruz).',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O desenho do Plano Piloto, com os Eixos Monumental e Rodoviário, é frequentemente comparado a um avião ou a uma cruz.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-df',
    topic: 'Aspectos sociais, políticos e econômicos do DF',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O chefe do Poder Executivo do Distrito Federal é o:',
    options: [
      { text: 'Prefeito' },
      { text: 'Governador', correct: true },
      { text: 'Intendente' },
      { text: 'Administrador-geral' },
      { text: 'Presidente da Câmara' }
    ],
    explanation:
      'O Poder Executivo do DF é exercido pelo Governador do Distrito Federal, eleito para mandato de quatro anos.',
    source: S
  },

  // ───────────────────────── Política para Mulheres ─────────────────────────
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Calúnia, difamação e injúria praticadas contra a mulher, no âmbito doméstico, caracterizam violência:',
    options: [
      { text: 'Física' },
      { text: 'Psicológica' },
      { text: 'Moral', correct: true },
      { text: 'Patrimonial' },
      { text: 'Sexual' }
    ],
    explanation:
      'O art. 7º, V, da Lei Maria da Penha define a violência moral como qualquer conduta que configure calúnia, difamação ou injúria.',
    source: S
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'CE',
    difficulty: 'DIFICIL',
    statement:
      'Aos crimes praticados com violência doméstica e familiar contra a mulher, independentemente da pena prevista, NÃO se aplica a Lei dos Juizados Especiais Criminais (Lei nº 9.099/1995).',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O art. 41 da Lei Maria da Penha veda expressamente a aplicação da Lei nº 9.099/95 aos crimes praticados com violência doméstica e familiar contra a mulher.',
    source: S
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Formas de violência doméstica e familiar',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'As relações pessoais protegidas pela Lei Maria da Penha independem de orientação sexual.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O parágrafo único do art. 5º estabelece que as relações pessoais nela previstas independem de orientação sexual.',
    source: S
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Medidas protetivas de urgência',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'É exemplo de medida protetiva de urgência que obriga o agressor, prevista na Lei Maria da Penha:',
    options: [
      { text: 'Encaminhamento da ofendida a programa de auxílio' },
      { text: 'Afastamento do agressor do lar, domicílio ou local de convivência', correct: true },
      { text: 'Recondução da ofendida ao respectivo domicílio' },
      { text: 'Separação de corpos requerida pela vítima' },
      { text: 'Inclusão da vítima em programa de proteção' }
    ],
    explanation:
      'Entre as medidas que obrigam o agressor (art. 22) está o afastamento do lar, domicílio ou local de convivência com a ofendida.',
    source: S
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Nas ações penais públicas condicionadas à representação, a renúncia da ofendida, quando admitida, só será válida se feita:',
    options: [
      { text: 'na delegacia, perante a autoridade policial' },
      { text: 'perante o juiz, em audiência especialmente designada, antes do recebimento da denúncia', correct: true },
      { text: 'por escrito, a qualquer tempo, sem formalidades' },
      { text: 'perante o Ministério Público, por petição' },
      { text: 'de forma tácita, pelo não comparecimento' }
    ],
    explanation:
      'O art. 16 da Lei Maria da Penha exige que a renúncia à representação seja feita perante o juiz, em audiência especialmente designada, antes do recebimento da denúncia e ouvido o Ministério Público.',
    source: S
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Rede de enfrentamento à violência contra a mulher',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O canal telefônico nacional de denúncia e orientação para mulheres em situação de violência é o:',
    options: [
      { text: 'Disque 100' },
      { text: 'Ligue 180', correct: true },
      { text: 'Disque 190' },
      { text: 'Ligue 192' },
      { text: 'Disque 181' }
    ],
    explanation:
      'O Ligue 180 (Central de Atendimento à Mulher) recebe denúncias e orienta mulheres em situação de violência. O Disque 100 é de direitos humanos.',
    source: S
  },

  // ───────────────────────── Legislação (CF / LODF) ─────────────────────────
  {
    disciplineSlug: 'legislacao',
    topic: 'Direitos e garantias fundamentais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa que apresenta apenas direitos sociais previstos no art. 6º da Constituição Federal.',
    options: [
      { text: 'Educação, saúde, alimentação, trabalho e moradia', correct: true },
      { text: 'Voto, elegibilidade e nacionalidade' },
      { text: 'Propriedade, herança e livre iniciativa' },
      { text: 'Devido processo legal e ampla defesa' },
      { text: 'Liberdade de imprensa e sigilo de correspondência' }
    ],
    explanation:
      'O art. 6º arrola, entre os direitos sociais, a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância e a assistência aos desamparados.',
    source: S
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Lei Orgânica do Distrito Federal',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'A Câmara Legislativa do Distrito Federal é composta por Deputados Distritais, eleitos pelo sistema proporcional.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A Câmara Legislativa do DF é integrada por Deputados Distritais, eleitos pelo sistema proporcional, com mandato de quatro anos.',
    source: S
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Organização do Estado e dos Poderes (noções)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'A República Federativa do Brasil adota, como forma de governo e forma de Estado, respectivamente:',
    options: [
      { text: 'Monarquia e Estado unitário' },
      { text: 'República e Federação', correct: true },
      { text: 'República e Estado unitário' },
      { text: 'Monarquia e Confederação' },
      { text: 'República e Confederação' }
    ],
    explanation:
      'O Brasil adota a república como forma de governo e a federação como forma de Estado (CF, art. 1º).',
    source: S
  },
  {
    disciplineSlug: 'legislacao',
    topic: 'Ética no serviço público',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A moralidade administrativa exige do agente público não apenas a observância da lei, mas também a atuação conforme a honestidade e a boa-fé.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A moralidade impõe ao agente público conduta ética, honesta e de boa-fé, indo além da mera legalidade formal.',
    source: S
  },

  // ───────────────────────── Primeiros Socorros ─────────────────────────
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Parada cardiorrespiratória e RCP',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Diante de uma vítima inconsciente que não respira e não tem pulso, o uso do desfibrilador externo automático (DEA) deve ocorrer assim que o aparelho estiver disponível, sem interromper desnecessariamente as compressões.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O DEA deve ser utilizado o mais rápido possível, integrando a cadeia de sobrevivência, com mínima interrupção das compressões torácicas.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Desmaios, convulsões e estados de choque',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'A posição lateral de segurança (posição de recuperação) é indicada para a vítima que está:',
    options: [
      { text: 'inconsciente, mas respirando normalmente', correct: true },
      { text: 'em parada cardiorrespiratória' },
      { text: 'consciente e com hemorragia abundante' },
      { text: 'com suspeita de fratura na coluna' },
      { text: 'consciente e engasgada' }
    ],
    explanation:
      'A posição lateral de segurança é indicada para vítima inconsciente que respira, pois mantém as vias aéreas pérvias e evita aspiração. Não se usa em PCR (que exige RCP) nem havendo suspeita de trauma de coluna.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'OVACE (engasgo) e desobstrução de vias aéreas',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Em um bebê (menor de 1 ano) com obstrução de vias aéreas por corpo estranho e consciente, a sequência recomendada é:',
    options: [
      { text: 'Manobra de Heimlich (compressões abdominais)' },
      { text: 'Golpes nas costas alternados com compressões torácicas', correct: true },
      { text: 'Apenas oferecer água' },
      { text: 'Virar o bebê de cabeça para baixo e sacudir' },
      { text: 'Iniciar imediatamente compressões abdominais vigorosas' }
    ],
    explanation:
      'No lactente consciente, recomenda-se alternar 5 golpes nas costas (interescapulares) com 5 compressões torácicas. A manobra de Heimlich (compressões abdominais) não é indicada para bebês.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Queimaduras',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'No atendimento a queimaduras, deve-se estourar as bolhas formadas para acelerar a cicatrização.',
    options: [
      { text: 'Certo' },
      { text: 'Errado', correct: true }
    ],
    explanation:
      'Errado. As bolhas não devem ser estouradas, pois funcionam como barreira de proteção; rompê-las aumenta o risco de infecção.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Fraturas e imobilização',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Diante de suspeita de fratura em um membro, a conduta correta do socorrista é:',
    options: [
      { text: 'Tentar recolocar o osso no lugar' },
      { text: 'Imobilizar o membro na posição encontrada, sem forçar', correct: true },
      { text: 'Massagear o local para aliviar a dor' },
      { text: 'Aplicar calor diretamente sobre o ferimento' },
      { text: 'Fazer a vítima movimentar o membro' }
    ],
    explanation:
      'O correto é imobilizar o membro na posição em que foi encontrado, sem tentar reposicionar o osso, prevenindo lesões adicionais.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Desmaios, convulsões e estados de choque',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'Diante de um desmaio (lipotimia), com a vítima consciente, a conduta indicada é:',
    options: [
      { text: 'Mantê-la em pé e fazê-la caminhar' },
      { text: 'Deitá-la e elevar levemente as pernas', correct: true },
      { text: 'Oferecer bebida alcoólica' },
      { text: 'Jogar água gelada no rosto e sacudir' },
      { text: 'Sentá-la e baixar a cabeça entre as pernas com força' }
    ],
    explanation:
      'Em desmaio, deita-se a vítima e elevam-se levemente as pernas para favorecer o retorno do sangue ao cérebro, mantendo-a em ambiente arejado.',
    source: S
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Hemorragias e ferimentos',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Em uma suspeita de intoxicação por ingestão de produto químico, o socorrista deve provocar o vômito imediatamente, antes de buscar orientação especializada.',
    options: [
      { text: 'Certo' },
      { text: 'Errado', correct: true }
    ],
    explanation:
      'Errado. Não se deve provocar vômito sem orientação, pois algumas substâncias (corrosivas/derivados de petróleo) causam mais lesão ao retornar. Aciona-se o socorro/Centro de Informação Toxicológica.',
    source: S
  },

  // ───────────────────────── Fundamentos da Assistência Social ─────────────────────────
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Política Nacional de Assistência Social (PNAS/2004)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'A assistência social integra o tripé da seguridade social, ao lado da:',
    options: [
      { text: 'Saúde e da previdência social', correct: true },
      { text: 'Educação e da cultura' },
      { text: 'Habitação e do saneamento' },
      { text: 'Segurança pública e da justiça' },
      { text: 'Previdência e da educação' }
    ],
    explanation:
      'A seguridade social compreende um conjunto integrado de ações nas áreas de saúde, previdência social e assistência social (CF, art. 194).',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Princípios e diretrizes da assistência social',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Constitui princípio da assistência social, segundo a LOAS, a:',
    options: [
      { text: 'Supremacia das exigências de rentabilidade econômica sobre as necessidades sociais' },
      { text: 'Supremacia do atendimento às necessidades sociais sobre as exigências de rentabilidade econômica', correct: true },
      { text: 'Seletividade no acesso, com cobrança de contribuição' },
      { text: 'Centralização das ações no governo federal' },
      { text: 'Restrição da divulgação dos benefícios' }
    ],
    explanation:
      'O art. 4º da LOAS estabelece como princípio a supremacia do atendimento às necessidades sociais sobre as exigências de rentabilidade econômica.',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Proteções afiançadas',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A Proteção Social Básica tem caráter preventivo e destina-se a prevenir situações de risco por meio do desenvolvimento de potencialidades e do fortalecimento de vínculos familiares e comunitários.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A PSB é preventiva e visa fortalecer vínculos e desenvolver potencialidades, atuando antes da ocorrência de violações de direitos.',
    source: S
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Territorialização e descentralização',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O princípio organizativo que orienta a oferta dos serviços socioassistenciais a partir das características e demandas do território é a:',
    options: [
      { text: 'Centralização' },
      { text: 'Territorialização', correct: true },
      { text: 'Setorialização' },
      { text: 'Verticalização' },
      { text: 'Privatização' }
    ],
    explanation:
      'A territorialização orienta o planejamento e a oferta dos serviços conforme as vulnerabilidades e potencialidades de cada território.',
    source: S
  },

  // ───────────────────────── Organização SUAS ─────────────────────────
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'Sistema Único de Assistência Social (SUAS)',
    type: 'CE',
    difficulty: 'DIFICIL',
    statement: 'O Sistema Único de Assistência Social (SUAS) foi inscrito na Lei Orgânica da Assistência Social pela Lei nº 12.435/2011.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A Lei nº 12.435/2011 alterou a LOAS e consolidou legalmente o SUAS, antes regulamentado por normas operacionais (NOB-SUAS).',
    source: S
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CRAS — Centro de Referência de Assistência Social',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O CRAS é a unidade pública estatal descentralizada, localizada em áreas de maior vulnerabilidade social, considerada a porta de entrada do SUAS.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O CRAS é a unidade da Proteção Social Básica instalada em territórios de maior vulnerabilidade, funcionando como principal porta de entrada do SUAS.',
    source: S
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'Seguranças socioassistenciais (acolhida, convívio, renda, autonomia)',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'A segurança socioassistencial que se materializa pela oferta de condições de recepção, escuta e referência aos usuários nas unidades é a segurança de:',
    options: [
      { text: 'Renda' },
      { text: 'Acolhida', correct: true },
      { text: 'Convívio' },
      { text: 'Sobrevivência' },
      { text: 'Rentabilidade' }
    ],
    explanation:
      'A segurança de acolhida diz respeito à recepção, escuta qualificada e referência do usuário, com condições adequadas de atendimento.',
    source: S
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CREAS — Centro de Referência Especializado',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O serviço estruturante do CREAS, voltado a famílias e indivíduos com direitos violados, é o:',
    options: [
      { text: 'PAIF' },
      { text: 'PAEFI', correct: true },
      { text: 'SCFV' },
      { text: 'BPC' },
      { text: 'CadÚnico' }
    ],
    explanation:
      'O CREAS oferta o PAEFI — Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos, da Proteção Social Especial de média complexidade.',
    source: S
  },

  // ───────────────────────── Gestão da Assistência ─────────────────────────
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Controle social e conselhos de assistência social',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'As instâncias que avaliam a política de assistência social e propõem diretrizes, reunindo governo e sociedade, periodicamente, são as:',
    options: [
      { text: 'Conferências de Assistência Social', correct: true },
      { text: 'Auditorias do TCU' },
      { text: 'Sindicâncias administrativas' },
      { text: 'Tomadas de contas especiais' },
      { text: 'Corregedorias' }
    ],
    explanation:
      'As Conferências de Assistência Social são instâncias periódicas de avaliação da política e de proposição de diretrizes, com participação de governo e sociedade civil.',
    source: S
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Planos e instâncias de pactuação (CIT/CIB)',
    type: 'CE',
    difficulty: 'DIFICIL',
    statement:
      'A Comissão Intergestores Tripartite (CIT) e as Comissões Intergestores Bipartite (CIB) são instâncias de negociação e pactuação dos aspectos operacionais da gestão do SUAS.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A CIT (âmbito nacional — União, estados e municípios) e as CIB (âmbito estadual) pactuam aspectos operacionais da gestão descentralizada do SUAS.',
    source: S
  },
  {
    disciplineSlug: 'gestao-assistencia',
    topic: 'Financiamento (FNAS e pisos de proteção)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'O financiamento dos serviços socioassistenciais é feito de forma compartilhada (cofinanciamento) pela União, estados, Distrito Federal e municípios.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O SUAS adota o cofinanciamento, com participação das três esferas de governo (e do DF), por meio dos respectivos fundos de assistência social.',
    source: S
  },

  // ───────────────────────── Marcos Normativos ─────────────────────────
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'ECA, Estatuto do Idoso e LBI (transversais)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência) corresponde à Lei nº:',
    options: [
      { text: '13.146/2015', correct: true },
      { text: '10.741/2003' },
      { text: '8.069/1990' },
      { text: '8.742/1993' },
      { text: '12.435/2011' }
    ],
    explanation: 'A LBI é a Lei nº 13.146/2015.',
    source: S
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'A assistência social como direito do cidadão e dever do Estado está prevista na Constituição Federal nos artigos:',
    options: [
      { text: '196 a 200' },
      { text: '203 e 204', correct: true },
      { text: '5º e 6º' },
      { text: '37 e 38' },
      { text: '170 e 171' }
    ],
    explanation:
      'Os artigos 203 e 204 da CF tratam da assistência social (objetivos, organização, descentralização e participação).',
    source: S
  },
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'NOB-SUAS 2012',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'A Norma Operacional Básica do SUAS (NOB-SUAS) disciplina a gestão pública da política de assistência social no território nacional.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A NOB-SUAS regulamenta a operacionalização da gestão do SUAS — níveis de gestão, financiamento, vigilância, gestão do trabalho e controle social.',
    source: S
  },

  // ───────────────────────── Programas Socioassistenciais ─────────────────────────
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Cadastro Único (CadÚnico)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A unidade de coleta e atualização do Cadastro Único, em geral, é referenciada à(ao):',
    options: [
      { text: 'CRAS', correct: true },
      { text: 'Conselho Tutelar' },
      { text: 'Cartório de Registro Civil' },
      { text: 'Agência da Previdência Social' },
      { text: 'Tribunal de Contas' }
    ],
    explanation:
      'O cadastramento e a atualização do CadÚnico são frequentemente realizados nas unidades de Proteção Social Básica, especialmente o CRAS, que referencia as famílias do território.',
    source: S
  },
  {
    disciplineSlug: 'programas-socioassistenciais',
    topic: 'Serviço de Convivência e Fortalecimento de Vínculos (SCFV)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'O Serviço de Convivência e Fortalecimento de Vínculos é organizado em grupos, de acordo com o ciclo de vida dos usuários.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O SCFV organiza-se em grupos por ciclos de vida (crianças, adolescentes, jovens, adultos e pessoas idosas), de forma complementar ao trabalho com famílias.',
    source: S
  },

  // ───────────────────────── Benefícios Socioassistenciais ─────────────────────────
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Critérios de elegibilidade do BPC',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Conforme a LOAS, considera-se incapaz de prover a manutenção da pessoa com deficiência ou idosa, para fins do BPC, a família cuja renda mensal per capita seja inferior a:',
    options: [
      { text: '1/2 do salário mínimo' },
      { text: '1/4 do salário mínimo', correct: true },
      { text: '1 salário mínimo' },
      { text: '2 salários mínimos' },
      { text: '1/3 do salário mínimo' }
    ],
    explanation:
      'O critério legal de renda do BPC (LOAS, art. 20, §3º) é a renda mensal familiar per capita inferior a 1/4 do salário mínimo.',
    source: S
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefício de Prestação Continuada (BPC/LOAS)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'O BPC não gera direito ao pagamento de abono anual (13º) e não deixa pensão por morte.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Por ser benefício assistencial (não previdenciário), o BPC não gera 13º salário nem pensão por morte, e deve ser revisado a cada dois anos.',
    source: S
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefícios eventuais',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A regulamentação e a oferta dos benefícios eventuais competem, prioritariamente, aos municípios e ao Distrito Federal.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Os benefícios eventuais são de competência dos municípios e do DF, cabendo aos estados o cofinanciamento e o apoio técnico.',
    source: S
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefício de Prestação Continuada (BPC/LOAS)',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O BPC é um benefício:',
    options: [
      { text: 'Contributivo e previdenciário' },
      { text: 'Assistencial, independente de contribuição', correct: true },
      { text: 'Trabalhista, pago pelo empregador' },
      { text: 'Concedido apenas a quem contribuiu por 15 anos' },
      { text: 'De natureza tributária' }
    ],
    explanation:
      'O BPC é benefício da assistência social, não contributivo, garantido a idosos e pessoas com deficiência em situação de vulnerabilidade econômica.',
    source: S
  },

  // ───────────────────────── Instrumentos do DF ─────────────────────────
  {
    disciplineSlug: 'instrumentos-df',
    topic: 'Rede socioassistencial do DF',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'No Distrito Federal, os CRAS e CREAS integram a rede pública estatal de prestação dos serviços socioassistenciais.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. CRAS e CREAS são unidades públicas estatais que, no DF, compõem a rede de proteção social básica e especial do SUAS.',
    source: S
  },
  {
    disciplineSlug: 'instrumentos-df',
    topic: 'Legislação distrital de assistência social',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'No DF, o Distrito Federal exerce, cumulativamente, as competências de estado e de município na gestão da assistência social.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Por não se dividir em municípios, o DF acumula as competências estaduais e municipais, inclusive na gestão da política de assistência social.',
    source: S
  },

  // ───────────────────────── Direito Constitucional e Administrativo ─────────────────────────
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Poderes administrativos',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O poder administrativo que permite à Administração condicionar e restringir o uso de bens, atividades e direitos individuais em benefício do interesse público é o poder:',
    options: [
      { text: 'Hierárquico' },
      { text: 'Disciplinar' },
      { text: 'De polícia', correct: true },
      { text: 'Regulamentar' },
      { text: 'Vinculado' }
    ],
    explanation:
      'O poder de polícia limita ou disciplina direitos e atividades individuais em prol do interesse coletivo (ex.: fiscalização, licenciamento, posturas).',
    source: S
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Atos administrativos',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'São requisitos (elementos) de validade do ato administrativo:',
    options: [
      { text: 'Competência, finalidade, forma, motivo e objeto', correct: true },
      { text: 'Presunção, imperatividade e autoexecutoriedade' },
      { text: 'Legalidade, moralidade e eficiência' },
      { text: 'Conveniência, oportunidade e mérito' },
      { text: 'Publicidade, motivação e razoabilidade' }
    ],
    explanation:
      'Os elementos do ato administrativo são competência, finalidade, forma, motivo e objeto. Os atributos (presunção, imperatividade, autoexecutoriedade, tipicidade) são característica distinta.',
    source: S
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Administração direta e indireta',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Integram a Administração Pública indireta:',
    options: [
      { text: 'Ministérios e secretarias' },
      { text: 'Autarquias, fundações públicas, empresas públicas e sociedades de economia mista', correct: true },
      { text: 'Apenas os órgãos do Poder Executivo' },
      { text: 'O Poder Legislativo e o Judiciário' },
      { text: 'Os cartórios extrajudiciais' }
    ],
    explanation:
      'A Administração indireta é composta por autarquias, fundações públicas, empresas públicas e sociedades de economia mista — entidades com personalidade jurídica própria.',
    source: S
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Princípios da Administração Pública (LIMPE)',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'Pelo princípio da legalidade, ao administrador público só é dado fazer o que a lei autoriza ou determina.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Diferentemente do particular (que pode fazer tudo o que a lei não proíbe), o administrador só pode agir conforme autorização ou determinação legal.',
    source: S
  },

  // ───────────────────────── Regime Jurídico dos Servidores do DF ─────────────────────────
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Provimento, vacância e formas de ingresso',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Constitui forma de vacância de cargo público:',
    options: [
      { text: 'Nomeação' },
      { text: 'Exoneração', correct: true },
      { text: 'Posse' },
      { text: 'Exercício' },
      { text: 'Lotação' }
    ],
    explanation:
      'A exoneração é forma de vacância (assim como demissão, aposentadoria, posse em outro cargo inacumulável e falecimento). Nomeação, posse e exercício relacionam-se ao provimento/investidura.',
    source: S
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Provimento, vacância e formas de ingresso',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em regra, a posse no cargo público deve ocorrer no prazo de:',
    options: [
      { text: '15 dias contados da nomeação' },
      { text: '30 dias contados da nomeação', correct: true },
      { text: '60 dias contados da nomeação' },
      { text: '90 dias contados da posse' },
      { text: '10 dias contados do exercício' }
    ],
    explanation:
      'A posse deve ocorrer, em regra, no prazo de 30 dias contados da publicação do ato de nomeação, sob pena de tornar-se sem efeito.',
    source: S
  },
  {
    disciplineSlug: 'regime-juridico-df',
    topic: 'Deveres, proibições e responsabilidades',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Entre as penalidades disciplinares aplicáveis ao servidor, a mais branda é a:',
    options: [
      { text: 'Demissão' },
      { text: 'Suspensão' },
      { text: 'Advertência', correct: true },
      { text: 'Cassação de aposentadoria' },
      { text: 'Destituição de cargo em comissão' }
    ],
    explanation:
      'A advertência é a penalidade disciplinar mais branda, aplicada a infrações leves; a gravidade cresce na suspensão e, depois, na demissão.',
    source: S
  },

  // ───────────────────────── Atendimento ao Público e Rotinas ─────────────────────────
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Redação oficial e comunicações administrativas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O pronome de tratamento adequado para se dirigir a autoridades de alto escalão, como Ministros e Governadores, é:',
    options: [
      { text: 'Vossa Senhoria' },
      { text: 'Vossa Excelência', correct: true },
      { text: 'Vossa Magnificência' },
      { text: 'Vossa Alteza' },
      { text: 'Vossa Reverendíssima' }
    ],
    explanation:
      'Vossa Excelência é o tratamento empregado para altas autoridades dos Poderes Executivo, Legislativo e Judiciário. "Vossa Senhoria" destina-se às demais autoridades e ao trato formal comum.',
    source: S
  },
  {
    disciplineSlug: 'atendimento-rotinas',
    topic: 'Trabalho em equipe e relações interpessoais',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'No serviço público, a cooperação e a comunicação clara entre os membros da equipe favorecem a eficiência e a qualidade do atendimento ao cidadão.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. O trabalho em equipe, com cooperação e comunicação clara, melhora os processos internos e a qualidade do serviço prestado ao público.',
    source: S
  },

  // ───────────────────────── Arquivologia e Gestão Documental ─────────────────────────
  {
    disciplineSlug: 'arquivologia',
    topic: 'Tipos de arquivo (corrente, intermediário, permanente)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Os documentos que aguardam o cumprimento de prazos de guarda, com baixa frequência de uso, mas que ainda podem ser consultados, pertencem ao arquivo:',
    options: [
      { text: 'Corrente' },
      { text: 'Intermediário', correct: true },
      { text: 'Permanente' },
      { text: 'Setorial' },
      { text: 'Especial' }
    ],
    explanation:
      'O arquivo intermediário guarda documentos de uso pouco frequente que aguardam prazo para destinação final (eliminação ou recolhimento ao permanente).',
    source: S
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Tabela de temporalidade e ciclo de vida documental',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'Os documentos de valor permanente (histórico, probatório) não podem ser eliminados, devendo ser preservados de forma definitiva.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Documentos de valor secundário (permanente) são preservados em caráter definitivo e não podem ser eliminados.',
    source: S
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Métodos de arquivamento',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O método de arquivamento que organiza os documentos com base no local (cidade, estado, país) é o:',
    options: [
      { text: 'Alfabético' },
      { text: 'Geográfico', correct: true },
      { text: 'Numérico simples' },
      { text: 'Cronológico' },
      { text: 'Ideográfico' }
    ],
    explanation:
      'O método geográfico ordena os documentos pela procedência ou local (país, estado, cidade), sendo útil quando a localização é o critério principal de busca.',
    source: S
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Preservação e digitalização de documentos',
    type: 'CE',
    difficulty: 'MEDIO',
    statement: 'A gestão de documentos compreende o conjunto de procedimentos relativos à produção, à tramitação, ao uso, à avaliação e ao arquivamento dos documentos.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A gestão de documentos abrange a produção, a tramitação, o uso, a avaliação e o arquivamento, em fase corrente e intermediária, visando à eliminação ou ao recolhimento.',
    source: S
  },

  // ───────────────────────── Administração de Materiais e Patrimônio ─────────────────────────
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão de estoques e armazenagem',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A técnica que classifica os itens de estoque em três categorias (A, B e C), conforme sua importância e valor, é conhecida como:',
    options: [
      { text: 'Curva ABC', correct: true },
      { text: 'PEPS' },
      { text: 'UEPS' },
      { text: 'Just in time' },
      { text: 'Kanban' }
    ],
    explanation:
      'A Curva ABC classifica os itens conforme relevância/valor: A (poucos itens, alto valor), B (intermediários) e C (muitos itens, baixo valor), orientando a priorização do controle.',
    source: S
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Gestão patrimonial: tombamento, inventário e baixa de bens',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'O levantamento físico e a conferência dos bens patrimoniais existentes em determinado momento denomina-se:',
    options: [
      { text: 'Tombamento' },
      { text: 'Inventário', correct: true },
      { text: 'Baixa' },
      { text: 'Alienação' },
      { text: 'Depreciação' }
    ],
    explanation:
      'O inventário é o levantamento e a conferência física dos bens patrimoniais, permitindo confrontar o existente com os registros de controle.',
    source: S
  },
  {
    disciplineSlug: 'materiais-patrimonio',
    topic: 'Classificação de materiais',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No método de avaliação de estoques UEPS (LIFO), as saídas são valoradas considerando que as:',
    options: [
      { text: 'primeiras unidades a entrar são as primeiras a sair' },
      { text: 'últimas unidades a entrar são as primeiras a sair', correct: true },
      { text: 'unidades saem sempre pelo custo médio' },
      { text: 'saídas independem da ordem de entrada' },
      { text: 'unidades de maior valor saem primeiro' }
    ],
    explanation:
      'No UEPS (Último que Entra, Primeiro que Sai) — LIFO —, as últimas unidades adquiridas são as primeiras a sair. (No setor público brasileiro, em regra, adota-se o PEPS ou o custo médio.)',
    source: S
  },

  // ───────────────────────── Compras Públicas e Licitações (14.133/2021) ─────────────────────────
  {
    disciplineSlug: 'licitacoes',
    topic: 'Etapas do processo licitatório',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Constitui critério de julgamento das propostas previsto na Lei nº 14.133/2021:',
    options: [
      { text: 'Maior preço' },
      { text: 'Técnica e preço', correct: true },
      { text: 'Menor prazo de garantia' },
      { text: 'Maior número de empregados' },
      { text: 'Sorteio público' }
    ],
    explanation:
      'A Lei 14.133/2021 prevê os critérios de julgamento: menor preço, maior desconto, melhor técnica ou conteúdo artístico, técnica e preço, maior lance (leilão) e maior retorno econômico.',
    source: S
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Princípios e objetivos da Lei 14.133/2021',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'A segregação de funções é um princípio da Lei nº 14.133/2021, vedando a designação do mesmo agente público para atribuições incompatíveis entre si no processo de contratação.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. A segregação de funções (art. 5º) impede a concentração de atribuições conflitantes em um mesmo agente, como forma de controle e prevenção de fraudes.',
    source: S
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Etapas do processo licitatório',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'O documento da fase preparatória que evidencia a necessidade da contratação e fundamenta a melhor solução é o:',
    options: [
      { text: 'Estudo Técnico Preliminar (ETP)', correct: true },
      { text: 'Edital de licitação' },
      { text: 'Contrato administrativo' },
      { text: 'Termo de recebimento definitivo' },
      { text: 'Ata de registro de preços' }
    ],
    explanation:
      'O Estudo Técnico Preliminar (ETP) é o documento da fase preparatória que caracteriza a necessidade e demonstra a viabilidade e a melhor solução para a contratação.',
    source: S
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Contratação direta (dispensa e inexigibilidade)',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'Na Lei nº 14.133/2021, a licitação dispensável ocorre em hipóteses nas quais, embora a competição seja viável, a lei autoriza a contratação direta por conveniência administrativa.',
    options: [
      { text: 'Certo', correct: true },
      { text: 'Errado' }
    ],
    explanation:
      'Correto. Na dispensa, a competição é possível, mas a lei faculta a contratação direta em situações específicas (ex.: pequeno valor, emergência). Na inexigibilidade, a competição é inviável.',
    source: S
  }
]
