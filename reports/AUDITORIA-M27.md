# M27 — Auditoria Completa da Biblioteca de Conteúdo (relatório final)

> **Somente auditoria** — nenhuma engine, arquitetura, migration ou conteúdo
> foi alterado. Todos os números são absolutos, lidos direto do banco.
> Reproduzir: `./node_modules/.bin/electron scripts/audit.cjs`
> Gera: `questions-report.md`, `knowledge-report.md`, `flashcards-report.md`,
> `coverage-report.md` (nesta pasta). **Data:** 2026-07-20.

## Totais (banco real)

| Métrica | Total |
|---|---|
| Concursos (contests) | 5 (SEDES, ABGF, DATAPREV, IBGE-ACS, IBGE-ACA) |
| Conhecimentos (knowledge_entries) | 673 |
| Questões | 361 |
| Flashcards | 212 |
| Relações (topic_relations) | 192 |
| Decks | 20 |

## 1–2. Questões e Conhecimentos por concurso/disciplina/tópico
Ver `questions-report.md` e `knowledge-report.md` (árvore completa
concurso → disciplina → tópico → subtópico, em números absolutos).

## 3. Flashcards — decks e o diagnóstico do IBGE

Ver tabela completa em `flashcards-report.md` (deck_id, contest_id, deck,
disciplina, cards, com-srs, sem-topic_id).

**Por que os flashcards do IBGE "não aparecem" na UI — causa EXATA (comprovada):**
rodando a query idêntica de `listDecks(contestId)`:

- `listDecks(4)` [ibge-2026 / ACS] → **6 decks, 54 cards** (todos com srs, todos due).
- `listDecks(5)` [ibge-2026-aca / ACA] → **3 decks, 44 cards** (todos com srs, todos due).

Os decks e cards do IBGE **existem e a query os retorna corretamente**. Não é
deck órfão, deck vazio, rota errada, consulta errada nem bug de UI/SQL.

A causa é o **padrão Active Contest (ADR-010)**: as telas Flashcards, Conteúdo,
Dashboard, Plano e Simulados mostram **somente o concurso ATIVO**
(`settings.active_contest_id`). O IBGE está modelado em **dois contests**
(ACS = `ibge-2026`, ACA = `ibge-2026-aca`); cada um exibe apenas os seus decks.
No momento da auditoria o concurso ativo era **`sedes-df-2026`** → por isso a
tela de Flashcards mostrava os decks do SEDES, não os do IBGE.

**Solução (usuário):** trocar o concurso ativo no seletor da sidebar para o
cargo IBGE desejado. **Não há correção de código** — é comportamento por design.
(Ponto de evolução, se um dia desejado: um modo "todos os concursos" — mas isso
seria nova funcionalidade, fora do escopo desta sprint.)

## 4. FSRS (fila de revisão)

| Verificação | Resultado |
|---|---|
| Todos os flashcards têm `srs_card`? | **Sim** — 0 sem srs_card |
| Todos têm deck? | **Sim** — 0 flashcards órfãos |
| Todos têm contest? | **Sim** — via deck→contest, 100% |
| Todos têm topic? | topic_id é **opcional**; alguns cards não têm (não impede a fila nem a tela) |
| Todos entram na fila? | **Sim** — 212/212 têm srs_card; cards recém-semeados entram como `due = agora` |
| Aparecem na tela? | Sim, **na tela do concurso ativo** (item 3) |

## 5. Interface — o que cada tela mostra

Todas as telas são **escopadas pelo concurso ativo** (padrão Active Contest):

| Tela | Fonte | Mostra |
|---|---|---|
| Flashcards | `listDecks(activeContestId)` | decks do concurso ativo |
| Conteúdo | `getDisciplines(activeContestId)` → árvore de tópicos | conhecimento do concurso ativo |
| Dashboard | `getDashboardOverview(activeContest)` | visão do concurso ativo |
| Plano do Dia | `getDailyPlan(activeContest)` | ranking/plano do concurso ativo |
| Tutor IA | `getActiveContest()` + contexto | contexto do concurso ativo |
| Simulados | `createMockExam(activeContest)` (modo OFICIAL usa `exam_config`) | prova do concurso ativo |

