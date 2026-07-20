// M26 — completude de Língua Portuguesa e Raciocínio Lógico do IBGE (comum a
// ACS e ACA). Preenche os tópicos e SUBTÓPICOS que o diagnóstico apontou como
// vazios, com conteúdo rico (estilo apostila). Referenciado pelos DOIS contests;
// idempotente por tópico (o que já existe em cada cargo é ignorado).
// APENAS DADOS. Slugs compartilhados 'lingua-portuguesa'/'raciocinio-logico'.
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const S = 'Banco de estudo (estilo IBFC)'
const LP = 'lingua-portuguesa'
const RL = 'raciocinio-logico'

export const IBGE_EXTRA_KNOWLEDGE: SeedTopicKnowledge[] = [
  // ═══════════════ Língua Portuguesa — tópicos que faltavam ao ACA ═══════════════
  {
    disciplineSlug: LP,
    topic: 'Concordância nominal e verbal',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Concordância verbal e nominal — capítulo',
        body:
          '# Concordância\n\n' +
          '## Verbal (verbo concorda com o sujeito)\n' +
          '| Caso | Regra | Exemplo |\n| --- | --- | --- |\n' +
          '| **Haver** = existir | IMPESSOAL → singular | "Havia muitos agentes" |\n' +
          '| **Fazer** (tempo) | IMPESSOAL → singular | "Faz dez anos" |\n' +
          '| **Existir** | pessoal → concorda | "Existiam pendências" |\n' +
          '| Voz passiva sintética (se) | concorda com o sujeito | "Alugam-se salas" |\n' +
          '| Índice de indeterminação (se) + VTI | singular | "Precisa-se de agentes" |\n\n' +
          '## Nominal (adjetivo/artigo concordam com o substantivo)\n' +
          '- "**anexo**", "**obrigado**", "**mesmo**", "**próprio**" → variam ("Seguem anexas as planilhas").\n' +
          '- "**é proibido**", "**é necessário**" → invariável se o sujeito NÃO tiver determinante ("É proibido entrada"); varia se tiver ("É proibida A entrada").\n' +
          '- "**menos**" e "**alerta**" → invariáveis ("menos pessoas").'
      },
      { kind: 'PEGADINHA', body: '"Houveram muitos inscritos" — ERRADO: HAVER (existir) é impessoal → "Houve". Já "menas pessoas" NÃO existe: correto é "menos".' },
      { kind: 'DICA', body: 'Passiva sintética CONCORDA ("Vendem-se casas"); indeterminação do sujeito (VTI + se) fica no SINGULAR ("Confia-se em bons agentes").' },
      { kind: 'PALAVRA_CHAVE', title: 'haver/fazer impessoais · anexo varia · menos invariável' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Regência nominal e verbal',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Regência e crase — capítulo',
        body:
          '# Regência\n\n' +
          '| Verbo | Sentido | Regência |\n| --- | --- | --- |\n' +
          '| **Assistir** | ver | VTI: assistir AO filme |\n' +
          '| **Assistir** | ajudar | VTD: assistir o doente |\n' +
          '| **Aspirar** | desejar | VTI: aspirar AO cargo |\n' +
          '| **Visar** | almejar | VTI: visar AO objetivo |\n' +
          '| **Obedecer/Desobedecer** | — | VTI: obedecer AO chefe |\n' +
          '| **Preferir** | — | "preferir A a B" (nunca "do que") |\n\n' +
          '## Crase (a + a)\n' +
          '- OCORRE antes de palavra feminina determinada: "Entreguei À supervisora"; antes de horas ("às 10h"); "à moda de".\n' +
          '- NÃO OCORRE antes de: verbo, palavra masculina, pronome pessoal, artigo indefinido, e na locução "**a partir de**".'
      },
      { kind: 'PEGADINHA', body: '"Prefiro trabalhar do que descansar" — ERRADO: prefere-se UMA coisa A outra: "Prefiro trabalhar A descansar". E "a partir de" nunca tem crase.' },
      { kind: 'PALAVRA_CHAVE', title: 'assistir/aspirar/visar VTI · preferir A · crase' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Coesão e coerência',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Coesão × coerência — capítulo',
        body:
          '# Coesão e coerência\n\n' +
          '- **Coesão**: ligação FORMAL entre as partes do texto (conectivos, pronomes, sinônimos). É a "amarração" superficial.\n' +
          '- **Coerência**: sentido LÓGICO e global do texto; ausência de contradição. É o nível do significado.\n\n' +
          '## Mecanismos de coesão\n' +
          '| Mecanismo | Como | Exemplo |\n| --- | --- | --- |\n' +
          '| **Referenciação** | retoma/antecipa termos | "O agente… ele…" |\n' +
          '| **Substituição** | troca por sinônimo/pronome | "o servidor" → "o funcionário" |\n' +
          '| **Elipse** | omite termo recuperável | "Chegou e (ele) assinou" |\n' +
          '| **Conjunção** | liga orações com sentido | "porque", "portanto", "mas" |\n\n' +
          'Anáfora (retoma o que já veio) × catáfora (antecipa o que virá).'
      },
      { kind: 'CONCEITO', title: 'Anáfora × catáfora', body: 'Anáfora aponta para trás ("Comprei livros; ELES são novos"); catáfora aponta para frente ("Digo-lhe ISTO: estude").' },
      { kind: 'PEGADINHA', body: '"Um texto coeso é sempre coerente" — ERRADO: pode haver coesão (conectivos corretos) sem coerência (sentido contraditório), e vice-versa.' },
      { kind: 'PALAVRA_CHAVE', title: 'coesão=forma · coerência=sentido · anáfora×catáfora' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Redação oficial — capítulo',
        body:
          '# Redação oficial (Manual da Presidência, 3ª ed.)\n\n' +
          '## Atributos\n' +
          'Clareza, concisão, **impessoalidade**, formalidade, padrão culto e uniformidade.\n\n' +
          '## Padrão ofício\n' +
          'Unificou ofício, memorando e aviso em um único documento: o **ofício**. Estrutura: tipo/número, local e data, endereçamento, assunto, texto, fecho, assinatura.\n\n' +
          '## Fechos\n' +
          '- **Respeitosamente** → autoridade superior.\n- **Atenciosamente** → mesma hierarquia ou inferior.\n\n' +
          '## Pronomes de tratamento\n' +
          'Concordam na **3ª pessoa**: "Vossa Senhoria **deferiu**". Abreviaturas: V. Sa., V. Exa. (só se NÃO for a própria autoridade).'
      },
      { kind: 'PEGADINHA', body: '"A redação oficial admite marcas pessoais e opinativas para enfatizar" — ERRADO: é IMPESSOAL; parte do órgão, sem marcas pessoais.' },
      { kind: 'PALAVRA_CHAVE', title: 'impessoalidade · padrão ofício · fecho · 3ª pessoa' }
    ]
  },
  // ── Subtópicos-folha de Significação ──
  {
    disciplineSlug: LP,
    topic: 'Sinônimos e antônimos',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Sinonímia e antonímia',
        body:
          '# Sinônimos × antônimos\n\n' +
          '- **Sinônimos**: sentidos semelhantes (casa/lar, feliz/contente). Raramente perfeitos — o contexto define ("belo" e "bonito" nem sempre se trocam).\n' +
          '- **Antônimos**: sentidos opostos (claro/escuro, subir/descer).\n' +
          '- Antonímia por prefixo: feliz/**in**feliz, legal/**i**legal, ativo/**des**ativado.'
      },
      { kind: 'DICA', body: 'A IBFC cobra sinônimo NO CONTEXTO: substitua a palavra e veja se o sentido da frase se mantém — sinônimo fora de contexto pode estar errado.' },
      { kind: 'PALAVRA_CHAVE', title: 'sinônimo depende do contexto · antônimo por prefixo' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Homônimos e parônimos',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Homônimos e parônimos — os que mais caem',
        body:
          '# Homônimos × parônimos\n\n' +
          '- **Homônimos** = IGUAIS no som e/ou grafia: homófonos (cela/sela, cerrar/serrar), homógrafos (colher verbo/subst.), perfeitos (manga, são).\n' +
          '- **Parônimos** = PARECIDOS: ratificar (confirmar)/retificar (corrigir); tráfego (trânsito)/tráfico (ilícito); descriminar (tirar a culpa)/discriminar (separar); eminente (notável)/iminente (prestes a ocorrer); flagrante/fragrante; comprimento/cumprimento.'
      },
      { kind: 'PEGADINHA', body: '"Cargo eminente" para "prestes a assumir" — ERRADO: iminente = prestes a ocorrer; eminente = ilustre/notável.' },
      { kind: 'DICA', body: 'Mnemônico: reCTificar = corRIGIR (troca "c" por certo); raTificar = confirmar (raTo confirma). Discriminar = separar (com "i" de dividir).' },
      { kind: 'PALAVRA_CHAVE', title: 'ratificar×retificar · eminente×iminente · tráfego×tráfico' }
    ]
  },
  // ── Subtópicos-folha de Coesão ──
  {
    disciplineSlug: LP,
    topic: 'Referenciação, substituição e repetição',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Referenciação e coesão referencial',
        body:
          '# Referenciação\n\n' +
          '- **Referência** (pronomes, advérbios): "O supervisor chegou. **Ele** orientou a equipe."\n' +
          '- **Substituição**: troca por outro termo equivalente ("o IBGE" → "o instituto").\n' +
          '- **Repetição/reiteração**: repete o termo para retomar (menos elegante, mas coeso).\n' +
          '- Coesão **referencial** (retoma termos) × **sequencial** (conectivos que encadeiam).'
      },
      { kind: 'PEGADINHA', body: 'Ambiguidade de referência é erro clássico: "O agente falou com o chefe e ELE saiu" — quem saiu? A reescrita deve deixar o referente claro.' },
      { kind: 'PALAVRA_CHAVE', title: 'referência · substituição · repetição · referencial×sequencial' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Conectores',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Conectores e as relações de sentido',
        body:
          '# Conectores (conjunções)\n\n' +
          '| Relação | Conectores |\n| --- | --- |\n' +
          '| **Adição** | e, também, além disso |\n' +
          '| **Adversidade/oposição** | mas, porém, contudo, todavia, entretanto |\n' +
          '| **Conclusão** | logo, portanto, por isso, assim |\n' +
          '| **Explicação/causa** | porque, pois, já que, visto que |\n' +
          '| **Condição** | se, caso, desde que |\n' +
          '| **Concessão** | embora, ainda que, mesmo que, conquanto |\n' +
          '| **Finalidade** | para que, a fim de que |\n\n' +
          'Trocar o conector muda o sentido — atenção na reescrita.'
      },
      { kind: 'PEGADINHA', body: '"Embora" (concessão) × "porque" (causa): "Embora chovesse, saiu" ≠ "Porque chovia, saiu". A IBFC troca um pelo outro para induzir ao erro.' },
      { kind: 'PALAVRA_CHAVE', title: 'adversidade · conclusão · causa · concessão · finalidade' }
    ]
  },
  {
    disciplineSlug: LP,
    topic: 'Tempos e modos verbais',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Tempos e modos verbais',
        body:
          '# Modos e tempos\n\n' +
          '- **Indicativo** (certeza): presente, pretéritos (perfeito, imperfeito, mais-que-perfeito), futuros.\n' +
          '- **Subjuntivo** (hipótese/dúvida): "que eu **faça**", "se eu **fizesse**", "quando eu **fizer**".\n' +
          '- **Imperativo** (ordem/pedido): "**Faça**", "**Não faça**".\n\n' +
          '## Correlação\n' +
          'Condicional com "se" + imperfeito do subjuntivo → futuro do pretérito: "Se **pudesse**, **iria**" (não "se poderia, iria").'
      },
      { kind: 'PEGADINHA', body: '"Se eu ver o relatório" — ERRADO: futuro do subjuntivo de VER é "vir" → "Se eu VIR o relatório". Idem "se eu pôr" → "se eu PUSER".' },
      { kind: 'PALAVRA_CHAVE', title: 'indicativo×subjuntivo×imperativo · "se eu vir/puser"' }
    ]
  },
  // ═══════════════ Raciocínio Lógico — completude ═══════════════
  {
    disciplineSlug: RL,
    topic: 'Áreas avaliadas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Panorama das áreas de RLQ',
        body:
          '# Áreas do Raciocínio Lógico Quantitativo\n\n' +
          '- **Estruturas lógicas**: proposições, conectivos, tabelas-verdade, equivalências.\n' +
          '- **Lógica de argumentação**: validade de argumentos, premissas e conclusão.\n' +
          '- **Diagramas lógicos**: "todo/algum/nenhum" com conjuntos (Venn).\n' +
          '- **Aritmética**: operações, razão, proporção, porcentagem, regra de três.\n' +
          '- **Álgebra e geometria básicas**: equações, funções simples, perímetro/área/volume.'
      },
      { kind: 'DICA', body: 'A IBFC equilibra lógica proposicional/diagramas com matemática básica (porcentagem e regra de três). Domine tabelas-verdade e "todo/algum/nenhum".' },
      { kind: 'PALAVRA_CHAVE', title: 'estruturas · argumentação · diagramas · aritmética · álgebra/geometria' }
    ]
  },
  {
    disciplineSlug: RL,
    topic: 'Estruturas lógicas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Proposições, conectivos e tabelas-verdade',
        body:
          '# Estruturas lógicas\n\n' +
          '| Conectivo | Símbolo | Verdadeiro quando |\n| --- | --- | --- |\n' +
          '| Conjunção (e) | ∧ | ambas V |\n' +
          '| Disjunção (ou) | ∨ | ao menos uma V |\n' +
          '| Condicional (se…então) | → | falso só em V → F |\n' +
          '| Bicondicional (se e somente se) | ↔ | valores iguais |\n\n' +
          '## Equivalências\n' +
          '- `p → q ≡ ~q → ~p` (contrapositiva) `≡ ~p ∨ q`.\n' +
          '- **De Morgan**: `~(p ∧ q) ≡ ~p ∨ ~q`; `~(p ∨ q) ≡ ~p ∧ ~q`.\n' +
          '- **Negação da condicional**: `~(p → q) ≡ p ∧ ~q`.'
      },
      { kind: 'PEGADINHA', body: '"A condicional p→q só é falsa quando p é falso" — ERRADO: é falsa só quando V → F (p verdadeiro e q falso).' },
      { kind: 'PALAVRA_CHAVE', title: '→ falsa só V→F · contrapositiva · De Morgan' }
    ]
  },
  {
    disciplineSlug: RL,
    topic: 'Lógica de argumentação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Argumentos válidos',
        body:
          '# Lógica de argumentação\n\n' +
          'Argumento = premissas + conclusão. É **válido** quando a conclusão decorre necessariamente das premissas.\n\n' +
          '## Formas válidas clássicas\n' +
          '- **Modus ponens**: p→q; p ∴ q.\n' +
          '- **Modus tollens**: p→q; ~q ∴ ~p.\n' +
          '- **Silogismo hipotético**: p→q; q→r ∴ p→r.\n\n' +
          'Validade ≠ verdade: um argumento pode ser válido com premissas falsas; o que importa é a ESTRUTURA.'
      },
      { kind: 'PEGADINHA', body: 'Falácia da afirmação do consequente: p→q; q ∴ p é INVÁLIDO. Só modus ponens (afirma o antecedente) é válido.' },
      { kind: 'PALAVRA_CHAVE', title: 'modus ponens/tollens · validade ≠ verdade' }
    ]
  },
  {
    disciplineSlug: RL,
    topic: 'Diagramas lógicos',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Todo, algum, nenhum (Venn)',
        body:
          '# Diagramas lógicos\n\n' +
          '- **Todo A é B**: círculo A dentro de B.\n' +
          '- **Algum A é B**: interseção entre A e B (ao menos um elemento).\n' +
          '- **Nenhum A é B**: círculos separados.\n\n' +
          '## Negações\n' +
          '- ~(Todo A é B) = **Algum A não é B**.\n- ~(Algum A é B) = **Nenhum A é B**.\n- ~(Nenhum A é B) = **Algum A é B**.\n\n' +
          '"Algum" em lógica significa "**pelo menos um**" (pode ser todos).'
      },
      { kind: 'PEGADINHA', body: '"A negação de \'Todo agente é pontual\' é \'Nenhum agente é pontual\'" — ERRADO: é "ALGUM agente NÃO é pontual".' },
      { kind: 'PALAVRA_CHAVE', title: 'todo⊂ · algum∩ · nenhum| · negação de todo = algum não' }
    ]
  },
  {
    disciplineSlug: RL,
    topic: 'Aritmética',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Porcentagem, razão, proporção e regra de três',
        body:
          '# Aritmética de prova\n\n' +
          '- **Porcentagem**: x% = x/100. Aumento de 20% = ×1,20; desconto de 20% = ×0,80. Aumentos/descontos sucessivos MULTIPLICAM os fatores (não somam).\n' +
          '- **Razão e proporção**: a/b = c/d → produto dos meios = produto dos extremos (a·d = b·c).\n' +
          '- **Regra de três**: direta (mais → mais) × inversa (mais → menos, ex.: mais agentes, menos tempo).\n\n' +
          '_Ex.: 40 recenseadores fazem a coleta em 12 dias; 60 recenseadores (inversa) → 40·12 = 60·x → x = 8 dias._'
      },
      { kind: 'PEGADINHA', body: '"Aumentar 10% e depois 10% dá 20%" — ERRADO: 1,10 × 1,10 = 1,21 → 21%. Percentuais sucessivos multiplicam.' },
      { kind: 'PALAVRA_CHAVE', title: '×1,20 aumento · regra de três inversa · sucessivos multiplicam' }
    ]
  },
  {
    disciplineSlug: RL,
    topic: 'Álgebra e geometria básicas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Equações e geometria básica',
        body:
          '# Álgebra e geometria básicas\n\n' +
          '## Álgebra\n' +
          '- Equação do 1º grau: isolar a incógnita (ax + b = 0 → x = −b/a).\n' +
          '- Sistemas simples: substituição ou adição.\n\n' +
          '## Geometria\n' +
          '| Figura | Perímetro | Área |\n| --- | --- | --- |\n' +
          '| Retângulo | 2(b+h) | b·h |\n' +
          '| Quadrado | 4·L | L² |\n' +
          '| Triângulo | soma dos lados | (b·h)/2 |\n' +
          '| Círculo | 2πr | πr² |\n\n' +
          'Volume do bloco retangular = comprimento × largura × altura.'
      },
      { kind: 'DICA', body: 'Para área de terreno/estabelecimento (contexto do Censo), retângulo = base × altura; converta unidades (1 hectare = 10.000 m²).' },
      { kind: 'PALAVRA_CHAVE', title: 'área retângulo b·h · círculo πr² · 1 ha = 10.000 m²' }
    ]
  }
]

