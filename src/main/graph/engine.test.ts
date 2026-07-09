// Testes do Grafo de Aprendizagem — módulo puro, testável em Node.
import { describe, expect, it } from 'vitest'
import {
  bottlenecks,
  chainCoverage,
  degreeCentrality,
  dependentsOf,
  detectCycles,
  type GraphEdge,
  learningChains,
  nextOf,
  prerequisitesOf,
  readyTopics,
  relatedOf,
  topologicalOrder,
  unlockedByMastering
} from './engine'

const edge = (
  source: number,
  target: number,
  kind: GraphEdge['kind'],
  strength = 0.5
): GraphEdge => ({ source, target, kind, strength, bidirectional: false })

// Grafo de exemplo: 1 → 2 → 3 (pré-requisitos em cadeia), 2 → 4 (continuidade),
// 3 ~ 5 (semelhante), 6 depende de 2 (⇒ 2 antes de 6).
const EDGES: GraphEdge[] = [
  edge(1, 2, 'PRE_REQUISITO', 1),
  edge(2, 3, 'PRE_REQUISITO', 0.75),
  edge(2, 4, 'CONTINUIDADE', 0.5),
  edge(3, 5, 'SEMELHANTE', 0.25),
  edge(6, 2, 'DEPENDE_DE', 0.5) // 6 depende de 2 ⇒ 2 vem antes de 6
]

describe('navegação', () => {
  it('resolve pré-requisitos diretos (inclusive DEPENDE_DE invertido)', () => {
    expect(prerequisitesOf(2, EDGES).map((e) => e.before)).toEqual([1])
    expect(prerequisitesOf(3, EDGES).map((e) => e.before)).toEqual([2])
    expect(prerequisitesOf(6, EDGES).map((e) => e.before)).toEqual([2]) // via DEPENDE_DE
  })

  it('resolve dependentes (o que um tópico destrava)', () => {
    expect(dependentsOf(2, EDGES).map((e) => e.after).sort()).toEqual([3, 6])
  })

  it('resolve próximos assuntos (continuidade) e relacionados (bidirecionais)', () => {
    expect(nextOf(2, EDGES).map((e) => e.target)).toEqual([4])
    expect(relatedOf(5, EDGES).map((r) => r.otherId)).toEqual([3]) // simétrico
    expect(relatedOf(3, EDGES).map((r) => r.otherId)).toEqual([5])
  })
})

describe('detecção de ciclos', () => {
  it('grafo acíclico → nenhum ciclo', () => {
    expect(detectCycles(EDGES)).toEqual([])
  })

  it('detecta ciclo A→B→C→A', () => {
    const cyclic = [
      edge(1, 2, 'PRE_REQUISITO'),
      edge(2, 3, 'PRE_REQUISITO'),
      edge(3, 1, 'PRE_REQUISITO')
    ]
    const cycles = detectCycles(cyclic)
    expect(cycles.length).toBeGreaterThan(0)
    expect(cycles[0].sort((a, b) => a - b)).toEqual([1, 2, 3])
  })

  it('arestas bidirecionais não geram falso ciclo', () => {
    const bidi = [edge(1, 2, 'SEMELHANTE'), edge(2, 1, 'RELACIONADO')]
    expect(detectCycles(bidi)).toEqual([])
  })
})

describe('ordenação topológica', () => {
  it('respeita a precedência do grafo', () => {
    const order = topologicalOrder([1, 2, 3, 4, 5, 6], EDGES)
    const pos = (id: number): number => order.indexOf(id)
    expect(pos(1)).toBeLessThan(pos(2))
    expect(pos(2)).toBeLessThan(pos(3))
    expect(pos(2)).toBeLessThan(pos(4)) // continuidade também ordena
    expect(pos(2)).toBeLessThan(pos(6))
    expect(order.length).toBe(6)
  })

  it('é determinística e tolerante a ciclos (nenhum nó se perde)', () => {
    const cyclic = [edge(1, 2, 'PRE_REQUISITO'), edge(2, 1, 'PRE_REQUISITO')]
    const order = topologicalOrder([1, 2], cyclic)
    expect(order.sort((a, b) => a - b)).toEqual([1, 2])
    expect(topologicalOrder([1, 2, 3, 4, 5, 6], EDGES)).toEqual(
      topologicalOrder([1, 2, 3, 4, 5, 6], EDGES)
    )
  })
})

describe('desbloqueio de conteúdos', () => {
  it('tópico fica pronto quando TODOS os pré-requisitos estão dominados', () => {
    expect(readyTopics(new Set(), EDGES)).toEqual([]) // nada dominado ⇒ nada pronto
    expect(readyTopics(new Set([1]), EDGES)).toEqual([2])
    expect(readyTopics(new Set([1, 2]), EDGES).sort()).toEqual([3, 6])
  })

  it('dominar um tópico identifica automaticamente o que foi desbloqueado', () => {
    const unlocked = unlockedByMastering(2, new Set([1]), EDGES)
    expect(unlocked.sort()).toEqual([3, 6])
    // dominar algo sem dependentes não desbloqueia nada
    expect(unlockedByMastering(5, new Set([1]), EDGES)).toEqual([])
  })

  it('desbloqueio exige todos os pré-requisitos (não apenas um)', () => {
    const multi = [edge(1, 3, 'PRE_REQUISITO'), edge(2, 3, 'PRE_REQUISITO')]
    expect(unlockedByMastering(1, new Set(), multi)).toEqual([]) // ainda falta o 2
    expect(unlockedByMastering(2, new Set([1]), multi)).toEqual([3])
  })
})

describe('métricas de grafo', () => {
  it('centralidade: tópico mais conectado tem maior grau ponderado', () => {
    const deg = degreeCentrality(EDGES)
    const max = [...deg.entries()].sort((a, b) => b[1] - a[1])[0]
    expect(max[0]).toBe(2) // 1→2, 2→3, 2→4, 6 depende de 2
  })

  it('gargalos: não dominado que bloqueia outros não dominados', () => {
    const b = bottlenecks(new Set(), EDGES)
    expect(b[0].topicId).toBe(2)
    expect(b[0].blocks).toBe(2) // bloqueia 3 e 6
    // dominar o gargalo o remove da lista
    expect(bottlenecks(new Set([2]), EDGES).some((x) => x.topicId === 2)).toBe(false)
  })

  it('cadeias de aprendizado com cobertura', () => {
    const chains = learningChains(EDGES)
    expect(chains.length).toBe(1)
    expect(chains[0].length).toBe(5) // 1,2,3,4,6 (5 fica fora: só semelhança)
    expect(chainCoverage(chains[0], new Set([1, 2]))).toBe(40)
    expect(chainCoverage(chains[0], new Set([1, 2, 3, 4, 6]))).toBe(100)
  })
})
