import { differenceInCalendarDays, parseISO } from 'date-fns'
import type { ApprovalPlan, PriorityDiscipline } from '@shared/domain'
import { getDisciplinesWithStats } from '../repositories/catalogRepository'
import { getSettings } from '../repositories/settingsRepository'
import { getDashboardOverview } from './dashboardService'

export function getApprovalPlan(): ApprovalPlan {
  const stats = getDisciplinesWithStats()
  const settings = getSettings()
  const overview = getDashboardOverview()
  const daysUntilExam = Math.max(0, differenceInCalendarDays(parseISO(settings.examDate), new Date()))

  const focus: PriorityDiscipline[] = stats
    .map((d) => {
      const needFactor = d.answeredCount < 5 ? 1.3 : 1
      const priorityScore = Math.round(d.weight * (1 - d.accuracy) * needFactor * 100) / 100
      const reason =
        d.answeredCount < 5
          ? 'Pouca prática — comece a resolver questões'
          : d.accuracy < 0.6
            ? 'Acerto baixo — reforce a teoria e refaça questões'
            : d.accuracy < 0.8
              ? 'Quase lá — mantenha a prática'
              : 'Ponto forte — revisões pontuais bastam'
      return {
        disciplineId: d.id,
        name: d.name,
        color: d.color,
        block: d.block,
        weight: d.weight,
        accuracy: d.accuracy,
        answeredCount: d.answeredCount,
        priorityScore,
        reason
      }
    })
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 6)

  const topName = focus[0]?.name ?? 'os conhecimentos específicos'
  const actions = [
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
    },
    {
      label: 'Simulado oficial semanal',
      detail: 'Treine ritmo, resistência e o corte de eliminação',
      route: '/simulados'
    }
  ]

  return { daysUntilExam, approvalEstimatePct: overview.approvalEstimatePct, focus, actions }
}
