import {
  BookOpen,
  CalendarRange,
  ClipboardCheck,
  PenSquare,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'
import type { StudyTaskType } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { fmtDatePtBR, fmtWeekday } from '../lib/format'
import { useAsync } from '../lib/useAsync'

const TYPE_ICON: Record<StudyTaskType, typeof BookOpen> = {
  TEORIA: BookOpen,
  QUESTOES: PenSquare,
  REVISAO: RotateCcw,
  SIMULADO: ClipboardCheck
}
const TYPE_LABEL: Record<StudyTaskType, string> = {
  TEORIA: 'Teoria',
  QUESTOES: 'Questões',
  REVISAO: 'Revisão',
  SIMULADO: 'Simulado'
}

const today = new Date().toISOString().slice(0, 10)

export function Planejamento(): JSX.Element {
  const plan = useAsync(() => api.getStudyPlan(), [])
  const [dailyMinutes, setDailyMinutes] = useState(180)
  const [generating, setGenerating] = useState(false)

  const generate = async (): Promise<void> => {
    setGenerating(true)
    try {
      await api.generateStudyPlan(dailyMinutes)
      plan.reload()
    } finally {
      setGenerating(false)
    }
  }

  const toggle = async (id: number): Promise<void> => {
    await api.toggleStudyTask(id)
    plan.reload()
  }

  if (plan.loading || !plan.data) return <Loading />
  const p = plan.data
  const hasPlan = p.planId != null && p.totalTasks > 0
  const donePct = p.totalTasks > 0 ? (p.doneTasks / p.totalTasks) * 100 : 0

  return (
    <div>
      <PageHeader
        title="Planejamento Automático"
        subtitle={`Cronograma até a prova (${fmtDatePtBR(p.examDate)})`}
        icon={<CalendarRange size={20} />}
        actions={
          hasPlan ? (
            <Button variant="outline" size="sm" onClick={() => void generate()} disabled={generating}>
              <Sparkles size={15} /> {generating ? 'Gerando…' : 'Refazer plano'}
            </Button>
          ) : undefined
        }
      />

      {!hasPlan ? (
        <Card className="p-6">
          <p className="text-sm font-semibold">Gerar cronograma automático</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Vamos distribuir as disciplinas até {fmtDatePtBR(p.examDate)}, priorizando as de maior peso e
            incidência, com teoria, questões, revisão e um simulado por semana.
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Minutos de estudo por dia</span>
              <input
                type="number"
                min={30}
                step={30}
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(Number(e.target.value))}
                className="w-40 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <Button onClick={() => void generate()} disabled={generating}>
              <Sparkles size={16} /> {generating ? 'Gerando…' : 'Gerar meu plano'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progresso geral</span>
              <span className="text-muted-foreground">
                {p.doneTasks}/{p.totalTasks} tarefas · {Math.round(donePct)}%
              </span>
            </div>
            <ProgressBar value={donePct} className="mt-2" color="hsl(var(--success))" />
          </Card>

          <div className="mt-4 space-y-3">
            {p.byDate.map((day) => {
              const isToday = day.date === today
              return (
                <Card key={day.date} className={cn('p-4', isToday && 'border-primary')}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold capitalize">{fmtWeekday(day.date)}</span>
                    <span className="text-xs text-muted-foreground">{fmtDatePtBR(day.date)}</span>
                    {isToday ? (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        HOJE
                      </span>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    {day.tasks.map((t) => {
                      const Icon = TYPE_ICON[t.type]
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => void toggle(t.id)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg border p-2.5 text-left text-sm transition',
                            t.done ? 'opacity-55' : 'hover:bg-muted'
                          )}
                        >
                          <span
                            className={cn(
                              'grid h-5 w-5 shrink-0 place-items-center rounded border',
                              t.done ? 'border-success bg-success text-white' : 'border-muted-foreground/40'
                            )}
                          >
                            {t.done ? '✓' : ''}
                          </span>
                          <Icon size={15} style={{ color: t.disciplineColor ?? 'hsl(var(--muted-foreground))' }} />
                          <span className={cn('flex-1', t.done && 'line-through')}>{t.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {TYPE_LABEL[t.type]} · {t.plannedMinutes}min
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
