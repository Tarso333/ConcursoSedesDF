// Grafo de Aprendizagem — MÓDULO PURO E NEUTRO (sem DB/Electron/rede).
// Nenhuma engine é dona do grafo: Conhecimento (M15), Estratégia (M16) e
// Analytics (M17) apenas CONSOMEM estas funções, cada uma no seu contexto.
//
// Semântica direcional (resolvida aqui, dados ficam como autorados):
//   PRE_REQUISITO  s→t : s vem ANTES de t (s destrava t)
//   DEPENDE_DE     s→t : s depende de t ⇒ t vem ANTES de s
//   CONTINUIDADE   s→t : t é a continuação natural de s
//   REVISAO_RECOMENDADA s→t : ao estudar s, revisar t
//   COMPLEMENTA / ESTUDADO_JUNTO / SEMELHANTE / RELACIONADO : bidirecionais
import type { RelationKind } from '@shared/domain'

export interface GraphEdge {
  source: number
  target: number
  kind: RelationKind
  strength: number // 0..1
  bidirectional: boolean
  note?: string | null
}

/** Aresta de precedência normalizada: `before` deve vir antes de `after`. */
export interface GatingEdge {
  before: number
  after: number
  strength: number
  kind: RelationKind
  note?: string | null
}

export const BIDIRECTIONAL_KINDS: RelationKind[] = [
  'COMPLEMENTA',
  'ESTUDADO_JUNTO',
  'SEMELHANTE',
  'RELACIONADO'
]

export function isBidirectionalKind(kind: RelationKind): boolean {
  return BIDIRECTIONAL_KINDS.includes(kind)
}

/** Normaliza as arestas de precedência (pré-requisito/dependência). */
export function gatingEdges(edges: GraphEdge[]): GatingEdge[] {
  const out: GatingEdge[] = []
  for (const e of edges) {
    if (e.kind === 'PRE_REQUISITO') {
      out.push({ before: e.source, after: e.target, strength: e.strength, kind: e.kind, note: e.note })
    } else if (e.kind === 'DEPENDE_DE') {
      out.push({ before: e.target, after: e.source, strength: e.strength, kind: e.kind, note: e.note })
    }
  }
  return out
}

/** Arestas de sequência (precedência + continuidade) para ordenação/cadeias. */
export function sequenceEdges(edges: GraphEdge[]): GatingEdge[] {
  const seq = gatingEdges(edges)
  for (const e of edges) {
    if (e.kind === 'CONTINUIDADE') {
      seq.push({ before: e.source, after: e.target, strength: e.strength, kind: e.kind, note: e.note })
    }
  }
  return seq
}

// ───────────────────────── Navegação ─────────────────────────
/** Pré-requisitos diretos de um tópico (o que estudar antes). */
export function prerequisitesOf(topicId: number, edges: GraphEdge[]): GatingEdge[] {
  return gatingEdges(edges).filter((e) => e.after === topicId)
}

/** Dependentes diretos (o que este tópico destrava). */
export function dependentsOf(topicId: number, edges: GraphEdge[]): GatingEdge[] {
  return gatingEdges(edges).filter((e) => e.before === topicId)
}

/** Próximos assuntos recomendados: continuidade + revisões + destravados. */
export function nextOf(topicId: number, edges: GraphEdge[]): GraphEdge[] {
  return edges.filter(
    (e) => e.source === topicId && (e.kind === 'CONTINUIDADE' || e.kind === 'REVISAO_RECOMENDADA')
  )
}

/** Relacionados (arestas bidirecionais, em qualquer direção). */
export function relatedOf(topicId: number, edges: GraphEdge[]): { edge: GraphEdge; otherId: number }[] {
  const out: { edge: GraphEdge; otherId: number }[] = []
  for (const e of edges) {
    const bidi = e.bidirectional || isBidirectionalKind(e.kind)
    if (!bidi) continue
    if (e.source === topicId) out.push({ edge: e, otherId: e.target })
    else if (e.target === topicId) out.push({ edge: e, otherId: e.source })
  }
  return out
}

// ───────────────────────── Ciclos e ordenação ─────────────────────────
/** Detecta ciclos nas arestas de sequência (DFS). Retorna os ciclos achados. */
export function detectCycles(edges: GraphEdge[]): number[][] {
  const seq = sequenceEdges(edges)
  const adj = new Map<number, number[]>()
  for (const e of seq) {
    const list = adj.get(e.before) ?? []
    list.push(e.after)
    adj.set(e.before, list)
  }
  const cycles: number[][] = []
  const WHITE = 0
  const GRAY = 1
  const BLACK = 2
  const color = new Map<number, number>()
  const stack: number[] = []

  const visit = (node: number): void => {
    color.set(node, GRAY)
    stack.push(node)
    for (const nb of adj.get(node) ?? []) {
      const c = color.get(nb) ?? WHITE
      if (c === GRAY) {
        const start = stack.indexOf(nb)
        if (start >= 0) cycles.push(stack.slice(start))
      } else if (c === WHITE) {
        visit(nb)
      }
    }
    stack.pop()
    color.set(node, BLACK)
  }

  const nodes = new Set<number>()
  for (const e of seq) {
    nodes.add(e.before)
    nodes.add(e.after)
  }
  for (const n of [...nodes].sort((a, b) => a - b)) {
    if ((color.get(n) ?? WHITE) === WHITE) visit(n)
  }
  return cycles
}

