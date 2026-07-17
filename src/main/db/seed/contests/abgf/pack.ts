// Pacote de enriquecimento do ABGF 2026 (FCC, E05 Analista TI) — M23.
// APENAS DADOS. Preenche as disciplinas de TI que estavam com 0% de cobertura
// de conhecimento (Engenharia de Software; Dados/ML/IA). Idempotente.
import type { SeedQuestion } from '../../questions'
import type { SeedRelation, SeedStarterDeck, SeedTopicKnowledge } from '../types'

const Q = 'Banco de estudo (estilo FCC)'

export const ABGF_PACK_KNOWLEDGE: SeedTopicKnowledge[] = [
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Pilares da OO + injeção de dependências',
        body:
          '# Orientação a Objetos — 4 pilares\n\n' +
          '| Pilar | Ideia |\n| --- | --- |\n' +
          '| **Abstração** | modelar o essencial do domínio, ocultando detalhes |\n' +
          '| **Encapsulamento** | esconder estado interno; acesso por interface pública |\n' +
          '| **Herança** | reutilizar/estender comportamento de uma superclasse |\n' +
          '| **Polimorfismo** | mesmo contrato, comportamentos distintos por tipo |\n\n' +
          '## Injeção de dependências (DI)\n' +
          'Técnica que **entrega** as dependências prontas ao objeto (construtor/setter/container) em vez de ele instanciá-las — concretiza o princípio de **Inversão de Dependência** (o "D" do SOLID): depender de **abstrações**, não de implementações.'
      },
      { kind: 'CONCEITO', title: 'Polimorfismo × sobrecarga', body: 'Polimorfismo (override): a subclasse redefine o método herdado. Sobrecarga (overload): mesmo nome, assinaturas diferentes na mesma classe.' },
      { kind: 'DICA', body: 'A FCC cobra a distinção herança (é-um) × composição (tem-um) e a preferência moderna pela composição. Encapsulamento ≠ herança.' },
      { kind: 'PEGADINHA', body: '"Injeção de dependência elimina o acoplamento" — impreciso: ela REDUZ e inverte o acoplamento (para abstrações), não o elimina.' },
      { kind: 'PALAVRA_CHAVE', title: 'abstração · encapsulamento · herança · polimorfismo' },
      { kind: 'PALAVRA_CHAVE', title: 'DI = Inversão de Dependência (SOLID)' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Desenvolvimento seguro — OWASP e cripto',
        body:
          '# Desenvolvimento seguro\n\n' +
          '## Autenticação × autorização\n' +
          '- **Autenticação**: provar QUEM é (senha, MFA, token).\n' +
          '- **Autorização**: definir O QUE pode (papéis/RBAC, escopos).\n' +
          '- **OAuth2** = autorização delegada; **OpenID Connect** = autenticação sobre o OAuth2; **JWT** = token assinado.\n\n' +
          '## OWASP Top 10 (destaques)\n' +
          'Broken Access Control, Injection (SQL/command), Cryptographic Failures, Security Misconfiguration, SSRF.\n\n' +
          '## Criptografia aplicada\n' +
          '- **Simétrica** (AES): uma chave; rápida; problema de distribuição da chave.\n' +
          '- **Assimétrica** (RSA/ECC): par público/privado; assinatura e troca de chave.\n' +
          '- **Hash** (SHA-256): via única; senhas com **salt** + função lenta (bcrypt/argon2).'
      },
      { kind: 'CONCEITO', title: 'Assinatura digital', body: 'Cifra-se o hash com a chave PRIVADA do emissor; verifica-se com a pública. Garante integridade, autenticidade e não repúdio.' },
      { kind: 'PEGADINHA', body: '"Hash serve para cifrar e depois decifrar dados" — ERRADO: hash é via ÚNICA (irreversível); cifra é a criptografia (reversível com a chave).' },
      { kind: 'PALAVRA_CHAVE', title: 'autenticação × autorização · OAuth2/OIDC/JWT' },
      { kind: 'PALAVRA_CHAVE', title: 'simétrica × assimétrica × hash' }
    ]
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Pirâmide de testes e tipos',
        body:
          '# Testes de software\n\n' +
          '## Pirâmide\n' +
          'Base larga de **unitários** (rápidos, isolam uma unidade), meio de **integração** (componentes juntos), topo estreito de **E2E/interface** (lentos, frágeis). Inverter a pirâmide é antipadrão.\n\n' +
          '## Caixa\n' +
          '- **Caixa-branca**: conhece o código (cobertura de linhas/ramos).\n' +
          '- **Caixa-preta**: só entradas/saídas (partição de equivalência, valor-limite).\n\n' +
          '## Não funcionais\n' +
          'Carga/desempenho (stress, spike), usabilidade e **acessibilidade** (WCAG).'
      },
      { kind: 'PEGADINHA', body: '"Teste unitário valida a integração entre módulos" — ERRADO: unitário isola UMA unidade; integração é que valida a interação entre módulos.' },
      { kind: 'DICA', body: 'Valor-limite e partição de equivalência são técnicas de CAIXA-PRETA — a FCC cobra a associação técnica ↔ tipo de caixa.' },
      { kind: 'PALAVRA_CHAVE', title: 'unitário < integração < E2E' },
      { kind: 'PALAVRA_CHAVE', title: 'caixa-branca × caixa-preta' }
    ]
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Noções de aprendizado de máquina',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Tipos de aprendizado e avaliação',
        body:
          '# Aprendizado de máquina\n\n' +
          '| Tipo | Dados | Tarefas |\n| --- | --- | --- |\n' +
          '| **Supervisionado** | rotulados | classificação, regressão |\n' +
          '| **Não supervisionado** | sem rótulo | agrupamento (clustering), redução de dimensionalidade |\n' +
          '| **Por reforço** | recompensa | agente aprende por tentativa/erro |\n\n' +
          '## Overfitting × underfitting\n' +
          '- **Overfitting**: decora o treino, generaliza mal (variância alta). Combate: mais dados, regularização, validação cruzada.\n' +
          '- **Underfitting**: modelo simples demais (viés alto).\n\n' +
          '## Métricas de classificação\n' +
          'Acurácia, **precisão** (dos previstos positivos, quantos acertou), **recall/revocação** (dos positivos reais, quantos achou), **F1** (harmônica de precisão e recall). Em classes desbalanceadas, acurácia engana → use F1.'
      },
      { kind: 'CONCEITO', title: 'Validação cruzada (k-fold)', body: 'Divide os dados em k partes, treina em k-1 e valida na restante, repetindo k vezes — estima a generalização e reduz dependência de uma única divisão treino/teste.' },
      { kind: 'PEGADINHA', body: '"Clustering é aprendizado supervisionado" — ERRADO: agrupamento é NÃO supervisionado (não há rótulo). Classificação é que é supervisionada.' },
      { kind: 'PEGADINHA', body: '"Alta acurácia sempre indica bom modelo" — ERRADO: em base desbalanceada, um modelo trivial tem acurácia alta e recall péssimo. Use precisão/recall/F1.' },
      { kind: 'PALAVRA_CHAVE', title: 'supervisionado × não supervisionado × reforço' },
      { kind: 'PALAVRA_CHAVE', title: 'precisão × recall × F1 · overfitting' }
    ]
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança',
    entries: [
      {
        kind: 'RESUMO',
        title: 'IA generativa, LLMs e riscos',
        body:
          '# IA generativa e LLMs\n\n' +
          '- **LLM**: modelo de linguagem (transformer) treinado para prever o próximo token; gera texto plausível.\n' +
          '- **Alucinação**: produzir conteúdo falso com aparência de verdadeiro — risco central em uso profissional.\n' +
          '- **Viés**: reproduz preconceitos dos dados de treino.\n' +
          '- **RAG** (Retrieval-Augmented Generation): recupera documentos e injeta no contexto para respostas fundamentadas — reduz alucinação.\n' +
          '- **Explicabilidade** e **governança**: transparência, supervisão humana, LGPD, direitos autorais e rastreabilidade.'
      },
      { kind: 'CONCEITO', title: 'Prompt × fine-tuning × RAG', body: 'Prompt: instrução no contexto. Fine-tuning: reajustar pesos com dados próprios. RAG: buscar conhecimento externo em tempo de inferência — sem alterar o modelo.' },
      { kind: 'DICA', body: 'A FCC associa "reduzir alucinação com dados próprios sem retreinar" ao RAG. Governança de IA = supervisão humana + transparência + conformidade (LGPD).' },
      { kind: 'PALAVRA_CHAVE', title: 'LLM · alucinação · viés · RAG · explicabilidade' }
    ]
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada',
    entries: [
      {
        kind: 'RESUMO',
        title: 'Qualidade e governança de dados',
        body:
          '# Qualidade e governança de dados\n\n' +
          '## Dimensões de qualidade\n' +
          'Completude, consistência, acurácia, unicidade (sem duplicidade), validade e **atualidade** (timeliness).\n\n' +
          '## Governança\n' +
          '- Papéis: **data owner** (responsável pelo dado) e **data steward** (zelador operacional).\n' +
          '- Catálogo de dados, linhagem (lineage), políticas de acesso.\n\n' +
          '## LGPD aplicada\n' +
          'Minimização, finalidade, base legal para tratamento; anonimização/pseudonimização; direitos do titular. Dado **anonimizado** sai do escopo da LGPD (se irreversível).'
      },
      { kind: 'PEGADINHA', body: '"Dado pseudonimizado está fora da LGPD" — ERRADO: pseudonimização é reversível → ainda é dado pessoal. Só a ANONIMIZAÇÃO irreversível sai do escopo.' },
      { kind: 'PALAVRA_CHAVE', title: 'data owner × steward · linhagem' },
      { kind: 'PALAVRA_CHAVE', title: 'anonimização (fora da LGPD) × pseudonimização' }
    ]
  }
]

