# DECISIONS — ADRs · APROVA SEDES DF

> Registro de decisões arquiteturais. Formato curto: Contexto · Decisão · Consequências.
> **Última atualização:** 2026-06-23.

---

## ADR-001 — Electron em vez de Tauri
**Contexto:** Briefing sugeriu Electron *ou* Tauri. Prioridades: offline-first, performance, baixo atrito. Ambiente do dev (Windows) tem Node 20 instalado, **mas não tem Rust nem MSVC build tools**, e há histórico de atrito com permissões/admin.
**Decisão:** **Electron + electron-vite**. Tauri exigiria instalar a toolchain Rust + Visual Studio C++ (dependência externa = bloqueio). Electron roda só com Node.
**Consequências:** (+) zero toolchain nova, ecossistema maduro, better-sqlite3 nativo. (−) bundle maior e mais RAM que Tauri — irrelevante para uso pessoal local. Reavaliar só se distribuição em massa virar requisito.

## ADR-002 — SQLite (better-sqlite3) + Drizzle
**Contexto:** Banco local, offline-first, leituras intensivas (filtros do banco de questões, estatísticas).
**Decisão:** **better-sqlite3** (síncrono, performático) no processo main, com **Drizzle ORM** para schema tipado e migrations versionadas (drizzle-kit).
**Consequências:** (+) tipos ponta a ponta, migrations reproduzíveis, queries rápidas. (−) módulo nativo → precisa de rebuild para a ABI do Electron (`@electron/rebuild`/electron-builder cuidam disso; prebuilds cobrem Windows x64). Mitigação: acesso a dados isolado em `repositories/` para permitir troca por libsql/sql.js se o build nativo falhar.

## ADR-003 — Sem servidor, sem autenticação, mono-usuário
**Contexto:** O usuário é o único consumidor; objetivo é estudar, não operar SaaS.
**Decisão:** Nada de API/HTTP/login. Dados no SQLite em `app.getPath('userData')`. "Perfil" é só uma linha em `settings`.
**Consequências:** (+) simplicidade máxima, privacidade, parte do dia 1. (−) sem multiusuário/sync — fora de escopo. Backup via export/import de arquivo `.db`/JSON.

## ADR-004 — IPC tipado com contextIsolation
**Contexto:** Segurança e type-safety na fronteira renderer↔main.
**Decisão:** `contextIsolation: true`, `nodeIntegration: false`. Preload expõe `window.api` via `contextBridge`. Contratos de canal tipados em `shared/`.
**Consequências:** (+) seguro e tipado; renderer nunca acessa Node/SQLite direto. (−) algum boilerplate de canal — padronizado num único registrador de handlers.

## ADR-005 — FSRS via ts-fsrs para revisão espaçada
**Contexto:** O briefing pede algoritmo "tipo Anki". SM-2 é datado; o Anki moderno usa **FSRS**.
**Decisão:** **ts-fsrs** como motor de agendamento de flashcards e revisão de erros.
**Consequências:** (+) retenção superior, parâmetros otimizáveis, determinístico/testável. (−) curva conceitual maior que SM-2 — encapsulada em `services/reviewService`.

## ADR-006 — IA Tutor com provedor abstraído e opcional
**Contexto:** Tutor de IA (explicações, resumos, flashcards, mapas mentais) precisa de LLM → chave/credencial = dependência externa; conflita com offline-first puro.
**Decisão:** Interface `AiService` com provedor configurável (chave inserida pelo usuário em Settings; default = provedor de LLM via API). App é **100% funcional sem IA**; features de IA aparecem desabilitadas com CTA para configurar a chave.
**Consequências:** (+) núcleo offline intacto; troca de provedor sem mexer nas telas. (−) IA exige ação do usuário (chave) para ligar. Possível provedor local (Ollama) como evolução.

## ADR-007 — App de página única no renderer (React Router)
**Decisão:** Renderer é uma SPA com React Router; navegação por sidebar. Estado de UI no Zustand; dados sempre buscados do main via `window.api`.
**Consequências:** Telas desacopladas do acesso a dados; fácil adicionar features como rotas.

