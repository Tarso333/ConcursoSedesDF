// Conhecimento do IBGE 2026 (ACS) — conteúdo técnico autoral no estilo IBFC
// (conceitual + lei seca objetiva). Apenas DADOS (M15). Foco no bloco
// específico de maior peso (Administração/Situações Gerenciais, 20 questões) +
// pontos-chave de Português, RLQ e dos conhecimentos técnicos do Censo.
import type { SeedTopicKnowledge } from '../types'

export const IBGE_KNOWLEDGE: SeedTopicKnowledge[] = [
  // ═══════════ Administração / Situações Gerenciais ═══════════
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Funções administrativas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'As funções administrativas — PODC',
        body:
          '# Processo administrativo (PODC)\n\n' +
          'O processo administrativo clássico tem quatro funções encadeadas e cíclicas:\n\n' +
          '| Função | O que faz |\n| --- | --- |\n' +
          '| **Planejamento** | define objetivos e os meios para alcançá-los (o que fazer e como) |\n' +
          '| **Organização** | estrutura recursos e distribui tarefas/autoridade (quem faz o quê) |\n' +
          '| **Direção** | conduz e motiva as pessoas para executar (liderança, comunicação) |\n' +
          '| **Controle** | mede resultados, compara com o planejado e corrige desvios |\n\n' +
          'Fayol descreveu originalmente cinco funções (previsão/planejamento, organização, **comando**, **coordenação** e controle); a síntese moderna consolida em **PODC**. O ciclo é contínuo: o controle realimenta o planejamento.'
      },
      {
        kind: 'CONCEITO',
        title: 'Níveis de planejamento',
        body: 'Estratégico (longo prazo, toda a organização), tático (médio prazo, por área/departamento) e operacional (curto prazo, tarefas específicas). O supervisor de campo atua sobretudo no nível operacional.'
      },
      {
        kind: 'DICA',
        body: 'Decore a ordem PODC e o par de cada função: Planejar=objetivos, Organizar=estrutura, Dirigir=pessoas, Controlar=correção. A IBFC cobra "qual função corrige desvios?" → CONTROLE.'
      },
      {
        kind: 'PEGADINHA',
        body: '"O controle é a primeira função do processo administrativo" — ERRADO: a primeira é o PLANEJAMENTO; o controle é a última e realimenta o ciclo.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'PODC · Fayol · controle corrige' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Motivação, comunicação e liderança',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Motivação e liderança — teorias que caem',
        body:
          '# Motivação\n\n' +
          '- **Maslow (hierarquia de necessidades)**: fisiológicas → segurança → sociais → estima → autorrealização. Só motiva a necessidade ainda não satisfeita.\n' +
          '- **Herzberg (dois fatores)**: **higiênicos** (salário, condições, chefia) evitam a insatisfação, mas NÃO motivam; **motivacionais** (reconhecimento, responsabilidade, crescimento) é que geram satisfação.\n' +
          '- **McGregor (Teoria X e Y)**: X = pessoas evitam trabalho (controle rígido); Y = pessoas buscam responsabilidade (participação).\n\n' +
          '# Liderança\n' +
          '- Estilos clássicos (White & Lippitt): **autocrático** (decide sozinho), **democrático** (decide com a equipe), **liberal/laissez-faire** (deixa a equipe decidir).\n' +
          '- **Liderança situacional** (Hersey-Blanchard): o estilo se adapta à MATURIDADE do liderado (dirigir → orientar → apoiar → delegar).'
      },
      {
        kind: 'CONCEITO',
        title: 'Fatores higiênicos × motivacionais (Herzberg)',
        body: 'Higiênicos são EXTRÍNSECOS (contexto do trabalho) e só evitam insatisfação; motivacionais são INTRÍNSECOS (conteúdo do trabalho) e produzem satisfação. Aumentar salário não "motiva" no modelo de Herzberg.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Segundo Herzberg, um bom salário é fator motivacional" — ERRADO: salário é fator HIGIÊNICO (evita insatisfação, não motiva).'
      },
      {
        kind: 'DICA',
        body: 'Liderança situacional = adaptar o estilo à maturidade da equipe. Para o supervisor de recenseadores novatos, o estilo tende a ser mais diretivo; com equipe experiente, delegar.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Maslow · Herzberg higiênico×motivacional · Teoria X/Y' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Processo decisório e resolução de problemas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Processo decisório',
        body:
          '# Processo decisório\n\n' +
          'Etapas: identificar o problema → gerar alternativas → avaliar → escolher → implementar → avaliar resultados.\n\n' +
          '## Racionalidade limitada (Simon)\n' +
          'O decisor não conhece TODAS as alternativas nem consequências; decide com informação e tempo limitados, buscando a solução **satisfatória** (satisficing), não necessariamente a ótima.\n\n' +
          '## Tipos de decisão\n' +
          '- **Programadas**: rotineiras, repetitivas, seguem procedimento (ex.: repor material).\n' +
          '- **Não programadas**: novas, complexas, exigem julgamento (ex.: conflito inédito em campo).\n\n' +
          'Condições: certeza, risco (probabilidades conhecidas) e incerteza.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Pela racionalidade limitada, o gestor sempre escolhe a alternativa ótima" — ERRADO: escolhe a SATISFATÓRIA, dadas as limitações de informação e tempo.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Simon · satisficing · programada × não programada' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Responsabilidade, coordenação, autoridade, poder e delegação',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Autoridade, poder e delegação',
        body:
          '# Autoridade × poder × delegação\n\n' +
          '- **Autoridade**: direito FORMAL de mandar, ligado ao CARGO (desce na hierarquia).\n' +
          '- **Poder**: capacidade REAL de influenciar, pode independer do cargo. Bases de French & Raven: legítimo, de recompensa, coercitivo, de referência (carisma) e de competência (perito).\n' +
          '- **Responsabilidade**: dever de executar/prestar contas.\n' +
          '- **Delegação**: transferir a EXECUÇÃO e a autoridade necessária a um subordinado. **Delega-se a autoridade, mas NÃO a responsabilidade final** — o chefe continua responsável perante seu superior.\n\n' +
          '**Centralização × descentralização**: concentrar × distribuir a tomada de decisão pelos níveis.'
      },
      {
        kind: 'CONCEITO',
        title: 'Amplitude de controle',
        body: 'Número de subordinados que um gestor consegue supervisionar eficazmente. Amplitude estreita → estrutura alta (muitos níveis); amplitude larga → estrutura achatada.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Ao delegar uma tarefa, o gestor transfere também a responsabilidade final por ela" — ERRADO: delega-se autoridade e execução; a responsabilidade perante o superior PERMANECE com quem delegou.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'delega autoridade, não responsabilidade · French & Raven' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Grupo × equipe e trabalho em equipe',
        body:
          '# Grupo × equipe\n\n' +
          '| | **Grupo** | **Equipe** |\n| --- | --- | --- |\n' +
          '| Meta | individuais somadas | comum e compartilhada |\n' +
          '| Responsabilidade | individual | individual E mútua |\n' +
          '| Sinergia | neutra | positiva (resultado > soma) |\n\n' +
          'Toda equipe é um grupo, mas nem todo grupo é equipe. **Sinergia** = o resultado do conjunto supera a soma dos esforços individuais.\n\n' +
          '## Eficiência × eficácia × efetividade\n' +
          '- **Eficiência**: fazer certo, com o mínimo de recursos (meios).\n' +
          '- **Eficácia**: atingir o objetivo (fins).\n' +
          '- **Efetividade**: impacto/transformação real e duradoura.'
      },
      {
        kind: 'DICA',
        body: 'Eficiência = MEIOS (fazer bem); eficácia = FINS (fazer a coisa certa); efetividade = IMPACTO. A IBFC troca eficiência↔eficácia com frequência.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Eficácia é usar o mínimo de recursos" — ERRADO: isso é EFICIÊNCIA. Eficácia é alcançar o resultado pretendido.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'grupo × equipe · sinergia · eficiência/eficácia/efetividade' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Avaliação de desempenho',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Avaliação de desempenho e seus vícios',
        body:
          '# Avaliação de desempenho\n\n' +
          'Processo sistemático de aferir o desempenho da pessoa no cargo e seu potencial. Métodos: escalas gráficas, incidentes críticos, **360°** (chefe, pares, subordinados e o próprio avaliado), por objetivos (APO).\n\n' +
          '## Vícios/erros de avaliação (muito cobrados)\n' +
          '- **Efeito halo/horn**: uma característica (boa/ruim) contamina o julgamento das demais.\n' +
          '- **Tendência central**: avaliar todos como "médios", evitando extremos.\n' +
          '- **Leniência/rigor**: avaliar todos alto (ou baixo) sistematicamente.\n' +
          '- **Recência**: pesar só os fatos recentes.\n' +
          '- **Preconceito/estereótipo**: viés por características pessoais.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Efeito halo é avaliar todos os funcionários como medianos" — ERRADO: isso é a TENDÊNCIA CENTRAL. Halo é deixar UMA característica influenciar as demais.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'halo · tendência central · recência · 360°' }
    ]
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Compromisso com a qualidade nos serviços prestados',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Qualidade e melhoria contínua',
        body:
          '# Qualidade nos serviços\n\n' +
          '- **Ciclo PDCA** (Deming): Plan (planejar) → Do (executar) → Check (verificar) → Act (agir/corrigir) — motor da melhoria CONTÍNUA.\n' +
          '- **Kaizen**: melhoria contínua e incremental, com participação de todos.\n' +
          '- **Foco no cliente/usuário**: qualidade é atender (e superar) as necessidades de quem recebe o serviço.\n' +
          '- Atendimento ao público: presteza, cortesia, empatia, clareza e resolução — a imagem da instituição depende disso.'
      },
      {
        kind: 'DICA',
        body: 'PDCA é o ciclo da melhoria contínua. "Check" = verificar resultados; "Act" = padronizar o que deu certo ou corrigir. IBFC adora ligar PDCA a "melhoria contínua".'
      },
      { kind: 'PALAVRA_CHAVE', title: 'PDCA · Kaizen · foco no cliente' }
    ]
  },
  // ═══════════ Língua Portuguesa (pontos de maior incidência) ═══════════
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Concordância nominal e verbal',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Concordância verbal — casos que caem',
        body:
          '# Concordância verbal\n\n' +
          '- **Haver** (= existir) e **fazer** (tempo) são IMPESSOAIS → ficam no SINGULAR: "Havia muitos candidatos"; "Faz dez anos".\n' +
          '- **Existir** é pessoal → concorda: "Existiam muitos candidatos".\n' +
          '- Partícula apassivadora **se**: o verbo concorda com o sujeito: "Alugam-se casas" (casas são alugadas).\n' +
          '- Índice de indeterminação do sujeito **se** (com VTI/VI): verbo no SINGULAR: "Precisa-se de agentes".\n' +
          '- Sujeito composto anteposto → plural; posposto → pode concordar com o mais próximo.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Houveram muitos inscritos" — ERRADO: HAVER no sentido de existir é impessoal → "Houve muitos inscritos". Já com "existir": "Existiram muitos inscritos".'
      },
      {
        kind: 'DICA',
        body: '"Alugam-se casas" (passiva, concorda) × "Precisa-se de agentes" (indeterminação, singular). Diferença: com preposição (VTI) → singular.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'haver/fazer impessoais · alugam-se × precisa-se' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Regência nominal e verbal',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Regência e crase',
        body:
          '# Regência e crase\n\n' +
          '- **Assistir** = ver: VTI, exige "a" ("assistir AO filme"); = ajudar: VTD ("assistir o doente").\n' +
          '- **Aspirar** = desejar: VTI ("aspirar AO cargo"); = cheirar: VTD.\n' +
          '- **Visar** = almejar: VTI ("visar AO cargo"); = mirar/dar visto: VTD.\n\n' +
          '## Crase (a + a)\n' +
          '- Ocorre antes de palavra feminina determinada: "Entreguei o formulário À supervisora".\n' +
          '- NÃO ocorre antes de verbo, de palavra masculina, de pronome pessoal nem na locução "a partir de".\n' +
          '- Antes de horas: "Às 10h" (determinado).'
      },
      {
        kind: 'PEGADINHA',
        body: '"Começaremos a coleta à partir das 10h" — ERRADO: "a partir de" NUNCA tem crase. Mas "às 10h" tem (horas determinadas).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'assistir/aspirar/visar VTI · crase' }
    ]
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Redação oficial — o essencial para o supervisor',
        body:
          '# Redação oficial\n\n' +
          '## Qualidades\n' +
          'Clareza, concisão, **impessoalidade**, formalidade, uso do padrão culto e uniformidade.\n\n' +
          '## Padrão ofício (Manual da Presidência, 3ª ed.)\n' +
          'Ofício, memorando e aviso foram UNIFICADOS no documento **ofício**. Estrutura: tipo/número, local e data, endereçamento, assunto, texto, fecho e assinatura.\n\n' +
          '## Fechos\n' +
          '- **Respeitosamente**: autoridade superior.\n- **Atenciosamente**: mesma hierarquia ou inferior.\n\n' +
          'Pronomes de tratamento concordam na **3ª pessoa** ("Vossa Senhoria deferiu").'
      },
      {
        kind: 'PEGADINHA',
        body: '"Na redação oficial, marcas pessoais e opinativas conferem clareza" — ERRADO: a redação oficial é IMPESSOAL; parte do serviço/órgão, sem marcas pessoais.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'impessoalidade · padrão ofício · fechos' }
    ]
  },
  // ═══════════ Raciocínio Lógico Quantitativo ═══════════
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Áreas avaliadas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Lógica proposicional e diagramas',
        body:
          '# Raciocínio lógico\n\n' +
          '## Condicional (p → q)\n' +
          'Só é FALSA quando `V → F`. Equivalências: `p → q ≡ ~q → ~p` (contrapositiva); negação: `~(p → q) ≡ p ∧ ~q`.\n\n' +
          '## Leis de De Morgan\n' +
          '`~(p ∧ q) ≡ ~p ∨ ~q` · `~(p ∨ q) ≡ ~p ∧ ~q`.\n\n' +
          '## Diagramas lógicos (quantificadores)\n' +
          '- Negação de "Todo A é B" = "Algum A NÃO é B".\n' +
          '- Negação de "Algum A é B" = "Nenhum A é B".\n' +
          '- "Todo" → um círculo dentro do outro; "Algum" → interseção; "Nenhum" → círculos separados.'
      },
      {
        kind: 'PEGADINHA',
        body: '"A negação de \'Todo agente é pontual\' é \'Nenhum agente é pontual\'" — ERRADO: é "ALGUM agente NÃO é pontual" (basta um contraexemplo).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'p→q falsa só em V→F · De Morgan · negação de "todo"' }
    ]
  },
  // ═══════════ Conhecimentos Técnicos (Censo — supervisão) ═══════════
  {
    disciplineSlug: 'conhecimentos-tecnicos-censo',
    topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências',
    entries: [
      {
        kind: 'RESUMO',
        title: 'O papel do Agente Censitário Supervisor (ACS)',
        body:
          '# Agente Censitário Supervisor (ACS)\n\n' +
          'Conforme as atribuições do Edital 01/2026, o ACS **coordena e supervisiona** as equipes de recenseadores e agentes no Censo Agropecuário, Florestal e Aquícola:\n\n' +
          '- **Distribuir cargas de trabalho** e **roteirizar** as equipes (recenseadores/ACS) pela área.\n' +
          '- **Monitorar** produtividade, cobertura, pendências e alertas, adotando ações corretivas.\n' +
          '- **Acompanhar em campo** as equipes, dirimindo dúvidas sobre a coleta.\n' +
          '- Tratar **resistências** escaladas, mediar com informantes e articular com autoridades/instituições locais.\n' +
          '- Acompanhar e verificar contratos de recenseadores e demais agentes; usar os sistemas/computadores nas rotinas.'
      },
      {
        kind: 'CONCEITO',
        title: 'Cobertura × produtividade',
        body: 'Cobertura = proporção da área/unidades já recenseadas frente ao total previsto. Produtividade = volume de coletas por período/recenseador. O supervisor equilibra os dois para cumprir o cronograma sem perder qualidade.'
      },
      {
        kind: 'OBSERVACAO',
        body: 'O conteúdo específico e detalhado de "Conhecimentos Técnicos" está na apostila oficial do 12º Censo Agropecuário (Anexo IV do edital, link externo). Estes blocos resumem o papel do supervisor a partir das atribuições descritas no próprio edital.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'roteirização · cobertura · produtividade · pendências' }
    ]
  },
  {
    disciplineSlug: 'conhecimentos-tecnicos-censo',
    topic: 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Coleta digital e transmissão de dados',
        body:
          '# Coleta com Dispositivo Móvel de Coleta (DMC)\n\n' +
          '- A coleta do Censo usa **dispositivos móveis** (smartphones/tablets) com o aplicativo de coleta.\n' +
          '- Operação **online/offline**: coleta-se offline em áreas sem sinal e **transmite-se** quando há conectividade (Wi-Fi/4G).\n' +
          '- **Logs e registros de transmissão** comprovam o envio das cargas — o supervisor acompanha pendências de transmissão.\n' +
          '- **Segurança da informação**: senhas, perfis de acesso, integridade e confidencialidade dos dados dos informantes (sigilo estatístico — Lei nº 5.534/1968).'
      },
      {
        kind: 'CONCEITO',
        title: 'Sigilo estatístico',
        body: 'As informações prestadas ao IBGE têm caráter sigiloso, são usadas exclusivamente para fins estatísticos e não podem ser divulgadas de forma individualizada (Lei nº 5.534/1968).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'DMC · online/offline · sigilo estatístico' }
    ]
  }
]
