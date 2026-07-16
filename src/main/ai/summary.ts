// Resumo do contexto (chips do painel do Tutor) + sugestões dinâmicas de
// pergunta — ambos derivados das engines existentes, nunca hardcoded.
import { differenceInCalendarDays, parseISO } from 'date-fns'
import type { AIContextSummary, AISuggestion, Contest } from '@shared/domain'
import { getErrorStats, listErrors } from '../repositories/errorRepository'
import { getDueCards, getReviewStats } from '../services/reviewService'
import { getStatsOverview } from '../services/statsService'
import { getDailyPlan } from '../services/strategyService'
import { isConfigured } from './factory'
import { getAISettings } from './settings'

export function buildContextSummary(contest: Contest): AIContextSummary {
  const stats = getStatsOverview(contest)
  const plan = getDailyPlan(contest)
  const reviews = getReviewStats(contest.id)
  const errors = getErrorStats(contest.id)
  const ai = getAISettings()
  let daysUntilExam: number | null = null
  if (contest.examDate) {
    try {
      daysUntilExam = differenceInCalendarDays(parseISO(contest.examDate), new Date())
    } catch {
      daysUntilExam = null
    }
  }
  return {
    contestName: contest.name,
    role: contest.role,
    board: contest.board,
    daysUntilExam,
    topPriority: plan.ranking[0]?.name ?? null,
    dueReviews: reviews.dueNow,
    openErrors: errors.open,
    accuracy: stats.totalAnswered > 0 ? stats.accuracy : null,
    provider: ai.providerId,
    providerReady: isConfigured(ai),
    model: ai.model
  }
}

export function buildSuggestions(contest: Contest): AISuggestion[] {
  const out: AISuggestion[] = []
  const plan = getDailyPlan(contest)
  const top = plan.ranking[0]
  if (top) {
    out.push({
      label: `Roteiro de hoje: ${top.name}`,
      prompt: `Monte um roteiro de estudo objetivo para hoje sobre "${top.name}", considerando meu desempenho e o tempo do meu plano.`,
      source: 'Plano do Dia'
    })
    out.push({
      label: `Como a banca cobra ${top.name}?`,
      prompt: `Quais são os pontos de "${top.name}" mais cobrados pela banca ${contest.board ?? 'do concurso'} e as pegadinhas clássicas?`,
      source: 'Plano do Dia'
    })
  }
  const errors = listErrors(contest.id, { status: 'ABERTO' }).slice(0, 2)
  for (const e of errors) {
    out.push({
      label: `Entender meu erro em ${e.disciplineName}`,
      prompt: `Errei esta questão de ${e.disciplineName}: "${e.statement.slice(0, 140)}…". Explique o conceito por trás e como não errar de novo.`,
      source: 'Caderno de Erros'
    })
  }
  const due = getDueCards(contest.id, 1)
  if (due.length) {
    out.push({
      label: 'Revisar um flashcard vencido',
      prompt: `Estou revisando o flashcard "${due[0].front}". Aprofunde esse conceito com um exemplo prático e um macete.`,
      source: 'Revisão FSRS'
    })
  }
  return out.slice(0, 5)
}
