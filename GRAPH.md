# GRAPH — Relationship Engine (Grafo de Aprendizagem)

> O edital deixa de ser lista: tópicos se relacionam num **grafo tipado** (M18).
> Determinístico, offline. Código: [`src/main/graph/`](./src/main/graph) ·
> Testes: `engine.test.ts` · Dados: `topic_relations` (migração v6)

---

## 1. Propriedade do grafo (princípio central)

**Nenhuma engine é dona do grafo.** O módulo `src/main/graph/engine.ts` é
**puro e neutro** (sem DB/Electron); `relationRepository` é o único acesso a
dados. As engines apenas **consomem**:

| Consumidor | O que consome |
|---|---|
| **Conhecimento (M15)** | conexões do tópico (pré-requisitos, relacionados, próximos, dependentes); desbloqueio ao dominar; árvore navegável (Lista \| Grafo) |
| **Estratégia (M16)** | fator `grafo` no registro: alavancagem = tópicos prontos + destravamentos ("estudar Docker aumenta o retorno de Kubernetes") |
| **Analytics (M17)** | mais conectados (centralidade), gargalos, cadeias de aprendizado + cobertura por cadeia |
| **Futuro** | importador de edital gravará `topic_relations`; Tutor IA lerá conexões como contexto |

## 2. Entidade `topic_relations` (fortemente tipada, sem campos genéricos)

`source` · `target` · `kind` · `strength (0..1)` · `bidirectional` · `note?`

| Kind | Direção | Semântica |
|---|---|---|
| `PRE_REQUISITO` | → | origem vem **antes** do destino (origem destrava destino) |
| `DEPENDE_DE` | → | origem depende do destino ⇒ **destino vem antes** |
| `CONTINUIDADE` | → | destino é a continuação natural |
| `REVISAO_RECOMENDADA` | → | ao estudar a origem, revisar o destino |
| `COMPLEMENTA` / `ESTUDADO_JUNTO` / `SEMELHANTE` / `RELACIONADO` | ↔ | simétricas |

A semântica direcional é resolvida **no módulo de grafo** (`gatingEdges`
normaliza `DEPENDE_DE`); os dados ficam exatamente como autorados.

## 3. Algoritmos puros (todos determinísticos e testados)

- **Navegação**: `prerequisitesOf`, `dependentsOf`, `nextOf`, `relatedOf`
- **Ciclos**: `detectCycles` (DFS colorido nas arestas de sequência)
- **Ordenação**: `topologicalOrder` (Kahn, tolerante a ciclos, desempate por id)
- **Desbloqueio**: `readyTopics` (todos os pré-requisitos dominados) e
  `unlockedByMastering` (o que fica pronto ao dominar X)
- **Métricas**: `degreeCentrality` (grau ponderado por força), `bottlenecks`
  (não dominados que bloqueiam não dominados), `learningChains`
  (componentes conexos em ordem topológica) + `chainCoverage`

"Dominado" para o grafo = **declarado DOMINADO ∪ domínio derivado ≥70%**
(modelo do Learning Analytics) — as engines compartilham a mesma definição.

## 4. Dados como cadastro (extensível)

Relações do SEDES em `seed/contests/sedesRelations.ts` (31 arestas autoradas),
registradas no `ContestSeed.relations` e semeadas de forma **idempotente** por
`(origem, destino, tipo)`. **ABGF/DATAPREV entrarão sem alteração estrutural**
— só dados; o importador de edital futuro gravará o mesmo formato.

## 5. Fluxo de desbloqueio

Marcar um tópico como **DOMINADO** → `setTopicStatus` consulta o grafo →
devolve `UnlockResult.unlocked` (tópicos cujos pré-requisitos ficaram
completos) → UI mostra "🔓 Conteúdo desbloqueado" → e o fator `grafo` da
estratégia passa a priorizá-los automaticamente no próximo Plano do Dia.
