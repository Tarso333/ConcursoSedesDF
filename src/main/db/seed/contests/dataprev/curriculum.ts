// Currículo do concurso DATAPREV 2026 (FGV) — Perfil 2: Arquitetura,
// Engenharia e Sustentação Tecnológica. FASE 1: somente as disciplinas de
// CONHECIMENTOS ESPECÍFICOS (Módulo II) do Perfil 2, transcritas do PDF
// oficial (Edital nº 001/2026). O Módulo I (Conhecimentos Gerais) entra na
// Fase 2 — decisão documentada em dataprev/index.ts.
//
// Estimativas de questões (examQuestionEstimate) somam 30 (total do Módulo
// II na prova). A distribuição por disciplina NÃO é pública no edital; os
// valores abaixo são estimativas fundamentadas no tamanho/peso de cada
// seção do conteúdo programático (documentado em dataprev/index.ts).
//
// Slugs 'banco-de-dados', 'engenharia-software' e 'nuvem-infraestrutura'
// são deliberadamente os MESMOS da ABGF 2026 — o fator multiConcurso (M16)
// ativa sozinho para disciplinas compartilhadas entre concursos.
import type { SeedDiscipline } from '../../curriculum'

export const DATAPREV_CURRICULUM: SeedDiscipline[] = [
  // ───────── Conhecimentos Específicos — Perfil 2 (30 itens, peso 2,5) ─────────
  {
    slug: 'redes-de-computadores',
    name: 'Redes de Computadores',
    block: 'ESPECIFICO',
    weight: 2.5,
    examQuestionEstimate: 5,
    color: '#0ea5e9',
    topics: [
      {
        name: 'Conceitos de redes de computadores',
        children: [
          'Meios de transmissão',
          'Classificação de redes',
          'Topologia de redes',
          'Redes de longa distância (WAN)',
          'Redes locais (LAN)',
          'Redes sem fio'
        ]
      },
      {
        name: 'Elementos de interconexão de redes de computadores',
        children: ['Hubs repetidores', 'Switches', 'Roteadores', 'VLANs', 'Cabeamento estruturado']
      },
      'Noções dos modelos de referência OSI (Open Systems Interconnection)',
      {
        name: 'Noções dos padrões IEEE 802.1, 802.3 e 802.11',
        children: ['IEEE 802.1', 'IEEE 802.3 (Ethernet)', 'IEEE 802.11 a/b/g/n/ac (redes sem fio)']
      },
      {
        name: 'Arquitetura e pilhas de protocolos TCP/IP',
        children: [
          'Camada de rede: IPv4',
          'Camada de rede: IPv6',
          'Camada de rede: IPsec',
          'Endereçamento e roteamento: conceitos básicos',
          'Camada de transporte: TCP e UDP',
          'Camada de aplicação: FTP, SSH, SMTP, POP e IMAP',
          'Camada de aplicação: HTTP, HTTPS e SSL',
          'Camada de aplicação: RDP e DHCP',
          'Sistemas de nomes (DNS)'
        ]
      }
    ]
  },
  {
    slug: 'banco-de-dados',
    name: 'Banco de Dados',
    block: 'ESPECIFICO',
    weight: 2.5,
    examQuestionEstimate: 6,
    color: '#f97316',
    topics: [
      'Banco de dados',
      'Conceitos básicos',
      'Arquitetura de banco de dados',
      'Estrutura de dados',
      {
        name: 'Modelagem e normalização de dados',
        children: ['Modelagem de dados', 'Normalização de dados']
      },
      'Noções de administração de dados e de banco de dados',
      {
        name: 'SQL (ANSI)',
        children: ['Oracle 19c', 'MySQL', 'PostgreSQL', 'MongoDB', 'MS-SQL Server 2019']
      },
      {
        name: 'Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados',
        children: [
          'Políticas de armazenamento',
          'Backup',
          'Restauração',
          'Segurança de dados',
          'Monitoração de dados'
        ]
      },
      'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)',
      'Noções para otimização de performance em larga escala'
    ]
  },
  {
    slug: 'engenharia-software',
    name: 'Arquitetura Tecnológica',
    block: 'ESPECIFICO',
    weight: 2.5,
    examQuestionEstimate: 8,
    color: '#8b5cf6',
    topics: [
      'Ciclo de vida do software',
      'Metodologias de desenvolvimento de software',
      'Metodologias ágeis',
      'Qualidade de software',
      {
        name: 'Gestão de Configuração',
        children: ['Controle de versão', 'Controle de mudança', 'Integração contínua']
      },
      'Engenharia de requisitos',
      'Técnicas de elicitação de requisitos',
      'Gerenciamento de requisitos',
      'Especificação de requisitos',
      'Técnicas de validação de requisitos',
      'Prototipação',
      'Engenharia de usabilidade',
      'Análise de requisitos de usabilidade',
      'Métodos para avaliação de usabilidade',
      {
        name: 'Orientação a objetos',
        children: ['Classes e objetos', 'Relacionamentos', 'Herança e polimorfismo', 'Encapsulamento']
      },
      'SOLID',
      'GRASP',
      'TDD',
      'BDD',
      'Padrões de projeto',
      'Análise e projeto orientados a objetos',
      'UML: visão geral, modelos e diagramas',
      {
        name: 'Interoperabilidade de sistemas e padrões de integração',
        children: ['APIs', 'Gateway de APIs', 'Web Services', 'XML', 'JSON', 'REST']
      },
      'Engenharia de desempenho: técnicas de análise de desempenho',
      'DevSecOps'
    ]
  },
  {
    slug: 'nuvem-infraestrutura',
    name: 'Computação em Nuvem e Virtualização',
    block: 'ESPECIFICO',
    weight: 2.5,
    examQuestionEstimate: 6,
    color: '#06b6d4',
    topics: [
      {
        name: 'Conceitos de computação em nuvem',
        children: ['Conceitos básicos de nuvem', 'Tipologia: IaaS, PaaS e SaaS']
      },
      'Modelos de implantação: nuvem privada, pública e híbrida',
      {
        name: 'Benefícios da computação em nuvem',
        children: [
          'Alta disponibilidade',
          'Escalabilidade',
          'Elasticidade',
          'Agilidade',
          'Recuperação de desastres'
        ]
      },
      {
        name: 'Componentes centrais da arquitetura em nuvem',
        children: [
          'Distribuição geográfica',
          'Regiões',
          'Zonas de disponibilidade',
          'Subscrições',
          'Grupos de gestão',
          'Recursos'
        ]
      },
      'Identidade, privacidade, conformidade e segurança na nuvem',
      'Infrastructure as Code (IaC)',
      'Automação',
      'Red Hat Clair',
      {
        name: 'Contêineres e virtualização: Docker, Harbor, Kubernetes e VMware',
        children: [
          'Docker',
          'Harbor',
          'Kubernetes',
          'VMware NSX',
          'VMware vCenter Server',
          'VMware vCloud Director',
          'VMware vRealize Automation',
          'VMware vRealize Log Insight',
          'VMware vRealize Operations',
          'VMware vRealize Orchestrator'
        ]
      }
    ]
  },
  {
    slug: 'linguagens-frameworks',
    name: 'Linguagem de Programação, Frameworks e Versionamento de Software',
    block: 'ESPECIFICO',
    weight: 2.5,
    examQuestionEstimate: 5,
    color: '#22c55e',
    topics: [
      'GitLab',
      'HTML5',
      'CSS3',
      'Java',
      'JavaScript',
      'React.js',
      {
        name: 'Java EE',
        children: ['EJB (Enterprise JavaBeans)', 'JPA (Java Persistence API)', 'JMS (Java Message Service)']
      },
      'Spring Boot',
      'Spring Cloud',
      'Confluent Kafka'
    ]
  }
]
