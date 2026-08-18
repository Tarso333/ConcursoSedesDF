// M29 — Flashcards (decks iniciais) da ABGF 2026. APENAS DADOS; idempotentes
// por nome de deck. Entram na fila FSRS ao serem criados. Formatos variados:
// pergunta direta, comparação (X × Y), completar e "pegadinha".
import type { SeedStarterDeck } from '../types'

const REDES = 'fundamentos-sistemas-redes'
const BD = 'banco-de-dados'
const SEG = 'seguranca-cibernetica'
const NUVEM = 'nuvem-infraestrutura'
const DEVOPS = 'devops-cicd'
const DADOS = 'dados-ml-ia'
const GTI = 'gestao-ti'
const DIR = 'direito-const-adm'
const PROT = 'protecao-dados-seguranca'
const RLM = 'raciocinio-logico'
const SUST = 'sustentabilidade-asg'

export const ABGF_BANK_DECKS: SeedStarterDeck[] = [
  {
    name: 'Específicas TI — Redes, BD e DevOps (ABGF)',
    disciplineSlug: REDES,
    description: 'Conceitos de alto peso (CE ×3) que a FCC cobra: redes, banco de dados, versionamento e CI/CD.',
    cards: [
      { front: 'TCP × UDP', back: 'TCP: orientado à conexão, confiável (handshake, retransmissão, controle de fluxo/congestionamento). UDP: sem conexão, rápido, sem garantia de entrega.', topic: { disciplineSlug: REDES, topic: 'Protocolos de transporte (TCP, UDP)' } },
      { front: 'Para que serve o DNS?', back: 'Resolver nomes de domínio em endereços IP (e vice-versa).', topic: { disciplineSlug: REDES, topic: 'Protocolos de aplicação (DNS, HTTP/HTTPS, SMTP, DHCP)' } },
      { front: 'VLAN serve para quê?', back: 'Segmentar logicamente a LAN em domínios de broadcast distintos, sem depender da localização física.', topic: { disciplineSlug: REDES, topic: 'VLAN, VPN e redes LAN/WAN' } },
      { front: 'Complexidade da busca binária', back: 'O(log n) no pior caso — descarta metade do espaço a cada passo (exige vetor ordenado).', topic: { disciplineSlug: REDES, topic: 'Complexidade de algoritmos' } },
      { front: 'Propriedades ACID', back: 'Atomicidade, Consistência, Isolamento e Durabilidade — garantem confiabilidade das transações.', topic: { disciplineSlug: BD, topic: 'Transações e controle de concorrência' } },
      { front: 'WHERE × HAVING (SQL)', back: 'WHERE filtra LINHAS antes do agrupamento; HAVING filtra GRUPOS após a agregação (aceita COUNT, SUM etc.).', topic: { disciplineSlug: BD, topic: 'Consultas, junções e subconsultas' } },
      { front: 'DDL × DML × DCL', back: 'DDL define estrutura (CREATE/ALTER/DROP); DML manipula dados (INSERT/UPDATE/DELETE); DCL controla acesso (GRANT/REVOKE).', topic: { disciplineSlug: BD, topic: 'DDL e DML' } },
      { front: 'Data Lake × Data Warehouse', back: 'Data Lake: dados brutos, formato nativo, schema-on-read. DW: dados estruturados e modelados, schema-on-write.', topic: { disciplineSlug: BD, topic: 'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse' } },
      { front: 'git commit × git push', back: 'commit registra o snapshot no repositório LOCAL; push envia os commits ao repositório REMOTO.', topic: { disciplineSlug: DEVOPS, topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab' } },
      { front: 'IaC declarativa × imperativa', back: 'Declarativa: descreve o ESTADO final desejado (a ferramenta converge). Imperativa: descreve o passo a passo.', topic: { disciplineSlug: DEVOPS, topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible' } }
    ]
  },
  {
    name: 'Segurança e Nuvem (ABGF)',
    disciplineSlug: SEG,
    description: 'Cibersegurança, criptografia, contêineres e observabilidade — revisão espaçada.',
    cards: [
      { front: 'Ransomware', back: 'Malware que cifra os arquivos da vítima e exige resgate (cripto) pela chave de decriptação.', topic: { disciplineSlug: SEG, topic: 'Código malicioso: vírus, worm, trojan, ransomware, spyware, keylogger, rootkit' } },
      { front: 'ISO 27001 × 27002', back: '27001: requisitos do SGSI (certificável). 27002: código de práticas (controles de referência).', topic: { disciplineSlug: SEG, topic: 'Frameworks e normas: CIS Controls; NIST CSF; ISO/IEC 27001 e 27002' } },
      { front: 'RBAC × ABAC', back: 'RBAC: acesso por PAPÉIS. ABAC: acesso por ATRIBUTOS dinâmicos (contexto, hora, localização).', topic: { disciplineSlug: SEG, topic: 'RBAC e ABAC' } },
      { front: 'Criptografia simétrica × assimétrica', back: 'Simétrica (AES): uma chave, rápida. Assimétrica (RSA): par público/privado, resolve troca de chave e assinatura.', topic: { disciplineSlug: SEG, topic: 'Criptografia simétrica e assimétrica' } },
      { front: 'Docker × Kubernetes', back: 'Docker empacota/executa contêineres; Kubernetes ORQUESTRA contêineres em cluster (escala, self-healing).', topic: { disciplineSlug: NUVEM, topic: 'Contêineres e orquestração: Docker; Kubernetes' } },
      { front: 'Backup incremental × diferencial', back: 'Incremental: o que mudou desde o último backup (full OU incremental). Diferencial: o que mudou desde o último FULL.', topic: { disciplineSlug: NUVEM, topic: 'Backup: completo, incremental e diferencial; retenção e restauração' } },
      { front: 'Prometheus × Grafana', back: 'Prometheus COLETA/armazena métricas (séries temporais, scraping). Grafana VISUALIZA (dashboards).', topic: { disciplineSlug: NUVEM, topic: 'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch' } },
      { front: 'Contêiner × Máquina Virtual', back: 'Contêiner compartilha o kernel do host (leve, sem SO convidado). VM virtualiza o hardware completo (SO convidado).', topic: { disciplineSlug: NUVEM, topic: 'Virtualização: máquinas virtuais; redes virtualizadas; alta disponibilidade' } }
    ]
  },
  {
    name: 'Dados, ML e Gestão de TI (ABGF)',
    disciplineSlug: DADOS,
    description: 'Aprendizado de máquina, IA generativa, ITIL, Scrum e COBIT.',
    cards: [
      { front: 'Supervisionado × não supervisionado', back: 'Supervisionado: dados ROTULADOS (classificação/regressão). Não supervisionado: SEM rótulos (agrupamento, redução de dimensionalidade).', topic: { disciplineSlug: DADOS, topic: 'Aprendizado supervisionado: classificação e regressão' } },
      { front: 'Overfitting', back: 'Modelo vai muito bem no treino e mal em dados novos (decorou, não generalizou). Underfitting é o oposto.', topic: { disciplineSlug: DADOS, topic: 'Métricas de avaliação de modelos; séries temporais (noções)' } },
      { front: 'Alucinação em LLM', back: 'Resposta coerente porém factualmente incorreta/inventada. Risco central de IA generativa.', topic: { disciplineSlug: DADOS, topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança' } },
      { front: 'Classificação × regressão', back: 'Classificação prevê CATEGORIA (spam/não spam). Regressão prevê valor CONTÍNUO (preço).', topic: { disciplineSlug: DADOS, topic: 'Aprendizado supervisionado: classificação e regressão' } },
      { front: 'Incidente × Problema (ITIL)', back: 'Incidente: restaurar o serviço RÁPIDO. Problema: achar a CAUSA RAIZ para evitar recorrência.', topic: { disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua' } },
      { front: 'Daily Scrum', back: 'Reunião diária de até 15 min para o time sincronizar e planejar as próximas 24h.', topic: { disciplineSlug: GTI, topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban' } },
      { front: 'COBIT: governança × gestão', back: 'Governança (EDM): avalia, dirige e monitora (alta administração). Gestão (APO/BAI/DSS/MEA): planeja, constrói, executa e monitora.', topic: { disciplineSlug: GTI, topic: 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle' } }
    ]
  },
  {
    name: 'Gerais — Direito, LGPD e ASG (ABGF)',
    disciplineSlug: DIR,
    description: 'Conhecimentos gerais de alta incidência: princípios, atos, LGPD, sustentabilidade e lógica.',
    cards: [
      { front: 'Princípios expressos da Adm. Pública', back: 'LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (art. 37, caput, CF).', topic: { disciplineSlug: DIR, topic: 'Regime jurídico-administrativo: princípios expressos e implícitos da Administração Pública' } },
      { front: 'Anulação × Revogação', back: 'Anulação: por ILEGALIDADE, efeito ex tunc (retroage). Revogação: por conveniência/oportunidade, efeito ex nunc.', topic: { disciplineSlug: DIR, topic: 'Ato administrativo: conceito, requisitos, atributos, espécies; anulação, revogação e convalidação' } },
      { front: 'Regime de pessoal das estatais', back: 'Celetista (CLT), com ingresso por concurso público (Lei nº 13.303/2016). Aplica-se à ABGF.', topic: { disciplineSlug: DIR, topic: 'Empresas estatais: Lei nº 13.303/2016 e Decreto nº 8.945/2016; governança e pessoal celetista' } },
      { front: 'LGPD: titular × controlador × operador', back: 'Titular: a pessoa dos dados. Controlador: decide o tratamento. Operador: trata em nome do controlador.', topic: { disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD' } },
      { front: 'O consentimento é a única base legal da LGPD?', back: 'Não. Há 10 bases (art. 7º): obrigação legal, execução de contrato, legítimo interesse, tutela da saúde etc.', topic: { disciplineSlug: PROT, topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD' } },
      { front: 'ASG (ESG) significa?', back: 'Ambiental, Social e Governança — critérios de sustentabilidade aplicados a investimentos e gestão.', topic: { disciplineSlug: SUST, topic: 'Riscos sociais, ambientais e climáticos no SFN; PRSAC; Resoluções CMN nº 4.557/2017 e nº 4.945/2021' } },
      { front: 'Quantos ODS tem a Agenda 2030?', back: '17 ODS e 169 metas (sucedem os 8 ODM do Milênio).', topic: { disciplineSlug: SUST, topic: 'ODS — Agenda 2030: estrutura e relevância para o setor financeiro' } },
      { front: 'Negação de "Todo A é B"', back: '"Algum A não é B" (existe pelo menos um A que não é B). Não é "Nenhum A é B".', topic: { disciplineSlug: RLM, topic: 'Quantificadores; afirmações e negações' } },
      { front: 'Contrapositiva de "p → q"', back: '"~q → ~p" (equivalente). Ex.: "Se chove, molha" ≡ "Se não molha, não choveu".', topic: { disciplineSlug: RLM, topic: 'Equivalências lógicas; leis de De Morgan; implicações' } }
    ]
  }
]
