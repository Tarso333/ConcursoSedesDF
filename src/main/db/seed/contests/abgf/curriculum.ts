// Currículo do concurso ABGF 2026 (FCC) — cargo E05: Analista (TI).
// FONTE: Edital nº 01/2026 de Abertura de Inscrições (Anexo IV — Conteúdo
// Programático), extraído do PDF oficial. Tópicos fiéis ao texto do edital;
// subtópicos criados quando o próprio edital enumera unidades claras.
//
// Estimativas de questões (examQuestionEstimate) somam 20 (CG) + 40 (CE) —
// a distribuição por disciplina dentro de cada prova NÃO é pública no edital;
// os valores abaixo são estimativas fundamentadas (documentado em abgf/index.ts).
import type { SeedDiscipline } from '../../curriculum'

export const ABGF_CURRICULUM: SeedDiscipline[] = [
  // ───────────── Conhecimentos Gerais (20 itens, peso 1) ─────────────
  {
    slug: 'lingua-portuguesa',
    name: 'Língua Portuguesa',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 5,
    color: '#3b82f6',
    topics: [
      'Compreensão e interpretação de textos de gêneros variados',
      'Reconhecimento de tipos e gêneros textuais',
      'Domínio da ortografia oficial',
      'Significação das palavras: sinonímia, antonímia, polissemia, denotação e conotação',
      {
        name: 'Mecanismos de coesão textual',
        children: [
          'Referenciação, substituição e repetição',
          'Conectores e elementos de sequenciação textual'
        ]
      },
      {
        name: 'Morfossintaxe',
        children: [
          'Emprego das classes de palavras',
          'Concordância verbal e nominal',
          'Regência verbal e nominal',
          'Emprego dos sinais de pontuação',
          'Emprego do sinal indicativo de crase',
          'Colocação dos pronomes átonos'
        ]
      },
      'Figuras de linguagem',
      'Coordenação e subordinação; conectivos',
      'Vozes do verbo; correlação de tempos e modos verbais; flexão nominal e verbal',
      'Elementos estruturais e processos de formação de palavras',
      'Discurso direto, indireto e indireto livre; intertextualidade',
      'Reescrita de frases e parágrafos: substituição, reorganização e equivalência de estruturas',
      'Redação institucional e correspondência oficial: estrutura, linguagem e padronização'
    ]
  },
  {
    slug: 'lingua-inglesa',
    name: 'Língua Inglesa',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 2,
    color: '#8b5cf6',
    topics: [
      'Compreensão e interpretação de textos técnicos em língua inglesa',
      'Estratégias de leitura: informações específicas, inferência e predição, organização semântica e discursiva',
      {
        name: 'Itens gramaticais relevantes à compreensão de texto',
        children: [
          'Artigos; tempos e modos verbais',
          'Preposições, conjunções, pronomes e modais',
          'Concordância nominal e verbal; formação e classe de palavras',
          'Voz passiva; discurso direto e indireto'
        ]
      },
      'Vocabulário técnico-financeiro em inglês',
      'Mecanismos de coesão textual: referenciação e sequenciação',
      'Semântica: sinonímia, antonímia, polissemia e expressões idiomáticas',
      'Funções retóricas: argumentação, exemplificação, definição, descrição e conclusão'
    ]
  },
  {
    slug: 'raciocinio-logico',
    name: 'Raciocínio Lógico, Matemático e Analítico',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 3,
    color: '#f59e0b',
    topics: [
      'Estrutura lógica de relações; dedução de novas informações e avaliação de condições',
      'Raciocínio verbal, matemático e sequencial; orientação espacial e temporal; formação de conceitos',
      {
        name: 'Lógica sentencial (proposicional)',
        children: [
          'Proposições simples e compostas; conectivos',
          'Tautologia, contradição e contingência; tabelas-verdade',
          'Equivalências lógicas; leis de De Morgan; implicações',
          'Quantificadores; afirmações e negações'
        ]
      },
      'Lógica de argumentação: analogias, inferências, deduções, conclusões e silogismos',
      'Raciocínio quantitativo básico: operações, razão e proporção, porcentagem, regra de três, gráficos e tabelas',
      'Noções de probabilidade e estatística descritiva: frequência, medidas de posição e dispersão'
    ]
  },
  {
    slug: 'direito-const-adm',
    name: 'Noções de Direito Constitucional e Administrativo',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 2,
    color: '#10b981',
    topics: [
      'CF/1988: princípios fundamentais; direitos e garantias fundamentais (individuais, sociais e políticos)',
      'Organização do Estado: organização político-administrativa; competências dos entes',
      'Organização dos Poderes: Executivo, Legislativo e Judiciário — atribuições e competências',
      'Ordem econômica e financeira: princípios; atuação do Estado; Sistema Financeiro Nacional (art. 192)',
      'Regime jurídico-administrativo: princípios expressos e implícitos da Administração Pública',
      'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação',
      'Poderes da Administração: hierárquico, disciplinar, regulamentar e de polícia; uso e abuso do poder',
      'Organização administrativa: administração direta e indireta; autarquias, fundações, empresas públicas e SEM',
      'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista',
      'Controle da administração pública: externo, interno, judicial e legislativo; TCU e CGU',
      'Improbidade administrativa: Lei nº 8.429/1992 e alterações (Lei nº 14.230/2021)',
      'Processo administrativo: Lei nº 9.784/1999',
      'Lei de Acesso à Informação: Lei nº 12.527/2011'
    ]
  },
  {
    slug: 'etica-governanca-compliance',
    name: 'Ética, Integridade, Governança, Compliance e Controles Internos',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 2,
    color: '#06b6d4',
    topics: [
      'Ética pública e privada: ética, moral e valores; código de conduta; conflito de interesses',
      'Governança corporativa: princípios e boas práticas (IBGC); estruturas de governança; Lei nº 13.303/2016',
      'Compliance: pilares do programa de integridade; tone at the top; canal de denúncias; due diligence',
      'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa',
      'Anticorrupção: Lei nº 12.846/2013 e Decreto nº 11.129/2022; leniência; OCDE, FCPA e UK Bribery Act',
      'PLD/FT: Lei nº 9.613/1998; GAFI/FATF; COAF; KYC/KYO; PEP; listas restritivas (OFAC, ONU, UE)',
      'Auditoria interna: planejamento baseado em riscos; evidências e achados; relatórios e monitoramento',
      'Transparência e prestação de contas: LAI; transparência ativa e passiva; dados abertos'
    ]
  },
  {
    slug: 'protecao-dados-seguranca',
    name: 'Proteção de Dados, Segurança da Informação e Uso Responsável de Dados',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 2,
    color: '#ef4444',
    topics: [
      'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD',
      'Marco Civil da Internet (Lei nº 12.965/2014): princípios, direitos, deveres e responsabilidades',
      'Segurança da informação: princípios CID; principais ameaças e ataques; controles defensivos',
      'Gestão de riscos de SI: ISO/IEC 27001 e 27002; classificação da informação; controle de acesso; incidentes',
      'Uso responsável de dados: qualidade; privacidade por design; governança de dados; ética e viés algorítmico'
    ]
  },
  {
    slug: 'economia-financas-garantias',
    name: 'Noções de Economia, Finanças Públicas, Sistema Financeiro, Garantias e Crédito à Exportação',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 2,
    color: '#84cc16',
    topics: [
      'Microeconomia: oferta e demanda; elasticidades; estruturas e falhas de mercado; assimetria de informação',
      'Macroeconomia: PIB; política fiscal e monetária; Selic; câmbio; inflação; balanço de pagamentos',
      'Finanças públicas: receita e despesa; PPA, LDO e LOA; PDG e SEST; LRF (noções)',
      'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)',
      'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações',
      'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF',
      'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades',
      'Políticas públicas e desenvolvimento: ciclo orçamentário; monitoramento e avaliação; financiamento à exportação'
    ]
  },
  {
    slug: 'sustentabilidade-asg',
    name: 'Sustentabilidade, ASG, Diversidade e Inclusão',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 1,
    color: '#22c55e',
    topics: [
      'Mudanças climáticas: causas e impactos; Acordo de Paris; PNMC (Lei nº 12.187/2009); NDC do Brasil',
      'Bioeconomia: conceito, dimensões e cadeias produtivas',
      'Biodiversidade e Soluções Baseadas na Natureza (SBN); serviços ecossistêmicos; infraestrutura verde e azul',
      'ODS — Agenda 2030: estrutura e relevância para o setor financeiro',
      'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021',
      'Finanças sustentáveis: green bonds, títulos verdes, créditos de carbono, blended finance; taxonomia sustentável',
      'Diversidade e inclusão: direitos humanos; interseccionalidade; inclusão de grupos vulnerabilizados',
      'Desafios territoriais: questão urbana e regional; disparidades e segregação socioespacial'
    ]
  },
  {
    slug: 'nocoes-analise-dados',
    name: 'Noções de Análise de Dados, Informações e Indicadores',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 1,
    color: '#a855f7',
    topics: [
      'Dados e organizações: tipos de dados e de produtos de dados; organizações orientadas a dados; governança',
      'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação',
      'Indicadores de desempenho (KPIs): conceito e boas práticas; Ishikawa, Cinco Porquês e Pareto',
      'Coleta e preparação: outliers, dados faltantes, erros de tipo, viés de seleção; limpeza e validação',
      'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas',
      'Visualização e storytelling: tipos de gráficos; boas práticas; narrativa com dados',
      'Uso responsável de dados: LGPD aplicada; ética no uso de dados e IA'
    ]
  },

  // ───────────── Conhecimentos Específicos E05 — TI (40 itens, peso 3) ─────────────
  {
    slug: 'fundamentos-sistemas-redes',
    name: 'Fundamentos de Sistemas e Redes',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 5,
    color: '#0ea5e9',
    topics: [
      {
        name: 'Sistemas Operacionais',
        children: [
          'Conceitos básicos; gerenciamento de processos e memória',
          'Gerenciamento de arquivos e I/O',
          'Conteinerização e virtualização (conceitos de SO)'
        ]
      },
      {
        name: 'Redes de Computadores',
        children: [
          'Modelo TCP/IP; endereçamento IPv4 e IPv6',
          'Protocolos de aplicação (DNS, HTTP/HTTPS, SMTP, DHCP)',
          'Protocolos de transporte (TCP, UDP)',
          'VLAN, VPN e redes LAN/WAN'
        ]
      },
      'Redes sem fio (Wi-Fi): padrões e protocolos de segurança',
      'Computação distribuída: balanceamento de carga; tolerância a falhas; alta disponibilidade',
      {
        name: 'Algoritmos e Estruturas de Dados',
        children: [
          'Complexidade de algoritmos',
          'Listas, pilhas, filas, vetores e matrizes',
          'Árvores; ordenação; hashing'
        ]
      }
    ]
  },
  {
    slug: 'banco-de-dados',
    name: 'Banco de Dados',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 5,
    color: '#f97316',
    topics: [
      {
        name: 'Conceitos de SGBD',
        children: [
          'Modelo relacional; formas normais',
          'Transações e controle de concorrência',
          'NoSQL: tipos e casos de uso'
        ]
      },
      'Modelagem de dados: modelo entidade-relacionamento (ER); mapeamento para o modelo relacional',
      {
        name: 'Linguagem SQL (ANSI)',
        children: [
          'DDL e DML',
          'Consultas, junções e subconsultas',
          'Funções de agregação, visões e indexação'
        ]
      },
      'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse',
      'Engenharia de dados: ingestão, transformação e enriquecimento; ETL/ELT; batch e stream; governança',
      'Big Data: conceito e principais ferramentas e técnicas'
    ]
  },
  {
    slug: 'seguranca-cibernetica',
    name: 'Segurança da Informação e Cibersegurança',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 6,
    color: '#dc2626',
    topics: [
      'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID',
      {
        name: 'Principais tipos de ataques e ameaças',
        children: [
          'DDoS, DoS e man-in-the-middle',
          'Código malicioso: vírus, worm, trojan, ransomware, spyware, keylogger, rootkit',
          'Engenharia social e phishing'
        ]
      },
      'Segurança defensiva: firewall, IDS/IPS, WAF, VPN, proxy, antimalware; defesa em profundidade; hardening',
      'Segurança ofensiva (noções): OWASP Top 10; testes de segurança e gestão de vulnerabilidades',
      {
        name: 'Controle de autenticação e autorização',
        children: [
          'MFA/2FA e SSO',
          'SAML2, OAuth2, OpenID Connect e JWT',
          'RBAC e ABAC'
        ]
      },
      {
        name: 'Criptografia',
        children: [
          'Criptografia simétrica e assimétrica',
          'Funções hash; certificados digitais (ICP-Brasil); assinatura digital',
          'TLS/SSL'
        ]
      },
      'Segurança em nuvem e em contêineres; monitoramento e resposta a incidentes',
      'Frameworks e normas: CIS Controls; NIST CSF; ISO/IEC 27001 e 27002',
      'Bases de conhecimento: CVE, NVD e CVSS',
      'LGPD (Lei nº 13.709/2018) e Marco Civil da Internet (Lei nº 12.965/2014)'
    ]
  },
  {
    slug: 'engenharia-software',
    name: 'Engenharia de Software',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 6,
    color: '#6366f1',
    topics: [
      'Ciclo de vida de desenvolvimento (SDLC); levantamento, análise e especificação de requisitos',
      'Fundamentos de linguagens: tipos de dados; estruturas de controle; modularização; programação assíncrona',
      'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências',
      'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada',
      {
        name: 'Práticas e padrões de arquitetura',
        children: [
          'Padrões de projeto (design patterns)',
          'Domain Driven Design (DDD); refatoração; débito técnico',
          'Microsserviços; orientação a eventos; serverless; MVC'
        ]
      },
      'Integração de sistemas: APIs REST; API gateway; integração síncrona/assíncrona; segurança de APIs',
      'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados',
      'Linguagens e frameworks: Java, Python, JavaScript e PHP; frameworks web (conceitos)',
      'Análise de pontos de função e métricas de software (IFPUG/NESMA)'
    ]
  },
  {
    slug: 'nuvem-infraestrutura',
    name: 'Computação em Nuvem e Infraestrutura',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 5,
    color: '#14b8a6',
    topics: [
      {
        name: 'Computação em Nuvem',
        children: [
          'Modelos de serviço: IaaS, PaaS e SaaS',
          'Tipos de nuvem: privada, pública e híbrida',
          'Elasticidade e armazenamento em nuvem'
        ]
      },
      'Contêineres e orquestração: Docker; Kubernetes',
      'Virtualização: máquinas virtuais; redes virtualizadas; alta disponibilidade',
      'Sistemas operacionais em servidores: Windows Server (AD, arquivos); Linux (LDAP, NFS, clustering)',
      {
        name: 'Sistemas de Armazenamento',
        children: [
          'Arquiteturas SAN, NAS e DAS; RAID',
          'Backup: completo, incremental e diferencial; retenção e restauração'
        ]
      },
      'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch'
    ]
  },
  {
    slug: 'devops-cicd',
    name: 'DevOps, CI/CD e Automação',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 4,
    color: '#eab308',
    topics: [
      'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)',
      'DevSecOps: integração de segurança no ciclo de desenvolvimento',
      'Versionamento de código: Git — branching e merging; GitHub/GitLab',
      'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible',
      'Linguagens de script: Python, Bash e PowerShell'
    ]
  },
  {
    slug: 'dados-ml-ia',
    name: 'Análise de Dados, Aprendizado de Máquina e Inteligência Artificial',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 5,
    color: '#d946ef',
    topics: [
      'Análise de dados: coleta, validação e tratamento; análise exploratória; padrões e tendências',
      'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão',
      {
        name: 'Noções de aprendizado de máquina',
        children: [
          'Aprendizado supervisionado: classificação e regressão',
          'Aprendizado não supervisionado: agrupamento e redução de dimensionalidade',
          'Métricas de avaliação de modelos; séries temporais (noções)'
        ]
      },
      'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança',
      'MLOps (noções): treinamento, implantação e monitoramento de modelos',
      'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada',
      'Visualização de dados: tipos de gráficos; boas práticas; Power BI; storytelling'
    ]
  },
  {
    slug: 'gestao-ti',
    name: 'Gestão de TI',
    block: 'ESPECIFICO',
    weight: 3,
    examQuestionEstimate: 4,
    color: '#64748b',
    topics: [
      'Planejamento estratégico de TI: alinhamento com o negócio; KPIs; análise de riscos',
      'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua',
      'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle',
      'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban',
      'Contratações de TI: regulação aplicável; IN SGD/ME nº 94/2022 (noções)'
    ]
  }
]
