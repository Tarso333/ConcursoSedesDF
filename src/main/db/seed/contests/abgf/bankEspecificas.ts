// M29 — Banco de questões estilo FCC (Conhecimentos Específicos E05, peso 3).
// APENAS DADOS; idempotente por seed_key. Cada questão traz comentário
// alternativa por alternativa (ensina o conteúdo). Distribuição de dificuldade
// ~35% FÁCIL / 45% MÉDIO / 20% DIFÍCIL. Método "aprovação online": priorizar
// volume de questões nas disciplinas de maior peso e menor cobertura.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

// Slugs de disciplina (conferem com curriculum.ts)
const REDES = 'fundamentos-sistemas-redes'
const BD = 'banco-de-dados'
const SEG = 'seguranca-cibernetica'
const NUVEM = 'nuvem-infraestrutura'
const DEVOPS = 'devops-cicd'
const DADOS = 'dados-ml-ia'
const GTI = 'gestao-ti'

export const ABGF_BANK_ESPECIFICAS: SeedQuestion[] = [
  // ───────────────────── Fundamentos de Sistemas e Redes ─────────────────────
  {
    disciplineSlug: REDES, topic: 'Redes de Computadores', type: 'ME', difficulty: 'FACIL',
    statement: 'No modelo TCP/IP, o protocolo responsável por traduzir nomes de domínio (como www.abgf.gov.br) em endereços IP é o:',
    options: [
      { text: 'DHCP.' },
      { text: 'DNS.', correct: true },
      { text: 'SMTP.' },
      { text: 'ARP.' },
      { text: 'HTTP.' }
    ],
    explanation:
      'A) ERRADA — o DHCP distribui automaticamente endereços IP e parâmetros de rede, não resolve nomes. B) CORRETA — o DNS (Domain Name System) faz a resolução de nomes em endereços IP. C) ERRADA — o SMTP transporta e-mails. D) ERRADA — o ARP resolve IP em endereço MAC (camada de enlace), não nome em IP. E) ERRADA — o HTTP transfere páginas web.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Redes de Computadores', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre os protocolos da camada de transporte do modelo TCP/IP, assinale a alternativa correta.',
    options: [
      { text: 'O UDP é orientado à conexão e garante a entrega ordenada dos pacotes.' },
      { text: 'O TCP é orientado à conexão, com controle de fluxo e retransmissão de segmentos perdidos.', correct: true },
      { text: 'O TCP não realiza controle de congestionamento.' },
      { text: 'O UDP estabelece conexão por meio do three-way handshake.' },
      { text: 'TCP e UDP operam na camada de aplicação.' }
    ],
    explanation:
      'A) ERRADA — o UDP é NÃO orientado à conexão e não garante entrega nem ordenação. B) CORRETA — o TCP é confiável: conexão, controle de fluxo, controle de congestionamento e retransmissão. C) ERRADA — o TCP faz controle de congestionamento (ex.: janela deslizante, slow start). D) ERRADA — o three-way handshake é do TCP, não do UDP. E) ERRADA — ambos são da camada de TRANSPORTE.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Redes de Computadores', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um administrador precisa segmentar logicamente uma rede local em domínios de broadcast distintos, sem depender da localização física dos equipamentos. O recurso adequado é a:',
    options: [
      { text: 'VPN.' },
      { text: 'VLAN.', correct: true },
      { text: 'DMZ.' },
      { text: 'NAT.' },
      { text: 'WAN.' }
    ],
    explanation:
      'A) ERRADA — a VPN cria um túnel seguro entre redes/hosts sobre uma rede pública. B) CORRETA — a VLAN segmenta logicamente a LAN em domínios de broadcast independentes da topologia física. C) ERRADA — a DMZ é uma zona de rede para servidores expostos, não segmentação lógica geral. D) ERRADA — o NAT traduz endereços entre redes. E) ERRADA — WAN é rede de longa distância, não recurso de segmentação lógica.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Algoritmos e Estruturas de Dados', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Considere a notação assintótica de complexidade. Uma busca binária em um vetor ordenado de n elementos tem complexidade de tempo, no pior caso, igual a:',
    options: [
      { text: 'O(n).' },
      { text: 'O(log n).', correct: true },
      { text: 'O(n log n).' },
      { text: 'O(n²).' },
      { text: 'O(1).' }
    ],
    explanation:
      'A) ERRADA — O(n) é a busca linear, que percorre todos os elementos. B) CORRETA — a busca binária descarta metade do espaço a cada passo, resultando em O(log n). C) ERRADA — O(n log n) é típica de ordenações eficientes (merge sort). D) ERRADA — O(n²) é de algoritmos quadráticos (bubble sort). E) ERRADA — O(1) seria tempo constante, o que não ocorre na busca binária no pior caso.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Sistemas Operacionais', type: 'ME', difficulty: 'FACIL',
    statement: 'A técnica de sistema operacional que permite executar programas maiores que a memória física disponível, usando parte do disco como extensão da RAM, é a:',
    options: [
      { text: 'memória virtual.', correct: true },
      { text: 'memória cache.' },
      { text: 'compilação just-in-time.' },
      { text: 'paginação de tela.' },
      { text: 'virtualização de hardware.' }
    ],
    explanation:
      'A) CORRETA — a memória virtual usa paginação/swap em disco para simular mais memória do que a RAM física. B) ERRADA — a cache é memória rápida entre CPU e RAM, não estende a capacidade total. C) ERRADA — JIT é compilação em tempo de execução, não gestão de memória. D) ERRADA — "paginação de tela" não é conceito de SO. E) ERRADA — virtualização de hardware cria máquinas virtuais, conceito distinto.',
    source: S
  },

  // ───────────────────── Banco de Dados ─────────────────────
  {
    disciplineSlug: BD, topic: 'Conceitos de SGBD', type: 'ME', difficulty: 'MEDIO',
    statement: 'As propriedades ACID garantem a confiabilidade das transações em um SGBD. A propriedade que assegura que uma transação seja executada por completo ou não produza nenhum efeito é a:',
    options: [
      { text: 'Consistência.' },
      { text: 'Atomicidade.', correct: true },
      { text: 'Isolamento.' },
      { text: 'Durabilidade.' },
      { text: 'Integridade referencial.' }
    ],
    explanation:
      'A) ERRADA — Consistência garante que a transação leve o banco de um estado válido a outro válido. B) CORRETA — Atomicidade é o "tudo ou nada": ou a transação completa, ou é desfeita (rollback). C) ERRADA — Isolamento evita interferência entre transações concorrentes. D) ERRADA — Durabilidade garante que o commit persista mesmo após falhas. E) ERRADA — integridade referencial é regra de chave estrangeira, não faz parte do acrônimo ACID.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Conceitos de SGBD', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre bancos NoSQL, assinale a alternativa correta.',
    options: [
      { text: 'São sempre relacionais e usam exclusivamente SQL padrão.' },
      { text: 'Incluem modelos chave-valor, documento, colunar e grafo, favorecendo escalabilidade horizontal.', correct: true },
      { text: 'Garantem sempre consistência forte em detrimento da disponibilidade.' },
      { text: 'Não permitem armazenar dados semiestruturados como JSON.' },
      { text: 'Substituem integralmente os bancos relacionais em qualquer cenário.' }
    ],
    explanation:
      'A) ERRADA — NoSQL significa "not only SQL"; não são relacionais no sentido clássico. B) CORRETA — os quatro grandes tipos são chave-valor, documento, colunar e grafo, com foco em escalar horizontalmente. C) ERRADA — muitos priorizam disponibilidade/particionamento (teorema CAP), adotando consistência eventual. D) ERRADA — bancos de documentos (MongoDB) armazenam JSON/BSON justamente. E) ERRADA — NoSQL complementa, não substitui universalmente o relacional.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Linguagem SQL (ANSI)', type: 'ME', difficulty: 'FACIL',
    statement: 'Em SQL, os comandos CREATE, ALTER e DROP pertencem à sublinguagem:',
    options: [
      { text: 'DML.' },
      { text: 'DDL.', correct: true },
      { text: 'DCL.' },
      { text: 'DQL.' },
      { text: 'TCL.' }
    ],
    explanation:
      'A) ERRADA — DML (Data Manipulation) tem INSERT, UPDATE, DELETE. B) CORRETA — DDL (Data Definition) define estruturas: CREATE, ALTER, DROP, TRUNCATE. C) ERRADA — DCL (Data Control) trata de permissões: GRANT, REVOKE. D) ERRADA — DQL é a consulta (SELECT). E) ERRADA — TCL controla transações: COMMIT, ROLLBACK.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Linguagem SQL (ANSI)', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Considere a consulta: SELECT depto, COUNT(*) FROM func GROUP BY depto HAVING COUNT(*) > 10. Sobre a cláusula HAVING, é correto afirmar que:',
    options: [
      { text: 'filtra linhas antes do agrupamento, como o WHERE.' },
      { text: 'filtra grupos após a agregação, permitindo usar funções como COUNT.', correct: true },
      { text: 'não pode ser usada junto com GROUP BY.' },
      { text: 'ordena o resultado em ordem decrescente.' },
      { text: 'é equivalente ao DISTINCT.' }
    ],
    explanation:
      'A) ERRADA — quem filtra ANTES do agrupamento é o WHERE (linhas individuais). B) CORRETA — o HAVING filtra os GRUPOS já agregados, por isso aceita funções de agregação. C) ERRADA — o HAVING é usado justamente com GROUP BY. D) ERRADA — quem ordena é o ORDER BY. E) ERRADA — o DISTINCT elimina duplicatas, função diferente.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Armazenamento analítico: Data Warehouse, Data Mart, Data Lake e Data Lakehouse', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um repositório que armazena grandes volumes de dados brutos em seu formato nativo (estruturados, semiestruturados e não estruturados), com esquema aplicado apenas na leitura, é denominado:',
    options: [
      { text: 'Data Warehouse.' },
      { text: 'Data Lake.', correct: true },
      { text: 'Data Mart.' },
      { text: 'OLTP.' },
      { text: 'Cubo dimensional.' }
    ],
    explanation:
      'A) ERRADA — o Data Warehouse guarda dados estruturados e modelados (schema-on-write). B) CORRETA — o Data Lake armazena dados brutos em formato nativo, com schema-on-read. C) ERRADA — o Data Mart é um subconjunto departamental de um DW. D) ERRADA — OLTP é processamento transacional, não repositório analítico bruto. E) ERRADA — o cubo é uma estrutura multidimensional de análise, já modelada.',
    source: S
  },

  // ───────────────────── Segurança da Informação e Cibersegurança ─────────────────────
  {
    disciplineSlug: SEG, topic: 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID', type: 'ME', difficulty: 'FACIL',
    statement: 'A tríade CID da segurança da informação é composta por:',
    options: [
      { text: 'Confidencialidade, Integridade e Disponibilidade.', correct: true },
      { text: 'Controle, Identidade e Defesa.' },
      { text: 'Criptografia, Integridade e Detecção.' },
      { text: 'Confidencialidade, Identidade e Disponibilidade.' },
      { text: 'Consistência, Isolamento e Durabilidade.' }
    ],
    explanation:
      'A) CORRETA — CID (ou CIA em inglês) = Confidencialidade, Integridade e Disponibilidade. B)/C)/D) ERRADAS — trocam um ou mais pilares por termos que não compõem a tríade clássica. E) ERRADA — Consistência, Isolamento e Durabilidade são propriedades ACID de banco de dados.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Principais tipos de ataques e ameaças', type: 'ME', difficulty: 'MEDIO',
    statement: 'O tipo de código malicioso que cifra os arquivos da vítima e exige pagamento (geralmente em criptomoeda) para fornecer a chave de decriptação é o:',
    options: [
      { text: 'spyware.' },
      { text: 'ransomware.', correct: true },
      { text: 'worm.' },
      { text: 'rootkit.' },
      { text: 'adware.' }
    ],
    explanation:
      'A) ERRADA — o spyware coleta informações da vítima furtivamente. B) CORRETA — o ransomware sequestra dados por criptografia e exige resgate. C) ERRADA — o worm se autopropaga em rede sem necessariamente cifrar dados. D) ERRADA — o rootkit oculta a presença do atacante com privilégios elevados. E) ERRADA — o adware exibe propaganda indesejada.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Controle de autenticação e autorização', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre os protocolos e padrões de autenticação e autorização, assinale a alternativa correta.',
    options: [
      { text: 'O OAuth 2.0 é um protocolo de autenticação de identidade.' },
      { text: 'O OpenID Connect é uma camada de autenticação construída sobre o OAuth 2.0.', correct: true },
      { text: 'O JWT é um banco de dados de credenciais.' },
      { text: 'O SAML só funciona com bancos NoSQL.' },
      { text: 'RBAC concede permissões com base em atributos dinâmicos do contexto.' }
    ],
    explanation:
      'A) ERRADA — o OAuth 2.0 é de AUTORIZAÇÃO (delegação de acesso), não de autenticação. B) CORRETA — o OpenID Connect (OIDC) adiciona a camada de autenticação sobre o OAuth 2.0. C) ERRADA — o JWT é um token assinado que transporta claims, não um banco de dados. D) ERRADA — o SAML é padrão de troca de asserções (XML) para SSO, independente de tipo de banco. E) ERRADA — quem usa atributos dinâmicos é o ABAC; o RBAC usa papéis.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Criptografia', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma assinatura digital, tal como usada em certificados ICP-Brasil, garante autenticidade e não repúdio porque:',
    options: [
      { text: 'o emissor cifra o documento inteiro com a chave pública do destinatário.' },
      { text: 'o emissor cifra o hash do documento com sua própria chave privada, e qualquer um verifica com a chave pública dele.', correct: true },
      { text: 'utiliza apenas criptografia simétrica com chave compartilhada.' },
      { text: 'substitui a necessidade de funções hash.' },
      { text: 'o destinatário cifra o documento com sua chave privada.' }
    ],
    explanation:
      'A) ERRADA — cifrar com a pública do destinatário garante confidencialidade, não assinatura. B) CORRETA — assina-se o HASH do documento com a chave PRIVADA do emissor; a verificação com a pública prova autoria (não repúdio) e integridade. C) ERRADA — a assinatura usa criptografia ASSIMÉTRICA. D) ERRADA — o hash é essencial: assina-se o resumo, não o documento inteiro. E) ERRADA — a chave privada do destinatário não participa da assinatura do emissor.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Frameworks e normas: CIS Controls; NIST CSF; ISO/IEC 27001 e 27002', type: 'ME', difficulty: 'MEDIO',
    statement: 'No contexto da gestão de segurança da informação, a norma que estabelece os requisitos para implementar um Sistema de Gestão de Segurança da Informação (SGSI) certificável é a:',
    options: [
      { text: 'ISO/IEC 27002.' },
      { text: 'ISO/IEC 27001.', correct: true },
      { text: 'ISO 9001.' },
      { text: 'ISO 14001.' },
      { text: 'ITIL v4.' }
    ],
    explanation:
      'A) ERRADA — a 27002 é um código de PRÁTICAS (controles), não certificável por si. B) CORRETA — a ISO/IEC 27001 define os requisitos do SGSI e é a norma certificável. C) ERRADA — a ISO 9001 trata de gestão da qualidade. D) ERRADA — a ISO 14001 trata de gestão ambiental. E) ERRADA — ITIL é framework de gerenciamento de serviços de TI, não norma de SGSI.',
    source: S
  },

  // ───────────────────── Computação em Nuvem e Infraestrutura ─────────────────────
  {
    disciplineSlug: NUVEM, topic: 'Computação em Nuvem', type: 'ME', difficulty: 'FACIL',
    statement: 'No modelo de serviços em nuvem, quando o provedor entrega máquinas virtuais, armazenamento e rede, cabendo ao cliente gerenciar o sistema operacional e as aplicações, tem-se o modelo:',
    options: [
      { text: 'SaaS.' },
      { text: 'IaaS.', correct: true },
      { text: 'PaaS.' },
      { text: 'FaaS.' },
      { text: 'DaaS.' }
    ],
    explanation:
      'A) ERRADA — no SaaS o provedor entrega o software pronto (ex.: e-mail web), sem gestão do SO pelo cliente. B) CORRETA — no IaaS o provedor entrega a infraestrutura (VMs, storage, rede) e o cliente gerencia SO e apps. C) ERRADA — no PaaS o cliente cuida só da aplicação; a plataforma/SO é gerida pelo provedor. D) ERRADA — FaaS é execução de funções sob demanda (serverless). E) ERRADA — DaaS (Desktop as a Service) entrega desktops virtuais.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Contêineres e orquestração: Docker; Kubernetes', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre Docker e Kubernetes, assinale a alternativa correta.',
    options: [
      { text: 'Docker é um orquestrador de contêineres; Kubernetes é um runtime de contêiner.' },
      { text: 'Kubernetes orquestra contêineres em cluster (escalonamento, self-healing, service discovery).', correct: true },
      { text: 'Contêineres virtualizam o hardware completo, como as máquinas virtuais.' },
      { text: 'Cada contêiner inclui um sistema operacional convidado completo.' },
      { text: 'Docker não permite empacotar dependências junto à aplicação.' }
    ],
    explanation:
      'A) ERRADA — os papéis estão invertidos: Docker empacota/executa contêineres; Kubernetes orquestra. B) CORRETA — o Kubernetes gerencia contêineres em cluster: escala, recupera falhas e descobre serviços. C) ERRADA — contêineres virtualizam o SO (compartilham o kernel do host), não o hardware. D) ERRADA — contêineres NÃO carregam um SO convidado completo (diferença central para VMs). E) ERRADA — empacotar app + dependências é justamente o propósito do Docker.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Sistemas de Armazenamento', type: 'ME', difficulty: 'MEDIO',
    statement: 'Uma política de backup em que apenas os dados alterados desde o ÚLTIMO backup (completo ou incremental) são copiados, otimizando espaço e tempo de cópia, é a estratégia:',
    options: [
      { text: 'completa (full).' },
      { text: 'incremental.', correct: true },
      { text: 'diferencial.' },
      { text: 'espelhada (RAID 1).' },
      { text: 'em nuvem fria.' }
    ],
    explanation:
      'A) ERRADA — o backup completo copia todos os dados sempre. B) CORRETA — o incremental copia o que mudou desde o último backup (full OU incremental), sendo o mais econômico em espaço. C) ERRADA — o diferencial copia o que mudou desde o último COMPLETO (cresce a cada dia). D) ERRADA — RAID 1 é espelhamento de disco, não política de backup. E) ERRADA — "nuvem fria" é classe de armazenamento, não estratégia de escopo do backup.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Monitoramento e observabilidade: Zabbix, Prometheus, Grafana, Elasticsearch', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Em uma stack de observabilidade, a ferramenta cuja função primária é a COLETA e o armazenamento de métricas em séries temporais, tipicamente por raspagem (scraping) de endpoints, é o:',
    options: [
      { text: 'Grafana.' },
      { text: 'Prometheus.', correct: true },
      { text: 'Elasticsearch.' },
      { text: 'Kibana.' },
      { text: 'Ansible.' }
    ],
    explanation:
      'A) ERRADA — o Grafana é a camada de VISUALIZAÇÃO (dashboards); consome métricas de outras fontes. B) CORRETA — o Prometheus coleta e armazena métricas em séries temporais via scraping. C) ERRADA — o Elasticsearch é um motor de busca/indexação, mais voltado a logs. D) ERRADA — o Kibana visualiza dados do Elasticsearch. E) ERRADA — o Ansible é ferramenta de automação/IaC, não de coleta de métricas.',
    source: S
  },

  // ───────────────────── DevOps, CI/CD e Automação ─────────────────────
  {
    disciplineSlug: DEVOPS, topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre integração contínua (CI) e entrega contínua (CD), assinale a alternativa correta.',
    options: [
      { text: 'CI é o processo de publicar manualmente em produção uma vez por trimestre.' },
      { text: 'CI integra e testa frequentemente as alterações de código em um repositório compartilhado.', correct: true },
      { text: 'CD elimina a necessidade de testes automatizados.' },
      { text: 'CI e CD são exclusivos de projetos que usam a linguagem Java.' },
      { text: 'Entrega contínua significa implantar sem nenhum pipeline.' }
    ],
    explanation:
      'A) ERRADA — a CI prega integrações FREQUENTES e automatizadas, não publicações manuais esparsas. B) CORRETA — a CI integra o código com frequência, disparando build e testes automáticos a cada commit. C) ERRADA — o CD DEPENDE de testes automatizados confiáveis. D) ERRADA — CI/CD são agnósticos de linguagem. E) ERRADA — a entrega contínua se apoia justamente em um pipeline automatizado.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Versionamento de código: Git — branching e merging; GitHub/GitLab', type: 'ME', difficulty: 'FACIL',
    statement: 'No Git, o comando que cria um novo instantâneo (snapshot) das alterações preparadas (staged) no repositório LOCAL é o:',
    options: [
      { text: 'git push.' },
      { text: 'git commit.', correct: true },
      { text: 'git clone.' },
      { text: 'git pull.' },
      { text: 'git remote.' }
    ],
    explanation:
      'A) ERRADA — o push envia commits locais para o repositório remoto. B) CORRETA — o commit registra as mudanças preparadas no histórico LOCAL. C) ERRADA — o clone copia um repositório remoto para a máquina local. D) ERRADA — o pull busca e integra alterações do remoto. E) ERRADA — o remote gerencia referências a repositórios remotos.',
    source: S
  },
  {
    disciplineSlug: DEVOPS, topic: 'Infraestrutura como Código (IaC): declarativo e imperativo; Ansible', type: 'ME', difficulty: 'MEDIO',
    statement: 'A Infraestrutura como Código (IaC) na abordagem DECLARATIVA caracteriza-se por:',
    options: [
      { text: 'descrever passo a passo cada comando a ser executado, na ordem exata.' },
      { text: 'declarar o estado final desejado, cabendo à ferramenta convergir a infraestrutura para esse estado.', correct: true },
      { text: 'exigir configuração manual em cada servidor.' },
      { text: 'ser incompatível com controle de versão.' },
      { text: 'impedir a reprodutibilidade dos ambientes.' }
    ],
    explanation:
      'A) ERRADA — descrever o passo a passo é a abordagem IMPERATIVA. B) CORRETA — na declarativa define-se o ESTADO desejado e a ferramenta (ex.: Terraform, Ansible) reconcilia. C) ERRADA — IaC automatiza justamente para evitar configuração manual. D) ERRADA — IaC é versionável (arquivos em Git). E) ERRADA — IaC promove reprodutibilidade e idempotência.',
    source: S
  },

  // ───────────────────── Análise de Dados, ML e IA ─────────────────────
  {
    disciplineSlug: DADOS, topic: 'Noções de aprendizado de máquina', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um algoritmo treinado com dados rotulados (entradas associadas às saídas esperadas) para prever uma categoria caracteriza aprendizado:',
    options: [
      { text: 'não supervisionado, por agrupamento.' },
      { text: 'supervisionado, do tipo classificação.', correct: true },
      { text: 'por reforço, com recompensas.' },
      { text: 'supervisionado, do tipo regressão.' },
      { text: 'não supervisionado, por redução de dimensionalidade.' }
    ],
    explanation:
      'A) ERRADA — o não supervisionado usa dados SEM rótulos (ex.: clustering). B) CORRETA — com dados rotulados e saída categórica, é aprendizado supervisionado de CLASSIFICAÇÃO. C) ERRADA — o aprendizado por reforço aprende por recompensas de um ambiente, sem dataset rotulado. D) ERRADA — a regressão é supervisionada, mas prevê valores CONTÍNUOS, não categorias. E) ERRADA — redução de dimensionalidade é não supervisionada e não prevê categorias.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Noções de aprendizado de máquina', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Um modelo de classificação apresenta acurácia altíssima nos dados de treino, mas desempenho ruim em dados novos. Esse fenômeno é denominado:',
    options: [
      { text: 'underfitting.' },
      { text: 'overfitting.', correct: true },
      { text: 'normalização.' },
      { text: 'validação cruzada.' },
      { text: 'balanceamento de classes.' }
    ],
    explanation:
      'A) ERRADA — o underfitting é o oposto: o modelo é simples demais e vai mal até no treino. B) CORRETA — o overfitting é o modelo "decorar" o treino e não generalizar para dados novos. C) ERRADA — normalização é pré-processamento de escala dos atributos. D) ERRADA — a validação cruzada é técnica para ESTIMAR/mitigar o problema, não o fenômeno. E) ERRADA — balanceamento trata desproporção entre classes, outra questão.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança', type: 'ME', difficulty: 'MEDIO',
    statement: 'No contexto de IA generativa, o fenômeno em que um LLM produz uma resposta coerente, porém factualmente incorreta ou inventada, é chamado de:',
    options: [
      { text: 'overfitting.' },
      { text: 'alucinação.', correct: true },
      { text: 'fine-tuning.' },
      { text: 'tokenização.' },
      { text: 'embedding.' }
    ],
    explanation:
      'A) ERRADA — overfitting é sobreajuste ao treino, conceito de ML clássico. B) CORRETA — "alucinação" é a geração de conteúdo plausível, mas falso ou não fundamentado. C) ERRADA — fine-tuning é o ajuste fino do modelo com dados adicionais. D) ERRADA — tokenização é a quebra do texto em unidades (tokens). E) ERRADA — embedding é a representação vetorial de dados, não o erro factual.',
    source: S
  },

  // ───────────────────── Gestão de TI ─────────────────────
  {
    disciplineSlug: GTI, topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua', type: 'ME', difficulty: 'MEDIO',
    statement: 'Na ITIL, a distinção entre gerenciamento de INCIDENTES e de PROBLEMAS é que:',
    options: [
      { text: 'ambos têm o mesmo objetivo: encontrar a causa raiz.' },
      { text: 'o gerenciamento de incidentes restaura o serviço o mais rápido possível; o de problemas busca a causa raiz.', correct: true },
      { text: 'o gerenciamento de problemas prioriza a rapidez sobre a causa.' },
      { text: 'incidente é sempre uma mudança planejada.' },
      { text: 'problema é a interrupção não planejada de um serviço.' }
    ],
    explanation:
      'A) ERRADA — os objetivos diferem (velocidade × causa raiz). B) CORRETA — incidente foca em RESTAURAR o serviço rapidamente; problema investiga a CAUSA RAIZ para evitar recorrência. C) ERRADA — a rapidez é do incidente; o problema prioriza a causa. D) ERRADA — incidente é interrupção não planejada, não uma mudança. E) ERRADA — a definição dada (interrupção não planejada) é de INCIDENTE, não de problema.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'Gerenciamento de projetos: PMBOK — grupos de processos e áreas de conhecimento; Scrum e Kanban', type: 'ME', difficulty: 'FACIL',
    statement: 'No framework Scrum, o evento com duração máxima recomendada de 15 minutos, realizado diariamente para sincronizar o time e planejar as próximas 24 horas, é a:',
    options: [
      { text: 'Sprint Review.' },
      { text: 'Daily Scrum.', correct: true },
      { text: 'Sprint Retrospective.' },
      { text: 'Sprint Planning.' },
      { text: 'Refinement.' }
    ],
    explanation:
      'A) ERRADA — a Sprint Review avalia o incremento ao final da Sprint com stakeholders. B) CORRETA — a Daily Scrum é a reunião diária de até 15 min para sincronização do Dev Team. C) ERRADA — a Retrospective revisa o PROCESSO ao final da Sprint. D) ERRADA — o Planning abre a Sprint definindo o que será feito. E) ERRADA — o Refinement é o detalhamento contínuo do backlog, não um evento diário fixo.',
    source: S
  },
  {
    disciplineSlug: GTI, topic: 'COBIT 2019 (conceitos gerais): objetivos, recursos de TI e domínios de controle', type: 'ME', difficulty: 'DIFICIL',
    statement: 'O COBIT 2019 estabelece uma distinção fundamental entre governança e gestão. Sobre isso, é correto afirmar que:',
    options: [
      { text: 'governança e gestão são sinônimos no COBIT.' },
      { text: 'a governança (domínio EDM) avalia, dirige e monitora; a gestão planeja, constrói, executa e monitora.', correct: true },
      { text: 'a gestão define a direção estratégica e a governança apenas executa.' },
      { text: 'o COBIT trata exclusivamente de segurança da informação.' },
      { text: 'governança no COBIT dispensa a definição de objetivos.' }
    ],
    explanation:
      'A) ERRADA — o COBIT separa explicitamente os dois conceitos. B) CORRETA — a governança (EDM: Evaluate, Direct, Monitor) é responsabilidade da alta administração; a gestão (APO, BAI, DSS, MEA) opera o dia a dia. C) ERRADA — os papéis estão invertidos: a governança dirige, a gestão executa. D) ERRADA — o COBIT é framework abrangente de governança de TI, não só segurança. E) ERRADA — a governança define objetivos e os desdobra em metas.',
    source: S
  }
]
