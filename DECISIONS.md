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

## ADR-009 — Rebuild nativo via @electron/rebuild (não `electron-builder install-app-deps`)
**Contexto:** `better-sqlite3` é módulo nativo e precisa ser recompilado para a ABI do Electron (diferente da ABI do Node). O passo padrão `electron-builder install-app-deps` **quebra com pnpm no Windows** (tenta executar `pnpm.cjs` como binário nativo → "não é um aplicativo Win32 válido").
**Decisão:** `postinstall` (e script `rebuild`) usam **`electron-rebuild -f -w better-sqlite3`** (`@electron/rebuild`), que baixa o prebuilt do better-sqlite3 já compatível com Electron — sem MSVC/compilação e sem invocar o pnpm.
**Consequências:** (+) boot do app funciona sem build tools; instalação reprodutível. (−) o empacotamento via electron-builder (M13) precisará validar o rebuild no fluxo de release. **Confirmado em 2026-06-23:** `✔ Rebuild Complete`, app sobe e cria o banco.

## ADR-008 — Sem rastros de IA no repositório
**Contexto:** Preferência do dono do projeto (consistente com o repositório irmão).
**Decisão:** Nenhuma coautoria/credito de IA em commits, docs, código ou metadados. `.gitignore` exclui `.claude/`.
**Consequências:** Autoria única do dev. Aplica-se a todo o histórico deste repo.
