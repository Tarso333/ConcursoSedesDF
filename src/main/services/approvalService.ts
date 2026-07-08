import { differenceInCalendarDays, parseISO } from 'date-fns'
import type { ApprovalPlan, Contest, PriorityDiscipline } from '@shared/domain'
import { rankDisciplines } from '../strategy/engine'
import { buildStrategyInput } from '../strategy/snapshot'
import { getDashboardOverview } from './dashboardService'

// Modo Aprovação consome o MESMO ranking do Motor de Estratégia (M16) —
// fonte única de verdade para prioridades, sem fórmulas paralelas.
export function getApprovalPlan(contest: Contest): ApprovalPlan {
  const overview = getDashboardOverview(contest)
  const input = buildStrategyInput(contest, 60)
  const ranked = rankDisciplines(input)
  const daysUntilExam = contest.examDate
    ? Math.max(0, differenceInCalendarDays(parseISO(contest.examDate), new Date()))
    : 0

  const focus: PriorityDiscipline[] = ranked.slice(0, 6).map((r) => {
    const d = r.discipline
    return {
      disciplineId: d.id,
      name: d.name,
      color: d.color,
      block: d.block,
      weight: d.weight,
      accuracy: d.answeredCount > 0 ? d.correctCount / d.answeredCount : 0,
      answeredCount: d.answeredCount,
      priorityScore: r.score,
      reason: r.reasons[0] ?? 'manter o ritmo de estudos'
    }
  })

  const topName = focus[0]?.name ?? 'as disciplinas de maior peso'
  const actions = [
    {
      label: 'Seguir o Plano do Dia',
      detail: 'A ordem ideal de estudo de hoje, calculada pelo motor de estratégia',
      route: '/plano'
    },
    {
      label: 'Atacar as prioridades de hoje',
      detail: `Comece por ${topName} — maior retorno por ponto na prova`,
      route: '/questoes'
    },
    {
      label: 'Zerar o caderno de erros',
      detail: 'Reveja e marque como compreendido o que você errou',
      route: '/erros'
    },
    {
      label: 'Revisão espaçada do dia',
      detail: 'Mantenha os flashcards em dia para não esquecer',
      route: '/revisao'
    }
  ]

  return { daysUntilExam, approvalEstimatePct: overview.approvalEstimatePct, focus, actions }
}
