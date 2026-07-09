// Conhecimento inicial da ABGF 2026 — conteúdo técnico autoral de estudo,
// alinhado ao estilo FCC (conceito + aplicação). Apenas DADOS (M15).
import type { SeedTopicKnowledge } from '../types'

export const ABGF_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: 'economia-financas-garantias',
    topic: 'Seguro de Crédito à Exportação (SCE): cobertura de riscos comerciais, políticos e extraordinários; papel da ABGF',
    entries: [
      {
        kind: 'RESUMO',
        title: 'SCE, FGE e o papel da ABGF',
        body:
          '# Seguro de Crédito à Exportação e a ABGF\n\n' +
          'O **SCE** protege o exportador brasileiro (e o financiador da exportação) contra o **não recebimento** dos créditos concedidos ao comprador estrangeiro.\n\n' +
          '## Riscos cobertos\n' +
          '| Risco | Exemplos |\n| --- | --- |\n' +
          '| **Comercial** | inadimplência, insolvência do importador |\n' +
          '| **Político** | moratória, restrições cambiais, guerra, revolução |\n' +
          '| **Extraordinário** | eventos catastróficos que impeçam o pagamento |\n\n' +
          '## Estrutura\n' +
          '- **FGE — Fundo de Garantia à Exportação (Lei nº 9.818/1999)**: fundo público que lastreia o SCE concedido **em nome da União** — principal instrumento de apoio soberano às exportações.\n' +
          '- **ABGF**: empresa pública (Decreto nº 7.976/2013; autorização na Lei nº 12.712/2012) que **gere fundos garantidores e presta serviços** ligados ao SCE ao amparo do FGE.\n' +
          '- Foco típico: operações de **médio e longo prazo** e exportações de maior complexidade (bens de capital, serviços de engenharia, defesa).'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Base normativa do FGE',
        reference: 'Lei nº 9.818/1999',
        body: 'Cria o **Fundo de Garantia à Exportação (FGE)**, de natureza contábil, para dar cobertura às garantias prestadas pela União nas operações de SCE.'
      },
      {
        kind: 'LEGISLACAO',
        title: 'Autorização e criação da ABGF',
        reference: 'Lei nº 12.712/2012 · Decreto nº 7.976/2013',
        body: 'Autorizam a criação da **ABGF S.A.**, empresa pública federal, vinculada à administração indireta, para atuar com fundos garantidores e garantias.'
      },
      { kind: 'CONCEITO', title: 'Risco país', body: 'Percepção de risco de um Estado soberano não honrar (ou impedir que se honrem) compromissos externos — afeta o preço e o apetite da cobertura política.' },
      { kind: 'DICA', body: 'Grave o par: **SCE = seguro** (instrumento) e **FGE = fundo** (lastro soberano). A ABGF não "vende seguro privado": atua na gestão/execução ao amparo do FGE, em nome da União.' },
      { kind: 'PEGADINHA', body: '"O risco político cobre a inadimplência comercial do importador privado" — **ERRADO**: inadimplência do comprador é risco COMERCIAL; moratória/transferência cambial é risco POLÍTICO.' },
      { kind: 'PALAVRA_CHAVE', title: 'SCE · FGE · ABGF' },
      { kind: 'PALAVRA_CHAVE', title: 'risco comercial × político × extraordinário' }
    ]
  },
  {
    disciplineSlug: 'etica-governanca-compliance',
    topic: 'Controles internos: Framework COSO e COSO ERM; matriz de riscos; três linhas de defesa',
    entries: [
      {
        kind: 'RESUMO',
        title: 'COSO e as três linhas',
        body:
          '# Controles internos — COSO\n\n' +
          '## COSO ICIF (controle interno) — 5 componentes\n' +
          '1. **Ambiente de controle**\n2. **Avaliação de riscos**\n3. **Atividades de controle**\n4. **Informação e comunicação**\n5. **Monitoramento**\n\n' +
          '## COSO ERM\nEstende o modelo para **gestão de riscos corporativos** (estratégia + desempenho).\n\n' +
          '## Três linhas (IIA)\n' +
          '| Linha | Quem | Papel |\n| --- | --- | --- |\n' +
          '| 1ª | Gestão operacional | executa e controla os riscos do dia a dia |\n' +
          '| 2ª | Riscos/Compliance/Controles | apoia, monitora e desafia a 1ª |\n' +
          '| 3ª | **Auditoria interna** | avaliação **independente** e objetiva |'
      },
      { kind: 'CONCEITO', title: 'Matriz de riscos', body: 'Classifica riscos por **probabilidade × impacto**, priorizando resposta (evitar, mitigar, transferir, aceitar).' },
      { kind: 'DICA', body: 'Mnemônico dos 5 componentes do COSO: **A-A-A-I-M** (Ambiente, Avaliação, Atividades, Informação, Monitoramento).' },
      { kind: 'PEGADINHA', body: 'Colocar a **auditoria interna na 2ª linha** — ERRADO: auditoria interna é a **3ª linha** (independência funcional).' },
      { kind: 'PALAVRA_CHAVE', title: 'COSO · ERM · três linhas' }
    ]
  },
  {
    disciplineSlug: 'protecao-dados-seguranca',
    topic: 'LGPD (Lei nº 13.709/2018): princípios, bases legais, direitos dos titulares, agentes, incidentes, ANPD',
    entries: [
      {
        kind: 'RESUMO',
        title: 'LGPD em uma página',
        body:
          '# LGPD — Lei nº 13.709/2018\n\n' +
          '## Agentes de tratamento\n- **Controlador**: decide sobre o tratamento\n- **Operador**: trata em nome do controlador\n- **Encarregado (DPO)**: canal com titulares e ANPD\n\n' +
          '## 10 bases legais (art. 7º) — destaque\nConsentimento · obrigação legal · execução de contrato · **legítimo interesse** · proteção ao crédito · tutela da saúde · políticas públicas · estudos · exercício de direitos · proteção da vida.\n\n' +
          '## Direitos do titular (art. 18)\nConfirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento.\n\n' +
          '## Incidentes\nComunicação **à ANPD e ao titular** quando puder acarretar risco ou dano relevante (art. 48).'
      },
      { kind: 'CONCEITO', title: 'Dado pessoal sensível', body: 'Origem racial/étnica, convicção religiosa, opinião política, saúde, vida sexual, genético/biométrico — tratamento com hipóteses mais restritas (art. 11).' },
      { kind: 'DICA', body: 'A FCC cobra a **distinção controlador × operador** e as **bases legais** — o consentimento é só UMA das dez, não é obrigatório sempre.' },
      { kind: 'PEGADINHA', body: '"Todo tratamento exige consentimento do titular" — **ERRADO**: há 10 bases legais autônomas (ex.: obrigação legal, contrato, legítimo interesse).' },
      { kind: 'PALAVRA_CHAVE', title: 'controlador × operador · ANPD' },
      { kind: 'PALAVRA_CHAVE', title: '10 bases legais' }
    ]
  },
  {
    disciplineSlug: 'raciocinio-logico',
    topic: 'Lógica sentencial (proposicional)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Tabelas-verdade e equivalências que caem sempre',
        body:
          '# Lógica proposicional — kit FCC\n\n' +
          '## Condicional (p → q)\nSó é **falsa** quando `V → F`. Equivalências:\n- `p → q ≡ ~q → ~p` (contrapositiva)\n- `p → q ≡ ~p ∨ q`\n- **Negação**: `~(p → q) ≡ p ∧ ~q`\n\n' +
          '## Leis de De Morgan\n- `~(p ∧ q) ≡ ~p ∨ ~q`\n- `~(p ∨ q) ≡ ~p ∧ ~q`\n\n' +
          '## Negação de quantificadores\n- ~(Todo A é B) = **Algum A não é B**\n- ~(Algum A é B) = **Nenhum A é B**'
      },
      { kind: 'CONCEITO', title: 'Tautologia / contradição / contingência', body: 'Tautologia: sempre V. Contradição: sempre F. Contingência: depende dos valores.' },
      { kind: 'PEGADINHA', body: 'Negar "Se chove, então levo guarda-chuva" com outro "se... então" — **ERRADO**: a negação é conjunção: "Chove E não levo guarda-chuva".' },
      { kind: 'PALAVRA_CHAVE', title: 'p→q falsa só em V→F' },
      { kind: 'PALAVRA_CHAVE', title: 'De Morgan' }
    ]
  },
  {
    disciplineSlug: 'fundamentos-sistemas-redes',
    topic: 'Redes de Computadores',
    entries: [
      {
        kind: 'RESUMO',
        title: 'TCP/IP essencial',
        body:
          '# Redes — modelo TCP/IP\n\n' +
          '| Camada | Protocolos típicos |\n| --- | --- |\n' +
          '| Aplicação | DNS(53), HTTP(80)/HTTPS(443), SMTP(25), DHCP(67/68) |\n' +
          '| Transporte | **TCP** (orientado a conexão, confiável) · **UDP** (sem conexão, rápido) |\n' +
          '| Internet | IP (IPv4 32 bits · IPv6 128 bits), ICMP |\n' +
          '| Acesso | Ethernet, Wi-Fi |\n\n' +
          '## Pontos quentes\n- **IPv6**: 128 bits, hexadecimal, sem broadcast (usa multicast).\n- **VLAN** segmenta domínios de broadcast em camada 2; **VPN** cria túnel seguro sobre rede pública.\n- DNS usa **UDP/53** nas consultas comuns (TCP para transferência de zona).'
      },
      { kind: 'CONCEITO', title: 'TCP × UDP', body: 'TCP: three-way handshake, confiável, ordenado (HTTP, SMTP). UDP: sem garantias, baixa latência (DNS, streaming, DHCP).' },
      { kind: 'DICA', body: 'Decore portas: 53 DNS · 80/443 HTTP/HTTPS · 25 SMTP · 67/68 DHCP · 22 SSH — FCC adora trocá-las.' },
      { kind: 'PEGADINHA', body: '"IPv6 tem 64 bits" ou "usa broadcast" — **ERRADO**: 128 bits e substitui broadcast por multicast.' },
      { kind: 'PALAVRA_CHAVE', title: 'TCP/IP · portas · IPv4 32 / IPv6 128' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Conceitos de SGBD',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Relacional, normalização e ACID',
        body:
          '# SGBD — núcleo cobrado\n\n' +
          '## Formas normais\n- **1FN**: atributos atômicos (sem grupos repetitivos)\n- **2FN**: 1FN + sem dependência **parcial** da chave composta\n- **3FN**: 2FN + sem dependência **transitiva**\n\n' +
          '## Transações — ACID\n**A**tomicidade · **C**onsistência · **I**solamento · **D**urabilidade.\n\n' +
          '## NoSQL — tipos\n| Tipo | Exemplo | Caso de uso |\n| --- | --- | --- |\n| Chave-valor | Redis | cache/sessões |\n| Documento | MongoDB | dados semiestruturados |\n| Colunar | Cassandra | escrita massiva/analítico |\n| Grafo | Neo4j | relacionamentos complexos |'
      },
      { kind: 'CONCEITO', title: 'Controle de concorrência', body: 'Bloqueios (locks) e MVCC evitam anomalias entre transações simultâneas; níveis de isolamento controlam leituras sujas/fantasma.' },
      { kind: 'PEGADINHA', body: 'Associar 3FN a dependência parcial — **ERRADO**: parcial é a 2FN; a 3FN elimina a **transitiva**.' },
      { kind: 'PALAVRA_CHAVE', title: '1FN/2FN/3FN · ACID · NoSQL' }
    ]
  },
  {
    disciplineSlug: 'banco-de-dados',
    topic: 'Linguagem SQL (ANSI)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'SQL que a FCC cobra',
        body:
          '# SQL ANSI\n\n' +
          '## Grupos de comandos\n- **DDL**: CREATE, ALTER, DROP, TRUNCATE\n- **DML**: SELECT, INSERT, UPDATE, DELETE\n- **DCL**: GRANT, REVOKE · **TCL**: COMMIT, ROLLBACK\n\n' +
          '## Junções\nINNER (interseção) · LEFT/RIGHT (preserva um lado) · FULL (ambos) · CROSS (cartesiano)\n\n' +
          '## Regras de ouro\n- `WHERE` filtra **linhas antes** do agrupamento; `HAVING` filtra **grupos depois**.\n- Agregações: COUNT, SUM, AVG, MIN, MAX (ignoram NULL, exceto COUNT(*)).\n- **Índice** acelera consulta e onera escrita; **VIEW** é consulta nomeada.'
      },
      { kind: 'DICA', body: 'TRUNCATE é **DDL** (não dispara WHERE nem, em regra, triggers); DELETE é DML linha a linha — distinção clássica de prova.' },
      { kind: 'PEGADINHA', body: 'Usar HAVING sem GROUP BY como se fosse WHERE — o HAVING opera sobre **grupos/agregações**.' },
      { kind: 'PALAVRA_CHAVE', title: 'DDL/DML/DCL/TCL · JOINs · WHERE×HAVING' }
    ]
  },
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'Conceitos fundamentais: vulnerabilidades, ameaças e ataques; princípios CID',
    entries: [
      {
        kind: 'RESUMO',
        title: 'CID + taxonomia de ameaças',
        body:
          '# Segurança — fundamentos\n\n' +
          '## Princípios CID\n- **Confidencialidade**: só quem deve acessa\n- **Integridade**: sem alteração indevida\n- **Disponibilidade**: acessível quando necessário\n(+ autenticidade e não repúdio como complementares)\n\n' +
          '## Cadeia\n**Vulnerabilidade** (fraqueza) × **ameaça** (agente/evento) → **ataque** (exploração) → **incidente**.\n\n' +
          '## Malwares que caem\nvírus (precisa de hospedeiro) · **worm** (autorreplicante pela rede) · trojan (disfarçado) · **ransomware** (sequestra/cifra) · spyware/keylogger (espionagem) · rootkit (oculta acesso privilegiado).'
      },
      { kind: 'CONCEITO', title: 'DoS × DDoS × MitM', body: 'DoS: indisponibilidade a partir de uma origem; DDoS: origem distribuída (botnets); man-in-the-middle: interceptação/alteração da comunicação.' },
      { kind: 'PEGADINHA', body: 'Trocar worm por vírus: **worm se propaga sozinho pela rede**; vírus depende de arquivo hospedeiro executado.' },
      { kind: 'PALAVRA_CHAVE', title: 'CID · ransomware · phishing' }
    ]
  },
  {
    disciplineSlug: 'seguranca-cibernetica',
    topic: 'Criptografia',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Simétrica, assimétrica, hash e assinatura',
        body:
          '# Criptografia\n\n' +
          '| | Simétrica | Assimétrica |\n| --- | --- | --- |\n' +
          '| Chaves | 1 (compartilhada) | par pública/privada |\n' +
          '| Velocidade | rápida | lenta |\n' +
          '| Exemplos | AES, 3DES | RSA, ECC |\n' +
          '| Uso típico | cifrar dados | troca de chaves, assinatura |\n\n' +
          '## Hash\nUnidirecional, tamanho fixo, detecta alteração (SHA-256). **Não é criptografia reversível.**\n\n' +
          '## Assinatura digital\nCifra o hash com a **chave privada** do emissor → qualquer um verifica com a pública. Garante **integridade + autenticidade + não repúdio** (não garante confidencialidade).\n\n' +
          '## TLS\nHandshake assimétrico para acordar chave de sessão **simétrica**.'
      },
      { kind: 'DICA', body: 'Assinatura usa a **privada de quem assina**; sigilo usa a **pública de quem recebe** — inverter isso é a pegadinha nº 1.' },
      { kind: 'PEGADINHA', body: '"Hash é um tipo de criptografia que pode ser decifrada" — **ERRADO**: hash é função unidirecional.' },
      { kind: 'PALAVRA_CHAVE', title: 'AES × RSA · SHA-256 · ICP-Brasil' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Computação em Nuvem',
    entries: [
      {
        kind: 'RESUMO',
        title: 'IaaS × PaaS × SaaS e tipos de nuvem',
        body:
          '# Nuvem\n\n' +
          '| Modelo | Você gerencia | Exemplo |\n| --- | --- | --- |\n' +
          '| **IaaS** | SO para cima | VMs (EC2) |\n' +
          '| **PaaS** | só a aplicação | App Engine, Heroku |\n' +
          '| **SaaS** | nada (usa) | Gmail, M365 |\n\n' +
          '**Tipos**: pública (provedor), privada (exclusiva), **híbrida** (combinação).\n\n' +
          '**Elasticidade**: provisionar/desprovisionar recursos automaticamente conforme a demanda — característica essencial (NIST).'
      },
      { kind: 'CONCEITO', title: 'Responsabilidade compartilhada', body: 'Provedor cuida DA nuvem (físico/hipervisor); cliente cuida do que está NA nuvem (dados, identidade, configuração) — a fronteira varia por modelo.' },
      { kind: 'PEGADINHA', body: 'Dizer que no SaaS o cliente administra o SO — **ERRADO**: no SaaS o cliente apenas usa a aplicação.' },
      { kind: 'PALAVRA_CHAVE', title: 'IaaS/PaaS/SaaS · elasticidade · híbrida' }
    ]
  },
  {
    disciplineSlug: 'nuvem-infraestrutura',
    topic: 'Contêineres e orquestração: Docker; Kubernetes',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Docker e Kubernetes sem mistério',
        body:
          '# Contêineres\n\n' +
          '## Docker\n- Contêiner **compartilha o kernel** do host (≠ VM, que tem SO próprio) → leve e rápido.\n- **Imagem** (imutável, em camadas) → **contêiner** (instância em execução). Dockerfile descreve o build; registry (Docker Hub) distribui.\n\n' +
          '## Kubernetes (K8s)\n- **Pod**: menor unidade implantável (1+ contêineres)\n- **Deployment**: estado desejado + réplicas (self-healing, rolling update)\n- **Service**: endereço estável + balanceamento para pods\n- Arquitetura: **control plane** (API server, etcd, scheduler) × **worker nodes** (kubelet).'
      },
      { kind: 'CONCEITO', title: 'Contêiner × VM', body: 'VM virtualiza hardware com SO completo por instância (hipervisor); contêiner virtualiza no nível do SO, compartilhando kernel — isolamento por namespaces/cgroups.' },
      { kind: 'DICA', body: 'K8s = **orquestrador** (agenda, escala, cura); Docker = **runtime/empacotamento**. A FCC cobra essa divisão de papéis.' },
      { kind: 'PEGADINHA', body: '"Cada contêiner possui seu próprio kernel" — **ERRADO**: compartilham o kernel do host.' },
      { kind: 'PALAVRA_CHAVE', title: 'imagem × contêiner · Pod · Deployment · Service' }
    ]
  },
  {
    disciplineSlug: 'devops-cicd',
    topic: 'DevOps: conceitos, cultura e práticas; integração contínua (CI) e entrega contínua (CD)',
    entries: [
      {
        kind: 'RESUMO',
        title: 'CI/CD e cultura DevOps',
        body:
          '# DevOps\n\n' +
          'Cultura que aproxima **Dev + Ops**: automação, medição, compartilhamento, lotes pequenos e feedback rápido.\n\n' +
          '## Pipeline\n- **CI (integração contínua)**: integrar código com frequência + build e testes automatizados a cada commit.\n- **Continuous Delivery**: artefato **sempre pronto** para produção (implantação com aprovação manual).\n- **Continuous Deployment**: implantação em produção **automática** após o pipeline.\n\n' +
          '## Git\n`branch` (linha paralela) → `merge` (integra) · pull/merge request = revisão antes de integrar.'
      },
      { kind: 'CONCEITO', title: 'DevSecOps', body: 'Segurança integrada DESDE o início do pipeline ("shift-left"): SAST/DAST, análise de dependências, políticas como código.' },
      { kind: 'PEGADINHA', body: 'Confundir delivery com deployment: **Delivery** = pronto para implantar (gate manual); **Deployment** = implanta automaticamente.' },
      { kind: 'PALAVRA_CHAVE', title: 'CI · CD × CD · shift-left · Git' }
    ]
  },
  {
    disciplineSlug: 'gestao-ti',
    topic: 'ITIL v4: incidentes, problemas, mudanças, configuração e níveis de serviço; melhoria contínua',
    entries: [
      {
        kind: 'RESUMO',
        title: 'ITIL v4 — práticas que caem',
        body:
          '# ITIL v4\n\n' +
          '| Prática | Foco |\n| --- | --- |\n' +
          '| **Incidente** | restaurar o serviço **rápido** (interrupção/degradação) |\n' +
          '| **Problema** | atacar a **causa raiz** (erro conhecido, workaround) |\n' +
          '| **Mudança** | avaliar/autorizar alterações (padrão, normal, emergencial) |\n' +
          '| **Configuração** | manter o CMDB (itens de configuração e relações) |\n' +
          '| **Nível de serviço** | SLA/OLA — metas acordadas e monitoradas |\n\n' +
          'Melhoria contínua: ciclo permanente sobre serviços e práticas.'
      },
      { kind: 'CONCEITO', title: 'COBIT 2019 × ITIL', body: 'COBIT = **governança** de TI (o quê/por quê — objetivos e controles); ITIL = **gestão de serviços** (como operar). São complementares.' },
      { kind: 'PEGADINHA', body: 'Tratar incidente como problema: incidente **restaura o serviço**; problema **investiga a causa** — abrir problema não conserta o usuário parado.' },
      { kind: 'PALAVRA_CHAVE', title: 'incidente × problema · SLA · CMDB' }
    ]
  }
]
