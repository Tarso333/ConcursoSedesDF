// Base inicial de questões da DATAPREV 2026 — itens ORIGINAIS no estilo FGV
// (múltipla escolha, 5 alternativas; foco em precisão conceitual e distinções
// finas), organizados por disciplina, tópico, dificuldade e comentário.
// Não reproduz provas protegidas.
import type { SeedQuestion } from '../../questions'

const S = 'Banco de estudo (estilo FGV)'

export const DATAPREV_QUESTIONS: SeedQuestion[] = [
  // ───────── Redes de Computadores ─────────
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Noções dos modelos de referência OSI (Open Systems Interconnection)',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'No modelo de referência OSI, a camada responsável pelo roteamento de pacotes entre redes distintas é a camada de:',
    options: [
      { text: 'enlace de dados' },
      { text: 'transporte' },
      { text: 'rede', correct: true },
      { text: 'sessão' },
      { text: 'física' }
    ],
    explanation:
      'O roteamento e o endereçamento lógico (IP) são funções da camada 3 (rede). O enlace cuida de quadros e endereços MAC; o transporte, da comunicação fim a fim (TCP/UDP).',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Elementos de interconexão de redes de computadores',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Em uma rede local, um switch de camada 2 sem VLANs configuradas tem como efeito sobre os domínios de colisão e de broadcast, respectivamente:',
    options: [
      { text: 'um domínio de colisão único e um domínio de broadcast por porta' },
      { text: 'um domínio de colisão por porta e um domínio de broadcast único', correct: true },
      { text: 'um domínio único de colisão e de broadcast, como um hub' },
      { text: 'um domínio de colisão e um de broadcast por porta, como um roteador' },
      { text: 'a eliminação de ambos os domínios' }
    ],
    explanation:
      'O switch segmenta os domínios de COLISÃO (um por porta), mas mantém um único domínio de BROADCAST — quem separa broadcast é o roteador ou a criação de VLANs.',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'VLANs',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre VLANs em redes comutadas, é correto afirmar que:',
    options: [
      { text: 'duas VLANs distintas se comunicam diretamente na camada de enlace' },
      { text: 'cada VLAN constitui um domínio de broadcast separado, e a comunicação entre VLANs exige um dispositivo de camada 3', correct: true },
      { text: 'o padrão IEEE 802.3 define a marcação (tagging) dos quadros de cada VLAN' },
      { text: 'VLANs exigem switches fisicamente separados para cada segmento lógico' },
      { text: 'a tag de VLAN é adicionada ao cabeçalho IP do pacote' }
    ],
    explanation:
      'VLAN segmenta logicamente o switch em domínios de broadcast; o tráfego inter-VLAN passa por roteador ou switch L3. O tagging é definido pelo IEEE 802.1Q e ocorre no QUADRO Ethernet (camada 2), não no cabeçalho IP.',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Camada de transporte: TCP e UDP',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Uma aplicação de streaming de vídeo em tempo real tolera perda eventual de dados, mas não tolera atrasos de retransmissão. O protocolo de transporte mais adequado e sua característica determinante são:',
    options: [
      { text: 'TCP, pelo controle de congestionamento' },
      { text: 'TCP, pelo three-way handshake' },
      { text: 'UDP, por não estabelecer conexão nem retransmitir segmentos', correct: true },
      { text: 'UDP, por garantir a ordenação dos datagramas' },
      { text: 'IPsec, pela criptografia fim a fim' }
    ],
    explanation:
      'O UDP não é orientado a conexão e não retransmite — menor overhead e latência, ideal para tempo real. Ele NÃO garante ordenação nem entrega (isso é TCP).',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Camada de rede: IPv6',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Em relação ao protocolo IPv6, assinale a afirmativa correta.',
    options: [
      { text: 'Utiliza endereços de 64 bits representados em notação decimal.' },
      { text: 'Mantém o mecanismo de broadcast do IPv4 para descoberta de vizinhos.' },
      { text: 'Utiliza endereços de 128 bits e substitui o broadcast por multicast', correct: true },
      { text: 'Exige NAT para qualquer comunicação com a Internet.' },
      { text: 'Não permite autoconfiguração de endereços pelos hosts.' }
    ],
    explanation:
      'IPv6: 128 bits em hexadecimal, SEM broadcast (usa multicast/anycast), com autoconfiguração SLAAC; o vasto espaço de endereços dispensa NAT como necessidade estrutural.',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Camada de rede: IPsec',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Uma organização precisa interligar dois datacenters por VPN, garantindo confidencialidade de todo o pacote IP original. No IPsec, a combinação adequada de protocolo e modo é:',
    options: [
      { text: 'AH em modo transporte' },
      { text: 'AH em modo túnel' },
      { text: 'ESP em modo transporte' },
      { text: 'ESP em modo túnel', correct: true },
      { text: 'IKE em modo agressivo' }
    ],
    explanation:
      'Confidencialidade exige ESP (o AH só autentica, não cifra); proteger o pacote IP INTEIRO entre gateways é o modo TÚNEL — combinação clássica de VPN site-to-site.',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Noções dos padrões IEEE 802.1, 802.3 e 802.11',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Associe corretamente o padrão IEEE à sua descrição:',
    options: [
      { text: '802.3 — redes sem fio com acesso CSMA/CA' },
      { text: '802.11ac — operação exclusiva em 2,4 GHz' },
      { text: '802.1Q — marcação de quadros para VLANs', correct: true },
      { text: '802.11b — taxas superiores a 1 Gbps' },
      { text: '802.1X — cabeamento estruturado de par trançado' }
    ],
    explanation:
      '802.1Q define o tagging de VLAN. 802.3 é Ethernet cabeada (CSMA/CD); 802.11ac opera em 5 GHz com taxas gigabit; 802.11b chega a 11 Mbps; 802.1X é controle de acesso à rede por porta.',
    source: S
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Sistemas de nomes (DNS)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No DNS, o tipo de registro que mapeia um nome de domínio para um endereço IPv6 é o:',
    options: [
      { text: 'A' },
      { text: 'AAAA', correct: true },
      { text: 'MX' },
      { text: 'CNAME' },
      { text: 'PTR' }
    ],
    explanation:
      'AAAA mapeia nome → IPv6 (o registro A mapeia para IPv4). MX indica servidor de e-mail; CNAME é apelido; PTR faz a resolução reversa.',
    source: S
  },

  // ───────── Banco de Dados ─────────
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Modelagem e normalização de dados',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Uma tabela com chave primária composta possui um atributo não chave que depende de apenas parte da chave. Essa situação viola a:',
    options: [
      { text: 'primeira forma normal' },
      { text: 'segunda forma normal', correct: true },
      { text: 'terceira forma normal' },
      { text: 'forma normal de Boyce-Codd' },
      { text: 'integridade referencial' }
    ],
    explanation:
      'Dependência PARCIAL da chave composta é exatamente a violação tratada pela 2FN. A 1FN trata de atomicidade; a 3FN, de dependência transitiva entre atributos não chave.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Modelagem de dados',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'No mapeamento de um modelo entidade-relacionamento para o modelo relacional, um relacionamento N:N entre duas entidades é implementado por meio de:',
    options: [
      { text: 'uma chave estrangeira em qualquer uma das duas tabelas' },
      { text: 'uma tabela associativa contendo as chaves estrangeiras das duas entidades', correct: true },
      { text: 'um atributo multivalorado em uma das entidades' },
      { text: 'uma view que una as duas tabelas' },
      { text: 'um índice composto sobre as duas chaves primárias' }
    ],
    explanation:
      'N:N exige tabela intermediária (associativa) com FKs para as duas entidades — a combinação costuma formar a PK composta. FK em um dos lados só resolve 1:N.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'SQL (ANSI)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre as sublinguagens do SQL ANSI, é correto afirmar que:',
    options: [
      { text: 'TRUNCATE é um comando DML, pois manipula linhas da tabela' },
      { text: 'GRANT e REVOKE pertencem à DDL' },
      { text: 'CREATE, ALTER e DROP pertencem à DDL, enquanto COMMIT e ROLLBACK são comandos de controle de transação', correct: true },
      { text: 'UPDATE é um comando DDL, pois altera a estrutura dos dados' },
      { text: 'SELECT pertence à DCL' }
    ],
    explanation:
      'DDL define estruturas (CREATE/ALTER/DROP/TRUNCATE); DML manipula dados (SELECT/INSERT/UPDATE/DELETE); DCL controla acesso (GRANT/REVOKE); TCL controla transações (COMMIT/ROLLBACK). TRUNCATE é DDL — pegadinha clássica.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'SQL (ANSI)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Em uma consulta SQL com GROUP BY, para exibir apenas os departamentos com mais de 10 empregados, a condição deve ser expressa:',
    options: [
      { text: 'no WHERE, pois filtra linhas individuais' },
      { text: 'no HAVING, pois filtra grupos após a agregação', correct: true },
      { text: 'no ORDER BY, com a função COUNT' },
      { text: 'no SELECT, com a cláusula DISTINCT' },
      { text: 'em uma subconsulta obrigatória no FROM' }
    ],
    explanation:
      'Condições sobre agregações (COUNT(*) > 10) só podem ser avaliadas APÓS o agrupamento — papel do HAVING. O WHERE roda antes do GROUP BY e não enxerga agregados.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'MongoDB',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Entre os sistemas gerenciadores citados no edital — Oracle 19c, MySQL, PostgreSQL, MongoDB e MS-SQL Server 2019 —, aquele classificado como NoSQL orientado a documentos é o:',
    options: [
      { text: 'Oracle 19c' },
      { text: 'PostgreSQL' },
      { text: 'MongoDB', correct: true },
      { text: 'MySQL' },
      { text: 'MS-SQL Server 2019' }
    ],
    explanation:
      'O MongoDB armazena documentos BSON/JSON com esquema flexível e escala horizontal nativa (sharding, replica sets). Os demais são SGBDs relacionais.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Backup',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Uma política executa backup completo aos domingos e backups diferenciais nos demais dias. Após uma falha na sexta-feira, a restauração exigirá:',
    options: [
      { text: 'o backup completo e todos os diferenciais de segunda a quinta' },
      { text: 'apenas o backup diferencial de quinta-feira' },
      { text: 'o backup completo de domingo e o diferencial de quinta-feira', correct: true },
      { text: 'todos os backups da semana, em ordem cronológica' },
      { text: 'apenas o backup completo de domingo' }
    ],
    explanation:
      'O diferencial acumula TUDO desde o último completo — basta o full + o ÚLTIMO diferencial. Se fossem incrementais, seriam necessários todos desde o domingo.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'A principal distinção entre data lake e data warehouse é que o data lake:',
    options: [
      { text: 'só armazena dados estruturados e tratados' },
      { text: 'aplica o esquema na escrita (schema-on-write)' },
      { text: 'armazena dados brutos em qualquer formato, aplicando o esquema na leitura', correct: true },
      { text: 'é otimizado exclusivamente para relatórios de BI' },
      { text: 'não permite processamento em streaming' }
    ],
    explanation:
      'Data lake: dado bruto (estruturado ou não) + schema-on-read — insumo de ciência de dados. O warehouse recebe dados tratados com schema-on-write, voltado a BI.',
    source: S
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Noções para otimização de performance em larga escala',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Uma consulta com filtro de igualdade e de faixa sobre uma coluna indexada ficou lenta após o filtro passar a aplicar uma função sobre a coluna (ex.: UPPER(nome) = :valor). A causa mais provável é:',
    options: [
      { text: 'o índice B-tree foi corrompido pela função' },
      { text: 'a função sobre a coluna impede o uso do índice existente, levando o otimizador ao full scan', correct: true },
      { text: 'funções só podem ser usadas em colunas com índice hash' },
      { text: 'o otimizador ignora estatísticas quando há funções no SELECT' },
      { text: 'o banco converteu a consulta para NoSQL' }
    ],
    explanation:
      'Aplicar função sobre a coluna filtrada torna o predicado "non-sargable": o índice da coluna não é aproveitado (a menos que exista índice funcional), e o plano degrada para varredura completa.',
    source: S
  },

  // ───────── Arquitetura Tecnológica ─────────
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Metodologias ágeis',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No Scrum, a responsabilidade por ordenar (priorizar) o Product Backlog é do:',
    options: [
      { text: 'Scrum Master' },
      { text: 'Product Owner', correct: true },
      { text: 'time de desenvolvedores' },
      { text: 'gerente de projeto' },
      { text: 'stakeholder mais sênior' }
    ],
    explanation:
      'Maximizar o valor do produto e gerir/ordenar o Product Backlog é papel do Product Owner. O Scrum Master é líder-servidor do processo — não prioriza o backlog.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Metodologias ágeis',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Diferentemente do Scrum, o método Kanban caracteriza-se por:',
    options: [
      { text: 'iterações de duração fixa com escopo congelado' },
      { text: 'papéis obrigatórios de Product Owner e Scrum Master' },
      { text: 'fluxo contínuo de trabalho com limitação do trabalho em progresso (WIP)', correct: true },
      { text: 'estimativas obrigatórias em story points' },
      { text: 'entregas exclusivamente ao final de cada sprint' }
    ],
    explanation:
      'Kanban não usa sprints nem papéis prescritos: visualiza o fluxo, LIMITA o WIP e otimiza o lead time. Iterações timeboxed são características do Scrum.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'SOLID',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Um desenvolvedor percebeu que, a cada novo tipo de relatório, precisa modificar um método com um grande bloco condicional. Refatorou para que novos formatos sejam adicionados por novas classes, sem alterar o código existente. O princípio SOLID aplicado foi:',
    options: [
      { text: 'Single Responsibility' },
      { text: 'Open/Closed', correct: true },
      { text: 'Liskov Substitution' },
      { text: 'Interface Segregation' },
      { text: 'Dependency Inversion' }
    ],
    explanation:
      'Aberto para EXTENSÃO (novas classes), fechado para MODIFICAÇÃO (código existente intocado) — Open/Closed, tipicamente materializado com polimorfismo/Strategy.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'SOLID',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Uma subclasse Quadrado herda de Retângulo, mas lança exceção ao ter a altura alterada de forma independente, quebrando código cliente que operava corretamente com Retângulo. O princípio SOLID violado é o de:',
    options: [
      { text: 'substituição de Liskov', correct: true },
      { text: 'responsabilidade única' },
      { text: 'segregação de interfaces' },
      { text: 'inversão de dependência' },
      { text: 'aberto/fechado' }
    ],
    explanation:
      'LSP: o subtipo deve poder substituir o tipo-base SEM alterar a correção do programa. Quadrado que restringe o contrato de Retângulo é o exemplo canônico de violação.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'GRASP',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Segundo o GRASP, a responsabilidade de calcular o valor total de um pedido deve ser atribuída à classe Pedido, pois ela detém as informações necessárias (itens, quantidades, preços). O padrão aplicado é:',
    options: [
      { text: 'Controller' },
      { text: 'Creator' },
      { text: 'Information Expert', correct: true },
      { text: 'Pure Fabrication' },
      { text: 'Indirection' }
    ],
    explanation:
      'Information Expert: atribua a responsabilidade a quem TEM a informação para cumpri-la. Creator trata de quem INSTANCIA objetos; Controller, do primeiro objeto que coordena operações do sistema.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Padrões de projeto',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Um sistema precisa notificar automaticamente vários módulos interessados sempre que o estado de um objeto central mudar, sem acoplá-lo às classes concretas dos interessados. O padrão de projeto GoF adequado é:',
    options: [
      { text: 'Singleton' },
      { text: 'Adapter' },
      { text: 'Observer', correct: true },
      { text: 'Builder' },
      { text: 'Facade' }
    ],
    explanation:
      'Observer (comportamental): o sujeito mantém assinantes e os notifica das mudanças de estado — base do modelo publish/subscribe.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Padrões de projeto',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Para permitir que uma classe cliente utilize uma biblioteca legada cuja interface é incompatível com a esperada, sem alterar nenhuma das duas, aplica-se o padrão:',
    options: [
      { text: 'Decorator, que adiciona responsabilidades dinamicamente' },
      { text: 'Adapter, que converte a interface da classe existente na interface esperada', correct: true },
      { text: 'Facade, que simplifica o acesso a um subsistema' },
      { text: 'Proxy, que controla o acesso ao objeto real' },
      { text: 'Composite, que trata objetos individuais e composições uniformemente' }
    ],
    explanation:
      'Adapter faz a CONVERSÃO de contrato entre interfaces incompatíveis. Facade apenas simplifica (sem incompatibilidade); Decorator adiciona comportamento; Proxy controla acesso.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'TDD',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No TDD (Test-Driven Development), o ciclo de trabalho correto é:',
    options: [
      { text: 'codificar, testar e documentar' },
      { text: 'escrever o teste que falha, escrever o código mínimo para passar e refatorar', correct: true },
      { text: 'refatorar, codificar e escrever os testes de regressão' },
      { text: 'escrever todos os testes do sistema e só então iniciar o código' },
      { text: 'codificar, homologar com o usuário e escrever os testes' }
    ],
    explanation:
      'Red-Green-Refactor: o teste vem ANTES do código (red), implementa-se o mínimo (green) e melhora-se o design com a rede de segurança dos testes (refactor).',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'UML: visão geral, modelos e diagramas',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Em um diagrama de classes UML, a relação todo-parte em que as partes NÃO existem sem o todo (são destruídas com ele) é representada por:',
    options: [
      { text: 'agregação, com losango vazio' },
      { text: 'composição, com losango preenchido', correct: true },
      { text: 'generalização, com triângulo vazio' },
      { text: 'dependência, com seta tracejada' },
      { text: 'realização, com triângulo e linha tracejada' }
    ],
    explanation:
      'Composição (losango CHEIO) = todo-parte forte, ciclo de vida acoplado. Agregação (losango vazio) = todo-parte fraco, partes independentes. Generalização é herança.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Interoperabilidade de sistemas e padrões de integração',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre o estilo arquitetural REST, é correto afirmar que:',
    options: [
      { text: 'é um protocolo de transporte baseado em envelope XML' },
      { text: 'exige a manutenção do estado da sessão do cliente no servidor' },
      { text: 'é stateless: cada requisição deve conter as informações necessárias ao seu processamento', correct: true },
      { text: 'utiliza WSDL como contrato obrigatório de serviços' },
      { text: 'admite apenas JSON como formato de representação' }
    ],
    explanation:
      'REST é ESTILO ARQUITETURAL (não protocolo) com restrição stateless. Envelope XML e WSDL pertencem ao SOAP; REST aceita múltiplas representações (JSON, XML etc.).',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Gestão de Configuração',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Na esteira de entrega de software, a diferença entre continuous delivery e continuous deployment é que, no continuous deployment:',
    options: [
      { text: 'o build é executado apenas semanalmente' },
      { text: 'a publicação em produção ocorre automaticamente, sem aprovação manual', correct: true },
      { text: 'os testes automatizados são dispensados' },
      { text: 'o artefato nunca chega ao ambiente de produção' },
      { text: 'a integração do código ocorre somente ao final do projeto' }
    ],
    explanation:
      'Delivery: artefato SEMPRE pronto, com gate manual para produção. Deployment: toda mudança aprovada no pipeline vai a produção AUTOMATICAMENTE.',
    source: S
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'DevSecOps',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'No contexto DevSecOps, a técnica que analisa o código-fonte em busca de vulnerabilidades SEM executar a aplicação é conhecida como:',
    options: [
      { text: 'DAST' },
      { text: 'SAST', correct: true },
      { text: 'pentest de caixa preta' },
      { text: 'SCA de infraestrutura' },
      { text: 'fuzzing' }
    ],
    explanation:
      'SAST = Static Application Security Testing (análise ESTÁTICA do fonte, cedo no pipeline — shift-left). DAST testa a aplicação em EXECUÇÃO; SCA analisa dependências de terceiros.',
    source: S
  },

  // ───────── Computação em Nuvem e Virtualização ─────────
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Conceitos de computação em nuvem',
    type: 'ME',
    difficulty: 'FACIL',
    statement:
      'Uma empresa deseja implantar suas aplicações sem administrar servidores, sistema operacional ou runtime, mantendo o controle apenas sobre o código e os dados. O modelo de serviço adequado é:',
    options: [
      { text: 'IaaS' },
      { text: 'PaaS', correct: true },
      { text: 'SaaS' },
      { text: 'nuvem privada' },
      { text: 'colocation' }
    ],
    explanation:
      'PaaS entrega a plataforma (runtime, middleware, SO gerenciados pelo provedor); o cliente cuida só da aplicação e dos dados. No IaaS ele administraria o SO; no SaaS, usaria software pronto.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Elasticidade',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'A capacidade de um ambiente de nuvem provisionar e LIBERAR recursos automaticamente, acompanhando a variação da demanda para pagar apenas o necessário, denomina-se:',
    options: [
      { text: 'escalabilidade vertical' },
      { text: 'alta disponibilidade' },
      { text: 'elasticidade', correct: true },
      { text: 'tolerância a falhas' },
      { text: 'redundância geográfica' }
    ],
    explanation:
      'Elasticidade = ajuste AUTOMÁTICO e BIDIRECIONAL (cresce no pico, encolhe na baixa). Escalabilidade é a capacidade de crescer — não implica automação nem redução.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Zonas de disponibilidade',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Nas arquiteturas de nuvem pública, zonas de disponibilidade são:',
    options: [
      { text: 'regiões geográficas distintas separadas por milhares de quilômetros' },
      { text: 'datacenters fisicamente isolados dentro de uma mesma região, com energia e rede independentes', correct: true },
      { text: 'subscrições lógicas para separação de cobrança' },
      { text: 'grupos de gestão para herança de políticas' },
      { text: 'réplicas de dados em provedores concorrentes' }
    ],
    explanation:
      'AZs são datacenters isolados DENTRO da região, interligados por rede de baixa latência — distribuir instâncias entre elas dá alta disponibilidade intra-região. Áreas geográficas distintas são as REGIÕES.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Infrastructure as Code (IaC)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Na Infraestrutura como Código, a abordagem em que se descreve o ESTADO FINAL desejado do ambiente, deixando à ferramenta a decisão dos passos para alcançá-lo, é a:',
    options: [
      { text: 'imperativa' },
      { text: 'procedural' },
      { text: 'declarativa', correct: true },
      { text: 'transacional' },
      { text: 'orientada a eventos' }
    ],
    explanation:
      'Declarativa = estado desejado (Terraform, manifests K8s); imperativa = sequência de comandos. Idempotência e detecção de drift completam o vocabulário de prova de IaC.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Docker',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre a diferença entre contêineres e máquinas virtuais, é correto afirmar que os contêineres:',
    options: [
      { text: 'virtualizam o hardware por meio de um hipervisor dedicado' },
      { text: 'incluem um sistema operacional convidado completo por instância' },
      { text: 'compartilham o kernel do sistema hospedeiro, com isolamento por namespaces e cgroups', correct: true },
      { text: 'oferecem isolamento mais forte que as máquinas virtuais' },
      { text: 'demoram mais para inicializar que as máquinas virtuais' }
    ],
    explanation:
      'Contêiner virtualiza no nível do SO: compartilha o kernel do host e isola processos via namespaces/cgroups — leve e rápido, porém com isolamento MENOR que o de uma VM com hipervisor.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Kubernetes',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No Kubernetes, a menor unidade implantável, capaz de conter um ou mais contêineres que compartilham rede e armazenamento, é o:',
    options: [
      { text: 'node' },
      { text: 'deployment' },
      { text: 'pod', correct: true },
      { text: 'service' },
      { text: 'namespace' }
    ],
    explanation:
      'O POD é a unidade mínima de implantação. Deployment gerencia réplicas de pods; Service dá endereço estável; Node é a máquina; Namespace isola recursos logicamente.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Red Hat Clair',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'Na cadeia de segurança de contêineres, a função do Red Hat Clair é:',
    options: [
      { text: 'orquestrar os contêineres em cluster' },
      { text: 'analisar estaticamente imagens de contêiner em busca de vulnerabilidades conhecidas (CVE)', correct: true },
      { text: 'substituir o registry de imagens' },
      { text: 'criptografar o tráfego entre pods' },
      { text: 'aplicar patches automaticamente nas imagens vulneráveis' }
    ],
    explanation:
      'O Clair inspeciona as CAMADAS das imagens e as confronta com bases de vulnerabilidades (CVE). Ele DETECTA — quem bloqueia ou corrige é a política do registry (ex.: Harbor) ou do pipeline.',
    source: S
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'VMware vRealize Operations',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'No portfólio VMware citado no edital, o componente voltado ao MONITORAMENTO de desempenho e capacidade do ambiente virtualizado é o:',
    options: [
      { text: 'vRealize Orchestrator' },
      { text: 'vCloud Director' },
      { text: 'vRealize Operations', correct: true },
      { text: 'NSX' },
      { text: 'vRealize Automation' }
    ],
    explanation:
      'vRealize Operations = monitoramento/capacidade; Orchestrator = workflows; Automation = provisionamento self-service; NSX = virtualização de rede; vCloud Director = nuvem multi-tenant.',
    source: S
  },

  // ───────── Linguagens, Frameworks e Versionamento ─────────
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Spring Boot',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre o Spring Boot, é correto afirmar que:',
    options: [
      { text: 'exige a implantação de arquivos WAR em servidor de aplicação externo' },
      { text: 'oferece autoconfiguração e servidor embarcado, permitindo executar a aplicação como JAR autônomo', correct: true },
      { text: 'substitui integralmente o Spring Framework, dispensando injeção de dependências' },
      { text: 'não oferece recursos de monitoramento em produção' },
      { text: 'impede o uso de perfis de configuração por ambiente' }
    ],
    explanation:
      'Boot = autoconfiguração + starters + servidor embarcado (Tomcat) + Actuator (health/metrics). Ele ACELERA o Spring (IoC/DI continuam na base), não o substitui.',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Spring Cloud',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement:
      'Em uma arquitetura de microsserviços com Spring Cloud, o padrão que interrompe temporariamente as chamadas a um serviço que vem falhando, respondendo rapidamente com fallback para evitar falhas em cascata, é o:',
    options: [
      { text: 'service discovery' },
      { text: 'API composition' },
      { text: 'circuit breaker', correct: true },
      { text: 'saga' },
      { text: 'sidecar' }
    ],
    explanation:
      'Circuit breaker (Resilience4j; antes Hystrix): após N falhas o circuito ABRE e as chamadas falham rápido/fallback; o estado semiaberto testa a recuperação. Discovery localiza serviços (Eureka).',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Confluent Kafka',
    type: 'ME',
    difficulty: 'DIFICIL',
    statement: 'No Apache Kafka, sobre tópicos, partições e grupos de consumidores, é correto afirmar que:',
    options: [
      { text: 'a ordem das mensagens é garantida globalmente em todo o tópico' },
      { text: 'uma mensagem consumida é imediatamente removida do tópico' },
      { text: 'dentro de um consumer group, cada partição é consumida por apenas um consumidor, e a ordem é garantida por partição', correct: true },
      { text: 'todos os consumidores de um mesmo grupo recebem todas as mensagens' },
      { text: 'o número de partições limita o número de tópicos do cluster' }
    ],
    explanation:
      'Partição = unidade de paralelismo e de ORDEM. No grupo, cada partição tem um único consumidor (balanceamento); grupos DIFERENTES recebem tudo. Mensagens permanecem pela política de retenção (log durável).',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Java EE',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No Java EE, a relação entre JPA e Hibernate é a de que:',
    options: [
      { text: 'Hibernate é a especificação e JPA sua implementação de referência' },
      { text: 'JPA é a especificação de mapeamento objeto-relacional e Hibernate uma de suas implementações', correct: true },
      { text: 'ambos são especificações concorrentes mantidas pela Oracle' },
      { text: 'JPA substitui o SQL, eliminando o modelo relacional' },
      { text: 'Hibernate é o componente de mensageria do JPA' }
    ],
    explanation:
      'JPA (spec) define @Entity, EntityManager e JPQL; Hibernate e EclipseLink IMPLEMENTAM a especificação. A inversão spec × implementação é pegadinha recorrente.',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'JMS (Java Message Service)',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'No JMS, o modelo de mensageria em que cada mensagem é entregue a UM ÚNICO consumidor, dentre vários possíveis, é o:',
    options: [
      { text: 'publish/subscribe com tópicos' },
      { text: 'point-to-point com filas (queues)', correct: true },
      { text: 'broadcast com multicast' },
      { text: 'streaming com partições' },
      { text: 'request/reply síncrono obrigatório' }
    ],
    explanation:
      'Queue (point-to-point): consumidores competem e cada mensagem vai para UM só — balanceamento de carga. No topic (pub/sub), TODOS os assinantes recebem a mensagem.',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'React.js',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'No React, a distinção entre props e state é que as props:',
    options: [
      { text: 'são mutáveis e internas ao componente' },
      { text: 'são imutáveis e recebidas do componente pai, enquanto o state é o dado interno mutável do componente', correct: true },
      { text: 'atualizam o DOM real diretamente, sem reconciliação' },
      { text: 'só podem conter funções de callback' },
      { text: 'fluem do componente filho para o pai' }
    ],
    explanation:
      'Props: somente leitura, fluxo UNIDIRECIONAL de pai para filho. State: dado interno alterado via setState/useState, que dispara nova renderização e a reconciliação do Virtual DOM.',
    source: S
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'GitLab',
    type: 'ME',
    difficulty: 'FACIL',
    statement: 'No GitLab, o pipeline de integração contínua de um projeto é definido:',
    options: [
      { text: 'no arquivo Jenkinsfile, na raiz do repositório' },
      { text: 'no arquivo .gitlab-ci.yml, versionado na raiz do repositório', correct: true },
      { text: 'exclusivamente pela interface web, sem versionamento' },
      { text: 'no arquivo pom.xml do Maven' },
      { text: 'no arquivo docker-compose.yml' }
    ],
    explanation:
      'Pipeline as code: `.gitlab-ci.yml` versionado define stages e jobs, executados pelos runners. Jenkinsfile é o equivalente no Jenkins — troca de nomes é pegadinha comum.',
    source: S
  }
]