→ **Todo o conteúdo do IBGE aparece** quando um cargo do IBGE é o concurso ativo.
Nenhuma tela deixa de mostrar conteúdo por bug; é sempre o filtro por concurso.

## 6. Banco — órfãos e inconsistências

| Item | Qtde | Situação |
|---|---|---|
| knowledge órfãos (tópico inexistente) | 0 | ✅ |
| questões com `topic_id` inválido | 0 | ✅ |
| questões com `discipline_id` inválido | 0 | ✅ |
| flashcards órfãos (deck inexistente) | 0 | ✅ |
| srs_cards órfãos | 0 | ✅ |
| relações órfãs | 0 | ✅ |
| `foreign_key_check` | vazio | ✅ |
| **questões SEM `topic_id`** | **1** | ⚠️ `q#52` (SEDES, "Marcos Normativos") — some da árvore de tópicos, mas aparece no Banco de Questões por disciplina. Causa: o campo `topic` do seed não casou com nenhum nome de tópico. |
| **decks vazios (0 cards)** | **1** | ⚠️ deck `#1 "TESTE"` (SEDES) — criado manualmente pela UI (não é do seed). É dado do usuário; não deve ser removido automaticamente. |
| **tópicos sem nenhuma ligação** (k/q/f/rel) | **145** | ⚠️ tópicos/subtópicos vazios de SEDES/ABGF/DATAPREV (o IBGE tem 0). Não é bug — é lacuna de conteúdo (ver item 7). |

## 7. Cobertura REAL (métrica ponderada, não "1 registro")

Cada tópico é pontuado (máx **11**): Resumo=2, Conceito=1, Observações/Exemplos=1,
Pegadinha=1, Dica=1, Palavra-chave=1, Mapa/Legislação=1, tem Flashcard=2, tem Questão=2.
Classes: **VAZIO**=0 · **FRACO** 1–4 · **BOM** 5–7 · **COMPLETO** 8–11.

**Distribuição global dos tópicos:** VAZIO=204 · FRACO=123 · BOM=33 · **COMPLETO=119**.

Destaques (ver `coverage-report.md` para o detalhe por tópico):
- **IBGE é o mais completo:** ACS — Adm/Situações Gerenciais 12 COMPLETO; Conhecimentos Técnicos 4 COMPLETO; ACA — Noções de Administração 8 COMPLETO; LP-ACA 12 COMPLETO. IBGE tem **0 tópicos VAZIO**.
- **VAZIO concentra-se em ABGF** (ex.: LP 18 vazios, Direito 11 vazios) e em disciplinas não expandidas de SEDES/DATAPREV.

## Relatório final — respostas diretas

**Onde faltam QUESTÕES** (tópicos com conhecimento, mas Q=0 ou baixo):
- IBGE: alguns subtópicos-folha de LP/RLQ (têm conhecimento, ainda sem questão própria — a questão está no tópico-pai).
- ABGF (Conhecimentos Gerais: Inglês, Direito, Sustentabilidade/ASG, Análise de Dados) e várias disciplinas de TI têm 2–4 questões só.
- SEDES/DATAPREV: os 145 tópicos "sem ligação" precisam de questões.

**Onde faltam FLASHCARDS:**
- SEDES tem só 15 flashcards (3 decks); muitos tópicos sem card.
- ABGF/DATAPREV: cards concentrados em poucas disciplinas; os tópicos "sem ligação" não têm card.
- IBGE: bem servido (98 cards nos 2 cargos); faltam apenas em alguns subtópicos-folha.

**Onde a UI NÃO está mostrando conteúdo:**
- Em lugar nenhum por bug. Toda tela é escopada pelo **concurso ativo**. O
  conteúdo do IBGE (inclusive flashcards) aparece ao ativar um cargo do IBGE.
  A percepção de "IBGE some" vem de o concurso ativo estar em outro concurso.

**Inconsistências:**
- `q#52` (SEDES) sem `topic_id` (mismatch de nome de tópico no seed).
- Deck `#1 "TESTE"` vazio (dado do usuário).

**Bugs:**
- **Nenhum bug de código encontrado.** Banco íntegro (0 órfãos, fk_check limpo),
  seed idempotente, queries corretas. O "sumiço" dos flashcards do IBGE é
  comportamento por design (escopo por concurso ativo), não defeito.
