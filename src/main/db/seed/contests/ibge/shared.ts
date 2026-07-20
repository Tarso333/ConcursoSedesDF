// Conteúdo COMPARTILHADO entre os cargos do IBGE 2026 (ACS e ACA).
// Língua Portuguesa e Raciocínio Lógico Quantitativo têm conteúdo IDÊNTICO no
// Anexo IV para todos os cargos → autorados UMA vez e referenciados pelos dois
// contests (slugs 'lingua-portuguesa'/'raciocinio-logico' compartilhados;
// o seed é idempotente por tópico, então preenche o que faltar em cada cargo).
// APENAS DADOS — nenhuma exceção, nenhum if específico de cargo.
import type { SeedDiscipline } from '../../curriculum'
import type { SeedQuestion } from '../../questions'
import type { SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo IBFC)'

// ───────────────────────── DISCIPLINAS (LP + RLQ) ─────────────────────────
// Tópicos literais do Anexo IV (idênticos entre ACS/ACA/ACR/ACI/AOR).
export const IBGE_LP_DISCIPLINE: SeedDiscipline = {
  slug: 'lingua-portuguesa',
  name: 'Língua Portuguesa',
  block: 'GERAL',
  weight: 1,
  examQuestionEstimate: 15,
  color: '#3b82f6',
  topics: [
    'Compreensão e interpretação de texto',
    { name: 'Significação das palavras', children: ['Sinônimos e antônimos', 'Homônimos e parônimos'] },
    'Pontuação; estrutura e sequência lógica de frases e parágrafos',
    'Ortografia oficial; acentuação gráfica',
    'Classes das palavras',
    'Concordância nominal e verbal',
    'Regência nominal e verbal',
    'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos',
    'Emprego dos pronomes',
    'Sintaxe: termos essenciais, integrantes e acessórios da oração',
    { name: 'Coesão e coerência', children: ['Referenciação, substituição e repetição', 'Conectores', 'Tempos e modos verbais'] },
    'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)'
  ]
}

export const IBGE_RLQ_DISCIPLINE: SeedDiscipline = {
  slug: 'raciocinio-logico',
  name: 'Raciocínio Lógico Quantitativo',
  block: 'GERAL',
  weight: 1,
  examQuestionEstimate: 10,
  color: '#f59e0b',
  topics: [
    'Estrutura lógica de relações entre pessoas, lugares, coisas e/ou eventos; dedução de novas informações; avaliação de condições',
    {
      name: 'Áreas avaliadas',
      children: ['Estruturas lógicas', 'Lógica de argumentação', 'Diagramas lógicos', 'Aritmética', 'Álgebra e geometria básicas']
    }
  ]
}

