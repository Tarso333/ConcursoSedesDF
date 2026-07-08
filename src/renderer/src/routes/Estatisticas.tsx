import { BarChart3, CheckCircle2, Compass, Target, TrendingDown, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import type { Difficulty, DisciplineScore } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { Loading } from '../components/ui/Feedback'
import { RingGauge } from '../components/ui/RingGauge'
import { api } from '../lib/api'
import { fmtNum, fmtWeekday, pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'

const DIFF_LABEL: Record<Difficulty, string> = { FACIL: 'Fáceis', MEDIO: 'Médias', DIFICIL: 'Difíceis' }
const tooltipStyle = {
  backgroundColor: 'hsl(var(--surface))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 10,
  fontSize: 12,
  color: 'hsl(var(--foreground))'
}

function ScoreList({ items, empty }: { items: DisciplineScore[]; empty: string }): JSX.Element {
  if (items.length === 0) return <p className="py-2 text-sm text-muted-foreground">{empty}</p>
  return (
    <div className="space-y-2.5">
      {items.map((d) => (
        <div key={d.disciplineId} className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
          <span className="flex-1 truncate text-sm">{d.name}</span>
          <span className="text-sm font-semibold tabular-nums">{pct(d.accuracy)}</span>
        </div>
      ))}
    </div>
  )
}

export function Estatisticas(): JSX.Element {
  const s = useAsync(() => api.getStatsOverview(), [])
  const plan = useAsync(() => api.getDailyPlan(), [])
  if (s.loading || !s.data) return <Loading label="Calculando suas estatísticas…" />
  const d = s.data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Estatísticas Avançadas"
        subtitle="Onde você está e o que falta para a aprovação"
        icon={<BarChart3 size={20} />}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex items-center gap-5 p-5">
          <RingGauge value={d.readinessPct} color="hsl(var(--primary))">
            <span className="text-2xl font-bold">{d.readinessPct}%</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">prontidão</span>
          </RingGauge>
          <div>
            <CardHeader title="Prontidão para a prova" icon={<Target size={16} />} />
            <p className="mt-2 text-xs text-muted-foreground">
              Acerto ponderado pelos pesos da prova (gerais 20% · específicos 80%).
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <p className="stat-label">Questões resolvidas</p>
          <p className="mt-1 text-3xl font-bold">{fmtNum(d.totalAnswered)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Acerto geral: {pct(d.accuracy)}</p>
        </Card>

        <Card className="p-5">
          <CardHeader title="Acerto por dificuldade" />
          <div className="mt-3 space-y-2">
            {d.byDifficulty.map((b) => (
              <div key={b.difficulty} className="flex items-center gap-2 text-sm">
                <span className="w-16 text-muted-foreground">{DIFF_LABEL[b.difficulty]}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${b.accuracy * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs tabular-nums">
                  {b.answered > 0 ? pct(b.accuracy) : '—'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader title="Radar por disciplina" subtitle="% de acerto" icon={<Target size={16} />} />
          <div className="mt-2 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={d.radar} outerRadius="72%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="discipline"
                  tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  dataKey="accuracy"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Acerto']} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Evolução — 30 dias" subtitle="Questões e acertos" icon={<TrendingUp size={16} />} />
          <div className="mt-2 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d.daily} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sAns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={fmtWeekday}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area dataKey="answered" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#sAns)" />
                <Area dataKey="correct" stroke="hsl(var(--success))" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader title="Seus pontos fortes" icon={<CheckCircle2 size={16} />} />
          <div className="mt-4">
            <ScoreList items={d.bestDisciplines} empty="Resolva questões para ver." />
          </div>
        </Card>
        <Card className="p-5">
          <CardHeader title="Pontos a reforçar" icon={<TrendingDown size={16} />} />
          <div className="mt-4">
            <ScoreList items={d.worstDisciplines} empty="Sem dados ainda." />
          </div>
        </Card>
      </div>

      {/* Ranking do Motor de Estratégia */}
      {plan.data && plan.data.ranking.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <CardHeader
              title="Prioridades da estratégia"
              subtitle="Ranking determinístico do motor — onde cada minuto rende mais"
              icon={<Compass size={16} />}
            />
            <Link
              to="/plano"
              className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
            >
              Plano do Dia
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {plan.data.ranking.slice(0, 6).map((r, i) => (
              <div key={r.disciplineId} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-xs font-bold text-muted-foreground">{i + 1}</span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="w-56 shrink-0 truncate text-sm">{r.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${r.score}%`, backgroundColor: r.color }} />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums">{r.score}</span>
                <span className="hidden w-64 shrink-0 truncate text-xs text-muted-foreground xl:block">
                  {r.topReason}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
