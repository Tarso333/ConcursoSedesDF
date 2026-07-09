// Visualização do Learning Analytics — APENAS renderização: todo cálculo
// vive no motor puro (src/main/analytics/engine.ts).
import {
  AlertTriangle,
  Brain,
  ChevronDown,
  Eye,
  Gauge,
  LineChart as LineChartIcon,
  TrendingDown,
  TrendingUp,
  User
} from 'lucide-react'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import type { DisciplineHeatmapRow, LearningTrend } from '@shared/domain'
import { api } from '../../lib/api'
import { cn } from '../../lib/cn'
import { fmtDatePtBR, pct } from '../../lib/format'
import { useAsync } from '../../lib/useAsync'
import { Card, CardHeader } from '../ui/Card'
import { Loading } from '../ui/Feedback'
import { ProgressBar } from '../ui/ProgressBar'

const tooltipStyle = {
  backgroundColor: 'hsl(var(--surface))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 10,
  fontSize: 12,
  color: 'hsl(var(--foreground))'
}

const TREND_META: Record<LearningTrend, { label: string; color: string; Icon: typeof TrendingUp }> = {
  MELHORANDO: { label: 'Melhorando', color: 'hsl(var(--success))', Icon: TrendingUp },
  ESTAVEL: { label: 'Estável', color: 'hsl(var(--primary))', Icon: Gauge },
  PIORANDO: { label: 'Piorando', color: 'hsl(var(--danger))', Icon: TrendingDown }
}

