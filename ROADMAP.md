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

### M4 — Caderno de Erros ⬜
Registro automático de erros; filtros; classificar tipo de erro; "revisar como quiz"; marcar compreendido. Gera flashcards/itens de revisão.

### M5 — Flashcards & Decks ⬜
CRUD de decks/cards; geração automática (por disciplina, por questão errada); modo flip.

### M6 — Revisão Espaçada (FSRS) ⬜
Integra `ts-fsrs`; `SrsCard`; fila diária; avaliação (Errei/Difícil/Bom/Fácil); integra erros e flashcards; estatística de retenção.
**Pronto quando:** card avaliado hoje reaparece na data correta.

### M7 — Simulados Inteligentes ⬜
Gerar simulados (geral, por disciplina/tópico, por dificuldade); **modo oficial Quadrix** (60q, peso 2 nos específicos, cronometrado, corte de eliminação); modo livre; resultado detalhado + histórico.

---

## BLOCO B — Inteligência de desempenho

### M8 — Estatísticas Avançadas ⬜
Radar por disciplina; curva de aprendizado; evolução semanal/mensal; **probabilidade de aprovação estimada** (modelo a partir de acertos por bloco × pesos × corte); tempo ideal de revisão.

### M9 — Metas & Gamificação ⬜
Metas diárias/semanais/mensais; **XP, níveis, medalhas, conquistas, streak**; feedback motivacional.

### M10 — Planejamento Automático ⬜
Cronograma automático dos 75 dias a partir do edital + pesos + tempo disponível; sessões planejadas vs. realizadas; **replanejamento** quando o usuário falha/atrasa.

### M11 — Modo Aprovação ⬜
Modo agressivo até a prova: prioriza fraquezas × peso estatístico (específicos primeiro), sem deixar gerais < corte; plano diário focado em maior retorno.

---

## BLOCO C — IA & entrega

### M12 — IA Tutor ⬜
`AiService` (provedor configurável por chave do usuário); chat de dúvidas; gerar resumos, mapas mentais, flashcards automáticos; explicações alternativas; degrada sem chave.

### M13 — Hardening & empacotamento ⬜
Testes dos caminhos críticos (FSRS, correção, estatísticas); **backup export/import** (.db/JSON); `electron-builder` (instalador NSIS Windows); ícones/branding; otimização.

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