## ADR-013 — Learning Analytics: projeções derivadas do event log (zero storage)
**Contexto:** A plataforma precisava entender *como* o usuário aprende (evolução, esquecimento, retenção, estabilidade, confiança, perfil) — de forma determinística, sem IA, servindo Strategy Engine, estatísticas e futuramente o Tutor.
**Decisão:** (1) **Nenhuma tabela nova**: `answers`, `srs_reviews`, `study_sessions` e `topic_progress` já são um event log timestampado e imutável — todas as métricas são **projeções recomputáveis por replay**; a curva histórica de qualquer data é derivável (zero duplicação, zero migração, zero risco a dados). (2) **Modelo central único** de domínio derivado: `acurácia com recência (meia-vida 21d) × fator de volume (n/5) × fator de retenção (piso 0.55 + decaimento 30d sem prática)` — a mesma função avaliada no passado gera a **curva de aprendizado** e no futuro a **curva de esquecimento**. (3) Mesmo padrão arquitetural do M16: **coleta** (`analytics/snapshot.ts`, única camada com DB) → **processamento/indicadores** (`analytics/engine.ts` puro + `config.ts` com limiares) → **visualização** (Dashboard/Estatísticas, sem regra de negócio). (4) **Registro de indicadores** e traços de perfil Open/Closed (novo indicador = nova entrada). (5) **Learning Profile é agregado calculado** — jamais cadastrado. (6) Integração M16: `masteryPct` da previsão passa a vir de `disciplineMastery()` (consciente de esquecimento). Documentação completa em `ANALYTICS.md`; 14 testes unitários.
**Consequências:** (+) inteligência auditável e explicável (todo indicador carrega `detail`); dados 100% preservados (engine só lê); pronto para alimentar o Tutor IA (DTO serializável) e novos concursos sem mudança. (−) recomputa a cada consulta (aceitável no SQLite local com poucos milhares de eventos; se um dia pesar, a decisão registrada é materializar *caches*, nunca a fonte).

## ADR-012 — Motor de Estratégia: registro de fatores puro e determinístico
**Contexto:** A plataforma precisava decidir **o que estudar hoje** considerando 15 sinais simultâneos (prova, pesos, incidência, desempenho, simulados, FSRS, esquecimento, tendência, domínio declarado, concursos ativos, sinergia de disciplinas, tempo disponível, meta de aprovação) — sem IA, sem aleatoriedade e com justificativa por recomendação.
**Decisão:** (1) **Núcleo puro** (`strategy/engine.ts`): funções sem DB/Electron/rede/relógio implícito — recebem `StrategyInput` (snapshot) e devolvem `DailyPlan`; mesmíssima entrada ⇒ mesmíssima saída (testável em Node puro; 14 testes vitest). (2) **Fórmula = registro de fatores**: cada fator (`key`, `label`, `compute → {value 0..1, reason}`) contribui `peso×valor`; pesos somam 100 (score 0..100) e vivem em `strategy/config.ts` — **fator novo = 1 entrada no array + 1 peso** (Open/Closed); a explicabilidade é estrutural (cada item carrega `factors[]` decomposto + `reasons[]`). (3) **Snapshot** (`strategy/snapshot.ts`) é a única camada com dados: 7 consultas agregadas por concurso ativo. (4) **Fonte única de verdade**: Modo Aprovação e Planejamento consomem `rankDisciplines()`; Dashboard/Estatísticas exibem o plano/ranking — fim de fórmulas paralelas. (5) Alocação determinística (blocos 15–45min, arredondados a 5, FSRS como candidato próprio, desempate por ordem do edital) e previsão de conclusão com modelo explícito (orçamento por incidência × domínio). Documentação completa em `STRATEGY.md`.
**Consequências:** (+) explicável ponta a ponta ("score 78 = peso 14 + urgência 9 + …"); ajustar comportamento = editar config; ABGF/DATAPREV entram **sem tocar no motor** (sinergia multi-concurso ativa sozinha via dados); testes garantem regressão zero na estratégia. (−) o snapshot adiciona ~7 consultas por geração de plano (agregadas e indexadas — desprezível no SQLite local); pesos iniciais são heurísticos e deverão ser calibrados com uso real.

