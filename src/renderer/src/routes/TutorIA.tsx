import { Bot, Send, Settings, Sparkles, Trash2, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { AiMessageDTO } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { useAsync } from '../lib/useAsync'

const SUGGESTIONS = [
  'Resuma os princípios da PNAS/2004',
  'Macetes para decorar as modalidades da Lei 14.133',
  'Explique a diferença entre CRAS e CREAS',
  'Crie 3 questões sobre a Lei Maria da Penha'
]

export function TutorIA(): JSX.Element {
  const status = useAsync(() => api.getAiStatus(), [])
  const historyQuery = useAsync(() => api.getAiHistory(), [])
  const [messages, setMessages] = useState<AiMessageDTO[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (historyQuery.data && !loadedRef.current) {
      setMessages(historyQuery.data)
      loadedRef.current = true
    }
  }, [historyQuery.data])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string): Promise<void> => {
    const content = text.trim()
    if (!content || sending) return
    setInput('')
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: 'user', content, createdAt: new Date().toISOString() }
    ])
    setSending(true)
    try {
      const reply = await api.sendAiMessage(content)
      setMessages((m) => [...m, reply])
      if (!status.data?.configured) status.reload()
    } finally {
      setSending(false)
    }
  }

  const clear = async (): Promise<void> => {
    await api.clearAiHistory()
    setMessages([])
  }

  const configured = status.data?.configured ?? false

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="Tutor IA"
        subtitle="Seu professor particular, dentro do app"
        icon={<Sparkles size={20} />}
        actions={
          messages.length > 0 ? (
            <Button variant="ghost" size="sm" onClick={() => void clear()}>
              <Trash2 size={15} /> Limpar
            </Button>
          ) : undefined
        }
      />

      {!configured ? (
        <Card className="mb-3 flex items-center gap-3 border-warning/40 bg-warning/10 p-3 text-sm">
          <Settings size={16} className="shrink-0 text-warning" />
          <span className="flex-1">
            Tutor ainda não ativado. Adicione sua chave de IA em{' '}
            <Link to="/config" className="font-semibold text-primary underline">
              Configurações
            </Link>
            . O resto do app funciona normalmente sem ela.
          </span>
        </Card>
      ) : null}

      <Card className="flex min-h-0 flex-1 flex-col p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Bot size={28} />
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Pergunte qualquer coisa sobre o edital, peça resumos, macetes ou questões comentadas.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border px-3 py-1.5 text-xs transition hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
                <div
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-lg',
                    m.role === 'user' ? 'bg-muted' : 'bg-primary/15 text-primary'
                  )}
                >
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={cn(
                    'max-w-[80%] whitespace-pre-line rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                    m.role === 'user' ? 'bg-primary text-primary-foreground' : 'border bg-background'
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))
          )}
          {sending ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-muted border-t-primary" />
              pensando…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="border-t p-3">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void send(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao tutor…"
              className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" disabled={!input.trim() || sending}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