// ───────────────────────── CONHECIMENTO (LP) ─────────────────────────
export const IBGE_SHARED_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Compreensão e interpretação de texto',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Compreensão × interpretação',
        body:
          '# Compreensão e interpretação\n\n' +
          '- **Compreensão**: extrair o que o texto DIZ explicitamente (informação literal).\n' +
          '- **Interpretação**: inferir o que o texto SUGERE (implícitos, intenção, conclusões).\n\n' +
          '## Implícitos\n' +
          '- **Pressuposto**: ideia assumida como verdadeira, marcada na linguagem ("Ainda estuda?" pressupõe que já estudava).\n' +
          '- **Subentendido**: insinuação que depende do contexto; não marcada.\n\n' +
          '## Dicas\n' +
          'Localizar a **ideia principal** (tese) e as secundárias; distinguir fato × opinião; atenção a "não", "exceto", "apenas" nos enunciados.'
      },
      { kind: 'PEGADINHA', body: '"Interpretar é repetir o que está escrito" — ERRADO: repetir/localizar é COMPREENSÃO; interpretar envolve inferência e implícitos.' },
      { kind: 'DICA', body: 'A IBFC troca "o texto afirma" por "o texto permite concluir". Se a alternativa extrapola o texto (informação não sustentada), está errada.' },
      { kind: 'PALAVRA_CHAVE', title: 'literal × inferência · pressuposto × subentendido' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Sinônimos, antônimos, homônimos e parônimos',
        body:
          '# Relações de sentido\n\n' +
          '| Relação | Definição | Exemplo |\n| --- | --- | --- |\n' +
          '| **Sinônimo** | sentido semelhante | casa / lar |\n' +
          '| **Antônimo** | sentido oposto | claro / escuro |\n' +
          '| **Homônimo** | igual no som/grafia, sentido diferente | manga (fruta/roupa); são/cem/sem |\n' +
          '| **Parônimo** | parecido (som/grafia), sentido diferente | ratificar/retificar; tráfego/tráfico |\n\n' +
          '- **Homônimos**: homófonos (mesmo som: cela/sela), homógrafos (mesma grafia: colher verbo/substantivo) e perfeitos (som e grafia: manga).\n' +
          '- **Denotação** (sentido literal) × **conotação** (figurado).\n' +
          '- **Polissemia**: uma palavra, vários sentidos relacionados (cabeça: parte do corpo / líder).'
      },
      { kind: 'PEGADINHA', body: '"Ratificar e retificar são sinônimos" — ERRADO: são PARÔNIMOS (ratificar = confirmar; retificar = corrigir).' },
      { kind: 'DICA', body: 'Homônimo = IGUAL (som ou grafia). Parônimo = PARECIDO. Emissão × imissão, descriminar × discriminar, ao encontro × de encontro caem sempre.' },
      { kind: 'PALAVRA_CHAVE', title: 'homônimo=igual · parônimo=parecido · denotação×conotação' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Pontuação; estrutura e sequência lógica de frases e parágrafos',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Pontuação — regras que caem',
        body:
          '# Pontuação\n\n' +
          '## Vírgula — proibições clássicas\n' +
          'NÃO se separa por vírgula: **sujeito do verbo**, **verbo do complemento** (objeto), nome do adjunto adnominal.\n' +
          '- ERRADO: "O supervisor, entregou o relatório." (sujeito × verbo).\n\n' +
          '## Vírgula — usos\n' +
          '- Isolar aposto, vocativo, adjunto adverbial deslocado, orações intercaladas.\n' +
          '- Separar elementos de uma enumeração.\n' +
          '- Antes de conjunções adversativas (mas, porém), conclusivas (portanto).\n\n' +
          '## Outros sinais\n' +
          'Ponto e vírgula (separa itens/orações longas); dois-pontos (enumeração, fala, explicação); travessão (fala/isolamento).'
      },
      { kind: 'PEGADINHA', body: '"Coloca-se vírgula entre o sujeito e o verbo para dar ênfase" — ERRADO: é PROIBIDO separar sujeito e verbo por vírgula.' },
      { kind: 'PALAVRA_CHAVE', title: 'não separa sujeito×verbo · vírgula no adjunto deslocado' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Ortografia oficial; acentuação gráfica',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Acentuação (Novo Acordo)',
        body:
          '# Acentuação gráfica\n\n' +
          '- **Oxítonas**: acentua terminadas em a(s), e(s), o(s), em, ens (cafés, também).\n' +
          '- **Paroxítonas**: acentua as que NÃO terminam em a, e, o, em (túnel, fácil, tórax).\n' +
          '- **Proparoxítonas**: TODAS acentuadas (médico, lâmpada).\n' +
          '- **Hiato**: i/u tônicos sozinhos ou com s (saída, baú) — mas NÃO após ditongo em paroxítona (feiura, sem acento).\n\n' +
          '## Novo Acordo Ortográfico\n' +
          '- Caiu o TREMA (só em nomes próprios estrangeiros).\n' +
          '- Caiu o acento de "ideia", "geleia" (ditongos abertos EI/OI em paroxítonas) e de "voo", "enjoo".\n' +
          '- Hífen: "autoescola", "antirreligioso" (dobra r/s), mas "anti-inflamatório" (vogais iguais).'
      },
      { kind: 'PEGADINHA', body: '"Ideia" leva acento" — ERRADO: pelo Novo Acordo, ditongo aberto EI/OI em PAROXÍTONA não é acentuado (ideia, jiboia). Já "herói" (oxítona) mantém.' },
      { kind: 'PALAVRA_CHAVE', title: 'proparoxítona sempre · caiu trema/ideia/voo' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Classes das palavras',
    entries: [
      {
        kind: 'RESUMO',
        title: 'As 10 classes gramaticais',
        body:
          '# Classes de palavras\n\n' +
          '**Variáveis** (flexionam): substantivo, artigo, adjetivo, numeral, pronome, verbo.\n' +
          '**Invariáveis**: advérbio, preposição, conjunção, interjeição.\n\n' +
          '- **Adjetivo** caracteriza o substantivo; **advérbio** modifica verbo/adjetivo/outro advérbio.\n' +
          '- **Conjunção** liga orações (coordenativas × subordinativas); **preposição** liga termos.\n' +
          '- Uma mesma palavra muda de classe conforme o contexto ("o **jantar**" substantivo × "vou **jantar**" verbo).'
      },
      { kind: 'PEGADINHA', body: '"Advérbio caracteriza o substantivo" — ERRADO: quem caracteriza substantivo é o ADJETIVO; advérbio modifica verbo/adjetivo/advérbio.' },
      { kind: 'PALAVRA_CHAVE', title: '6 variáveis · 4 invariáveis · adjetivo×advérbio' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Verbos e vozes',
        body:
          '# Verbos\n\n' +
          '- **Regulares**: mantêm o radical (amar → amei). **Irregulares**: alteram radical/desinência (fazer → fiz). **Anômalos**: ser, ir (radicais totalmente diferentes: sou, fui, era).\n\n' +
          '## Vozes verbais\n' +
          '- **Ativa**: o sujeito PRATICA ("O agente entregou o relatório").\n' +
          '- **Passiva**: o sujeito SOFRE a ação. Analítica: "O relatório foi entregue pelo agente". Sintética: "Entregou-se o relatório".\n' +
          '- **Reflexiva**: o sujeito pratica e recebe ("O candidato inscreveu-se").'
      },
      { kind: 'PEGADINHA', body: '"Alugam-se salas" está no singular por concordância" — ERRADO: é passiva sintética; o verbo concorda com o sujeito (salas) → PLURAL.' },
      { kind: 'PALAVRA_CHAVE', title: 'anômalos: ser/ir · voz ativa×passiva×reflexiva' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Emprego dos pronomes',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Pronomes e colocação pronominal',
        body:
          '# Pronomes\n\n' +
          '## Colocação (próclise, mesóclise, ênclise)\n' +
          '- **Próclise** (antes do verbo): atraída por palavra negativa (não me diga), advérbio, pronome relativo/indefinido, conjunção subordinativa, frase interrogativa ("Quem te disse?").\n' +
          '- **Mesóclise** (no meio): futuro do presente/pretérito sem atração ("far-se-á").\n' +
          '- **Ênclise** (depois): início de oração e imperativo afirmativo ("Diga-me").\n\n' +
          '## Tratamento\n' +
          'Pronomes de tratamento (Vossa Senhoria, Vossa Excelência) concordam na **3ª pessoa**.'
      },
      { kind: 'PEGADINHA', body: '"Me diga a verdade" no início da frase" — ERRADO: não se inicia oração com pronome oblíquo átono → "Diga-me a verdade" (ênclise).' },
      { kind: 'PALAVRA_CHAVE', title: 'próclise atraída · ênclise início/imperativo · tratamento 3ª pessoa' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Sintaxe: termos essenciais, integrantes e acessórios da oração',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Termos da oração',
        body:
          '# Análise sintática\n\n' +
          '- **Essenciais**: sujeito e predicado.\n' +
          '- **Integrantes** (completam): objeto direto, objeto indireto, complemento nominal, agente da passiva.\n' +
          '- **Acessórios**: adjunto adnominal, adjunto adverbial, aposto. (Vocativo fica à parte.)\n\n' +
          '## Sujeito\n' +
          'Simples, composto, oculto/elíptico, indeterminado ("Precisa-se de agentes") e oração sem sujeito (haver=existir, fenômenos: "Choveu").\n\n' +
          '## Predicado\n' +
          'Verbal (verbo de ação), nominal (verbo de ligação + predicativo) e verbo-nominal.'
      },
      { kind: 'CONCEITO', title: 'Adjunto adnominal × complemento nominal', body: 'Ambos acompanham um nome. Adjunto adnominal caracteriza (posse/qualidade); complemento nominal completa o sentido de um nome que exige complemento (ex.: "amor AO próximo" = complemento).' },
      { kind: 'PEGADINHA', body: '"Oração sem sujeito não tem predicado" — ERRADO: existe predicado; o que falta é o sujeito (ex.: "Havia problemas").' },
      { kind: 'PALAVRA_CHAVE', title: 'essenciais · integrantes · acessórios · sujeito indeterminado' }
    ]
  }
]

