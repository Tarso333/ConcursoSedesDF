// Conhecimento inicial da DATAPREV 2026 — conteúdo técnico autoral de estudo
// para a banca FGV (precisão conceitual + distinções finas entre termos, o
// padrão de cobrança da banca em TI). Apenas DADOS (M15) — Fase 1: núcleo
// técnico do Perfil 2 (Arquitetura, Engenharia e Sustentação Tecnológica).
import type { SeedTopicKnowledge } from '../types'

export const DATAPREV_KNOWLEDGE: SeedTopicKnowledge[] = [
  // ═══════════════ REDES DE COMPUTADORES ═══════════════
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Noções dos modelos de referência OSI (Open Systems Interconnection)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Modelo OSI — as 7 camadas e o que cai na FGV',
        body:
          '# Modelo OSI (ISO/IEC 7498)\n\n' +
          '| # | Camada | Função | PDU | Equipamento típico |\n| --- | --- | --- | --- | --- |\n' +
          '| 7 | **Aplicação** | serviços ao usuário (HTTP, FTP, SMTP, DNS) | dados | gateway |\n' +
          '| 6 | **Apresentação** | sintaxe/semântica: criptografia, compressão, codificação | dados | — |\n' +
          '| 5 | **Sessão** | estabelece/gerencia/encerra diálogos; checkpoints | dados | — |\n' +
          '| 4 | **Transporte** | comunicação fim a fim; segmentação; confiabilidade | **segmento** | — |\n' +
          '| 3 | **Rede** | endereçamento lógico e roteamento entre redes | **pacote** | roteador |\n' +
          '| 2 | **Enlace** | quadros, endereçamento físico (MAC), detecção de erros | **quadro** | switch, bridge |\n' +
          '| 1 | **Física** | bits no meio (elétrico/óptico/rádio) | **bit** | hub, repetidor |\n\n' +
          '## Como a FGV cobra\n' +
          '- Associar **função ↔ camada** ("roteamento" → rede; "confiabilidade fim a fim" → transporte).\n' +
          '- Associar **equipamento ↔ camada** (hub = 1, switch = 2, roteador = 3).\n' +
          '- Associar **PDU ↔ camada** (bit, quadro, pacote, segmento).\n' +
          '- Comparar **OSI (7 camadas) × TCP/IP (4 camadas)**: aplicação+apresentação+sessão do OSI ≈ aplicação do TCP/IP; física+enlace ≈ acesso à rede.'
      },
      {
        kind: 'CONCEITO',
        title: 'Encapsulamento',
        body: 'Cada camada adiciona seu cabeçalho aos dados da camada superior ao descer a pilha (dados → segmento → pacote → quadro → bits); no destino ocorre o desencapsulamento na ordem inversa.'
      },
      {
        kind: 'DICA',
        body: 'Mnemônico de baixo para cima: **F**ísica, **E**nlace, **R**ede, **T**ransporte, **S**essão, **A**presentação, **A**plicação — "FERTSAA". Grave as PDUs: bit/quadro/pacote/segmento (1/2/3/4).'
      },
      {
        kind: 'PEGADINHA',
        body: '"O switch opera na camada de rede" — **ERRADO** em regra: switch clássico é camada 2 (enlace, endereço MAC). Existem switches L3, mas a questão precisa dizer isso explicitamente. Roteador é quem opera na camada 3.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Trocar a PDU: "na camada de transporte trafegam pacotes" — **ERRADO**: na camada 4 a PDU é o SEGMENTO; pacote é a PDU da camada 3 (rede).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'OSI: 7 camadas · PDU bit/quadro/pacote/segmento' },
      { kind: 'PALAVRA_CHAVE', title: 'hub L1 · switch L2 · roteador L3' }
    ]
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Arquitetura e pilhas de protocolos TCP/IP',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Pilha TCP/IP — endereçamento, transporte e aplicação',
        body:
          '# Arquitetura TCP/IP\n\n' +
          '## Camada de rede\n' +
          '- **IPv4**: 32 bits, notação decimal pontuada (ex.: 192.168.0.1/24); classes A/B/C históricas; hoje **CIDR** (máscara de comprimento variável); NAT contorna a escassez de endereços; endereços privados (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.\n' +
          '- **IPv6**: **128 bits**, hexadecimal em 8 grupos; sem broadcast (usa multicast); autoconfiguração **SLAAC**; abreviação com `::` uma única vez.\n' +
          '- **IPsec**: segurança na camada de REDE — protocolos **AH** (autenticação/integridade, sem sigilo) e **ESP** (sigilo + autenticação); modos **transporte** (protege o payload) e **túnel** (protege o pacote inteiro — base de VPN site-to-site). No IPv6 o suporte é nativo.\n\n' +
          '## Camada de transporte\n' +
          '| | **TCP** | **UDP** |\n| --- | --- | --- |\n' +
          '| Conexão | orientado (three-way handshake SYN, SYN-ACK, ACK) | não orientado |\n' +
          '| Confiabilidade | entrega garantida, ordenação, retransmissão | sem garantias |\n' +
          '| Controle | fluxo (janela deslizante) e congestionamento | não há |\n' +
          '| Uso típico | HTTP/HTTPS, FTP, SMTP, SSH | DNS (consulta), DHCP, streaming, VoIP |\n\n' +
          '## Portas clássicas (decoreba que a FGV cobra)\n' +
          'FTP 20/21 · SSH 22 · SMTP 25 (587 submissão) · DNS 53 · DHCP 67/68 · HTTP 80 · POP3 110 · IMAP 143 · HTTPS 443 · RDP 3389.'
      },
      {
        kind: 'CONCEITO',
        title: 'Roteamento × encaminhamento',
        body: 'Roteamento = decidir o melhor caminho (tabelas construídas estática ou dinamicamente); encaminhamento (forwarding) = mover o pacote para a interface de saída. O roteador decide salto a salto pelo endereço IP de DESTINO.'
      },
      {
        kind: 'CONCEITO',
        title: 'DNS — sistema de nomes',
        body: 'Base hierárquica e distribuída que resolve nomes em endereços IP. Consulta comum usa UDP/53 (TCP/53 para transferência de zona e respostas grandes). Registros: A (IPv4), AAAA (IPv6), CNAME (apelido), MX (e-mail), NS (autoridade), PTR (reverso).'
      },
      {
        kind: 'DICA',
        body: 'HTTPS = HTTP sobre **TLS/SSL** (porta 443): garante sigilo, integridade e autenticação do SERVIDOR (certificado X.509). SSL é o predecessor do TLS — a banca usa os nomes de forma intercambiável.'
      },
      {
        kind: 'PEGADINHA',
        body: '"O IPv6 possui endereços de 64 bits e mantém o broadcast" — **DUPLO ERRO**: são 128 bits e o IPv6 NÃO tem broadcast (substituído por multicast + anycast).'
      },
      {
        kind: 'PEGADINHA',
        body: '"O UDP garante a entrega ordenada dos dados" — **ERRADO**: UDP não garante entrega, nem ordem, nem faz controle de congestionamento. É exatamente por isso que é mais rápido (menos overhead).'
      },
      {
        kind: 'OBSERVACAO',
        body: 'AH × ESP no IPsec: AH **não cifra** (só autentica/integridade); ESP cifra e também pode autenticar. Se a questão falar em "confidencialidade no IPsec", a resposta envolve ESP.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'TCP conexão/confiável × UDP rápido/sem garantia' },
      { kind: 'PALAVRA_CHAVE', title: 'IPv6 128 bits · sem broadcast · SLAAC' },
      { kind: 'PALAVRA_CHAVE', title: 'IPsec: AH × ESP · transporte × túnel' }
    ]
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Elementos de interconexão de redes de computadores',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Hub × switch × roteador · VLANs · cabeamento',
        body:
          '# Interconexão de redes\n\n' +
          '| Equipamento | Camada OSI | Domínio de colisão | Domínio de broadcast |\n| --- | --- | --- | --- |\n' +
          '| Hub/repetidor | 1 (física) | **único** (compartilhado) | único |\n' +
          '| Switch | 2 (enlace) | **um por porta** | único (sem VLAN) |\n' +
          '| Roteador | 3 (rede) | um por porta | **um por porta** |\n\n' +
          '## VLANs (IEEE 802.1Q)\n' +
          '- Segmentam **logicamente** um switch físico em várias redes: cada VLAN é um **domínio de broadcast** separado.\n' +
          '- A comunicação ENTRE VLANs exige **roteamento** (roteador ou switch L3).\n' +
          '- O padrão 802.1Q insere uma **tag** de 4 bytes no quadro Ethernet (VLAN ID de 12 bits → 4094 VLANs úteis); porta **trunk** transporta várias VLANs entre switches; porta **access** pertence a uma única VLAN.\n\n' +
          '## Cabeamento estruturado (NBR 14565 / TIA-568)\n' +
          'Subsistemas: entrada do edifício, sala de equipamentos, cabeamento de backbone (vertical), sala/armário de telecomunicações, cabeamento horizontal (limite de **90 m** + 10 m de cordões = canal de 100 m) e área de trabalho.'
      },
      {
        kind: 'CONCEITO',
        title: 'Domínio de colisão × domínio de broadcast',
        body: 'Colisão: segmento onde quadros podem colidir (o switch isola por porta). Broadcast: alcance de um quadro de difusão (só roteador — ou VLAN — separa). Hub não separa nada; switch separa colisão; roteador separa os dois.'
      },
      {
        kind: 'DICA',
        body: 'FGV adora: "switch aumenta o número de domínios de colisão e mantém um único domínio de broadcast" — CERTO (sem VLANs). Com VLANs, cada VLAN vira um domínio de broadcast próprio.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Duas VLANs distintas no mesmo switch se comunicam diretamente na camada 2" — **ERRADO**: comunicação inter-VLAN exige um dispositivo de camada 3 (roteador ou switch L3).'
      },
      { kind: 'PALAVRA_CHAVE', title: '802.1Q · tag VLAN · trunk × access' },
      { kind: 'PALAVRA_CHAVE', title: 'horizontal 90 m · canal 100 m' }
    ]
  },
  {
    disciplineSlug: 'redes-de-computadores',
    topic: 'Noções dos padrões IEEE 802.1, 802.3 e 802.11',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Família IEEE 802 — o essencial para a prova',
        body:
          '# Padrões IEEE 802\n\n' +
          '- **802.1**: arquitetura e interligação de redes — inclui **802.1Q (VLAN)**, **802.1X (controle de acesso à rede por porta)**, 802.1D (Spanning Tree).\n' +
          '- **802.3**: **Ethernet** (cabeada) — acesso ao meio **CSMA/CD** (hoje irrelevante com switches full-duplex); variantes Fast Ethernet (100 Mbps), Gigabit (1000BASE-T) etc.\n' +
          '- **802.11**: **redes sem fio (Wi-Fi)** — acesso ao meio **CSMA/CA** (evita colisão, não a detecta).\n\n' +
          '| Padrão | Frequência | Taxa máxima teórica |\n| --- | --- | --- |\n' +
          '| 802.11a | 5 GHz | 54 Mbps |\n' +
          '| 802.11b | 2,4 GHz | 11 Mbps |\n' +
          '| 802.11g | 2,4 GHz | 54 Mbps |\n' +
          '| 802.11n | 2,4 **e** 5 GHz | 600 Mbps (MIMO) |\n' +
          '| 802.11ac | **5 GHz** | > 1 Gbps (MU-MIMO, Wi-Fi 5) |'
      },
      {
        kind: 'DICA',
        body: 'Grave os pares: Ethernet → CSMA/**CD** (Collision **Detection**); Wi-Fi → CSMA/**CA** (Collision **Avoidance**). No rádio não dá para detectar colisão transmitindo — por isso o Wi-Fi EVITA.'
      },
      {
        kind: 'PEGADINHA',
        body: '"O 802.11n opera exclusivamente em 5 GHz" — **ERRADO**: o n é dual-band (2,4 e 5 GHz). Quem opera só em 5 GHz são o 802.11a e o 802.11ac.'
      },
      { kind: 'PALAVRA_CHAVE', title: '802.1Q VLAN · 802.1X autenticação' },
      { kind: 'PALAVRA_CHAVE', title: 'CSMA/CD Ethernet × CSMA/CA Wi-Fi' }
    ]
  },

  // ═══════════════ BANCO DE DADOS ═══════════════
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Modelagem e normalização de dados',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Modelo ER, mapeamento relacional e formas normais',
        body:
          '# Modelagem e normalização\n\n' +
          '## Níveis de modelagem\n' +
          '1. **Conceitual** (ER de Chen: entidades, atributos, relacionamentos, cardinalidades) — independente de tecnologia.\n' +
          '2. **Lógico** (relacional: tabelas, PK/FK) — dependente do paradigma.\n' +
          '3. **Físico** (índices, tablespaces, tipos) — dependente do SGBD.\n\n' +
          '## Mapeamento ER → relacional\n' +
          '- 1:N → FK no lado **N**.\n- N:N → **tabela associativa** com as duas FKs.\n- Entidade fraca → PK composta incluindo a FK da entidade forte.\n\n' +
          '## Formas normais\n' +
          '| FN | Elimina | Regra prática |\n| --- | --- | --- |\n' +
          '| **1FN** | grupos repetitivos | todos os atributos **atômicos** |\n' +
          '| **2FN** | dependência **parcial** | atributo não-chave depende da chave INTEIRA (só importa com PK composta) |\n' +
          '| **3FN** | dependência **transitiva** | não-chave não depende de outro não-chave |\n' +
          '| **BCNF** | anomalias residuais | todo determinante é chave candidata |\n\n' +
          'Normalizar reduz **redundância e anomalias** (inserção/atualização/exclusão); desnormalizar é decisão consciente de performance (mais leitura, menos junções).'
      },
      {
        kind: 'CONCEITO',
        title: 'Chave primária × candidata × estrangeira',
        body: 'Candidata: conjunto mínimo que identifica a tupla. Primária: a candidata escolhida (única, não nula). Estrangeira: referencia a PK de outra tabela — implementa a integridade REFERENCIAL.'
      },
      {
        kind: 'CONCEITO',
        title: 'Cardinalidade × opcionalidade',
        body: 'Cardinalidade máxima define o tipo do relacionamento (1:1, 1:N, N:N); a mínima define obrigatoriedade (0 = opcional, 1 = obrigatório). A FGV costuma cobrar a leitura correta dos dois lados do diagrama.'
      },
      {
        kind: 'DICA',
        body: 'Frase-gatilho da 2FN: só é violável com **chave composta**. Se a PK é simples e a tabela está na 1FN, ela já está na 2FN — direto para verificar a 3FN (transitividade).'
      },
      {
        kind: 'PEGADINHA',
        body: '"Tabela com PK simples pode violar a 2FN" — **ERRADO**: dependência parcial pressupõe chave composta. Outra clássica: "normalizar sempre melhora a performance" — **ERRADO**: normalização visa integridade; pode PIORAR leitura (mais joins).'
      },
      { kind: 'PALAVRA_CHAVE', title: '1FN atômico · 2FN parcial · 3FN transitiva' },
      { kind: 'PALAVRA_CHAVE', title: 'N:N → tabela associativa' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'SQL (ANSI)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'SQL ANSI — sublinguagens, junções e agregação',
        body:
          '# SQL (ANSI)\n\n' +
          '## Sublinguagens\n' +
          '| Sigla | Nome | Comandos |\n| --- | --- | --- |\n' +
          '| **DDL** | definição | CREATE, ALTER, DROP, TRUNCATE |\n' +
          '| **DML** | manipulação | SELECT*, INSERT, UPDATE, DELETE |\n' +
          '| **DCL** | controle de acesso | GRANT, REVOKE |\n' +
          '| **TCL** | transação | COMMIT, ROLLBACK, SAVEPOINT |\n\n' +
          '\\* Algumas bancas separam o SELECT como DQL — leia o enunciado.\n\n' +
          '## Junções\n' +
          '- **INNER JOIN**: só correspondências.\n- **LEFT/RIGHT JOIN**: preserva todas as linhas de um lado (NULL no outro).\n- **FULL JOIN**: preserva os dois lados.\n- **CROSS JOIN**: produto cartesiano.\n\n' +
          '## Agregação\n' +
          '`WHERE` filtra **linhas antes** do GROUP BY; `HAVING` filtra **grupos depois**. Ordem lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.\n\n' +
          '## Transações — ACID\n' +
          '**A**tomicidade (tudo ou nada) · **C**onsistência (regras preservadas) · **I**solamento (concorrência controlada) · **D**urabilidade (efeito persiste após commit).'
      },
      {
        kind: 'CONCEITO',
        title: 'DELETE × TRUNCATE × DROP',
        body: 'DELETE (DML): remove linhas, aceita WHERE, gera log por linha, pode ser revertido na transação. TRUNCATE (DDL): esvazia a tabela inteira, mais rápido, sem WHERE. DROP (DDL): apaga a ESTRUTURA da tabela.'
      },
      {
        kind: 'CONCEITO',
        title: 'MongoDB — o não-relacional da lista do edital',
        body: 'SGBD NoSQL orientado a DOCUMENTOS (BSON/JSON), schema flexível, escala horizontalmente (sharding nativo, replica sets). Oracle 19c, MySQL, PostgreSQL e SQL Server 2019 são relacionais; o MongoDB é o intruso — distinção favorita de prova.'
      },
      {
        kind: 'CONCEITO',
        title: 'View × índice',
        body: 'View: consulta nomeada (tabela virtual) — simplifica e controla acesso; não armazena dados (exceto materialized view). Índice: estrutura auxiliar (tipicamente B-tree) que acelera buscas ao custo de escrita e espaço.'
      },
      {
        kind: 'DICA',
        body: 'FGV cobra a ordem lógica da consulta: o apelido criado no SELECT não pode ser usado no WHERE (o WHERE roda antes) — mas pode no ORDER BY (que roda depois).'
      },
      {
        kind: 'PEGADINHA',
        body: '"HAVING pode substituir o WHERE em qualquer consulta" — **ERRADO**: HAVING opera sobre grupos/agregados (exige GROUP BY na prática); filtrar linha a linha é papel do WHERE. Também clássico: "TRUNCATE é DML" — **ERRADO**, é DDL.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'DDL/DML/DCL/TCL · ACID' },
      { kind: 'PALAVRA_CHAVE', title: 'WHERE linhas × HAVING grupos' },
      { kind: 'PALAVRA_CHAVE', title: 'MongoDB = documentos (NoSQL)' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Arquitetura e políticas de armazenamento, backup, restauração, segurança e monitoração de dados',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Backup, restauração e os indicadores RTO/RPO',
        body:
          '# Políticas de proteção de dados\n\n' +
          '## Tipos de backup\n' +
          '| Tipo | Copia | Restauração |\n| --- | --- | --- |\n' +
          '| **Completo (full)** | tudo | 1 mídia |\n' +
          '| **Incremental** | mudanças desde o **último backup de qualquer tipo** | full + TODOS os incrementais |\n' +
          '| **Diferencial** | mudanças desde o **último FULL** | full + último diferencial |\n\n' +
          'Incremental: backup mais rápido, restauração mais lenta. Diferencial: cresce a cada dia, mas restaura em 2 passos.\n\n' +
          '## Indicadores de continuidade\n' +
          '- **RPO** (Recovery **Point** Objective): quanto de DADO se admite perder (janela entre backups).\n' +
          '- **RTO** (Recovery **Time** Objective): quanto TEMPO se admite ficar indisponível.\n\n' +
          '## Regra 3-2-1\n' +
          '3 cópias, em 2 mídias diferentes, 1 fora do site (off-site) — resposta padrão para "boa prática de backup".\n\n' +
          '## Segurança e monitoração\n' +
          'Criptografia em repouso e em trânsito, controle de acesso (princípio do menor privilégio), mascaramento, auditoria (trilhas), monitoração de performance e de integridade.'
      },
      {
        kind: 'CONCEITO',
        title: 'RAID básico',
        body: 'RAID 0: striping, desempenho, SEM redundância. RAID 1: espelhamento. RAID 5: paridade distribuída (tolera 1 disco). RAID 10: espelho + striping. RAID NÃO substitui backup — não protege contra exclusão lógica ou ransomware.'
      },
      {
        kind: 'DICA',
        body: 'Par mnemônico: RPO = **P**erda de dados (ponto no tempo); RTO = **T**empo de retorno. A FGV inverte as definições para pegar o candidato apressado.'
      },
      {
        kind: 'PEGADINHA',
        body: '"O backup diferencial copia as alterações desde o último backup de qualquer tipo" — **ERRADO**: essa é a definição de INCREMENTAL. O diferencial referencia sempre o último COMPLETO.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'full × incremental × diferencial' },
      { kind: 'PALAVRA_CHAVE', title: 'RPO perda · RTO tempo · 3-2-1' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Engenharia de dados: ingestão e armazenamento de grande quantidade de dados (Big Data)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Big Data — Vs, pipelines e arquiteturas de armazenamento',
        body:
          '# Engenharia de dados e Big Data\n\n' +
          '## Os Vs do Big Data\n' +
          '**V**olume (escala), **V**elocidade (geração/processamento), **V**ariedade (estruturado, semi, não estruturado) — clássicos; + Veracidade e Valor nas versões estendidas (5 Vs).\n\n' +
          '## Ingestão\n' +
          '- **Batch** (lotes periódicos — ETL tradicional) × **streaming** (contínuo, quase tempo real — ex.: Kafka).\n' +
          '- **ETL** (transforma ANTES de carregar — típico de data warehouse) × **ELT** (carrega bruto e transforma DENTRO do destino — típico de data lake/nuvem).\n\n' +
          '## Armazenamento\n' +
          '| | **Data Warehouse** | **Data Lake** |\n| --- | --- | --- |\n' +
          '| Dados | estruturados, tratados | brutos, qualquer formato |\n' +
          '| Esquema | **schema-on-write** | **schema-on-read** |\n' +
          '| Uso | BI, relatórios | ciência de dados, ML |\n\n' +
          'Lakehouse combina os dois. Particionamento e replicação são as bases da escala horizontal (processar onde o dado está).'
      },
      {
        kind: 'CONCEITO',
        title: 'Escalabilidade vertical × horizontal',
        body: 'Vertical (scale up): máquina mais potente — limite físico. Horizontal (scale out): mais nós no cluster — o caminho do Big Data e do NoSQL (com particionamento/sharding e replicação).'
      },
      {
        kind: 'OBSERVACAO',
        body: 'Teorema CAP: em um sistema distribuído com Partição de rede, escolhe-se entre Consistência e Disponibilidade (não dá para maximizar os três). Bancos NoSQL costumam relaxar consistência (consistência eventual) em favor de disponibilidade.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Data lake exige que os dados sejam transformados e estruturados antes da carga" — **ERRADO**: isso é o data WAREHOUSE (schema-on-write). O lake armazena o dado bruto e aplica o esquema na leitura.'
      },
      { kind: 'PALAVRA_CHAVE', title: '3 Vs · ETL × ELT · batch × streaming' },
      { kind: 'PALAVRA_CHAVE', title: 'warehouse schema-on-write × lake schema-on-read' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Noções para otimização de performance em larga escala',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Otimização: índices, plano de execução, particionamento e cache',
        body:
          '# Otimização de performance em larga escala\n\n' +
          '## Índices\n' +
          '- **B-tree** (padrão): ótimo para igualdade e FAIXAS (`BETWEEN`, `>`, `ORDER BY`).\n' +
          '- **Hash**: só igualdade.\n- Índice **composto**: a ordem das colunas importa (prefixo à esquerda).\n- Índice **de cobertura**: contém todas as colunas da consulta — evita ir à tabela.\n- Custo: cada índice torna INSERT/UPDATE/DELETE mais lentos e ocupa espaço — indexar é trade-off, não hábito.\n\n' +
          '## Plano de execução\n' +
          '`EXPLAIN` mostra como o otimizador (baseado em CUSTO e estatísticas) resolverá a consulta — full scan × index scan/seek. Estatísticas desatualizadas geram planos ruins.\n\n' +
          '## Técnicas de escala\n' +
          '- **Particionamento** (horizontal: linhas por faixa/hash; vertical: colunas) — poda de partições nas consultas.\n' +
          '- **Sharding**: particionamento horizontal ENTRE servidores (chave de shard).\n' +
          '- **Réplicas de leitura**: distribuem SELECTs; escrita continua no primário.\n' +
          '- **Cache** (ex.: Redis/aplicação): reduz idas ao banco; atenção à invalidação.\n' +
          '- **Connection pooling**: reusa conexões (abrir conexão é caro).'
      },
      {
        kind: 'CONCEITO',
        title: 'Full table scan',
        body: 'Leitura sequencial da tabela inteira. Não é sempre ruim: para tabelas pequenas ou consultas que retornam grande fração das linhas, o otimizador PREFERE o scan ao índice.'
      },
      {
        kind: 'DICA',
        body: 'Função aplicada sobre a coluna no WHERE (ex.: `UPPER(nome) = ...`) tende a INUTILIZAR o índice da coluna — a não ser que exista índice funcional. Clássico de prova para justificar consulta lenta.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Quanto mais índices, melhor o desempenho geral do banco" — **ERRADO**: índices aceleram leituras específicas, mas penalizam TODA escrita e consomem espaço. Excesso de índices degrada o sistema.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'B-tree faixa · hash igualdade' },
      { kind: 'PALAVRA_CHAVE', title: 'sharding · réplica de leitura · EXPLAIN' }
    ]
  },

  // ═══════════════ ARQUITETURA TECNOLÓGICA ═══════════════
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Metodologias ágeis',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Manifesto Ágil, Scrum, Kanban e XP',
        body:
          '# Metodologias ágeis\n\n' +
          '## Manifesto Ágil (2001) — 4 valores\n' +
          'Indivíduos e interações **>** processos e ferramentas · Software funcionando **>** documentação abrangente · Colaboração com o cliente **>** negociação de contratos · Responder a mudanças **>** seguir um plano.\n(Os itens à direita TÊM valor; os da esquerda valem MAIS.)\n\n' +
          '## Scrum\n' +
          '- **Papéis**: Product Owner (maximiza valor, dono do Product Backlog), Scrum Master (remove impedimentos, guardião do processo), Developers. \n' +
          '- **Eventos**: Sprint (≤ 1 mês, duração fixa), Sprint Planning, Daily (15 min), Sprint Review (inspeção do incremento), Sprint Retrospective (inspeção do processo).\n' +
          '- **Artefatos**: Product Backlog, Sprint Backlog, Incremento (+ compromissos: Meta do Produto, Meta da Sprint, Definition of Done).\n\n' +
          '## Kanban\n' +
          'Fluxo CONTÍNUO (sem sprints): visualizar o trabalho, **limitar o WIP** (work in progress), gerir o fluxo (lead time/cycle time).\n\n' +
          '## XP (Extreme Programming)\n' +
          'Práticas de engenharia: programação em par, TDD, integração contínua, refatoração, releases curtos, propriedade coletiva do código.'
      },
      {
        kind: 'CONCEITO',
        title: 'Cascata × ágil × iterativo-incremental',
        body: 'Cascata: fases sequenciais, requisitos congelados cedo — mudanças custam caro. Iterativo-incremental (base do ágil e do RUP): entrega em ciclos, feedback constante. Ágil = iterativo + valores/princípios do Manifesto.'
      },
      {
        kind: 'DICA',
        body: 'FGV cobra papéis do Scrum trocados: quem PRIORIZA o Product Backlog é o **Product Owner** (não o Scrum Master); o Scrum Master NÃO é "gerente do projeto" — é líder-servidor do processo.'
      },
      {
        kind: 'PEGADINHA',
        body: '"No Kanban, o trabalho é organizado em sprints com escopo fixo" — **ERRADO**: sprint é Scrum. Kanban é fluxo contínuo com limite de WIP. Também clássico: "o Manifesto Ágil rejeita documentação" — **ERRADO**: apenas valoriza MAIS o software funcionando.'
      },
      { kind: 'PALAVRA_CHAVE', title: '4 valores · PO prioriza · SM facilita' },
      { kind: 'PALAVRA_CHAVE', title: 'Kanban = WIP limitado, fluxo contínuo' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'SOLID',
    entries: [
      {
        kind: 'RESUMO',
        title: 'SOLID — os 5 princípios com exemplos de prova',
        body:
          '# SOLID\n\n' +
          '| Letra | Princípio | Enunciado prático |\n| --- | --- | --- |\n' +
          '| **S** | Single Responsibility | classe com UMA razão para mudar |\n' +
          '| **O** | Open/Closed | **aberta para extensão, fechada para modificação** (estender sem alterar o código existente) |\n' +
          '| **L** | Liskov Substitution | subtipo substitui o tipo-base sem quebrar o cliente |\n' +
          '| **I** | Interface Segregation | várias interfaces específicas > uma interface "gorda" |\n' +
          '| **D** | Dependency Inversion | dependa de **abstrações**, não de implementações concretas |\n\n' +
          '## Sinais para reconhecer na questão\n' +
          '- "classe faz log, valida e persiste" → viola **S**.\n' +
          '- "novo tipo exigiu editar um switch/if gigante" → viola **O** (resolver com polimorfismo/Strategy).\n' +
          '- "subclasse lança exceção em método herdado que não suporta" → viola **L** (ex. clássico: Quadrado herdando de Retângulo).\n' +
          '- "cliente forçado a implementar métodos que não usa" → viola **I**.\n' +
          '- "classe de alto nível instancia a concreta com new" → viola **D** (resolver com injeção de dependência).'
      },
      {
        kind: 'CONCEITO',
        title: 'Inversão de dependência × injeção de dependência',
        body: 'DIP (princípio): módulos de alto e baixo nível devem depender de abstrações. Injeção de dependência (técnica): entregar as dependências prontas (construtor/setter/container, ex.: Spring) — é um MEIO de cumprir o DIP.'
      },
      {
        kind: 'DICA',
        body: 'A FGV descreve um cenário e pede o princípio violado/aplicado. Decore os GATILHOS (uma razão para mudar; aberto/fechado; substituição; interfaces enxutas; abstrações) — não as definições formais.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Confundir OCP com LSP: "estender sem modificar" é **O**pen/Closed; "substituir o pai sem quebrar" é **L**iskov. Enunciados misturam os dois de propósito.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'S uma razão · O estende sem alterar · L substitui' },
      { kind: 'PALAVRA_CHAVE', title: 'D: abstrações, não concretos' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'GRASP',
    entries: [
      {
        kind: 'RESUMO',
        title: 'GRASP — padrões de atribuição de responsabilidades',
        body:
          '# GRASP (General Responsibility Assignment Software Patterns)\n\n' +
          'Nove padrões de Craig Larman para decidir **quem faz o quê** no projeto OO:\n\n' +
          '| Padrão | Responsabilidade |\n| --- | --- |\n' +
          '| **Information Expert** | atribua à classe que TEM a informação necessária |\n' +
          '| **Creator** | B cria A se B contém/agrega/usa intimamente A |\n' +
          '| **Controller** | primeiro objeto após a UI que coordena a operação do sistema |\n' +
          '| **Low Coupling** | minimize dependências entre classes |\n' +
          '| **High Cohesion** | mantenha responsabilidades focadas e relacionadas |\n' +
          '| **Polymorphism** | variações de comportamento por tipo → polimorfismo, não if/switch |\n' +
          '| **Pure Fabrication** | classe artificial para preservar coesão/acoplamento (ex.: Repository) |\n' +
          '| **Indirection** | intermediário para desacoplar (ex.: adaptador) |\n' +
          '| **Protected Variations** | isole pontos de variação atrás de interfaces estáveis |'
      },
      {
        kind: 'DICA',
        body: 'Par inseparável: **baixo acoplamento + alta coesão** — toda alternativa que proponha "alto acoplamento" ou "baixa coesão" como objetivo está errada.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Confundir Information Expert com Creator: Expert responde "quem CALCULA/CONHECE" (quem tem os dados); Creator responde "quem INSTANCIA" (quem contém/agrega o objeto criado).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Expert · Creator · Controller' },
      { kind: 'PALAVRA_CHAVE', title: 'baixo acoplamento · alta coesão' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Padrões de projeto',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Padrões GoF — categorias e os mais cobrados',
        body:
          '# Padrões de projeto (GoF)\n\n' +
          '23 padrões em 3 categorias:\n\n' +
          '## Criacionais (como instanciar)\n' +
          '- **Singleton**: instância única com acesso global.\n- **Factory Method**: subclasses decidem qual classe instanciar.\n- **Abstract Factory**: famílias de objetos relacionados.\n- **Builder**: construção passo a passo de objetos complexos.\n- **Prototype**: criar por clonagem.\n\n' +
          '## Estruturais (como compor)\n' +
          '- **Adapter**: converte uma interface na esperada pelo cliente.\n- **Facade**: interface simples para um subsistema complexo.\n- **Decorator**: adiciona responsabilidades DINAMICAMENTE sem herança.\n- **Proxy**: substituto que controla o acesso.\n- **Composite**: árvore todo-parte tratada uniformemente.\n- **Bridge**: separa abstração de implementação.\n\n' +
          '## Comportamentais (como interagir)\n' +
          '- **Observer**: notifica dependentes quando o estado muda (publish/subscribe).\n- **Strategy**: família de algoritmos intercambiáveis.\n- **Template Method**: esqueleto do algoritmo com passos redefiníveis.\n- **Command**: encapsula requisição como objeto (undo, filas).\n- **State**: comportamento muda com o estado interno.\n- **Chain of Responsibility**: cadeia de tratadores.\n- **Iterator, Mediator, Memento, Visitor, Interpreter**.'
      },
      {
        kind: 'DICA',
        body: 'A FGV dá o CENÁRIO e pede o padrão. Gatilhos: "instância única" → Singleton; "interface incompatível" → Adapter; "notificar interessados" → Observer; "trocar algoritmo em runtime" → Strategy; "simplificar subsistema" → Facade; "adicionar função sem herança" → Decorator.'
      },
      {
        kind: 'PEGADINHA',
        body: 'Adapter × Facade: os dois "envolvem" código existente, mas Adapter CONVERTE uma interface para outra esperada; Facade SIMPLIFICA um subsistema (sem conversão de contrato). Strategy × State: Strategy é escolhido pelo cliente; State muda sozinho conforme o estado interno.'
      },
      { kind: 'OBSERVACAO', body: 'Categorias: criacionais (5), estruturais (7), comportamentais (11). Decorar a classificação dos principais — a banca pergunta "é padrão estrutural?" com frequência.' },
      { kind: 'PALAVRA_CHAVE', title: 'criacional × estrutural × comportamental' },
      { kind: 'PALAVRA_CHAVE', title: 'Singleton · Adapter · Observer · Strategy' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'TDD',
    entries: [
      {
        kind: 'RESUMO',
        title: 'TDD e BDD — ciclo e diferenças',
        body:
          '# TDD (Test-Driven Development)\n\n' +
          '## Ciclo Red-Green-Refactor\n' +
          '1. **Red**: escreva um teste que FALHA (o teste vem ANTES do código).\n' +
          '2. **Green**: escreva o MÍNIMO de código para passar.\n' +
          '3. **Refactor**: melhore o design mantendo os testes verdes.\n\n' +
          'Benefícios: design guiado pelo uso, rede de segurança para refatorar, documentação executável.\n\n' +
          '## BDD (Behavior-Driven Development)\n' +
          'Evolução do TDD focada em COMPORTAMENTO de negócio, com linguagem ubíqua legível por não técnicos — formato **Given/When/Then** (Dado/Quando/Então), ferramentas como Cucumber/Gherkin. Aproxima negócio, QA e desenvolvimento.'
      },
      {
        kind: 'CONCEITO',
        title: 'Pirâmide de testes',
        body: 'Base larga de testes de UNIDADE (rápidos, baratos), camada média de INTEGRAÇÃO, topo estreito de testes de INTERFACE/E2E (lentos, frágeis). Inverter a pirâmide (muitos E2E) é antipadrão.'
      },
      {
        kind: 'PEGADINHA',
        body: '"No TDD, os testes são escritos após a implementação para validá-la" — **ERRADO**: a essência do TDD é o teste ANTES do código (test-first). Escrever teste depois é apenas teste tradicional.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Red → Green → Refactor' },
      { kind: 'PALAVRA_CHAVE', title: 'BDD: Given/When/Then' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'UML: visão geral, modelos e diagramas',
    entries: [
      {
        kind: 'RESUMO',
        title: 'UML 2 — diagramas estruturais × comportamentais',
        body:
          '# UML 2.x\n\n' +
          'Linguagem de MODELAGEM (não é método nem processo). 14 diagramas em dois grupos:\n\n' +
          '## Estruturais (estáticos)\n' +
          '**Classes** (o mais cobrado), Objetos, Componentes, Implantação (deployment — hardware/nós), Pacotes, Estrutura Composta, Perfil.\n\n' +
          '## Comportamentais (dinâmicos)\n' +
          '**Casos de Uso** (atores + funcionalidades), Atividades (fluxo, com partições/raias), Máquina de Estados, e os de INTERAÇÃO: **Sequência** (troca de mensagens no TEMPO), Comunicação, Tempo, Visão Geral de Interação.\n\n' +
          '## Relacionamentos no diagrama de classes\n' +
          '- **Associação** (linha) · **Agregação** (losango VAZIO — todo-parte fraco, partes sobrevivem) · **Composição** (losango CHEIO — todo-parte forte, partes morrem com o todo).\n' +
          '- **Generalização/herança** (seta de triângulo vazio) · **Realização** de interface (triângulo + linha tracejada) · **Dependência** (seta tracejada).\n\n' +
          '## Casos de uso\n' +
          '- **include**: comportamento SEMPRE incluído (obrigatório).\n- **extend**: comportamento OPCIONAL/condicional que estende o caso base.'
      },
      {
        kind: 'DICA',
        body: 'Sequência × Comunicação: os dois mostram interação; SEQUÊNCIA enfatiza a ORDEM TEMPORAL (linhas de vida verticais); COMUNICAÇÃO enfatiza os VÍNCULOS entre objetos (mensagens numeradas).'
      },
      {
        kind: 'PEGADINHA',
        body: 'Losango: agregação (vazio) × composição (cheio) — a FGV troca os dois. E include × extend: include = sempre; extend = opcional. "O diagrama de implantação mostra classes" — ERRADO: mostra NÓS físicos e artefatos.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'estrutural × comportamental · 14 diagramas' },
      { kind: 'PALAVRA_CHAVE', title: 'composição losango cheio · include sempre/extend opcional' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Interoperabilidade de sistemas e padrões de integração',
    entries: [
      {
        kind: 'RESUMO',
        title: 'REST, Web Services SOAP, APIs e Gateway',
        body:
          '# Integração e interoperabilidade\n\n' +
          '## REST (Representational State Transfer)\n' +
          'Estilo ARQUITETURAL (não é protocolo) sobre HTTP. Restrições: cliente-servidor, **stateless** (cada requisição é autossuficiente), cache, interface uniforme, sistema em camadas.\n' +
          '- Recursos identificados por **URI**; representações (JSON, XML).\n' +
          '- Verbos: **GET** (ler, seguro e idempotente), **POST** (criar, NÃO idempotente), **PUT** (substituir, idempotente), **PATCH** (parcial), **DELETE** (idempotente).\n' +
          '- Códigos HTTP: 200 OK, **201 Created** (POST), 204 No Content, 400 Bad Request, **401 Unauthenticated × 403 Forbidden**, 404 Not Found, 500 Internal Error.\n\n' +
          '## SOAP × REST\n' +
          '| | SOAP | REST |\n| --- | --- | --- |\n' +
          '| Natureza | protocolo (envelope XML) | estilo arquitetural |\n' +
          '| Contrato | **WSDL** | OpenAPI/Swagger (convenção) |\n' +
          '| Formato | só XML | JSON, XML, qualquer mídia |\n' +
          '| Transporte | HTTP, SMTP… | HTTP |\n\n' +
          '(UDDI era o registro de descoberta da tríade SOAP/WSDL/UDDI.)\n\n' +
          '## Gateway de APIs\n' +
          'Ponto único de entrada para APIs: roteamento, autenticação/autorização, **rate limiting**, transformação, agregação, observabilidade. Essencial em microsserviços.\n\n' +
          '## XML × JSON\n' +
          'XML: tags, atributos, validável por XSD, verboso. JSON: pares chave-valor e arrays, leve, nativo em JavaScript — padrão de APIs REST.'
      },
      {
        kind: 'CONCEITO',
        title: 'Idempotência',
        body: 'Operação idempotente produz o mesmo efeito executada 1 ou N vezes. GET, PUT e DELETE são idempotentes; POST não é (cada chamada pode criar novo recurso). Distinção favorita da FGV.'
      },
      {
        kind: 'CONCEITO',
        title: 'Stateless',
        body: 'O servidor NÃO guarda estado de sessão entre requisições; cada requisição carrega tudo o que é preciso (ex.: token). Facilita escala horizontal — qualquer instância atende qualquer requisição.'
      },
      {
        kind: 'DICA',
        body: '401 × 403: **401** = não autenticado (quem é você?); **403** = autenticado, mas SEM permissão (você não pode). PUT × PATCH: PUT substitui o recurso inteiro; PATCH altera parcialmente.'
      },
      {
        kind: 'PEGADINHA',
        body: '"REST é um protocolo baseado em XML" — **ERRADO** duas vezes: REST é ESTILO ARQUITETURAL e o formato usual é JSON (mas aceita qualquer representação). Protocolo com envelope XML é o SOAP.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'REST stateless · verbos · 201/401/403' },
      { kind: 'PALAVRA_CHAVE', title: 'SOAP/WSDL × REST/OpenAPI' },
      { kind: 'PALAVRA_CHAVE', title: 'gateway: entrada única + rate limit' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Gestão de Configuração',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Controle de versão, mudança e integração contínua',
        body:
          '# Gestão de Configuração de Software\n\n' +
          'Disciplina que controla a EVOLUÇÃO dos artefatos: identificação dos itens de configuração, controle de versões, controle de mudanças (solicitação → avaliação → aprovação — CCB), auditoria e relato de status; **baseline** = configuração formalmente aprovada que serve de referência.\n\n' +
          '## Controle de versão (Git)\n' +
          '- Distribuído: cada clone tem o histórico completo.\n- Fluxo: `commit` (local) → `push` (remoto) → `pull` (buscar+mesclar).\n- **Branch** para trabalho paralelo; **merge** (une históricos, pode gerar commit de merge) × **rebase** (reaplica commits, histórico linear).\n\n' +
          '## Integração contínua (CI)\n' +
          'Integrar o código com FREQUÊNCIA (idealmente diária), com build e testes AUTOMATIZADOS a cada commit — detecta conflitos e regressões cedo.\n\n' +
          '## CI × CD × CD\n' +
          '- **Continuous Integration**: integrar + build + testes automáticos.\n' +
          '- **Continuous Delivery**: artefato SEMPRE pronto para produção (implantação com aprovação manual).\n' +
          '- **Continuous Deployment**: implantação em produção AUTOMÁTICA a cada mudança aprovada no pipeline.'
      },
      {
        kind: 'CONCEITO',
        title: 'Item de configuração e baseline',
        body: 'Item de configuração: qualquer artefato sob controle (código, docs, scripts, infra). Baseline: fotografia aprovada de um conjunto de itens em um momento — mudanças a partir dela passam pelo controle formal de mudanças.'
      },
      {
        kind: 'DICA',
        body: 'Delivery × Deployment é A pegadinha: se existe GATE MANUAL antes de produção, é DELIVERY; se vai sozinho até produção, é DEPLOYMENT.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Na integração contínua, a integração dos códigos é feita ao final do projeto" — **ERRADO**: o ponto da CI é integrar CONTINUAMENTE (várias vezes ao dia), não em big-bang no final.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'baseline · CCB · item de configuração' },
      { kind: 'PALAVRA_CHAVE', title: 'CI integra · Delivery gate manual · Deployment automático' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'DevSecOps',
    entries: [
      {
        kind: 'RESUMO',
        title: 'DevSecOps — segurança contínua no pipeline',
        body:
          '# DevSecOps\n\n' +
          'Extensão do DevOps que integra SEGURANÇA a todo o ciclo (**shift-left security**: testar segurança o mais CEDO possível, não só antes do deploy).\n\n' +
          '## Práticas no pipeline\n' +
          '- **SAST** (análise ESTÁTICA do código-fonte, sem executar — cedo no pipeline).\n' +
          '- **DAST** (análise DINÂMICA da aplicação em execução — caixa preta).\n' +
          '- **SCA** (Software Composition Analysis: vulnerabilidades em DEPENDÊNCIAS/bibliotecas de terceiros).\n' +
          '- **Escaneamento de imagens de contêiner** (ex.: Red Hat Clair, Trivy) e de segredos no repositório.\n' +
          '- Políticas como código, gestão de segredos (vault), monitoramento contínuo em produção.\n\n' +
          'Cultura: segurança é responsabilidade de TODOS (dev, sec e ops), automatizada e contínua — não um portão manual no fim.'
      },
      {
        kind: 'CONCEITO',
        title: 'Shift-left',
        body: 'Deslocar atividades (testes, segurança) para as fases INICIAIS do ciclo: quanto mais cedo o defeito/vulnerabilidade é achado, menor o custo de correção.'
      },
      {
        kind: 'PEGADINHA',
        body: 'SAST × DAST: estática = código-fonte SEM executar; dinâmica = aplicação RODANDO. "DAST analisa o código-fonte" está errado — quem faz isso é o SAST.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'shift-left · SAST × DAST × SCA' }
    ]
  },

  // ═══════════════ COMPUTAÇÃO EM NUVEM E VIRTUALIZAÇÃO ═══════════════
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Conceitos de computação em nuvem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Definição NIST, modelos de serviço e de implantação',
        body:
          '# Computação em nuvem (NIST SP 800-145)\n\n' +
          '## 5 características essenciais\n' +
          '1. **Autoatendimento sob demanda** (self-service)\n2. **Amplo acesso pela rede**\n3. **Pool de recursos** (multi-tenant)\n4. **Elasticidade rápida**\n5. **Serviço medido** (pay-per-use)\n\n' +
          '## Modelos de serviço — o que o CLIENTE gerencia\n' +
          '| Modelo | Provedor entrega | Cliente gerencia | Exemplos |\n| --- | --- | --- | --- |\n' +
          '| **IaaS** | infraestrutura (VMs, rede, storage) | SO para cima | EC2, Azure VMs |\n' +
          '| **PaaS** | plataforma (runtime, middleware) | apenas aplicação e dados | App Service, Heroku |\n' +
          '| **SaaS** | aplicação pronta | nada (só usa/configura) | Microsoft 365, Gmail |\n\n' +
          '## Modelos de implantação\n' +
          '- **Pública**: recursos do provedor, compartilhados entre clientes.\n' +
          '- **Privada**: infraestrutura EXCLUSIVA de uma organização (própria ou hospedada).\n' +
          '- **Híbrida**: combina os dois com portabilidade entre eles (ex.: cloud bursting).\n' +
          '- (Comunitária: compartilhada por organizações com interesses comuns.)'
      },
      {
        kind: 'CONCEITO',
        title: 'Responsabilidade compartilhada',
        body: 'O provedor responde pela segurança DA nuvem (física, hardware, hipervisor); o cliente pela segurança NA nuvem (dados, identidades, configuração). A fronteira sobe conforme IaaS → PaaS → SaaS.'
      },
      {
        kind: 'DICA',
        body: 'Questão típica: "empresa quer apenas usar o software sem administrar nada" → SaaS; "quer implantar app sem gerenciar servidores/runtime" → PaaS; "quer controle do SO" → IaaS.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Na nuvem privada, a infraestrutura é necessariamente operada dentro da empresa" — **ERRADO**: privada = uso EXCLUSIVO de uma organização; pode ser hospedada e operada por terceiros, fora das instalações.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'NIST: 5 características · 3 serviços · 4 implantações' },
      { kind: 'PALAVRA_CHAVE', title: 'IaaS SO↑ · PaaS app · SaaS usa' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Benefícios da computação em nuvem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'HA, escalabilidade, elasticidade, agilidade e DR',
        body:
          '# Benefícios da nuvem — as distinções que caem\n\n' +
          '- **Alta disponibilidade (HA)**: serviço continua operando apesar de falhas (redundância em zonas/regiões; SLA em "noves" — 99,9%, 99,99%).\n' +
          '- **Escalabilidade**: CAPACIDADE de crescer (vertical: máquina maior; horizontal: mais instâncias) — pode ser manual e planejada.\n' +
          '- **Elasticidade**: escala AUTOMÁTICA e nos DOIS sentidos conforme a demanda (auto scaling) — cresce no pico e ENCOLHE na baixa, pagando só o necessário.\n' +
          '- **Agilidade**: provisionar recursos em MINUTOS (vs. semanas para comprar hardware).\n' +
          '- **Recuperação de desastres (DR)**: replicação entre regiões; estratégias em ordem crescente de custo/velocidade: backup & restore → pilot light → warm standby → multi-site ativo-ativo. Métricas: RTO (tempo) e RPO (dados).'
      },
      {
        kind: 'DICA',
        body: 'Elasticidade = escalabilidade + AUTOMAÇÃO + bidirecionalidade. Se a questão fala em "reduzir recursos automaticamente na queda de demanda", a resposta é ELASTICIDADE, não escalabilidade.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Escalabilidade e elasticidade são sinônimos" — **ERRADO**: escalabilidade é a capacidade de crescer; elasticidade é o ajuste AUTOMÁTICO (para cima E para baixo) conforme a demanda.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'elasticidade = auto scaling bidirecional' },
      { kind: 'PALAVRA_CHAVE', title: 'DR: RTO × RPO' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Componentes centrais da arquitetura em nuvem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Regiões, zonas de disponibilidade e hierarquia de gestão',
        body:
          '# Componentes centrais\n\n' +
          '- **Região**: área GEOGRÁFICA com um conjunto de datacenters (ex.: Brazil South). Escolha por latência, conformidade/soberania de dados e custo.\n' +
          '- **Zona de disponibilidade (AZ)**: um ou mais datacenters FISICAMENTE ISOLADOS dentro da região (energia, refrigeração e rede independentes). Distribuir instâncias entre AZs → alta disponibilidade INTRA-região; DR completo pede MULTI-região.\n' +
          '- **Hierarquia de governança** (modelo Azure, citado pelo edital): **Grupos de gestão** → **Subscrições** (unidade de cobrança e limite administrativo) → grupos de recursos → **Recursos**. Políticas e permissões HERDAM de cima para baixo.'
      },
      {
        kind: 'CONCEITO',
        title: 'Distribuição geográfica',
        body: 'Replicar workloads em várias regiões reduz latência para usuários distantes e protege contra desastre regional; dentro da região, as AZs protegem contra falha de datacenter individual.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Zonas de disponibilidade são regiões geográficas distintas" — **ERRADO**: AZs vivem DENTRO de uma região (datacenters isolados e interligados por rede de baixa latência); regiões é que são áreas geográficas separadas.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'região ⊃ AZs isoladas' },
      { kind: 'PALAVRA_CHAVE', title: 'grupo de gestão → subscrição → recurso' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Infrastructure as Code (IaC)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'IaC — infraestrutura declarativa e versionada',
        body:
          '# Infrastructure as Code\n\n' +
          'Definir infraestrutura em ARQUIVOS DE CÓDIGO versionados (Git), provisionados automaticamente — elimina configuração manual, garante ambientes REPRODUTÍVEIS e auditáveis.\n\n' +
          '## Abordagens\n' +
          '- **Declarativa**: descreve o estado DESEJADO; a ferramenta calcula como chegar lá (Terraform, CloudFormation, manifests do Kubernetes).\n' +
          '- **Imperativa**: descreve os PASSOS na ordem (scripts, CLI).\n\n' +
          '## Conceitos de prova\n' +
          '- **Idempotência**: aplicar o mesmo código N vezes gera o mesmo estado final.\n' +
          '- **Drift**: divergência entre o estado real e o declarado (alguém mudou manualmente).\n' +
          '- Ferramentas de GERENCIAMENTO DE CONFIGURAÇÃO (Ansible, Puppet, Chef) configuram o que existe; ferramentas de PROVISIONAMENTO (Terraform) criam os recursos — na prática se combinam.'
      },
      {
        kind: 'DICA',
        body: 'IaC conecta-se à AUTOMAÇÃO e ao DevOps: o mesmo pipeline que constrói a aplicação aplica a infraestrutura (GitOps: o repositório Git como fonte da verdade do ambiente).'
      },
      {
        kind: 'PEGADINHA',
        body: '"Na abordagem declarativa, o operador especifica a sequência exata de comandos" — **ERRADO**: sequência de comandos é a abordagem IMPERATIVA; a declarativa especifica o ESTADO desejado.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'declarativo estado × imperativo passos' },
      { kind: 'PALAVRA_CHAVE', title: 'idempotência · drift · GitOps' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Contêineres e virtualização: Docker, Harbor, Kubernetes e VMware',
    entries: [
      {
        kind: 'RESUMO',
        title: 'VM × contêiner, Docker, Kubernetes e o stack VMware',
        body:
          '# Virtualização e contêineres\n\n' +
          '## VM × contêiner\n' +
          '| | **Máquina virtual** | **Contêiner** |\n| --- | --- | --- |\n' +
          '| Virtualiza | HARDWARE (via hipervisor) | SISTEMA OPERACIONAL (kernel compartilhado) |\n' +
          '| SO próprio | sim (guest OS completo) | não (isolamento por namespaces/cgroups) |\n' +
          '| Peso/boot | GBs, minutos | MBs, segundos |\n' +
          '| Isolamento | mais forte | mais leve |\n\n' +
          'Hipervisor **tipo 1** (bare-metal: ESXi, Hyper-V, KVM) × **tipo 2** (sobre SO hospedeiro: VirtualBox, Workstation).\n\n' +
          '## Docker\n' +
          '**Imagem** (template imutável em camadas, definido no Dockerfile) → **contêiner** (instância em execução). **Registry** (Docker Hub, **Harbor**) armazena e distribui imagens.\n\n' +
          '## Kubernetes (K8s) — orquestrador\n' +
          '- **Pod**: menor unidade implantável (1+ contêineres que compartilham rede/volumes).\n' +
          '- **Deployment**: estado desejado de réplicas + atualizações contínuas (rolling update).\n' +
          '- **Service**: endereço estável e balanceamento para pods efêmeros.\n' +
          '- Control plane (API server, etcd, scheduler, controller manager) × nós de trabalho (kubelet, kube-proxy).\n' +
          '- Modelo DECLARATIVO: você declara o estado; os controladores reconciliam (self-healing, auto scaling).\n\n' +
          '## Harbor e Red Hat Clair\n' +
          '**Harbor**: registry privado open source (CNCF) com RBAC, replicação e assinatura; integra o **Clair**, que faz ANÁLISE ESTÁTICA DE VULNERABILIDADES nas camadas das imagens (bases CVE).\n\n' +
          '## VMware (nomes → funções)\n' +
          '| Produto | Função |\n| --- | --- |\n' +
          '| **vCenter Server** | gestão centralizada de hosts ESXi e VMs (vMotion, DRS, HA) |\n' +
          '| **NSX** | virtualização de REDE e microssegmentação |\n' +
          '| **vCloud Director** | nuvem multi-tenant sobre vSphere (provedores) |\n' +
          '| **vRealize Automation** | automação/provisionamento self-service |\n' +
          '| **vRealize Operations** | monitoramento de desempenho e capacidade |\n' +
          '| **vRealize Log Insight** | gestão e análise centralizada de LOGS |\n' +
          '| **vRealize Orchestrator** | orquestração de workflows |'
      },
      {
        kind: 'CONCEITO',
        title: 'Orquestração',
        body: 'Gerenciar o ciclo de vida de MUITOS contêineres em cluster: agendamento (em qual nó rodar), escala, recuperação de falhas, atualizações sem parada e descoberta de serviços — o papel do Kubernetes.'
      },
      {
        kind: 'DICA',
        body: 'Tabela VMware é decoreba de alto retorno: Automation = provisionar · Operations = monitorar · Log Insight = logs · Orchestrator = workflows · NSX = rede · vCenter = gerência do vSphere.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Contêineres virtualizam o hardware e incluem um SO convidado completo" — **ERRADO**: isso é VM. Contêiner compartilha o KERNEL do hospedeiro. E no K8s: a menor unidade implantável é o POD, não o contêiner.'
      },
      {
        kind: 'OBSERVACAO',
        body: 'Clair NÃO corrige nem bloqueia sozinho: ele DETECTA vulnerabilidades conhecidas (CVE) nas imagens; a política de bloqueio é do registry/pipeline (ex.: Harbor).'
      },
      { kind: 'PALAVRA_CHAVE', title: 'VM hipervisor × contêiner kernel' },
      { kind: 'PALAVRA_CHAVE', title: 'pod · deployment · service' },
      { kind: 'PALAVRA_CHAVE', title: 'Harbor registry · Clair CVE scanner' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Identidade, privacidade, conformidade e segurança na nuvem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'IAM, conformidade e segurança em ambientes de nuvem',
        body:
          '# Identidade e segurança na nuvem\n\n' +
          '## IAM (Identity and Access Management)\n' +
          '- Autenticação (quem é — MFA fortemente recomendado) × autorização (o que pode — papéis/RBAC).\n' +
          '- **Princípio do menor privilégio**: conceder apenas o necessário.\n' +
          '- Federação/SSO: SAML 2.0, OAuth 2.0 (autorização delegada) e OpenID Connect (autenticação sobre OAuth2).\n\n' +
          '## Privacidade e conformidade\n' +
          '- **LGPD**: atenção à localização/residência dos dados (escolha de região) e a transferências internacionais.\n' +
          '- Certificações do provedor: ISO 27001 (SGSI), SOC 2, PCI DSS.\n\n' +
          '## Segurança\n' +
          'Criptografia em trânsito (TLS) e em repouso; gestão de chaves (KMS); segmentação de rede (grupos de segurança); registro e auditoria de atividades; postura (CSPM) para achar má configuração — a PRINCIPAL causa de incidentes em nuvem.'
      },
      {
        kind: 'CONCEITO',
        title: 'RBAC',
        body: 'Role-Based Access Control: permissões são atribuídas a PAPÉIS e usuários herdam permissões ao receber papéis — administração escalável, alinhada ao menor privilégio.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Na nuvem pública, toda a segurança é responsabilidade do provedor" — **ERRADO**: o modelo é de RESPONSABILIDADE COMPARTILHADA — configuração, identidades e dados são do cliente.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'menor privilégio · RBAC · MFA' },
      { kind: 'PALAVRA_CHAVE', title: 'responsabilidade compartilhada' }
    ]
  },

  // ═══════════════ LINGUAGENS, FRAMEWORKS E VERSIONAMENTO ═══════════════
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Spring Boot',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Spring Boot — convenção sobre configuração no ecossistema Spring',
        body:
          '# Spring Boot\n\n' +
          'Camada de OPINIÃO sobre o Spring Framework que elimina configuração manual:\n' +
          '- **Autoconfiguração**: configura beans automaticamente conforme as dependências do classpath.\n' +
          '- **Starters**: dependências agregadas por caso de uso (`spring-boot-starter-web`, `-data-jpa`, `-test`).\n' +
          '- **Servidor embarcado** (Tomcat/Jetty/Undertow): o app roda como JAR executável — `java -jar` (não precisa implantar WAR em servidor externo).\n' +
          '- **Actuator**: endpoints de produção (health, metrics, info) — base de observabilidade.\n\n' +
          '## Fundamentos Spring que a prova cobra junto\n' +
          '- **Inversão de Controle (IoC)**: o CONTAINER cria e injeta os beans (injeção de dependência via construtor — preferida —, setter ou campo).\n' +
          '- Anotações: `@SpringBootApplication` (= `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`), `@RestController` (= `@Controller` + `@ResponseBody`), `@Service`, `@Repository`, `@Autowired`.\n' +
          '- Perfis (`@Profile`) e `application.properties/yml` para configuração por ambiente.'
      },
      {
        kind: 'CONCEITO',
        title: 'Spring × Spring Boot',
        body: 'Spring Framework fornece IoC/DI, MVC, transações; Spring Boot NÃO substitui o Spring — acelera seu uso com autoconfiguração, starters e servidor embarcado. "Boot elimina o Spring" é erro de prova.'
      },
      {
        kind: 'DICA',
        body: '`@RestController` devolve o objeto serializado (JSON) direto no corpo da resposta — dispensa `@ResponseBody` em cada método. Para APIs REST em Java, é o gatilho de resposta.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Aplicações Spring Boot exigem servidor de aplicação externo para executar" — **ERRADO**: o servidor (Tomcat) vem EMBARCADO; o JAR é autoexecutável. Empacotar WAR para servidor externo é opção, não exigência.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'autoconfiguração · starters · actuator' },
      { kind: 'PALAVRA_CHAVE', title: 'IoC/DI · @SpringBootApplication' }
    ]
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Spring Cloud',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Spring Cloud — padrões de microsserviços prontos',
        body:
          '# Spring Cloud\n\n' +
          'Conjunto de projetos para sistemas DISTRIBUÍDOS/microsserviços sobre Spring Boot, implementando padrões clássicos:\n\n' +
          '| Padrão | Projeto típico |\n| --- | --- |\n' +
          '| Configuração centralizada | Spring Cloud **Config** |\n' +
          '| Descoberta de serviços | **Eureka** (Netflix) / Consul |\n' +
          '| Gateway de APIs | Spring Cloud **Gateway** |\n' +
          '| Circuit breaker (resiliência) | Resilience4j (antes Hystrix) |\n' +
          '| Balanceamento cliente | Spring Cloud LoadBalancer |\n' +
          '| Mensageria abstrata | Spring Cloud **Stream** (binders Kafka/RabbitMQ) |\n\n' +
          '## Padrões de microsserviços que a FGV cobra pelo nome\n' +
          '- **Service discovery**: instâncias se registram; clientes localizam pelo nome lógico.\n' +
          '- **Circuit breaker**: após N falhas, ABRE o circuito e responde rápido/fallback — evita falha em cascata; semiaberto testa a recuperação.\n' +
          '- **Config centralizada**: um servidor de configuração para todos os serviços, versionado em Git.'
      },
      {
        kind: 'CONCEITO',
        title: 'Microsserviços × monólito',
        body: 'Microsserviços: serviços pequenos, independentes, com dados próprios, implantáveis separadamente — comunicação por APIs/mensageria; custo: complexidade operacional (rede, observabilidade, consistência eventual). Monólito: uma unidade de implantação.'
      },
      {
        kind: 'PEGADINHA',
        body: '"O circuit breaker aumenta o número de tentativas contra o serviço que está falhando" — **ERRADO**: ele CORTA as chamadas (circuito aberto) para proteger o sistema e dar tempo de recuperação; retry é outro padrão.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Eureka descoberta · Gateway · Config' },
      { kind: 'PALAVRA_CHAVE', title: 'circuit breaker: aberto = falha rápida' }
    ]
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Confluent Kafka',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Kafka — streaming distribuído: tópicos, partições e consumidores',
        body:
          '# Apache/Confluent Kafka\n\n' +
          'Plataforma DISTRIBUÍDA de STREAMING de eventos (publish/subscribe + armazenamento durável + processamento).\n\n' +
          '## Modelo\n' +
          '- **Tópico**: categoria de eventos, dividido em **partições** (unidade de paralelismo; ordem garantida SÓ DENTRO da partição).\n' +
          '- **Producer** publica (chave define a partição); **consumer** lê controlando seu **offset**.\n' +
          '- **Consumer group**: cada partição é consumida por APENAS UM consumidor do grupo (paralelismo); grupos diferentes recebem TODOS os eventos (broadcast entre grupos).\n' +
          '- **Broker**: servidor do cluster; partições têm RÉPLICAS (líder + seguidores) para tolerância a falhas.\n' +
          '- Retenção por TEMPO/TAMANHO: mensagens NÃO somem ao serem lidas (diferente de fila tradicional) — permitem REPROCESSAMENTO (replay).\n\n' +
          '## Confluent\n' +
          'Distribuição comercial do Kafka + ecossistema: Schema Registry (Avro/JSON Schema), Kafka Connect (integração com bancos/sistemas), ksqlDB (SQL sobre streams).\n\n' +
          '## Kafka × JMS (fila tradicional)\n' +
          'JMS: mensagem consumida é removida; modelo fila (1 consumidor) ou tópico (assinantes ativos). Kafka: LOG durável e reproduzível, offsets por consumidor, throughput muito maior — projetado para streaming e desacoplamento em escala.'
      },
      {
        kind: 'CONCEITO',
        title: 'Mensageria e desacoplamento',
        body: 'Comunicação ASSÍNCRONA via broker desacopla produtor de consumidor no tempo e na disponibilidade — base da integração entre microsserviços (event-driven architecture).'
      },
      {
        kind: 'DICA',
        body: 'Ordem no Kafka: garantida POR PARTIÇÃO, não por tópico. Se a questão exigir ordem total de um subconjunto (ex.: eventos de um cliente), a resposta é "mesma CHAVE → mesma partição".'
      },
      {
        kind: 'PEGADINHA',
        body: '"No Kafka, a mensagem é removida do tópico após consumida" — **ERRADO**: a retenção é por política (tempo/tamanho); consumidores apenas avançam seus OFFSETS — outros grupos (ou um replay) releem as mesmas mensagens.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'tópico → partições · offset · consumer group' },
      { kind: 'PALAVRA_CHAVE', title: 'log durável ≠ fila que apaga' }
    ]
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'Java EE',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Java EE / Jakarta EE — EJB, JPA e JMS',
        body:
          '# Java EE (Jakarta EE)\n\n' +
          'Especificações para aplicações CORPORATIVAS em Java, executadas em servidores de aplicação (WildFly, Payara, WebLogic).\n\n' +
          '## EJB (Enterprise JavaBeans)\n' +
          'Componentes de negócio gerenciados pelo container (transações e segurança DECLARATIVAS):\n' +
          '- **Stateless**: sem estado entre chamadas (pool — o mais comum).\n- **Stateful**: mantém estado da CONVERSA com o cliente.\n- **Singleton**: uma instância por aplicação.\n- Message-Driven Beans (**MDB**): consomem mensagens JMS assincronamente.\n\n' +
          '## JPA (Java Persistence API)\n' +
          'Especificação de **mapeamento objeto-relacional (ORM)** — implementações: Hibernate, EclipseLink.\n' +
          '- `@Entity`, `@Id`, `@OneToMany`/`@ManyToOne`…\n- **EntityManager** gerencia o ciclo de vida (estados: new/transient → managed → detached → removed).\n- **JPQL**: consultas sobre ENTIDADES (não sobre tabelas).\n- Lazy × eager loading: carregar sob demanda × antecipadamente.\n\n' +
          '## JMS (Java Message Service)\n' +
          'API padrão de MENSAGERIA:\n- **Queue (point-to-point)**: cada mensagem é consumida por UM único consumidor.\n- **Topic (publish/subscribe)**: todos os assinantes recebem.\n- Entrega síncrona (receive) ou assíncrona (MessageListener/MDB).'
      },
      {
        kind: 'CONCEITO',
        title: 'Especificação × implementação',
        body: 'JPA é ESPECIFICAÇÃO (contrato); Hibernate é IMPLEMENTAÇÃO. Mesmo padrão em toda a plataforma: JMS (spec) × ActiveMQ/Artemis (brokers). A banca cobra essa distinção.'
      },
      {
        kind: 'DICA',
        body: 'JMS queue × topic é o mesmo raciocínio de fila × pub/sub em qualquer mensageria: QUEUE = um consumidor por mensagem (balanceamento); TOPIC = todos os assinantes recebem (difusão).'
      },
      {
        kind: 'PEGADINHA',
        body: '"O Hibernate é a especificação e o JPA sua implementação" — **INVERTIDO**: JPA é a especificação; Hibernate a implementa. E "EJB stateless mantém o estado da sessão do cliente" — errado: quem mantém é o STATEFUL.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'EJB stateless/stateful · MDB' },
      { kind: 'PALAVRA_CHAVE', title: 'JPA spec × Hibernate impl · JPQL' },
      { kind: 'PALAVRA_CHAVE', title: 'JMS queue 1 consumidor × topic difusão' }
    ]
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'React.js',
    entries: [
      {
        kind: 'RESUMO',
        title: 'React — componentes, estado e Virtual DOM (+ HTML5/CSS3/JS de apoio)',
        body:
          '# React.js\n\n' +
          '- Biblioteca (não framework completo) para UIs baseadas em **COMPONENTES** reutilizáveis.\n' +
          '- **JSX**: sintaxe declarativa que mistura marcação e JavaScript.\n' +
          '- **Virtual DOM**: representação em memória; o React DIFERE o novo estado do anterior (reconciliação) e aplica só as mudanças mínimas no DOM real.\n' +
          '- **Props** (imutáveis, de pai para filho) × **state** (mutável, interno — `useState`).\n' +
          '- Fluxo de dados **UNIDIRECIONAL** (top-down).\n' +
          '- Hooks: `useState`, `useEffect` (efeitos colaterais/ciclo de vida em componentes de função).\n\n' +
          '## Apoio rápido — HTML5/CSS3/JS que a banca mistura\n' +
          '- HTML5: semântica (`header`, `nav`, `main`, `section`, `article`, `footer`), `localStorage`/`sessionStorage`, `canvas`, novos inputs.\n' +
          '- CSS3: seletores, especificidade, **flexbox** e **grid**, media queries (responsividade).\n' +
          '- JavaScript: `let/const` (escopo de bloco) × `var`; arrow functions; promises/`async-await`; `==` (coerção) × `===` (estrito).'
      },
      {
        kind: 'CONCEITO',
        title: 'Componente controlado',
        body: 'Elemento de formulário cujo valor é controlado pelo STATE do React (value + onChange) — o estado é a fonte única da verdade da UI.'
      },
      {
        kind: 'PEGADINHA',
        body: '"Props podem ser modificadas pelo componente filho" — **ERRADO**: props são SOMENTE LEITURA (imutáveis); quem muda dados é o dono do state, que desce novas props. E: React NÃO manipula o DOM real diretamente a cada mudança — usa o Virtual DOM.'
      },
      { kind: 'PALAVRA_CHAVE', title: 'Virtual DOM · reconciliação' },
      { kind: 'PALAVRA_CHAVE', title: 'props imutáveis × state interno' }
    ]
  },
  {
    disciplineSlug: 'linguagens-frameworks',
    topic: 'GitLab',
    entries: [
      {
        kind: 'RESUMO',
        title: 'GitLab — plataforma DevOps sobre o Git',
        body:
          '# GitLab\n\n' +
          'Plataforma DevOps completa sobre o **Git**: repositórios, revisão de código via **Merge Request** (equivale ao pull request do GitHub), issues/boards, registry de contêineres e **GitLab CI/CD**.\n\n' +
          '## GitLab CI/CD\n' +
          '- Pipeline definido em `.gitlab-ci.yml` NA RAIZ do repositório (pipeline as code, versionado).\n' +
          '- Estrutura: **stages** (fases sequenciais: build → test → deploy) contendo **jobs** (paralelos dentro do stage).\n' +
          '- **Runners**: agentes que EXECUTAM os jobs (compartilhados ou próprios).\n' +
          '- Recursos de prova: artefatos entre jobs, cache, variáveis protegidas, ambientes/review apps.\n\n' +
          '## Git essencial no contexto\n' +
          'clone → branch → commits → push → **Merge Request** (revisão + pipeline verde) → merge na principal. Estratégias: merge commit × squash × rebase (histórico linear).'
      },
      {
        kind: 'DICA',
        body: 'Nomenclatura é pegadinha barata: no GitLab é **Merge Request**; no GitHub, **Pull Request** — mesma função (propor + revisar + integrar mudanças).'
      },
      {
        kind: 'PEGADINHA',
        body: '"O arquivo de pipeline do GitLab CI é o Jenkinsfile" — **ERRADO**: é o `.gitlab-ci.yml`. Jenkinsfile é do Jenkins; a lógica (pipeline as code) é a mesma, o artefato muda.'
      },
      { kind: 'PALAVRA_CHAVE', title: '.gitlab-ci.yml · stages/jobs · runners' },
      { kind: 'PALAVRA_CHAVE', title: 'Merge Request = Pull Request' }
    ]
  }
]
