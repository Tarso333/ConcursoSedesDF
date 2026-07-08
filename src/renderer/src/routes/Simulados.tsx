import {
  AlertOctagon,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Flag,
  History,
  Minus,
  Trophy,
  X
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  MockExamConfig,
  MockExamMode,
  MockExamResult,
  MockExamSession
} from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState, Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { fmtDatePtBR, pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { useAppStore } from '../stores/useAppStore'

const selectCls =
  'rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring'

function clock(totalSec: number): string {
  const s = Math.max(0, totalSec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(sec).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

const MODE_LABEL: Record<MockExamMode, string> = {
  OFICIAL: 'Oficial',
  DISCIPLINA: 'Por disciplina',
  PERSONALIZADO: 'Personalizado',
  DIAGNOSTICO: 'Diagnóstico'
}

export function Simulados(): JSX.Element {
  const activeContest = useAppStore((s) => s.activeContest)
  const examCfg = activeContest?.examConfig ?? null
  const oficialTotal = examCfg ? examCfg.blocks.reduce((s, b) => s + b.questions, 0) : null
  const oficialLabel = `${MODE_LABEL.OFICIAL}${activeContest?.board ? ` ${activeContest.board}` : ''}${
    oficialTotal ? ` (${oficialTotal}q)` : ''
  }`
  const oficialHint = examCfg
    ? `${examCfg.blocks.map((b) => `${b.questions} ${b.label.toLowerCase()}`).join(' + ')}, ${
        Math.round((examCfg.durationMin / 60) * 10) / 10
      }h`
    : 'formato oficial da banca'

  const [view, setView] = useState<'config' | 'exam' | 'result'>('config')
  const [mode, setMode] = useState<MockExamMode>('OFICIAL')
  const [disciplineId, setDisciplineId] = useState<number | null>(null)
  const [amount, setAmount] = useState(20)
  const [starting, setStarting] = useState(false)

  const [session, setSession] = useState<MockExamSession | null>(null)
  const [selections, setSelections] = useState<Record<number, number>>({})
  const [index, setIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [result, setResult] = useState<MockExamResult | null>(null)
  const finishingRef = useRef(false)
  const selectionsRef = useRef<Record<number, number>>({})

  useEffect(() => {
    selectionsRef.current = selections
  }, [selections])

  const disciplines = useAsync(() => api.getDisciplines(), [])
  const history = useAsync(() => api.getMockHistory(), [view === 'config'])

  const startExam = async (): Promise<void> => {
    setStarting(true)
    try {
      const config: MockExamConfig = { mode, disciplineId, totalQuestions: amount }
      const s = await api.createMockExam(config)
      setSession(s)
      setSelections({})
      setIndex(0)
      setSecondsLeft(s.timeLimitSec)
      finishingRef.current = false
      setResult(null)
      setView('exam')
    } finally {
      setStarting(false)
    }
  }

  const finishExam = useCallback(async (): Promise<void> => {
    if (!session || finishingRef.current) return
    finishingRef.current = true
    const current = selectionsRef.current
    const answers = session.questions.map((q) => ({
      itemId: q.itemId,
      selectedOptionId: current[q.itemId] ?? null,
      timeMs: 0
    }))
    const r = await api.finishMockExam(session.examId, answers)
    setResult(r)
    setView('result')
    setSecondsLeft(null)
  }, [session])

  // Cronômetro
  useEffect(() => {
    if (view !== 'exam' || secondsLeft == null) return
    if (secondsLeft <= 0) {
      void finishExam()
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s == null ? s : s - 1)), 1000)
    return () => clearTimeout(t)
  }, [view, secondsLeft, finishExam])

  // ---------- CONFIG ----------
  if (view === 'config') {
    return (
      <div>
        <PageHeader
          title="Simulados Inteligentes"
          subtitle="Treine no formato real da prova Quadrix"
          icon={<ClipboardCheck size={20} />}
        />

        <Card className="p-5">
          <p className="text-sm font-semibold">Configurar simulado</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(['OFICIAL', 'DISCIPLINA', 'PERSONALIZADO'] as MockExamMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-lg border p-3 text-left text-sm transition',
                  mode === m ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <span className="block font-semibold">
                  {m === 'OFICIAL' ? oficialLabel : MODE_LABEL[m]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {m === 'OFICIAL'
                    ? oficialHint
                    : m === 'DISCIPLINA'
                      ? 'foco numa disciplina'
                      : 'você escolhe a quantidade'}
                </span>
              </button>
            ))}
          </div>

          {mode !== 'OFICIAL' ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <select
                className={selectCls}
                value={disciplineId ?? ''}
                onChange={(e) => setDisciplineId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">{mode === 'DISCIPLINA' ? 'Escolha a disciplina' : 'Todas as disciplinas'}</option>
                {(disciplines.data ?? []).map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select className={selectCls} value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
                {[10, 20, 30, 40].map((n) => (
                  <option key={n} value={n}>
                    {n} questões
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="mt-5 flex justify-end border-t pt-4">
            <Button
              onClick={() => void startExam()}
              disabled={starting || (mode === 'DISCIPLINA' && !disciplineId)}
            >
              {starting ? 'Montando…' : 'Iniciar simulado'} <ChevronRight size={16} />
            </Button>
          </div>
        </Card>

        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <History size={16} className="text-primary" /> Histórico
          </div>
          {history.loading ? (
            <Loading />
          ) : (history.data ?? []).length === 0 ? (
            <Card className="p-6">
              <EmptyState icon={<ClipboardCheck size={26} />}>
                Nenhum simulado ainda. Faça o primeiro acima!
              </EmptyState>
            </Card>
          ) : (
            <div className="space-y-2">
              {(history.data ?? []).map((h) => (
                <Card
                  key={h.id}
                  className="flex cursor-pointer items-center justify-between gap-3 p-3 transition hover:border-primary"
                  onClick={() => {
                    void api.getMockResult(h.id).then((r) => {
                      setResult(r)
                      setView('result')
                    })
                  }}
                >
                  <div>
                    <p className="text-sm font-medium">{h.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {h.totalQuestions} questões · {h.finishedAt ? fmtDatePtBR(h.finishedAt.slice(0, 10)) : '—'}
                    </p>
                  </div>
                  <span className="text-lg font-bold">{pct(h.scorePct)}</span>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ---------- EXAM ----------
  if (view === 'exam' && session) {
    const q = session.questions[index]
    const answeredCount = Object.keys(selections).length
    return (
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">{session.title}</h1>
            <p className="text-xs text-muted-foreground">
              {answeredCount}/{session.questions.length} respondidas
            </p>
          </div>
          {secondsLeft != null ? (
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-lg font-bold',
                secondsLeft < 300 ? 'border-danger/50 text-danger' : ''
              )}
            >
              <Clock size={18} /> {clock(secondsLeft)}
            </div>
          ) : null}
        </div>

        {/* Grade de navegação */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {session.questions.map((item, i) => (
            <button
              key={item.itemId}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                'h-8 w-8 rounded-md border text-xs font-semibold transition',
                i === index
                  ? 'border-primary ring-2 ring-ring'
                  : selections[item.itemId] != null
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'hover:bg-muted'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: q.disciplineColor }} />
            <span className="font-medium">{q.disciplineName}</span>
            <span
              className="rounded-full px-2 py-0.5 font-semibold"
              style={{
                backgroundColor: q.block === 'ESPECIFICO' ? 'hsl(var(--primary) / 0.15)' : 'hsl(var(--muted))',
                color: q.block === 'ESPECIFICO' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
              }}
            >
              {q.block === 'ESPECIFICO' ? 'Específico' : 'Geral'}
            </span>
          </div>
          <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">{q.statement}</p>
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelections((s) => ({ ...s, [q.itemId]: opt.id }))}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition',
                  selections[q.itemId] === opt.id ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-bold">
                  {opt.letter}
                </span>
                <span className="pt-0.5">{opt.text}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              <ChevronLeft size={16} /> Anterior
            </Button>
            {index + 1 < session.questions.length ? (
              <Button size="sm" onClick={() => setIndex((i) => i + 1)}>
                Próxima <ChevronRight size={16} />
              </Button>
            ) : (
              <Button size="sm" onClick={() => void finishExam()}>
                <Flag size={15} /> Finalizar
              </Button>
            )}
          </div>
        </Card>

        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => void finishExam()}>
            Finalizar e corrigir agora
          </Button>
        </div>
      </div>
    )
  }

  // ---------- RESULT ----------
  if (view === 'result' && result) {
    return <ResultView result={result} onNew={() => setView('config')} />
  }

  return <Loading />
}

function ResultView({ result, onNew }: { result: MockExamResult; onNew: () => void }): JSX.Element {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const isOficial = result.mode === 'OFICIAL'

  return (
    <div>
      <PageHeader title="Resultado do simulado" subtitle={result.title} icon={<Trophy size={20} />} />

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="stat-label">Pontuação</p>
            <p className="text-4xl font-extrabold">{pct(result.scorePct)}</p>
            <p className="text-sm text-muted-foreground">
              {result.scorePoints.toFixed(0)} de {result.maxPoints.toFixed(0)} pontos · {result.correct}/
              {result.totalQuestions} acertos
            </p>
          </div>
          {isOficial ? (
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold',
                result.eliminated ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
              )}
            >
              {result.eliminated ? <AlertOctagon size={18} /> : <Check size={18} />}
              {result.eliminated ? 'Abaixo do corte de eliminação' : 'Acima do corte de eliminação'}
            </div>
          ) : null}
        </div>

        {isOficial && result.blockScores.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {result.blockScores.map((b) => (
              <div key={b.block}>
                <p className="mb-1 flex justify-between text-xs font-medium">
                  <span>{b.label}</span>
                  <span>
                    {b.points}/{b.max} pts
                  </span>
                </p>
                <ProgressBar
                  value={b.max ? (b.points / b.max) * 100 : 0}
                  color={b.belowCutoff ? 'hsl(var(--danger))' : 'hsl(var(--success))'}
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  corte: {b.minScorePct}% ({Math.ceil((b.minScorePct / 100) * b.max)} pts)
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <p className="mb-3 text-sm font-semibold">Desempenho por disciplina</p>
          <div className="space-y-2.5">
            {result.byDiscipline.map((d) => (
              <div key={d.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} /> {d.name}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {d.correct}/{d.total}
                  </span>
                </div>
                <ProgressBar value={d.total ? (d.correct / d.total) * 100 : 0} color={d.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <p className="mb-3 text-sm font-semibold">Gabarito comentado</p>
          <div className="max-h-[360px] space-y-1.5 overflow-y-auto pr-1">
            {result.items.map((it, i) => (
              <div key={it.questionId} className="rounded-lg border">
                <button
                  type="button"
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  className="flex w-full items-center gap-2 p-2.5 text-left text-sm"
                >
                  <span
                    className={cn(
                      'grid h-6 w-6 shrink-0 place-items-center rounded-md',
                      it.correct
                        ? 'bg-success/15 text-success'
                        : it.answered
                          ? 'bg-danger/15 text-danger'
                          : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {it.correct ? <Check size={14} /> : it.answered ? <X size={14} /> : <Minus size={14} />}
                  </span>
                  <span className="flex-1 truncate text-xs">
                    {i + 1}. {it.statement}
                  </span>
                </button>
                {openItem === i && it.explanation ? (
                  <p className="border-t p-3 text-xs leading-relaxed text-muted-foreground">{it.explanation}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <Button onClick={onNew}>Novo simulado</Button>
      </div>
    </div>
  )
}
