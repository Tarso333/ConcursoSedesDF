import { Layers, Play, Plus, Sparkles, Trash2, Wand2, X } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState, Loading } from '../components/ui/Feedback'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { useAsync } from '../lib/useAsync'

const inputCls =
  'w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring'

export function Flashcards(): JSX.Element {
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null)
  const [studying, setStudying] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')
  const [newDeckDisc, setNewDeckDisc] = useState<number | null>(null)
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  const disciplines = useAsync(() => api.getDisciplines(), [])
  const decks = useAsync(() => api.listDecks(), [])
  const cards = useAsync(
    () => (selectedDeckId ? api.listFlashcards(selectedDeckId) : Promise.resolve([])),
    [selectedDeckId]
  )

  const selectedDeck = (decks.data ?? []).find((d) => d.id === selectedDeckId) ?? null

  const createDeck = async (): Promise<void> => {
    if (!newDeckName.trim()) return
    const deck = await api.createDeck({ name: newDeckName.trim(), disciplineId: newDeckDisc })
    setNewDeckName('')
    setNewDeckDisc(null)
    decks.reload()
    setSelectedDeckId(deck.id)
  }
  const removeDeck = async (id: number): Promise<void> => {
    await api.deleteDeck(id)
    if (selectedDeckId === id) setSelectedDeckId(null)
    decks.reload()
  }
  const addCard = async (): Promise<void> => {
    if (!selectedDeckId || !front.trim() || !back.trim()) return
    await api.createFlashcard({ deckId: selectedDeckId, front: front.trim(), back: back.trim() })
    setFront('')
    setBack('')
    cards.reload()
    decks.reload()
  }
  const removeCard = async (id: number): Promise<void> => {
    await api.deleteFlashcard(id)
    cards.reload()
    decks.reload()
  }
  const generateFromErrors = async (): Promise<void> => {
    if (!selectedDeckId) return
    const { created } = await api.generateFlashcardsFromErrors(selectedDeckId, 20)
    cards.reload()
    decks.reload()
    if (created === 0) window.alert('Nenhum erro novo para virar flashcard neste deck.')
  }

  if (studying && selectedDeck) {
    return (
      <FlipStudy
        deckName={selectedDeck.name}
        cards={cards.data ?? []}
        onExit={() => setStudying(false)}
      />
    )
  }

  return (
    <div>
      <PageHeader
        title="Flashcards"
        subtitle="Memorização ativa — decks por disciplina e a partir dos seus erros"
        icon={<Layers size={20} />}
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Decks */}
        <div className="space-y-3">
          <Card className="space-y-3 p-4">
            <p className="text-sm font-semibold">Novo deck</p>
            <input
              className={inputCls}
              placeholder="Nome do deck"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
            />
            <select
              className={inputCls}
              value={newDeckDisc ?? ''}
              onChange={(e) => setNewDeckDisc(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Sem disciplina</option>
              {(disciplines.data ?? []).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <Button className="w-full" onClick={() => void createDeck()} disabled={!newDeckName.trim()}>
              <Plus size={16} /> Criar deck
            </Button>
          </Card>

          {decks.loading ? (
            <Loading />
          ) : (
            <div className="space-y-2">
              {(decks.data ?? []).map((deck) => (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => setSelectedDeckId(deck.id)}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-left transition',
                    selectedDeckId === deck.id ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{deck.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {deck.cardCount} cards · {deck.dueCount} p/ revisar
                    </span>
                  </span>
                  <Trash2
                    size={16}
                    className="shrink-0 text-muted-foreground hover:text-danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      void removeDeck(deck.id)
                    }}
                  />
                </button>
              ))}
              {(decks.data ?? []).length === 0 ? (
                <p className="px-1 text-xs text-muted-foreground">Crie seu primeiro deck.</p>
              ) : null}
            </div>
          )}
        </div>

        {/* Deck selecionado */}
        <div>
          {!selectedDeck ? (
            <Card className="p-6">
              <EmptyState icon={<Layers size={28} />}>
                Selecione ou crie um deck para gerenciar os flashcards.
              </EmptyState>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{selectedDeck.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedDeck.cardCount} flashcards</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void generateFromErrors()}
                      title="Gerar flashcards a partir das questões que você errou"
                    >
                      <Wand2 size={15} /> Gerar dos erros
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setStudying(true)}
                      disabled={(cards.data ?? []).length === 0}
                    >
                      <Play size={15} /> Estudar
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <textarea
                    className={cn(inputCls, 'h-20 resize-none')}
                    placeholder="Frente (pergunta)"
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                  />
                  <textarea
                    className={cn(inputCls, 'h-20 resize-none')}
                    placeholder="Verso (resposta)"
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => void addCard()}
                    disabled={!front.trim() || !back.trim()}
                  >
                    <Plus size={15} /> Adicionar card
                  </Button>
                </div>
              </Card>

              {cards.loading ? (
                <Loading />
              ) : (
                <div className="space-y-2">
                  {(cards.data ?? []).map((c) => (
                    <Card key={c.id} className="flex items-start justify-between gap-3 p-3">
                      <div className="min-w-0 text-sm">
                        <p className="font-medium">{c.front}</p>
                        <p className="mt-1 whitespace-pre-line text-muted-foreground">{c.back}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void removeCard(c.id)}
                        className="shrink-0 text-muted-foreground hover:text-danger"
                      >
                        <X size={16} />
                      </button>
                    </Card>
                  ))}
                  {(cards.data ?? []).length === 0 ? (
                    <Card className="p-6">
                      <EmptyState icon={<Sparkles size={26} />}>
                        Deck vazio. Adicione cards ou gere a partir dos seus erros.
                      </EmptyState>
                    </Card>
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FlipStudyProps {
  deckName: string
  cards: { id: number; front: string; back: string }[]
  onExit: () => void
}

function FlipStudy({ deckName, cards, onExit }: FlipStudyProps): JSX.Element {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const current = cards[index]

  const next = (): void => {
    setFlipped(false)
    setIndex((i) => (i + 1) % cards.length)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-muted-foreground hover:text-foreground">
          ← Voltar
        </button>
        <span className="text-sm font-medium">
          {deckName} · {index + 1}/{cards.length}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="grid min-h-[280px] w-full place-items-center rounded-xl border bg-surface p-8 text-center transition hover:border-primary"
      >
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
            {flipped ? 'Resposta' : 'Pergunta'}
          </p>
          <p className="whitespace-pre-line text-lg">{flipped ? current?.back : current?.front}</p>
          {!flipped ? (
            <p className="mt-4 text-xs text-muted-foreground">clique para virar</p>
          ) : null}
        </div>
      </button>
      <div className="mt-4 flex justify-end">
        <Button onClick={next}>Próximo card</Button>
      </div>
    </div>
  )
}
