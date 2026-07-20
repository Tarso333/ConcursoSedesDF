# APROVA — Plataforma de Preparação para Concursos

**Versão candidata 1.0** — app desktop **offline-first** e **multi-concurso**: cada concurso é cadastrado com seus próprios dados (cargo, banca, data, disciplinas, pesos, estrutura da prova) e todo o estudo é escopado por ele.

Concursos cadastrados: **SEDES DF 2026** (Quadrix) · **ABGF 2026** (FCC, Analista TI E05) · **DATAPREV 2026** (FGV, Analista TI — Perfil 2).

> Banco de questões, simulados no formato oficial da banca, flashcards com revisão espaçada (FSRS), caderno de erros, plano do dia estratégico, grafo de conhecimento, learning analytics, gamificação, importador de editais em PDF e **Tutor IA fundamentado nos seus dados** — tudo rodando localmente, sem servidor.

## As engines (M14–M22)
| Engine | O que faz |
|---|---|
| **Multi Contest** (M14) | Concurso como agregado central; estrutura da prova é dado (`exam_config`) |
| **Knowledge Engine** (M15) | Tópicos viram centros de conhecimento (blocos tipados + progresso separado) |
| **Strategy Engine** (M16) | Plano do Dia por registro de 13 fatores, puro e explicável |
| **Learning Analytics** (M17) | Métricas por replay do event log (domínio, esquecimento, perfil) |
| **Relationship Engine** (M18) | O edital vira grafo (pré-requisitos, desbloqueios, gargalos) |
| **Contest Import Engine** (M21) | Edital em PDF → `ContestSeed`, parsing determinístico por banca |
| **AI Platform** (M22) | Provedores plugáveis (Ollama local é o padrão), Context Builder, Tutor com fontes, geração de conteúdo — ver [`AI.md`](./AI.md) |

## Stack
Electron · React · TypeScript · Vite (electron-vite) · Tailwind · Zustand · SQLite (better-sqlite3 + Drizzle) · Recharts · ts-fsrs.

## IA (opcional, privada por padrão)
O padrão é o **Ollama local** — grátis, offline e sem chave (instale em [ollama.com](https://ollama.com) e rode `ollama pull llama3.2:3b`). Alternativas: OpenAI, Anthropic, OpenRouter, Gemini CLI ou endpoint custom — em **Configurações → Inteligência Artificial**. O app inteiro funciona sem IA.

## Documentação
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — arquitetura e padrões.
- [`AI.md`](./AI.md) — AI Platform (provedores, contexto, tutor, geração).
- [`DECISIONS.md`](./DECISIONS.md) — decisões (ADRs).
- [`ROADMAP.md`](./ROADMAP.md) — milestones (M0–M24).
- [`IMPORTER.md`](./IMPORTER.md) — importador universal de editais.
- [`CONTEUDO.md`](./CONTEUDO.md) — cobertura da base de estudo (480 conhecimentos · 313 questões · 131 flashcards nos 4 concursos) e prioridades da próxima carga.
- [`STRATEGY.md`](./STRATEGY.md) · [`ANALYTICS.md`](./ANALYTICS.md) · [`GRAPH.md`](./GRAPH.md) — engines.
- [`PESQUISA.md`](./PESQUISA.md) — inteligência do concurso SEDES.

## Desenvolvimento
```bash
pnpm install      # instala dependências (rebuild nativo do better-sqlite3 p/ Electron)
pnpm dev          # sobe o app com HMR
pnpm test         # 84 testes (engines puras: strategy, analytics, graph, importer, IA)
pnpm typecheck    # tsc estrito (node + web)
pnpm db:generate  # gera migration a partir do schema Drizzle
pnpm build:dir    # empacota o app (pasta release/<v>/win-unpacked com o .exe)
pnpm build        # gera o instalador NSIS (.exe setup)
```
> No Windows, se `pnpm` não estiver no PATH: `npx pnpm@9.15.0 <cmd>` ou use `pnpm.cmd` no PowerShell.

### Empacotamento
- **App pronto:** `pnpm build:dir` gera `release/<versão>/win-unpacked/` com o executável portátil (autoria nas propriedades).
- **Instalador NSIS:** `pnpm build` baixa o `winCodeSign`, cujo conteúdo tem symlinks de macOS. O Windows só os extrai com **Modo Desenvolvedor** ligado (Configurações → Privacidade e segurança → Para desenvolvedores) ou terminal **como administrador**. As propriedades de autoria (`publisherName`/`copyright`) já estão em `electron-builder.yml`.

Os dados ficam em SQLite no diretório de dados do app do usuário (`app.getPath('userData')`). 100% local e privado.