// ───────────────────────── CONHECIMENTO (RLQ) ─────────────────────────
export const IBGE_RLQ_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Estrutura lógica de relações entre pessoas, lugares, coisas e/ou eventos; dedução de novas informações; avaliação de condições',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Raciocínio sequencial e de associação',
        body:
          '# Estruturas de relações\n\n' +
          'Problemas de **associação lógica** (verdades/mentiras, correspondência entre conjuntos) e **sequências** (numéricas, alfabéticas, figuras).\n\n' +
          '## Estratégia\n' +
          '- Montar **tabela de associação** (marcar V/F por cruzamento).\n' +
          '- Em "verdades e mentiras", testar hipóteses e eliminar contradições.\n' +
          '- Sequências: buscar o **padrão** (soma, produto, alternância, Fibonacci).'
      },
      { kind: 'DICA', body: 'Em problemas de associação, uma informação negativa ("X não fica ao lado de Y") costuma ser a chave para eliminar possibilidades rapidamente.' },
      { kind: 'PALAVRA_CHAVE', title: 'tabela de associação · verdades e mentiras · padrão de sequência' }
    ]
  }
]

// ───────────────────────── QUESTÕES (LP + RLQ) ─────────────────────────
export const IBGE_SHARED_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: 'lingua-portuguesa', topic: 'Significação das palavras', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que as palavras destacadas são PARÔNIMAS.',
    options: [
      { text: 'manga (fruta) / manga (da camisa).' },
      { text: 'tráfego / tráfico.', correct: true },
      { text: 'claro / escuro.' },
      { text: 'casa / lar.' },
      { text: 'cabeça (parte do corpo) / cabeça (líder).' }
    ],
    explanation: 'CORRETA: "b". Tráfego (trânsito) e tráfico (comércio ilícito) são PARÔNIMOS (parecidos, sentidos distintos). "a" são homônimos (mesma grafia); "c" antônimos; "d" sinônimos; "e" polissemia.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa', topic: 'Ortografia oficial; acentuação gráfica', type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando o Acordo Ortográfico vigente, assinale a alternativa em que a palavra está CORRETAMENTE grafada sem acento.',
    options: [
      { text: 'idéia.' }, { text: 'ideia.', correct: true }, { text: 'herôi.' }, { text: 'saida.' }, { text: 'medico (profissional).' }
    ],
    explanation: 'CORRETA: "b". "Ideia" (ditongo aberto EI em paroxítona) perdeu o acento no Novo Acordo. "a" está na grafia antiga; "herói" (oxítona) mantém acento; "saída" (hiato) leva acento; "médico" (proparoxítona) é sempre acentuada.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa', topic: 'Pontuação; estrutura e sequência lógica de frases e parágrafos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a pontuação está INCORRETA.',
    options: [
      { text: 'O supervisor, atento aos prazos, orientou a equipe.' },
      { text: 'O supervisor orientou a equipe, pois os prazos eram curtos.' },
      { text: 'O supervisor, orientou a equipe sobre os prazos.', correct: true },
      { text: 'Atento aos prazos, o supervisor orientou a equipe.' },
      { text: 'O supervisor orientou a equipe; os prazos eram curtos.' }
    ],
    explanation: 'CORRETA (a incorreta): "c". Não se separa o SUJEITO ("O supervisor") do VERBO ("orientou") por vírgula. As demais pontuam corretamente (aposto/adjunto isolado, adverbial deslocada, ponto e vírgula).',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa', topic: 'Emprego dos pronomes', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa que respeita as regras de colocação pronominal.',
    options: [
      { text: 'Me entregue o relatório agora.' },
      { text: 'Não me entregue o relatório atrasado.', correct: true },
      { text: 'Entregar-lhe-ei... não, entregue-me você.' },
      { text: 'Quem disse-te isso?' },
      { text: 'Sempre entregou-me os documentos.' }
    ],
    explanation: 'CORRETA: "b". A palavra negativa "não" atrai o pronome (próclise): "não me entregue". "a" inicia oração com átono (proibido); "d" o interrogativo/relativo "Quem" exige próclise ("Quem te disse?"); "e" o advérbio "sempre" atrai próclise ("sempre me entregou").',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa', topic: 'Compreensão e interpretação de texto', type: 'ME', difficulty: 'FACIL',
    statement: 'A diferença entre pressuposto e subentendido é que o pressuposto:',
    options: [
      { text: 'depende exclusivamente da entonação de voz.' },
      { text: 'está marcado na própria estrutura linguística do enunciado.', correct: true },
      { text: 'nunca pode ser identificado no texto.' },
      { text: 'é sinônimo de sujeito oculto.' },
      { text: 'ocorre apenas em textos literários.' }
    ],
    explanation: 'CORRETA: "b". O pressuposto é marcado por elementos da língua (ex.: "ainda", "já", "deixou de"); o subentendido depende do contexto/intenção e não é marcado. As demais são falsas.',
    source: S
  },
  {
    disciplineSlug: 'raciocinio-logico', topic: 'Estrutura lógica de relações entre pessoas, lugares, coisas e/ou eventos; dedução de novas informações; avaliação de condições', type: 'ME', difficulty: 'MEDIO',
    statement: 'Ana, Bruno e Carla exercem as funções de supervisor, administrativo e recenseador, não necessariamente nessa ordem. Sabe-se que: Ana não é supervisora; Bruno é administrativo. Logo, é correto afirmar que:',
    options: [
      { text: 'Ana é administrativa.' },
      { text: 'Carla é recenseadora.' },
      { text: 'Ana é recenseadora e Carla é supervisora.', correct: true },
      { text: 'Bruno é supervisor.' },
      { text: 'Carla é administrativa.' }
    ],
    explanation: 'CORRETA: "c". Bruno é administrativo (dado). Sobram supervisor e recenseador para Ana e Carla. Como Ana NÃO é supervisora, Ana é recenseadora e Carla é supervisora. As demais contradizem essas deduções.',
    source: S
  }
]

