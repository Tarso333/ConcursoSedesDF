// Geração determinística de PLACEHOLDERS compatíveis com as engines:
//  • Knowledge (M15): um RESUMO-stub por tópico de topo, pronto para curadoria.
//  • Relationship (M18): cadeia de CONTINUIDADE seguindo a numeração do edital
//    (item N → N+1) — a própria ordenação do edital, não semântica inventada.
import type { SeedDiscipline, SeedTopic } from '@main/db/seed/curriculum'
import type { SeedRelation, SeedTopicKnowledge } from '@main/db/seed/contests/types'

const PLACEHOLDER_TAG = '<!-- placeholder gerado pelo importador; preencher na curadoria -->'

function topicName(t: SeedTopic): string {
  return typeof t === 'string' ? t : t.name
}

/** Um RESUMO-stub por tópico de topo (idempotente por tópico no seed). */
export function buildKnowledgePlaceholders(disciplines: SeedDiscipline[]): SeedTopicKnowledge[] {
  const out: SeedTopicKnowledge[] = []
  for (const d of disciplines) {
    for (const t of d.topics) {
      const name = topicName(t)
      out.push({
        disciplineSlug: d.slug,
        topic: name,
        entries: [
          {
            kind: 'RESUMO',
            title: name,
            body: `${PLACEHOLDER_TAG}\n\n# ${name}\n\n_Resumo técnico a preencher para a banca._`
          },
          { kind: 'PALAVRA_CHAVE', title: name }
        ]
      })
    }
  }
  return out
}

/** Cadeia de CONTINUIDADE entre tópicos consecutivos de cada disciplina. */
export function buildRelationPlaceholders(disciplines: SeedDiscipline[]): SeedRelation[] {
  const out: SeedRelation[] = []
  for (const d of disciplines) {
    for (let i = 0; i + 1 < d.topics.length; i++) {
      const from = topicName(d.topics[i])
      const to = topicName(d.topics[i + 1])
      if (from === to) continue
      out.push({
        from: { disciplineSlug: d.slug, topic: from },
        to: { disciplineSlug: d.slug, topic: to },
        kind: 'CONTINUIDADE',
        strength: 0.5,
        note: `Sequência curricular do edital (${d.name}, item ${i + 1} → ${i + 2}).`
      })
    }
  }
  return out
}
