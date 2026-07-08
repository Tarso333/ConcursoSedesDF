import {
  Activity,
  CalendarClock,
  CheckCircle2,
  Compass,
  Flame,
  Target,
  TrendingUp,
  Trophy,
  XCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import type { DisciplineScore, DisciplineWithStats } from '@shared/domain'
import { Card, CardHeader } from '../components/ui/Card'
import { ErrorState, Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { RingGauge } from '../components/ui/RingGauge'
import { StatCard } from '../components/ui/StatCard'
import { api } from '../lib/api'
import { fmtDatePtBR, fmtMinutes, fmtNum, fmtWeekday, pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function approvalLabel(p: number): { text: string; color: string } {
  if (p >= 70) return { text: 'Forte', color: 'hsl(var(--success))' }
  if (p >= 45) return { text: 'Promissora', color: 'hsl(var(--primary))' }
  if (p >= 25) return { text: 'Em construção', color: 'hsl(var(--warning))' }
  return { text: 'Começando', color: 'hsl(var(--danger))' }
}

function BlockTag({ block }: { block: 'GERAL' | 'ESPECIFICO' }): JSX.Element {
  const isEsp = block === 'ESPECIFICO'
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{
        backgroundColor: isEsp ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--muted))',
        color: isEsp ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
      }}
    >
      {isEsp ? 'Específico' : 'Geral'}
    </span>
  )
}

function ScoreRow({ d }: { d: DisciplineScore }): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
      <span className="flex-1 truncate text-sm">{d.name}</span>
      <span className="text-sm font-semibold tabular-nums">{pct(d.accuracy)}</span>
      <span className="w-14 text-right text-xs text-muted-foreground tabular-nums">
        {fmtNum(d.answeredCount)} q.
      </span>
    </div>
  )
}

function DisciplineProgress({ d }: { d: DisciplineWithStats }): JSX.Element {
  return (
    <div className="rounded-lg border bg-background/40 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
          <span className="truncate text-sm font-medium">{d.name}</span>
        </div>
        <BlockTag block={d.block} />
      </div>
      <div className="mt-2.5 flex items-center gap-3">
        <ProgressBar value={d.masteryPct} color={d.color} className="flex-1" />
        <span className="w-9 text-right text-xs font-semibold tabular-nums">{d.masteryPct}%</span>
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        {d.answeredCount > 0
          ? `${fmtNum(d.answeredCount)} resolvidas · ${pct(d.accuracy)} de acerto`
          : `${d.topicsCount} tópicos · ainda não iniciada`}
      </p>
    </div>
  )
}

const chartTooltipStyle = {
  backgroundColor: 'hsl(var(--surface))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 10,
  fontSize: 12,
  color: 'hsl(var(--foreground))'
}

