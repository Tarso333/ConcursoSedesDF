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

### M19 — Carga de conteúdo: concurso ABGF 2026 ✅ (concluído 2026-07-09)
**Primeira grande carga da plataforma — só dados, zero mudança em engines/migrations** (prova viva do M14–M18). **ABGF 2026** (FCC; E05 Analista TI; prova 27/09/2026; Brasília/DF; R$ 8.000) cadastrada a partir do **edital oficial analisado integralmente** (PDF extraído via script Node/zlib; Anexo IV literal). 17 disciplinas (9 CG + 8 CE de TI), **180 tópicos (52 subtópicos)** fiéis ao edital, 52 questões estilo FCC 100% vinculadas a tópico, 62 blocos de conhecimento (13 centros), **36 relações no grafo** (trilhas redes→nuvem→DevOps, SGBD→SQL→analytics, segurança CG↔CE, FGE→SCE), 2 decks iniciais (20 flashcards na fila FSRS). Extensões **de formato de seed** (dados): tópicos aninhados (`SeedTopic`) e `starterDecks`. Decisões de ambiguidade documentadas em `seed/contests/abgf/index.ts` (habilitação FCC padronizada → proxy 50%/bloco + alvo 65%; discursiva fora do simulado objetivo; incidência por disciplina estimada; sinergia deliberada de slugs com o SEDES). Simulado oficial, Plano do Dia, heatmap e grafo funcionam para a ABGF **automaticamente**; fator multiConcurso ativo (Português e Direito compartilhados).
**Verificado:** 44/44 testes · typecheck + build verdes · boot semeia tudo · SEDES intacto · fk_check limpo.

### M20 — Carga de conteúdo: DATAPREV 2026 · Fase 1 (núcleo técnico) ✅ (concluído 2026-07-15)
**Terceiro concurso da plataforma — só dados, zero mudança em engines/migrations.** **DATAPREV 2026** (FGV; Analista de TI — Perfil 2: Arquitetura, Engenharia e Sustentação Tecnológica; prova 11/10/2026 13h–17h; 30 vagas + 183 CR) cadastrada a partir do **edital oficial nº 001/2026 analisado integralmente** (PDF extraído via script Node/zlib; seção do Perfil 2 literal). **Fase 1 = núcleo técnico**: somente as 5 disciplinas de Conhecimentos Específicos (Redes, Banco de Dados, Arquitetura Tecnológica, Nuvem/Virtualização, Linguagens/Frameworks) — **59 tópicos + 74 subtópicos (133 nós)** fiéis ao edital; **181 blocos de conhecimento em 30 centros** (resumos, conceitos, pegadinhas FGV, palavras-chave); **76 relações no grafo** com justificativa técnica (HTTP→REST→APIs, Docker→Kubernetes, modelagem→normalização, SQL→otimização, mensageria→microsserviços, VLAN→NSX); **43 questões estilo FGV** (5 alternativas, 100% vinculadas a tópico, com comentário); 2 decks (30 flashcards na fila FSRS). `exam_config` real (CG 40×1,0 + CE 30×2,5 = 115 pts; corte 57,5). Decisões de ambiguidade documentadas em `seed/contests/dataprev/index.ts` (Fase 1 só CE; duração derivada do horário; incidência estimada; DevSecOps separado do item 24; sinergia deliberada de slugs com a ABGF — multiConcurso ativo em BD/EngSoft/Nuvem). **Fase 2 (pendente)**: Módulo I — Língua Portuguesa (12q), Língua Inglesa (12q), Raciocínio Lógico Matemático (5q), Atualidades e IA (6q), Legislação de SI e Proteção de Dados (5q).
**Verificado:** 44/44 testes · typecheck + build verdes · boot semeia tudo sem avisos · SEDES e ABGF intactos · fk_check limpo.

