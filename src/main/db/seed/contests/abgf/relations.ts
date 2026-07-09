// Grafo de aprendizagem da ABGF 2026 — relações reais entre tópicos (M18).
import type { SeedRelation } from '../types'

const t = (disciplineSlug: string, topic: string): { disciplineSlug: string; topic: string } => ({
  disciplineSlug,
  topic
})

export const ABGF_RELATIONS: SeedRelation[] = [
  // ── Trilha de redes → infraestrutura → nuvem → DevOps ──
  {
    from: t('fundamentos-sistemas-redes', 'Sistemas Operacionais'),
    to: t('nuvem-infraestrutura', 'Virtualização: máquinas virtuais; redes virtualizadas; alta disponibilidade'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Processos/memória/arquivos fundamentam a virtualização.'
  },
  {
    from: t('fundamentos-sistemas-redes', 'Conteinerização e virtualização (conceitos de SO)'),
    to: t('nuvem-infraestrutura', 'Contêineres e orquestração: Docker; Kubernetes'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'Namespaces/cgroups explicam por que contêiner ≠ VM.'
  },
  {
    from: t('fundamentos-sistemas-redes', 'Redes de Computadores'),
    to: t('nuvem-infraestrutura', 'Computação em Nuvem'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('nuvem-infraestrutura', 'Computação em Nuvem'),
    to: t('nuvem-infraestrutura', 'Contêineres e orquestração: Docker; Kubernetes'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('nuvem-infraestrutura', 'Contêineres e orquestração: Docker; Kubernetes'),
    to: t('devops-cicd', 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)'),
    kind: 'CONTINUIDADE',
    strength: 1,
    note: 'Contêineres são o veículo padrão dos pipelines CI/CD.'
  },
  {
    from: t('devops-cicd', 'Versionamento de código: Git — branching e merging; GitHub/GitLab'),
    to: t('devops-cicd', 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)'),
    kind: 'PRE_REQUISITO',
    strength: 1,
    note: 'CI começa no commit — Git é a base.'
  },
  {
    from: t('devops-cicd', 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)'),
    to: t('devops-cicd', 'DevSecOps: integração de segurança no ciclo de desenvolvimento'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('devops-cicd', 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible'),
    to: t('nuvem-infraestrutura', 'Computação em Nuvem'),
    kind: 'DEPENDE_DE',
    strength: 0.5,
    note: 'IaC provisiona recursos de nuvem — entenda a nuvem antes.'
  },
  {
    from: t('nuvem-infraestrutura', 'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch'),
    to: t('devops-cicd', 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)'),
    kind: 'COMPLEMENTA',
    strength: 0.5
  },

  // ── Trilha de banco de dados → analytics ──
  {
    from: t('banco-de-dados', 'Conceitos de SGBD'),
    to: t('banco-de-dados', 'Linguagem SQL (ANSI)'),
    kind: 'PRE_REQUISITO',
    strength: 1
  },
  {
    from: t('banco-de-dados', 'Modelagem de dados: modelo entidade-relacionamento (ER); mapeamento para o modelo relacional'),
    to: t('banco-de-dados', 'Conceitos de SGBD'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75
  },
  {
    from: t('banco-de-dados', 'Linguagem SQL (ANSI)'),
    to: t('banco-de-dados', 'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('banco-de-dados', 'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse'),
    to: t('banco-de-dados', 'Engenharia de dados: ingestão, transformação e enriquecimento; ETL/ELT; batch e stream; governança'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('banco-de-dados', 'Engenharia de dados: ingestão, transformação e enriquecimento; ETL/ELT; batch e stream; governança'),
    to: t('dados-ml-ia', 'Análise de dados: coleta, validação e tratamento; análise exploratória; padrões e tendências'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Dados bem preparados antecedem qualquer análise/modelo.'
  },
  {
    from: t('dados-ml-ia', 'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão'),
    to: t('dados-ml-ia', 'Noções de aprendizado de máquina'),
    kind: 'PRE_REQUISITO',
    strength: 1
  },
  {
    from: t('dados-ml-ia', 'Noções de aprendizado de máquina'),
    to: t('dados-ml-ia', 'MLOps (noções): treinamento, implantação e monitoramento de modelos'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('nocoes-analise-dados', 'Estatística descritiva aplicada: posição, dispersão, correlação; leitura de gráficos e tabelas'),
    to: t('dados-ml-ia', 'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão'),
    kind: 'SEMELHANTE',
    strength: 0.75,
    note: 'O mesmo núcleo estatístico cobrado em CG e em CE.'
  },
  {
    from: t('nocoes-analise-dados', 'Ciclo de análise de dados (CRISP-DM): negócio, dados, preparação, modelagem, avaliação e implantação'),
    to: t('dados-ml-ia', 'Análise de dados: coleta, validação e tratamento; análise exploratória; padrões e tendências'),
    kind: 'RELACIONADO',
    strength: 0.5
  },

  // ── Trilha de segurança (CG ↔ CE) ──
  {
    from: t('protecao-dados-seguranca', 'Segurança da informação: princípios CID; principais ameaças e ataques; controles defensivos'),
    to: t('seguranca-cibernetica', 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID'),
    kind: 'SEMELHANTE',
    strength: 1,
    note: 'O mesmo conteúdo em profundidades diferentes (CG × CE).'
  },
  {
    from: t('seguranca-cibernetica', 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID'),
    to: t('seguranca-cibernetica', 'Principais tipos de ataques e ameaças'),
    kind: 'CONTINUIDADE',
    strength: 1
  },
  {
    from: t('seguranca-cibernetica', 'Principais tipos de ataques e ameaças'),
    to: t('seguranca-cibernetica', 'Segurança defensiva: firewall, IDS/IPS, WAF, VPN, proxy, antimalware; defesa em profundidade; hardening'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('seguranca-cibernetica', 'Criptografia'),
    to: t('seguranca-cibernetica', 'Controle de autenticação e autorização'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Tokens/assinaturas (JWT, certificados) assentam em criptografia.'
  },
  {
    from: t('protecao-dados-seguranca', 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD'),
    to: t('seguranca-cibernetica', 'LGPD (Lei nº 13.709/2018) e Marco Civil da Internet (Lei nº 12.965/2014)'),
    kind: 'SEMELHANTE',
    strength: 1,
    note: 'A mesma lei cobrada nas duas provas.'
  },
  {
    from: t('protecao-dados-seguranca', 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD'),
    to: t('dados-ml-ia', 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada'),
    kind: 'RELACIONADO',
    strength: 0.5
  },
  {
    from: t('seguranca-cibernetica', 'Segurança ofensiva (noções): OWASP Top 10; testes de segurança e gestão de vulnerabilidades'),
    to: t('engenharia-software', 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada'),
    kind: 'COMPLEMENTA',
    strength: 0.75
  },

  // ── Engenharia de software ──
  {
    from: t('engenharia-software', 'Fundamentos de linguagens: tipos de dados; estruturas de controle; modularização; programação assíncrona'),
    to: t('engenharia-software', 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências'),
    kind: 'PRE_REQUISITO',
    strength: 1
  },
  {
    from: t('engenharia-software', 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências'),
    to: t('engenharia-software', 'Práticas e padrões de arquitetura'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('engenharia-software', 'Práticas e padrões de arquitetura'),
    to: t('engenharia-software', 'Integração de sistemas: APIs REST; API gateway; integração síncrona/assíncrona; segurança de APIs'),
    kind: 'CONTINUIDADE',
    strength: 0.75
  },
  {
    from: t('fundamentos-sistemas-redes', 'Algoritmos e Estruturas de Dados'),
    to: t('engenharia-software', 'Fundamentos de linguagens: tipos de dados; estruturas de controle; modularização; programação assíncrona'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('engenharia-software', 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados'),
    to: t('devops-cicd', 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)'),
    kind: 'COMPLEMENTA',
    strength: 0.75,
    note: 'CI sem testes automatizados não existe.'
  },

  // ── Gestão, governança e negócio ABGF ──
  {
    from: t('gestao-ti', 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua'),
    to: t('gestao-ti', 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'A FCC adora contrastar governança (COBIT) × gestão (ITIL).'
  },
  {
    from: t('etica-governanca-compliance', 'Governança corporativa: princípios e boas práticas (IBGC); estruturas de governança; Lei nº 13.303/2016'),
    to: t('gestao-ti', 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle'),
    kind: 'RELACIONADO',
    strength: 0.5
  },
  {
    from: t('direito-const-adm', 'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista'),
    to: t('etica-governanca-compliance', 'Governança corporativa: princípios e boas práticas (IBGC); estruturas de governança; Lei nº 13.303/2016'),
    kind: 'ESTUDADO_JUNTO',
    strength: 0.75,
    note: 'A Lei 13.303 aparece nas duas disciplinas.'
  },
  {
    from: t('economia-financas-garantias', 'Sistema Financeiro Nacional: CMN, BCB e CVM; instrumentos financeiros; Basileia III (noções)'),
    to: t('economia-financas-garantias', 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações'),
    kind: 'PRE_REQUISITO',
    strength: 0.75
  },
  {
    from: t('economia-financas-garantias', 'Garantias e fundos garantidores: modalidades; fundos públicos; FGE como instrumento de apoio às exportações'),
    to: t('economia-financas-garantias', 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF'),
    kind: 'CONTINUIDADE',
    strength: 1,
    note: 'FGE lastreia o SCE — a razão de existir da ABGF.'
  },
  {
    from: t('economia-financas-garantias', 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF'),
    to: t('economia-financas-garantias', 'Mercado de seguros e resseguros: seguro, cosseguro, resseguro e retrocessão; contratos e modalidades'),
    kind: 'COMPLEMENTA',
    strength: 0.75
  }
]
