// Atribuição do Tutor — funções PURAS (testáveis em Node, sem DB).
// A atribuição é DETERMINÍSTICA: deriva do StudyContext que o builder montou,
// nunca do que o modelo "diz" ter usado.
import type { AiMessageDTO, TutorAttribution } from '@shared/domain'
import type { StudyContext } from './context/types'

export function buildAttribution(ctx: StudyContext): TutorAttribution {
  const f = ctx.focus
  return {
    knowledgeUsed: f
      ? f.knowledge.map((k) => ({ topicName: f.topicName, entryTitle: k.title, kind: k.kind }))
      : [],
    topicsConsulted: f
      ? [{ topicId: f.topicId, name: f.topicName, disciplineName: f.disciplineName }]
      : [],
    errorsInfluencing: ctx.errors.recent.map((e) => ({
      questionId: e.questionId,
      statement: e.statement,
      disciplineName: e.disciplineName
    })),
    reviewsRelated: ctx.reviews.sample.map((r) => ({ front: r.front, deckName: r.deckName })),
    dependentTopics: f
      ? f.dependents.map((d) => ({ name: d.name, disciplineName: d.disciplineName, kind: d.kind }))
      : []
  }
}

/** Bloco textual de fontes (persistido junto do conteúdo; legível no histórico). */
export function renderAttributionText(attr: TutorAttribution): string {
  const lines: string[] = []
  if (attr.knowledgeUsed.length)
    lines.push(`📚 Conhecimento: ${attr.knowledgeUsed.map((k) => k.entryTitle).slice(0, 4).join(' · ')}`)
  if (attr.topicsConsulted.length)
    lines.push(`🧭 Tópicos: ${attr.topicsConsulted.map((t) => `${t.name} [${t.disciplineName}]`).join(' · ')}`)
  if (attr.errorsInfluencing.length)
    lines.push(`❌ Erros considerados: ${attr.errorsInfluencing.length} em aberto`)
  if (attr.reviewsRelated.length) lines.push(`🔁 Revisões pendentes: ${attr.reviewsRelated.length}`)
  if (attr.dependentTopics.length)
    lines.push(`🔓 Dependem deste tema: ${attr.dependentTopics.map((d) => d.name).slice(0, 4).join(' · ')}`)
  if (!lines.length) return ''
  return `\n\n———\nFontes da plataforma:\n${lines.join('\n')}`
}

/** Parse tolerante da atribuição persistida em ai_messages.context_type. */
export function parseAttribution(raw: string | null): AiMessageDTO['attribution'] {
  if (!raw) return null
  try {
    const j = JSON.parse(raw) as TutorAttribution
    return Array.isArray(j.topicsConsulted) ? j : null
  } catch {
    return null
  }
}
