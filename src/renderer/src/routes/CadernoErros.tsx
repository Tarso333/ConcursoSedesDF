import { AlertTriangle, CheckCircle2, ChevronDown, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import type { ErrorStatus, ErrorType } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState, Loading } from '../components/ui/Feedback'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { useAsync } from '../lib/useAsync'

const selectCls =
  'rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring'

const ERROR_TYPES: { value: ErrorType; label: string }[] = [
  { value: 'CONTEUDO', label: 'Não sabia o conteúdo' },
  { value: 'INTERPRETACAO', label: 'Interpretação' },
  { value: 'DISTRACAO', label: 'Falta de atenção' },
  { value: 'PEGADINHA', label: 'Pegadinha da banca' },
  { value: 'CHUTE', label: 'Chutei' },
  { value: 'REVISAR', label: 'Revisar com calma' }
]

export function CadernoErros(): JSX.Element {
  const [disciplineId, setDisciplineId] = useState<number | null>(null)
  const [status, setStatus] = useState<ErrorStatus | 'TODOS'>('ABERTO')
  const [expanded, setExpanded] = useState<number | null>(null)

  const disciplines = useAsync(() => api.getDisciplines(), [])
  const stats = useAsync(() => api.getErrorStats(), [])
  const errors = useAsync(() => api.listErrors({ disciplineId, status }), [disciplineId, status])

  const reloadAll = (): void => {
    errors.reload()
    stats.reload()
  }

  const onSetType = async (id: number, type: ErrorType): Promise<void> => {
    await api.setErrorType(id, type)
    errors.reload()
  }
  const onResolve = async (id: number): Promise<void> => {
    await api.resolveError(id)
    reloadAll()
  }

  return (
    <div>
      <PageHeader
        title="Caderno de Erros"
        subtitle="Transforme cada erro em ponto ganho"
        icon={<AlertTriangle size={20} />}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="stat-label">Erros em aberto</p>
          <p className="mt-1 text-2xl font-bold text-danger">{stats.data?.open ?? 0}</p>
        </Card>
        <Card className="p-4">
          <p className="stat-label">Compreendidos</p>
          <p className="mt-1 text-2xl font-bold text-success">{stats.data?.resolved ?? 0}</p>
        </Card>
        <Card className="p-4">
          <p className="stat-label">Concentração de erros</p>
          <p className="mt-1 truncate text-sm font-medium">
            {stats.data?.byDiscipline?.[0]
              ? `${stats.data.byDiscipline[0].name} (${stats.data.byDiscipline[0].count})`
              : '—'}
          </p>
        </Card>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          className={selectCls}
          value={disciplineId ?? ''}
          onChange={(e) => setDisciplineId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Todas as disciplinas</option>
          {(disciplines.data ?? []).map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <select
          className={selectCls}
          value={status}
          onChange={(e) => setStatus(e.target.value as ErrorStatus | 'TODOS')}
        >
          <option value="ABERTO">Em aberto</option>
          <option value="COMPREENDIDO">Compreendidos</option>
          <option value="TODOS">Todos</option>
        </select>
      </div>

      {errors.loading ? (
        <Loading />
      ) : (errors.data ?? []).length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<CheckCircle2 size={28} />}>
            Nenhum erro {status === 'ABERTO' ? 'em aberto' : 'aqui'}. Continue resolvendo questões!
          </EmptyState>
        </Card>
      ) : (
        <div className="space-y-3">
          {(errors.data ?? []).map((err) => (
            <Card key={err.id} className="p-4">
              <button
                type="button"
                onClick={() => setExpanded(expanded === err.id ? null : err.id)}
                className="flex w-full items-start gap-3 text-left"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: err.disciplineColor }}
                />
                <span className="flex-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {err.disciplineName}
                    {err.status === 'COMPREENDIDO' ? ' · compreendido' : ''}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block text-sm">{err.statement}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'shrink-0 text-muted-foreground transition',
                    expanded === err.id && 'rotate-180'
                  )}
                />
              </button>

              {expanded === err.id ? (
                <div className="mt-3 space-y-3 border-t pt-3 animate-fade-in">
                  {err.correctText ? (
                    <p className="text-sm">
                      <span className="font-semibold text-success">Resposta correta: </span>
                      {err.correctText}
                    </p>
                  ) : null}
                  {err.explanation ? (
                    <div className="rounded-lg border bg-background/50 p-3 text-sm leading-relaxed">
                      <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Lightbulb size={13} /> Comentário
                      </span>
                      {err.explanation}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      className={selectCls}
                      value={err.errorType ?? ''}
                      onChange={(e) => void onSetType(err.id, e.target.value as ErrorType)}
                    >
                      <option value="" disabled>
                        Classificar o erro…
                      </option>
                      {ERROR_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {err.status === 'ABERTO' ? (
                      <Button variant="outline" size="sm" onClick={() => void onResolve(err.id)}>
                        <CheckCircle2 size={15} /> Marcar como compreendido
                      </Button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