## ADR-011 — Engine de Conhecimento: blocos tipados + progresso separado
**Contexto:** Cada tópico precisava virar um centro de conhecimento (resumo, legislação, jurisprudência, dicas, pegadinhas, conceitos, palavras-chave, links/vídeos/PDFs, flashcards, questões, estatísticas, domínio do usuário), tudo opcional, sem campos genéricos, sem duplicação e com expansão sem migrations complexas.
**Decisão:** (1) **Hierarquia**: `Concurso → Cargo → Disciplina → Tópico → Subtópico → Conhecimento`, onde **Cargo é atributo de identidade do agregado Concurso** (`contest.role`) — um cadastro = um par concurso+cargo (dois cargos = dois cadastros com disciplinas/pesos próprios); subtópicos usam `topics.parent_id` (existente desde a v1). (2) **`knowledge_entries`** com padrão *content-block tipado*: `kind` discriminado (RESUMO, CONCEITO, LEGISLACAO, JURISPRUDENCIA, DICA, PEGADINHA, OBSERVACAO, PALAVRA_CHAVE, LINK, VIDEO, PDF, MAPA_MENTAL reservado) + campos semânticos (`title`, `body` markdown, `reference`, `url`) — **novo tipo = novo valor de kind + um renderizador no registry da UI**, sem migration e sem tocar em funcionalidades (Open/Closed). Rejeitadas: tabela-por-tipo (migration por tipo novo) e JSON opaco (inconsultável, genérico). (3) **Separação DDD Conteúdo × Progresso**: conteúdo (`knowledge_entries`, questões, flashcards) nunca é mutado pelo estudo; progresso vive em **`topic_progress`** (status + última data) e métricas de acerto são **derivadas** das respostas (nunca armazenadas em duplicidade). `flashcards.topic_id` (nullable) classifica memorização no conhecimento sem quebrar decks. (4) **Seed de conhecimento no registro de concursos** (`knowledge` no ContestSeed), idempotente por tópico (nunca sobrescreve). Migração **v5** (2 tabelas + 1 coluna — aditiva, sem rebuild).
**Consequências:** (+) escala a milhares de tópicos (índice `(topic_id, kind)`, 5 consultas agregadas por disciplina); tela Conteúdo navega a árvore e renderiza qualquer combinação; pronto para importador de edital/IA gerarem `knowledge_entries` no futuro. (−) validação por kind é do domínio TS (SQLite guarda o superset de campos) — trade-off aceito e documentado; edição de conteúdo na UI ainda não existe (conteúdo via seed; próxima evolução).

## ADR-010 — Plataforma multi-concurso: agregado Contest + padrão Active Contest
**Contexto:** A aplicação nasceu específica para o SEDES DF (textos, pesos 20/80, cortes e datas fixos em código). Para virar plataforma universal de concursos, toda regra fixa precisava virar dado, sem duplicar código nem criar condicionais por concurso.
**Decisão:** (1) Novo agregado central **`contests`** (nome, cargo, banca, data, cidade, salário, benefícios) com **`exam_config` JSON** descrevendo a estrutura da prova — blocos (rótulo, nº de questões, peso por questão, corte %), duração e alvo de aprovação. Simulado oficial, prontidão, estimativa de aprovação e textos da UI derivam desse JSON. (2) **Padrão Active Contest:** o renderer nunca envia `contestId`; os handlers IPC resolvem o concurso ativo (`settings.active_contest_id`) uma vez por chamada e o injetam explicitamente em repositórios/serviços — camadas de domínio agnósticas, dependência explícita (SOLID). (3) **Escopo:** `disciplines` tem `contest_id` (UNIQUE composto por concurso); questões/tópicos/respostas/erros/flashcards/SRS herdam o vínculo transitivamente (normalizado); `decks`, `mock_exams`, `study_plans`, `goals`, `study_sessions` e `ai_messages` têm `contest_id` direto. (4) **Gamificação é do usuário** (global): streak/XP/medalhas premiam a constância da pessoa, não do concurso. (5) **Seed é um registro de concursos** (`seed/contests/`): cadastrar um concurso novo = criar arquivo de dados e registrá-lo; `seed_key` namespaced por slug do concurso. Migração **v4** faz o upgrade sem perda de dados (rebuild de disciplines com FKs off + backfill; SEDES vira o primeiro concurso cadastrado, herdando a data de prova configurada).
**Consequências:** (+) adicionar ABGF/DATAPREV etc. = só dados; zero `if concurso == X`; troca de concurso na UI remonta as telas já no novo escopo. (−) consultas ganham um join com `disciplines` para escopo (custo desprezível no SQLite local); a UI de cadastro de concursos ainda não existe (cadastro via seed — evolução futura).

## ADR-009 — Rebuild nativo via @electron/rebuild (não `electron-builder install-app-deps`)
**Contexto:** `better-sqlite3` é módulo nativo e precisa ser recompilado para a ABI do Electron (diferente da ABI do Node). O passo padrão `electron-builder install-app-deps` **quebra com pnpm no Windows** (tenta executar `pnpm.cjs` como binário nativo → "não é um aplicativo Win32 válido").
**Decisão:** `postinstall` (e script `rebuild`) usam **`electron-rebuild -f -w better-sqlite3`** (`@electron/rebuild`), que baixa o prebuilt do better-sqlite3 já compatível com Electron — sem MSVC/compilação e sem invocar o pnpm.
**Consequências:** (+) boot do app funciona sem build tools; instalação reprodutível. (−) o empacotamento via electron-builder (M13) precisará validar o rebuild no fluxo de release. **Confirmado em 2026-06-23:** `✔ Rebuild Complete`, app sobe e cria o banco.

## ADR-008 — Sem rastros de IA no repositório
**Contexto:** Preferência do dono do projeto (consistente com o repositório irmão).
**Decisão:** Nenhuma coautoria/credito de IA em commits, docs, código ou metadados. `.gitignore` exclui `.claude/`.
**Consequências:** Autoria única do dev. Aplica-se a todo o histórico deste repo.
