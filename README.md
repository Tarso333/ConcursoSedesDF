# APROVA SEDES DF

App desktop **offline-first** para maximizar a aprovação no concurso **SEDES DF 2026 (Instituto Quadrix)** — cargo **Técnico em Desenvolvimento e Assistência Social / Técnico Administrativo** (nível médio).

> Banco de questões, simulados no estilo oficial, flashcards com revisão espaçada (FSRS), caderno de erros, planejamento automático até a prova (06/09/2026), estatísticas de desempenho, gamificação e tutor de IA — tudo rodando localmente, sem servidor.

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
pnpm build        # empacota o instalador (electron-builder)
```
> No Windows, se `pnpm` não estiver no PATH: `npx pnpm@9.15.0 <cmd>` ou use `pnpm.cmd` no PowerShell.

Os dados ficam em SQLite no diretório de dados do app do usuário (`app.getPath('userData')`). 100% local e privado.
