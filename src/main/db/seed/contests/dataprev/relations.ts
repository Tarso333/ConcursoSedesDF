// Grafo de aprendizagem da DATAPREV 2026 — relações reais entre tópicos do
// Perfil 2 (M18). Nenhuma relação inventada: cada aresta tem justificativa
// técnica (note) ou é um encadeamento curricular direto do próprio edital.
// Obs.: "Linux → Containers" não foi cadastrada porque Linux NÃO consta do
// conteúdo programático do Perfil 2 (decisão documentada em index.ts).
import type { SeedRelation } from '../types'

const t = (disciplineSlug: string, topic: string): { disciplineSlug: string; topic: string } => ({
  disciplineSlug,
  topic
})

const REDES = 'redes-de-computadores'
const BD = 'banco-de-dados'
const ARQ = 'engenharia-software'
const NUVEM = 'nuvem-infraestrutura'
const LING = 'linguagens-frameworks'

export const DATAPREV_RELATIONS: SeedRelation[] = [
  // ── Redes: dos conceitos aos protocolos ──
  {
    from: t(REDES, 'Conceitos de redes de computadores'),
    to: t(REDES, 'Elementos de interconexão de redes de computadores'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Topologias e classificação explicam onde hub, switch e roteador se encaixam.'
  },
  {
    from: t(REDES, 'Noções dos modelos de referência OSI (Open Systems Interconnection)'),
    to: t(REDES, 'Arquitetura e pilhas de protocolos TCP/IP'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'O modelo de referência dá o vocabulário de camadas usado para entender a pilha real.'
  },
  {
    from: t(REDES, 'Switches'),
    to: t(REDES, 'VLANs'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'VLAN é segmentação lógica DO switch — sem entender comutação L2, VLAN não faz sentido.'
  },
  {
    from: t(REDES, 'VLANs'),
    to: t(REDES, 'IEEE 802.1'),
    kind: 'RELACIONADO',
    strength: 0.75,
    note: 'O padrão 802.1Q define o tagging de VLANs no quadro Ethernet.'
  },
  {
    from: t(REDES, 'Redes sem fio'),
    to: t(REDES, 'IEEE 802.11 a/b/g/n/ac (redes sem fio)'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Do conceito de rede sem fio para os padrões específicos cobrados (frequências e taxas).'
  },
  {
    from: t(REDES, 'Camada de rede: IPv4'),
    to: t(REDES, 'Camada de rede: IPv6'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'IPv6 se aprende por contraste com IPv4 (128 bits, sem broadcast, SLAAC).'
  },
  {
    from: t(REDES, 'Camada de transporte: TCP e UDP'),
    to: t(REDES, 'Camada de aplicação: HTTP, HTTPS e SSL'),
    kind: 'PRE_REQUISITO',
    strength: 0.5,
    note: 'HTTP roda sobre TCP; entender conexão/confiabilidade antes dos protocolos de aplicação.'
  },

  // ── HTTP → REST → APIs (integração entre disciplinas) ──
  {
    from: t(REDES, 'Camada de aplicação: HTTP, HTTPS e SSL'),
    to: t(ARQ, 'REST'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'REST usa a semântica do HTTP (verbos, códigos de status, URIs) — HTTP vem antes.'
  },
  {
    from: t(ARQ, 'REST'),
    to: t(ARQ, 'APIs'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'APIs modernas são majoritariamente RESTful; o estilo fundamenta o contrato.'
  },
  {
    from: t(ARQ, 'APIs'),
    to: t(ARQ, 'Gateway de APIs'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'O gateway é o ponto único de entrada que gerencia as APIs (autenticação, rate limit).'
  },
  {
    from: t(ARQ, 'JSON'),
    to: t(ARQ, 'REST'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'JSON é o formato de representação dominante das APIs REST.'
  },
  {
    from: t(ARQ, 'XML'),
    to: t(ARQ, 'Web Services'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'Web Services SOAP usam envelope XML e contrato WSDL.'
  },

  // ── Banco de dados: fundamentos → SQL → otimização ──
  {
    from: t(BD, 'Conceitos básicos'),
    to: t(BD, 'SQL (ANSI)'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Tabelas, chaves e integridade vêm antes da linguagem que os manipula.'
  },
  {
    from: t(BD, 'Modelagem de dados'),
    to: t(BD, 'Normalização de dados'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Normalização refina o modelo lógico — depende de entender entidades e dependências funcionais.'
  },
  {
    from: t(BD, 'Modelagem e normalização de dados'),
    to: t(BD, 'SQL (ANSI)'),
    kind: 'PRE_REQUISITO',
    strength: 0.5,
    note: 'O DDL implementa o modelo lógico projetado na modelagem.'
  },
  {
    from: t(BD, 'SQL (ANSI)'),
    to: t(BD, 'Noções para otimização de performance em larga escala'),
    kind: 'CONTINUIDADE',
    strength: 1,
    note: 'Índices, planos de execução e tuning são a evolução natural do domínio do SQL.'
  },
  {
    from: t(BD, 'Arquitetura de banco de dados'),
    to: t(BD, 'Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'A arquitetura do SGBD condiciona as políticas operacionais (storage, backup, monitoração).'
  },
  {
    from: t(BD, 'Backup'),
    to: t(BD, 'Restauração'),
    kind: 'ESTUDADO_JUNTO',
    strength: 1,
    note: 'Tipos de backup (full/incremental/diferencial) determinam o procedimento de restauração.'
  },
  {
    from: t(BD, 'MongoDB'),
    to: t(BD, 'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)'),
    kind: 'RELACIONADO',
    strength: 0.75,
    note: 'NoSQL orientado a documentos escala horizontalmente — caminho comum de Big Data.'
  },
  {
    from: t(BD, 'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)'),
    to: t(BD, 'Noções para otimização de performance em larga escala'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'Particionamento, sharding e réplicas servem aos dois assuntos.'
  },

  // ── Engenharia de software: processo, requisitos, OO e testes ──
  {
    from: t(ARQ, 'Ciclo de vida do software'),
    to: t(ARQ, 'Metodologias de desenvolvimento de software'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'As metodologias organizam as fases do ciclo de vida — entenda as fases primeiro.'
  },
  {
    from: t(ARQ, 'Metodologias de desenvolvimento de software'),
    to: t(ARQ, 'Metodologias ágeis'),
    kind: 'CONTINUIDADE',
    strength: 1,
    note: 'O ágil se define por contraste com os modelos prescritivos (cascata, iterativo).'
  },
  {
    from: t(ARQ, 'Engenharia de requisitos'),
    to: t(ARQ, 'Técnicas de elicitação de requisitos'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Elicitação é a primeira atividade do processo de requisitos.'
  },
  {
    from: t(ARQ, 'Técnicas de elicitação de requisitos'),
    to: t(ARQ, 'Especificação de requisitos'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'O que foi elicitado é documentado na especificação.'
  },
  {
    from: t(ARQ, 'Especificação de requisitos'),
    to: t(ARQ, 'Técnicas de validação de requisitos'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'A validação confere se a especificação reflete a necessidade real.'
  },
  {
    from: t(ARQ, 'Engenharia de requisitos'),
    to: t(ARQ, 'Gerenciamento de requisitos'),
    kind: 'CONTINUIDADE',
    strength: 0.5,
    note: 'Gerenciar mudanças e rastreabilidade acompanha todo o processo de requisitos.'
  },
  {
    from: t(ARQ, 'Prototipação'),
    to: t(ARQ, 'Técnicas de elicitação de requisitos'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'O protótipo é técnica clássica de elicitação/validação de requisitos.'
  },
  {
    from: t(ARQ, 'Engenharia de usabilidade'),
    to: t(ARQ, 'Análise de requisitos de usabilidade'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Sequência curricular do próprio edital (itens 12 → 13).'
  },
  {
    from: t(ARQ, 'Análise de requisitos de usabilidade'),
    to: t(ARQ, 'Métodos para avaliação de usabilidade'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Requisitos definidos são verificados por avaliação (heurísticas, testes com usuário).'
  },
  {
    from: t(ARQ, 'Orientação a objetos'),
    to: t(ARQ, 'SOLID'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Os princípios SOLID pressupõem classes, herança, polimorfismo e encapsulamento.'
  },
  {
    from: t(ARQ, 'Orientação a objetos'),
    to: t(ARQ, 'Análise e projeto orientados a objetos'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'A análise/projeto OO aplica os conceitos do paradigma em nível de sistema.'
  },
  {
    from: t(ARQ, 'SOLID'),
    to: t(ARQ, 'Padrões de projeto'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'Padrões GoF materializam princípios SOLID (ex.: Strategy resolve violações de OCP).'
  },
  {
    from: t(ARQ, 'SOLID'),
    to: t(ARQ, 'GRASP'),
    kind: 'SEMELHANTE',
    strength: 0.5,
    note: 'Dois catálogos de princípios de responsabilidade — a banca os contrasta.'
  },
  {
    from: t(ARQ, 'GRASP'),
    to: t(ARQ, 'Análise e projeto orientados a objetos'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'GRASP orienta a atribuição de responsabilidades durante o projeto OO.'
  },
  {
    from: t(ARQ, 'Análise e projeto orientados a objetos'),
    to: t(ARQ, 'UML: visão geral, modelos e diagramas'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'A UML é a notação padrão para expressar análise e projeto OO.'
  },
  {
    from: t(ARQ, 'TDD'),
    to: t(ARQ, 'BDD'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'BDD evolui o TDD para a linguagem de comportamento (Given/When/Then).'
  },
  {
    from: t(ARQ, 'TDD'),
    to: t(ARQ, 'Qualidade de software'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'Testes automatizados são instrumento direto de garantia de qualidade.'
  },
  {
    from: t(ARQ, 'Qualidade de software'),
    to: t(ARQ, 'Engenharia de desempenho: técnicas de análise de desempenho'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Desempenho é atributo de qualidade (ISO 25010) analisado por técnicas próprias.'
  },
  {
    from: t(ARQ, 'Metodologias ágeis'),
    to: t(ARQ, 'TDD'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'TDD é prática de engenharia do XP — nasce dentro do movimento ágil.'
  },

  // ── DevOps → CI/CD → DevSecOps (com Git/GitLab) ──
  {
    from: t(ARQ, 'Controle de versão'),
    to: t(ARQ, 'Integração contínua'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'CI dispara a partir do commit — sem versionamento não há integração contínua.'
  },
  {
    from: t(ARQ, 'Integração contínua'),
    to: t(ARQ, 'DevSecOps'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'DevSecOps injeta segurança (SAST/DAST/SCA) no pipeline de CI/CD.'
  },
  {
    from: t(ARQ, 'Controle de versão'),
    to: t(LING, 'GitLab'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'GitLab é a materialização prática do controle de versão (Git) cobrada no edital.'
  },
  {
    from: t(ARQ, 'Integração contínua'),
    to: t(LING, 'GitLab'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'GitLab CI/CD (.gitlab-ci.yml, stages, runners) implementa a integração contínua.'
  },

  // ── Nuvem: conceitos → modelos → componentes → plataformas ──
  {
    from: t(NUVEM, 'Conceitos de computação em nuvem'),
    to: t(NUVEM, 'Modelos de implantação: nuvem privada, pública e híbrida'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Sequência natural: o que é nuvem → como se implanta.'
  },
  {
    from: t(NUVEM, 'Conceitos de computação em nuvem'),
    to: t(NUVEM, 'Benefícios da computação em nuvem'),
    kind: 'CONTINUIDADE',
    strength: 0.5,
    note: 'Os benefícios derivam das características essenciais (elasticidade, serviço medido).'
  },
  {
    from: t(NUVEM, 'Conceitos de computação em nuvem'),
    to: t(NUVEM, 'Componentes centrais da arquitetura em nuvem'),
    kind: 'CONTINUIDADE',
    strength: 0.5,
    note: 'Regiões, zonas e subscrições concretizam a arquitetura conceitual.'
  },
  {
    from: t(NUVEM, 'Zonas de disponibilidade'),
    to: t(NUVEM, 'Alta disponibilidade'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'Distribuir workloads entre AZs é o mecanismo padrão de HA intra-região.'
  },
  {
    from: t(NUVEM, 'Escalabilidade'),
    to: t(NUVEM, 'Elasticidade'),
    kind: 'SEMELHANTE',
    strength: 1,
    note: 'Distinção favorita de prova: capacidade de crescer × ajuste automático bidirecional.'
  },
  {
    from: t(BD, 'Backup'),
    to: t(NUVEM, 'Recuperação de desastres'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'Backup é a base das estratégias de DR; RTO/RPO são métricas comuns aos dois.'
  },
  {
    from: t(NUVEM, 'Conceitos de computação em nuvem'),
    to: t(NUVEM, 'Kubernetes'),
    kind: 'RELACIONADO',
    strength: 0.75,
    note: 'Kubernetes é a plataforma padrão de orquestração das nuvens (ofertas gerenciadas em todos os provedores).'
  },
  {
    from: t(NUVEM, 'Conceitos de computação em nuvem'),
    to: t(ARQ, 'DevSecOps'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Self-service e automação da nuvem viabilizam as práticas DevOps/DevSecOps.'
  },

  // ── Virtualização → contêineres → orquestração → registry/segurança ──
  {
    from: t(NUVEM, 'VMware vCenter Server'),
    to: t(NUVEM, 'Docker'),
    kind: 'CONTINUIDADE',
    strength: 0.5,
    note: 'Da virtualização de hardware (VMs/vSphere) para a virtualização no nível do SO (contêineres).'
  },
  {
    from: t(NUVEM, 'Docker'),
    to: t(NUVEM, 'Kubernetes'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'O K8s orquestra contêineres — imagem/contêiner/registry vêm antes de pod/deployment/service.'
  },
  {
    from: t(NUVEM, 'Docker'),
    to: t(NUVEM, 'Harbor'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'Imagens construídas precisam de um registry para armazenamento e distribuição.'
  },
  {
    from: t(NUVEM, 'Harbor'),
    to: t(NUVEM, 'Red Hat Clair'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'O Harbor integra o Clair para escanear vulnerabilidades (CVE) nas imagens.'
  },
  {
    from: t(NUVEM, 'Red Hat Clair'),
    to: t(ARQ, 'DevSecOps'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'Escaneamento de imagens é prática DevSecOps aplicada ao pipeline de contêineres.'
  },
  {
    from: t(REDES, 'VLANs'),
    to: t(NUVEM, 'VMware NSX'),
    kind: 'CONTINUIDADE',
    strength: 0.75,
    note: 'O NSX virtualiza a rede por software — evolução da segmentação por VLAN.'
  },
  {
    from: t(NUVEM, 'VMware vCenter Server'),
    to: t(NUVEM, 'VMware vRealize Automation'),
    kind: 'PRE_REQUISITO',
    strength: 0.5,
    note: 'O vRA automatiza o provisionamento sobre a infraestrutura gerida pelo vCenter.'
  },
  {
    from: t(NUVEM, 'Modelos de implantação: nuvem privada, pública e híbrida'),
    to: t(NUVEM, 'VMware vCloud Director'),
    kind: 'RELACIONADO',
    strength: 0.75,
    note: 'O vCloud Director constrói nuvens privadas/multi-tenant sobre o vSphere.'
  },
  {
    from: t(NUVEM, 'VMware vRealize Operations'),
    to: t(NUVEM, 'VMware vRealize Log Insight'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'Monitoração de desempenho e análise de logs — dupla de observabilidade do stack VMware.'
  },
  {
    from: t(NUVEM, 'VMware vRealize Operations'),
    to: t(NUVEM, 'Kubernetes'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Em datacenters VMware, clusters Kubernetes rodam sobre o vSphere e são monitorados pelo vROps (Tanzu).'
  },
  {
    from: t(NUVEM, 'Infrastructure as Code (IaC)'),
    to: t(NUVEM, 'Automação'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'IaC é a forma versionada e reprodutível de automatizar o provisionamento.'
  },
  {
    from: t(NUVEM, 'Infrastructure as Code (IaC)'),
    to: t(ARQ, 'Integração contínua'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'O código de infraestrutura é aplicado pelos mesmos pipelines de CI/CD (GitOps).'
  },
  {
    from: t(NUVEM, 'Identidade, privacidade, conformidade e segurança na nuvem'),
    to: t(BD, 'Segurança de dados'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'Criptografia, menor privilégio e auditoria valem para o SGBD e para a nuvem.'
  },
  {
    from: t(REDES, 'Camada de rede: IPsec'),
    to: t(NUVEM, 'Identidade, privacidade, conformidade e segurança na nuvem'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'VPNs IPsec conectam datacenter e nuvem (cenário híbrido) com sigilo e integridade.'
  },

  // ── Linguagens: trilhas Java e front-end; mensageria → microsserviços ──
  {
    from: t(LING, 'JavaScript'),
    to: t(LING, 'React.js'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'React é uma biblioteca JavaScript — JSX, estado e hooks pressupõem a linguagem.'
  },
  {
    from: t(LING, 'HTML5'),
    to: t(LING, 'React.js'),
    kind: 'PRE_REQUISITO',
    strength: 0.5,
    note: 'JSX descreve marcação; semântica HTML vem antes.'
  },
  {
    from: t(LING, 'CSS3'),
    to: t(LING, 'React.js'),
    kind: 'PRE_REQUISITO',
    strength: 0.5,
    note: 'Estilização de componentes usa CSS (flexbox/grid, responsividade).'
  },
  {
    from: t(LING, 'Java'),
    to: t(LING, 'Java EE'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'EJB, JPA e JMS são especificações construídas sobre a linguagem Java.'
  },
  {
    from: t(LING, 'Java'),
    to: t(LING, 'Spring Boot'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Spring Boot é o framework Java dominante — anotações e beans pressupõem a linguagem.'
  },
  {
    from: t(LING, 'Spring Boot'),
    to: t(LING, 'Spring Cloud'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Os projetos Spring Cloud rodam sobre aplicações Spring Boot.'
  },
  {
    from: t(ARQ, 'REST'),
    to: t(LING, 'Spring Boot'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: '@RestController implementa APIs REST — o estilo arquitetural vem antes do framework.'
  },
  {
    from: t(LING, 'JPA (Java Persistence API)'),
    to: t(BD, 'SQL (ANSI)'),
    kind: 'DEPENDE_DE',
    strength: 0.75,
    note: 'ORM mapeia entidades para o modelo relacional; JPQL traduz para SQL.'
  },
  {
    from: t(LING, 'JMS (Java Message Service)'),
    to: t(LING, 'Confluent Kafka'),
    kind: 'SEMELHANTE',
    strength: 0.75,
    note: 'Dois modelos de mensageria: JMS remove a mensagem consumida; Kafka é log durável com offsets.'
  },
  {
    from: t(LING, 'Confluent Kafka'),
    to: t(LING, 'Spring Cloud'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'Mensageria desacopla microsserviços — o Spring Cloud Stream usa Kafka como binder.'
  },
  {
    from: t(NUVEM, 'Kubernetes'),
    to: t(LING, 'Spring Cloud'),
    kind: 'COMPLEMENTA',
    strength: 0.5,
    note: 'Microsserviços Spring são implantados em K8s; descoberta/config nativas se sobrepõem a Eureka/Config.'
  }
]
