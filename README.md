# APROVA — Plataforma de Preparação para Concursos

App desktop **offline-first** e **multi-concurso**: cada concurso é cadastrado com seus próprios dados (cargo, banca, data, disciplinas, pesos, estrutura da prova) e todo o estudo é escopado por ele. O primeiro concurso cadastrado é o **SEDES DF 2026 (Instituto Quadrix)** — cargo Técnico em Desenvolvimento e Assistência Social / Técnico Administrativo.

> Banco de questões, simulados no formato oficial da banca, flashcards com revisão espaçada (FSRS), caderno de erros, planejamento automático até a prova, estatísticas de desempenho, gamificação e tutor de IA — tudo rodando localmente, sem servidor.

## Stack
Electron · React · TypeScript · Vite (electron-vite) · Tailwind · Zustand · SQLite (better-sqlite3 + Drizzle) · Recharts · ts-fsrs.

## Documentação
- [`PESQUISA.md`](./PESQUISA.md) — inteligência do concurso (edital, banca, estratégia).
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — arquitetura e padrões.
- [`DECISIONS.md`](./DECISIONS.md) — decisões (ADRs).
- [`ROADMAP.md`](./ROADMAP.md) — milestones.
- [`TASKS.md`](./TASKS.md) — backlog.

## Desenvolvimento
```bash
pnpm install      # instala dependências (rebuild nativo do better-sqlite3 p/ Electron)
pnpm dev          # sobe o app com HMR
pnpm db:generate  # gera migration a partir do schema Drizzle
pnpm build:dir    # empacota o app (pasta release/<v>/win-unpacked com o .exe)
pnpm build        # gera o instalador NSIS (.exe setup)
```
> No Windows, se `pnpm` não estiver no PATH: `npx pnpm@9.15.0 <cmd>` ou use `pnpm.cmd` no PowerShell.

### Empacotamento
- **App pronto:** `pnpm build:dir` gera `release/<versão>/win-unpacked/APROVA SEDES DF.exe` (portátil, já com autoria nas propriedades).
- **Instalador NSIS:** `pnpm build` baixa o `winCodeSign`, cujo conteúdo tem symlinks de macOS. O Windows só os extrai com **Modo Desenvolvedor** ligado (Configurações → Privacidade e segurança → Para desenvolvedores) ou terminal **como administrador**. Com isso ativo, `pnpm build` gera o instalador. As propriedades de autoria (`publisherName`/`copyright`) já estão em `electron-builder.yml`.

Os dados ficam em SQLite no diretório de dados do app do usuário (`app.getPath('userData')`). 100% local e privado.
