// Acesso a dados do grafo de aprendizagem. As engines não conhecem SQL:
// consomem GraphEdge[] e resolvem semântica no módulo puro (src/main/graph).
import { eq, inArray, or, sql } from 'drizzle-orm'
import type { RelatedTopicRef, RelationKind, TopicStatus } from '@shared/domain'
import { getDb } from '../db/connection'
import { disciplines, topicProgress, topicRelations, topics } from '../db/schema'
import type { GraphEdge } from '../graph/engine'

type RelationRow = typeof topicRelations.$inferSelect

function toEdge(r: RelationRow): GraphEdge {
  return {
    source: r.sourceTopicId,
    target: r.targetTopicId,
    kind: r.kind as RelationKind,
    strength: r.strength,
    bidirectional: r.bidirectional,
    note: r.note
  }
}

/** Todas as arestas cujos tópicos pertencem ao concurso. */
export function listEdgesForContest(contestId: number): GraphEdge[] {
  const db = getDb()
  const src = db
    .select({ rel: topicRelations })
    .from(topicRelations)
    .innerJoin(topics, eq(topicRelations.sourceTopicId, topics.id))
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(eq(disciplines.contestId, contestId))
    .all()
  return src.map((r) => toEdge(r.rel))
}

/** Arestas que tocam qualquer tópico do conjunto informado. */
export function listEdgesTouching(topicIds: number[]): GraphEdge[] {
  if (topicIds.length === 0) return []
  const db = getDb()
  return db
    .select()
    .from(topicRelations)
    .where(
      or(inArray(topicRelations.sourceTopicId, topicIds), inArray(topicRelations.targetTopicId, topicIds))
    )
    .all()
    .map(toEdge)
}

/** Resolve referências exibíveis (nome/disciplina/status) para tópicos. */
export function resolveTopicRefs(
  topicIds: number[]
): Map<number, Omit<RelatedTopicRef, 'kind' | 'strength' | 'note'>> {
  const map = new Map<number, Omit<RelatedTopicRef, 'kind' | 'strength' | 'note'>>()
  if (topicIds.length === 0) return map
  const db = getDb()
  const rows = db
    .select({
      topicId: topics.id,
      name: topics.name,
      disciplineId: disciplines.id,
      disciplineName: disciplines.name,
      disciplineColor: disciplines.color,
      status: sql<TopicStatus>`coalesce(${topicProgress.status}, 'NAO_ESTUDADO')`
    })
    .from(topics)
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .leftJoin(topicProgress, eq(topicProgress.topicId, topics.id))
    .where(inArray(topics.id, topicIds))
    .all()
  for (const r of rows) map.set(r.topicId, r)
  return map
}

/** Tópicos declarados como dominados (progresso do usuário). */
export function declaredMasteredSet(contestId: number): Set<number> {
  const db = getDb()
  const rows = db
    .select({ topicId: topicProgress.topicId })
    .from(topicProgress)
    .innerJoin(topics, eq(topicProgress.topicId, topics.id))
    .innerJoin(disciplines, eq(topics.disciplineId, disciplines.id))
    .where(sql`${disciplines.contestId} = ${contestId} AND ${topicProgress.status} = 'DOMINADO'`)
    .all()
  return new Set(rows.map((r) => r.topicId))
}