/**
 * Ordenação topológica (Kahn) das arestas de sequência — a "ordem ideal de
 * estudo" do grafo. Tolerante a ciclos: nós restantes entram ao final por id.
 */
export function topologicalOrder(topicIds: number[], edges: GraphEdge[]): number[] {
  const inSet = new Set(topicIds)
  const seq = sequenceEdges(edges).filter((e) => inSet.has(e.before) && inSet.has(e.after))
  const indegree = new Map<number, number>(topicIds.map((id) => [id, 0]))
  const adj = new Map<number, number[]>()
  for (const e of seq) {
    indegree.set(e.after, (indegree.get(e.after) ?? 0) + 1)
    const list = adj.get(e.before) ?? []
    list.push(e.after)
    adj.set(e.before, list)
  }
  const queue = [...topicIds].filter((id) => (indegree.get(id) ?? 0) === 0).sort((a, b) => a - b)
  const order: number[] = []
  while (queue.length > 0) {
    const n = queue.shift() as number
    order.push(n)
    for (const nb of (adj.get(n) ?? []).sort((a, b) => a - b)) {
      const d = (indegree.get(nb) ?? 0) - 1
      indegree.set(nb, d)
      if (d === 0) queue.push(nb)
    }
    queue.sort((a, b) => a - b)
  }
  for (const id of topicIds) if (!order.includes(id)) order.push(id) // ciclo
  return order
}

// ───────────────────────── Desbloqueio ─────────────────────────
/** Tópicos não dominados cujos pré-requisitos diretos estão todos dominados. */
export function readyTopics(mastered: Set<number>, edges: GraphEdge[]): number[] {
  const gates = gatingEdges(edges)
  const withPrereq = new Set(gates.map((e) => e.after))
  const ready: number[] = []
  for (const after of withPrereq) {
    if (mastered.has(after)) continue
    const prereqs = gates.filter((e) => e.after === after)
    if (prereqs.every((e) => mastered.has(e.before))) ready.push(after)
  }
  return ready.sort((a, b) => a - b)
}

/** O que passa a ficar pronto ao dominar `topicId` (prioridade automática). */
export function unlockedByMastering(
  topicId: number,
  mastered: Set<number>,
  edges: GraphEdge[]
): number[] {
  const before = new Set(readyTopics(mastered, edges))
  const withTopic = new Set(mastered)
  withTopic.add(topicId)
  return readyTopics(withTopic, edges).filter((id) => !before.has(id) && id !== topicId)
}

// ───────────────────────── Métricas de grafo ─────────────────────────
/** Grau ponderado (Σ força das arestas incidentes) — conectividade/centralidade. */
export function degreeCentrality(edges: GraphEdge[]): Map<number, number> {
  const map = new Map<number, number>()
  const add = (id: number, w: number): void => {
    map.set(id, (map.get(id) ?? 0) + w)
  }
  for (const e of edges) {
    add(e.source, e.strength)
    add(e.target, e.strength)
  }
  return map
}

/** Gargalos: tópicos NÃO dominados que bloqueiam outros não dominados. */
export function bottlenecks(
  mastered: Set<number>,
  edges: GraphEdge[]
): { topicId: number; blocks: number }[] {
  const gates = gatingEdges(edges)
  const blockCount = new Map<number, number>()
  for (const e of gates) {
    if (mastered.has(e.before)) continue
    if (mastered.has(e.after)) continue
    blockCount.set(e.before, (blockCount.get(e.before) ?? 0) + 1)
  }
  return [...blockCount.entries()]
    .map(([topicId, blocks]) => ({ topicId, blocks }))
    .sort((a, b) => b.blocks - a.blocks || a.topicId - b.topicId)
}

/** Cadeias de aprendizado: componentes conexos das arestas de sequência. */
export function learningChains(edges: GraphEdge[]): number[][] {
  const seq = sequenceEdges(edges)
  const parent = new Map<number, number>()
  const find = (x: number): number => {
    let r = x
    while (parent.get(r) !== r) r = parent.get(r) as number
    let cur = x
    while (parent.get(cur) !== r) {
      const nxt = parent.get(cur) as number
      parent.set(cur, r)
      cur = nxt
    }
    return r
  }
  const union = (a: number, b: number): void => {
    if (!parent.has(a)) parent.set(a, a)
    if (!parent.has(b)) parent.set(b, b)
    const ra = find(a)
    const rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }
  for (const e of seq) union(e.before, e.after)

  const groups = new Map<number, number[]>()
  for (const node of parent.keys()) {
    const root = find(node)
    const list = groups.get(root) ?? []
    list.push(node)
    groups.set(root, list)
  }
  return [...groups.values()]
    .filter((g) => g.length >= 2)
    .map((g) => topologicalOrder(g.sort((a, b) => a - b), edges))
    .sort((a, b) => b.length - a.length || a[0] - b[0])
}

/** Cobertura de uma cadeia dado o conjunto de tópicos dominados. */
export function chainCoverage(chain: number[], mastered: Set<number>): number {
  if (chain.length === 0) return 0
  return Math.round((chain.filter((id) => mastered.has(id)).length / chain.length) * 100)
}
