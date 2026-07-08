# ROADMAP — APROVA SEDES DF

> Milestones de engenharia. Cada um (após a fundação) é uma **fatia vertical** entregável: DB → serviço/IPC → tela.
> Backlog em [`TASKS.md`](./TASKS.md) · Decisões em [`DECISIONS.md`](./DECISIONS.md) · Conteúdo em [`PESQUISA.md`](./PESQUISA.md).
> **Status:** ⬜ não iniciado · 🟡 em andamento · ✅ concluído · ⏸️ bloqueado
> **Última atualização:** 2026-06-23.

---

## Princípio de priorização
A prova é **06/09/2026** (~75 dias) e **específicos valem 80% da nota**. A ordem entrega cedo o que mais move a agulha de aprovação: **resolver questões → registrar erros → revisar (FSRS) → simular**. IA e empacotamento vêm depois.

---

## BLOCO A — Fundação & uso diário (MVP utilizável)

### M0 — Fundação técnica ✅ (concluído 2026-06-23)
Scaffold Electron + electron-vite + React + TS + Tailwind; IPC tipado (contextBridge); conexão SQLite; tema claro/escuro; shell de janela.
**Verificado:** typecheck (node+web) limpo, `electron-vite build` verde, app sobe e abre a janela; rebuild nativo do better-sqlite3 via `@electron/rebuild` (ver ADR-009).

### M1 — Modelo de domínio & seed do edital ✅ (concluído 2026-06-23)
Schema Drizzle (~25 tabelas: catálogo + progresso); migrations versionadas via `PRAGMA user_version`; **seed do edital SEDES DF** (18 disciplinas, ~90 tópicos, pesos) + 15 questões de amostra.
**Verificado:** no boot o banco é criado em `userData` e populado (migrations + seed confirmados pelo WAL de escrita).

### M2 — Shell de navegação + Dashboard ✅ (concluído 2026-06-23)
Sidebar com navegação completa + rotas; **Dashboard** com dados reais: countdown, % do edital ponderado, questões/acertos/erros, taxa de acerto, estimativa de aprovação, evolução 14 dias, fortes/fracas, progresso por disciplina. Configurações funcional. Demais features com placeholder por milestone.
**Próximo:** M3 — Banco de Questões & Resolução.

### M3 — Banco de Questões & Resolução ✅ (concluído 2026-06-23)
Filtros (disciplina, tópico, dificuldade, tipo, situação: não respondidas/erradas/acertadas/favoritas); treino com feedback imediato + comentário; `Answer` registrada com tempo; favoritar (`question_states`); erro alimenta o caderno automaticamente; tela de resumo.
**Verificado:** typecheck (node+web) + `electron-vite build` verdes; boot aplica migration v2 sem erro.

### M4 — Caderno de Erros ✅ (concluído 2026-06-23)
Registro automático de erros (na resolução); filtros (disciplina/status); classificar tipo de erro; marcar compreendido; expandir p/ ver resposta correta + comentário. Erros viram flashcards no M5.

### M5 — Flashcards & Decks ✅ (concluído 2026-06-23)
CRUD de decks/cards; **geração automática a partir do caderno de erros**; modo flip de estudo; cada card entra na fila FSRS. Contadores de cards e "a revisar" por deck.

### M6 — Revisão Espaçada (FSRS) ✅ (concluído 2026-06-23)
`ts-fsrs` integrado; `srs_cards`/`srs_reviews`; fila de vencidos; avaliação Errei/Difícil/Bom/Fácil agenda a próxima data; stats (vencendo agora, revisados hoje, total). Datas em formato compatível com `datetime('now')`.
**Verificado:** typecheck (node+web) + build verdes; boot OK.

### M7 — Simulados Inteligentes ✅ (concluído 2026-06-23)
Modos OFICIAL (20 gerais + 40 específicos, cronômetro 3h, **corte de eliminação 50%/50%**), por disciplina e personalizado; navegação por grade de questões; correção ponderada (pesos 1/2); resultado por bloco + por disciplina + gabarito comentado; histórico clicável. Respostas alimentam dashboard e caderno de erros.
**Verificado:** typecheck (node+web) + build verdes.

---

## BLOCO B — Inteligência de desempenho

### M8 — Estatísticas Avançadas ✅ (concluído 2026-06-23)
Radar por disciplina; evolução de 30 dias; acerto por dificuldade; **prontidão para a prova** ponderada pelos pesos (20/80); pontos fortes/fracos.

### M9 — Metas & Gamificação ✅ (concluído 2026-06-23)
**XP, níveis, streak, 9 conquistas** desbloqueáveis; meta diária de questões; XP concedido nos fluxos de questões/revisão/simulado.

### M10 — Planejamento Automático ✅ (concluído 2026-06-23)
Cronograma automático até a prova ponderado por peso × incidência (teoria/questões/revisão + simulado semanal); checklist por dia com progresso; **replanejamento** (refazer plano).

### M11 — Modo Aprovação ✅ (concluído 2026-06-23)
Prioriza fraqueza × peso (top 6) com motivo por disciplina; estimativa de aprovação + dias; plano de ataque do dia navegável para as áreas certas.

---

## BLOCO C — IA & entrega

### M12 — IA Tutor ✅ (concluído 2026-06-23)
`aiService` com provedor configurável (anthropic / openai-compatível) via chave do usuário; chat com histórico, sugestões e system prompt do concurso; degrada graciosamente sem chave. **Liga ao inserir a chave em Configurações.**

### M14 — Plataforma multi-concurso ✅ (concluído 2026-06-24)
Refatoração de arquitetura (ADR-010): agregado central **Contest** com `exam_config` (estrutura da prova como dados); padrão **Active Contest** (handlers resolvem e injetam o escopo; camadas de domínio agnósticas); `disciplines` e demais entidades vinculadas ao concurso (migração **v4** com rebuild seguro + backfill, **zero perda de dados** — verificado no banco real); seed vira **registro de concursos** (adicionar concurso = cadastrar dados); UI com textos/labels dinâmicos e seletor de concurso (aparece com >1). SEDES DF 2026 é o primeiro concurso cadastrado. Nenhuma funcionalidade, layout ou dado alterado.
**Verificado:** typecheck (node+web) + build verdes; boot aplica v4; inspeção do banco: 18 disciplinas e 151 questões vinculadas, 17 respostas e 9 erros preservados, `foreign_key_check` limpo.

### M13 — Hardening & empacotamento ✅ (concluído 2026-06-23)
**Backup export/import** do banco (.db) via diálogos nativos (com checkpoint do WAL e reinício no import); `electron-builder` (instalador NSIS Windows) com **autoria/propriedades em nome de Tarso Hebert** (`copyright` + `publisherName`); `npmRebuild: false` (usa o rebuild do @electron/rebuild).

---

## Ordem ideal
```
M0 → M1 → M2 → M3 → M4 → M5 → M6 → M7   (MVP usável diariamente)
        └ fundação ┘   └──── uso diário + treino ────┘
→ M8 → M9 → M10 → M11   (inteligência de desempenho)
→ M12 → M13             (IA + empacotamento)
```

## Débitos conscientes
| Débito | Resolver até |
|---|---|
| Conteúdo programático exato do PDF oficial (vs. estimativas) | M1+ (ingestão do PDF) |
| Banco de questões real (provas Quadrix anteriores) | M3+ |
| IA só liga com chave do usuário | M12 |
| Instalador/empacotamento | M13 |
