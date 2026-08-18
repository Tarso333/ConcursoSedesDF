// M29 (2ª leva) — Banco de questões estilo FCC concentrado nas específicas de
// MAIOR incidência no edital (Segurança=6, Redes/BD/Nuvem/Dados-ML=5 itens).
// APENAS DADOS; idempotente por seed_key. Comentário alternativa por
// alternativa; dificuldade ~35% FÁCIL / 45% MÉDIO / 20% DIFÍCIL.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FCC)'

const REDES = 'fundamentos-sistemas-redes'
const BD = 'banco-de-dados'
const SEG = 'seguranca-cibernetica'
const NUVEM = 'nuvem-infraestrutura'
const DADOS = 'dados-ml-ia'

export const ABGF_BANK_ESPECIFICAS2: SeedQuestion[] = [
  // ───────────────────── Segurança (6 itens — maior peso) ─────────────────────
  {
    disciplineSlug: SEG, topic: 'Principais tipos de ataques e ameaças', type: 'ME', difficulty: 'FACIL',
    statement: 'O ataque em que o criminoso se passa por entidade confiável (banco, órgão público) para induzir a vítima a fornecer dados sensíveis, geralmente por e-mail fraudulento, é o:',
    options: [
      { text: 'phishing.', correct: true },
      { text: 'DDoS.' },
      { text: 'SQL injection.' },
      { text: 'brute force.' },
      { text: 'sniffing.' }
    ],
    explanation:
      'A) CORRETA — o phishing usa engenharia social e mensagens falsas para "pescar" credenciais/dados. B) ERRADA — o DDoS visa indisponibilizar um serviço por sobrecarga. C) ERRADA — SQL injection explora falha de validação em consultas ao banco. D) ERRADA — brute force tenta exaustivamente combinações de senha. E) ERRADA — sniffing intercepta/captura tráfego de rede.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Segurança defensiva: firewall, IDS/IPS, WAF, VPN, proxy, antimalware; defesa em profundidade; hardening', type: 'ME', difficulty: 'MEDIO',
    statement: 'A diferença fundamental entre um IDS e um IPS é que:',
    options: [
      { text: 'o IDS bloqueia ativamente o ataque; o IPS apenas registra.' },
      { text: 'o IDS detecta e alerta sobre intrusões; o IPS detecta e também bloqueia/previne ativamente.', correct: true },
      { text: 'ambos apenas cifram o tráfego de rede.' },
      { text: 'o IPS funciona só em redes sem fio.' },
      { text: 'o IDS substitui o firewall em todas as funções.' }
    ],
    explanation:
      'A) ERRADA — os papéis estão invertidos: quem bloqueia ativamente é o IPS. B) CORRETA — IDS (Detection) monitora e ALERTA; IPS (Prevention) atua em linha e BLOQUEIA a ameaça. C) ERRADA — nenhum tem por função primária cifrar tráfego (isso é VPN/TLS). D) ERRADA — o IPS não se restringe a Wi-Fi. E) ERRADA — o IDS complementa, não substitui, o firewall.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Segurança ofensiva (noções): OWASP Top 10; testes de segurança e gestão de vulnerabilidades', type: 'ME', difficulty: 'MEDIO',
    statement: 'No OWASP Top 10, a falha que permite ao atacante injetar comandos maliciosos em consultas ao banco de dados por falta de validação/parametrização de entradas é a:',
    options: [
      { text: 'Broken Access Control.' },
      { text: 'Injection (ex.: SQL injection).', correct: true },
      { text: 'Security Misconfiguration.' },
      { text: 'Cryptographic Failures.' },
      { text: 'Server-Side Request Forgery (SSRF).' }
    ],
    explanation:
      'A) ERRADA — Broken Access Control é falha de controle de acesso (usuário acessa o que não deveria). B) CORRETA — Injection abrange SQL/command injection: entrada não tratada é interpretada como comando. C) ERRADA — Misconfiguration é configuração insegura (padrões, serviços expostos). D) ERRADA — Cryptographic Failures é uso indevido/ausência de criptografia. E) ERRADA — SSRF força o servidor a fazer requisições a destinos não previstos.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Bases de conhecimento: CVE, NVD e CVSS', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Sobre as bases e métricas de vulnerabilidades, assinale a alternativa correta.',
    options: [
      { text: 'O CVE é uma pontuação de severidade de 0 a 10.' },
      { text: 'O CVE é um identificador único da vulnerabilidade; o CVSS é a métrica de severidade (0 a 10).', correct: true },
      { text: 'A NVD é um antivírus mantido pela OWASP.' },
      { text: 'O CVSS identifica o fabricante do software.' },
      { text: 'CVE e CVSS são sinônimos.' }
    ],
    explanation:
      'A) ERRADA — quem pontua de 0 a 10 é o CVSS, não o CVE. B) CORRETA — CVE é o identificador (ex.: CVE-2021-44228); CVSS é o score de severidade; a NVD é a base que enriquece os CVEs. C) ERRADA — a NVD é a base nacional de vulnerabilidades do NIST, não antivírus da OWASP. D) ERRADA — o CVSS mede severidade, não identifica fabricante. E) ERRADA — são coisas distintas (identificador × métrica).',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Controle de autenticação e autorização', type: 'ME', difficulty: 'FACIL',
    statement: 'O mecanismo de segurança que exige dois ou mais fatores de autenticação independentes (algo que você sabe, tem ou é) é o:',
    options: [
      { text: 'SSO.' },
      { text: 'MFA (autenticação multifator).', correct: true },
      { text: 'CAPTCHA.' },
      { text: 'firewall.' },
      { text: 'hash.' }
    ],
    explanation:
      'A) ERRADA — SSO (Single Sign-On) permite acessar vários sistemas com um único login, não é multifator. B) CORRETA — MFA combina fatores independentes (senha + token + biometria). C) ERRADA — CAPTCHA distingue humano de bot, não autentica identidade. D) ERRADA — firewall filtra tráfego de rede. E) ERRADA — hash é função de resumo criptográfico.',
    source: S
  },
  {
    disciplineSlug: SEG, topic: 'Criptografia', type: 'ME', difficulty: 'MEDIO',
    statement: 'O protocolo que garante confidencialidade e integridade na comunicação web (HTTPS), estabelecendo um canal cifrado entre cliente e servidor, é o:',
    options: [
      { text: 'FTP.' },
      { text: 'TLS/SSL.', correct: true },
      { text: 'Telnet.' },
      { text: 'ARP.' },
      { text: 'SNMP.' }
    ],
    explanation:
      'A) ERRADA — o FTP (clássico) transfere arquivos sem cifragem. B) CORRETA — o TLS (sucessor do SSL) cifra o canal e sustenta o HTTPS. C) ERRADA — o Telnet é acesso remoto em texto claro (inseguro). D) ERRADA — o ARP resolve IP em MAC. E) ERRADA — o SNMP é para gerência de rede.',
    source: S
  },

  // ───────────────────── Redes (5 itens) ─────────────────────
  {
    disciplineSlug: REDES, topic: 'Modelo TCP/IP; endereçamento IPv4 e IPv6', type: 'ME', difficulty: 'MEDIO',
    statement: 'Sobre o endereçamento IP, assinale a alternativa correta.',
    options: [
      { text: 'O IPv4 usa endereços de 128 bits.' },
      { text: 'O IPv6 usa 128 bits, ampliando enormemente o espaço de endereçamento em relação ao IPv4 (32 bits).', correct: true },
      { text: 'O IPv6 tem menos endereços que o IPv4.' },
      { text: 'Endereços IPv4 são escritos em hexadecimal separado por dois-pontos.' },
      { text: 'O IPv4 e o IPv6 têm exatamente o mesmo tamanho de endereço.' }
    ],
    explanation:
      'A) ERRADA — o IPv4 usa 32 bits (não 128). B) CORRETA — o IPv6 usa 128 bits, resolvendo a escassez do IPv4. C) ERRADA — o IPv6 tem MUITO mais endereços. D) ERRADA — quem usa hexadecimal com dois-pontos é o IPv6; o IPv4 é decimal pontuado. E) ERRADA — têm tamanhos diferentes (32 × 128 bits).',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Protocolos de aplicação (DNS, HTTP/HTTPS, SMTP, DHCP)', type: 'ME', difficulty: 'FACIL',
    statement: 'O protocolo responsável por atribuir automaticamente endereços IP e outros parâmetros de rede aos dispositivos de uma LAN é o:',
    options: [
      { text: 'DNS.' },
      { text: 'DHCP.', correct: true },
      { text: 'FTP.' },
      { text: 'HTTP.' },
      { text: 'ICMP.' }
    ],
    explanation:
      'A) ERRADA — o DNS resolve nomes em IPs, não distribui endereços. B) CORRETA — o DHCP concede automaticamente IP, máscara, gateway e DNS aos hosts. C) ERRADA — o FTP transfere arquivos. D) ERRADA — o HTTP transporta páginas web. E) ERRADA — o ICMP é de diagnóstico/controle (ex.: ping).',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Computação distribuída: balanceamento de carga; tolerância a falhas; alta disponibilidade', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em arquiteturas de alta disponibilidade, o componente que distribui as requisições entre vários servidores, evitando sobrecarga e melhorando a resiliência, é o:',
    options: [
      { text: 'load balancer (balanceador de carga).', correct: true },
      { text: 'compilador.' },
      { text: 'escalonador de disco.' },
      { text: 'firewall de aplicação.' },
      { text: 'servidor DNS raiz.' }
    ],
    explanation:
      'A) CORRETA — o balanceador de carga reparte as requisições entre servidores, aumentando disponibilidade e desempenho. B) ERRADA — compilador traduz código-fonte. C) ERRADA — escalonador de disco ordena operações de I/O. D) ERRADA — WAF filtra ataques web, não distribui carga. E) ERRADA — o DNS raiz resolve nomes no topo da hierarquia, não balanceia servidores de aplicação.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Árvores; ordenação; hashing', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma estrutura de dados que segue o princípio FIFO (First In, First Out), em que o primeiro elemento inserido é o primeiro a ser removido, é a:',
    options: [
      { text: 'pilha (stack).' },
      { text: 'fila (queue).', correct: true },
      { text: 'árvore binária.' },
      { text: 'tabela hash.' },
      { text: 'lista ordenada.' }
    ],
    explanation:
      'A) ERRADA — a pilha é LIFO (Last In, First Out): o último a entrar é o primeiro a sair. B) CORRETA — a fila é FIFO: o primeiro a entrar é o primeiro a sair. C) ERRADA — árvore é hierárquica, não segue FIFO. D) ERRADA — tabela hash mapeia chave→valor por função de espalhamento. E) ERRADA — lista ordenada mantém ordem por critério, não por ordem de chegada.',
    source: S
  },
  {
    disciplineSlug: REDES, topic: 'Conteinerização e virtualização (conceitos de SO)', type: 'ME', difficulty: 'MEDIO',
    statement: 'No contexto de sistemas operacionais, um "processo" e uma "thread" diferem porque:',
    options: [
      { text: 'processo e thread são exatamente a mesma coisa.' },
      { text: 'o processo tem seu próprio espaço de memória; as threads compartilham o espaço de memória do processo.', correct: true },
      { text: 'threads não podem existir dentro de um processo.' },
      { text: 'cada thread possui um espaço de endereçamento totalmente isolado das demais.' },
      { text: 'processos executam mais rápido por não terem contexto.' }
    ],
    explanation:
      'A) ERRADA — são conceitos distintos. B) CORRETA — o processo é isolado (espaço próprio); as threads de um mesmo processo compartilham memória, o que agiliza comunicação, mas exige sincronização. C) ERRADA — threads existem justamente DENTRO de processos. D) ERRADA — threads do mesmo processo COMPARTILHAM o espaço, não são isoladas entre si. E) ERRADA — todo processo tem contexto; a troca de contexto entre processos é mais custosa que entre threads.',
    source: S
  },

  // ───────────────────── Banco de Dados (5 itens) ─────────────────────
  {
    disciplineSlug: BD, topic: 'Modelo relacional; formas normais', type: 'ME', difficulty: 'MEDIO',
    statement: 'No modelo relacional, o atributo (ou conjunto de atributos) de uma tabela que referencia a chave primária de outra tabela, garantindo a integridade referencial, é a:',
    options: [
      { text: 'chave primária.' },
      { text: 'chave estrangeira.', correct: true },
      { text: 'chave candidata.' },
      { text: 'superchave.' },
      { text: 'chave secundária.' }
    ],
    explanation:
      'A) ERRADA — a chave primária identifica unicamente uma linha DA PRÓPRIA tabela. B) CORRETA — a chave estrangeira (foreign key) aponta para a PK de outra tabela, garantindo integridade referencial. C) ERRADA — chave candidata é toda chave apta a ser primária. D) ERRADA — superchave é qualquer conjunto que identifica unicamente a tupla. E) ERRADA — "chave secundária" (índice de busca) não estabelece o vínculo referencial.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Modelo relacional; formas normais', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Uma tabela está na 1ª Forma Normal (1FN) quando:',
    options: [
      { text: 'todos os atributos não-chave dependem da chave primária inteira.' },
      { text: 'todos os seus atributos são atômicos (indivisíveis), sem grupos repetitivos ou multivalorados.', correct: true },
      { text: 'não há dependências transitivas entre atributos não-chave.' },
      { text: 'possui pelo menos duas chaves estrangeiras.' },
      { text: 'todos os dados estão desnormalizados para desempenho.' }
    ],
    explanation:
      'A) ERRADA — dependência da chave INTEIRA é requisito da 2FN. B) CORRETA — a 1FN exige atributos atômicos, eliminando grupos repetitivos/multivalorados. C) ERRADA — ausência de dependência transitiva é a 3FN. D) ERRADA — número de FKs não define forma normal. E) ERRADA — desnormalizar é o oposto de normalizar.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Funções de agregação, visões e indexação', type: 'ME', difficulty: 'MEDIO',
    statement: 'A criação de um índice em uma coluna muito consultada de uma tabela tem como principal efeito:',
    options: [
      { text: 'reduzir o espaço em disco ocupado pela tabela.' },
      { text: 'acelerar consultas de leitura, com possível custo adicional em operações de escrita.', correct: true },
      { text: 'impedir qualquer atualização na coluna indexada.' },
      { text: 'garantir a normalização automática da tabela.' },
      { text: 'eliminar a necessidade de chave primária.' }
    ],
    explanation:
      'A) ERRADA — o índice CONSOME espaço adicional, não reduz. B) CORRETA — o índice acelera SELECTs/buscas, mas cada INSERT/UPDATE/DELETE precisa manter o índice (custo de escrita). C) ERRADA — não impede atualização; apenas a torna um pouco mais custosa. D) ERRADA — índice não normaliza. E) ERRADA — índice não substitui a chave primária.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Engenharia de dados: ingestão, transformação e enriquecimento; ETL/ELT; batch e stream; governança', type: 'ME', difficulty: 'MEDIO',
    statement: 'A diferença entre os processos ETL e ELT está em que:',
    options: [
      { text: 'no ETL a transformação ocorre depois da carga no destino.' },
      { text: 'no ETL transforma-se antes de carregar; no ELT carrega-se primeiro e transforma-se no próprio destino.', correct: true },
      { text: 'ETL e ELT não envolvem extração de dados.' },
      { text: 'o ELT é exclusivo de bancos relacionais legados.' },
      { text: 'ambos dispensam a etapa de extração.' }
    ],
    explanation:
      'A) ERRADA — no ETL a transformação ocorre ANTES da carga. B) CORRETA — ETL = Extract-Transform-Load (transforma antes); ELT = Extract-Load-Transform (carrega no destino, ex.: data lake/warehouse, e transforma lá). C)/E) ERRADAS — ambos começam pela Extração. D) ERRADA — o ELT é típico de ambientes modernos de nuvem/big data, não de legados relacionais.',
    source: S
  },
  {
    disciplineSlug: BD, topic: 'Big Data: conceito e principais ferramentas e técnicas', type: 'ME', difficulty: 'FACIL',
    statement: 'Os "V" frequentemente associados ao conceito de Big Data incluem:',
    options: [
      { text: 'Volume, Velocidade e Variedade.', correct: true },
      { text: 'Validação, Versão e Vetor.' },
      { text: 'Visão, Valor e Virtualização.' },
      { text: 'Volume, Vírus e Vontade.' },
      { text: 'Velocidade, Vácuo e Vetorização.' }
    ],
    explanation:
      'A) CORRETA — os 3 Vs clássicos são Volume, Velocidade e Variedade (com Veracidade e Valor como extensões). B)/C)/D)/E) ERRADAS — combinam termos que não integram a definição consagrada de Big Data.',
    source: S
  },

  // ───────────────────── Computação em Nuvem e Infraestrutura (5 itens) ─────────────────────
  {
    disciplineSlug: NUVEM, topic: 'Computação em Nuvem', type: 'ME', difficulty: 'MEDIO',
    statement: 'A característica da computação em nuvem que permite ampliar ou reduzir recursos automaticamente conforme a demanda, pagando-se pelo que se usa, é a:',
    options: [
      { text: 'elasticidade.', correct: true },
      { text: 'virtualização estática.' },
      { text: 'redundância geográfica.' },
      { text: 'tolerância a falhas.' },
      { text: 'imutabilidade.' }
    ],
    explanation:
      'A) CORRETA — a elasticidade provisiona/desprovisiona recursos automaticamente conforme a carga (modelo pay-as-you-go). B) ERRADA — "virtualização estática" não representa ajuste dinâmico. C) ERRADA — redundância geográfica trata de réplicas em regiões distintas. D) ERRADA — tolerância a falhas é continuar operando apesar de falhas, conceito relacionado, mas distinto. E) ERRADA — imutabilidade refere-se a recursos que não mudam após criados.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Computação em Nuvem', type: 'ME', difficulty: 'FACIL',
    statement: 'Uma nuvem que combina infraestrutura privada (on-premises) com serviços de nuvem pública, permitindo a troca de dados e cargas entre elas, é classificada como nuvem:',
    options: [
      { text: 'pública.' },
      { text: 'híbrida.', correct: true },
      { text: 'privada.' },
      { text: 'comunitária.' },
      { text: 'local.' }
    ],
    explanation:
      'A) ERRADA — a nuvem pública é totalmente provida por terceiros e compartilhada. B) CORRETA — a nuvem híbrida integra ambientes privado e público. C) ERRADA — a privada é de uso exclusivo de uma organização. D) ERRADA — a comunitária é compartilhada por organizações com interesses comuns. E) ERRADA — "nuvem local" não é uma das classificações padrão.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Sistemas de Armazenamento', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Sobre os níveis de RAID, assinale a alternativa correta.',
    options: [
      { text: 'O RAID 0 oferece redundância total dos dados.' },
      { text: 'O RAID 1 espelha os dados em dois discos, oferecendo redundância, mas sem ganho de capacidade útil.', correct: true },
      { text: 'O RAID 0 tolera a falha de qualquer disco sem perda de dados.' },
      { text: 'O RAID 5 não distribui paridade entre os discos.' },
      { text: 'O RAID 1 aumenta a capacidade total somando os discos.' }
    ],
    explanation:
      'A) ERRADA — o RAID 0 faz striping SEM redundância (foco em desempenho). B) CORRETA — o RAID 1 espelha (mirroring): se um disco falha, o outro tem cópia; a capacidade útil é a de um disco. C) ERRADA — no RAID 0 a falha de um disco causa perda total. D) ERRADA — o RAID 5 justamente distribui a paridade entre os discos. E) ERRADA — o RAID 1 não soma capacidades (é espelho).',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Sistemas operacionais em servidores: Windows Server (AD, arquivos); Linux (LDAP, NFS, clustering)', type: 'ME', difficulty: 'MEDIO',
    statement: 'No Windows Server, o serviço que centraliza a autenticação e a gestão de usuários, grupos e políticas em um domínio corporativo é o:',
    options: [
      { text: 'IIS.' },
      { text: 'Active Directory (AD).', correct: true },
      { text: 'DHCP Server.' },
      { text: 'Hyper-V.' },
      { text: 'PowerShell.' }
    ],
    explanation:
      'A) ERRADA — o IIS é o servidor web da Microsoft. B) CORRETA — o Active Directory centraliza identidades, autenticação e políticas (GPO) do domínio. C) ERRADA — o DHCP distribui endereços IP. D) ERRADA — o Hyper-V é a plataforma de virtualização. E) ERRADA — o PowerShell é o shell de automação, não o serviço de diretório.',
    source: S
  },
  {
    disciplineSlug: NUVEM, topic: 'Contêineres e orquestração: Docker; Kubernetes', type: 'ME', difficulty: 'MEDIO',
    statement: 'No Kubernetes, a menor unidade implantável, que encapsula um ou mais contêineres que compartilham rede e armazenamento, é o:',
    options: [
      { text: 'node.' },
      { text: 'pod.', correct: true },
      { text: 'cluster.' },
      { text: 'namespace.' },
      { text: 'deployment.' }
    ],
    explanation:
      'A) ERRADA — o node é a máquina (física/virtual) que executa os pods. B) CORRETA — o pod é a menor unidade implantável, agrupando contêineres que compartilham rede e volumes. C) ERRADA — o cluster é o conjunto de nodes gerenciados. D) ERRADA — o namespace isola logicamente recursos dentro do cluster. E) ERRADA — o deployment gerencia réplicas de pods, mas não é a menor unidade.',
    source: S
  },

  // ───────────────────── Análise de Dados, ML e IA (5 itens) ─────────────────────
  {
    disciplineSlug: DADOS, topic: 'Estatística aplicada: descritiva; distribuições de probabilidade; correlação e regressão', type: 'ME', difficulty: 'MEDIO',
    statement: 'Um coeficiente de correlação de Pearson igual a -0,95 entre duas variáveis indica:',
    options: [
      { text: 'ausência de relação entre as variáveis.' },
      { text: 'forte correlação negativa: quando uma variável cresce, a outra tende a decrescer.', correct: true },
      { text: 'forte correlação positiva.' },
      { text: 'relação de causalidade direta comprovada.' },
      { text: 'erro de cálculo, pois correlação não pode ser negativa.' }
    ],
    explanation:
      'A) ERRADA — valores próximos de 0 indicam ausência de correlação linear; -0,95 é forte. B) CORRETA — o sinal negativo indica correlação inversa e o módulo próximo de 1 indica força alta. C) ERRADA — positiva teria sinal +. D) ERRADA — correlação NÃO implica causalidade. E) ERRADA — a correlação varia de -1 a +1; valores negativos são válidos.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Noções de aprendizado de máquina', type: 'ME', difficulty: 'DIFICIL',
    statement: 'Em uma matriz de confusão de um classificador binário, um "falso positivo" ocorre quando o modelo:',
    options: [
      { text: 'acerta ao prever a classe positiva.' },
      { text: 'prevê a classe positiva, mas o valor real é negativo.', correct: true },
      { text: 'prevê a classe negativa e o real é negativo.' },
      { text: 'prevê a classe negativa, mas o real é positivo.' },
      { text: 'não faz nenhuma previsão.' }
    ],
    explanation:
      'A) ERRADA — acerto na classe positiva é o verdadeiro positivo (TP). B) CORRETA — falso positivo (FP) é prever "positivo" quando o real é "negativo" (alarme falso). C) ERRADA — real negativo previsto negativo é verdadeiro negativo (TN). D) ERRADA — prever negativo quando o real é positivo é falso NEGATIVO (FN). E) ERRADA — não previsão não é categoria da matriz de confusão.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Noções de aprendizado de máquina', type: 'ME', difficulty: 'MEDIO',
    statement: 'A técnica de aprendizado não supervisionado que agrupa observações semelhantes em conjuntos (sem rótulos prévios) é o:',
    options: [
      { text: 'clustering (agrupamento).', correct: true },
      { text: 'regressão linear.' },
      { text: 'classificação supervisionada.' },
      { text: 'árvore de decisão rotulada.' },
      { text: 'validação cruzada.' }
    ],
    explanation:
      'A) CORRETA — o clustering (ex.: k-means) agrupa dados por similaridade sem rótulos. B) ERRADA — a regressão é supervisionada e prevê valores contínuos. C) ERRADA — classificação é supervisionada (usa rótulos). D) ERRADA — árvore rotulada implica supervisão. E) ERRADA — validação cruzada é técnica de avaliação de modelo, não de agrupamento.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'MLOps (noções): treinamento, implantação e monitoramento de modelos', type: 'ME', difficulty: 'MEDIO',
    statement: 'Em MLOps, o fenômeno em que o desempenho de um modelo em produção se degrada porque a distribuição dos dados reais muda ao longo do tempo é chamado de:',
    options: [
      { text: 'data drift (desvio de dados).', correct: true },
      { text: 'overfitting de treino.' },
      { text: 'data lake.' },
      { text: 'feature store.' },
      { text: 'pipeline de CI.' }
    ],
    explanation:
      'A) CORRETA — data drift (ou concept drift) é a mudança na distribuição dos dados que degrada o modelo, exigindo retreino. B) ERRADA — overfitting ocorre no treino, não pela mudança dos dados em produção. C) ERRADA — data lake é repositório de dados. D) ERRADA — feature store é o repositório de atributos para ML. E) ERRADA — pipeline de CI é automação de integração de código.',
    source: S
  },
  {
    disciplineSlug: DADOS, topic: 'Visualização de dados: tipos de gráficos; boas práticas; Power BI; storytelling', type: 'ME', difficulty: 'FACIL',
    statement: 'Para representar a evolução de uma variável ao longo do tempo (ex.: sinistros por mês), o tipo de gráfico mais adequado é o de:',
    options: [
      { text: 'setores (pizza).' },
      { text: 'linhas.', correct: true },
      { text: 'dispersão sem eixo temporal.' },
      { text: 'pizza 3D.' },
      { text: 'radar.' }
    ],
    explanation:
      'A) ERRADA — o gráfico de pizza mostra proporções de um todo em um instante, não evolução temporal. B) CORRETA — o gráfico de linhas evidencia tendências e a evolução ao longo do tempo. C) ERRADA — dispersão relaciona duas variáveis, sem foco temporal. D) ERRADA — pizza 3D distorce a leitura e não mostra evolução. E) ERRADA — o radar compara múltiplas dimensões, não séries temporais.',
    source: S
  }
]
