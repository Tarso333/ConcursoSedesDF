import { ArrowRight, Flame, Rocket, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { RingGauge } from '../components/ui/RingGauge'
import { api } from '../lib/api'
import { pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'

export function ModoAprovacao(): JSX.Element {
  const plan = useAsync(() => api.getApprovalPlan(), [])
  const navigate = useNavigate()

  if (plan.loading || !plan.data) return <Loading />
  const p = plan.data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Modo Aprovação"
        subtitle="Plano agressivo focado no maior retorno até a prova"
        icon={<Rocket size={20} />}
      />

      <Card className="flex flex-wrap items-center gap-6 bg-primary p-6 text-primary-foreground">
        <RingGauge value={p.approvalEstimatePct} color="hsl(var(--primary-foreground))">
          <span className="text-2xl font-bold">{p.approvalEstimatePct}%</span>
          <span className="text-[10px] uppercase tracking-wide opacity-80">aprovação</span>
        </RingGauge>
        <div>
          <p className="text-4xl font-extrabold leading-none">{p.daysUntilExam} dias</p>
          <p className="mt-1 text-sm opacity-90">até a prova. Cada dia conta — ataque o que mais pontua.</p>
        </div>
      </Card>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Flame size={16} className="text-warning" />
          <h2 className="text-sm font-semibold">Prioridades (fraqueza × peso na prova)</h2>
        </div>
        <div className="space-y-2.5">
          {p.focus.map((d, i) => (
            <Card key={d.disciplineId} className="flex items-center gap-4 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-sm font-bold">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="truncate text-sm font-semibold">{d.name}</span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: d.block === 'ESPECIFICO' ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--muted))',
                      color: d.block === 'ESPECIFICO' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
                    }}
                  >
                    peso {d.weight}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{d.reason}</p>
                <ProgressBar value={d.accuracy * 100} className="mt-2" color={d.color} />
              </div>
              <span className="shrink-0 text-right text-sm font-semibold tabular-nums">
                {d.answeredCount > 0 ? pct(d.accuracy) : '—'}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Target size={16} className="text-primary" />
          <h2 className="text-sm font-semibold">Plano de ataque de hoje</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {p.actions.map((a) => (
            <Card
              key={a.route}
              className="flex cursor-pointer items-center gap-3 p-4 transition hover:border-primary"
              onClick={() => navigate(a.route)}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-muted-foreground" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