export const ABGF_PACK_QUESTIONS: SeedQuestion[] = [
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'O mecanismo da orientação a objetos que permite que uma mesma mensagem (chamada de método) produza comportamentos diferentes conforme o tipo do objeto que a recebe é denominado:',
    options: [
      { text: 'encapsulamento.' },
      { text: 'herança.' },
      { text: 'polimorfismo.', correct: true },
      { text: 'sobrecarga estática.' },
      { text: 'coesão.' }
    ],
    explanation:
      'CORRETA: "c". Polimorfismo = mesmo contrato, comportamentos distintos por tipo. Erradas: encapsulamento (oculta estado interno); herança (reúso/extensão de uma superclasse); sobrecarga (mesmo nome, assinaturas diferentes — não depende do tipo em runtime); coesão (grau de foco de um módulo).',
    source: Q
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada',
    type: 'ME',
    difficulty: 'MEDIO',
    statement: 'Sobre autenticação e autorização em aplicações web, é correto afirmar que:',
    options: [
      { text: 'OAuth 2.0 é um protocolo de autenticação de usuários.' },
      { text: 'OpenID Connect é uma camada de autenticação construída sobre o OAuth 2.0.', correct: true },
      { text: 'autenticação define quais recursos o usuário pode acessar.' },
      { text: 'JWT é um algoritmo de criptografia simétrica.' },
      { text: 'autorização ocorre necessariamente antes da autenticação.' }
    ],
    explanation:
      'CORRETA: "b". OIDC adiciona autenticação (id_token) sobre o OAuth2 (que é AUTORIZAÇÃO). Erradas: "a" (OAuth2 é autorização, não autenticação); "c" (isso é autorização, não autenticação); "d" (JWT é um formato de token assinado, não um cifrador simétrico); "e" (autentica-se primeiro; depois autoriza).',
    source: Q
  },
  {
    disciplineSlug: 'engenharia-software',
    topic: 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados',
    type: 'CE',
    difficulty: 'MEDIO',
    statement:
      'As técnicas de análise de valor-limite e de partição de equivalência são exemplos de teste de caixa-branca, pois exigem o conhecimento da estrutura interna do código.',
    options: [{ text: 'Certo' }, { text: 'Errado', correct: true }],
    explanation:
      'ERRADO. Valor-limite e partição de equivalência são técnicas de CAIXA-PRETA — baseiam-se apenas em entradas e saídas, sem conhecer o código. Caixa-branca envolve cobertura de linhas/ramos e caminhos internos.',
    source: Q
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Noções de aprendizado de máquina',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Um modelo de classificação apresenta acurácia de 98% em uma base na qual apenas 2% dos registros pertencem à classe de interesse (fraude). A métrica mais adequada para avaliar a real capacidade de detecção de fraudes é:',
    options: [
      { text: 'a acurácia, que já é suficiente por ser alta.' },
      { text: 'o recall (revocação) sobre a classe de fraude.', correct: true },
      { text: 'o número total de registros da base.' },
      { text: 'o tempo de treinamento do modelo.' },
      { text: 'a quantidade de atributos (features).' }
    ],
    explanation:
      'CORRETA: "b". Em base desbalanceada, um modelo que prevê "não fraude" para tudo já teria 98% de acurácia, mas recall ZERO na fraude. O recall (dos positivos reais, quantos foram detectados) — e o F1 — medem a capacidade real de detecção. As demais não avaliam desempenho preditivo na classe rara.',
    source: Q
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Noções de aprendizado de máquina',
    type: 'CE',
    difficulty: 'FACIL',
    statement:
      'No aprendizado de máquina, algoritmos de agrupamento (clustering), como o k-means, são exemplos de aprendizado supervisionado.',
    options: [{ text: 'Certo' }, { text: 'Errado', correct: true }],
    explanation:
      'ERRADO. Clustering é aprendizado NÃO supervisionado — trabalha com dados SEM rótulo, descobrindo grupos por similaridade. O aprendizado supervisionado usa dados rotulados (classificação e regressão).',
    source: Q
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança',
    type: 'ME',
    difficulty: 'MEDIO',
    statement:
      'Uma organização deseja que um assistente baseado em LLM responda com base em seus documentos internos, reduzindo respostas incorretas (alucinações), sem retreinar o modelo. A técnica adequada é:',
    options: [
      { text: 'fine-tuning completo do modelo.' },
      { text: 'aumento da temperatura de geração.' },
      { text: 'RAG (geração aumentada por recuperação).', correct: true },
      { text: 'redução do número de parâmetros do modelo.' },
      { text: 'desativação da explicabilidade.' }
    ],
    explanation:
      'CORRETA: "c". RAG recupera documentos relevantes e os injeta no contexto do LLM em tempo de inferência — fundamenta a resposta e reduz alucinação SEM retreinar. Fine-tuning altera pesos (retreina); aumentar temperatura aumenta a aleatoriedade (piora); as demais não têm relação com o objetivo.',
    source: Q
  },
  {
    disciplineSlug: 'dados-ml-ia',
    topic: 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada',
    type: 'CE',
    difficulty: 'DIFICIL',
    statement:
      'De acordo com a LGPD, um dado submetido a processo de pseudonimização deixa de ser considerado dado pessoal e sai integralmente do âmbito de aplicação da lei.',
    options: [{ text: 'Certo' }, { text: 'Errado', correct: true }],
    explanation:
      'ERRADO. A pseudonimização é REVERSÍVEL (é possível reidentificar com informação adicional) — o dado continua sendo pessoal e sujeito à LGPD. Apenas a ANONIMIZAÇÃO irreversível retira o dado do escopo da lei.',
    source: Q
  }
]

