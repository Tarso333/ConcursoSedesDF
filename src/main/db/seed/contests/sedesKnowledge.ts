// Conhecimento inicial do SEDES DF 2026 — conteúdo autoral de estudo
// (lei seca resumida, conceitos, dicas e pegadinhas no estilo da banca).
// Apenas DADOS: a engine renderiza qualquer tópico com qualquer combinação.
import type { SeedTopicKnowledge } from './types'

export const SEDES_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: 'marcos-normativos',
    topic: 'LOAS — Lei Orgânica da Assistência Social (Lei 8.742/1993)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Visão geral da LOAS',
        body:
          '# LOAS — Lei 8.742/1993\n\n' +
          'A **Lei Orgânica da Assistência Social** organiza a assistência social no Brasil como **direito do cidadão e dever do Estado**, política **não contributiva** da Seguridade Social.\n\n' +
          '## Objetivos (art. 2º)\n' +
          '- **Proteção social** — à família, à maternidade, à infância, à adolescência e à velhice\n' +
          '- **Vigilância socioassistencial** — análise territorial da capacidade protetiva\n' +
          '- **Defesa de direitos** — garantia do pleno acesso aos direitos socioassistenciais\n\n' +
          '## Diretrizes (art. 5º)\n' +
          '1. **Descentralização** político-administrativa, com **comando único** em cada esfera\n' +
          '2. **Participação da população** na formulação e no controle das ações\n' +
          '3. **Primazia da responsabilidade do Estado** na condução da política\n\n' +
          '## Estrutura de proteção\n' +
          'O **SUAS** (inserido na LOAS pela **Lei 12.435/2011**) organiza os serviços em **Proteção Social Básica** (preventiva — CRAS) e **Proteção Social Especial** (direitos violados — CREAS, média e alta complexidade).'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Assistência social a quem dela necessitar',
        reference: 'Lei 8.742/1993, art. 1º',
        body: 'A assistência social é prestada **a quem dela necessitar, independentemente de contribuição** à seguridade social.'
      },
      {
        kind: 'LEGISLACAO',
        title: 'BPC — um salário mínimo',
        reference: 'Lei 8.742/1993, art. 20',
        body: 'Garantia de **1 salário mínimo mensal** à **pessoa com deficiência** e ao **idoso com 65 anos ou mais** que comprovem não possuir meios de prover a própria manutenção nem de tê-la provida por sua família.'
      },
      {
        kind: 'CONCEITO',
        title: 'Benefícios eventuais',
        body: 'Provisões suplementares e provisórias diante de nascimento, morte, vulnerabilidade temporária e calamidade pública (art. 22). Competência de **municípios e DF**.'
      },
      {
        kind: 'DICA',
        body: 'A Quadrix adora trocar números de lei: grave o "kit" — LOAS 8.742/93 · ECA 8.069/90 · SUS 8.080/90 · Estatuto do Idoso 10.741/03 · LBI 13.146/15 · Maria da Penha 11.340/06.'
      },
      {
        kind: 'PEGADINHA',
        body: '"A assistência social é prestada apenas a quem contribui" — **ERRADO**. É política NÃO contributiva (independe de contribuição).'
      },
      {
        kind: 'PEGADINHA',
        body: '"Centralização das ações na esfera federal" como diretriz — **ERRADO**. A diretriz é a DEScentralização, com comando único em cada esfera.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'não contributiva' },
      { kind: 'PALAVRA_CHAVE', title: 'comando único' },
      { kind: 'PALAVRA_CHAVE', title: 'primazia do Estado' },
      { kind: 'PALAVRA_CHAVE', title: 'proteção social · vigilância · defesa de direitos' }
    ]
  },
  {
    disciplineSlug: 'politica-mulheres',
    topic: 'Lei Maria da Penha (Lei 11.340/2006)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'O essencial da Lei Maria da Penha',
        body:
          '# Lei Maria da Penha — Lei 11.340/2006\n\n' +
          'Cria mecanismos para **coibir a violência doméstica e familiar contra a mulher**.\n\n' +
          '## Âmbitos de aplicação (art. 5º)\n' +
          '- **Unidade doméstica** — espaço de convívio permanente, mesmo sem vínculo familiar\n' +
          '- **Família** — comunidade formada por indivíduos aparentados ou por vontade expressa\n' +
          '- **Relação íntima de afeto** — atual ou passada, **independe de coabitação**\n\n' +
          'As relações **independem de orientação sexual** (art. 5º, parágrafo único).\n\n' +
          '## As 5 formas de violência (art. 7º)\n' +
          '| Forma | Exemplo típico |\n| --- | --- |\n| Física | lesões, empurrões |\n| Psicológica | humilhar, controlar, vigiar |\n| Sexual | forçar ato sexual |\n| Patrimonial | reter documentos e bens |\n| Moral | calúnia, difamação, injúria |\n\n' +
          '## Pontos processuais que mais caem\n' +
          '- **Não** se aplica a Lei 9.099/95 (Juizados Especiais) — art. 41\n' +
          '- **Vedadas** penas de cesta básica e multa isolada — art. 17\n' +
          '- Renúncia à representação: **só perante o juiz**, antes do recebimento da denúncia — art. 16\n' +
          '- Medidas protetivas de urgência: afastamento do lar, proibição de aproximação/contato — art. 22'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Vedação de penas pecuniárias',
        reference: 'Lei 11.340/2006, art. 17',
        body: 'É **vedada** a aplicação de penas de **cesta básica** ou outras de prestação pecuniária, bem como a substituição de pena que implique o **pagamento isolado de multa**.'
      },
      {
        kind: 'JURISPRUDENCIA',
        title: 'Ação penal na lesão corporal',
        reference: 'STF — ADI 4424',
        body: 'Na lesão corporal em contexto de violência doméstica, ainda que leve, a ação penal é **pública INCONDICIONADA** (não depende de representação da vítima).'
      },
      {
        kind: 'DICA',
        body: 'O edital do SEDES garante **no mínimo 3 questões** de Lei Maria da Penha — é o maior ROI da prova de conhecimentos gerais. Decore o art. 7º (5 formas) e o art. 17.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Exige coabitação entre agressor e vítima" — **ERRADO**. A relação íntima de afeto independe de coabitação (art. 5º, III).'
      },
      {
        kind: 'PEGADINHA',
        body: '"Violência ambiental/virtual" como forma do art. 7º — **ERRADO**. São 5: física, psicológica, sexual, patrimonial e moral.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'art. 7º — 5 formas' },
      { kind: 'PALAVRA_CHAVE', title: 'independe de orientação sexual' },
      { kind: 'PALAVRA_CHAVE', title: 'vedada cesta básica' },
      { kind: 'LINK', title: 'Texto integral da Lei 11.340/2006 (Planalto)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm' }
    ]
  },
  {
    disciplineSlug: 'beneficios-socioassistenciais',
    topic: 'Benefício de Prestação Continuada (BPC/LOAS)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'BPC em uma página',
        body:
          '# BPC — Benefício de Prestação Continuada\n\n' +
          '**1 salário mínimo mensal** pago a:\n' +
          '- **Idoso** com **65 anos ou mais**\n' +
          '- **Pessoa com deficiência** (impedimento de longo prazo — mínimo **2 anos**)\n\n' +
          '## Requisitos\n' +
          '- Renda familiar **per capita inferior a 1/4 do salário mínimo** (art. 20, §3º)\n' +
          '- Não possuir meios de prover a própria manutenção\n' +
          '- Inscrição no **CadÚnico**\n\n' +
          '## Características que a banca cobra\n' +
          '- É **assistencial** (não contributivo) — pago pelo INSS mas custeado pelo FNAS\n' +
          '- **Não** gera 13º salário\n' +
          '- **Não** deixa pensão por morte\n' +
          '- **Não** é vitalício: revisão **a cada 2 anos**\n' +
          '- Em regra, **inacumulável** com outro benefício da seguridade (salvo assistência médica e pensões indenizatórias)'
      },
      {
        kind: 'CONCEITO',
        title: 'Impedimento de longo prazo',
        body: 'Para o BPC, considera-se pessoa com deficiência aquela com impedimento de **no mínimo 2 anos** de natureza física, mental, intelectual ou sensorial (art. 20, §10).'
      },
      {
        kind: 'DICA',
        body: 'Grave o trio numérico do BPC: **65** (idade) · **1/4** (renda per capita) · **2 anos** (revisão e impedimento de longo prazo).'
      },
      {
        kind: 'PEGADINHA',
        body: '"O BPC é vitalício e gera 13º" — **ERRADO** nas duas partes: revisão a cada 2 anos e sem abono anual.'
      },
      { kind: 'PALAVRA_CHAVE', title: '65 anos · 1/4 SM · 2 anos' },
      { kind: 'PALAVRA_CHAVE', title: 'não contributivo' }
    ]
  },
  {
    disciplineSlug: 'fundamentos-assistencia',
    topic: 'Política Nacional de Assistência Social (PNAS/2004)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'PNAS/2004 — pilares',
        body:
          '# PNAS/2004\n\n' +
          'Aprovada pela **Resolução CNAS 145/2004**, materializa a LOAS e cria as bases do **SUAS**.\n\n' +
          '## Eixos estruturantes\n' +
          '- **Matricialidade sociofamiliar** — a família no centro da política\n' +
          '- **Descentralização político-administrativa e territorialização**\n' +
          '- Novas bases para a relação Estado ↔ sociedade civil\n' +
          '- **Financiamento** partilhado (fundos)\n' +
          '- **Controle social** (conselhos e conferências)\n' +
          '- Política de recursos humanos\n' +
          '- **Informação, monitoramento e avaliação**\n\n' +
          '## Níveis de proteção\n' +
          '- **Básica** (preventiva; vínculos preservados) → **CRAS/PAIF**\n' +
          '- **Especial de média complexidade** (direitos violados, vínculos mantidos) → **CREAS/PAEFI**\n' +
          '- **Especial de alta complexidade** (proteção integral) → acolhimento institucional'
      },
      {
        kind: 'CONCEITO',
        title: 'Matricialidade sociofamiliar',
        body: 'A família é o núcleo de referência do planejamento e da oferta dos serviços — espaço de proteção e mediação entre o indivíduo e o Estado.'
      },
      {
        kind: 'CONCEITO',
        title: 'Territorialização',
        body: 'Os serviços são planejados a partir das vulnerabilidades e potencialidades de cada território — o CRAS se instala onde a vulnerabilidade está.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Trocar Básica ↔ Especial: se há **violação de direitos**, é Especial (CREAS); se é **prevenção** com vínculos preservados, é Básica (CRAS).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'matricialidade sociofamiliar' },
      { kind: 'PALAVRA_CHAVE', title: 'territorialização' }
    ]
  },
  {
    disciplineSlug: 'organizacao-suas',
    topic: 'CRAS — Centro de Referência de Assistência Social',
    entries: [
      {
        kind: 'RESUMO',
        title: 'CRAS × CREAS sem confusão',
        body:
          '# CRAS × CREAS\n\n' +
          '| | **CRAS** | **CREAS** |\n| --- | --- | --- |\n' +
          '| Proteção | Básica (preventiva) | Especial (média complexidade) |\n' +
          '| Público | vulnerabilidade, vínculos preservados | **direitos violados** |\n' +
          '| Serviço obrigatório | **PAIF** | **PAEFI** |\n' +
          '| Papel | porta de entrada do SUAS | atendimento especializado |\n\n' +
          'Complementos: **Centro POP** (população em situação de rua — PSE média) e **acolhimento institucional** (PSE alta complexidade).'
      },
      {
        kind: 'CONCEITO',
        title: 'PAIF',
        body: 'Serviço de Proteção e Atendimento Integral à Família — ofertado exclusiva e obrigatoriamente no CRAS.'
      },
      {
        kind: 'CONCEITO',
        title: 'PAEFI',
        body: 'Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos — estruturante do CREAS.'
      },
      {
        kind: 'DICA',
        body: 'Mnemônico: CRA**S** = **S**em violação (prevenção) · CREA**S** = direito**S** violado**S**. PAIF anda com CRAS; PAEFI anda com CREAS.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'porta de entrada do SUAS' },
      { kind: 'PALAVRA_CHAVE', title: 'PAIF/CRAS · PAEFI/CREAS' }
    ]
  },
  {
    disciplineSlug: 'licitacoes',
    topic: 'Modalidades de licitação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Modalidades da Lei 14.133/2021',
        body:
          '# Modalidades — Lei 14.133/2021 (art. 28)\n\n' +
          '1. **Pregão** — obrigatório para bens e serviços **comuns**\n' +
          '2. **Concorrência** — bens e serviços especiais; obras\n' +
          '3. **Concurso** — trabalho técnico, científico ou artístico (prêmio/remuneração)\n' +
          '4. **Leilão** — alienação de bens\n' +
          '5. **Diálogo competitivo** — inovação técnica/tecnológica; a Administração dialoga com os licitantes\n\n' +
          '## O que MORREU com a lei nova\n' +
          '- ~~Tomada de preços~~ e ~~Convite~~ — **extintas**\n\n' +
          '## Regra de fases (art. 17)\n' +
          'Em regra, **julgamento antes da habilitação** (inversão de fases), salvo decisão motivada.'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Contratação direta',
        reference: 'Lei 14.133/2021, arts. 74 e 75',
        body: '**Inexigibilidade** (art. 74): competição **inviável** (ex.: fornecedor exclusivo, artista consagrado). **Dispensa** (art. 75): competição possível, mas a lei autoriza a contratação direta (pequeno valor, emergência etc.).'
      },
      {
        kind: 'DICA',
        body: 'Se a questão citar "tomada de preços" ou "convite" como modalidade da 14.133 → errada. São da lei antiga (8.666/93).'
      },
      {
        kind: 'PEGADINHA',
        body: 'Inexigibilidade × dispensa: pergunte-se "a competição é possível?" — impossível = INexigibilidade; possível mas afastada por lei = dispensa.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'pregão = bens/serviços comuns' },
      { kind: 'PALAVRA_CHAVE', title: 'diálogo competitivo = inovação' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Regência verbal e nominal; crase',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Crase — regras de ouro',
        body:
          '# Crase (à = preposição a + artigo a)\n\n' +
          '## Casos PROIBIDOS (nunca há crase)\n' +
          '- Antes de palavra **masculina** (*a pé, a cavalo*)\n' +
          '- Antes de **verbo** (*disposto a ajudar*)\n' +
          '- Antes de **pronome pessoal** (*refiro-me a ela*)\n' +
          '- Entre palavras **repetidas** (*cara a cara*)\n' +
          '- Antes de plural com "a" singular (*a pessoas*)\n\n' +
          '## Casos OBRIGATÓRIOS\n' +
          '- Horas determinadas (*às 8h, das 9h às 17h*)\n' +
          '- Locuções femininas (*à noite, às vezes, à medida que*)\n' +
          '- "à moda de" mesmo oculta (*bife à parmegiana*)\n\n' +
          '## Teste rápido\n' +
          'Troque a palavra feminina por uma masculina: se "a" virar "ao", há crase. *Vou à escola → vou ao colégio* ✔'
      },
      {
        kind: 'CONCEITO',
        title: 'Regências que a banca ama',
        body: '**Assistir a** (ver) · **obedecer a** · **aspirar a** (desejar) · **visar a** (objetivar) · **preferir X a Y** (nunca "do que") · **chegar a** (não "em").'
      },
      {
        kind: 'PEGADINHA',
        body: '"Prefiro mais estudar do que descansar" — **ERRADO** duas vezes: "preferir" não aceita "mais" nem "do que". Correto: *prefiro estudar a descansar*.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'teste do "ao"' },
      { kind: 'PALAVRA_CHAVE', title: 'preferir X a Y' }
    ]
  },
  {
    disciplineSlug: 'primeiros-socorros',
    topic: 'Parada cardiorrespiratória e RCP',
    entries: [
      {
        kind: 'RESUMO',
        title: 'RCP no adulto — números que caem',
        body:
          '# RCP — Suporte Básico de Vida (adulto)\n\n' +
          '## Cadeia: segurança da cena → responsividade → acionar 192/SAMU → RCP → DEA\n\n' +
          '| Parâmetro | Valor |\n| --- | --- |\n' +
          '| Relação compressão:ventilação | **30:2** |\n' +
          '| Frequência | **100–120/min** |\n' +
          '| Profundidade | **5–6 cm** |\n' +
          '| DEA | usar **assim que disponível** |\n\n' +
          'Permitir o **retorno total do tórax** entre compressões e **minimizar interrupções**.'
      },
      {
        kind: 'CONCEITO',
        title: 'Posição lateral de segurança',
        body: 'Indicada para vítima **inconsciente que respira** (sem suspeita de trauma de coluna): mantém vias aéreas pérvias e previne aspiração.'
      },
      {
        kind: 'DICA',
        body: 'Telefones: **192** SAMU · 193 Bombeiros · 190 PM. A banca troca os números.'
      },
      {
        kind: 'PEGADINHA',
        body: '"15:2 no adulto com 1 socorrista" — **ERRADO**: é 30:2. (15:2 é exceção pediátrica com 2 socorristas.)'
      },
      { kind: 'PALAVRA_CHAVE', title: '30:2 · 100-120/min · 5-6 cm' }
    ]
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Princípios da Administração Pública (LIMPE)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'LIMPE aplicado',
        body:
          '# Princípios do art. 37, caput, CF/88\n\n' +
          '- **L**egalidade — o administrador só faz o que a lei autoriza\n' +
          '- **I**mpessoalidade — sem promoção pessoal; finalidade pública\n' +
          '- **M**oralidade — honestidade e boa-fé além da lei\n' +
          '- **P**ublicidade — transparência, salvo sigilos legais\n' +
          '- **E**ficiência — incluída pela **EC 19/1998**\n\n' +
          'Publicidade dos atos: caráter **educativo/informativo**, vedados nomes, símbolos ou imagens que caracterizem **promoção pessoal** (art. 37, §1º).'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Princípios expressos',
        reference: 'CF/88, art. 37, caput',
        body: 'A administração pública direta e indireta de qualquer dos Poderes obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Colocar "razoabilidade" ou "supremacia do interesse público" no LIMPE — são princípios **implícitos**, não do caput do art. 37.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'eficiência = EC 19/98' },
      { kind: 'PALAVRA_CHAVE', title: 'legalidade estrita do administrador' }
    ]
  },
  {
    disciplineSlug: 'arquivologia',
    topic: 'Tipos de arquivo (corrente, intermediário, permanente)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Teoria das três idades',
        body:
          '# Ciclo de vida documental\n\n' +
          '| Idade | Uso | Destino |\n| --- | --- | --- |\n' +
          '| **Corrente** | frequente, em tramitação | setor/protocolo |\n' +
          '| **Intermediário** | pouco frequente, aguarda prazo | eliminação ou recolhimento |\n' +
          '| **Permanente** | valor histórico/probatório | guarda **definitiva** — nunca eliminar |\n\n' +
          'O instrumento que define prazos e destinação é a **tabela de temporalidade**.\n\n' +
          '**Valor primário** = administrativo/uso corrente · **Valor secundário** = histórico/probatório (permanente).'
      },
      {
        kind: 'CONCEITO',
        title: 'Protocolo',
        body: 'Rotinas de **recebimento, registro, classificação, autuação, distribuição e controle da tramitação** de documentos.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Documentos permanentes podem ser eliminados após digitalização" — **ERRADO**: valor secundário impõe guarda definitiva.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'três idades' },
      { kind: 'PALAVRA_CHAVE', title: 'tabela de temporalidade' }
    ]
  }
]
