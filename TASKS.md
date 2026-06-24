# TASKS — APROVA SEDES DF (Backlog)

> Derivado do [`ROADMAP.md`](./ROADMAP.md). Detalhe fino só no milestone corrente.
> **Última atualização:** 2026-06-23 · **Status: PLATAFORMA COMPLETA — M0–M13 concluídos. ✅**
> **Status:** ⬜ pendente · 🟡 em andamento · ✅ concluído · ⏸️ bloqueado (externo)
>
> **Sessões 4–5 (M8–M13) concluídas:** Estatísticas (radar/prontidão), Gamificação (XP/níveis/streak/9 conquistas), Planejamento automático (cronograma até a prova), Modo Aprovação (prioridade fraqueza×peso), Tutor IA (provedor por chave) e Hardening (backup export/import + empacotamento `--dir` com autoria de Tarso Hebert). App empacotado em `release/0.1.0/win-unpacked/APROVA SEDES DF.exe`.
>
> **Pendências externas:** (1) **chave de IA** para ligar o Tutor (M12); (2) **instalador NSIS** exige Modo Desenvolvedor/admin do Windows para extrair o winCodeSign (symlinks) — o app `--dir` já roda sem isso; (3) banco de questões real (provas Quadrix) — ampliação de dados.

---

## ✅ Sessão 1 — Fundação concluída (M0 + M1 + M2)

| ID | Tarefa | Milestone | Status |
|---|---|---|---|
| T-001 | Pesquisa do concurso + `PESQUISA.md` | M1 | ✅ |
| T-002 | Governança (ARCHITECTURE, DECISIONS, ROADMAP, TASKS, README) | M0 | ✅ |
| T-003 | Scaffold Electron + electron-vite + React + TS + Tailwind | M0 | ✅ |
| T-004 | IPC tipado (preload `window.api`) + contratos em `shared/` | M0 | ✅ |
| T-005 | Conexão SQLite (better-sqlite3) em `userData` + migrate no boot | M0/M1 | ✅ |
| T-006 | Schema Drizzle (~25 tabelas) + migrations via `user_version` | M1 | ✅ |
| T-007 | Seed do edital (18 disciplinas, ~90 tópicos, pesos) + 15 questões | M1 | ✅ |
| T-008 | Tema claro/escuro + tokens + layout/sidebar | M0/M2 | ✅ |
| T-009 | Dashboard com dados reais (countdown, % edital, estimativa, fortes/fracas) | M2 | ✅ |
| T-010 | Stubs de rota das demais features + Configurações funcional | M2 | ✅ |
| T-011 | Instalar deps + rebuild nativo + verificar build/boot | M0 | ✅ |

**Verificação:** `pnpm typecheck` limpo · `pnpm compile` verde · app sobe via `pnpm start`, cria e popula o banco em `userData`. Rodar dia a dia: `pnpm dev`.

---

## ✅ Sessão 2 — M3 (Banco de Questões & Resolução) concluído

| ID | Tarefa | Status |
|---|---|---|
| T-M3-01 | Repositório de questões com filtros (disciplina, tópico, dificuldade, tipo, situação: não respondidas/erradas/acertadas/favoritas) | ✅ |
| T-M3-02 | IPC + registro de `Answer` (com tempo); contagem por filtro | ✅ |
| T-M3-03 | Tela de resolução: filtros → treino → feedback imediato + comentário + resumo | ✅ |
| T-M3-04 | Favoritar questão (migration v2 `question_states`); registro automático no caderno de erros | ✅ |
| T-M3-05 | Ampliar banco de questões (ingestão de provas Quadrix anteriores) | 🟡 backlog de dados |

**Verificado:** typecheck (node+web) limpo · `electron-vite build` verde · boot aplica a migration v2 sem erro.

---

## ✅ Sessão 3 — M4 + M5 + M6 (motor de retenção) concluído

| Milestone | Entregue | Status |
|---|---|---|
| M4 Caderno de Erros | listar/filtrar erros, classificar tipo, marcar compreendido, ver resposta+comentário | ✅ |
| M5 Flashcards | decks CRUD, cards CRUD, geração a partir dos erros, modo flip | ✅ |
| M6 Revisão FSRS | `ts-fsrs`, fila de vencidos, avaliação 4 graus, agendamento e stats | ✅ |

**Verificado:** typecheck (node+web) + `electron-vite build` verdes; boot OK (FSRS inicializa).

---

## 🎯 Sessão 4 — Próximo: M7 (Simulados Inteligentes)

| ID | Tarefa | Prioridade | Status |
|---|---|---|---|
| T-M7-01 | Gerar simulado (oficial 60q 20/80, por disciplina, personalizado) + cronômetro | Crítica | ⬜ |
| T-M7-02 | Persistir `mock_exams`/`mock_exam_items`; correção e pontuação (corte de eliminação) | Crítica | ⬜ |
| T-M7-03 | Tela de simulado (navegação entre questões, tempo) + resultado por bloco/disciplina | Crítica | ⬜ |
| T-M7-04 | Histórico de simulados | Alta | ⬜ |

---

## ⏭️ Próximos milestones (épicos)

| ID | Épico | Milestone |
|---|---|---|
| EP-QBANK | Banco de questões & resolução com filtros | M3 |
| EP-ERROS | Caderno de erros | M4 |
| EP-CARDS | Flashcards & decks | M5 |
| EP-FSRS | Revisão espaçada (ts-fsrs) | M6 |
| EP-SIM | Simulados (modo oficial Quadrix 60q) | M7 |
| EP-STATS | Estatísticas + probabilidade de aprovação | M8 |
| EP-GAME | Metas & gamificação (XP/medalhas/streak) | M9 |
| EP-PLAN | Planejamento automático (75 dias) + replanejamento | M10 |
| EP-APROV | Modo Aprovação | M11 |
| EP-IA | IA Tutor (provedor + chat + resumos/flashcards/mapas) | M12 |
| EP-HARD | Hardening + backup + empacotamento | M13 |

---

## ⏸️ Bloqueios externos (dependem de ação humana)

| # | Bloqueio | Impacto | Como destravar |
|---|---|---|---|
| B-01 | Chave de API de provedor de LLM | Liga as features de IA (M12) | Inserir chave em Configurações quando chegar a M12 |
| B-02 | (Opcional) Rebuild nativo do better-sqlite3 | Se prebuild não cobrir a ABI do Electron | `@electron/rebuild` no postinstall (já previsto) |

> Sem Docker e sem servidor: o app **não** depende de B-01/B-02 para o núcleo offline funcionar.

---

## ✅ Concluído
- **Pesquisa de campo** do concurso SEDES DF 2026 (Quadrix) consolidada em `PESQUISA.md`.
- **Governança** inicial (arquitetura, ADRs, roadmap, backlog).
