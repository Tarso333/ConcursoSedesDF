// Base inicial de questões do IBGE 2026 (ACS) — itens ORIGINAIS no estilo
// IBFC (múltipla escolha, 5 alternativas, foco conceitual e lei seca), com
// comentário justificando a correta e as incorretas. Não reproduz provas.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo IBFC)'

export const IBGE_QUESTIONS: SeedQuestion[] = [
  // ───────── Administração / Situações Gerenciais ─────────
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Funções administrativas',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'No processo administrativo, a função responsável por medir os resultados, compará-los com o que foi planejado e corrigir eventuais desvios é a de:',
    options: [
      { text: 'planejamento.' },
      { text: 'organização.' },
      { text: 'direção.' },
      { text: 'controle.', correct: true },
      { text: 'previsão.' }
    ],
    explanation:
      'CORRETA: "d". O CONTROLE mede, compara com o planejado e corrige desvios, realimentando o ciclo PODC. "a" define objetivos; "b" estrutura recursos; "c" conduz as pessoas; "e" (previsão) integra o planejamento na visão de Fayol, mas não é a função de correção.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Motivação, comunicação e liderança',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Segundo a Teoria dos Dois Fatores de Herzberg, o aumento salarial concedido a um agente censitário atua como fator:',
    options: [
      { text: 'motivacional, pois eleva a satisfação de forma duradoura.' },
      { text: 'higiênico, pois evita a insatisfação, mas não é fonte de motivação.', correct: true },
      { text: 'de autorrealização, no topo da hierarquia de Maslow.' },
      { text: 'intrínseco ao conteúdo do trabalho.' },
      { text: 'de liderança situacional.' }
    ],
    explanation:
      'CORRETA: "b". Para Herzberg, salário, condições de trabalho e chefia são fatores HIGIÊNICOS (extrínsecos): evitam a insatisfação, mas não motivam. "a"/"d" — motivacionais são reconhecimento, responsabilidade, crescimento (intrínsecos); "c" mistura Maslow; "e" é tema de liderança, não de motivação.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Responsabilidade, coordenação, autoridade, poder e delegação',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre a delegação no contexto gerencial, assinale a alternativa correta.',
    options: [
      { text: 'Ao delegar, o gestor transfere ao subordinado a responsabilidade final pela tarefa.' },
      { text: 'A delegação transfere autoridade e execução, mas a responsabilidade final permanece com quem delega.', correct: true },
      { text: 'Delegar significa abrir mão de toda a autoridade sobre a área.' },
      { text: 'A delegação só é possível entre gestores do mesmo nível hierárquico.' },
      { text: 'Delegação e centralização são sinônimos.' }
    ],
    explanation:
      'CORRETA: "b". Delega-se a autoridade e a execução necessárias; a responsabilidade perante o superior PERMANECE com o delegante. "a" inverte a regra; "c" exagera (delega-se o suficiente para a tarefa); "d" a delegação é descendente na hierarquia; "e" delegação é forma de descentralizar, não seu sinônimo.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Um supervisor conseguiu concluir o recenseamento de sua área utilizando menos recursos e menos tempo do que o previsto. Considerando os conceitos de administração, ele demonstrou:',
    options: [
      { text: 'eficácia, pois atingiu o objetivo.' },
      { text: 'eficiência, pois otimizou o uso dos recursos (meios).', correct: true },
      { text: 'efetividade, pois gerou impacto social.' },
      { text: 'sinergia negativa.' },
      { text: 'amplitude de controle.' }
    ],
    explanation:
      'CORRETA: "b". Usar MENOS recursos/tempo = EFICIÊNCIA (foco nos meios). "a" eficácia é atingir o objetivo (fins) — que também ocorreu, mas o destaque do enunciado é a economia de recursos; "c" efetividade é o impacto duradouro; "d"/"e" não se aplicam ao enunciado.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Avaliação de desempenho',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Ao avaliar sua equipe, um supervisor deixou que a excelente pontualidade de um recenseador influenciasse positivamente a nota de todos os demais critérios, mesmo sem relação. Esse vício de avaliação é o efeito:',
    options: [
      { text: 'de tendência central.' },
      { text: 'de recência.' },
      { text: 'halo.', correct: true },
      { text: 'de leniência.' },
      { text: 'de contraste.' }
    ],
    explanation:
      'CORRETA: "c". O efeito HALO ocorre quando UMA característica (boa ou má) contamina o julgamento das demais. "a" tendência central = avaliar todos como medianos; "b" recência = pesar só fatos recentes; "d" leniência = notas altas para todos; "e" contraste = comparar avaliados entre si.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Compromisso com a qualidade nos serviços prestados',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'O ciclo PDCA, ferramenta central da melhoria contínua da qualidade, é composto pelas etapas:',
    options: [
      { text: 'Planejar, Delegar, Controlar, Avaliar.' },
      { text: 'Prever, Dirigir, Coordenar, Agir.' },
      { text: 'Planejar (Plan), Executar (Do), Verificar (Check), Agir (Act).', correct: true },
      { text: 'Produzir, Distribuir, Corrigir, Aprovar.' },
      { text: 'Planejar, Documentar, Comunicar, Arquivar.' }
    ],
    explanation:
      'CORRETA: "c". PDCA = Plan (planejar) → Do (executar) → Check (verificar) → Act (agir/corrigir e padronizar). As demais alternativas inventam siglas que não correspondem ao ciclo de Deming.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Processo decisório e resolução de problemas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'De acordo com o conceito de racionalidade limitada, proposto por Herbert Simon, o gestor, ao decidir:',
    options: [
      { text: 'conhece todas as alternativas e escolhe sempre a solução ótima.' },
      { text: 'decide com informação e tempo limitados, buscando uma solução satisfatória.', correct: true },
      { text: 'age exclusivamente por intuição, sem análise.' },
      { text: 'elimina toda incerteza antes de decidir.' },
      { text: 'transfere a decisão para um sistema automatizado.' }
    ],
    explanation:
      'CORRETA: "b". A racionalidade limitada reconhece limites de informação, tempo e capacidade cognitiva; o decisor busca a solução SATISFATÓRIA (satisficing), não a ótima. "a" descreve a racionalidade plena (irreal); "c"/"d"/"e" não correspondem ao conceito de Simon.',
    source: S
  },
  {
    disciplineSlug: 'administracao-situacoes-gerenciais',
    topic: 'Aspectos gerais da Administração; organizações como sistemas abertos',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Afirmar que a organização é um "sistema aberto" significa que ela:',
    options: [
      { text: 'não sofre qualquer influência do ambiente externo.' },
      { text: 'troca insumos e resultados com o ambiente, do qual recebe influência e ao qual responde.', correct: true },
      { text: 'funciona isoladamente, sem fornecedores nem clientes.' },
      { text: 'possui estrutura permanentemente imutável.' },
      { text: 'dispensa qualquer processo de controle.' }
    ],
    explanation:
      'CORRETA: "b". O enfoque sistêmico vê a organização como sistema ABERTO: entradas (recursos) → processamento → saídas, em interação e interdependência com o ambiente. "a"/"c" descrevem sistema fechado (irreal para organizações); "d"/"e" contrariam a adaptação e o controle.',
    source: S
  },
  // ───────── Língua Portuguesa ─────────
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Concordância nominal e verbal',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que a concordância verbal está correta.',
    options: [
      { text: 'Houveram muitos problemas na coleta.' },
      { text: 'Fazem dez anos que trabalho no IBGE.' },
      { text: 'Existiam pendências na área do supervisor.', correct: true },
      { text: 'Aluga-se casas para a equipe.' },
      { text: 'Tratam-se de questões operacionais.' }
    ],
    explanation:
      'CORRETA: "c". "Existir" é verbo pessoal e concorda com o sujeito ("pendências"). Erradas: "a" HAVER (existir) é impessoal → "Houve"; "b" FAZER (tempo) é impessoal → "Faz"; "d" passiva sintética → "Alugam-se casas"; "e" "tratar-se de" fica no singular → "Trata-se".',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Regência nominal e verbal',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Assinale a alternativa em que o sinal indicativo de crase está corretamente empregado.',
    options: [
      { text: 'O relatório foi entregue à supervisora responsável.', correct: true },
      { text: 'Iniciaremos a coleta à partir das 8 horas.' },
      { text: 'Entreguei o formulário à ele.' },
      { text: 'Estou disposto à colaborar com a equipe.' },
      { text: 'Fomos à uma reunião de alinhamento.' }
    ],
    explanation:
      'CORRETA: "a". "Entregue à supervisora" = preposição "a" + artigo "a" (palavra feminina determinada). Erradas: "b" "a partir de" nunca tem crase; "c" antes de pronome pessoal (ele) não há crase; "d" antes de verbo (colaborar) não há crase; "e" antes de artigo indefinido (uma) não há crase.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Significação das palavras',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'As palavras "ratificar" (confirmar) e "retificar" (corrigir) são exemplo de:',
    options: [
      { text: 'sinônimos.' },
      { text: 'antônimos.' },
      { text: 'parônimos, pois têm grafia e som parecidos, mas sentidos diferentes.', correct: true },
      { text: 'homônimos perfeitos.' },
      { text: 'polissemia.' }
    ],
    explanation:
      'CORRETA: "c". PARÔNIMOS são palavras parecidas na grafia/pronúncia, mas de sentidos distintos (ratificar × retificar; tráfego × tráfico). "a"/"b" não têm sentidos iguais nem opostos exatos; "d" homônimos têm grafia OU som idênticos; "e" polissemia é uma palavra com vários sentidos.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Conforme o Manual de Redação Oficial, o fecho adequado para um ofício dirigido a uma autoridade hierarquicamente superior é:',
    options: [
      { text: 'Atenciosamente.' },
      { text: 'Respeitosamente.', correct: true },
      { text: 'Cordialmente.' },
      { text: 'Abraços.' },
      { text: 'Saudações.' }
    ],
    explanation:
      'CORRETA: "b". "Respeitosamente" é o fecho para autoridades SUPERIORES; "Atenciosamente" (alternativa a) é para mesma hierarquia ou inferiores. "c"/"d"/"e" não são fechos previstos no padrão ofício.',
    source: S
  },
  {
    disciplineSlug: 'lingua-portuguesa',
    topic: 'Compreensão e interpretação de texto',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'No período "Embora a área fosse extensa, a equipe concluiu a coleta no prazo", a conjunção "embora" estabelece relação de:',
    options: [
      { text: 'causa.' },
      { text: 'concessão.', correct: true },
      { text: 'conclusão.' },
      { text: 'condição.' },
      { text: 'finalidade.' }
    ],
    explanation:
      'CORRETA: "b". "Embora" é conjunção CONCESSIVA: admite um obstáculo que não impede o fato principal (a coleta foi concluída apesar da área extensa). "a" seria "porque"; "c" "portanto"; "d" "se"; "e" "para que".',
    source: S
  },
  // ───────── Raciocínio Lógico Quantitativo ─────────
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Áreas avaliadas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A negação lógica da proposição "Todo agente censitário entregou o relatório" é:',
    options: [
      { text: 'Nenhum agente censitário entregou o relatório.' },
      { text: 'Todo agente censitário não entregou o relatório.' },
      { text: 'Pelo menos um agente censitário não entregou o relatório.', correct: true },
      { text: 'Alguns agentes censitários entregaram o relatório.' },
      { text: 'Nenhum agente censitário deixou de entregar o relatório.' }
    ],
    explanation:
      'CORRETA: "c". A negação de "Todo A é B" é "Algum A NÃO é B" (basta um contraexemplo). "a"/"b" afirmam demais (nenhum/todos não); "d" não nega a universal; "e" reforça a afirmativa original.',
    source: S
  },
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Áreas avaliadas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A proposição condicional "Se choveu, então a coleta foi adiada" é logicamente equivalente a:',
    options: [
      { text: 'Se a coleta foi adiada, então choveu.' },
      { text: 'Se não choveu, então a coleta não foi adiada.' },
      { text: 'Se a coleta não foi adiada, então não choveu.', correct: true },
      { text: 'Choveu e a coleta não foi adiada.' },
      { text: 'Não choveu ou a coleta não foi adiada.' }
    ],
    explanation:
      'CORRETA: "c". A equivalente de p→q é a CONTRAPOSITIVA ~q→~p: "Se a coleta não foi adiada, então não choveu". "a" é a recíproca (não equivale); "b" é a inversa (não equivale); "d" é a NEGAÇÃO de p→q; "e" equivale a ~p ∨ ~q, que não é p→q.',
    source: S
  },
  // ───────── Conhecimentos Técnicos ─────────
  {
    disciplineSlug: 'conhecimentos-tecnicos-censo',
    topic: 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'As informações prestadas pelos informantes ao IBGE, nos termos da legislação estatística, caracterizam-se por:',
    options: [
      { text: 'serem públicas e passíveis de divulgação individualizada.' },
      { text: 'terem caráter sigiloso e uso exclusivo para fins estatísticos.', correct: true },
      { text: 'poderem ser compartilhadas com órgãos de fiscalização tributária.' },
      { text: 'dispensarem qualquer proteção de dados pessoais.' },
      { text: 'pertencerem ao supervisor que coletou os dados.' }
    ],
    explanation:
      'CORRETA: "b". O sigilo estatístico (Lei nº 5.534/1968) garante que os dados individuais são sigilosos e usados apenas para fins estatísticos, não podendo ser divulgados de forma identificada. As demais violam o sigilo e a finalidade estatística.',
    source: S
  },
  {
    disciplineSlug: 'conhecimentos-tecnicos-censo',
    topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Entre as atribuições do Agente Censitário Supervisor (ACS) no Censo Agropecuário, destaca-se:',
    options: [
      { text: 'elaborar a metodologia estatística nacional do Censo.' },
      { text: 'distribuir cargas de trabalho, roteirizar equipes e monitorar produtividade, cobertura e pendências.', correct: true },
      { text: 'definir o orçamento federal do IBGE.' },
      { text: 'julgar recursos administrativos do processo seletivo.' },
      { text: 'aprovar a contratação definitiva de servidores efetivos.' }
    ],
    explanation:
      'CORRETA: "b". O ACS coordena as equipes de campo: distribui cargas, roteiriza, monitora produtividade/cobertura/pendências e adota ações corretivas, além de mediar resistências. As demais são atribuições de outras instâncias, não do supervisor de campo.',
    source: S
  }
]
