import {
  BookOpen,
  Check,
  ChevronRight,
  Filter,
  RotateCcw,
  Star,
  Trophy,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type {
  AnswerResult,
  Difficulty,
  QuestionFilter,
  QuestionFilterStatus,
  QuestionForPractice,
  QuestionType
} from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { fmtMinutes, fmtNum, pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'

const selectCls =
  'rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring'

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  FACIL: 'Fácil',
  MEDIO: 'Médio',
  DIFICIL: 'Difícil'
}
const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  FACIL: 'hsl(var(--success))',
  MEDIO: 'hsl(var(--warning))',
  DIFICIL: 'hsl(var(--danger))'
}
const STATUS_OPTIONS: { value: QuestionFilterStatus; label: string }[] = [
  { value: 'TODAS', label: 'Todas' },
  { value: 'NAO_RESPONDIDAS', label: 'Não respondidas' },
  { value: 'ERRADAS', label: 'Que eu errei' },
  { value: 'ACERTADAS', label: 'Que eu acertei' },
  { value: 'FAVORITAS', label: 'Favoritas' }
]
const AMOUNTS = [5, 10, 20, 30]

export function Questoes(): JSX.Element {
  const [mode, setMode] = useState<'config' | 'practice' | 'summary'>('config')
  const [filter, setFilter] = useState<QuestionFilter>({ status: 'TODAS' })
  const [limit, setLimit] = useState(10)

  const [queue, setQueue] = useState<QuestionForPractice[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [starting, setStarting] = useState(false)

  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [sessionMs, setSessionMs] = useState(0)
  const startRef = useRef<number>(Date.now())

  const disciplines = useAsync(() => api.getDisciplines(), [])
  const topics = useAsync(
    () => (filter.disciplineId ? api.getTopics(filter.disciplineId) : Promise.resolve([])),
    [filter.disciplineId]
  )
  const count = useAsync(
    () => api.countQuestions(filter),
    [filter.disciplineId, filter.topicId, filter.difficulty, filter.type, filter.status, filter.search]
  )

  useEffect(() => {
    startRef.current = Date.now()
    setSelected(null)
    setResult(null)
  }, [index, mode])

  const patch = (p: Partial<QuestionFilter>): void => setFilter((f) => ({ ...f, ...p }))

  async function start(): Promise<void> {
    setStarting(true)
    try {
      const qs = await api.getPracticeQuestions(filter, limit)
      setQueue(qs)
      setIndex(0)
      setCorrect(0)
      setAnswered(0)
      setSessionMs(0)
      setMode('practice')
    } finally {
      setStarting(false)
    }
  }

  async function submit(): Promise<void> {
    if (selected == null || result) return
    const current = queue[index]
    const timeMs = Date.now() - startRef.current
    const r = await api.answerQuestion({
      questionId: current.id,
      selectedOptionId: selected,
      timeMs,
      source: 'BANCO'
    })
    setResult(r)
    setAnswered((a) => a + 1)
    setSessionMs((m) => m + timeMs)
    if (r.isCorrect) setCorrect((c) => c + 1)
  }

  function next(): void {
    if (index + 1 >= queue.length) setMode('summary')
    else setIndex((i) => i + 1)
  }

  async function toggleFav(): Promise<void> {
    const current = queue[index]
    const { favorite } = await api.toggleFavorite(current.id)
    setQueue((q) => q.map((x, i) => (i === index ? { ...x, favorite } : x)))
  }

  // ---------- CONFIG ----------
  if (mode === 'config') {
    const available = count.data ?? 0
    return (
      <div>
        <PageHeader
          title="Banco de Questões"
          subtitle="Monte seu treino e resolva com feedback imediato"
          icon={<BookOpen size={20} />}
        />
        <Card className="p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Filter size={16} className="text-primary" /> Filtros
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Disciplina</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={filter.disciplineId ?? ''}
                onChange={(e) =>
                  patch({
                    disciplineId: e.target.value ? Number(e.target.value) : null,
                    topicId: null
                  })
                }
              >
                <option value="">Todas as disciplinas</option>
                {(disciplines.data ?? []).map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Assunto</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={filter.topicId ?? ''}
                disabled={!filter.disciplineId}
                onChange={(e) => patch({ topicId: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="">Todos os assuntos</option>
                {(topics.data ?? []).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Situação</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={filter.status ?? 'TODAS'}
                onChange={(e) => patch({ status: e.target.value as QuestionFilterStatus })}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Dificuldade</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={filter.difficulty ?? ''}
                onChange={(e) =>
                  patch({ difficulty: (e.target.value || null) as Difficulty | null })
                }
              >
                <option value="">Qualquer</option>
                <option value="FACIL">Fácil</option>
                <option value="MEDIO">Médio</option>
                <option value="DIFICIL">Difícil</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Tipo</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={filter.type ?? ''}
                onChange={(e) => patch({ type: (e.target.value || null) as QuestionType | null })}
              >
                <option value="">Qualquer</option>
                <option value="ME">Múltipla escolha</option>
                <option value="CE">Certo/Errado</option>
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Quantidade</span>
              <select
                className={cn(selectCls, 'w-full')}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {AMOUNTS.map((a) => (
                  <option key={a} value={a}>
                    {a} questões
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 border-t pt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{fmtNum(available)}</span> questões
              disponíveis com esses filtros
            </p>
            <Button onClick={() => void start()} disabled={available === 0 || starting}>
              {starting ? 'Carregando…' : 'Iniciar treino'}
              <ChevronRight size={16} />
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // ---------- SUMMARY ----------
  if (mode === 'summary') {
    const acc = answered > 0 ? correct / answered : 0
    return (
      <div>
        <PageHeader title="Resultado do treino" icon={<Trophy size={20} />} />
        <Card className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <p className="stat-label">Questões</p>
              <p className="text-2xl font-bold">{answered}</p>
            </div>
            <div>
              <p className="stat-label">Acertos</p>
              <p className="text-2xl font-bold text-success">{correct}</p>
            </div>
            <div>
              <p className="stat-label">Erros</p>
              <p className="text-2xl font-bold text-danger">{answered - correct}</p>
            </div>
            <div>
              <p className="stat-label">Aproveitamento</p>
              <p className="text-2xl font-bold">{pct(acc)}</p>
            </div>
          </div>
          <ProgressBar value={acc * 100} className="mt-4" color="hsl(var(--success))" />
          <p className="mt-3 text-sm text-muted-foreground">
            Tempo total: {fmtMinutes(Math.round(sessionMs / 60000))} ·{' '}
            {answered > 0 ? `${Math.round(sessionMs / answered / 1000)}s por questão` : '—'}
          </p>
          <div className="mt-5 flex gap-3">
            <Button onClick={() => setMode('config')}>
              <RotateCcw size={16} /> Novo treino
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // ---------- PRACTICE ----------
  const current = queue[index]
  if (!current) return <Loading />

  const optionClass = (optionId: number): string => {
    if (!result) {
      return selected === optionId
        ? 'border-primary bg-primary/10'
        : 'border-border hover:bg-muted'
    }
    if (optionId === result.correctOptionId) return 'border-success bg-success/10'
    if (optionId === selected) return 'border-danger bg-danger/10'
    return 'border-border opacity-60'
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => setMode('config')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Sair
          </button>
          <span className="font-semibold">
            Questão {index + 1} <span className="text-muted-foreground">/ {queue.length}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="inline-flex items-center gap-1 text-success">
            <Check size={14} /> {correct}
          </span>
          <span className="inline-flex items-center gap-1 text-danger">
            <X size={14} /> {answered - correct}
          </span>
        </div>
      </div>
      <ProgressBar value={(index / queue.length) * 100} className="mb-5" />

      <Card className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: current.disciplineColor }}
              />
              {current.disciplineName}
            </span>
            {current.topicName ? (
              <span className="text-muted-foreground">· {current.topicName}</span>
            ) : null}
            <span
              className="rounded-full px-2 py-0.5 font-semibold"
              style={{
                backgroundColor: `${DIFFICULTY_COLOR[current.difficulty]}22`,
                color: DIFFICULTY_COLOR[current.difficulty]
              }}
            >
              {DIFFICULTY_LABEL[current.difficulty]}
            </span>
          </div>
          <button
            type="button"
            onClick={() => void toggleFav()}
            className={cn(
              'transition',
              current.favorite ? 'text-warning' : 'text-muted-foreground hover:text-warning'
            )}
            title={current.favorite ? 'Remover dos favoritos' : 'Favoritar'}
          >
            <Star size={20} fill={current.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed">{current.statement}</p>

        <div className="mt-5 space-y-2.5">
          {current.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              disabled={!!result}
              onClick={() => setSelected(opt.id)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition',
                optionClass(opt.id)
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-bold">
                {opt.letter}
              </span>
              <span className="pt-0.5">{opt.text}</span>
            </button>
          ))}
        </div>

        {result ? (
          <div className="mt-5 animate-fade-in">
            <div
              className={cn(
                'flex items-center gap-2 text-sm font-semibold',
                result.isCorrect ? 'text-success' : 'text-danger'
              )}
            >
              {result.isCorrect ? <Check size={18} /> : <X size={18} />}
              {result.isCorrect ? 'Você acertou!' : 'Você errou — registrado no caderno de erros.'}
            </div>
            {current.explanation ? (
              <div className="mt-3 rounded-lg border bg-background/50 p-4 text-sm leading-relaxed">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Comentário
                </p>
                {current.explanation}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          {result ? (
            <Button onClick={next}>
              {index + 1 >= queue.length ? 'Ver resultado' : 'Próxima'}
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button onClick={() => void submit()} disabled={selected == null}>
              Responder
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
