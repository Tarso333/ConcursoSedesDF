// Renderização PURA do StudyContext em texto de prompt (pt-BR, compacto).
// Determinística e testável — nenhum acesso a dados aqui.
import type { StudyContext } from './types'

const pct = (v: number | null): string => (v == null ? 'sem dados' : `${Math.round(v * 100)}%`)

export function renderStudyContext(ctx: StudyContext): string {
  const s: string[] = []

  s.push('## CONCURSO')
  const c = ctx.contest
  s.push(
    `${c.name}${c.role ? ` — cargo: ${c.role}` : ''}${c.board ? ` — banca: ${c.board}` : ''}` +
      `${c.examDate ? ` — prova: ${c.examDate}${c.daysUntilExam != null ? ` (${c.daysUntilExam} dias)` : ''}` : ''}`
  )

  if (ctx.focus) {
    const f = ctx.focus
    s.push('', `## TÓPICO EM FOCO (base da resposta): ${f.topicName} [${f.disciplineName}]`)
    s.push(`Status do aluno: ${f.status}${f.accuracy != null ? ` · acerto no tópico: ${pct(f.accuracy)}` : ''}`)
    if (f.subtopics.length) s.push(`Subtópicos do edital: ${f.subtopics.join('; ')}`)
    for (const k of f.knowledge) s.push(`- [${k.kind}] ${k.title}: ${k.excerpt}`)
    if (f.prerequisites.length)
      s.push(`Pré-requisitos: ${f.prerequisites.map((r) => r.name).join('; ')}`)
    if (f.dependents.length)
      s.push(`Este tema destrava: ${f.dependents.map((r) => r.name).join('; ')}`)
    if (f.related.length) s.push(`Relacionados: ${f.related.map((r) => r.name).join('; ')}`)
  }

  s.push('', '## DESEMPENHO DO ALUNO')
  const p = ctx.performance
  s.push(`Questões respondidas: ${p.totalAnswered} · acerto geral: ${pct(p.accuracy)}`)
  if (p.worstDisciplines.length)
    s.push(`Piores disciplinas: ${p.worstDisciplines.map((d) => `${d.name} (${pct(d.accuracy)})`).join(', ')}`)
  if (ctx.analytics.profile.length)
    s.push(`Perfil de aprendizagem: ${ctx.analytics.profile.map((t) => `${t.label}: ${t.classification}`).join(' · ')}`)
  if (ctx.analytics.indicators.length)
    s.push(
      `Indicadores: ${ctx.analytics.indicators.map((i) => `${i.label} ${i.value}${i.unit}`).join(' · ')} · tendência: ${ctx.analytics.globalTrend}`
    )

  s.push('', '## PLANO DO DIA (Strategy Engine)')
  s.push(
    `Prioridade nº 1: ${ctx.plan.topPriority ?? '—'} · cobertura do edital: ${ctx.plan.coveragePct}% · ${ctx.plan.availableMinutes}min disponíveis`
  )
  for (const i of ctx.plan.items) s.push(`- ${i.discipline} (${i.activity}, ${i.minutes}min) — ${i.reason}`)

  s.push('', '## REVISÕES E ERROS')
  s.push(`Flashcards vencidos (FSRS): ${ctx.reviews.dueNow} · erros em aberto: ${ctx.errors.open}`)
  for (const r of ctx.reviews.sample.slice(0, 3)) s.push(`- Revisão pendente: "${r.front}" (${r.deckName})`)
  for (const e of ctx.errors.recent.slice(0, 3)) s.push(`- Errou recentemente [${e.disciplineName}]: ${e.statement}`)

  s.push('', '## SIMULADOS E METAS')
  s.push(
    `Simulados: ${ctx.mocks.count}${ctx.mocks.lastScorePct != null ? ` · último: ${ctx.mocks.lastScorePct}%` : ''} · ` +
      `meta diária: ${ctx.goals.dailyGoalQuestions} questões/${ctx.goals.dailyGoalMinutes}min · hoje: ${ctx.goals.answeredToday} questões · streak: ${ctx.goals.streakDays}d`
  )

  return s.join('\n')
}
