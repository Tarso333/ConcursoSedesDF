import { Brain, CalendarCheck, CheckCircle2, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReviewRating } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState, Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'

const RATINGS: { value: ReviewRating; label: string; color: string }[] = [
  { value: 1, label: 'Errei', color: 'hsl(var(--danger))' },
  { value: 2, label: 'Difícil', color: 'hsl(var(--warning))' },
  { value: 3, label: 'Bom', color: 'hsl(var(--primary))' },
  { value: 4, label: 'Fácil', color: 'hsl(var(--success))' }
]

export function Revisao(): JSX.Element {
  const due = useAsync(() => api.getDueCards(50), [])
  const stats = useAsync(() => api.getReviewStats(), [])

  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [rated, setRated] = useState(0)

  const queue = due.data ?? []
  const current = queue[index]

  useEffect(() => {
    setIndex(0)
    setRevealed(false)
    setRated(0)
  }, [due.data])

  const rate = async (rating: ReviewRating): Promise<void> => {
    if (!current) return
    await api.rateCard(current.srsCardId, rating)
    setRated((r) => r + 1)
    setRevealed(false)
    setIndex((i) => i + 1)
    stats.reload()
  }

  return (
    <div>
      <PageHeader
        title="Revisão Espaçada"
        subtitle="FSRS — cada card volta no momento certo para fixar de vez"
        icon={<RotateCcw size={20} />}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <Brain size={20} className="text-primary" />
          <div>
            <p className="stat-label">Para revisar agora</p>
            <p className="text-xl font-bold">{stats.data?.dueNow ?? 0}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <CalendarCheck size={20} className="text-success" />
          <div>
            <p className="stat-label">Revisados hoje</p>
            <p className="text-xl font-bold">{stats.data?.reviewedToday ?? 0}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <CheckCircle2 size={20} className="text-muted-foreground" />
          <div>
            <p className="stat-label">Total de cards</p>
            <p className="text-xl font-bold">{stats.data?.total ?? 0}</p>
          </div>
        </Card>
      </div>

      {due.loading ? (
        <Loading label="Carregando sua fila…" />
      ) : queue.length === 0 ? (
        <Card className="p-8">
          <EmptyState icon={<CheckCircle2 size={32} />}>
            <p className="font-medium text-foreground">Tudo em dia! 🎉</p>
            <p>Nenhum card vence agora. Crie flashcards ou volte mais tarde.</p>
          </EmptyState>
        </Card>
      ) : !current ? (
        <Card className="p-8 text-center">
          <p className="text-lg font-semibold">Sessão concluída! 🎉</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Você revisou {rated} {rated === 1 ? 'card' : 'cards'}.
          </p>
          <div className="mt-5 flex justify-center">
            <Button onClick={() => due.reload()}>
              <RotateCcw size={16} /> Buscar mais
            </Button>
          </div>
        </Card>
      ) : (
        <div>
          <ProgressBar value={(index / queue.length) * 100} className="mb-4" />
          <Card className="p-6">
            <p className="text-xs font-medium text-muted-foreground">{current.deckName}</p>
            <div className="my-6 min-h-[120px] text-center">
              <p className="text-lg font-medium">{current.front}</p>
              {revealed ? (
                <div className="mt-5 border-t pt-5 animate-fade-in">
                  <p className="whitespace-pre-line text-base text-muted-foreground">{current.back}</p>
                </div>
              ) : null}
            </div>

            {!revealed ? (
              <div className="flex justify-center">
                <Button onClick={() => setRevealed(true)}>Mostrar resposta</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {RATINGS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => void rate(r.value)}
                    className="rounded-lg border py-3 text-sm font-semibold transition hover:bg-muted"
                    style={{ color: r.color, borderColor: `${r.color}55` }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Card {index + 1} de {queue.length} nesta sessão
          </p>
        </div>
      )}
    </div>
  )
}