export function Dashboard(): JSX.Element {
  const overview = useAsync(() => api.getDashboardOverview(), [])
  const disciplines = useAsync(() => api.getDisciplinesWithStats(), [])
  const plan = useAsync(() => api.getDailyPlan(), [])

  if (overview.loading || disciplines.loading) return <Loading label="Montando seu painel…" />
  if (overview.error) return <ErrorState message={overview.error} />
  if (!overview.data) return <ErrorState message="Sem dados." />

  const o = overview.data
  const discs = disciplines.data ?? []
  const hasActivity = o.answeredCount > 0
  const approval = approvalLabel(o.approvalEstimatePct)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting()}, {o.userName}.
        </h1>
        <p className="text-sm text-muted-foreground">
          {o.examDate ? (
            <>
              Faltam <span className="font-semibold text-foreground">{o.daysUntilExam} dias</span> para
              a prova {o.contestName} ({fmtDatePtBR(o.examDate)}).
            </>
          ) : (
            <>Preparação para {o.contestName}.</>
          )}{' '}
          {o.heavyBlockLabel && o.heavyBlockSharePct != null
            ? `${o.heavyBlockLabel} vale ${o.heavyBlockSharePct}% da nota — foco nele.`
            : 'Constância diária é o que aprova.'}
        </p>
      </div>

      {/* Linha de destaque: contagem, estimativa de aprovação, progresso do edital */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col justify-between bg-primary p-5 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm font-medium opacity-90">
            <CalendarClock size={18} /> Reta final
          </div>
          <div className="mt-3">
            <p className="text-5xl font-extrabold leading-none">{o.daysUntilExam}</p>
            <p className="mt-1 text-sm opacity-90">
              {o.examDate ? `dias até ${fmtDatePtBR(o.examDate)}` : 'data da prova não definida'}
            </p>
          </div>
          <p className="mt-4 text-xs opacity-80">
            {o.daysUntilExam > 45
              ? 'Fase de base: cubra o edital e crie os flashcards de lei seca.'
              : o.daysUntilExam > 15
                ? 'Consolidação: simulados por disciplina + revisão dos erros.'
                : 'Reta final: simulados completos e revisão dos decks críticos.'}
          </p>
        </Card>

        <Card className="flex items-center gap-5 p-5">
          <RingGauge value={o.approvalEstimatePct} color={approval.color}>
            <span className="text-2xl font-bold">{o.approvalEstimatePct}%</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">estimativa</span>
          </RingGauge>
          <div>
            <CardHeader title="Probabilidade de aprovação" icon={<Target size={16} />} />
            <p className="mt-2 text-sm font-semibold" style={{ color: approval.color }}>
              Tendência: {approval.text}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Estimativa a partir do seu desempenho por bloco, ponderada pelos pesos da prova.
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-5 p-5">
          <RingGauge value={o.editalProgressPct} color="hsl(var(--accent))">
            <span className="text-2xl font-bold">{o.editalProgressPct}%</span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">do edital</span>
          </RingGauge>
          <div>
            <CardHeader title="Progresso do edital" icon={<TrendingUp size={16} />} />
            <p className="mt-2 text-xs text-muted-foreground">
              Domínio médio ponderado pela incidência estimada de cada disciplina na prova.
            </p>
          </div>
        </Card>
      </div>

      {/* Métricas rápidas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Questões resolvidas"
          value={fmtNum(o.answeredCount)}
          sub={`de ${fmtNum(o.totalQuestions)} no banco`}
          icon={<Activity size={16} />}
        />
        <StatCard
          label="Taxa de acerto"
          value={hasActivity ? pct(o.accuracy) : '—'}
          sub={
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-success">
                <CheckCircle2 size={12} /> {fmtNum(o.correctCount)}
              </span>
              <span className="inline-flex items-center gap-1 text-danger">
                <XCircle size={12} /> {fmtNum(o.wrongCount)}
              </span>
            </span>
          }
          icon={<Target size={16} />}
          accent="hsl(var(--success))"
        />
        <StatCard
          label="Tempo de estudo"
          value={fmtMinutes(o.studyMinutesTotal)}
          sub={
            <span className="inline-flex items-center gap-1 text-warning">
              <Flame size={12} /> {o.studyStreakDays} dias de sequência
            </span>
          }
          icon={<CalendarClock size={16} />}
          accent="hsl(var(--warning))"
        />
        <StatCard
          label="Nível"
          value={`Nv. ${o.level}`}
          sub={`${fmtNum(o.xp)} XP acumulados`}
          icon={<Trophy size={16} />}
          accent="hsl(var(--accent))"
        />
      </div>

      {/* Plano do dia (Motor de Estratégia) */}
      {plan.data && plan.data.items.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <CardHeader
              title="Plano de hoje"
              subtitle="Calculado pelo motor de estratégia — determinístico e explicável"
              icon={<Compass size={16} />}
            />
            <Link
              to="/plano"
              className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
            >
              Ver plano completo
            </Link>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {plan.data.items.slice(0, 3).map((item, i) => (
              <div key={item.id} className="rounded-lg border bg-background/40 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.disciplineColor }}
                  />
                  <span className="truncate">{item.disciplineName}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.activity === 'QUESTOES' && item.questionTarget
                    ? `${item.questionTarget} questões (~${item.minutes} min)`
                    : `${item.minutes} min`}
                  {item.reasons[0] ? ` · ${item.reasons[0]}` : ''}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {/* Evolução */}
      <Card className="p-5">
        <CardHeader
          title="Evolução — últimos 14 dias"
          subtitle="Questões resolvidas e acertos por dia"
          icon={<TrendingUp size={16} />}
        />
        <div className="mt-4 h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={o.last14Days} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gAnswered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCorrect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={fmtWeekday}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                labelFormatter={(d) => fmtDatePtBR(String(d))}
                formatter={(value, name) =>
                  [value, name === 'answered' ? 'Resolvidas' : 'Acertos'] as [number, string]
                }
              />
              <Area
                type="monotone"
                dataKey="answered"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#gAnswered)"
              />
              <Area
                type="monotone"
                dataKey="correct"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                fill="url(#gCorrect)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Fortes e fracas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader title="Matérias fortes" icon={<CheckCircle2 size={16} />} />
          <div className="mt-4 space-y-3">
            {o.strongDisciplines.length > 0 ? (
              o.strongDisciplines.map((d) => <ScoreRow key={d.disciplineId} d={d} />)
            ) : (
              <p className="py-3 text-sm text-muted-foreground">
                Resolva questões para descobrir seus pontos fortes.
              </p>
            )}
          </div>
        </Card>
        <Card className="p-5">
          <CardHeader title="Matérias a reforçar" icon={<Target size={16} />} />
          <div className="mt-4 space-y-3">
            {o.weakDisciplines.length > 0 ? (
              o.weakDisciplines.map((d) => <ScoreRow key={d.disciplineId} d={d} />)
            ) : (
              <p className="py-3 text-sm text-muted-foreground">
                Sem dados ainda — comece pelo banco de questões.
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Progresso por disciplina */}
      <Card className="p-5">
        <CardHeader
          title="Progresso por disciplina"
          subtitle={`${discs.length} disciplinas do edital`}
          icon={<Activity size={16} />}
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {discs.map((d) => (
            <DisciplineProgress key={d.id} d={d} />
          ))}
        </div>
        {!hasActivity ? (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {o.heavyBlockLabel
              ? `Dica: comece pelo bloco "${o.heavyBlockLabel}" — é o de maior peso na nota.`
              : 'Dica: comece resolvendo questões das disciplinas de maior peso.'}
          </p>
        ) : null}
      </Card>
    </div>
  )
}