export const ABGF_PACK_DECKS: SeedStarterDeck[] = [
  {
    name: 'ABGF — Engenharia de Software e Dados/IA',
    disciplineSlug: 'engenharia-software',
    description: 'Distinções de engenharia de software, segurança e ML/IA que a FCC mais cobra.',
    cards: [
      {
        front: 'Polimorfismo × sobrecarga',
        back: 'Polimorfismo (override): subclasse redefine método herdado, resolvido pelo tipo em runtime. Sobrecarga (overload): mesmo nome, assinaturas diferentes.',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências' }
      },
      {
        front: 'OAuth2 × OpenID Connect',
        back: 'OAuth2 = AUTORIZAÇÃO delegada. OIDC = camada de AUTENTICAÇÃO sobre o OAuth2 (id_token).',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada' }
      },
      {
        front: 'Hash × cifra',
        back: 'Hash: via ÚNICA (irreversível — SHA-256). Cifra: reversível com chave (AES simétrica, RSA assimétrica).',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada' }
      },
      {
        front: 'Valor-limite e partição de equivalência — que caixa?',
        back: 'Caixa-PRETA (só entradas/saídas). Caixa-branca conhece o código (cobertura de ramos/linhas).',
        topic: { disciplineSlug: 'engenharia-software', topic: 'Testes de software: unitários, integração, carga/desempenho, usabilidade/acessibilidade; automatizados' }
      },
      {
        front: 'Supervisionado × não supervisionado',
        back: 'Supervisionado: dados ROTULADOS (classificação/regressão). Não supervisionado: SEM rótulo (clustering, redução de dimensionalidade).',
        topic: { disciplineSlug: 'dados-ml-ia', topic: 'Noções de aprendizado de máquina' }
      },
      {
        front: 'Precisão × recall',
        back: 'Precisão: dos previstos positivos, quantos acertou. Recall: dos positivos reais, quantos achou. F1 = harmônica das duas (use em base desbalanceada).',
        topic: { disciplineSlug: 'dados-ml-ia', topic: 'Noções de aprendizado de máquina' }
      },
      {
        front: 'Reduzir alucinação de LLM sem retreinar',
        back: 'RAG (Retrieval-Augmented Generation): recupera documentos e injeta no contexto. Fine-tuning retreina; RAG não.',
        topic: { disciplineSlug: 'dados-ml-ia', topic: 'IA generativa e LLMs: conceitos, aplicações, riscos, vieses, explicabilidade e governança' }
      },
      {
        front: 'Anonimização × pseudonimização (LGPD)',
        back: 'Anonimização irreversível → fora da LGPD. Pseudonimização é reversível → continua sendo dado pessoal.',
        topic: { disciplineSlug: 'dados-ml-ia', topic: 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada' }
      }
    ]
  }
]

export const ABGF_PACK_RELATIONS: SeedRelation[] = [
  {
    from: { disciplineSlug: 'engenharia-software', topic: 'Programação orientada a objetos: classes, herança, polimorfismo, encapsulamento; injeção de dependências' },
    to: { disciplineSlug: 'engenharia-software', topic: 'Práticas e padrões de arquitetura' },
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Padrões de projeto e DDD pressupõem domínio dos pilares da OO.'
  },
  {
    from: { disciplineSlug: 'dados-ml-ia', topic: 'Análise de dados: coleta, validação e tratamento; análise exploratória; padrões e tendências' },
    to: { disciplineSlug: 'dados-ml-ia', topic: 'Noções de aprendizado de máquina' },
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'Sem dados tratados e explorados, não há aprendizado de máquina confiável.'
  },
  {
    from: { disciplineSlug: 'dados-ml-ia', topic: 'Qualidade e governança de dados: limpeza, padronização e validação; LGPD aplicada' },
    to: { disciplineSlug: 'dados-ml-ia', topic: 'Noções de aprendizado de máquina' },
    kind: 'DEPENDE_DE',
    strength: 0.5,
    note: 'A qualidade dos dados condiciona a qualidade do modelo (garbage in, garbage out).'
  },
  {
    from: { disciplineSlug: 'engenharia-software', topic: 'Desenvolvimento seguro: autenticação/autorização; OWASP; criptografia aplicada' },
    to: { disciplineSlug: 'seguranca-cibernetica', topic: 'Criptografia' },
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Criptografia aplicada no dev seguro conecta com os fundamentos de segurança.'
  }
]
