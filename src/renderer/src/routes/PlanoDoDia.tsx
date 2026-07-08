import {
  BookOpen,
  CalendarCheck,
  ChevronDown,
  Clock,
  Compass,
  PenSquare,
  RotateCcw,
  TrendingUp
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { DailyPlanItem, PlanActivity, PlanPriority } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { EmptyState, ErrorState, Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { fmtDatePtBR, fmtMinutes } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { useAppStore } from '../stores/useAppStore'

const TIME_OPTIONS = [30, 60, 90, 120, 150, 180, 240]

const PRIORITY_META: Record<PlanPriority, { label: string; color: string }> = {
  MUITO_ALTA: { label: 'Muito alta', color: 'hsl(var(--danger))' },
  ALTA: { label: 'Alta', color: 'hsl(var(--warning))' },
  MEDIA: { label: 'Média', color: 'hsl(var(--primary))' },
  BAIXA: { label: 'Baixa', color: 'hsl(var(--muted-foreground))' }
}

const ACTIVITY_META: Record<PlanActivity, { label: string; icon: typeof BookOpen; route: string }> = {
  TEORIA: { label: 'Estudar conteúdo', icon: BookOpen, route: '/conteudo' },
  QUESTOES: { label: 'Resolver questões', icon: PenSquare, route: '/questoes' },
  REVISAO_FSRS: { label: 'Revisão espaçada', icon: RotateCcw, route: '/revisao' }
}

function PlanItemCard({ item, index }: { item: DailyPlanItem; index: number }): JSX.Element {
  const [open, setOpen] = useState(false)
  const activity = ACTIVITY_META[item.activity]
  const priority = PRIORITY_META[item.priority]
  const Icon = activity.icon

  const titleTime =
    item.activity === 'QUESTOES' && item.questionTarget
      ? `${item.questionTarget} questões (~${item.minutes} min)`
      : `${item.minutes} min`

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-sm font-bold">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.disciplineColor }} />
            <span className="text-sm font-semibold">{item.disciplineName}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: priority.color }}
            >
              {priority.label}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon size={13} /> {activity.label} · <Clock size={12} className="-mr-0.5" /> {titleTime}
          </p>

          {item.reasons.length > 0 ? (
            <ul className="mt-2 space-y-0.5">
              {item.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                  {r}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
            <TrendingUp size={13} /> Impacto: {item.expectedImpact}
          </p>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ChevronDown size={13} className={cn('transition', open && 'rotate-180')} />
            {open ? 'Ocultar cálculo' : `Ver cálculo do score (${item.score})`}
          </button>
          {open ? (
            <div className="mt-2 rounded-lg border bg-background/50 p-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                score {item.score} = soma dos fatores (peso × intensidade)
              </p>
              <div className="space-y-1">
                {item.factors
                  .filter((f) => f.points > 0)
                  .sort((a, b) => b.points - a.points)
                  .map((f) => (
                    <div key={f.key} className="flex items-center gap-2 text-xs">
                      <span className="w-40 shrink-0 truncate text-muted-foreground">{f.label}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, (f.points / f.weight) * 100)}%` }}
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right tabular-nums">
                        +{f.points} <span className="text-muted-foreground">/{f.weight}</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
        <Link
          to={activity.route}
          className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
        >
          Começar
        </Link>
      </div>
    </Card>
  )
}

export function PlanoDoDia(): JSX.Element {
  const settings = useAppStore((s) => s.settings)
  const [minutes, setMinutes] = useState<number | null>(null)
  const effectiveMinutes = minutes ?? settings?.dailyGoalMinutes ?? 180

  const plan = useAsync(() => api.getDailyPlan(effectiveMinutes), [effectiveMinutes])

  return (
    <div>
      <PageHeader
        title="Plano do Dia"
        subtitle="A ordem ideal de estudo de hoje — determinística e 100% explicável"
        icon={<Compass size={20} />}
      />

      {/* Tempo disponível */}
      <Card className="mb-4 flex flex-wrap items-center gap-2 p-4">
        <span className="mr-1 text-sm font-medium">
          <Clock size={15} className="mr-1.5 inline" />
          Tempo disponível hoje:
        </span>
        {TIME_OPTIONS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMinutes(m)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-semibold transition',
              effectiveMinutes === m
                ? 'border-primary bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted'
            )}
          >
            {fmtMinutes(m)}
          </button>
        ))}
      </Card>

      {plan.loading ? (
        <Loading label="Calculando a melhor estratégia…" />
      ) : plan.error ? (
        <ErrorState message={plan.error} />
      ) : !plan.data ? (
        <ErrorState message="Sem dados." />
      ) : (
        <div className="space-y-4">
          {/* Previsão de conclusão */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CalendarCheck size={16} className="text-primary" /> Previsão de conclusão do edital
              </div>
              <span className="text-xs text-muted-foreground">
                cobertura atual: {plan.data.forecast.editalCoveragePct}%
              </span>
            </div>
            <ProgressBar value={plan.data.forecast.editalCoveragePct} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {plan.data.forecast.projectedFinishDate ? (
                <>
                  No ritmo de <strong>{fmtMinutes(effectiveMinutes)}/dia</strong>, você cobre o edital em{' '}
                  <strong>{fmtDatePtBR(plan.data.forecast.projectedFinishDate)}</strong>
                  {plan.data.forecast.finishBeforeExam === true ? (
                    <span className="font-semibold text-success"> — antes da prova ✓</span>
                  ) : plan.data.forecast.finishBeforeExam === false ? (
                    <span className="font-semibold text-danger">
                      {' '}
                      — depois da prova. Para concluir antes:{' '}
                      {plan.data.forecast.requiredDailyMinutes
                        ? `${fmtMinutes(plan.data.forecast.requiredDailyMinutes)}/dia`
                        : 'aumente o ritmo'}
                    </span>
                  ) : null}
                </>
              ) : (
                'Defina a data da prova em Configurações para a previsão.'
              )}
            </p>
          </Card>

          {/* Plano */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              Plano recomendado · {fmtMinutes(plan.data.totalPlannedMinutes)} de{' '}
              {fmtMinutes(plan.data.availableMinutes)}
            </h2>
          </div>
          {plan.data.items.length === 0 ? (
            <Card className="p-6">
              <EmptyState icon={<Compass size={26} />}>
                Tempo insuficiente para um bloco de estudo — selecione pelo menos 30 minutos.
              </EmptyState>
            </Card>
          ) : (
            <div className="space-y-2.5">
              {plan.data.items.map((item, i) => (
                <PlanItemCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
