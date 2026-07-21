# Auditoria de FLASHCARDS

Concurso ATIVO (settings.active_contest_id): **1** — SEDES DF 2026 (sedes-df-2026)

## Decks existentes

| deck_id | contest_id | concurso | deck | disciplina | cards | com srs | sem topic_id |
|---|---|---|---|---|---|---|---|
| 1 | 1 | sedes-df-2026 | TESTE | Língua Portuguesa | 0 | 0 | 0 |
| 6 | 1 | sedes-df-2026 | SEDES — Assistência Social essencial | Organização da Assistência Social (SUAS) | 8 | 8 | 0 |
| 7 | 1 | sedes-df-2026 | SEDES — Administrativo e DF | Regime Jurídico dos Servidores do DF | 7 | 7 | 0 |
| 2 | 2 | abgf-2026 | TI — Siglas e conceitos-chave (ABGF) | Segurança da Informação e Cibersegurança | 12 | 12 | 0 |
| 3 | 2 | abgf-2026 | ABGF, garantias e integridade (essencial) | Noções de Economia, Finanças Públicas, Sistema Financeiro, Garantias e Crédito à Exportação | 8 | 8 | 0 |
| 8 | 2 | abgf-2026 | ABGF — Engenharia de Software e Dados/IA | Engenharia de Software | 8 | 8 | 0 |
| 10 | 2 | abgf-2026 | ABGF — Engenharia de Software (expansão) | Engenharia de Software | 21 | 21 | 0 |
| 4 | 3 | dataprev-2026 | DATAPREV — Redes, Nuvem e Sustentação | Computação em Nuvem e Virtualização | 14 | 14 | 0 |
| 5 | 3 | dataprev-2026 | DATAPREV — Engenharia, Dados e Java | Arquitetura Tecnológica | 16 | 16 | 0 |
| 9 | 3 | dataprev-2026 | DATAPREV — Simulado relâmpago (Perfil 2) | Arquitetura Tecnológica | 12 | 12 | 0 |
| 11 | 3 | dataprev-2026 | DATAPREV — Arquitetura Tecnológica (expansão) | Arquitetura Tecnológica | 8 | 8 | 0 |
| 12 | 4 | ibge-2026 | IBGE ACS — Administração & Gestão | Noções de Administração/Situações Gerenciais | 9 | 9 | 0 |
| 13 | 4 | ibge-2026 | IBGE ACS — Português, RLQ e Censo | Língua Portuguesa | 8 | 8 | 0 |
| 14 | 4 | ibge-2026 | IBGE — Português & RLQ (compartilhado) | Língua Portuguesa | 12 | 12 | 0 |
| 15 | 4 | ibge-2026 | IBGE ACS — Fundamentos & Censo (complemento) | Conhecimentos Técnicos | 5 | 5 | 0 |
| 18 | 4 | ibge-2026 | IBGE — Português & RLQ (aprofundamento) | Língua Portuguesa | 16 | 16 | 0 |
| 19 | 4 | ibge-2026 | IBGE ACS — Funções administrativas (detalhe) | Noções de Administração/Situações Gerenciais | 4 | 4 | 0 |
| 16 | 5 | ibge-2026-aca | IBGE — Português & RLQ (compartilhado) | Língua Portuguesa | 12 | 12 | 0 |
| 17 | 5 | ibge-2026-aca | IBGE ACA — Noções de Administração | Noções de Administração | 16 | 16 | 0 |
| 20 | 5 | ibge-2026-aca | IBGE — Português & RLQ (aprofundamento) | Língua Portuguesa | 16 | 16 | 0 |

## Auditoria FSRS

- Flashcards totais: 212
- Flashcards SEM srs_card: 0 ✅
- Flashcards SEM deck (órfãos): 0 ✅
- Flashcards SEM topic_id: 0 (topic_id é OPCIONAL — não impede exibição)
- Cards na fila (due <= agora): 212

### Flashcards por concurso (via deck→contest)

| concurso | decks | cards | com srs |
|---|---|---|---|
| SEDES DF 2026 | 3 | 15 | 15 |
| ABGF 2026 | 4 | 49 | 49 |
| DATAPREV 2026 | 4 | 50 | 50 |
| IBGE 2026 — Censo Agropecuário | 6 | 54 | 54 |
| IBGE 2026 — Censo (ACA) | 3 | 44 | 44 |

## Diagnóstico: por que os flashcards do IBGE "não aparecem" na UI

Prova: rodando a query EXATA de `listDecks(contestId)` (deckRepository.ts) para cada contest do IBGE:

- `listDecks(4)` [ibge-2026] → **6 decks**, 54 cards: IBGE ACS — Administração & Gestão (9); IBGE ACS — Fundamentos & Censo (complemento) (5); IBGE ACS — Funções administrativas (detalhe) (4); IBGE ACS — Português, RLQ e Censo (8); IBGE — Português & RLQ (aprofundamento) (16); IBGE — Português & RLQ (compartilhado) (12)
- `listDecks(5)` [ibge-2026-aca] → **3 decks**, 44 cards: IBGE ACA — Noções de Administração (16); IBGE — Português & RLQ (aprofundamento) (16); IBGE — Português & RLQ (compartilhado) (12)

**CONCLUSÃO (comprovada):** os decks e cards do IBGE EXISTEM e a query `listDecks` os RETORNA corretamente. Não há deck órfão, deck vazio do IBGE, rota errada, consulta errada nem bug de UI/SQL.

A causa é o **padrão Active Contest (ADR-010)**: a tela Flashcards (e Conteúdo, Dashboard, Plano, Simulados) mostra SOMENTE o concurso ATIVO. Como o IBGE está modelado em DOIS contests (ACS = ibge-2026, ACA = ibge-2026-aca), cada um exibe apenas os SEUS decks. O concurso ativo atual é **1 (sedes-df-2026)**. Os flashcards do IBGE aparecem quando o concurso ativo é um cargo do IBGE — e mostram apenas os decks daquele cargo. Se, no momento em que foram observados como "ausentes", o concurso ativo era outro (SEDES/ABGF/DATAPREV ou o outro cargo do IBGE), é esperado que não apareçam. **Solução para o usuário: trocar o concurso ativo no seletor da sidebar para o cargo IBGE desejado.** Não há correção de código a fazer (comportamento por design).
