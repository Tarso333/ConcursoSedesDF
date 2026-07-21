// M28 — Banco EXTENSO de questões IBFC do IBGE: COMPARTILHADO (Língua
// Portuguesa + Raciocínio Lógico Quantitativo). Como os slugs
// 'lingua-portuguesa'/'raciocinio-logico' são compartilhados por ACS e ACA,
// estas questões contam para os DOIS cargos. APENAS DADOS; idempotente por
// seed_key (enunciado). Comentário alternativa a alternativa; dificuldade ~35/45/20.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo IBFC)'
const LP = 'lingua-portuguesa'
const RL = 'raciocinio-logico'

export const IBGE_BANK_SHARED_QUESTIONS: SeedQuestion[] = [
  // ───────────── Língua Portuguesa ─────────────
  {
    disciplineSlug: LP, topic: 'Compreensão e interpretação de texto', type: 'ME', difficulty: 'FACIL',
    statement: 'A ideia central de um texto, aquela em torno da qual as demais informações se organizam, é denominada:',
    options: [
      { text: 'argumento secundário.' },
      { text: 'tese ou ideia principal.', correct: true },
      { text: 'digressão.' },
      { text: 'paráfrase.' },
      { text: 'exemplificação.' }
    ],
    explanation:
      'A) ERRADA — argumentos secundários apenas sustentam a ideia principal, não a substituem. B) CORRETA — a tese/ideia principal é o núcleo em torno do qual o texto se organiza. C) ERRADA — digressão é um desvio momentâneo do assunto. D) ERRADA — paráfrase é a reescrita com as mesmas ideias em outras palavras. E) ERRADA — a exemplificação ilustra, mas não é o eixo do texto.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Compreensão e interpretação de texto', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma alternativa que apresenta informação NÃO sustentada pelo texto, indo além do que ele afirma, comete o vício de interpretação chamado:',
    options: [
      { text: 'inferência válida.' },
      { text: 'extrapolação.', correct: true },
      { text: 'síntese.' },
      { text: 'contextualização.' },
      { text: 'coesão.' }
    ],
    explanation:
      'A) ERRADA — inferência válida é permitida (decorre logicamente do texto). B) CORRETA — extrapolar é acrescentar o que o texto não autoriza; é erro clássico de prova. C) ERRADA — síntese resume fielmente. D) ERRADA — contextualização situa o texto, não o distorce. E) ERRADA — coesão é a amarração formal, não um vício de interpretação.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Sinônimos e antônimos', type: 'ME', difficulty: 'FACIL',
    statement: 'Assinale a alternativa em que as duas palavras são ANTÔNIMAS.',
    options: [
      { text: 'árduo / difícil.' },
      { text: 'lícito / ilícito.', correct: true },
      { text: 'belo / bonito.' },
      { text: 'casa / lar.' },
      { text: 'célere / rápido.' }
    ],
    explanation:
      'A) ERRADA — árduo e difícil são sinônimos. B) CORRETA — lícito (permitido) e ilícito (proibido) são antônimos (antonímia por prefixo "i-"). C) ERRADA — belo e bonito são sinônimos. D) ERRADA — casa e lar são sinônimos. E) ERRADA — célere e rápido são sinônimos.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Homônimos e parônimos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na frase "O servidor deve ____ os dados no sistema", e considerando o sentido de "inserir/introduzir", a forma correta é:',
    options: [
      { text: 'infrigir.' },
      { text: 'inferir.' },
      { text: 'imergir.' },
      { text: 'inserir.', correct: true },
      { text: 'imigrar.' }
    ],
    explanation:
      'A) ERRADA — "infringir" (com "n") significa violar/descumprir, não inserir. B) ERRADA — inferir é deduzir. C) ERRADA — imergir é mergulhar. D) CORRETA — inserir = introduzir/incluir os dados. E) ERRADA — imigrar é entrar em outro país. São parônimos que a banca costuma confundir.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Pontuação; estrutura e sequência lógica de frases e parágrafos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que o uso da vírgula é OBRIGATÓRIO.',
    options: [
      { text: 'O agente entregou o relatório ao supervisor.' },
      { text: 'Brasília capital federal sediará o evento.', correct: true },
      { text: 'Todos concluíram a coleta no prazo.' },
      { text: 'O sistema registrou as informações corretamente.' },
      { text: 'A equipe trabalhou durante todo o dia.' }
    ],
    explanation:
      'A) ERRADA — ordem direta (sujeito-verbo-objeto), sem termo a isolar. B) CORRETA — "capital federal" é aposto explicativo de "Brasília" e deve vir entre vírgulas: "Brasília, capital federal, sediará...". C)/D)/E) ERRADAS — orações em ordem direta, sem aposto, vocativo ou adjunto deslocado que exija vírgula.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Ortografia oficial; acentuação gráfica', type: 'ME', difficulty: 'FACIL',
    statement: 'Assinale a alternativa em que TODAS as palavras estão grafadas corretamente segundo a ortografia oficial.',
    options: [
      { text: 'excessão, previlégio, beneficiente.' },
      { text: 'exceção, privilégio, beneficente.', correct: true },
      { text: 'esceção, privilégio, beneficente.' },
      { text: 'exceção, previlégio, beneficiente.' },
      { text: 'excessão, privilégio, beneficente.' }
    ],
    explanation:
      'A) ERRADA — o correto é "exceção" (não "excessão"), "privilégio" (não "previlégio") e "beneficente" (não "beneficiente"). B) CORRETA — todas grafadas corretamente. C) ERRADA — "esceção" está errado. D) ERRADA — "previlégio" e "beneficiente" estão errados. E) ERRADA — "excessão" está errado.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Ortografia oficial; acentuação gráfica', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a palavra é acentuada pela MESMA regra de "análise".',
    options: [
      { text: 'café.' },
      { text: 'saída.' },
      { text: 'lâmpada.', correct: true },
      { text: 'também.' },
      { text: 'herói.' }
    ],
    explanation:
      '"Análise" é PROPAROXÍTONA (todas acentuadas). A) ERRADA — "café" é oxítona. B) ERRADA — "saída" é acentuada por hiato. C) CORRETA — "lâmpada" também é proparoxítona. D) ERRADA — "também" é oxítona terminada em -em. E) ERRADA — "herói" é oxítona com ditongo aberto.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Classes das palavras', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na frase "Os agentes trabalharam bastante durante o recenseamento", a palavra "bastante" classifica-se como:',
    options: [
      { text: 'adjetivo, pois caracteriza os agentes.' },
      { text: 'advérbio de intensidade, pois modifica o verbo.', correct: true },
      { text: 'substantivo.' },
      { text: 'numeral.' },
      { text: 'preposição.' }
    ],
    explanation:
      'A) ERRADA — não caracteriza um substantivo; se fosse adjetivo (equivalendo a "muitos"), concordaria: "bastantes agentes". B) CORRETA — aqui "bastante" modifica o verbo "trabalharam" (intensidade), logo é advérbio e fica invariável. C)/D)/E) ERRADAS — não nomeia, não quantifica em série nem liga termos.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Concordância nominal e verbal', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa correta quanto à concordância.',
    options: [
      { text: 'Fazem cinco anos que ingressei no serviço.' },
      { text: 'Devem haver muitas pendências.' },
      { text: 'É necessário paciência no atendimento.', correct: true },
      { text: 'Anexo, seguem as planilhas.' },
      { text: 'Bastante pessoas compareceram.' }
    ],
    explanation:
      'A) ERRADA — "fazer" indicando tempo é impessoal: "Faz cinco anos". B) ERRADA — "haver" (existir) é impessoal e transmite a impessoalidade ao auxiliar: "Deve haver". C) CORRETA — "é necessário" fica invariável quando o sujeito não tem determinante ("paciência", sem artigo). D) ERRADA — "anexo" varia: "Anexas, seguem as planilhas". E) ERRADA — como pronome indefinido antes de substantivo, "bastante" varia: "Bastantes pessoas".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Concordância nominal e verbal', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão.',
    options: [
      { text: 'Aluga-se salas para a coordenação.' },
      { text: 'Vendem-se equipamentos usados.', correct: true },
      { text: 'Precisam-se de recenseadores.' },
      { text: 'Trata-se de questões complexas... tratam-se.' },
      { text: 'Fazem dois meses que começou a coleta.' }
    ],
    explanation:
      'A) ERRADA — passiva sintética concorda com o sujeito: "Alugam-se salas". B) CORRETA — "equipamentos são vendidos" → passiva sintética, verbo no plural. C) ERRADA — com preposição ("de"), é índice de indeterminação do sujeito: "Precisa-se de recenseadores" (singular). D) ERRADA — "tratar-se de" fica invariável no singular: "Trata-se de questões complexas". E) ERRADA — "fazer" (tempo) é impessoal: "Faz dois meses".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Regência nominal e verbal', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a regência verbal está correta.',
    options: [
      { text: 'Assisti o jogo na televisão.' },
      { text: 'O candidato aspira o cargo público.' },
      { text: 'Prefiro trabalhar em campo do que no escritório.' },
      { text: 'Cheguei ao local da coleta cedo.', correct: true },
      { text: 'Obedeço meus superiores.' }
    ],
    explanation:
      'A) ERRADA — "assistir" (ver) é VTI: "Assisti AO jogo". B) ERRADA — "aspirar" (desejar) é VTI: "aspira AO cargo". C) ERRADA — "preferir" não admite "do que": "Prefiro trabalhar em campo A trabalhar no escritório". D) CORRETA — "chegar" pede preposição "a": "Cheguei AO local". E) ERRADA — "obedecer" é VTI: "Obedeço AOS meus superiores".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Regência nominal e verbal', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Assinale a alternativa em que o acento grave (crase) foi empregado corretamente.',
    options: [
      { text: 'Refiro-me à Vossa Senhoria.' },
      { text: 'O relatório foi entregue à mão.', correct: true },
      { text: 'Começou a trabalhar às pressas... à trabalhar.' },
      { text: 'Dirigiu-se à esta repartição.' },
      { text: 'Ficou frente à frente com o informante.' }
    ],
    explanation:
      'A) ERRADA — não há crase antes de pronome de tratamento: "Refiro-me a Vossa Senhoria". B) CORRETA — "à mão" é locução adverbial feminina, com crase. C) ERRADA — não há crase antes de verbo ("a trabalhar"). D) ERRADA — não há crase antes de pronome demonstrativo "esta". E) ERRADA — em "frente a frente" (palavras repetidas) não há crase.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Transpondo para a voz passiva a oração "O recenseador coletou os dados", obtém-se:',
    options: [
      { text: 'Os dados coletaram-se pelo recenseador.' },
      { text: 'Os dados foram coletados pelo recenseador.', correct: true },
      { text: 'O recenseador foi coletado pelos dados.' },
      { text: 'Coletaram-se o recenseador.' },
      { text: 'Os dados coletava o recenseador.' }
    ],
    explanation:
      'A) ERRADA — construção agramatical/sem sentido. B) CORRETA — voz passiva analítica: objeto direto ("os dados") vira sujeito + verbo "ser" + particípio + agente da passiva. C) ERRADA — inverte os papéis (o recenseador não foi coletado). D) ERRADA — concordância e sentido incorretos. E) ERRADA — não é forma passiva.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Emprego dos pronomes', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que o pronome foi empregado de acordo com a norma-padrão.',
    options: [
      { text: 'Entre eu e você não há divergência.' },
      { text: 'Este assunto é para mim resolver.' },
      { text: 'Chamaram-no para supervisionar a equipe.', correct: true },
      { text: 'Vou levar os documentos consigo.' },
      { text: 'Aluga-se apartamentos para os agentes.' }
    ],
    explanation:
      'A) ERRADA — depois de preposição usa-se pronome oblíquo tônico: "Entre mim e você". B) ERRADA — antes de verbo (sujeito de infinitivo) usa-se o reto: "para eu resolver". C) CORRETA — "no" (= o) é objeto direto do verbo "chamar"; uso correto. D) ERRADA — "consigo" é reflexivo (refere-se ao próprio sujeito); aqui cabe "comigo/com você". E) ERRADA — erro de concordância (passiva sintética): "Alugam-se apartamentos".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Sintaxe: termos essenciais, integrantes e acessórios da oração', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na oração "Precisa-se de agentes experientes", o sujeito é classificado como:',
    options: [
      { text: 'simples.' },
      { text: 'composto.' },
      { text: 'indeterminado.', correct: true },
      { text: 'oculto.' },
      { text: 'oração sem sujeito.' }
    ],
    explanation:
      'A) ERRADA — não há um núcleo determinado. B) ERRADA — não há dois ou mais núcleos. C) CORRETA — verbo transitivo indireto + partícula "se" = índice de indeterminação do sujeito (não se sabe quem precisa). D) ERRADA — sujeito oculto é recuperável pela desinência, o que não ocorre aqui. E) ERRADA — há predicado e o "se" indetermina o sujeito, mas a oração TEM sujeito (indeterminado).',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Coesão e coerência', type: 'ME', difficulty: 'MEDIO',
    statement: 'No trecho "A meta era ambiciosa; ____, a equipe a alcançou", o conector que estabelece a relação lógica adequada (oposição/concessão ao resultado) é:',
    options: [
      { text: 'portanto.' },
      { text: 'porque.' },
      { text: 'no entanto.', correct: true },
      { text: 'assim.' },
      { text: 'logo.' }
    ],
    explanation:
      'A)/D)/E) ERRADAS — "portanto", "assim" e "logo" indicam conclusão, contrariando a quebra de expectativa. B) ERRADA — "porque" indica causa. C) CORRETA — "no entanto" é adversativo: contrapõe a dificuldade (meta ambiciosa) ao resultado positivo (foi alcançada).',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)', type: 'ME', difficulty: 'FACIL',
    statement: 'De acordo com o Manual de Redação Oficial, é atributo essencial da comunicação oficial:',
    options: [
      { text: 'a linguagem rebuscada e regionalista.' },
      { text: 'a impessoalidade e a clareza.', correct: true },
      { text: 'o uso de gírias para aproximação.' },
      { text: 'a ambiguidade proposital.' },
      { text: 'a informalidade no tratamento.' }
    ],
    explanation:
      'A) ERRADA — a redação oficial usa o padrão culto, sem rebuscamento nem regionalismos. B) CORRETA — impessoalidade, clareza, concisão e formalidade são atributos centrais. C) ERRADA — gírias são incompatíveis com o padrão formal. D) ERRADA — a clareza exige justamente evitar ambiguidade. E) ERRADA — o tratamento é formal (padrão ofício).',
    source: S
  },
  // ───────────── Raciocínio Lógico Quantitativo ─────────────
  {
    disciplineSlug: RL, topic: 'Estruturas lógicas', type: 'ME', difficulty: 'FACIL',
    statement: 'A proposição composta "p ∧ q" (p e q) é VERDADEIRA somente quando:',
    options: [
      { text: 'ao menos uma das proposições é verdadeira.' },
      { text: 'ambas as proposições são verdadeiras.', correct: true },
      { text: 'ambas são falsas.' },
      { text: 'p é verdadeira e q é falsa.' },
      { text: 'as proposições têm valores diferentes.' }
    ],
    explanation:
      'A) ERRADA — "ao menos uma verdadeira" é condição da DISJUNÇÃO (ou). B) CORRETA — a conjunção (e) só é verdadeira quando as DUAS são verdadeiras. C) ERRADA — se ambas são falsas, a conjunção é falsa. D) ERRADA — basta uma falsa para a conjunção ser falsa. E) ERRADA — valores diferentes tornam a conjunção falsa.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Estruturas lógicas', type: 'ME', difficulty: 'MEDIO',
    statement: 'A negação da proposição "Todos os agentes concluíram a coleta e transmitiram os dados" é:',
    options: [
      { text: 'Nenhum agente concluiu a coleta nem transmitiu os dados.' },
      { text: 'Algum agente não concluiu a coleta ou não transmitiu os dados.', correct: true },
      { text: 'Todos os agentes não concluíram a coleta e não transmitiram.' },
      { text: 'Algum agente concluiu a coleta e transmitiu os dados.' },
      { text: 'Todos concluíram a coleta, mas não transmitiram.' }
    ],
    explanation:
      'A negação de "todos... p e q" combina De Morgan com a negação do "todo". A)/C) ERRADAS — negam demais (usam "nenhum"/"todos não"). B) CORRETA — ~(∀x (p∧q)) = ∃x (~p ∨ ~q): "algum agente não concluiu OU não transmitiu". D) ERRADA — reafirma parte do original. E) ERRADA — é um caso particular, não a negação geral.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Diagramas lógicos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sabendo que "Nenhum supervisor é recenseador" e que "Alguns servidores são supervisores", conclui-se necessariamente que:',
    options: [
      { text: 'Todos os servidores são supervisores.' },
      { text: 'Alguns servidores não são recenseadores.', correct: true },
      { text: 'Nenhum servidor é recenseador.' },
      { text: 'Todo recenseador é servidor.' },
      { text: 'Alguns supervisores são recenseadores.' }
    ],
    explanation:
      'A) ERRADA — "alguns servidores são supervisores" não implica "todos". B) CORRETA — os servidores que são supervisores não podem ser recenseadores (pois nenhum supervisor é recenseador); logo, alguns servidores não são recenseadores. C) ERRADA — nada se afirma sobre os demais servidores. D) ERRADA — não há premissa que ligue recenseador a servidor. E) ERRADA — contradiz a 1ª premissa.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Lógica de argumentação', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Considere: "Se o questionário está completo, então a transmissão é liberada" e "A transmissão não foi liberada". Conclui-se validamente que:',
    options: [
      { text: 'o questionário está completo.' },
      { text: 'o questionário não está completo.', correct: true },
      { text: 'a transmissão foi liberada.' },
      { text: 'nada se pode concluir.' },
      { text: 'o questionário pode estar completo.' }
    ],
    explanation:
      'Trata-se de MODUS TOLLENS (p→q; ~q ∴ ~p). A) ERRADA — contraria a conclusão válida. B) CORRETA — negado o consequente (transmissão liberada), nega-se o antecedente (questionário completo). C) ERRADA — contradiz a 2ª premissa. D) ERRADA — a conclusão é necessária. E) ERRADA — a conclusão é determinada, não meramente possível.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Aritmética', type: 'ME', difficulty: 'FACIL',
    statement: 'Em um setor censitário há 240 domicílios. Se 25% já foram recenseados, quantos ainda faltam?',
    options: [
      { text: '60 domicílios.' },
      { text: '180 domicílios.', correct: true },
      { text: '120 domicílios.' },
      { text: '200 domicílios.' },
      { text: '160 domicílios.' }
    ],
    explanation:
      '25% de 240 = 60 já recenseados; faltam 240 − 60 = 180. A) ERRADA — 60 é o total JÁ recenseado, não o que falta. B) CORRETA — 180 faltam (75% de 240). C)/D)/E) ERRADAS — não correspondem a 75% de 240.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Aritmética', type: 'ME', difficulty: 'MEDIO',
    statement: 'Se 6 recenseadores coletam dados de 90 domicílios em 3 dias, quantos domicílios 10 recenseadores coletam em 5 dias, mantido o ritmo?',
    options: [
      { text: '150 domicílios.' },
      { text: '250 domicílios.', correct: true },
      { text: '300 domicílios.' },
      { text: '200 domicílios.' },
      { text: '180 domicílios.' }
    ],
    explanation:
      'Regra de três composta (direta com recenseadores e com dias). Produtividade por recenseador/dia = 90/(6·3) = 5 domicílios. Com 10 recenseadores × 5 dias × 5 = 250. A)/C)/D)/E) ERRADAS — não resultam de 10·5·5. B) CORRETA — 250 domicílios.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Álgebra e geometria básicas', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um estabelecimento agropecuário retangular mede 250 m de comprimento por 40 m de largura. Sua área, em hectares (1 ha = 10.000 m²), é:',
    options: [
      { text: '0,1 ha.' },
      { text: '1 ha.', correct: true },
      { text: '10 ha.' },
      { text: '100 ha.' },
      { text: '0,5 ha.' }
    ],
    explanation:
      'Área = 250 × 40 = 10.000 m². Convertendo: 10.000 ÷ 10.000 = 1 ha. A) ERRADA — seria 1.000 m². B) CORRETA — 1 hectare. C) ERRADA — 10 ha = 100.000 m². D) ERRADA — 100 ha = 1.000.000 m². E) ERRADA — 0,5 ha = 5.000 m².',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Áreas avaliadas', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Em um grupo de agentes, todos falam português; 8 falam também espanhol, 5 falam também inglês e 3 falam os dois idiomas estrangeiros. Quantos agentes falam ao menos um idioma estrangeiro?',
    options: [
      { text: '16 agentes.' },
      { text: '10 agentes.', correct: true },
      { text: '13 agentes.' },
      { text: '8 agentes.' },
      { text: '5 agentes.' }
    ],
    explanation:
      'Princípio da inclusão-exclusão: |E ∪ I| = 8 + 5 − 3 = 10. A) ERRADA — 16 soma tudo em dobro. B) CORRETA — 10 (subtrai a interseção contada duas vezes). C) ERRADA — 13 esquece de subtrair os 3 comuns. D) ERRADA — 8 é só espanhol. E) ERRADA — 5 é só inglês.',
    source: S
  }
]