### M18 — Relationship Engine (Grafo de Aprendizagem) ✅ (concluído 2026-06-25)
O edital vira **grafo** (ADR-014, doc em `GRAPH.md`): entidade `topic_relations` (8 tipos fortemente tipados, força, direção, nota — migração v6 aditiva); módulo **neutro e puro** `src/main/graph/` (navegação, ciclos, ordenação topológica, desbloqueio, centralidade, gargalos, cadeias — **14 testes**; total 44). Nenhuma engine é dona: M15 consome (conexões no tópico, 🔓 desbloqueio ao dominar, visualização **Lista|Grafo**), M16 consome (fator `grafo`: "concluir aqui destrava N tópicos"), M17 consome (mais conectados, gargalos, cadeias + cobertura). Relações do SEDES = dados (31 arestas autoradas, seed idempotente); ABGF/DATAPREV entrarão sem alteração estrutural.
**Verificado:** 44/44 testes · typecheck + build verdes · boot aplica v6 e semeia 31 relações · dados do usuário intactos · fk_check limpo.

### M17 — Learning Analytics Engine ✅ (concluído 2026-06-25)
A plataforma passa a **entender como o usuário aprende** (ADR-013, doc em `ANALYTICS.md`): zero tabela nova — métricas são **projeções por replay** do event log existente. Modelo central de domínio derivado (recência 21d × volume × retenção 30d) gera domínio atual, **curva de aprendizado** (replay) e **curva de esquecimento** (projeção) com uma única função. Métricas: tendência, retenção, estabilidade, velocidades (aprendizagem/resolução), acerto móvel 7/15/30d, consistência, cobertura, confiança (declarado × derivado), eficiência por método. **Learning Profile** calculado (5 traços). Registro de indicadores Open/Closed. **15 testes unitários** (total do projeto: 29). Visualização: cards no Dashboard + seção completa nas Estatísticas (curvas, **heatmap do edital** expansível, perfil, confiança). Integração M16: `masteryPct` da previsão agora é consciente de esquecimento.
**Verificado:** 29/29 testes · typecheck + build verdes · boot OK · nenhuma migração (dados intactos por construção).

### M16 — Motor de Estratégia de Estudos ✅ (concluído 2026-06-24)
**Study Strategy Engine** (ADR-012, doc completa em `STRATEGY.md`): núcleo puro e determinístico (`strategy/engine.ts`) que gera o **Plano do Dia** a partir de um snapshot de 15 sinais; fórmula = **registro de 12 fatores** com pesos editáveis (`config.ts`), score 0..100 decomposto e justificado por recomendação (explicabilidade estrutural); alocação de blocos 15–45min; FSRS como candidato; impacto esperado e previsão de conclusão do edital. **14 testes unitários (vitest)**. Tela **Plano do Dia** (`/plano`) + integrações: Dashboard (top 3), Estatísticas (ranking), Modo Aprovação e Planejamento agora consomem o mesmo ranking (fonte única). Sem IA, sem rede; ABGF/DATAPREV entrarão sem alterar o motor.
**Verificado:** 14/14 testes verdes · typecheck + build verdes · boot OK.

### M15 — Engine de Conhecimento ✅ (concluído 2026-06-24)
Cada tópico vira um **centro de conhecimento** (ADR-011): `knowledge_entries` (blocos tipados: resumo md, conceitos, legislação, jurisprudência, dicas, pegadinhas, palavras-chave, links/vídeos/PDFs; MAPA_MENTAL reservado) + **`topic_progress`** (progresso do usuário, separado do conteúdo) + `flashcards.topic_id`. Migração **v5** aditiva. Tela **Conteúdo**: disciplinas → árvore de tópicos/subtópicos (status + contadores) → painel com seções por tipo (registry Open/Closed), seletor de status e estatísticas derivadas; mini-renderizador de markdown offline. Seed de conhecimento no registro de concursos (10 tópicos-chave do SEDES, 65 blocos), idempotente por tópico.
**Verificado:** typecheck + build verdes; boot aplica v5; 65 entradas em 10 tópicos, 8 tipos, dados do usuário intactos, `foreign_key_check` limpo. Fora de escopo (próximas evoluções): edição de conteúdo na UI, importador de edital, geração por IA.

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
