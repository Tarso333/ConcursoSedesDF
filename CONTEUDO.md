# CONTEÚDO — cobertura da base de estudo

> Relatório de cobertura da biblioteca de conteúdo (M23 · carga 1).
> Gerado com `./node_modules/.bin/electron scripts/content-coverage.cjs`
> (dev tool **somente leitura** sobre o banco, sem armazenamento paralelo).
> **Última atualização:** 2026-07-16.

## Como a plataforma armazena conteúdo

Todo o conteúdo usa **exclusivamente as engines existentes** — nenhuma tabela
nova, nenhum armazenamento paralelo:

- **Conhecimento** → `knowledge_entries` (Knowledge Engine, M15), tipado por
  `kind` (RESUMO, CONCEITO, DICA, PEGADINHA, LEGISLACAO, PALAVRA_CHAVE, …).
- **Questões** → `questions` + `question_options` (Question Engine), idempotentes
  por `seed_key`.
- **Flashcards** → `flashcards` + `srs_cards` (entram na fila **FSRS**, M6).
- **Relações** → `topic_relations` (Relationship Engine, M18), idempotentes por
  (origem, destino, tipo).

Idempotência: o conhecimento é semeado **por tópico** (só entra se o tópico
ainda não tem conteúdo); questões por `seed_key`; decks por nome; relações pela
tripla. Rodar o seed N vezes não duplica nada.

## Cobertura por concurso (após a carga 1 de conteúdo)

| Concurso | Tópicos | Cobertura de conhecimento | Knowledge | Questões | Flashcards | Relações |
|---|---|---|---|---|---|---|
| **SEDES DF** | 93 | 23% | 112 | 162 | 15 | 36 |
| **ABGF (E05 TI)** | 180 | 11% | 92 | 59 | 28 | 39 |
| **DATAPREV (Perfil 2)** | 133 | 23% | 181 | 54 | 42 | 78 |
| **Total** | 406 | — | **385** | **275** | **85** | **153** |

## Crescimento na carga 1 (M23)

| Métrica | Antes | Depois | Δ |
|---|---|---|---|
| knowledge_entries | 308 | 385 | **+77** |
| questions | 246 | 275 | **+29** |
| flashcards | 50 | 85 | **+35** |
| topic_relations | 143 | 153 | **+10** |

Destaques: **o SEDES saiu de 0 para 15 flashcards** (antes não tinha nenhum) e
teve a cobertura de conhecimento dobrada (11% → 23%); o **ABGF** ganhou os
primeiros centros de conhecimento nas disciplinas de TI (Engenharia de Software
e Dados/ML/IA), antes em 0%.

## Disciplinas ainda incompletas — prioridades da próxima carga

O ranking de pobreza (gerado pelo script) aponta, em ordem, os alvos da carga 2:

**ABGF (E05 TI) — maior lacuna relativa:**
1. Conhecimentos Gerais ainda em 0%: Língua Portuguesa, Língua Inglesa,
   Raciocínio Lógico, Direito Const./Adm., Sustentabilidade/ASG.
2. TI a completar: Engenharia de Software (SDLC, Padrões de Projeto, DDD,
   Microsserviços, Integração/APIs, APF ainda sem conhecimento) e Dados/ML/IA
   (análise exploratória, estatística, aprendizado supervisionado/não
   supervisionado, métricas, MLOps, visualização).

**SEDES DF:**
1. Instrumentos Socioassistenciais do DF, Programas Socioassistenciais e
   Regime Jurídico (ampliar além dos tópicos já cobertos).
2. Flashcards por disciplina específica (hoje concentrados em 2 decks).

**DATAPREV (Perfil 2):**
1. Já é o mais coberto em conhecimento (23%); a próxima carga foca **questões**
   e **flashcards** por subtópico e, no futuro, o **Módulo I (CG)** — Português,
   Inglês, RLM, Atualidades/IA, Legislação de SI/LGPD (Fase 2 do edital).

## Nota de honestidade sobre volume

As metas desta sprint eram muito altas (+900 conhecimentos, +1050 questões,
+1350 flashcards no total). Esta é a **carga 1**: prioriza **qualidade
banca-específica** (Quadrix/FCC/FGV, com justificativa da correta e das
incorretas) e o preenchimento das **maiores lacunas** (disciplinas em 0% e a
ausência total de flashcards no SEDES), conforme o próprio pedido ("a qualidade
é mais importante que atingir exatamente esses números"). O caminho para as
próximas cargas está priorizado acima e é 100% incremental e idempotente.
