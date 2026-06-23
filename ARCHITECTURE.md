# ARCHITECTURE — APROVA SEDES DF

> Arquitetura e padrões do app desktop **offline-first**.
> Decisões registradas em [`DECISIONS.md`](./DECISIONS.md) · Plano em [`ROADMAP.md`](./ROADMAP.md).
> **Última atualização:** 2026-06-23.

---

## 1. Visão geral

App **desktop multiplataforma, offline-first, mono-usuário**, cujo objetivo único é maximizar a aprovação no concurso **SEDES DF 2026 (Quadrix)** — ver [`PESQUISA.md`](./PESQUISA.md).

- Sem servidor, sem nuvem, sem login: **todos os dados vivem localmente em SQLite** no perfil do usuário.
- A IA (Tutor) é o **único** ponto que pode usar rede (provedor de LLM via chave do usuário); tudo o mais funciona 100% offline.

```
┌─────────────────────────── Electron ───────────────────────────┐
│                                                                 │
│   Renderer (Chromium)              Main (Node.js)               │
│   React + TS + Tailwind            better-sqlite3 + Drizzle      │
│   Zustand (UI state)   ── IPC ─▶   Repositories / Services       │
│   Recharts (gráficos)  ◀─ typed ─  FSRS engine                  │
│   React Router                     LLM provider (opcional, rede) │
│                                    SQLite file (userData/*.db)   │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Stack

| Camada | Escolha | Porquê |
|---|---|---|
| Shell desktop | **Electron** | Sem toolchain novo (Node já instalado); evita Rust/MSVC do Tauri (ADR-001) |
| Bundler/DX | **electron-vite** | Vite + HMR para main/preload/renderer |
| UI | **React 18 + TypeScript** | Padrão do ecossistema; type-safety ponta a ponta |
| Estilo | **Tailwind CSS** | Velocidade + tema claro/escuro via `class` |
| Estado UI | **Zustand** | Simples, sem boilerplate |
| Roteamento | **React Router** | SPA no renderer |
| Gráficos | **Recharts** | Declarativo em React (dashboard/estatísticas) |
| Ícones | **lucide-react** | Conjunto coeso e leve |
| Banco | **SQLite (better-sqlite3)** | Embarcado, síncrono, rápido, offline |
| ORM/Query | **Drizzle ORM** | Tipado, migrations versionadas (drizzle-kit) |
| Revisão espaçada | **ts-fsrs** | FSRS (estado da arte, melhor que SM-2) |
| Datas | **date-fns** | Utilidades de data tree-shakeable |
| Empacotamento | **electron-builder** | Instalador Windows (NSIS) |

## 3. Estrutura de pastas

```
ConcursoSedesDF/
├─ electron.vite.config.ts        # build dos 3 processos
├─ drizzle.config.ts              # geração de migrations
├─ electron-builder.yml           # empacotamento
├─ src/
│  ├─ main/                       # processo principal (Node)
│  │  ├─ index.ts                 # bootstrap janela + ciclo de vida
│  │  ├─ db/
│  │  │  ├─ connection.ts         # abre o SQLite em userData
│  │  │  ├─ schema.ts             # schema Drizzle (fonte da verdade do DB)
│  │  │  ├─ migrate.ts            # aplica migrations no boot
│  │  │  ├─ migrations/           # SQL versionado (drizzle-kit)
│  │  │  └─ seed/                 # seed do edital (curriculum + questões)
│  │  ├─ repositories/            # acesso a dados por entidade
│  │  ├─ services/                # FSRS, planner, estatísticas, IA
│  │  └─ ipc/                     # handlers + contrato de canais
│  ├─ preload/
│  │  └─ index.ts                 # contextBridge → window.api tipado
│  └─ renderer/
│     ├─ index.html
│     └─ src/
│        ├─ main.tsx, App.tsx
│        ├─ routes/               # uma pasta por feature (dashboard, questões…)
│        ├─ components/           # UI compartilhada (layout, ui kit)
│        ├─ stores/               # Zustand
│        ├─ lib/                  # api client tipado (window.api), utils
│        └─ styles/               # tailwind + tokens de tema
├─ shared/                        # tipos/contratos compartilhados main↔renderer
└─ *.md                           # governança
```

## 4. Padrões

- **Camadas:** `ipc` (transporte) → `services` (regra de negócio) → `repositories` (dados) → `db`. O renderer **nunca** toca SQLite direto; só fala via `window.api` (IPC tipado, `contextIsolation: true`, `nodeIntegration: false`).
- **Contrato tipado:** os tipos de entrada/saída de cada canal IPC vivem em `shared/` e são usados nos dois lados → sem `any` na fronteira.
- **Repositories** encapsulam queries Drizzle; **services** orquestram (ex.: `reviewService` chama FSRS + persiste progresso).
- **Migrations versionadas:** schema muda só via nova migration gerada por `drizzle-kit`; aplicadas idempotentemente no boot.
- **Seed idempotente:** popula catálogo do edital se o banco estiver vazio; nunca duplica.
- **Offline-first absoluto:** nenhuma feature core depende de rede. IA degrada graciosamente quando sem chave/sem internet.
- **Tema claro/escuro:** classe `dark` na raiz + tokens CSS; preferência persistida.

## 5. Modelo de domínio (resumo)

Catálogo do edital → **Discipline** (bloco geral/específico, peso) → **Topic** (hierárquico) → **Question** (+ **QuestionOption**).
Progresso do usuário → **Answer**, **ErrorLog** (caderno de erros), **Deck**/**Flashcard** + **SrsCard** (FSRS), **MockExam**/**MockExamItem** (simulados), **StudyPlan**/**StudyTask**, **Goal**, **StudySession**, **Settings**, **AiMessage**.

Detalhe físico em `src/main/db/schema.ts`; lógico no DER em [`DECISIONS.md`](./DECISIONS.md)/ROADMAP.

## 6. Decisões conscientes (débito conhecido)
- IA exige chave de provedor (dependência externa) → abstraída atrás de `AiService`; app é 100% útil sem ela.
- Empacotamento de instalador (electron-builder) só na fase de hardening.
- Sincronização/backup em nuvem fora de escopo (offline-first puro); backup = export/import de arquivo.