// ───────────────────────── QUESTÕES (LP + RLQ) — padrão IBFC, comentário por alternativa ─────────────────────────
export const IBGE_EXTRA_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: LP, topic: 'Coesão e coerência', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre coesão e coerência textuais, assinale a alternativa correta.',
    options: [
      { text: 'Coesão e coerência são termos sinônimos e intercambiáveis.' },
      { text: 'A coesão é a ligação formal entre as partes; a coerência é a articulação lógica dos sentidos.', correct: true },
      { text: 'Um texto coeso é necessariamente coerente.' },
      { text: 'A coerência depende apenas do uso correto de conjunções.' },
      { text: 'A coesão ocorre somente por meio de repetição de palavras.' }
    ],
    explanation:
      'A) ERRADA — são conceitos distintos: coesão é forma, coerência é sentido. B) CORRETA — coesão = amarração formal (conectivos, pronomes); coerência = lógica global sem contradição. C) ERRADA — pode haver coesão sem coerência (pegadinha clássica). D) ERRADA — coerência é do plano do sentido, não se resume a conjunções (que são coesão). E) ERRADA — a coesão usa referência, substituição, elipse e conjunção, não só repetição.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Conectores', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em "____ estivesse cansado, o supervisor concluiu a vistoria", o conector que estabelece relação de concessão e completa corretamente a frase é:',
    options: [
      { text: 'Porque.' },
      { text: 'Portanto.' },
      { text: 'Embora.', correct: true },
      { text: 'Caso.' },
      { text: 'Assim que.' }
    ],
    explanation:
      'A) ERRADA — "porque" indica causa. B) ERRADA — "portanto" indica conclusão (e não caberia no início com verbo no subjuntivo). C) CORRETA — "embora" é concessivo: admite um obstáculo (o cansaço) que não impede o fato (concluir a vistoria); exige subjuntivo ("estivesse"). D) ERRADA — "caso" indica condição. E) ERRADA — "assim que" indica tempo.',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Tempos e modos verbais', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Assinale a alternativa em que a forma verbal do futuro do subjuntivo está CORRETA.',
    options: [
      { text: 'Se eu ver o resultado, aviso a equipe.' },
      { text: 'Quando eu pôr os dados no sistema, transmito.' },
      { text: 'Se o agente vir a inconsistência, deve registrá-la.', correct: true },
      { text: 'Assim que eles porem tudo em ordem, começamos.' },
      { text: 'Se nós manter o ritmo, terminamos no prazo.' }
    ],
    explanation:
      'A) ERRADA — futuro do subjuntivo de "ver" é "vir": "Se eu VIR". B) ERRADA — de "pôr" é "puser": "Quando eu PUSER". C) CORRETA — "vir" é o futuro do subjuntivo de "ver" ("Se o agente VIR"). D) ERRADA — de "pôr" (eles) é "puserem": "Assim que eles PUSEREM". E) ERRADA — de "manter" (nós) é "mantivermos": "Se nós MANTIVERMOS".',
    source: S
  },
  {
    disciplineSlug: LP, topic: 'Homônimos e parônimos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a palavra destacada foi empregada com o sentido CORRETO.',
    options: [
      { text: 'O supervisor precisa retificar (confirmar) a escala.' },
      { text: 'É iminente (ilustre) a autoridade que nos visitará.' },
      { text: 'O gerente vai discriminar (detalhar/separar) as despesas por item.', correct: true },
      { text: 'Houve um flagrante (perfumado) no local da coleta.' },
      { text: 'O comprimento (saudação) foi cordial.' }
    ],
    explanation:
      'A) ERRADA — retificar = corrigir; confirmar seria "ratificar". B) ERRADA — iminente = prestes a ocorrer; ilustre seria "eminente". C) CORRETA — discriminar = separar/detalhar (discriminar despesas). D) ERRADA — flagrante = evidente/em flagrante; perfumado seria "fragrante". E) ERRADA — comprimento = extensão; saudação seria "cumprimento".',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Estruturas lógicas', type: 'ME', difficulty: 'MEDIO',
    statement: 'A negação da proposição "Se o agente transmitiu os dados, então a coleta foi concluída" é:',
    options: [
      { text: 'Se o agente não transmitiu os dados, então a coleta não foi concluída.' },
      { text: 'O agente transmitiu os dados e a coleta não foi concluída.', correct: true },
      { text: 'O agente não transmitiu os dados ou a coleta foi concluída.' },
      { text: 'Se a coleta foi concluída, então o agente transmitiu os dados.' },
      { text: 'O agente não transmitiu os dados e a coleta foi concluída.' }
    ],
    explanation:
      'A) ERRADA — é a proposição "inversa", não a negação. B) CORRETA — ~(p → q) ≡ p ∧ ~q: "transmitiu E a coleta NÃO foi concluída". C) ERRADA — p→q equivale a ~p ∨ q; isso é a própria condicional, não sua negação. D) ERRADA — é a recíproca. E) ERRADA — combina termos que não correspondem a p ∧ ~q.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Diagramas lógicos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando "Todo recenseador é agente censitário", é correto concluir que:',
    options: [
      { text: 'Todo agente censitário é recenseador.' },
      { text: 'Nenhum recenseador é agente censitário.' },
      { text: 'Existe pelo menos um agente censitário que é recenseador.', correct: true },
      { text: 'Algum recenseador não é agente censitário.' },
      { text: 'Nenhum agente censitário é recenseador.' }
    ],
    explanation:
      'A) ERRADA — a inclusão "todo recenseador é agente" não garante a recíproca. B) ERRADA — contraria a premissa. C) CORRETA — se todos os recenseadores estão dentro do conjunto dos agentes, então há agentes que são recenseadores (ao menos um). D) ERRADA — negaria a premissa "todo". E) ERRADA — também contraria a premissa.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Aritmética', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma equipe de 40 recenseadores conclui a coleta de uma área em 12 dias. Mantidas as condições, quantos dias levariam 60 recenseadores para concluir a mesma área?',
    options: [
      { text: '18 dias.' },
      { text: '10 dias.' },
      { text: '8 dias.', correct: true },
      { text: '6 dias.' },
      { text: '9 dias.' }
    ],
    explanation:
      'Grandezas INVERSAMENTE proporcionais (mais recenseadores → menos dias): 40·12 = 60·x → 480 = 60x → x = 8. A) ERRADA — aumentaria os dias (regra direta invertida). B) ERRADA — não corresponde ao cálculo. C) CORRETA — x = 8 dias. D) ERRADA — resultado de proporção incorreta. E) ERRADA — não satisfaz 40·12 = 60·x.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Aritmética', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma meta de coleta sofreu um aumento de 10% e, no mês seguinte, novo aumento de 20% sobre o valor já reajustado. O aumento percentual total, em relação à meta original, foi de:',
    options: [
      { text: '30%.' },
      { text: '32%.', correct: true },
      { text: '35%.' },
      { text: '2%.' },
      { text: '15%.' }
    ],
    explanation:
      'Percentuais sucessivos MULTIPLICAM os fatores: 1,10 × 1,20 = 1,32 → aumento de 32%. A) ERRADA — somar 10%+20% ignora a base reajustada (pegadinha). B) CORRETA — 1,10·1,20 = 1,32. C) ERRADA — não corresponde ao produto. D) ERRADA — confunde com diferença. E) ERRADA — usa média dos percentuais.',
    source: S
  },
  {
    disciplineSlug: RL, topic: 'Lógica de argumentação', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Considere as premissas: "Se há transmissão, então há conectividade" e "Não há conectividade". Pela lógica, conclui-se validamente que:',
    options: [
      { text: 'Há transmissão.' },
      { text: 'Não há transmissão.', correct: true },
      { text: 'Pode haver transmissão.' },
      { text: 'Há conectividade.' },
      { text: 'Nada se pode concluir.' }
    ],
    explanation:
      'É um MODUS TOLLENS: p→q e ~q ∴ ~p. A) ERRADA — afirmar p contraria a conclusão válida. B) CORRETA — negado o consequente (conectividade), nega-se o antecedente (transmissão). C) ERRADA — a conclusão é necessária, não possível. D) ERRADA — contraria a 2ª premissa. E) ERRADA — a conclusão é logicamente determinada (modus tollens).',
    source: S
  }
]

