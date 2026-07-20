# CONTEÚDO — cobertura da base de estudo

> Relatório de cobertura da biblioteca de conteúdo (M26 · IBGE premium: 100% dos tópicos cobertos).
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

## Cobertura por concurso (após M26)

| Concurso | Tópicos | Cobertura de conhecimento | Knowledge | Questões | Flashcards | Relações |
|---|---|---|---|---|---|---|
| **SEDES DF** | 93 | 23% | 112 | 162 | 15 | 36 |
| **ABGF (E05 TI)** | 180 | 15% | 123 | 75 | 49 | 45 |
| **DATAPREV (Perfil 2)** | 133 | 26% | 198 | 59 | 50 | 80 |
| **IBGE — ACS** | 41 | **100%** | 137 | 38 | 54 | 20 |
| **IBGE — ACA** | 32 | **100%** | 103 | 27 | 44 | 11 |
| **Total** | 479 | — | **673** | **361** | **212** | **192** |

### IBGE premium (M26) — todos os tópicos cobertos

Diagnóstico por tópico (script `ibge-diag`) guiou a expansão. **Nenhum tópico
vazio** nos dois cargos: ACS 41/41 e ACA 32/32 com conhecimento. Cobertura por
disciplina — todas em 100%:

| Cargo | Disciplina | Tópicos | K | Q | F |
|---|---|---|---|---|---|
| ACS | Adm/Situações Gerenciais | 13 | 45 | 12 | 15 |
| ACS | Conhecimentos Técnicos | 4 | 14 | 4 | 5 |
| ACS | Língua Portuguesa | 17 | 57 | 14 | 24 |
| ACS | Raciocínio Lógico Quant. | 7 | 21 | 8 | 10 |
| ACA | Noções de Administração | 8 | 25 | 12 | 16 |
| ACA | Língua Portuguesa | 17 | 57 | 9 | 20 |
| ACA | Raciocínio Lógico Quant. | 7 | 21 | 6 | 8 |

LP e RLQ são compartilhados por slug entre os dois cargos (autorados uma vez).
Idempotência comprovada: 2º boot → contagens idênticas, zero duplicação.

### IBGE 2026 — dois cargos (M25)

Modelado como **dois contests** (mesmo padrão ABGF/DATAPREV: um contest por
cargo, pois ACS e ACA têm provas diferentes). **Língua Portuguesa e Raciocínio
Lógico Quantitativo são idênticos no Anexo IV** → autorados uma vez e
compartilhados por slug (`lingua-portuguesa`/`raciocinio-logico`), com o fator
multiConcurso (M16) ativo automaticamente.

| Cargo | Bloco específico | Cobertura do específico |
|---|---|---|
| **ACS** (Supervisor) | Adm/Situações Gerenciais 20q + Conhecimentos Técnicos 15q | 69% / **100%** |
| **ACA** (Administrativo) | Noções de Administração 35q | **100%** |

Decisão documentada: o conhecimento é anexado ao **tópico-pai** (ex.: a
"Significação das palavras" cobre sinônimos/antônimos/homônimos/parônimos no
próprio corpo), evitando duplicar entradas em cada subtópico-folha — por isso a
cobertura por tópico-folha da RLQ/LP fica abaixo de 100% sem que haja lacuna de
conteúdo.

## IBGE 2026 — Agente Censitário Supervisor (novo concurso, M24)

Banca **IBFC**; Edital 01/2026 (retificado); Censo Agropecuário; contratação
temporária (Lei 8.745/1993); R$ 3.858,00; 40h/sem; prova 60 questões (28–30/09/2026),
aprovação ≥18 pts e ≥1 pt por disciplina. Disciplinas cadastradas:

| Disciplina | Questões na prova | Cobertura K |
|---|---|---|
| Noções de Administração/Situações Gerenciais | 20 | 54% |
| Conhecimentos Técnicos (Censo) | 15 | 50% |
| Língua Portuguesa | 15 | 18% |
| Raciocínio Lógico Quantitativo | 10 | 14% |

## Crescimento

**Carga 1 (M23):** +77 conhecimentos, +29 questões, +35 flashcards, +10 relações.

**M24 (IBGE ACS + expansão de Engenharia de Software):** +95 conhecimentos, +38 questões, +46 flashcards, +16 relações.

**M25 (IBGE completo — cargo ACA + completude do ACS):**

| Métrica | Antes (M24) | Depois (M25) | Δ |
|---|---|---|---|
| knowledge_entries | 480 | 578 | **+98** |
| questions | 313 | 340 | **+27** |
| flashcards | 131 | 176 | **+45** |
| topic_relations | 169 | 178 | **+9** |

Destaque M25: **IBGE agora cobre os dois cargos (ACS e ACA)** de ponta a ponta
nos blocos específicos (Adm/Situações Gerenciais, Conhecimentos Técnicos,
Noções de Administração — 69–100%) e completa Português/RLQ compartilhados.
5 concursos ativos na plataforma.

Destaques M24: novo concurso **IBGE ACS** (47 K · 17 Q · 17 F · 8 R) e a
disciplina **Engenharia de Software** praticamente completada na ABGF (0%→
todos os tópicos técnicos cobertos: SDLC, padrões, DDD, microsserviços, APIs,
APF, fundamentos de linguagens) e reforçada na DATAPREV (ciclo de vida,
metodologias, qualidade, requisitos, análise/projeto OO).

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
