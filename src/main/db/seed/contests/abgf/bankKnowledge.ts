// M29 — Conhecimento (apostila premium) para as disciplinas de CG que estavam
// com 0% de cobertura na ABGF (LP, Inglês, Direito, Sustentabilidade, Noções de
// Análise de Dados). APENAS DADOS; idempotente POR TÓPICO (só insere onde o
// tópico ainda não tem conhecimento). Foco no que "ajuda na prova".
import type { SeedTopicKnowledge } from '../types'

export const ABGF_BANK_KNOWLEDGE: SeedTopicKnowledge[] = [
  // ───────────────────── Língua Portuguesa ─────────────────────
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras: sinonímia, antonímia, polissemia, denotação e conotação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Semântica essencial para prova',
        body:
          '# Significação das palavras\n\n' +
          '| Fenômeno | Definição | Exemplo |\n| --- | --- | --- |\n' +
          '| **Sinonímia** | sentidos próximos | belo / bonito |\n' +
          '| **Antonímia** | sentidos opostos | alto / baixo |\n' +
          '| **Polissemia** | uma palavra, vários sentidos | *banco* (assento / instituição) |\n' +
          '| **Homonímia** | grafia/som iguais, sentidos distintos | *manga* (fruta / da camisa) |\n' +
          '| **Denotação** | sentido literal, do dicionário | "a água ferveu" |\n' +
          '| **Conotação** | sentido figurado, contextual | "ferveu de raiva" |\n\n' +
          'A banca cobra reconhecer se o termo está em sentido **próprio (denotativo)** ou **figurado (conotativo)** e distinguir **polissemia** (mesma palavra) de **homonímia**.'
      },
      { kind: 'CONCEITO', title: 'Polissemia × homonímia', body: 'Polissemia: uma MESMA palavra com sentidos relacionados por extensão (cabeça do corpo / cabeça da fila). Homonímia: palavras DIFERENTES que coincidem na forma (são/são/são).' },
      { kind: 'DICA', body: 'Textos publicitários e literários exploram a CONOTAÇÃO; textos técnicos/jornalísticos tendem à DENOTAÇÃO. O contexto define o sentido.' },
      { kind: 'PEGADINHA', body: '"Toda linguagem figurada é conotação" — cuidado: a conotação é o sentido figurado, mas há figuras (como a metonímia) que a banca pode nomear especificamente.' },
      { kind: 'PALAVRA_CHAVE', title: 'denotação = literal · conotação = figurado' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Concordância verbal e nominal',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Concordância — casos que a FCC ama',
        body:
          '# Concordância verbal e nominal\n\n' +
          '## Verbos impessoais (sempre no singular)\n' +
          '- **Haver** = existir/ocorrer: "*Havia* muitos candidatos".\n' +
          '- **Fazer/Haver** indicando tempo: "*Faz* dois anos", "*Há* meses".\n\n' +
          '## Voz passiva sintética (SE apassivador)\n' +
          'O verbo concorda com o sujeito: "Aluga**m**-se casas" (= casas são alugadas).\n\n' +
          '## Sujeito composto\n' +
          '- Antes do verbo → plural: "João e Maria *chegaram*".\n' +
          '- Após o verbo → pode concordar com o mais próximo.\n\n' +
          '## Concordância nominal\n' +
          '- "É proibido entrada" (sem artigo) × "É proibid**a** *a* entrada" (com artigo).\n' +
          '- "Anexo/incluso" concordam: "Seguem anex**as** as planilhas".'
      },
      { kind: 'PEGADINHA', body: '"Houveram problemas" está ERRADO. "Haver" (existir) é impessoal: "Houve problemas". O erro é clássico em prova.' },
      { kind: 'PEGADINHA', body: '"Fazem cinco anos" está ERRADO. "Fazer" indicando tempo é impessoal: "Faz cinco anos".' },
      { kind: 'DICA', body: 'Se aparecer "que se trata" veja se é passiva (concorda) ou índice de indeterminação do sujeito (verbo no singular): "Precisa-se de funcionários".' },
      { kind: 'PALAVRA_CHAVE', title: 'haver/fazer impessoais = singular' }
    ]
  },

  // ───────────────────── Língua Inglesa ─────────────────────
  {
    disciplineSlug: 'lingua-inglesa',
    topic: 'Estratégias de leitura: informações específicas, inferência e predição, organização semântica e discursiva',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Reading strategies para a prova de inglês',
        body:
          '# Reading strategies\n\n' +
          '| Estratégia | O que é | Uso |\n| --- | --- | --- |\n' +
          '| **Skimming** | leitura rápida pela ideia geral | captar o tema/tópico |\n' +
          '| **Scanning** | varredura por dado específico | achar data, número, nome |\n' +
          '| **Prediction** | prever o conteúdo por título/imagens | ativar conhecimento prévio |\n' +
          '| **Inference** | deduzir o não dito explicitamente | "reading between the lines" |\n' +
          '| **Cognates** | palavras semelhantes ao português | *information*, *analysis* |\n\n' +
          'Cuidado com **false friends** (falsos cognatos): *actually* = na verdade (não "atualmente"); *pretend* = fingir (não "pretender"); *library* = biblioteca (não "livraria").'
      },
      { kind: 'CONCEITO', title: 'Skimming × Scanning', body: 'Skimming busca a ideia GERAL (visão do todo). Scanning busca informação ESPECÍFICA (um dado pontual). São as duas estratégias mais cobradas.' },
      { kind: 'PEGADINHA', body: 'False friends derrubam candidato: *comprehensive* = abrangente (não "compreensivo"); *eventually* = por fim (não "eventualmente").' },
      { kind: 'PALAVRA_CHAVE', title: 'skimming=geral · scanning=específico · false friends' }
    ]
  },

  // ───────────────────── Direito Constitucional e Administrativo ─────────────────────
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Regime jurídico-administrativo: princípios expressos e implícitos da Administração Pública',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Princípios da Administração Pública',
        body:
          '# Princípios da Administração\n\n' +
          '## Expressos (art. 37, caput, CF) — "LIMPE"\n' +
          '**L**egalidade · **I**mpessoalidade · **M**oralidade · **P**ublicidade · **E**ficiência.\n\n' +
          '## Implícitos (doutrina/jurisprudência)\n' +
          '- **Supremacia do interesse público** sobre o privado.\n' +
          '- **Indisponibilidade** do interesse público.\n' +
          '- **Autotutela** (Súmulas 346 e 473 STF): a Administração anula seus atos ilegais e revoga os inconvenientes.\n' +
          '- **Razoabilidade e proporcionalidade**, **motivação**, **segurança jurídica**, **continuidade** do serviço público.'
      },
      { kind: 'LEGISLACAO', reference: 'CF/1988, art. 37, caput', body: 'A administração pública direta e indireta obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência.' },
      { kind: 'CONCEITO', title: 'Autotutela', body: 'Poder-dever de a própria Administração rever seus atos: ANULA os ilegais (efeito ex tunc) e REVOGA os inconvenientes/inoportunos (efeito ex nunc), sem precisar do Judiciário.' },
      { kind: 'PEGADINHA', body: 'Legalidade para o PARTICULAR: pode fazer tudo que a lei não proíbe. Para a ADMINISTRAÇÃO: só pode fazer o que a lei autoriza. Não confundir os dois sentidos.' },
      { kind: 'PALAVRA_CHAVE', title: 'LIMPE (expressos) · supremacia/indisponibilidade/autotutela (implícitos)' }
    ]
  },
  {
    disciplineSlug: 'direito-const-adm',
    topic: 'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Ato administrativo — requisitos e extinção',
        body:
          '# Ato administrativo\n\n' +
          '## Requisitos ("CO-FI-FO-MO-OB")\n' +
          '**Co**mpetência · **Fi**nalidade · **Fo**rma · **Mo**tivo · **Ob**jeto. Vícios em competência e forma podem ser **convalidados**; vícios em finalidade, motivo e objeto **não**.\n\n' +
          '## Atributos ("PATI")\n' +
          '**P**resunção de legitimidade · **A**utoexecutoriedade · **T**ipicidade · **I**mperatividade.\n\n' +
          '## Extinção\n' +
          '| | Anulação | Revogação |\n| --- | --- | --- |\n' +
          '| Motivo | ilegalidade | conveniência/oportunidade |\n' +
          '| Quem | Administração ou Judiciário | só a Administração |\n' +
          '| Efeitos | **ex tunc** (retroage) | **ex nunc** (não retroage) |'
      },
      { kind: 'CONCEITO', title: 'Convalidação', body: 'Ato pelo qual a Administração corrige vício sanável (competência ou forma), com efeitos retroativos, preservando o ato. Vícios de finalidade, motivo e objeto são insanáveis.' },
      { kind: 'PEGADINHA', body: 'Anulação = efeito ex TUNC (retroage, pois o ato era ilegal desde a origem). Revogação = ex NUNC (respeita efeitos já produzidos por ato que era válido). Trocar isso é o erro mais cobrado.' },
      { kind: 'PALAVRA_CHAVE', title: 'requisitos CO-FI-FO-MO-OB · atributos PATI' }
    ]
  },

  // ───────────────────── Sustentabilidade / ASG ─────────────────────
  {
    disciplineSlug: 'sustentabilidade-asg',
    topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Agenda 2030 e ASG (ESG)',
        body:
          '# Agenda 2030 e ASG\n\n' +
          '## Agenda 2030 (ONU, 2015)\n' +
          '- **17 ODS** e **169 metas**; sucedem os 8 ODM (Objetivos do Milênio).\n' +
          '- Três dimensões: **econômica, social e ambiental**.\n\n' +
          '## ASG / ESG\n' +
          '| Pilar | Exemplos |\n| --- | --- |\n' +
          '| **A**mbiental | emissões, água, resíduos, clima |\n' +
          '| **S**ocial | trabalho, diversidade, comunidades |\n' +
          '| **G**overnança | ética, transparência, conselho, compliance |\n\n' +
          'Relevância ao setor financeiro: **risco socioambiental e climático** (Resoluções CMN 4.557/2017 e 4.945/2021 — PRSAC), finanças sustentáveis (green bonds, taxonomia).'
      },
      { kind: 'CONCEITO', title: 'PRSAC', body: 'Política de Responsabilidade Social, Ambiental e Climática das instituições financeiras, exigida pela Resolução CMN nº 4.945/2021, para integrar esses riscos à gestão.' },
      { kind: 'PEGADINHA', body: 'São 17 ODS (não 8). Os 8 eram os antigos ODM (2000–2015). A banca troca os números.' },
      { kind: 'PALAVRA_CHAVE', title: '17 ODS · 169 metas · ASG = Ambiental/Social/Governança' }
    ]
  },

  // ───────────────────── Noções de Análise de Dados ─────────────────────
  {
    disciplineSlug: 'nocoes-analise-dados',
    topic: 'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'CRISP-DM — as 6 fases',
        body:
          '# CRISP-DM\n\n' +
          '1. **Business Understanding** — entender o problema e os objetivos de negócio.\n' +
          '2. **Data Understanding** — coletar e explorar os dados.\n' +
          '3. **Data Preparation** — limpar, integrar e transformar (fase mais demorada).\n' +
          '4. **Modeling** — aplicar algoritmos/modelos.\n' +
          '5. **Evaluation** — avaliar se o modelo atende ao objetivo de negócio.\n' +
          '6. **Deployment** — implantar e monitorar.\n\n' +
          'É um ciclo **iterativo** — pode-se voltar a fases anteriores.'
      },
      { kind: 'CONCEITO', title: 'Fase mais custosa', body: 'A preparação de dados (limpeza, tratamento de outliers, dados faltantes, padronização) costuma consumir a maior parte do tempo do projeto.' },
      { kind: 'DICA', body: 'A prova cobra a ORDEM: começa por NEGÓCIO (não por dados) e termina em IMPLANTAÇÃO. Decore a sequência.' },
      { kind: 'PEGADINHA', body: 'O CRISP-DM inicia entendendo o NEGÓCIO, não coletando dados. Quem começa pelos dados erra a primeira fase.' },
      { kind: 'PALAVRA_CHAVE', title: 'negócio → dados → preparação → modelagem → avaliação → implantação' }
    ]
  }
]
