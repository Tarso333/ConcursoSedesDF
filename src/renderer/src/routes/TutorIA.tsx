// Painel do Tutor IA (M22) — não é um chat genérico: o contexto do estudo
// (plano, erros, revisões, grafo) entra em cada resposta, e cada resposta
// mostra as FONTES da plataforma que a fundamentaram.
import {
  AlertTriangle,
  Bot,
  BookOpen,
  Calendar,
  ChevronDown,
  Link2,
  RefreshCw,
  Send,
  Settings,
  Sparkles,
  Target,
  Trash2,
  User
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { AIContextSummary, AiMessageDTO, TutorAttribution } from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { useAsync } from '../lib/useAsync'

const ATTR_SEPARATOR = '\n\n———\nFontes da plataforma:'

/** Remove o bloco textual de fontes (a UI mostra a versão estruturada). */
function displayContent(m: AiMessageDTO): string {
  if (!m.attribution) return m.content
  const i = m.content.indexOf(ATTR_SEPARATOR)
  return i === -1 ? m.content : m.content.slice(0, i)
}

function attributionCount(a: TutorAttribution): number {
  return (
    a.knowledgeUsed.length +
    a.topicsConsulted.length +
    a.errorsInfluencing.length +
    a.reviewsRelated.length +
    a.dependentTopics.length
  )
}

function AttributionPanel({ a }: { a: TutorAttribution }): JSX.Element {
  const [open, setOpen] = useState(false)
  const total = attributionCount(a)
  if (total === 0) return <></>
  return (
    <div className="mt-2 rounded-lg border bg-muted/40 text-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 px-3 py-2 font-medium text-muted-foreground transition hover:text-foreground"
      >
        <Link2 size={12} />
        Fontes da plataforma ({total})
        <ChevronDown size={12} className={cn('ml-auto transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="space-y-1.5 border-t px-3 py-2">
          {a.topicsConsulted.length > 0 ? (
            <p>
              <span className="font-semibold">🧭 Tópicos consultados:</span>{' '}
              {a.topicsConsulted.map((t) => `${t.name} [${t.disciplineName}]`).join(' · ')}
            </p>
          ) : null}
          {a.knowledgeUsed.length > 0 ? (
            <p>
              <span className="font-semibold">📚 Conhecimento usado:</span>{' '}
              {a.knowledgeUsed.map((k) => k.entryTitle).join(' · ')}
            </p>
          ) : null}
          {a.errorsInfluencing.length > 0 ? (
            <p>
              <span className="font-semibold">❌ Erros que influenciaram:</span>{' '}
              {a.errorsInfluencing.map((e) => `${e.disciplineName}: ${e.statement.slice(0, 60)}…`).join(' · ')}
            </p>
          ) : null}
          {a.reviewsRelated.length > 0 ? (
            <p>
              <span className="font-semibold">🔁 Revisões relacionadas:</span>{' '}
              {a.reviewsRelated.map((r) => r.front).join(' · ')}
            </p>
          ) : null}
          {a.dependentTopics.length > 0 ? (
            <p>
              <span className="font-semibold">🔓 Dependem deste tema:</span>{' '}
              {a.dependentTopics.map((d) => d.name).join(' · ')}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function ContextChips({ ctx }: { ctx: AIContextSummary }): JSX.Element {
  const chip = 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs'
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className={cn(chip, ctx.providerReady ? 'border-success/50 text-success' : 'border-warning/50 text-warning')}>
        <Bot size={12} />
        {ctx.provider}
        {ctx.model ? ` · ${ctx.model}` : ''}
      </span>
      {ctx.daysUntilExam != null ? (
        <span className={chip}>
          <Calendar size={12} /> {ctx.daysUntilExam} dias p/ a prova
        </span>
      ) : null}
      {ctx.topPriority ? (
        <span className={chip}>
          <Target size={12} /> Prioridade: {ctx.topPriority}
        </span>
      ) : null}
      <span className={chip}>
        <RefreshCw size={12} /> {ctx.dueReviews} revisões vencidas
      </span>
      <span className={chip}>
        <AlertTriangle size={12} /> {ctx.openErrors} erros abertos
      </span>
      {ctx.accuracy != null ? (
        <span className={chip}>
          <BookOpen size={12} /> {Math.round(ctx.accuracy * 100)}% de acerto
        </span>
      ) : null}
    </div>
  )
}

export function TutorIA(): JSX.Element {
  const status = useAsync(() => api.getAiStatus(), [])
  const context = useAsync(() => api.getAiContext(), [])
  const suggestions = useAsync(() => api.getAiSuggestions(), [])
  const historyQuery = useAsync(() => api.getAiHistory(), [])
  const [messages, setMessages] = useState<AiMessageDTO[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [draft, setDraft] = useState('') // resposta em streaming
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (historyQuery.data && !loadedRef.current) {
      setMessages(historyQuery.data)
      loadedRef.current = true
    }
  }, [historyQuery.data])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, draft])

  // Atalhos: Ctrl+L limpa · / foca o campo.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault()
        void clear()
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const send = async (text: string): Promise<void> => {
    const content = text.trim()
    if (!content || sending) return
    setInput('')
    setMessages((m) => [
      ...m,
      { id: Date.now(), role: 'user', content, createdAt: new Date().toISOString() }
    ])
    setSending(true)
    setDraft('')
    const unsubscribe = api.onAiStreamChunk((chunk) => setDraft((d) => d + chunk))
    try {
      const reply = await api.sendAiMessage(content)
      setMessages((m) => [...m, reply])
      if (!status.data?.configured) status.reload()
    } finally {
      unsubscribe()
      setDraft('')
      setSending(false)
    }
  }

  const clear = async (): Promise<void> => {
    await api.clearAiHistory()
    setMessages([])
  }

  const configured = status.data?.configured ?? false
  const providerReady = context.data?.providerReady ?? configured
  const quickSuggestions = useMemo(() => suggestions.data ?? [], [suggestions.data])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader
        title="Tutor IA"
        subtitle="Fundamentado nos seus dados: edital, plano, erros e revisões"
        icon={<Sparkles size={20} />}
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/config"
              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition hover:bg-muted"
              title="Provedor e modelo de IA"
            >
              <Settings size={13} /> Provedor
            </Link>
            {messages.length > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => void clear()} title="Ctrl+L">
                <Trash2 size={15} /> Limpar
              </Button>
            ) : null}
          </div>
        }
      />

      {context.data ? <ContextChips ctx={context.data} /> : null}

      {!providerReady ? (
        <Card className="mb-3 flex items-center gap-3 border-warning/40 bg-warning/10 p-3 text-sm">
          <Settings size={16} className="shrink-0 text-warning" />
          <span className="flex-1">
            Provedor de IA indisponível. O padrão é o <strong>Ollama local</strong> (grátis e offline) —
            instale em ollama.com ou escolha outro provedor em{' '}
            <Link to="/config" className="font-semibold text-primary underline">
              Configurações
            </Link>
            . Todo o resto do app funciona normalmente.
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
                Pergunte sobre o edital — o Tutor responde com base no seu plano do dia, nos seus
                erros e no conteúdo cadastrado, citando as fontes.
              </p>
              <div className="flex max-w-xl flex-wrap justify-center gap-2">
                {quickSuggestions.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => void send(s.prompt)}
                    className="rounded-full border px-3 py-1.5 text-xs transition hover:bg-muted"
                    title={`Origem: ${s.source}`}
                  >
                    {s.label}
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
                <div className="max-w-[80%]">
                  <div
                    className={cn(
                      'whitespace-pre-line rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'user' ? 'bg-primary text-primary-foreground' : 'border bg-background'
                    )}
                  >
                    {displayContent(m)}
                  </div>
                  {m.role === 'assistant' && m.attribution ? <AttributionPanel a={m.attribution} /> : null}
                </div>
              </div>
            ))
          )}
          {sending ? (
            draft ? (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Bot size={16} />
                </div>
                <div className="max-w-[80%] whitespace-pre-line rounded-xl border bg-background px-4 py-2.5 text-sm leading-relaxed">
                  {draft}
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-muted border-t-primary" />
                consultando seus dados e o modelo…
              </div>
            )
          ) : null}
          <div ref={endRef} />
        </div>

        {messages.length > 0 && quickSuggestions.length > 0 && !sending ? (
          <div className="flex flex-wrap gap-1.5 border-t px-3 pt-2">
            {quickSuggestions.slice(0, 3).map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => void send(s.prompt)}
                className="rounded-full border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:bg-muted hover:text-foreground"
                title={`Origem: ${s.source}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="border-t p-3">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              void send(input)
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao tutor… (atalho: /)"
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