// ───────────────────────── FLASHCARDS (LP + RLQ) ─────────────────────────
export const IBGE_SHARED_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE — Português & RLQ (compartilhado)',
    disciplineSlug: 'lingua-portuguesa',
    description: 'Português e Raciocínio Lógico do IBGE (comum a ACS e ACA), estilo IBFC.',
    cards: [
      { front: 'Compreensão × interpretação', back: 'Compreensão = o que o texto DIZ (literal). Interpretação = o que SUGERE (inferência, implícitos).', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Compreensão e interpretação de texto' } },
      { front: 'Homônimo × parônimo', back: 'Homônimo = IGUAL (som/grafia): manga, cela/sela. Parônimo = PARECIDO: ratificar/retificar, tráfego/tráfico.', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Significação das palavras' } },
      { front: 'Vírgula: proibição clássica', back: 'NÃO separar sujeito do verbo, nem verbo do objeto, por vírgula.', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Pontuação; estrutura e sequência lógica de frases e parágrafos' } },
      { front: '"Ideia" tem acento?', back: 'NÃO (Novo Acordo: ditongo aberto EI/OI em paroxítona perdeu o acento). "Herói" (oxítona) mantém.', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Ortografia oficial; acentuação gráfica' } },
      { front: 'Proparoxítona — acento', back: 'TODAS as proparoxítonas são acentuadas (médico, lâmpada, próximo).', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Ortografia oficial; acentuação gráfica' } },
      { front: 'Adjetivo × advérbio', back: 'Adjetivo caracteriza o SUBSTANTIVO; advérbio modifica VERBO/adjetivo/advérbio.', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Classes das palavras' } },
      { front: 'Verbos anômalos', back: 'SER e IR (radicais totalmente diferentes: sou/fui/era; vou/fui/ia).', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos' } },
      { front: 'Ênclise obrigatória', back: 'No INÍCIO da oração e no imperativo afirmativo: "Diga-me" (nunca "Me diga" no começo).', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Emprego dos pronomes' } },
      { front: 'Próclise — atração', back: 'Palavra negativa, advérbio, pronome relativo/indefinido, conjunção subordinativa e interrogativos atraem o pronome antes do verbo.', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Emprego dos pronomes' } },
      { front: 'Termos da oração', back: 'Essenciais (sujeito, predicado); integrantes (objetos, complemento nominal, agente da passiva); acessórios (adjuntos, aposto).', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Sintaxe: termos essenciais, integrantes e acessórios da oração' } },
      { front: 'Sujeito indeterminado', back: 'Verbo na 3ª pessoa do plural sem referente, ou VTI/VI + "se": "Precisa-se de agentes".', topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Sintaxe: termos essenciais, integrantes e acessórios da oração' } },
      { front: 'Associação lógica', back: 'Montar tabela V/F por cruzamento; uma informação negativa costuma destravar o problema.', topic: { disciplineSlug: 'raciocinio-logico', topic: 'Estrutura lógica de relações entre pessoas, lugares, coisas e/ou eventos; dedução de novas informações; avaliação de condições' } }
    ]
  }
]
