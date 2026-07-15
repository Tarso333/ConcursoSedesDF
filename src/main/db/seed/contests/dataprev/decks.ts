// Decks iniciais de flashcards da DATAPREV 2026 (M15: flashcards ligados a
// tópicos do conhecimento; entram na fila FSRS imediatamente).
import type { SeedStarterDeck } from '../types'

export const DATAPREV_STARTER_DECKS: SeedStarterDeck[] = [
  {
    name: 'DATAPREV — Redes, Nuvem e Sustentação',
    disciplineSlug: 'nuvem-infraestrutura',
    description:
      'Distinções de infraestrutura que a FGV mais cobra no Perfil 2, prontas para revisão espaçada.',
    cards: [
      {
        front: 'PDU de cada camada (OSI 1–4)',
        back: 'Física: bit · Enlace: quadro · Rede: pacote · Transporte: segmento.',
        topic: {
          disciplineSlug: 'redes-de-computadores',
          topic: 'Noções dos modelos de referência OSI (Open Systems Interconnection)'
        }
      },
      {
        front: 'Hub × switch × roteador — camadas OSI',
        back: 'Hub/repetidor: camada 1 · Switch: camada 2 (MAC) · Roteador: camada 3 (IP).',
        topic: {
          disciplineSlug: 'redes-de-computadores',
          topic: 'Elementos de interconexão de redes de computadores'
        }
      },
      {
        front: 'TCP × UDP em uma linha',
        back: 'TCP: conexão, confiável, ordenado, controle de fluxo/congestionamento. UDP: sem conexão, sem garantias, rápido (DNS, streaming, VoIP).',
        topic: { disciplineSlug: 'redes-de-computadores', topic: 'Camada de transporte: TCP e UDP' }
      },
      {
        front: 'IPsec: AH × ESP',
        back: 'AH: autenticação/integridade, SEM sigilo. ESP: cifra (confidencialidade) + autenticação. Modo túnel protege o pacote inteiro (VPN site-to-site).',
        topic: { disciplineSlug: 'redes-de-computadores', topic: 'Camada de rede: IPsec' }
      },
      {
        front: 'Portas: SSH, DNS, HTTP, HTTPS, RDP',
        back: 'SSH 22 · DNS 53 · HTTP 80 · HTTPS 443 · RDP 3389.',
        topic: { disciplineSlug: 'redes-de-computadores', topic: 'Arquitetura e pilhas de protocolos TCP/IP' }
      },
      {
        front: 'IaaS × PaaS × SaaS — o que o cliente gerencia?',
        back: 'IaaS: do SO para cima. PaaS: só aplicação e dados. SaaS: nada — apenas usa.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Conceitos de computação em nuvem' }
      },
      {
        front: 'Escalabilidade × elasticidade',
        back: 'Escalabilidade: CAPACIDADE de crescer. Elasticidade: ajuste AUTOMÁTICO e nos dois sentidos conforme a demanda (auto scaling).',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Elasticidade' }
      },
      {
        front: 'Região × zona de disponibilidade',
        back: 'Região: área geográfica. AZ: datacenters isolados DENTRO da região (energia/rede próprias) — base da HA intra-região.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Zonas de disponibilidade' }
      },
      {
        front: 'VM × contêiner',
        back: 'VM: virtualiza HARDWARE via hipervisor, tem SO convidado. Contêiner: compartilha o KERNEL do host (namespaces/cgroups) — leve, boot em segundos.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Docker' }
      },
      {
        front: 'Pod no Kubernetes',
        back: 'Menor unidade implantável: um ou mais contêineres que compartilham rede e armazenamento. Deployment gerencia réplicas; Service dá endereço estável.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Kubernetes' }
      },
      {
        front: 'Harbor e Clair — papéis',
        back: 'Harbor: registry privado de imagens (RBAC, replicação). Clair: escaneia as imagens em busca de vulnerabilidades conhecidas (CVE).',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Harbor' }
      },
      {
        front: 'vRealize: Automation × Operations × Log Insight × Orchestrator',
        back: 'Automation: provisionamento self-service · Operations: monitoramento/capacidade · Log Insight: logs · Orchestrator: workflows.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'VMware vRealize Operations' }
      },
      {
        front: 'RPO × RTO',
        back: 'RPO: quanto de DADO se admite perder (ponto de recuperação). RTO: quanto TEMPO se admite ficar fora (retorno da operação).',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Recuperação de desastres' }
      },
      {
        front: 'IaC declarativo × imperativo',
        back: 'Declarativo: descreve o ESTADO desejado (Terraform, K8s). Imperativo: descreve os PASSOS. Idempotência e drift completam o trio de prova.',
        topic: { disciplineSlug: 'nuvem-infraestrutura', topic: 'Infrastructure as Code (IaC)' }
      }
    ]
  },
  {
    name: 'DATAPREV — Engenharia, Dados e Java',
    disciplineSlug: 'engenharia-software',
    description: 'Conceitos de engenharia de software, banco de dados e stack Java para revisão espaçada.',
    cards: [
      {
        front: 'Formas normais (1FN, 2FN, 3FN)',
        back: '1FN: atributos atômicos. 2FN: sem dependência PARCIAL (chave composta). 3FN: sem dependência TRANSITIVA.',
        topic: { disciplineSlug: 'banco-de-dados', topic: 'Normalização de dados' }
      },
      {
        front: 'WHERE × HAVING',
        back: 'WHERE filtra LINHAS antes do agrupamento; HAVING filtra GRUPOS/agregações após o GROUP BY.',
        topic: { disciplineSlug: 'banco-de-dados', topic: 'SQL (ANSI)' }
      },
      {
        front: 'Backup diferencial × incremental',
        back: 'Diferencial: tudo desde o último COMPLETO (restaura full + último diff). Incremental: desde o último backup de QUALQUER tipo (restaura full + todos).',
        topic: { disciplineSlug: 'banco-de-dados', topic: 'Backup' }
      },
      {
        front: 'Data warehouse × data lake',
        back: 'Warehouse: dado tratado, schema-on-WRITE, BI. Lake: dado bruto em qualquer formato, schema-on-READ, ciência de dados.',
        topic: {
          disciplineSlug: 'banco-de-dados',
          topic: 'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)'
        }
      },
      {
        front: 'SOLID — os 5 princípios',
        back: 'S: uma razão para mudar · O: aberto p/ extensão, fechado p/ modificação · L: subtipo substitui o base · I: interfaces enxutas · D: dependa de abstrações.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'SOLID' }
      },
      {
        front: 'Ciclo do TDD',
        back: 'Red (teste que falha, ANTES do código) → Green (código mínimo para passar) → Refactor (melhorar design com testes verdes).',
        topic: { disciplineSlug: 'engenharia-software', topic: 'TDD' }
      },
      {
        front: 'Agregação × composição (UML)',
        back: 'Agregação: losango VAZIO, partes independentes. Composição: losango CHEIO, partes morrem com o todo.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'UML: visão geral, modelos e diagramas' }
      },
      {
        front: 'Verbos HTTP idempotentes no REST',
        back: 'GET, PUT e DELETE são idempotentes; POST NÃO é (cada chamada pode criar novo recurso). PATCH altera parcialmente.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Interoperabilidade de sistemas e padrões de integração' }
      },
      {
        front: 'CI × Continuous Delivery × Continuous Deployment',
        back: 'CI: integra+testa a cada commit. Delivery: artefato sempre PRONTO (gate manual). Deployment: produção automática.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Gestão de Configuração' }
      },
      {
        front: 'SAST × DAST × SCA',
        back: 'SAST: análise ESTÁTICA do fonte. DAST: aplicação em EXECUÇÃO (caixa preta). SCA: vulnerabilidades nas DEPENDÊNCIAS.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'DevSecOps' }
      },
      {
        front: 'Scrum: papéis e eventos',
        back: 'PO (valor/backlog), Scrum Master (processo), Developers. Sprint ≤ 1 mês: Planning, Daily 15min, Review (produto), Retrospective (processo).',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Metodologias ágeis' }
      },
      {
        front: 'JPA × Hibernate',
        back: 'JPA é a ESPECIFICAÇÃO de ORM (Entity, EntityManager, JPQL); Hibernate é uma IMPLEMENTAÇÃO. Não inverter!',
        topic: { disciplineSlug: 'linguagens-frameworks', topic: 'JPA (Java Persistence API)' }
      },
      {
        front: 'JMS: queue × topic',
        back: 'Queue (point-to-point): cada mensagem vai para UM consumidor. Topic (pub/sub): TODOS os assinantes recebem.',
        topic: { disciplineSlug: 'linguagens-frameworks', topic: 'JMS (Java Message Service)' }
      },
      {
        front: 'Kafka: ordem das mensagens',
        back: 'Garantida POR PARTIÇÃO (não por tópico). Mesma chave → mesma partição. Mensagens NÃO somem ao serem lidas (retenção por política).',
        topic: { disciplineSlug: 'linguagens-frameworks', topic: 'Confluent Kafka' }
      },
      {
        front: 'Spring Boot — trio de prova',
        back: 'Autoconfiguração + starters + servidor embarcado (JAR autônomo). Actuator dá health/metrics. @SpringBootApplication = Configuration + EnableAutoConfiguration + ComponentScan.',
        topic: { disciplineSlug: 'linguagens-frameworks', topic: 'Spring Boot' }
      },
      {
        front: 'React: props × state',
        back: 'Props: imutáveis, do pai para o filho (fluxo unidirecional). State: interno e mutável (useState) — muda e re-renderiza via Virtual DOM.',
        topic: { disciplineSlug: 'linguagens-frameworks', topic: 'React.js' }
      }
    ]
  }
]