// ───────────────────────── FLASHCARDS (LP + RLQ novos) ─────────────────────────
export const IBGE_EXTRA_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE — Português & RLQ (aprofundamento)',
    disciplineSlug: LP,
    description: 'Concordância, regência, coesão, verbos e lógica — comum a ACS e ACA.',
    cards: [
      { front: 'Passiva sintética × indeterminação', back: '"Alugam-se salas" (passiva, concorda). "Precisa-se de agentes" (indeterminação, VTI + se → singular).', topic: { disciplineSlug: LP, topic: 'Concordância nominal e verbal' } },
      { front: '"Menos" e "anexo"', back: '"Menos" é INVARIÁVEL (nunca "menas"). "Anexo/obrigado/mesmo" VARIAM: "seguem anexas as planilhas".', topic: { disciplineSlug: LP, topic: 'Concordância nominal e verbal' } },
      { front: 'Preferir — regência', back: 'Prefere-se uma coisa A outra (nunca "do que"): "Prefiro estudar A descansar".', topic: { disciplineSlug: LP, topic: 'Regência nominal e verbal' } },
      { front: 'Coesão × coerência', back: 'Coesão = ligação FORMAL (conectivos, pronomes). Coerência = sentido LÓGICO global.', topic: { disciplineSlug: LP, topic: 'Coesão e coerência' } },
      { front: 'Anáfora × catáfora', back: 'Anáfora retoma o que já veio; catáfora antecipa o que virá.', topic: { disciplineSlug: LP, topic: 'Referenciação, substituição e repetição' } },
      { front: '"Embora" — relação', back: 'CONCESSÃO (admite obstáculo que não impede o fato); exige subjuntivo. ≠ "porque" (causa).', topic: { disciplineSlug: LP, topic: 'Conectores' } },
      { front: '"Se eu ver / se eu pôr"?', back: 'ERRADO. Futuro do subjuntivo: "se eu VIR" (ver) e "se eu PUSER" (pôr).', topic: { disciplineSlug: LP, topic: 'Tempos e modos verbais' } },
      { front: 'ratificar × retificar', back: 'Ratificar = confirmar. Retificar = corrigir. (Parônimos.)', topic: { disciplineSlug: LP, topic: 'Homônimos e parônimos' } },
      { front: 'eminente × iminente', back: 'Eminente = ilustre/notável. Iminente = prestes a ocorrer.', topic: { disciplineSlug: LP, topic: 'Homônimos e parônimos' } },
      { front: 'Condicional p→q — quando é falsa?', back: 'Só quando V → F (p verdadeiro e q falso).', topic: { disciplineSlug: RL, topic: 'Estruturas lógicas' } },
      { front: 'Negação de p→q', back: 'p ∧ ~q ("ocorreu p E não ocorreu q").', topic: { disciplineSlug: RL, topic: 'Estruturas lógicas' } },
      { front: 'Modus ponens × tollens', back: 'Ponens: p→q, p ∴ q. Tollens: p→q, ~q ∴ ~p. Afirmar o consequente é FALÁCIA.', topic: { disciplineSlug: RL, topic: 'Lógica de argumentação' } },
      { front: 'Negação de "Todo A é B"', back: '"Algum A não é B" (um contraexemplo basta). "Algum" = pelo menos um.', topic: { disciplineSlug: RL, topic: 'Diagramas lógicos' } },
      { front: 'Percentuais sucessivos', back: 'MULTIPLICAM fatores: +10% e +20% → 1,10×1,20 = 1,32 → +32% (não 30%).', topic: { disciplineSlug: RL, topic: 'Aritmética' } },
      { front: 'Regra de três inversa', back: 'Mais recenseadores → menos dias: 40·12 = 60·x → x = 8.', topic: { disciplineSlug: RL, topic: 'Aritmética' } },
      { front: 'Área e hectare', back: 'Área do retângulo = base × altura. 1 hectare = 10.000 m².', topic: { disciplineSlug: RL, topic: 'Álgebra e geometria básicas' } }
    ]
  }
]

