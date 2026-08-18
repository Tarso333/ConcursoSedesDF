// M29 (3ª leva) — Elevar TODAS as disciplinas específicas a ~20 questões.
// Ênfase em DevOps e Gestão de TI (que estavam mais atrás) e reforço nas de
// maior peso. APENAS DADOS; idempotente por seed_key. Comentário alternativa
// por alternativa; dificuldade ~35% FÁCIL / 45% MÉDIO / 20% DIFÍCIL.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

const REDES = 'fundamentos-sistemas-redes'
const BD = 'banco-de-dados'
const SEG = 'seguranca-cibernetica'
const NUVEM = 'nuvem-infraestrutura'
const DEVOPS = 'devops-cicd'
const DADOS = 'dados-ml-ia'
const GTI = 'gestao-ti'

export const ABGF_BANK_ESPECIFICAS3: SeedQuestion[] = [
  // ════════════════════ DevOps, CI/CD e Automação (+14) ════════════════════
  {
    disciplineSlug: DEVOPS, topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)', type: 'ME', difficulty: 'FACIL',
    statement: 'O principal objetivo cultural do DevOps é:',
    options: [
      { text: 'separar rigidamente as equipes de desenvolvimento e operações.' },
      { text: 'integrar desenvolvimento e operações, com colaboração e automação para entregas frequentes e confiáveis.', correct: true },
      { text: 'eliminar a área de operações da empresa.' },
      { text: 'substituir todos os testes por revisões manuais.' },
      { text: 'impedir mudanças no código em produção.' }
    ],
    explanation:
      'A) ERRADA — DevOps derruba os silos, não os reforça. B) CORRETA — DevOps une Dev e Ops por cultura de colaboração, automação e feedback contínuo. C) ERRADA — não elimina Ops; integra suas responsabilidades. D) ERRADA — DevOps AMPLIA os testes automatizados. E) ERRADA — o objetivo é habilitar mudanças frequentes e seguras.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A diferença entre "entrega contínua" (Continuous Delivery) e "implantação contínua" (Continuous Deployment) é que:',
    options: [
      { text: 'são exatamente a mesma coisa.' },
      { text: 'na entrega contínua há uma aprovação manual antes de produção; na implantação contínua a ida a produção é automática.', correct: true },
      { text: 'a implantação contínua exige aprovação manual; a entrega contínua não.' },
      { text: 'nenhuma das duas usa pipeline automatizado.' },
      { text: 'a entrega contínua dispensa testes automatizados.' }
    ],
    explanation:
      'A) ERRADA — há uma distinção sutil, porém real. B) CORRETA — em Continuous Delivery o artefato fica pronto e um passo MANUAL libera para produção; em Continuous Deployment o deploy em produção é AUTOMÁTICO se passar nos testes. C) ERRADA — está invertido. D) ERRADA — ambas dependem de pipeline. E) ERRADA — ambas exigem testes automatizados confiáveis.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'DevSecOps: integração de segurança no ciclo de desenvolvimento', type: 'ME', difficulty: 'MEDIO',
    statement: 'O conceito de DevSecOps caracteriza-se por:',
    options: [
      { text: 'realizar a segurança apenas ao final, após a entrega em produção.' },
      { text: 'integrar a segurança em todas as fases do ciclo de desenvolvimento ("shift-left security").', correct: true },
      { text: 'transferir toda a responsabilidade de segurança para uma equipe externa.' },
      { text: 'eliminar a necessidade de testes de segurança automatizados.' },
      { text: 'tratar segurança como etapa opcional.' }
    ],
    explanation:
      'A) ERRADA — DevSecOps antecipa a segurança (shift-left), não a deixa para o fim. B) CORRETA — a segurança é incorporada desde o início e ao longo de todo o pipeline. C) ERRADA — a responsabilidade é compartilhada por todos, não terceirizada. D) ERRADA — DevSecOps AUMENTA a automação de testes de segurança (SAST/DAST). E) ERRADA — segurança passa a ser requisito, não opcional.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'DevSecOps: integração de segurança no ciclo de desenvolvimento', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A análise de segurança que inspeciona o código-fonte estaticamente, sem executá-lo, em busca de vulnerabilidades, é conhecida como:',
    options: [
      { text: 'DAST.' },
      { text: 'SAST (Static Application Security Testing).', correct: true },
      { text: 'pentest manual em produção.' },
      { text: 'fuzzing de rede.' },
      { text: 'code review de negócio.' }
    ],
    explanation:
      'A) ERRADA — o DAST testa a aplicação EM EXECUÇÃO (dinâmico), de fora. B) CORRETA — o SAST analisa o código-fonte de forma ESTÁTICA (sem executar). C) ERRADA — pentest é teste de intrusão, geralmente manual e dinâmico. D) ERRADA — fuzzing envia entradas aleatórias à aplicação em execução. E) ERRADA — code review de negócio avalia regras funcionais, não vulnerabilidades por análise estática automatizada.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab', type: 'ME', difficulty: 'FACIL',
    statement: 'No Git, o comando que cria uma nova ramificação de desenvolvimento isolada da principal é:',
    options: [
      { text: 'git merge.' },
      { text: 'git branch (ou git checkout -b).', correct: true },
      { text: 'git commit.' },
      { text: 'git status.' },
      { text: 'git log.' }
    ],
    explanation:
      'A) ERRADA — o merge INTEGRA ramos, não cria. B) CORRETA — git branch cria a ramificação; "checkout -b" cria e já muda para ela. C) ERRADA — o commit registra alterações. D) ERRADA — o status mostra o estado da árvore de trabalho. E) ERRADA — o log exibe o histórico de commits.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um "merge conflict" no Git ocorre quando:',
    options: [
      { text: 'dois desenvolvedores alteram a mesma parte de um arquivo de formas incompatíveis.', correct: true },
      { text: 'o repositório remoto está offline.' },
      { text: 'não há commits no repositório.' },
      { text: 'o arquivo é somente leitura.' },
      { text: 'o branch principal foi renomeado.' }
    ],
    explanation:
      'A) CORRETA — o conflito surge quando alterações concorrentes tocam a mesma região do arquivo e o Git não sabe qual manter. B) ERRADA — indisponibilidade do remoto causa erro de conexão, não conflito de merge. C) ERRADA — sem commits não há o que mesclar. D) ERRADA — atributo somente leitura é questão de permissão de arquivo. E) ERRADA — renomear branch não gera conflito de conteúdo por si só.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma propriedade desejável em ferramentas de IaC como o Ansible, que garante que aplicar a mesma configuração várias vezes produza sempre o mesmo estado final, é a:',
    options: [
      { text: 'volatilidade.' },
      { text: 'idempotência.', correct: true },
      { text: 'recursividade.' },
      { text: 'concorrência.' },
      { text: 'ofuscação.' }
    ],
    explanation:
      'A) ERRADA — volatilidade indicaria instabilidade, o oposto do desejado. B) CORRETA — a idempotência garante que reexecutar o playbook não altere o estado se ele já estiver correto. C) ERRADA — recursividade é uma técnica de repetição, não a propriedade descrita. D) ERRADA — concorrência trata de execução simultânea. E) ERRADA — ofuscação é ocultar código/dados, sem relação.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible', type: 'ME', difficulty: 'MEDIO',
    statement: 'O Ansible caracteriza-se, entre outros aspectos, por:',
    options: [
      { text: 'exigir a instalação de um agente em cada host gerenciado.' },
      { text: 'ser agentless, geralmente usando SSH, com playbooks descritos em YAML.', correct: true },
      { text: 'só funcionar em sistemas Windows.' },
      { text: 'usar exclusivamente linguagem binária compilada.' },
      { text: 'ser incompatível com controle de versão.' }
    ],
    explanation:
      'A) ERRADA — o Ansible é AGENTLESS, dispensa agente nos hosts. B) CORRETA — conecta-se por SSH (ou WinRM) e usa playbooks em YAML. C) ERRADA — gerencia Linux, Unix e Windows. D) ERRADA — usa YAML declarativo, não binário. E) ERRADA — os playbooks são versionáveis em Git.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Linguagens de script: Python, Bash e PowerShell', type: 'ME', difficulty: 'FACIL',
    statement: 'A linguagem de script nativa e predominante para automação administrativa em ambientes Windows Server é o:',
    options: [
      { text: 'Bash.' },
      { text: 'PowerShell.', correct: true },
      { text: 'Assembly.' },
      { text: 'COBOL.' },
      { text: 'SQL.' }
    ],
    explanation:
      'A) ERRADA — o Bash é o shell padrão em Linux/Unix. B) CORRETA — o PowerShell é o shell/linguagem de automação nativa do Windows (orientado a objetos). C) ERRADA — Assembly é linguagem de baixo nível, não script administrativo. D) ERRADA — COBOL é linguagem de sistemas legados corporativos. E) ERRADA — SQL é para banco de dados, não automação de SO.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Linguagens de script: Python, Bash e PowerShell', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre linguagens de script para automação, assinale a alternativa correta.',
    options: [
      { text: 'Python é uma linguagem interpretada e amplamente usada em automação e análise de dados.', correct: true },
      { text: 'Bash é uma linguagem compilada exclusiva do Windows.' },
      { text: 'PowerShell não permite manipular objetos, apenas texto.' },
      { text: 'Python não possui bibliotecas para tarefas de automação.' },
      { text: 'scripts nunca podem ser agendados para execução automática.' }
    ],
    explanation:
      'A) CORRETA — Python é interpretada, multiplataforma e forte em automação, integração e dados. B) ERRADA — Bash é interpretado e típico de Linux/Unix. C) ERRADA — o PowerShell é orientado a OBJETOS (não só texto). D) ERRADA — Python tem vasto ecossistema (os, subprocess, requests etc.). E) ERRADA — scripts podem ser agendados (cron no Linux, Agendador de Tarefas no Windows).',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)', type: 'ME', difficulty: 'MEDIO',
    statement: 'No contexto de CI/CD, o conjunto automatizado de etapas (build → testes → empacotamento → deploy) que o código percorre até a entrega é chamado de:',
    options: [
      { text: 'pipeline.', correct: true },
      { text: 'container.' },
      { text: 'repositório.' },
      { text: 'sprint.' },
      { text: 'hotfix.' }
    ],
    explanation:
      'A) CORRETA — o pipeline de CI/CD encadeia e automatiza as etapas do código até a entrega. B) ERRADA — container empacota a aplicação e suas dependências. C) ERRADA — repositório armazena o código-fonte versionado. D) ERRADA — sprint é um time-box do Scrum. E) ERRADA — hotfix é uma correção emergencial, não o fluxo automatizado.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'DevSecOps: integração de segurança no ciclo de desenvolvimento', type: 'ME', difficulty: 'FACIL',
    statement: 'A prática de manter segredos (senhas, tokens, chaves) fora do código-fonte, usando cofres específicos, é recomendada porque:',
    options: [
      { text: 'melhora a performance do compilador.' },
      { text: 'evita a exposição de credenciais em repositórios, reduzindo o risco de vazamento.', correct: true },
      { text: 'aumenta o tamanho do binário final.' },
      { text: 'dispensa qualquer controle de acesso.' },
      { text: 'torna o código incompatível com Git.' }
    ],
    explanation:
      'A) ERRADA — não há relação com desempenho de compilação. B) CORRETA — segredos versionados vazam facilmente; cofres (ex.: Vault, secrets manager) protegem as credenciais. C) ERRADA — não afeta o tamanho do binário. D) ERRADA — pelo contrário, reforça o controle de acesso aos segredos. E) ERRADA — o código continua compatível com Git; o que muda é onde ficam os segredos.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A abordagem de infraestrutura "imutável" (immutable infrastructure) caracteriza-se por:',
    options: [
      { text: 'aplicar patches manualmente em servidores em produção sempre que necessário.' },
      { text: 'substituir servidores por novas instâncias construídas do zero a cada mudança, em vez de alterá-los no local.', correct: true },
      { text: 'proibir qualquer atualização de software.' },
      { text: 'manter estado mutável compartilhado entre todos os servidores.' },
      { text: 'depender exclusivamente de configuração manual.' }
    ],
    explanation:
      'A) ERRADA — aplicar patches no local é justamente a infraestrutura MUTÁVEL. B) CORRETA — na imutável, cada mudança gera uma nova imagem/instância, e a antiga é descartada, reduzindo desvios de configuração. C) ERRADA — permite atualizações, mas via reconstrução, não edição in-place. D) ERRADA — o objetivo é evitar estado mutável divergente. E) ERRADA — é altamente automatizada (IaC), não manual.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em plataformas como GitHub/GitLab, o mecanismo pelo qual um desenvolvedor propõe a incorporação de suas alterações a outro branch, permitindo revisão de código, é o:',
    options: [
      { text: 'commit assinado.' },
      { text: 'pull request / merge request.', correct: true },
      { text: 'fork silencioso.' },
      { text: 'rebase automático.' },
      { text: 'stash.' }
    ],
    explanation:
      'A) ERRADA — o commit assinado apenas garante autoria por GPG. B) CORRETA — o Pull Request (GitHub) / Merge Request (GitLab) formaliza a proposta de integração e habilita revisão e discussão. C) ERRADA — fork cria cópia do repositório, mas não é o pedido de integração revisado. D) ERRADA — rebase reescreve o histórico, não é o fluxo de revisão. E) ERRADA — stash guarda alterações temporariamente fora do commit.',
    source: S
  },

  // ════════════════════ Gestão de TI (+14) ════════════════════
  {
    disciplineSlug: GTI, topic: 'Planejamento estratégico de TI: alinhamento com o negócio; KPIs; análise de riscos', type: 'ME', difficulty: 'MEDIO',
    statement: 'No planejamento estratégico de TI, o alinhamento estratégico significa:',
    options: [
      { text: 'que a TI deve operar de forma isolada das metas de negócio.' },
      { text: 'que os objetivos e investimentos de TI devem apoiar e viabilizar os objetivos do negócio.', correct: true },
      { text: 'priorizar apenas a redução de custos, ignorando resultados.' },
      { text: 'terceirizar toda a TI obrigatoriamente.' },
      { text: 'que o negócio deve se adaptar exclusivamente às escolhas técnicas da TI.' }
    ],
    explanation:
      'A) ERRADA — TI isolada é o oposto de alinhamento. B) CORRETA — o alinhamento faz a TI servir à estratégia e às metas do negócio. C) ERRADA — o foco é gerar valor, não só cortar custos. D) ERRADA — terceirização é uma decisão pontual, não sinônimo de alinhamento. E) ERRADA — o alinhamento é mútuo, com a TI apoiando o negócio, não o contrário imposto.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Planejamento estratégico de TI: alinhamento com o negócio; KPIs; análise de riscos', type: 'ME', difficulty: 'FACIL',
    statement: 'Um KPI (Key Performance Indicator) tem por finalidade:',
    options: [
      { text: 'substituir o planejamento estratégico.' },
      { text: 'medir, de forma objetiva, o desempenho em relação a um objetivo definido.', correct: true },
      { text: 'documentar o código-fonte de sistemas.' },
      { text: 'listar os equipamentos de rede.' },
      { text: 'criptografar dados sensíveis.' }
    ],
    explanation:
      'A) ERRADA — o KPI apoia, não substitui, o planejamento. B) CORRETA — KPI é o indicador-chave que mensura o progresso rumo a uma meta. C) ERRADA — documentar código é outra atividade. D) ERRADA — inventário de rede é função de gestão de ativos. E) ERRADA — criptografia é controle de segurança, não indicador.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na ITIL, o acordo formal que define entre provedor e cliente as metas de qualidade e níveis de serviço (ex.: tempo de resposta, disponibilidade) é o:',
    options: [
      { text: 'OLA.' },
      { text: 'SLA (Service Level Agreement).', correct: true },
      { text: 'CMDB.' },
      { text: 'RFC.' },
      { text: 'KPI.' }
    ],
    explanation:
      'A) ERRADA — o OLA (Operational Level Agreement) é acordo INTERNO entre times do provedor. B) CORRETA — o SLA é o acordo de nível de serviço com o CLIENTE. C) ERRADA — o CMDB é a base de dados de itens de configuração. D) ERRADA — a RFC é a requisição formal de mudança. E) ERRADA — KPI é indicador de desempenho, não o acordo.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Na ITIL 4, o repositório que armazena informações sobre os itens de configuração (CIs) e seus relacionamentos na infraestrutura é o:',
    options: [
      { text: 'Service Desk.' },
      { text: 'CMDB (Configuration Management Database).', correct: true },
      { text: 'Backlog do Produto.' },
      { text: 'Data Lake.' },
      { text: 'Firewall.' }
    ],
    explanation:
      'A) ERRADA — o Service Desk é o ponto único de contato com os usuários. B) CORRETA — o CMDB registra os itens de configuração e suas relações, base da gestão de configuração. C) ERRADA — o backlog é artefato do Scrum. D) ERRADA — o Data Lake armazena dados brutos para análise. E) ERRADA — firewall é controle de rede.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na gestão de mudanças da ITIL, uma mudança pré-aprovada, de baixo risco e seguindo procedimento conhecido (ex.: reset de senha padronizado), é classificada como mudança:',
    options: [
      { text: 'emergencial.' },
      { text: 'padrão (standard).', correct: true },
      { text: 'normal.' },
      { text: 'disruptiva.' },
      { text: 'não autorizada.' }
    ],
    explanation:
      'A) ERRADA — a emergencial responde a um incidente urgente e tem fluxo acelerado. B) CORRETA — a mudança PADRÃO é pré-aprovada, de baixo risco e repetível. C) ERRADA — a normal precisa passar por avaliação/autorização (CAB). D) ERRADA — "disruptiva" não é categoria ITIL de mudança. E) ERRADA — mudança não autorizada é desvio, não uma categoria válida.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle', type: 'ME', difficulty: 'MEDIO',
    statement: 'O COBIT 2019 é um framework voltado principalmente à:',
    options: [
      { text: 'programação de sistemas em baixo nível.' },
      { text: 'governança e gestão da TI corporativa (governança de I&T).', correct: true },
      { text: 'configuração física de redes.' },
      { text: 'modelagem de banco de dados relacional.' },
      { text: 'automação de testes unitários.' }
    ],
    explanation:
      'A) ERRADA — o COBIT não trata de codificação de baixo nível. B) CORRETA — o COBIT é o framework de GOVERNANÇA e gestão da informação e tecnologia (I&T). C) ERRADA — configuração de redes é operacional, fora do escopo do COBIT. D) ERRADA — modelagem de dados é atividade técnica específica. E) ERRADA — automação de testes é prática de engenharia, não o foco do COBIT.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No COBIT 2019, o domínio responsável pela governança (e não pela gestão) é o:',
    options: [
      { text: 'APO (Align, Plan and Organize).' },
      { text: 'EDM (Evaluate, Direct and Monitor).', correct: true },
      { text: 'BAI (Build, Acquire and Implement).' },
      { text: 'DSS (Deliver, Service and Support).' },
      { text: 'MEA (Monitor, Evaluate and Assess).' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — APO, BAI, DSS e MEA são os quatro domínios de GESTÃO. B) CORRETA — o EDM (Avaliar, Dirigir e Monitorar) é o único domínio de GOVERNANÇA, de responsabilidade da alta administração.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban', type: 'ME', difficulty: 'FACIL',
    statement: 'Segundo o PMBOK, os cinco grupos de processos de gerenciamento de projetos são:',
    options: [
      { text: 'iniciação, planejamento, execução, monitoramento/controle e encerramento.', correct: true },
      { text: 'análise, design, código, teste e implantação.' },
      { text: 'prospecção, venda, entrega, cobrança e pós-venda.' },
      { text: 'requisitos, arquitetura, sprint, review e retrospectiva.' },
      { text: 'orçamento, compra, contrato, obra e vistoria.' }
    ],
    explanation:
      'A) CORRETA — os cinco grupos do PMBOK são iniciação, planejamento, execução, monitoramento e controle, e encerramento. B) ERRADA — descreve fases de um SDLC, não os grupos do PMBOK. C) ERRADA — é um funil comercial. D) ERRADA — mistura eventos do Scrum com etapas técnicas. E) ERRADA — descreve um fluxo de obra/contratação.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre o Kanban, assinale a alternativa correta.',
    options: [
      { text: 'É um método baseado em iterações fixas (sprints) com papéis rígidos.' },
      { text: 'Baseia-se em fluxo contínuo, visualização do trabalho e limitação do trabalho em progresso (WIP).', correct: true },
      { text: 'Proíbe a visualização do trabalho em quadros.' },
      { text: 'Exige que todas as tarefas iniciem simultaneamente.' },
      { text: 'É incompatível com melhoria contínua.' }
    ],
    explanation:
      'A) ERRADA — iterações fixas e papéis definidos são característicos do Scrum. B) CORRETA — o Kanban usa quadro visual, fluxo contínuo e limite de WIP para reduzir gargalos. C) ERRADA — o quadro Kanban é justamente a visualização central. D) ERRADA — limitar WIP evita começar tudo ao mesmo tempo. E) ERRADA — o Kanban promove melhoria contínua (kaizen).',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban', type: 'ME', difficulty: 'MEDIO',
    statement: 'No Scrum, o responsável por maximizar o valor do produto e gerenciar o Product Backlog é o:',
    options: [
      { text: 'Scrum Master.' },
      { text: 'Product Owner.', correct: true },
      { text: 'gerente de projetos.' },
      { text: 'arquiteto de software.' },
      { text: 'patrocinador (sponsor).' }
    ],
    explanation:
      'A) ERRADA — o Scrum Master é o facilitador que remove impedimentos e zela pelo processo. B) CORRETA — o Product Owner prioriza e gerencia o backlog, maximizando o valor entregue. C) ERRADA — o Scrum não prevê o papel de "gerente de projetos" tradicional. D) ERRADA — o arquiteto é papel técnico, não de gestão do backlog. E) ERRADA — o patrocinador financia/apoia, mas não gerencia o backlog no dia a dia.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Contratações de TI: regulação aplicável; IN SGD/ME nº 94/2022 (noções)', type: 'ME', difficulty: 'MEDIO',
    statement: 'A IN SGD/ME nº 94/2022 dispõe sobre o processo de contratação de soluções de TIC pela Administração Pública federal e estrutura-se, entre outras, nas fases de:',
    options: [
      { text: 'apenas execução contratual, sem planejamento.' },
      { text: 'planejamento da contratação, seleção do fornecedor e gestão do contrato.', correct: true },
      { text: 'somente seleção do fornecedor.' },
      { text: 'desenvolvimento de software e testes unitários.' },
      { text: 'auditoria fiscal e lançamento tributário.' }
    ],
    explanation:
      'A) ERRADA — o planejamento é fase central e obrigatória. B) CORRETA — o normativo organiza a contratação em planejamento, seleção do fornecedor e gestão contratual. C) ERRADA — a seleção é apenas uma das fases. D) ERRADA — descreve atividades de engenharia de software, não o rito de contratação. E) ERRADA — não trata de matéria tributária.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Contratações de TI: regulação aplicável; IN SGD/ME nº 94/2022 (noções)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No planejamento da contratação de TIC, o documento que consolida os requisitos, a análise de riscos e a solução escolhida, subsidiando o Termo de Referência, é o:',
    options: [
      { text: 'Estudo Técnico Preliminar (ETP).', correct: true },
      { text: 'contrato assinado.' },
      { text: 'nota fiscal eletrônica.' },
      { text: 'balancete contábil.' },
      { text: 'manual do usuário.' }
    ],
    explanation:
      'A) CORRETA — o ETP fundamenta a contratação (necessidade, requisitos, riscos, solução) e antecede o Termo de Referência. B) ERRADA — o contrato é resultado das fases seguintes. C) ERRADA — a nota fiscal é documento de execução/pagamento. D) ERRADA — balancete é peça contábil. E) ERRADA — o manual do usuário é entregue com a solução, não planeja a contratação.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Planejamento estratégico de TI: alinhamento com o negócio; KPIs; análise de riscos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na análise de riscos, o produto entre a probabilidade de um evento ocorrer e o seu impacto define:',
    options: [
      { text: 'o custo total de propriedade.' },
      { text: 'o nível (ou exposição) do risco.', correct: true },
      { text: 'a disponibilidade do serviço.' },
      { text: 'o retorno sobre o investimento.' },
      { text: 'a latência da rede.' }
    ],
    explanation:
      'A) ERRADA — o TCO soma custos de aquisição e operação, sem relação direta com a fórmula. B) CORRETA — nível de risco = probabilidade × impacto, base para priorizar tratamentos. C) ERRADA — disponibilidade mede tempo em operação. D) ERRADA — ROI compara ganho e investimento. E) ERRADA — latência é atraso de rede.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua', type: 'ME', difficulty: 'FACIL',
    statement: 'Na ITIL, o ponto único de contato entre os usuários e a área de TI, que registra e encaminha as solicitações e incidentes, é o:',
    options: [
      { text: 'Service Desk (Central de Serviços).', correct: true },
      { text: 'CAB.' },
      { text: 'CMDB.' },
      { text: 'Data Center.' },
      { text: 'Backbone.' }
    ],
    explanation:
      'A) CORRETA — o Service Desk é o ponto único de contato (SPOC) com os usuários. B) ERRADA — o CAB (Change Advisory Board) assessora a aprovação de mudanças. C) ERRADA — o CMDB é a base de itens de configuração. D) ERRADA — o Data Center é a infraestrutura física. E) ERRADA — backbone é a espinha dorsal da rede.',
    source: S
  },

  // ════════════════════ Computação em Nuvem (+7) ════════════════════
  {
    disciplineSlug: NUVEM, topic: 'Computação em Nuvem', type: 'ME', difficulty: 'MEDIO',
    statement: 'O modelo de execução em nuvem em que o provedor gerencia toda a infraestrutura e o cliente apenas envia funções executadas sob demanda, pagando pelo tempo de execução, é o:',
    options: [
      { text: 'serverless (FaaS).', correct: true },
      { text: 'IaaS puro.' },
      { text: 'colocation.' },
      { text: 'on-premises.' },
      { text: 'mainframe dedicado.' }
    ],
    explanation:
      'A) CORRETA — no serverless/FaaS o provedor abstrai a infraestrutura e cobra pela execução das funções. B) ERRADA — no IaaS o cliente ainda gerencia SO e servidores. C) ERRADA — colocation é hospedar servidores próprios em data center de terceiros. D) ERRADA — on-premises é infraestrutura local do cliente. E) ERRADA — mainframe dedicado é hardware exclusivo, oposto do modelo sob demanda.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Virtualização: máquinas virtuais; redes virtualizadas; alta disponibilidade', type: 'ME', difficulty: 'MEDIO',
    statement: 'O software responsável por criar e gerenciar máquinas virtuais, alocando recursos físicos entre elas, é o:',
    options: [
      { text: 'hypervisor.', correct: true },
      { text: 'compilador.' },
      { text: 'firewall.' },
      { text: 'load balancer.' },
      { text: 'orquestrador de contêineres.' }
    ],
    explanation:
      'A) CORRETA — o hypervisor (ex.: VMware ESXi, Hyper-V, KVM) cria e gerencia as VMs sobre o hardware. B) ERRADA — compilador traduz código-fonte. C) ERRADA — firewall filtra tráfego. D) ERRADA — load balancer distribui requisições. E) ERRADA — orquestrador (ex.: Kubernetes) gerencia contêineres, não VMs.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Sistemas de Armazenamento', type: 'ME', difficulty: 'MEDIO',
    statement: 'A arquitetura de armazenamento em que dispositivos são acessados pela rede em nível de BLOCO, oferecendo alto desempenho para bancos de dados, é a:',
    options: [
      { text: 'NAS.' },
      { text: 'SAN.', correct: true },
      { text: 'DAS.' },
      { text: 'CDN.' },
      { text: 'VPN.' }
    ],
    explanation:
      'A) ERRADA — o NAS oferece armazenamento em nível de ARQUIVO pela rede (ex.: NFS/SMB). B) CORRETA — a SAN entrega blocos por rede dedicada (ex.: Fibre Channel/iSCSI), com alto desempenho. C) ERRADA — o DAS é armazenamento diretamente conectado ao servidor, sem rede. D) ERRADA — CDN distribui conteúdo geograficamente. E) ERRADA — VPN é túnel de rede seguro.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Sistemas operacionais em servidores: Windows Server (AD, arquivos); Linux (LDAP, NFS, clustering)', type: 'ME', difficulty: 'FACIL',
    statement: 'No ambiente Linux/Unix, o protocolo tradicionalmente usado para compartilhar sistemas de arquivos pela rede é o:',
    options: [
      { text: 'NFS (Network File System).', correct: true },
      { text: 'SMTP.' },
      { text: 'RDP.' },
      { text: 'ICMP.' },
      { text: 'BGP.' }
    ],
    explanation:
      'A) CORRETA — o NFS permite montar e compartilhar diretórios remotos em sistemas Unix/Linux. B) ERRADA — o SMTP envia e-mails. C) ERRADA — o RDP é acesso remoto gráfico (Windows). D) ERRADA — o ICMP é de controle/diagnóstico. E) ERRADA — o BGP é protocolo de roteamento entre sistemas autônomos.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Os três pilares clássicos da observabilidade são:',
    options: [
      { text: 'logs, métricas e traces.', correct: true },
      { text: 'firewall, antivírus e backup.' },
      { text: 'CPU, memória e disco.' },
      { text: 'REST, SOAP e GraphQL.' },
      { text: 'commit, branch e merge.' }
    ],
    explanation:
      'A) CORRETA — observabilidade se apoia em logs (eventos), métricas (números ao longo do tempo) e traces (rastreamento de requisições distribuídas). B) ERRADA — são controles de segurança, não pilares de observabilidade. C) ERRADA — são recursos monitorados, não os três pilares conceituais. D) ERRADA — são estilos de API. E) ERRADA — são operações do Git.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Computação em Nuvem', type: 'ME', difficulty: 'MEDIO',
    statement: 'No modelo de responsabilidade compartilhada da nuvem, cabe ao PROVEDOR, tipicamente, a segurança:',
    options: [
      { text: 'dos dados e das configurações de acesso definidas pelo cliente.' },
      { text: 'da infraestrutura física e do hardware que sustenta os serviços (segurança "da" nuvem).', correct: true },
      { text: 'das senhas escolhidas pelos usuários finais.' },
      { text: 'do código de aplicação escrito pelo cliente.' },
      { text: 'das permissões de IAM configuradas pelo cliente.' }
    ],
    explanation:
      'A)/C)/D)/E) ERRADAS — dados, senhas, código e permissões de acesso são responsabilidade do CLIENTE (segurança "na" nuvem). B) CORRETA — o provedor responde pela segurança "DA" nuvem: data centers, hardware e infraestrutura básica.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Contêineres e orquestração: Docker; Kubernetes', type: 'ME', difficulty: 'FACIL',
    statement: 'No Docker, o modelo somente-leitura que serve de base para criar contêineres, empacotando aplicação e dependências, é a:',
    options: [
      { text: 'imagem (image).', correct: true },
      { text: 'rede bridge.' },
      { text: 'variável de ambiente.' },
      { text: 'porta exposta.' },
      { text: 'tag de versão do Git.' }
    ],
    explanation:
      'A) CORRETA — a imagem é o template imutável (somente leitura) a partir do qual os contêineres são instanciados. B) ERRADA — a bridge é um driver de rede do Docker. C) ERRADA — variável de ambiente parametriza a execução. D) ERRADA — porta exposta trata de conectividade. E) ERRADA — tag do Git versiona código-fonte, não a imagem de contêiner.',
    source: S
  },

  // ════════════════════ Redes (+6) ════════════════════
  {
    disciplineSlug: REDES, topic: 'Protocolos de aplicação (DNS, HTTP/HTTPS, SMTP, DHCP)', type: 'ME', difficulty: 'FACIL',
    statement: 'A diferença essencial entre HTTP e HTTPS é que o HTTPS:',
    options: [
      { text: 'é mais lento por não usar cache.' },
      { text: 'adiciona uma camada de criptografia (TLS), protegendo a confidencialidade e a integridade dos dados.', correct: true },
      { text: 'não requer servidor web.' },
      { text: 'funciona apenas em redes locais.' },
      { text: 'elimina a necessidade de endereços IP.' }
    ],
    explanation:
      'A) ERRADA — o HTTPS pode usar cache; a diferença é a segurança, não o cache. B) CORRETA — o HTTPS é o HTTP sobre TLS, cifrando a comunicação. C) ERRADA — ambos requerem servidor web. D) ERRADA — o HTTPS opera na internet, não só em LAN. E) ERRADA — continua usando IP normalmente.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Modelo TCP/IP; endereçamento IPv4 e IPv6', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A técnica que permite que vários dispositivos de uma rede privada compartilhem um único endereço IP público para acessar a internet é o:',
    options: [
      { text: 'DNS.' },
      { text: 'NAT (Network Address Translation).', correct: true },
      { text: 'DHCP.' },
      { text: 'VLAN.' },
      { text: 'QoS.' }
    ],
    explanation:
      'A) ERRADA — o DNS resolve nomes em IPs. B) CORRETA — o NAT traduz endereços privados em um (ou poucos) público(s), permitindo o compartilhamento. C) ERRADA — o DHCP atribui IPs dentro da rede, não faz a tradução para o público. D) ERRADA — a VLAN segmenta a rede logicamente. E) ERRADA — o QoS prioriza tipos de tráfego.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Redes sem fio (Wi-Fi): padrões e protocolos de segurança', type: 'ME', difficulty: 'MEDIO',
    statement: 'Entre os protocolos de segurança de redes Wi-Fi, o mais recente e recomendado atualmente é o:',
    options: [
      { text: 'WEP.' },
      { text: 'WPA3.', correct: true },
      { text: 'WPA (original).' },
      { text: 'nenhuma criptografia (open).' },
      { text: 'MAC filtering isolado.' }
    ],
    explanation:
      'A) ERRADA — o WEP é obsoleto e facilmente quebrável. B) CORRETA — o WPA3 é o padrão mais recente, com criptografia mais robusta. C) ERRADA — o WPA original já foi superado pelo WPA2 e WPA3. D) ERRADA — rede aberta não tem criptografia. E) ERRADA — filtrar MAC ajuda pouco e é facilmente burlável (spoofing), não substitui criptografia.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Complexidade de algoritmos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um algoritmo com complexidade de tempo O(1) significa que:',
    options: [
      { text: 'o tempo cresce linearmente com o tamanho da entrada.' },
      { text: 'o tempo de execução é constante, independentemente do tamanho da entrada.', correct: true },
      { text: 'o tempo cresce exponencialmente.' },
      { text: 'o algoritmo nunca termina.' },
      { text: 'o algoritmo sempre usa recursão.' }
    ],
    explanation:
      'A) ERRADA — crescimento linear é O(n). B) CORRETA — O(1) indica tempo CONSTANTE (ex.: acesso a um índice de vetor). C) ERRADA — crescimento exponencial é O(2ⁿ). D) ERRADA — O(1) não tem relação com não terminar. E) ERRADA — complexidade independe de usar recursão.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Listas, pilhas, filas, vetores e matrizes', type: 'ME', difficulty: 'FACIL',
    statement: 'Uma estrutura de dados LIFO (Last In, First Out), em que o último elemento inserido é o primeiro a sair, é a:',
    options: [
      { text: 'fila.' },
      { text: 'pilha.', correct: true },
      { text: 'árvore.' },
      { text: 'lista ligada circular.' },
      { text: 'tabela hash.' }
    ],
    explanation:
      'A) ERRADA — a fila é FIFO (primeiro a entrar, primeiro a sair). B) CORRETA — a pilha é LIFO (ex.: pilha de execução/undo). C) ERRADA — árvore é hierárquica. D) ERRADA — lista circular liga o fim ao início, sem regra LIFO. E) ERRADA — tabela hash mapeia chave→valor.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Protocolos de transporte (TCP, UDP)', type: 'ME', difficulty: 'MEDIO',
    statement: 'Para uma transmissão de vídeo ao vivo (streaming em tempo real), em que pequenas perdas são toleráveis mas a latência precisa ser mínima, o protocolo de transporte mais adequado costuma ser o:',
    options: [
      { text: 'TCP, por garantir a retransmissão de todos os pacotes.' },
      { text: 'UDP, por priorizar velocidade e baixa latência, ainda que sem garantia de entrega.', correct: true },
      { text: 'FTP, por ser voltado a arquivos.' },
      { text: 'SMTP, por ser de e-mail.' },
      { text: 'ARP, por resolver endereços.' }
    ],
    explanation:
      'A) ERRADA — as retransmissões do TCP aumentam a latência, ruim para tempo real. B) CORRETA — o UDP é leve e rápido, ideal para streaming/VoIP, onde latência baixa importa mais que entrega perfeita. C)/D) ERRADAS — FTP e SMTP são protocolos de aplicação para arquivos/e-mail. E) ERRADA — o ARP atua na resolução de endereços MAC, não no transporte.',
    source: S
  },

  // ════════════════════ Banco de Dados (+6) ════════════════════
  {
    disciplineSlug: BD, topic: 'Consultas, junções e subconsultas', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma junção que retorna apenas as linhas com correspondência em AMBAS as tabelas envolvidas é o:',
    options: [
      { text: 'LEFT JOIN.' },
      { text: 'INNER JOIN.', correct: true },
      { text: 'FULL OUTER JOIN.' },
      { text: 'CROSS JOIN.' },
      { text: 'RIGHT JOIN.' }
    ],
    explanation:
      'A) ERRADA — o LEFT JOIN traz todas as linhas da tabela da esquerda, com ou sem correspondência. B) CORRETA — o INNER JOIN retorna somente os registros com correspondência nas duas tabelas. C) ERRADA — o FULL OUTER JOIN traz linhas de ambas, mesmo sem correspondência. D) ERRADA — o CROSS JOIN faz produto cartesiano. E) ERRADA — o RIGHT JOIN privilegia a tabela da direita.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Modelagem de dados: modelo entidade-relacionamento (ER); mapeamento para o modelo relacional', type: 'ME', difficulty: 'MEDIO',
    statement: 'No modelo Entidade-Relacionamento, uma relação de cardinalidade N:N (muitos-para-muitos) entre duas entidades, ao ser mapeada para o modelo relacional, normalmente gera:',
    options: [
      { text: 'a fusão das duas tabelas em uma só.' },
      { text: 'uma tabela associativa (de junção) com as chaves estrangeiras das duas entidades.', correct: true },
      { text: 'a exclusão de uma das entidades.' },
      { text: 'a criação de um índice único apenas.' },
      { text: 'a duplicação de todos os atributos em ambas as tabelas.' }
    ],
    explanation:
      'A) ERRADA — fundir tabelas geraria redundância e não representa o N:N. B) CORRETA — o N:N exige uma tabela associativa que referencia as PKs das duas entidades. C) ERRADA — nenhuma entidade é excluída. D) ERRADA — só um índice não resolve o relacionamento. E) ERRADA — duplicar atributos viola a normalização.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Transações e controle de concorrência', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O fenômeno de concorrência em que uma transação lê dados que outra transação alterou, mas que ainda não foram confirmados (commit), é a:',
    options: [
      { text: 'leitura suja (dirty read).', correct: true },
      { text: 'leitura repetível.' },
      { text: 'serialização perfeita.' },
      { text: 'atomicidade.' },
      { text: 'durabilidade.' }
    ],
    explanation:
      'A) CORRETA — o dirty read ocorre ao ler dados não confirmados, que podem sofrer rollback. B) ERRADA — leitura repetível é uma garantia (não o problema). C) ERRADA — serialização é o nível de isolamento mais forte. D) ERRADA — atomicidade é o "tudo ou nada" de uma transação. E) ERRADA — durabilidade garante persistência após commit.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'NoSQL: tipos e casos de uso', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um banco NoSQL orientado a documentos, que armazena registros no formato JSON/BSON, é exemplificado pelo:',
    options: [
      { text: 'MongoDB.', correct: true },
      { text: 'MySQL.' },
      { text: 'PostgreSQL puro relacional.' },
      { text: 'Oracle Database.' },
      { text: 'SQL Server.' }
    ],
    explanation:
      'A) CORRETA — o MongoDB é o exemplo clássico de banco de documentos (JSON/BSON). B)/C)/D)/E) ERRADAS — MySQL, PostgreSQL (no uso relacional), Oracle e SQL Server são bancos relacionais (SQL), não orientados a documentos.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'DDL e DML', type: 'ME', difficulty: 'FACIL',
    statement: 'Para remover TODAS as linhas de uma tabela de forma rápida, sem registrar cada exclusão individualmente e sem poder facilmente desfazer, usa-se o comando:',
    options: [
      { text: 'DELETE sem WHERE.' },
      { text: 'TRUNCATE TABLE.', correct: true },
      { text: 'DROP TABLE.' },
      { text: 'SELECT *.' },
      { text: 'ALTER TABLE.' }
    ],
    explanation:
      'A) ERRADA — o DELETE remove linhas registrando cada operação (mais lento; permite rollback). B) CORRETA — o TRUNCATE (DDL) esvazia a tabela rapidamente, sem log linha a linha. C) ERRADA — o DROP remove a PRÓPRIA tabela (estrutura), não só as linhas. D) ERRADA — o SELECT apenas consulta. E) ERRADA — o ALTER modifica a estrutura da tabela.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Conceitos de SGBD', type: 'ME', difficulty: 'MEDIO',
    statement: 'De acordo com o teorema CAP, um sistema distribuído não pode garantir simultaneamente, de forma plena, as três propriedades:',
    options: [
      { text: 'Consistência, Disponibilidade e Tolerância a Particionamento.', correct: true },
      { text: 'Confidencialidade, Autenticidade e Privacidade.' },
      { text: 'Atomicidade, Coesão e Persistência.' },
      { text: 'Concorrência, Alocação e Prioridade.' },
      { text: 'Cache, API e Protocolo.' }
    ],
    explanation:
      'A) CORRETA — o teorema CAP afirma que, sob particionamento de rede, deve-se escolher entre Consistência e Disponibilidade (só duas das três plenamente). B)/C)/D)/E) ERRADAS — não correspondem às propriedades do teorema CAP.',
    source: S
  },

  // ════════════════════ Segurança (+5) ════════════════════
  {
    disciplineSlug: SEG, topic: 'Segurança defensiva: firewall, IDS/IPS, WAF, VPN, proxy, antimalware; defesa em profundidade; hardening', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um WAF (Web Application Firewall) tem por função específica:',
    options: [
      { text: 'filtrar tráfego de rede apenas por endereço IP e porta.' },
      { text: 'proteger aplicações web inspecionando requisições HTTP/HTTPS contra ataques como SQL injection e XSS.', correct: true },
      { text: 'cifrar discos rígidos.' },
      { text: 'gerenciar máquinas virtuais.' },
      { text: 'balancear carga de banco de dados.' }
    ],
    explanation:
      'A) ERRADA — filtrar só por IP/porta é o firewall de rede tradicional (camadas 3/4). B) CORRETA — o WAF atua na camada de aplicação (7), analisando HTTP/HTTPS contra SQLi, XSS etc. C) ERRADA — cifrar disco é função de criptografia de armazenamento. D) ERRADA — gerenciar VMs é do hypervisor. E) ERRADA — balancear carga é do load balancer.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID', type: 'ME', difficulty: 'MEDIO',
    statement: 'Considerando os conceitos de segurança, um "ataque de dia zero" (zero-day) caracteriza-se por:',
    options: [
      { text: 'explorar uma vulnerabilidade ainda desconhecida ou sem correção disponível.', correct: true },
      { text: 'ocorrer somente no primeiro dia de operação do sistema.' },
      { text: 'ser sempre inofensivo.' },
      { text: 'depender de senha correta do administrador.' },
      { text: 'atingir apenas softwares livres.' }
    ],
    explanation:
      'A) CORRETA — o zero-day explora falha desconhecida do fornecedor (ou sem patch), sem defesa prévia. B) ERRADA — não tem relação com o "primeiro dia" de operação. C) ERRADA — costuma ser especialmente perigoso, justamente por não haver correção. D) ERRADA — não depende de senha do administrador. E) ERRADA — afeta qualquer software, livre ou proprietário.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Segurança em nuvem e em contêineres; monitoramento e resposta a incidentes', type: 'ME', difficulty: 'DIFICIL',
    statement: 'No princípio do "menor privilégio" (least privilege), recomenda-se que um usuário ou serviço:',
    options: [
      { text: 'tenha sempre privilégios de administrador para agilizar o trabalho.' },
      { text: 'receba apenas as permissões estritamente necessárias para executar suas tarefas.', correct: true },
      { text: 'compartilhe suas credenciais com a equipe.' },
      { text: 'nunca seja auditado.' },
      { text: 'tenha acesso irrestrito a todos os sistemas.' }
    ],
    explanation:
      'A) ERRADA — conceder admin por padrão amplia a superfície de ataque. B) CORRETA — o menor privilégio limita permissões ao mínimo necessário, reduzindo o impacto de comprometimentos. C) ERRADA — compartilhar credenciais viola a rastreabilidade e a segurança. D) ERRADA — auditoria é essencial ao controle. E) ERRADA — acesso irrestrito contraria diretamente o princípio.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Principais tipos de ataques e ameaças', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um ataque de negação de serviço distribuído (DDoS) tem como objetivo principal comprometer qual pilar da segurança da informação?',
    options: [
      { text: 'Confidencialidade.' },
      { text: 'Disponibilidade.', correct: true },
      { text: 'Integridade.' },
      { text: 'Não repúdio.' },
      { text: 'Autenticidade.' }
    ],
    explanation:
      'A) ERRADA — confidencialidade é violada por vazamento/interceptação, não por sobrecarga. B) CORRETA — o DDoS sobrecarrega o serviço para torná-lo INDISPONÍVEL. C) ERRADA — integridade é violada por alteração indevida de dados. D) ERRADA — não repúdio trata da impossibilidade de negar autoria. E) ERRADA — autenticidade trata de comprovar identidade.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Segurança defensiva: firewall, IDS/IPS, WAF, VPN, proxy, antimalware; defesa em profundidade; hardening', type: 'ME', difficulty: 'FACIL',
    statement: 'O conceito de "defesa em profundidade" (defense in depth) baseia-se em:',
    options: [
      { text: 'usar um único controle de segurança muito forte.' },
      { text: 'aplicar múltiplas camadas de controles independentes, de modo que a falha de uma não comprometa o todo.', correct: true },
      { text: 'desativar os logs para economizar espaço.' },
      { text: 'confiar apenas no antivírus.' },
      { text: 'expor os servidores diretamente à internet.' }
    ],
    explanation:
      'A) ERRADA — depender de um único controle cria ponto único de falha. B) CORRETA — a defesa em profundidade sobrepõe camadas (rede, host, aplicação, dados) para resiliência. C) ERRADA — desativar logs enfraquece a detecção. D) ERRADA — o antivírus é apenas uma camada. E) ERRADA — expor servidores contraria o princípio de segmentação/proteção.',
    source: S
  },

  // ════════════════════ Análise de Dados, ML e IA (+5) ════════════════════
  {
    disciplineSlug: DADOS, topic: 'Análise de dados: coleta, validação e tratamento; análise exploratória; padrões e tendências', type: 'ME', difficulty: 'FACIL',
    statement: 'Na análise de dados, valores atípicos que se distanciam muito do padrão do conjunto e podem distorcer estatísticas são chamados de:',
    options: [
      { text: 'outliers.', correct: true },
      { text: 'medianas.' },
      { text: 'quartis.' },
      { text: 'dummies.' },
      { text: 'labels.' }
    ],
    explanation:
      'A) CORRETA — outliers são observações discrepantes que podem distorcer médias e modelos. B) ERRADA — a mediana é uma medida de posição central. C) ERRADA — quartis dividem os dados em quatro partes. D) ERRADA — variáveis dummy codificam categorias em 0/1. E) ERRADA — labels são os rótulos usados no aprendizado supervisionado.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão', type: 'ME', difficulty: 'MEDIO',
    statement: 'A medida de tendência central que corresponde ao valor que MAIS se repete em um conjunto de dados é a:',
    options: [
      { text: 'média.' },
      { text: 'moda.', correct: true },
      { text: 'mediana.' },
      { text: 'variância.' },
      { text: 'amplitude.' }
    ],
    explanation:
      'A) ERRADA — a média é a soma dividida pela quantidade de valores. B) CORRETA — a moda é o valor de maior frequência. C) ERRADA — a mediana é o valor central dos dados ordenados. D) ERRADA — a variância mede a dispersão. E) ERRADA — a amplitude é a diferença entre o maior e o menor valor.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada', type: 'ME', difficulty: 'MEDIO',
    statement: 'No contexto de governança de dados, a atividade de identificar e corrigir inconsistências, duplicidades e valores ausentes em um conjunto de dados é a:',
    options: [
      { text: 'limpeza (data cleansing).', correct: true },
      { text: 'compilação.' },
      { text: 'indexação de disco.' },
      { text: 'compressão.' },
      { text: 'criptografia.' }
    ],
    explanation:
      'A) CORRETA — o data cleansing corrige erros, duplicidades e lacunas, elevando a qualidade dos dados. B) ERRADA — compilação traduz código. C) ERRADA — indexação de disco organiza armazenamento físico. D) ERRADA — compressão reduz o tamanho dos dados. E) ERRADA — criptografia protege a confidencialidade, não corrige inconsistências.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança', type: 'ME', difficulty: 'DIFICIL',
    statement: 'A técnica que fundamenta as respostas de um LLM em uma base de conhecimento externa e atualizada, recuperando trechos relevantes antes de gerar a resposta, é conhecida como:',
    options: [
      { text: 'RAG (Retrieval-Augmented Generation).', correct: true },
      { text: 'overfitting.' },
      { text: 'normalização em lote.' },
      { text: 'data augmentation de imagem.' },
      { text: 'gradiente descendente.' }
    ],
    explanation:
      'A) CORRETA — o RAG recupera documentos relevantes de uma base externa e os injeta no contexto, reduzindo alucinações e trazendo dados atualizados. B) ERRADA — overfitting é sobreajuste ao treino. C) ERRADA — batch normalization estabiliza o treinamento de redes. D) ERRADA — data augmentation gera variações de dados (comum em visão). E) ERRADA — o gradiente descendente é o algoritmo de otimização do treino.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um risco central no uso de IA quanto a "viés algorítmico" consiste em:',
    options: [
      { text: 'o modelo reproduzir ou amplificar preconceitos presentes nos dados de treinamento.', correct: true },
      { text: 'o modelo executar mais rápido que o esperado.' },
      { text: 'reduzir o consumo de energia dos servidores.' },
      { text: 'aumentar a precisão em todos os grupos igualmente.' },
      { text: 'eliminar a necessidade de dados para treinar.' }
    ],
    explanation:
      'A) CORRETA — se os dados de treino contêm vieses, o modelo tende a reproduzi-los ou amplificá-los, gerando discriminação. B) ERRADA — velocidade não é a questão do viés. C) ERRADA — consumo de energia é outro tema. D) ERRADA — o viés justamente PREJUDICA a equidade entre grupos. E) ERRADA — modelos de ML dependem de dados para treinar.',
    source: S
  }
]
