// M29 (nivelamento CG, parte 1) — Elevar a ~20 questões: Língua Portuguesa,
// Língua Inglesa, Raciocínio Lógico, Direito Const./Adm. e Ética/Governança.
// APENAS DADOS; idempotente por seed_key; comentário alternativa por
// alternativa. Enunciados distintos dos já existentes em bankGerais.ts.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

const LP = 'lingua-portuguesa'
const ING = 'lingua-inglesa'
const RLM = 'raciocinio-logico'
const DIR = 'direito-const-adm'
const ETICA = 'etica-governanca-compliance'

export const ABGF_BANK_GERAIS2: SeedQuestion[] = [
  // ════════════════════ Língua Portuguesa (+13) ════════════════════
  {
    disciplineSlug: LP, topic: 'Domínio da ortografia oficial', type: 'ME', difficulty: 'FACIL',
    statement: 'Assinale a alternativa em que todas as palavras estão grafadas corretamente conforme a ortografia oficial.',
    options: [
      { text: 'excessão, previlégio, beneficiente.' },
      { text: 'exceção, privilégio, beneficente.', correct: true },
      { text: 'esceção, privilégio, beneficente.' },
      { text: 'exceção, previlégio, beneficiente.' },
      { text: 'excesão, privilégio, benficente.' }
    ],
    explanation:
      'A) ERRADA — "excessão", "previlégio" e "beneficiente" são grafias incorretas. B) CORRETA — exceção, privilégio e beneficente estão corretas. C) ERRADA — "esceção" é erro grosseiro. D) ERRADA — "previlégio" e "beneficiente" estão errados. E) ERRADA — "excesão" e "benficente" estão errados.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Morfossintaxe', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que o emprego do sinal indicativo de crase está correto.',
    options: [
      { text: 'Refiro-me à Vossa Senhoria.' },
      { text: 'Entreguei o processo à secretária.', correct: true },
      { text: 'Cheguei à casa cedo (minha própria casa).' },
      { text: 'Começou a reunião às pressas e à cavalo.' },
      { text: 'Estou disposto à ajudar.' }
    ],
    explanation:
      'A) ERRADA — antes de pronomes de tratamento como "Vossa Senhoria" não há crase. B) CORRETA — "entreguei a alguém" + "a secretária" = à secretária (a+a). C) ERRADA — "casa" sem especificação não admite crase. D) ERRADA — "a cavalo" (palavra masculina) não tem crase. E) ERRADA — antes de verbo no infinitivo ("ajudar") não há crase.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Morfossintaxe', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na frase "Os documentos ___ me referi já foram arquivados", a lacuna deve ser preenchida, conforme a regência, por:',
    options: [
      { text: 'que.' },
      { text: 'a que.', correct: true },
      { text: 'os quais.' },
      { text: 'de que.' },
      { text: 'cujos.' }
    ],
    explanation:
      'A) ERRADA — "referir-se a" exige a preposição "a" antes do relativo. B) CORRETA — quem se refere, refere-se A algo: "a que me referi". C) ERRADA — "os quais" sem preposição não atende à regência. D) ERRADA — a regência é "a", não "de". E) ERRADA — "cujo" indica posse, não cabe aqui.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Figuras de linguagem', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em "Ele é uma raposa nos negócios", a figura de linguagem empregada é a:',
    options: [
      { text: 'metáfora.', correct: true },
      { text: 'metonímia.' },
      { text: 'hipérbole.' },
      { text: 'eufemismo.' },
      { text: 'pleonasmo.' }
    ],
    explanation:
      'A) CORRETA — há metáfora: comparação implícita entre a pessoa e a astúcia da raposa. B) ERRADA — metonímia troca por proximidade/relação (ex.: "beber um copo"). C) ERRADA — hipérbole é exagero ("chorar rios"). D) ERRADA — eufemismo suaviza ("partiu" por morreu). E) ERRADA — pleonasmo é redundância ("subir para cima").',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Figuras de linguagem', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A frase "Li Machado de Assis inteiro nas férias" contém a figura denominada:',
    options: [
      { text: 'metonímia (autor pela obra).', correct: true },
      { text: 'antítese.' },
      { text: 'prosopopeia.' },
      { text: 'ironia.' },
      { text: 'gradação.' }
    ],
    explanation:
      'A) CORRETA — metonímia: usa-se o autor ("Machado de Assis") no lugar de sua obra. B) ERRADA — antítese opõe ideias ("guerra e paz"). C) ERRADA — prosopopeia (personificação) atribui vida a seres inanimados. D) ERRADA — ironia diz o contrário do que se pensa. E) ERRADA — gradação encadeia ideias em intensidade crescente/decrescente.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Mecanismos de coesão textual', type: 'ME', difficulty: 'MEDIO',
    statement: 'No período "A ABGF apoia exportações; portanto, atua no comércio exterior", o conectivo destacado estabelece relação de:',
    options: [
      { text: 'conclusão.', correct: true },
      { text: 'oposição.' },
      { text: 'condição.' },
      { text: 'concessão.' },
      { text: 'alternância.' }
    ],
    explanation:
      'A) CORRETA — "portanto" é conectivo conclusivo (introduz a conclusão do que foi dito). B) ERRADA — oposição usa "mas/porém". C) ERRADA — condição usa "se/caso". D) ERRADA — concessão usa "embora/ainda que". E) ERRADA — alternância usa "ou...ou/ora...ora".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Vozes do verbo; correlação de tempos e modos verbais; flexão nominal e verbal', type: 'ME', difficulty: 'MEDIO',
    statement: 'Transpondo "O gestor aprovou o relatório" para a voz passiva, obtém-se:',
    options: [
      { text: 'O relatório foi aprovado pelo gestor.', correct: true },
      { text: 'O gestor foi aprovado pelo relatório.' },
      { text: 'Aprovou-se o gestor.' },
      { text: 'O relatório aprovou o gestor.' },
      { text: 'O gestor tinha aprovado.' }
    ],
    explanation:
      'A) CORRETA — na passiva analítica o objeto ("o relatório") vira sujeito: "foi aprovado pelo gestor". B) ERRADA — inverte os papéis (quem aprova é o gestor). C) ERRADA — muda o sentido e o sujeito. D) ERRADA — inverte agente e paciente. E) ERRADA — permanece na voz ativa (tempo composto).',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Elementos estruturais e processos de formação de palavras', type: 'ME', difficulty: 'MEDIO',
    statement: 'A palavra "deslealdade" é formada pelo processo de:',
    options: [
      { text: 'derivação prefixal e sufixal (com afixos que podem ser retirados sem que a palavra deixe de existir).', correct: true },
      { text: 'composição por justaposição.' },
      { text: 'composição por aglutinação.' },
      { text: 'hibridismo.' },
      { text: 'onomatopeia.' }
    ],
    explanation:
      'A) CORRETA — de "leal" formam-se "leal → lealdade" (sufixo) e "leal → desleal" (prefixo); "deslealdade" combina prefixo e sufixo. B) ERRADA — justaposição une radicais sem alteração (ex.: "girassol"). C) ERRADA — aglutinação funde com perda fonética (ex.: "planalto"). D) ERRADA — hibridismo mistura línguas (ex.: "automóvel"). E) ERRADA — onomatopeia imita sons.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Redação institucional e correspondência oficial: estrutura, linguagem e padronização', type: 'ME', difficulty: 'FACIL',
    statement: 'Segundo o Manual de Redação da Presidência da República, a linguagem dos documentos oficiais deve pautar-se por:',
    options: [
      { text: 'clareza, impessoalidade, formalidade e uso do padrão culto da língua.', correct: true },
      { text: 'informalidade e regionalismos.' },
      { text: 'uso abundante de gírias e abreviações pessoais.' },
      { text: 'linguagem rebuscada e ambígua.' },
      { text: 'primeira pessoa e opiniões pessoais.' }
    ],
    explanation:
      'A) CORRETA — a redação oficial exige clareza, concisão, impessoalidade, formalidade e norma-padrão. B)/C) ERRADAS — informalidade, gírias e regionalismos são incompatíveis. D) ERRADA — deve-se evitar rebuscamento e ambiguidade. E) ERRADA — a impessoalidade afasta a subjetividade/opinião pessoal.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Compreensão e interpretação de textos de gêneros variados', type: 'ME', difficulty: 'MEDIO',
    statement: 'Ao identificar a "ideia central" de um texto, o leitor deve buscar:',
    options: [
      { text: 'um detalhe secundário isolado.' },
      { text: 'o tema principal em torno do qual o texto se organiza.', correct: true },
      { text: 'apenas a primeira palavra do título.' },
      { text: 'a opinião pessoal do leitor sobre o assunto.' },
      { text: 'os erros de digitação do autor.' }
    ],
    explanation:
      'A) ERRADA — detalhes secundários apoiam, mas não são a ideia central. B) CORRETA — a ideia central é o tema/tese que estrutura o texto. C) ERRADA — o título ajuda, mas a ideia central vem do conjunto. D) ERRADA — interpretação não é projetar a opinião própria. E) ERRADA — revisão ortográfica não é compreensão do sentido.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Reconhecimento de tipos e gêneros textuais', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um texto cuja finalidade é convencer o leitor por meio de argumentos, defendendo um ponto de vista, é predominantemente:',
    options: [
      { text: 'narrativo.' },
      { text: 'dissertativo-argumentativo.', correct: true },
      { text: 'descritivo.' },
      { text: 'injuntivo.' },
      { text: 'dialogal.' }
    ],
    explanation:
      'A) ERRADA — o narrativo conta fatos numa sequência temporal. B) CORRETA — o dissertativo-argumentativo defende uma tese com argumentos. C) ERRADA — o descritivo caracteriza seres/lugares. D) ERRADA — o injuntivo instrui/ordena (receitas, manuais). E) ERRADA — o dialogal reproduz diálogos.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Coordenação e subordinação; conectivos', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Em "Estudou muito, mas não foi aprovado", a segunda oração é coordenada sindética:',
    options: [
      { text: 'adversativa.', correct: true },
      { text: 'aditiva.' },
      { text: 'alternativa.' },
      { text: 'conclusiva.' },
      { text: 'explicativa.' }
    ],
    explanation:
      'A) CORRETA — "mas" introduz coordenada adversativa (oposição/contraste). B) ERRADA — aditiva soma ideias ("e", "nem"). C) ERRADA — alternativa exprime escolha ("ou...ou"). D) ERRADA — conclusiva conclui ("logo", "portanto"). E) ERRADA — explicativa justifica ("pois", "porque").',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Significação das palavras: sinonímia, antonímia, polissemia, denotação e conotação', type: 'ME', difficulty: 'FACIL',
    statement: 'Assinale o par de antônimos.',
    options: [
      { text: 'ascender / subir.' },
      { text: 'lícito / ilícito.', correct: true },
      { text: 'casa / lar.' },
      { text: 'belo / bonito.' },
      { text: 'iniciar / começar.' }
    ],
    explanation:
      'A) ERRADA — "ascender" e "subir" são sinônimos. B) CORRETA — "lícito" e "ilícito" são antônimos (permitido × proibido). C) ERRADA — "casa" e "lar" são sinônimos. D) ERRADA — "belo" e "bonito" são sinônimos. E) ERRADA — "iniciar" e "começar" são sinônimos.',
    source: S
  },

  // ════════════════════ Língua Inglesa (+15) ════════════════════
  {
    disciplineSlug: ING, topic: 'Vocabulário técnico-financeiro em inglês', type: 'ME', difficulty: 'FACIL',
    statement: 'In finance, the word "asset" is best translated as:',
    options: [
      { text: 'passivo.' },
      { text: 'ativo (bem/recurso).', correct: true },
      { text: 'prejuízo.' },
      { text: 'imposto.' },
      { text: 'juros.' }
    ],
    explanation:
      'A) ERRADA — "passivo" é "liability". B) CORRETA — "asset" é ativo/bem econômico. C) ERRADA — "prejuízo" é "loss". D) ERRADA — "imposto" é "tax". E) ERRADA — "juros" é "interest".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Vocabulário técnico-financeiro em inglês', type: 'ME', difficulty: 'MEDIO',
    statement: 'The English term "stakeholder" refers to:',
    options: [
      { text: 'apenas o acionista majoritário.' },
      { text: 'qualquer parte interessada afetada por uma organização (partes interessadas).', correct: true },
      { text: 'o auditor externo somente.' },
      { text: 'um tipo de imposto.' },
      { text: 'a taxa de câmbio.' }
    ],
    explanation:
      'A) ERRADA — acionista é "shareholder"; stakeholder é mais amplo. B) CORRETA — stakeholder é toda parte interessada (clientes, empregados, sociedade, governo). C) ERRADA — auditor é apenas um dos stakeholders. D)/E) ERRADAS — não têm relação com o conceito.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Semântica: sinonímia, antonímia, polissemia e expressões idiomáticas', type: 'ME', difficulty: 'DIFICIL',
    statement: 'The false friend "actually" in English means, in Portuguese:',
    options: [
      { text: 'atualmente.' },
      { text: 'na verdade / de fato.', correct: true },
      { text: 'eventualmente.' },
      { text: 'finalmente.' },
      { text: 'raramente.' }
    ],
    explanation:
      'A) ERRADA — "atualmente" é "currently/nowadays" (pegadinha do falso cognato). B) CORRETA — "actually" = na verdade/de fato. C) ERRADA — "eventualmente" seria "possibly". D) ERRADA — "finalmente" é "finally". E) ERRADA — "raramente" é "rarely".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Itens gramaticais relevantes à compreensão de texto', type: 'ME', difficulty: 'MEDIO',
    statement: 'Choose the correct comparative form: "Cloud storage is ___ than a local server for scalability."',
    options: [
      { text: 'more flexible', correct: true },
      { text: 'flexibler' },
      { text: 'most flexible' },
      { text: 'the more flexible' },
      { text: 'flexiblest' }
    ],
    explanation:
      'A) CORRETA — adjetivos longos formam o comparativo com "more ... than": "more flexible than". B) ERRADA — "flexibler" não existe. C) ERRADA — "most flexible" é superlativo, não comparativo. D) ERRADA — "the more flexible" não é a forma comparativa padrão com "than". E) ERRADA — "flexiblest" não existe.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Itens gramaticais relevantes à compreensão de texto', type: 'ME', difficulty: 'MEDIO',
    statement: 'Choose the option with the correct modal to express obligation: "All users ___ change their passwords every 90 days."',
    options: [
      { text: 'must', correct: true },
      { text: 'might' },
      { text: 'could' },
      { text: 'would' },
      { text: 'may' }
    ],
    explanation:
      'A) CORRETA — "must" exprime obrigação/necessidade forte. B) ERRADA — "might" indica possibilidade remota. C) ERRADA — "could" indica possibilidade/habilidade passada. D) ERRADA — "would" indica condicional/hábito passado. E) ERRADA — "may" indica permissão/possibilidade, não obrigação.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Compreensão e interpretação de textos técnicos em língua inglesa', type: 'ME', difficulty: 'FACIL',
    statement: 'In a technical text, the word "however" is used to introduce:',
    options: [
      { text: 'a contrast or opposition (contraste/oposição).', correct: true },
      { text: 'an addition of similar ideas.' },
      { text: 'a chronological sequence.' },
      { text: 'an example.' },
      { text: 'a conclusion of cause.' }
    ],
    explanation:
      'A) CORRETA — "however" marca contraste/oposição (equivale a "no entanto"). B) ERRADA — adição usaria "moreover/also". C) ERRADA — sequência usaria "then/next". D) ERRADA — exemplo usaria "for instance". E) ERRADA — causa/conclusão usaria "therefore".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Vocabulário técnico-financeiro em inglês', type: 'ME', difficulty: 'MEDIO',
    statement: 'In the sentence "The company reported a significant increase in revenue", the word "revenue" means:',
    options: [
      { text: 'receita.', correct: true },
      { text: 'dívida.' },
      { text: 'funcionário.' },
      { text: 'imposto de renda.' },
      { text: 'prejuízo.' }
    ],
    explanation:
      'A) CORRETA — "revenue" é receita (faturamento). B) ERRADA — "dívida" é "debt". C) ERRADA — "funcionário" é "employee". D) ERRADA — imposto de renda é "income tax". E) ERRADA — "prejuízo" é "loss".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Semântica: sinonímia, antonímia, polissemia e expressões idiomáticas', type: 'ME', difficulty: 'MEDIO',
    statement: 'The idiom "to think outside the box" means:',
    options: [
      { text: 'to think creatively, beyond conventional ideas (pensar de forma criativa).', correct: true },
      { text: 'to store items in a box.' },
      { text: 'to avoid thinking at all.' },
      { text: 'to follow strict rules only.' },
      { text: 'to work inside a warehouse.' }
    ],
    explanation:
      'A) CORRETA — a expressão idiomática significa pensar de modo criativo/inovador. B)/E) ERRADAS — tomam o sentido literal de "box". C) ERRADA — o oposto da ideia. D) ERRADA — seguir regras rígidas contraria a criatividade sugerida.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Itens gramaticais relevantes à compreensão de texto', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Identify the sentence written correctly in the present perfect tense.',
    options: [
      { text: 'The agency has implemented a new security policy.', correct: true },
      { text: 'The agency have implement a new security policy.' },
      { text: 'The agency has implementing a new policy.' },
      { text: 'The agency implemented has a new policy.' },
      { text: 'The agency is implement a new policy.' }
    ],
    explanation:
      'A) CORRETA — present perfect = "has/have + past participle": "has implemented". B) ERRADA — "have implement" não flexiona o particípio (e concordância errada). C) ERRADA — "has implementing" mistura auxiliar com gerúndio. D) ERRADA — ordem incorreta. E) ERRADA — "is implement" é agramatical.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Estratégias de leitura: informações específicas, inferência e predição, organização semântica e discursiva', type: 'ME', difficulty: 'MEDIO',
    statement: 'When a reader uses the title and images to anticipate the content of a text before reading it, the strategy is called:',
    options: [
      { text: 'prediction (predição).', correct: true },
      { text: 'summarizing.' },
      { text: 'translating word by word.' },
      { text: 'memorizing.' },
      { text: 'proofreading.' }
    ],
    explanation:
      'A) CORRETA — prediction é antecipar o conteúdo a partir de pistas (título, imagens). B) ERRADA — summarizing é resumir após ler. C) ERRADA — traduzir palavra a palavra é ineficiente e não é predição. D) ERRADA — memorizar não antecipa sentido. E) ERRADA — proofreading é revisar erros.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Vocabulário técnico-financeiro em inglês', type: 'ME', difficulty: 'FACIL',
    statement: 'The financial term "budget" corresponds, in Portuguese, to:',
    options: [
      { text: 'orçamento.', correct: true },
      { text: 'lucro.' },
      { text: 'balanço.' },
      { text: 'ação.' },
      { text: 'dividendo.' }
    ],
    explanation:
      'A) CORRETA — "budget" é orçamento. B) ERRADA — "lucro" é "profit". C) ERRADA — "balanço" (patrimonial) é "balance sheet". D) ERRADA — "ação" é "share/stock". E) ERRADA — "dividendo" é "dividend".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Mecanismos de coesão textual: referenciação e sequenciação', type: 'ME', difficulty: 'MEDIO',
    statement: 'In "The board approved the project because it was cost-effective", the pronoun "it" refers to:',
    options: [
      { text: 'the project.', correct: true },
      { text: 'the board.' },
      { text: 'the cost.' },
      { text: 'the approval.' },
      { text: 'no specific noun.' }
    ],
    explanation:
      'A) CORRETA — "it" retoma "the project" (o que era custo-efetivo). B) ERRADA — "the board" seria "they". C) ERRADA — "cost" não é o antecedente sujeito da oração causal. D) ERRADA — "approval" não é o referente. E) ERRADA — há sim um antecedente claro (the project).',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Funções retóricas: argumentação, exemplificação, definição, descrição e conclusão', type: 'ME', difficulty: 'MEDIO',
    statement: 'The expression "for example" performs which rhetorical function in a text?',
    options: [
      { text: 'exemplification (exemplificação).', correct: true },
      { text: 'conclusion.' },
      { text: 'contrast.' },
      { text: 'cause and effect.' },
      { text: 'definition.' }
    ],
    explanation:
      'A) CORRETA — "for example" introduz um exemplo (exemplificação). B) ERRADA — conclusão usaria "in conclusion/therefore". C) ERRADA — contraste usaria "however/on the other hand". D) ERRADA — causa/efeito usaria "because/thus". E) ERRADA — definição usaria "is defined as".',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Semântica: sinonímia, antonímia, polissemia e expressões idiomáticas', type: 'ME', difficulty: 'FACIL',
    statement: 'Choose the antonym of "increase".',
    options: [
      { text: 'decrease.', correct: true },
      { text: 'raise.' },
      { text: 'grow.' },
      { text: 'expand.' },
      { text: 'rise.' }
    ],
    explanation:
      'A) CORRETA — "decrease" (diminuir) é o antônimo de "increase" (aumentar). B)/C)/D)/E) ERRADAS — raise, grow, expand e rise são sinônimos (ou próximos) de aumentar/crescer.',
    source: S
  },
  {
    disciplineSlug: ING, topic: 'Compreensão e interpretação de textos técnicos em língua inglesa', type: 'ME', difficulty: 'MEDIO',
    statement: 'In the sentence "The system must be able to handle large amounts of data", the verb "to handle" is best translated as:',
    options: [
      { text: 'lidar com / processar.', correct: true },
      { text: 'entregar.' },
      { text: 'esconder.' },
      { text: 'vender.' },
      { text: 'apagar.' }
    ],
    explanation:
      'A) CORRETA — "to handle" significa lidar com/manejar/processar (aqui, processar grandes volumes de dados). B) ERRADA — "entregar" é "to deliver". C) ERRADA — "esconder" é "to hide". D) ERRADA — "vender" é "to sell". E) ERRADA — "apagar" é "to delete/erase".',
    source: S
  },

  // ════════════════════ Raciocínio Lógico (+14) ════════════════════
  {
    disciplineSlug: RLM, topic: 'Lógica sentencial (proposicional)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A negação da proposição "João é servidor E Maria é analista" é:',
    options: [
      { text: 'João não é servidor E Maria não é analista.' },
      { text: 'João não é servidor OU Maria não é analista.', correct: true },
      { text: 'João é servidor OU Maria é analista.' },
      { text: 'Se João é servidor, então Maria é analista.' },
      { text: 'João é servidor E Maria não é analista.' }
    ],
    explanation:
      'A) ERRADA — negar uma conjunção não vira conjunção de negações. B) CORRETA — por De Morgan, ~(p ∧ q) = ~p ∨ ~q. C) ERRADA — não nega as proposições. D) ERRADA — transforma em condicional, o que não é a negação. E) ERRADA — nega só uma parte.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Lógica sentencial (proposicional)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A negação de "Se estudo, então passo" é:',
    options: [
      { text: 'Se não estudo, então não passo.' },
      { text: 'Estudo e não passo.', correct: true },
      { text: 'Não estudo ou passo.' },
      { text: 'Se passo, então estudo.' },
      { text: 'Não estudo e não passo.' }
    ],
    explanation:
      'A) ERRADA — é a inversa, não a negação. B) CORRETA — ~(p → q) = p ∧ ~q: "estudo E não passo". C) ERRADA — "não estudo ou passo" é justamente a forma equivalente à condicional (não sua negação). D) ERRADA — é a recíproca. E) ERRADA — nega ambas, o que não corresponde.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Tautologia, contradição e contingência; tabelas-verdade', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma proposição composta que é SEMPRE verdadeira, independentemente dos valores lógicos das proposições simples, é uma:',
    options: [
      { text: 'tautologia.', correct: true },
      { text: 'contradição.' },
      { text: 'contingência.' },
      { text: 'bicondicional falsa.' },
      { text: 'falácia.' }
    ],
    explanation:
      'A) CORRETA — a tautologia é sempre verdadeira (ex.: p ∨ ~p). B) ERRADA — a contradição é sempre falsa. C) ERRADA — a contingência ora é V, ora F. D) ERRADA — não é uma classificação de valor constante. E) ERRADA — falácia é um erro de argumentação, não classificação de tabela-verdade.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Lógica de argumentação: analogias, inferências, deduções, conclusões e silogismos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Considere: "Todo analista é servidor. João é analista." A conclusão logicamente válida é:',
    options: [
      { text: 'João é servidor.', correct: true },
      { text: 'João não é servidor.' },
      { text: 'Todo servidor é analista.' },
      { text: 'João pode não ser servidor.' },
      { text: 'Nenhum analista é servidor.' }
    ],
    explanation:
      'A) CORRETA — silogismo válido: se todo analista é servidor e João é analista, então João é servidor. B) ERRADA — contraria as premissas. C) ERRADA — inverte a relação (nem todo servidor é analista). D) ERRADA — a conclusão é necessária, não possível. E) ERRADA — contradiz a primeira premissa.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas', type: 'ME', difficulty: 'FACIL',
    statement: 'Se 4 servidores processam 200 documentos em 1 dia, quantos documentos 6 servidores processam no mesmo ritmo e período?',
    options: [
      { text: '250.' },
      { text: '300.', correct: true },
      { text: '260.' },
      { text: '400.' },
      { text: '350.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — não resultam da proporção direta. B) CORRETA — regra de três direta: 4→200, logo 1 servidor faz 50; 6×50 = 300 documentos.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um valor sofreu dois aumentos sucessivos de 10% cada. O aumento percentual total foi de:',
    options: [
      { text: '20%.' },
      { text: '21%.', correct: true },
      { text: '11%.' },
      { text: '19%.' },
      { text: '100%.' }
    ],
    explanation:
      'A) ERRADA — aumentos sucessivos não se somam diretamente. B) CORRETA — 1,10 × 1,10 = 1,21, ou seja, +21%. C) ERRADA — 11% seria um único aumento sobre 10%. D) ERRADA — 19% não corresponde ao cálculo composto. E) ERRADA — 100% é dobro, muito acima.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Noções de probabilidade e estatística descritiva: frequência, medidas de posição e dispersão', type: 'ME', difficulty: 'MEDIO',
    statement: 'Ao lançar um dado honesto de seis faces, a probabilidade de sair um número par é:',
    options: [
      { text: '1/6.' },
      { text: '1/2.', correct: true },
      { text: '1/3.' },
      { text: '2/3.' },
      { text: '1/4.' }
    ],
    explanation:
      'A) ERRADA — 1/6 é a chance de um número específico. B) CORRETA — há 3 pares (2,4,6) em 6 faces: 3/6 = 1/2. C) ERRADA — 1/3 corresponderia a 2 casos favoráveis. D) ERRADA — 2/3 são 4 casos. E) ERRADA — 1/4 não se aplica a 6 faces.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Noções de probabilidade e estatística descritiva: frequência, medidas de posição e dispersão', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No conjunto de dados {2, 4, 4, 6, 9}, a média aritmética é:',
    options: [
      { text: '4.' },
      { text: '5.', correct: true },
      { text: '4,5.' },
      { text: '6.' },
      { text: '25.' }
    ],
    explanation:
      'A) ERRADA — 4 é a moda (valor mais frequente), não a média. B) CORRETA — (2+4+4+6+9)/5 = 25/5 = 5. C) ERRADA — 4,5 não corresponde. D) ERRADA — 6 é apenas um dos valores. E) ERRADA — 25 é a soma, não a média.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Estrutura lógica de relações; dedução de novas informações e avaliação de condições', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em uma sequência lógica 2, 6, 18, 54, ..., o próximo termo é:',
    options: [
      { text: '108.' },
      { text: '162.', correct: true },
      { text: '150.' },
      { text: '216.' },
      { text: '110.' }
    ],
    explanation:
      'A) ERRADA — 108 seria multiplicar por 2. B) CORRETA — a razão é ×3: 54 × 3 = 162. C)/D)/E) ERRADAS — não seguem a progressão geométrica de razão 3.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Equivalências lógicas; leis de De Morgan; implicações', type: 'ME', difficulty: 'MEDIO',
    statement: 'A proposição "Se chove, então levo guarda-chuva" é logicamente equivalente a:',
    options: [
      { text: 'Não chove ou levo guarda-chuva.', correct: true },
      { text: 'Chove e levo guarda-chuva.' },
      { text: 'Se levo guarda-chuva, então chove.' },
      { text: 'Não levo guarda-chuva e chove.' },
      { text: 'Chove ou não levo guarda-chuva.' }
    ],
    explanation:
      'A) CORRETA — p → q equivale a ~p ∨ q: "não chove ou levo guarda-chuva". B) ERRADA — conjunção não é equivalente à condicional. C) ERRADA — é a recíproca. D) ERRADA — é a negação da condicional. E) ERRADA — inverte o valor do consequente.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Quantificadores; afirmações e negações', type: 'ME', difficulty: 'MEDIO',
    statement: 'A negação de "Algum servidor é efetivo" é:',
    options: [
      { text: 'Nenhum servidor é efetivo.', correct: true },
      { text: 'Todo servidor é efetivo.' },
      { text: 'Algum servidor não é efetivo.' },
      { text: 'Nem todo servidor é efetivo.' },
      { text: 'Todo servidor não é efetivo ou algum é.' }
    ],
    explanation:
      'A) CORRETA — a negação de "algum A é B" (existe) é "nenhum A é B". B) ERRADA — "todo é" não nega a existência. C) ERRADA — também é uma afirmação existencial. D) ERRADA — equivale a "algum não é", não à negação pedida. E) ERRADA — proposição confusa, não é a negação.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas', type: 'ME', difficulty: 'FACIL',
    statement: 'Numa turma de 40 candidatos, 30% foram aprovados. O número de aprovados foi:',
    options: [
      { text: '10.' },
      { text: '12.', correct: true },
      { text: '13.' },
      { text: '15.' },
      { text: '8.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — não correspondem a 30% de 40. B) CORRETA — 30% de 40 = 0,30 × 40 = 12 aprovados.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Raciocínio verbal, matemático e sequencial; orientação espacial e temporal; formação de conceitos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Se hoje é quarta-feira, que dia da semana será daqui a 100 dias?',
    options: [
      { text: 'segunda-feira.' },
      { text: 'sexta-feira.', correct: true },
      { text: 'quarta-feira.' },
      { text: 'sábado.' },
      { text: 'domingo.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — não correspondem ao cálculo do resto. B) CORRETA — 100 ÷ 7 deixa resto 2; contando 2 dias após quarta (quinta, sexta), chega-se à sexta-feira.',
    source: S
  },
  {
    disciplineSlug: RLM, topic: 'Lógica de argumentação: analogias, inferências, deduções, conclusões e silogismos', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Considere: "Nenhum político é honesto. Alguns cidadãos são honestos." Conclui-se validamente que:',
    options: [
      { text: 'alguns cidadãos não são políticos.', correct: true },
      { text: 'todos os cidadãos são políticos.' },
      { text: 'nenhum cidadão é político.' },
      { text: 'todos os políticos são cidadãos.' },
      { text: 'alguns políticos são honestos.' }
    ],
    explanation:
      'A) CORRETA — se alguns cidadãos são honestos e nenhum político é honesto, esses cidadãos honestos não podem ser políticos: "alguns cidadãos não são políticos". B) ERRADA — nada garante isso. C) ERRADA — a conclusão é parcial ("alguns"), não universal. D) ERRADA — não decorre das premissas. E) ERRADA — contradiz a primeira premissa.',
    source: S
  },

  // ════════════════════ Direito Constitucional e Administrativo (+15) ════════════════════
  {
    disciplineSlug: DIR, topic: 'CF/1988: princípios fundamentais; direitos e garantias fundamentais (individuais, sociais e políticos)', type: 'ME', difficulty: 'FACIL',
    statement: 'Segundo o art. 1º da CF/1988, NÃO é um dos fundamentos da República Federativa do Brasil:',
    options: [
      { text: 'a soberania.' },
      { text: 'a prevalência dos direitos humanos.', correct: true },
      { text: 'a cidadania.' },
      { text: 'os valores sociais do trabalho e da livre iniciativa.' },
      { text: 'o pluralismo político.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — soberania, cidadania, valores sociais do trabalho e da livre iniciativa e pluralismo político são fundamentos (art. 1º). B) CORRETA (é a exceção pedida) — "prevalência dos direitos humanos" é princípio das RELAÇÕES INTERNACIONAIS (art. 4º), não fundamento do art. 1º.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'CF/1988: princípios fundamentais; direitos e garantias fundamentais (individuais, sociais e políticos)', type: 'ME', difficulty: 'MEDIO',
    statement: 'O remédio constitucional adequado para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, lesado por ato de autoridade, é o:',
    options: [
      { text: 'mandado de segurança.', correct: true },
      { text: 'habeas corpus.' },
      { text: 'habeas data.' },
      { text: 'mandado de injunção.' },
      { text: 'ação popular.' }
    ],
    explanation:
      'A) CORRETA — o mandado de segurança protege direito líquido e certo não amparado por HC ou HD. B) ERRADA — o habeas corpus tutela a liberdade de locomoção. C) ERRADA — o habeas data assegura acesso/retificação de informações pessoais. D) ERRADA — o mandado de injunção supre falta de norma regulamentadora. E) ERRADA — a ação popular anula ato lesivo ao patrimônio público.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Organização dos Poderes: Executivo, Legislativo e Judiciário — atribuições e competências', type: 'ME', difficulty: 'MEDIO',
    statement: 'O princípio da separação dos Poderes, com o sistema de freios e contrapesos (checks and balances), significa que:',
    options: [
      { text: 'os Poderes são absolutamente independentes, sem qualquer controle mútuo.' },
      { text: 'os Poderes são independentes e harmônicos, controlando-se reciprocamente.', correct: true },
      { text: 'o Judiciário se subordina ao Executivo.' },
      { text: 'o Legislativo pode julgar ações penais comuns livremente.' },
      { text: 'há um único Poder concentrado.' }
    ],
    explanation:
      'A) ERRADA — há controle recíproco; não é independência absoluta. B) CORRETA — o art. 2º prevê Poderes independentes e HARMÔNICOS, com freios e contrapesos. C) ERRADA — não há subordinação; os Poderes são harmônicos. D) ERRADA — julgar ações penais comuns é do Judiciário. E) ERRADA — a concentração de Poder contraria o princípio.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Poderes da Administração: hierárquico, disciplinar, regulamentar e de polícia; uso e abuso do poder', type: 'ME', difficulty: 'MEDIO',
    statement: 'O poder pela Administração de limitar o exercício de direitos individuais em benefício do interesse público (ex.: fiscalização sanitária) é o poder:',
    options: [
      { text: 'de polícia.', correct: true },
      { text: 'hierárquico.' },
      { text: 'disciplinar.' },
      { text: 'regulamentar.' },
      { text: 'vinculado.' }
    ],
    explanation:
      'A) CORRETA — o poder de polícia condiciona/limita direitos individuais em prol do interesse coletivo. B) ERRADA — o hierárquico organiza e escalona funções internas. C) ERRADA — o disciplinar apura e pune faltas de servidores/contratados. D) ERRADA — o regulamentar edita atos gerais para fiel execução da lei. E) ERRADA — "vinculado" é característica do ato, não um poder autônomo.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Improbidade administrativa: Lei nº 8.429/1992 e alterações (Lei nº 14.230/2021)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Após a Lei nº 14.230/2021, os atos de improbidade administrativa passaram a exigir, para sua configuração:',
    options: [
      { text: 'apenas culpa leve do agente.' },
      { text: 'a presença de dolo (não bastando a mera culpa) do agente público.', correct: true },
      { text: 'responsabilidade objetiva, independente de conduta.' },
      { text: 'condenação penal prévia obrigatória.' },
      { text: 'exclusivamente dano ao erário, sem outras hipóteses.' }
    ],
    explanation:
      'A) ERRADA — a culpa (mesmo leve) deixou de configurar improbidade. B) CORRETA — a Lei 14.230/2021 exige DOLO; a modalidade culposa foi afastada. C) ERRADA — não é responsabilidade objetiva. D) ERRADA — não exige condenação penal prévia. E) ERRADA — há três grandes categorias (enriquecimento ilícito, dano ao erário e violação de princípios).',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Processo administrativo: Lei nº 9.784/1999', type: 'ME', difficulty: 'MEDIO',
    statement: 'Conforme a Lei nº 9.784/1999, a Administração tem o dever de motivar seus atos. A motivação consiste em:',
    options: [
      { text: 'indicar os fundamentos de fato e de direito que embasam a decisão.', correct: true },
      { text: 'ocultar as razões da decisão por sigilo.' },
      { text: 'decidir sem qualquer justificativa.' },
      { text: 'apenas citar o número do processo.' },
      { text: 'transferir a decisão ao particular.' }
    ],
    explanation:
      'A) CORRETA — motivar é explicitar os pressupostos de fato e de direito da decisão. B) ERRADA — motivação é transparência, não sigilo. C) ERRADA — decidir sem justificativa viola o dever de motivar. D) ERRADA — citar o número não é motivar. E) ERRADA — a competência decisória é da Administração.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Lei de Acesso à Informação: Lei nº 12.527/2011', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na Lei de Acesso à Informação (Lei nº 12.527/2011), a regra geral quanto ao acesso às informações públicas é:',
    options: [
      { text: 'o sigilo, sendo a publicidade a exceção.' },
      { text: 'a publicidade, sendo o sigilo a exceção.', correct: true },
      { text: 'o acesso apenas mediante pagamento.' },
      { text: 'a divulgação somente a agentes públicos.' },
      { text: 'a proibição total de acesso a documentos.' }
    ],
    explanation:
      'A) ERRADA — inverte a lógica da lei. B) CORRETA — a LAI consagra a publicidade como regra e o sigilo como exceção. C) ERRADA — o acesso é, em regra, gratuito (ressalvado custo de reprodução). D) ERRADA — o acesso é de qualquer pessoa, não só de agentes públicos. E) ERRADA — a lei garante acesso, não o proíbe.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Organização administrativa: administração direta e indireta; autarquias, fundações, empresas públicas e SEM', type: 'ME', difficulty: 'MEDIO',
    statement: 'São entidades da Administração Pública INDIRETA:',
    options: [
      { text: 'os Ministérios e as Secretarias.' },
      { text: 'autarquias, fundações públicas, empresas públicas e sociedades de economia mista.', correct: true },
      { text: 'apenas os órgãos da Presidência da República.' },
      { text: 'somente as empresas privadas contratadas.' },
      { text: 'os Poderes Legislativo e Judiciário.' }
    ],
    explanation:
      'A) ERRADA — Ministérios e Secretarias são órgãos da Administração DIRETA. B) CORRETA — a Administração indireta compreende autarquias, fundações públicas, empresas públicas e sociedades de economia mista. C) ERRADA — órgãos da Presidência são Administração direta. D) ERRADA — empresas privadas contratadas não integram a Administração indireta. E) ERRADA — são Poderes, não entidades da Administração indireta.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Controle da administração pública: externo, interno, judicial e legislativo; TCU e CGU', type: 'ME', difficulty: 'MEDIO',
    statement: 'O controle externo da Administração Pública federal, no âmbito financeiro e orçamentário, é exercido pelo Congresso Nacional com o auxílio do:',
    options: [
      { text: 'Tribunal de Contas da União (TCU).', correct: true },
      { text: 'Supremo Tribunal Federal (STF).' },
      { text: 'Ministério da Economia.' },
      { text: 'Controladoria-Geral da União (CGU).' },
      { text: 'Advocacia-Geral da União (AGU).' }
    ],
    explanation:
      'A) CORRETA — o controle externo cabe ao Congresso Nacional com auxílio do TCU (art. 71, CF). B) ERRADA — o STF exerce controle jurisdicional, não o de contas. C) ERRADA — o Ministério da Economia é órgão do Executivo. D) ERRADA — a CGU faz o controle INTERNO do Executivo. E) ERRADA — a AGU representa a União judicialmente.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Ordem econômica e financeira: princípios; atuação do Estado; Sistema Financeiro Nacional (art. 192)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Conforme o art. 170 da CF/1988, a ordem econômica funda-se:',
    options: [
      { text: 'na valorização do trabalho humano e na livre iniciativa.', correct: true },
      { text: 'exclusivamente no monopólio estatal.' },
      { text: 'na vedação total à propriedade privada.' },
      { text: 'na ausência de defesa do consumidor.' },
      { text: 'na proibição da livre concorrência.' }
    ],
    explanation:
      'A) CORRETA — o art. 170 assenta a ordem econômica na valorização do trabalho humano e na livre iniciativa, observados princípios como função social da propriedade e defesa do consumidor. B) ERRADA — o Estado atua de forma subsidiária, não por monopólio geral. C) ERRADA — a propriedade privada é princípio (com função social). D) ERRADA — a defesa do consumidor é princípio expresso. E) ERRADA — a livre concorrência é princípio, não proibição.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Organização do Estado: organização político-administrativa; competências dos entes', type: 'ME', difficulty: 'MEDIO',
    statement: 'A organização político-administrativa da República Federativa do Brasil compreende:',
    options: [
      { text: 'a União, os Estados, o Distrito Federal e os Municípios, todos autônomos.', correct: true },
      { text: 'apenas a União e os Estados.' },
      { text: 'somente a União, que é centralizada.' },
      { text: 'os Territórios como entes federados autônomos.' },
      { text: 'apenas Estados e Municípios.' }
    ],
    explanation:
      'A) CORRETA — o art. 18 estabelece União, Estados, DF e Municípios, todos autônomos. B)/E) ERRADAS — omitem entes que integram a federação. C) ERRADA — o Brasil é federação, não Estado unitário centralizado. D) ERRADA — os Territórios integram a União e não são entes federados autônomos.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Regime jurídico-administrativo: princípios expressos e implícitos da Administração Pública', type: 'ME', difficulty: 'FACIL',
    statement: 'O princípio da publicidade, no âmbito da Administração Pública, tem como uma de suas funções:',
    options: [
      { text: 'conferir transparência e permitir o controle dos atos administrativos.', correct: true },
      { text: 'ocultar informações do cidadão.' },
      { text: 'garantir vantagens pessoais ao administrador.' },
      { text: 'dispensar a motivação dos atos.' },
      { text: 'permitir nepotismo.' }
    ],
    explanation:
      'A) CORRETA — a publicidade dá transparência e viabiliza o controle social e institucional. B) ERRADA — o princípio é de divulgação, não de ocultação. C) ERRADA — a impessoalidade veda vantagens pessoais. D) ERRADA — publicidade não dispensa motivação. E) ERRADA — nepotismo viola moralidade e impessoalidade.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação', type: 'ME', difficulty: 'MEDIO',
    statement: 'O atributo do ato administrativo que permite sua execução independentemente de autorização judicial prévia é a:',
    options: [
      { text: 'autoexecutoriedade.', correct: true },
      { text: 'presunção de legitimidade.' },
      { text: 'imperatividade.' },
      { text: 'tipicidade.' },
      { text: 'discricionariedade.' }
    ],
    explanation:
      'A) CORRETA — a autoexecutoriedade permite à Administração executar o ato por meios próprios, sem prévia autorização judicial. B) ERRADA — a presunção de legitimidade faz o ato ser tido como válido até prova em contrário. C) ERRADA — a imperatividade impõe obrigações a terceiros. D) ERRADA — a tipicidade exige correspondência a figura prevista em lei. E) ERRADA — a discricionariedade é margem de juízo, não atributo de execução.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A Lei nº 13.303/2016 exige, para as empresas estatais, práticas de governança que incluem:',
    options: [
      { text: 'a dispensa de qualquer transparência.' },
      { text: 'comitê de auditoria estatutário, regras de transparência e políticas de gestão de riscos e conformidade.', correct: true },
      { text: 'a proibição de conselho de administração.' },
      { text: 'a ausência de código de conduta.' },
      { text: 'a contratação sem qualquer licitação em todos os casos.' }
    ],
    explanation:
      'A) ERRADA — a lei reforça a transparência. B) CORRETA — a Lei das Estatais impõe governança: comitê de auditoria, transparência, gestão de riscos, compliance e código de conduta. C) ERRADA — o conselho de administração é obrigatório. D) ERRADA — exige-se código de conduta. E) ERRADA — a lei estabelece regime próprio de licitações/contratações, não a dispensa geral.',
    source: S
  },
  {
    disciplineSlug: DIR, topic: 'CF/1988: princípios fundamentais; direitos e garantias fundamentais (individuais, sociais e políticos)', type: 'ME', difficulty: 'MEDIO',
    statement: 'São exemplos de direitos SOCIAIS previstos no art. 6º da CF/1988:',
    options: [
      { text: 'educação, saúde, trabalho, moradia e segurança.', correct: true },
      { text: 'apenas o direito de propriedade.' },
      { text: 'somente a liberdade de locomoção.' },
      { text: 'o direito ao voto secreto exclusivamente.' },
      { text: 'apenas o sigilo de correspondência.' }
    ],
    explanation:
      'A) CORRETA — o art. 6º lista direitos sociais: educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência etc. B) ERRADA — propriedade é direito individual (art. 5º). C) ERRADA — locomoção é direito individual. D) ERRADA — o voto é direito político. E) ERRADA — sigilo de correspondência é direito individual.',
    source: S
  },

  // ════════════════════ Ética, Governança e Compliance (+15) ════════════════════
  {
    disciplineSlug: ETICA, topic: 'Ética pública e privada: ética, moral e valores; código de conduta; conflito de interesses', type: 'ME', difficulty: 'FACIL',
    statement: 'A distinção clássica entre ética e moral costuma ser apresentada da seguinte forma:',
    options: [
      { text: 'a moral refere-se aos costumes e valores de um grupo; a ética é a reflexão crítica sobre esses valores.', correct: true },
      { text: 'ética e moral são conceitos idênticos e intercambiáveis em qualquer contexto.' },
      { text: 'a ética é imposta por lei e a moral é proibida.' },
      { text: 'a moral só existe em empresas privadas.' },
      { text: 'a ética não admite reflexão.' }
    ],
    explanation:
      'A) CORRETA — a moral são os costumes/valores vigentes; a ética é a reflexão filosófica sobre o agir e esses valores. B) ERRADA — há distinção conceitual entre ambas. C) ERRADA — nem a ética se resume à lei, nem a moral é proibida. D) ERRADA — a moral permeia toda a sociedade. E) ERRADA — a ética é justamente reflexiva.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Ética pública e privada: ética, moral e valores; código de conduta; conflito de interesses', type: 'ME', difficulty: 'MEDIO',
    statement: 'Ocorre "conflito de interesses" quando:',
    options: [
      { text: 'o interesse privado do agente pode influenciar indevidamente o desempenho de suas funções públicas.', correct: true },
      { text: 'dois cidadãos discordam sobre um assunto qualquer.' },
      { text: 'o servidor cumpre estritamente a lei.' },
      { text: 'a Administração publica seus atos.' },
      { text: 'há divergência técnica entre setores.' }
    ],
    explanation:
      'A) CORRETA — o conflito de interesses surge quando interesses privados interferem (ou podem interferir) na atuação pública. B) ERRADA — mera discordância entre cidadãos não é conflito de interesses no sentido técnico. C) ERRADA — cumprir a lei é o esperado, não conflito. D) ERRADA — publicar atos é transparência. E) ERRADA — divergência técnica não configura, por si, conflito de interesses.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Governança corporativa: princípios e boas práticas (IBGC); estruturas de governança; Lei nº 13.303/2016', type: 'ME', difficulty: 'MEDIO',
    statement: 'Segundo o IBGC, são princípios básicos da governança corporativa:',
    options: [
      { text: 'transparência, equidade, prestação de contas (accountability) e responsabilidade corporativa.', correct: true },
      { text: 'sigilo, favorecimento, informalidade e centralização.' },
      { text: 'nepotismo, opacidade e discricionariedade absoluta.' },
      { text: 'lucro a qualquer custo e ausência de controles.' },
      { text: 'concentração de poder e falta de prestação de contas.' }
    ],
    explanation:
      'A) CORRETA — os quatro princípios do IBGC são transparência, equidade, accountability e responsabilidade corporativa. B)/C)/D)/E) ERRADAS — descrevem exatamente o oposto das boas práticas de governança.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Compliance: pilares do programa de integridade; tone at the top; canal de denúncias; due diligence', type: 'ME', difficulty: 'MEDIO',
    statement: 'A expressão "tone at the top", em programas de integridade, refere-se a:',
    options: [
      { text: 'o comprometimento e o exemplo ético da alta administração.', correct: true },
      { text: 'o volume máximo permitido nas reuniões.' },
      { text: 'o organograma da área de TI.' },
      { text: 'a política de remuneração dos estagiários.' },
      { text: 'o tom de voz do porta-voz da empresa.' }
    ],
    explanation:
      'A) CORRETA — "tone at the top" é o comprometimento visível da liderança com a integridade, que dá o exemplo à organização. B)/C)/D)/E) ERRADAS — interpretam a expressão de forma literal/equivocada, sem relação com compliance.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Compliance: pilares do programa de integridade; tone at the top; canal de denúncias; due diligence', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A "due diligence", no contexto de integridade, consiste em:',
    options: [
      { text: 'processo de verificação e avaliação de riscos de terceiros (fornecedores, parceiros) antes de contratar.', correct: true },
      { text: 'dispensar qualquer análise de fornecedores.' },
      { text: 'pagar propinas de forma diligente.' },
      { text: 'eliminar o canal de denúncias.' },
      { text: 'auditar apenas após um escândalo.' }
    ],
    explanation:
      'A) CORRETA — a due diligence avalia previamente a idoneidade e os riscos de parceiros/fornecedores. B) ERRADA — é justamente a análise cuidadosa. C) ERRADA — contraria a integridade. D) ERRADA — o canal de denúncias é pilar do programa. E) ERRADA — a avaliação deve ser preventiva, não apenas reativa.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa', type: 'ME', difficulty: 'MEDIO',
    statement: 'O Framework COSO é referência internacional para:',
    options: [
      { text: 'controles internos e gestão de riscos corporativos.', correct: true },
      { text: 'desenvolvimento de jogos eletrônicos.' },
      { text: 'padronização de cabeamento de rede.' },
      { text: 'gestão de estoques de supermercado.' },
      { text: 'normas de segurança do trabalho.' }
    ],
    explanation:
      'A) CORRETA — o COSO (e o COSO ERM) é referência para controles internos e gestão de riscos. B)/C)/D)/E) ERRADAS — não correspondem ao escopo do COSO.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'PLD/FT: Lei nº 9.613/1998; GAFI/FATF; COAF; KYC/KYO; PEP; listas restritivas (OFAC, ONU, UE)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A sigla "KYC" (Know Your Customer), no âmbito da prevenção à lavagem de dinheiro, refere-se a:',
    options: [
      { text: 'conhecer e identificar adequadamente o cliente, avaliando riscos.', correct: true },
      { text: 'ocultar a identidade do cliente.' },
      { text: 'um tipo de criptomoeda.' },
      { text: 'a taxa de câmbio oficial.' },
      { text: 'um protocolo de rede.' }
    ],
    explanation:
      'A) CORRETA — o KYC exige identificar e conhecer o cliente para avaliar riscos de lavagem/financiamento ao terrorismo. B) ERRADA — o objetivo é justamente conhecer, não ocultar. C)/D)/E) ERRADAS — não têm relação com o conceito.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'PLD/FT: Lei nº 9.613/1998; GAFI/FATF; COAF; KYC/KYO; PEP; listas restritivas (OFAC, ONU, UE)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No Brasil, o órgão responsável por receber e analisar comunicações de operações suspeitas de lavagem de dinheiro (unidade de inteligência financeira) é o:',
    options: [
      { text: 'COAF (Conselho de Controle de Atividades Financeiras).', correct: true },
      { text: 'CVM.' },
      { text: 'TCU.' },
      { text: 'IBGC.' },
      { text: 'CADE.' }
    ],
    explanation:
      'A) CORRETA — o COAF é a unidade de inteligência financeira que recebe e analisa comunicações de operações suspeitas (PLD/FT). B) ERRADA — a CVM regula o mercado de valores mobiliários. C) ERRADA — o TCU faz controle externo de contas. D) ERRADA — o IBGC é referência de governança. E) ERRADA — o CADE zela pela concorrência.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'PLD/FT: Lei nº 9.613/1998; GAFI/FATF; COAF; KYC/KYO; PEP; listas restritivas (OFAC, ONU, UE)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A sigla PEP, relevante na prevenção à lavagem de dinheiro, designa:',
    options: [
      { text: 'Pessoa Exposta Politicamente, que demanda diligência reforçada.', correct: true },
      { text: 'Programa de Educação Profissional.' },
      { text: 'Plano de Emergência Patrimonial.' },
      { text: 'Protocolo Eletrônico de Pagamento.' },
      { text: 'Pessoa Estrangeira Permanente.' }
    ],
    explanation:
      'A) CORRETA — PEP é Pessoa Exposta Politicamente, sujeita a monitoramento e diligência reforçados por maior risco. B)/C)/D)/E) ERRADAS — expansões incorretas da sigla no contexto de PLD/FT.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Auditoria interna: planejamento baseado em riscos; evidências e achados; relatórios e monitoramento', type: 'ME', difficulty: 'MEDIO',
    statement: 'A auditoria interna, para preservar sua eficácia, deve pautar-se pela:',
    options: [
      { text: 'independência e objetividade em relação às áreas auditadas.', correct: true },
      { text: 'subordinação operacional às áreas que audita.' },
      { text: 'ausência de evidências em seus relatórios.' },
      { text: 'aprovação prévia dos auditados sobre os achados.' },
      { text: 'confidencialidade que impeça qualquer relatório.' }
    ],
    explanation:
      'A) CORRETA — independência e objetividade são essenciais à credibilidade da auditoria interna. B) ERRADA — subordinar-se às áreas auditadas comprometeria a independência. C) ERRADA — os achados devem ser baseados em evidências. D) ERRADA — os auditados não aprovam os achados. E) ERRADA — a auditoria produz relatórios; a confidencialidade não os impede.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Transparência e prestação de contas: LAI; transparência ativa e passiva; dados abertos', type: 'ME', difficulty: 'FACIL',
    statement: 'A diferença entre transparência ativa e passiva é que:',
    options: [
      { text: 'a ativa é a divulgação espontânea de informações; a passiva ocorre mediante solicitação do interessado.', correct: true },
      { text: 'a ativa depende de pedido; a passiva é espontânea.' },
      { text: 'ambas exigem sempre decisão judicial.' },
      { text: 'a passiva é proibida por lei.' },
      { text: 'a ativa só vale para dados sigilosos.' }
    ],
    explanation:
      'A) CORRETA — na transparência ATIVA o órgão divulga por iniciativa própria; na PASSIVA responde a pedidos. B) ERRADA — está invertido. C) ERRADA — não exigem decisão judicial. D) ERRADA — a transparência passiva é prevista e legítima. E) ERRADA — a transparência recai sobre informações públicas, não sobre sigilosas.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Governança corporativa: princípios e boas práticas (IBGC); estruturas de governança; Lei nº 13.303/2016', type: 'ME', difficulty: 'MEDIO',
    statement: 'No sistema de governança corporativa, o órgão colegiado responsável por definir a estratégia e supervisionar a diretoria executiva é o:',
    options: [
      { text: 'conselho de administração.', correct: true },
      { text: 'setor de recepção.' },
      { text: 'departamento de marketing.' },
      { text: 'assembleia de fornecedores.' },
      { text: 'ouvidoria externa.' }
    ],
    explanation:
      'A) CORRETA — o conselho de administração orienta a estratégia e supervisiona a diretoria (gestão executiva). B)/C)/D) ERRADAS — não têm essa função de governança estratégica. E) ERRADA — a ouvidoria recebe manifestações, mas não define estratégia nem supervisiona a diretoria.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Anticorrupção: Lei nº 12.846/2013 e Decreto nº 11.129/2022; leniência; OCDE, FCPA e UK Bribery Act', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O acordo de leniência, previsto na Lei Anticorrupção, permite que a pessoa jurídica:',
    options: [
      { text: 'colabore efetivamente com as investigações em troca de atenuação das sanções.', correct: true },
      { text: 'fique isenta de qualquer investigação sem colaborar.' },
      { text: 'transfira sua responsabilidade a um concorrente.' },
      { text: 'legalize a prática de corrupção.' },
      { text: 'obtenha vantagem financeira do poder público.' }
    ],
    explanation:
      'A) CORRETA — a leniência recompensa a colaboração efetiva (identificar envolvidos, obter provas) com redução de sanções. B) ERRADA — a isenção depende de colaboração efetiva e requisitos legais. C) ERRADA — não há transferência de responsabilidade a terceiros. D) ERRADA — não legaliza corrupção. E) ERRADA — não é mecanismo de obtenção de vantagem financeira.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na matriz de riscos, o tratamento que consiste em contratar um seguro para reduzir o impacto financeiro de um evento adverso é uma forma de:',
    options: [
      { text: 'transferência (ou compartilhamento) do risco.', correct: true },
      { text: 'aceitação do risco.' },
      { text: 'eliminação do risco.' },
      { text: 'ignorar o risco.' },
      { text: 'criação do risco.' }
    ],
    explanation:
      'A) CORRETA — contratar seguro transfere/compartilha o impacto do risco a um terceiro (seguradora). B) ERRADA — aceitar é conviver com o risco sem ação adicional. C) ERRADA — eliminar (evitar) é deixar de realizar a atividade que gera o risco. D) ERRADA — ignorar não é estratégia formal de tratamento. E) ERRADA — o objetivo é tratar, não criar risco.',
    source: S
  },
  {
    disciplineSlug: ETICA, topic: 'Ética pública e privada: ética, moral e valores; código de conduta; conflito de interesses', type: 'ME', difficulty: 'FACIL',
    statement: 'Um código de conduta/ética em uma organização tem por finalidade principal:',
    options: [
      { text: 'orientar o comportamento esperado dos colaboradores e reforçar valores institucionais.', correct: true },
      { text: 'substituir integralmente a legislação penal.' },
      { text: 'garantir aumento salarial automático.' },
      { text: 'definir a arquitetura de rede.' },
      { text: 'listar os feriados do ano.' }
    ],
    explanation:
      'A) CORRETA — o código de conduta orienta comportamentos, prevê deveres e reforça a cultura ética. B) ERRADA — não substitui a lei penal. C)/D)/E) ERRADAS — não são finalidades de um código de conduta.',
    source: S
  }
]