// ───────────────────────── RELAÇÕES (LP + RLQ) ─────────────────────────
export const IBGE_EXTRA_RELATIONS: SeedRelation[] = [
  { from: { disciplineSlug: LP, topic: 'Significação das palavras' }, to: { disciplineSlug: LP, topic: 'Homônimos e parônimos' }, kind: 'CONTINUIDADE', strength: 0.6, note: 'Homônimos/parônimos aprofundam a significação das palavras.' },
  { from: { disciplineSlug: LP, topic: 'Coesão e coerência' }, to: { disciplineSlug: LP, topic: 'Conectores' }, kind: 'PRE_REQUISITO', strength: 0.75, note: 'Os conectores são o principal mecanismo de coesão sequencial.' },
  { from: { disciplineSlug: LP, topic: 'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos' }, to: { disciplineSlug: LP, topic: 'Tempos e modos verbais' }, kind: 'CONTINUIDADE', strength: 0.6, note: 'Do emprego dos verbos para a correlação de tempos e modos.' },
  { from: { disciplineSlug: RL, topic: 'Estruturas lógicas' }, to: { disciplineSlug: RL, topic: 'Lógica de argumentação' }, kind: 'PRE_REQUISITO', strength: 0.75, note: 'A validade de argumentos usa as equivalências das estruturas lógicas.' },
  { from: { disciplineSlug: RL, topic: 'Estruturas lógicas' }, to: { disciplineSlug: RL, topic: 'Diagramas lógicos' }, kind: 'COMPLEMENTA', strength: 0.5, note: 'Proposições categóricas (todo/algum/nenhum) e diagramas se complementam.' }
]