function HeatmapRow({ row }: { row: DisciplineHeatmapRow }): JSX.Element {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg border">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 p-3 text-left">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: row.color }} />
        <span className="w-52 shrink-0 truncate text-sm font-medium">{row.name}</span>
        <div className="min-w-0 flex-1">
          <ProgressBar value={row.masteryPct} color={row.color} />
        </div>
        <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums">{row.masteryPct}%</span>
        <span className="hidden w-24 shrink-0 text-right text-[11px] text-muted-foreground sm:block">
          cobre {row.coveragePct}%
        </span>
        <ChevronDown size={15} className={cn('shrink-0 text-muted-foreground transition', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="space-y-1.5 border-t px-3 py-2.5">
          {row.topics.map((t) => {
            const trend = TREND_META[t.trend]
            return (
              <div key={t.topicId} className="flex items-center gap-3">
                <span className="w-64 shrink-0 truncate text-xs text-muted-foreground">{t.name}</span>
                <div className="min-w-0 flex-1">
                  <ProgressBar value={t.masteryPct} color={row.color} className="h-1.5" />
                </div>
                <span className="w-9 shrink-0 text-right text-[11px] tabular-nums">{t.masteryPct}%</span>
                <trend.Icon size={12} className="shrink-0" style={{ color: trend.color }} />
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export function LearningAnalyticsSection(): JSX.Element {
  const analytics = useAsync(() => api.getLearningAnalytics(), [])

  if (analytics.loading) return <Loading label="Analisando como você aprende…" />
  if (!analytics.data) return <></>
  const a = analytics.data
  const trend = TREND_META[a.globalTrend]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain size={18} className="text-primary" />
          <h2 className="text-lg font-bold tracking-tight">Learning Analytics</h2>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: trend.color }}
        >
          <trend.Icon size={13} /> Tendência geral: {trend.label}
        </span>
      </div>

      {/* Indicadores (registro extensível) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {a.indicators.map((ind) => (
          <Card key={ind.key} className="p-4">
            <p className="stat-label">{ind.label}</p>
            <p className="mt-1 text-2xl font-bold leading-none">
              {ind.value != null ? `${ind.value}${ind.unit === '%' ? '%' : ` ${ind.unit}`}` : '—'}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">{ind.detail}</p>
          </Card>
        ))}
      </div>

      {/* Taxa de acerto móvel */}
      <Card className="flex flex-wrap items-center gap-4 p-4">
        <span className="text-sm font-semibold">Taxa de acerto móvel:</span>
        {a.rollingAccuracy.map((r) => (
          <span key={r.windowDays} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {r.windowDays}d:{' '}
            <strong>{r.accuracy != null ? pct(r.accuracy) : '—'}</strong>
            <span className="text-muted-foreground"> ({r.answered}q)</span>
          </span>
        ))}
      </Card>

      {/* Curvas */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader
            title="Curva de evolução"
            subtitle="Domínio global por semana (replay do histórico)"
            icon={<LineChartIcon size={16} />}
          />
          <div className="mt-3 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={a.learningCurve} margin={{ top: 5, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="laCurve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => fmtDatePtBR(String(d)).slice(0, 5)}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => fmtDatePtBR(String(d))} formatter={(v) => [`${v}%`, 'Domínio']} />
                <Area type="monotone" dataKey="masteryPct" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#laCurve)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader
            title="Curva de esquecimento"
            subtitle="Projeção do domínio se você parar de praticar hoje"
            icon={<TrendingDown size={16} />}
          />
          <div className="mt-3 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={a.forgettingCurve} margin={{ top: 5, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => fmtDatePtBR(String(d)).slice(0, 5)}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => fmtDatePtBR(String(d))} formatter={(v) => [`${v}%`, 'Domínio projetado']} />
                <Line type="monotone" dataKey="masteryPct" stroke="hsl(var(--warning))" strokeWidth={2} strokeDasharray="6 4" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Heatmap do edital */}
      <Card className="p-5">
        <CardHeader
          title="Heatmap do edital"
          subtitle="Domínio derivado por disciplina e tópico — clique para expandir"
          icon={<Eye size={16} />}
        />
        <div className="mt-4 space-y-2">
          {a.heatmap.map((row) => (
            <HeatmapRow key={row.disciplineId} row={row} />
          ))}
        </div>
      </Card>

      {/* Grafo de aprendizagem (M18): centralidade, gargalos, cadeias */}
      {a.graph.chains.length + a.graph.mostConnected.length + a.graph.bottlenecks.length > 0 ? (
        <Card className="p-5">
          <CardHeader
            title="Grafo de aprendizagem"
            subtitle="Tópicos centrais, gargalos e cadeias — derivados das conexões do edital"
            icon={<Brain size={16} />}
          />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Mais conectados
              </p>
              {a.graph.mostConnected.length === 0 ? (
                <p className="text-xs text-muted-foreground">sem conexões mapeadas</p>
              ) : (
                a.graph.mostConnected.map((t) => (
                  <p key={t.topicId} className="truncate text-xs text-muted-foreground">
                    • {t.name} <span className="opacity-70">({t.connections})</span>
                  </p>
                ))
              )}
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-warning">
                Gargalos (bloqueiam outros)
              </p>
              {a.graph.bottlenecks.length === 0 ? (
                <p className="text-xs text-muted-foreground">nenhum gargalo ativo 🎉</p>
              ) : (
                a.graph.bottlenecks.map((t) => (
                  <p key={t.topicId} className="truncate text-xs text-muted-foreground">
                    • {t.name} <span className="opacity-70">bloqueia {t.blocks} tópico(s)</span>
                  </p>
                ))
              )}
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Cadeias de aprendizado
              </p>
              {a.graph.chains.length === 0 ? (
                <p className="text-xs text-muted-foreground">sem cadeias mapeadas</p>
              ) : (
                a.graph.chains.slice(0, 4).map((c) => (
                  <div key={c.key} className="mb-1.5">
                    <p className="truncate text-xs text-muted-foreground">
                      {c.title} <span className="opacity-70">({c.topics.length} tópicos)</span>
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${c.coveragePct}%` }}
                        />
                      </div>
                      <span className="text-[10px] tabular-nums text-muted-foreground">
                        {c.coveragePct}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      ) : null}

      {/* Perfil + confiança */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <CardHeader title="Perfil do estudante" subtitle="Calculado automaticamente do seu uso" icon={<User size={16} />} />
          <div className="mt-4 space-y-2.5">
            {a.profile.map((t) => (
              <div key={t.key} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-xs text-muted-foreground">{t.label}</span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                    t.favorable === true
                      ? 'bg-success/15 text-success'
                      : t.favorable === false
                        ? 'bg-warning/15 text-warning'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {t.classification}
                </span>
                <span className="hidden truncate text-[11px] text-muted-foreground md:block">{t.description}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader
            title="Checagem de confiança"
            subtitle="Status declarado × domínio derivado (Conteúdo vs. prática)"
            icon={<AlertTriangle size={16} />}
          />
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <p className="mb-1 font-semibold text-warning">Excesso de confiança</p>
              {a.overconfident.length === 0 ? (
                <p className="text-muted-foreground">nenhum — suas marcações batem com a prática ✓</p>
              ) : (
                a.overconfident.map((t) => (
                  <p key={t.topicId} className="text-muted-foreground">
                    • {t.name} <span className="opacity-70">({t.disciplineName})</span> — declarado dominado,
                    domínio {t.masteryPct}%
                  </p>
                ))
              )}
            </div>
            <div>
              <p className="mb-1 font-semibold text-success">Força escondida</p>
              {a.underconfident.length === 0 ? (
                <p className="text-muted-foreground">nenhuma detectada ainda</p>
              ) : (
                a.underconfident.map((t) => (
                  <p key={t.topicId} className="text-muted-foreground">
                    • {t.name} <span className="opacity-70">({t.disciplineName})</span> — domínio {t.masteryPct}%,
                    ainda não marcado como dominado
                  </p>
                ))
              )}
            </div>
            {a.methodStats.length > 0 ? (
              <div>
                <p className="mb-1 font-semibold">Eficiência por método (60d)</p>
                {a.methodStats.map((m) => (
                  <p key={m.source} className="text-muted-foreground">
                    • {m.label}: {pct(m.accuracy)} de acerto ({m.answered}q)
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  )
}
