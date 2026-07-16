import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  BookOpen,
  Brain,
  ChevronRight,
  ExternalLink,
  FileText,
  Gavel,
  Landmark,
  Layers,
  Lightbulb,
  Link2,
  type LucideIcon,
  Library,
  Scale,
  Sparkles,
  StickyNote,
  Tags,
  Video
} from 'lucide-react'
import { useState } from 'react'
import type {
  GenerationKind,
  GenerationResult,
  GraphTreeNode,
  KnowledgeEntry,
  KnowledgeKind,
  RelatedTopicRef,
  RelationKind,
  TopicStatus,
  TopicTreeNode
} from '@shared/domain'
import { PageHeader } from '../components/common/PageHeader'
import { Markdown } from '../components/content/Markdown'
import { Card } from '../components/ui/Card'
import { EmptyState, ErrorState, Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { fmtNum, pct } from '../lib/format'
import { useAsync } from '../lib/useAsync'

// ───────────────────────── Progresso (status do usuário) ─────────────────────────
const STATUS_META: Record<TopicStatus, { label: string; color: string }> = {
  NAO_ESTUDADO: { label: 'Não estudado', color: 'hsl(var(--muted-foreground))' },
  ESTUDANDO: { label: 'Estudando', color: 'hsl(var(--primary))' },
  REVISAR: { label: 'Revisar', color: 'hsl(var(--warning))' },
  DOMINADO: { label: 'Dominado', color: 'hsl(var(--success))' }
}
const STATUS_ORDER: TopicStatus[] = ['NAO_ESTUDADO', 'ESTUDANDO', 'REVISAR', 'DOMINADO']

// Rótulos dos tipos de relação do grafo (M18).
const RELATION_LABEL: Record<RelationKind, string> = {
  PRE_REQUISITO: 'pré-requisito',
  DEPENDE_DE: 'depende de',
  COMPLEMENTA: 'complementa',
  ESTUDADO_JUNTO: 'estudar junto',
  SEMELHANTE: 'semelhante',
  CONTINUIDADE: 'continuação',
  REVISAO_RECOMENDADA: 'revisar junto',
  RELACIONADO: 'relacionado'
}

// ───────────────────── Registry de renderização por tipo ─────────────────────
// Adicionar um novo tipo de conhecimento = uma entrada aqui (Open/Closed).
interface KindMeta {
  label: string
  icon: LucideIcon
  accent?: string
  chips?: boolean // renderiza entradas como chips (ex.: palavras-chave)
}
const KIND_META: Partial<Record<KnowledgeKind, KindMeta>> = {
  RESUMO: { label: 'Resumo', icon: FileText },
  CONCEITO: { label: 'Conceitos importantes', icon: Brain },
  LEGISLACAO: { label: 'Legislação relacionada', icon: Scale },
  JURISPRUDENCIA: { label: 'Jurisprudência', icon: Gavel },
  DICA: { label: 'Dicas de prova', icon: Lightbulb, accent: 'hsl(var(--success))' },
  PEGADINHA: { label: 'Pegadinhas comuns', icon: AlertTriangle, accent: 'hsl(var(--warning))' },
  OBSERVACAO: { label: 'Observações', icon: StickyNote },
  PALAVRA_CHAVE: { label: 'Palavras-chave', icon: Tags, chips: true },
  LINK: { label: 'Links externos', icon: Link2 },
  VIDEO: { label: 'Vídeos', icon: Video },
  PDF: { label: 'PDFs', icon: BookMarked },
  MAPA_MENTAL: { label: 'Mapa mental', icon: Landmark }
}
const KIND_ORDER: KnowledgeKind[] = [
  'RESUMO',
  'CONCEITO',
  'LEGISLACAO',
  'JURISPRUDENCIA',
  'DICA',
  'PEGADINHA',
  'OBSERVACAO',
  'PALAVRA_CHAVE',
  'LINK',
  'VIDEO',
  'PDF',
  'MAPA_MENTAL'
]

function groupByKind(entries: KnowledgeEntry[]): [KnowledgeKind, KnowledgeEntry[]][] {
  const map = new Map<KnowledgeKind, KnowledgeEntry[]>()
  for (const e of entries) {
    const list = map.get(e.kind) ?? []
    list.push(e)
    map.set(e.kind, list)
  }
  const known = KIND_ORDER.filter((kind) => map.has(kind)).map(
    (kind) => [kind, map.get(kind) as KnowledgeEntry[]] as [KnowledgeKind, KnowledgeEntry[]]
  )
  const unknown = [...map.entries()].filter(([kind]) => !KIND_ORDER.includes(kind))
  return [...known, ...unknown]
}

function KnowledgeSection({ kind, entries }: { kind: KnowledgeKind; entries: KnowledgeEntry[] }): JSX.Element {
  const meta = KIND_META[kind] ?? { label: kind, icon: BookOpen }
  const Icon = meta.icon

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: meta.accent }}>
        <Icon size={16} className={meta.accent ? '' : 'text-primary'} />
        {meta.label}
      </div>

      {meta.chips ? (
        <div className="flex flex-wrap gap-2">
          {entries.map((e) => (
            <span key={e.id} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {e.title ?? e.body}
            </span>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className={entries.length > 1 ? 'border-l-2 border-border pl-3' : ''}>
              {e.reference ? (
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {e.reference}
                </p>
              ) : null}
              {e.title && kind !== 'RESUMO' ? <p className="text-sm font-semibold">{e.title}</p> : null}
              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary underline"
                >
                  <ExternalLink size={13} /> {e.title ?? e.url}
                </a>
              ) : null}
              {e.body ? <Markdown text={e.body} /> : null}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

// ───────────────────────── Árvore de tópicos ─────────────────────────
function TopicRow({
  node,
  depth,
  selectedId,
  onSelect
}: {
  node: TopicTreeNode
  depth: number
  selectedId: number | null
  onSelect: (id: number) => void
}): JSX.Element {
  const hasContent = node.knowledgeCount > 0
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition',
          selectedId === node.id ? 'bg-primary/12 text-primary' : 'hover:bg-muted'
        )}
        style={{ paddingLeft: `${10 + depth * 16}px` }}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: STATUS_META[node.status].color }}
          title={STATUS_META[node.status].label}
        />
        <span className="min-w-0 flex-1 truncate">{node.name}</span>
        {hasContent ? <BookOpen size={13} className="shrink-0 text-muted-foreground" /> : null}
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
          {node.questionCount}q
        </span>
      </button>
      {node.children.map((child) => (
        <TopicRow key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </>
  )
}

// ───────────────────────── Conexões do grafo ─────────────────────────
function ConnectionGroup({
  title,
  items,
  onNavigate
}: {
  title: string
  items: RelatedTopicRef[]
  onNavigate: (topicId: number, disciplineId: number) => void
}): JSX.Element | null {
  if (items.length === 0) return null
  return (
    <div>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((r) => (
          <button
            key={`${r.kind}-${r.topicId}`}
            type="button"
            onClick={() => onNavigate(r.topicId, r.disciplineId)}
            title={r.note ?? `${RELATION_LABEL[r.kind]} · ${r.disciplineName}`}
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:border-primary hover:text-primary"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: STATUS_META[r.status].color }}
            />
            {r.name}
            <span className="text-[10px] text-muted-foreground">{RELATION_LABEL[r.kind]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ───────────────────────── Painel do tópico ─────────────────────────
const GENERATION_ACTIONS: { kind: GenerationKind; label: string }[] = [
  { kind: 'RESUMO', label: 'Resumo' },
  { kind: 'MAPA_MENTAL', label: 'Mapa mental' },
  { kind: 'FLASHCARDS', label: 'Flashcards' },
  { kind: 'QUESTOES', label: 'Questões' },
  { kind: 'EXPLICACAO', label: 'Explicação' },
  { kind: 'EXEMPLOS', label: 'Exemplos' }
]

function GeneratePanel({ topicId, onDone }: { topicId: number; onDone: () => void }): JSX.Element {
  const [busy, setBusy] = useState<GenerationKind | null>(null)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const run = async (kind: GenerationKind): Promise<void> => {
    if (busy) return
    setBusy(kind)
    setResult(null)
    setError(null)
    try {
      const r = await api.generateAiContent({ kind, topicId })
      setResult(r)
      onDone()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(null)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Sparkles size={15} className="text-primary" /> Gerar com IA
        <span className="text-[11px] font-normal text-muted-foreground">
          (opcional — salvo no conteúdo/flashcards/questões para você revisar)
        </span>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {GENERATION_ACTIONS.map((a) => (
          <button
            key={a.kind}
            type="button"
            disabled={busy != null}
            onClick={() => void run(a.kind)}
            className="rounded-full border px-2.5 py-1 text-xs font-medium transition hover:bg-muted disabled:opacity-50"
          >
            {busy === a.kind ? 'Gerando…' : a.label}
          </button>
        ))}
      </div>
      {result ? <p className="mt-2 text-xs text-success">✓ {result.preview}</p> : null}
      {error ? <p className="mt-2 text-xs text-warning">{error}</p> : null}
    </Card>
  )
}

function TopicPanel({
  topicId,
  onChanged,
  onNavigate
}: {
  topicId: number
  onChanged: () => void
  onNavigate: (topicId: number, disciplineId: number) => void
}): JSX.Element {
  const view = useAsync(() => api.getTopicKnowledge(topicId), [topicId])
  const [unlocked, setUnlocked] = useState<RelatedTopicRef[]>([])

  if (view.loading) return <Loading label="Abrindo o tópico…" />
  if (view.error) return <ErrorState message={view.error} />
  if (!view.data) return <ErrorState message="Tópico não encontrado." />
  const t = view.data

  const setStatus = async (status: TopicStatus): Promise<void> => {
    const result = await api.setTopicStatus(t.topicId, status)
    setUnlocked(result.unlocked)
    view.reload()
    onChanged()
  }

  const conn = t.connections
  const hasConnections =
    conn.prerequisites.length + conn.dependents.length + conn.next.length + conn.related.length > 0
  const sections = groupByKind(t.entries)

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <p className="text-xs text-muted-foreground">
          {t.disciplineName}
          {t.parentName ? ` · ${t.parentName}` : ''}
        </p>
        <h2 className="mt-0.5 text-lg font-bold leading-tight">{t.topicName}</h2>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void setStatus(s)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[11px] font-semibold transition',
                t.status === s ? 'border-transparent text-white' : 'text-muted-foreground hover:bg-muted'
              )}
              style={t.status === s ? { backgroundColor: STATUS_META[s].color } : undefined}
            >
              {STATUS_META[s].label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <span>
            <BookOpen size={12} className="mr-1 inline" />
            {fmtNum(t.stats.questionCount)} questões
          </span>
          <span>
            {fmtNum(t.stats.answeredCount)} respostas
            {t.stats.answeredCount > 0 ? ` · ${pct(t.stats.accuracy)} de acerto` : ''}
          </span>
          <span>
            <Layers size={12} className="mr-1 inline" />
            {fmtNum(t.stats.flashcardCount)} flashcards
          </span>
        </div>
        {t.stats.answeredCount > 0 ? (
          <ProgressBar value={t.stats.accuracy * 100} className="mt-2" color="hsl(var(--success))" />
        ) : null}
      </Card>

      {/* Desbloqueios do grafo ao dominar (M18) */}
      {unlocked.length > 0 ? (
        <Card className="border-success/40 bg-success/10 p-4">
          <p className="text-sm font-semibold text-success">🔓 Conteúdo desbloqueado!</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Com este domínio, os pré-requisitos destes tópicos ficaram completos — eles sobem de
            prioridade na estratégia:
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {unlocked.map((u) => (
              <button
                key={u.topicId}
                type="button"
                onClick={() => onNavigate(u.topicId, u.disciplineId)}
                className="rounded-full border border-success/50 px-2.5 py-1 text-xs font-medium text-success transition hover:bg-success/15"
              >
                {u.name} <span className="opacity-70">· {u.disciplineName}</span>
              </button>
            ))}
          </div>
        </Card>
      ) : null}

      {/* Conexões do conhecimento (grafo — M18) */}
      {hasConnections ? (
        <Card className="space-y-3 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Landmark size={16} className="text-primary" /> Conexões do conhecimento
          </div>
          <ConnectionGroup title="Pré-requisitos" items={conn.prerequisites} onNavigate={onNavigate} />
          <ConnectionGroup title="Assuntos relacionados" items={conn.related} onNavigate={onNavigate} />
          <ConnectionGroup title="Próximos assuntos recomendados" items={conn.next} onNavigate={onNavigate} />
          <ConnectionGroup title="Dependem deste tópico" items={conn.dependents} onNavigate={onNavigate} />
        </Card>
      ) : null}

      {/* Geração de conteúdo por IA (M22) — salva nas engines existentes */}
      <GeneratePanel topicId={t.topicId} onDone={() => view.reload()} />

      {sections.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Library size={26} />}>
            Este tópico ainda não tem conteúdo cadastrado.
            <br />
            Pratique pelas questões — o conhecimento chega em breve.
          </EmptyState>
        </Card>
      ) : (
        sections.map(([kind, entries]) => <KnowledgeSection key={kind} kind={kind} entries={entries} />)
      )}
    </div>
  )
}

// ───────────────────────── Árvore do grafo (visualização) ─────────────────────────
function GraphNodeRow({
  node,
  depth,
  homeDisciplineId,
  selectedId,
  onSelect
}: {
  node: GraphTreeNode
  depth: number
  homeDisciplineId: number
  selectedId: number | null
  onSelect: (topicId: number, disciplineId: number) => void
}): JSX.Element {
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect(node.topicId, node.disciplineId)}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition',
          selectedId === node.topicId ? 'bg-primary/12 text-primary' : 'hover:bg-muted'
        )}
        style={{ paddingLeft: `${10 + depth * 18}px` }}
      >
        {depth > 0 ? <span className="text-muted-foreground/60">└</span> : null}
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: STATUS_META[node.status].color }}
          title={STATUS_META[node.status].label}
        />
        <span className="min-w-0 flex-1 truncate">{node.name}</span>
        {node.kindFromParent ? (
          <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
            {RELATION_LABEL[node.kindFromParent]}
          </span>
        ) : null}
        {node.disciplineId !== homeDisciplineId ? (
          <span className="shrink-0 text-[9px] text-muted-foreground/70">{node.disciplineName}</span>
        ) : null}
      </button>
      {node.children.map((child) => (
        <GraphNodeRow
          key={child.topicId}
          node={child}
          depth={depth + 1}
          homeDisciplineId={homeDisciplineId}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

// ───────────────────────── Tela ─────────────────────────
export function Conteudo(): JSX.Element {
  const [disciplineId, setDisciplineId] = useState<number | null>(null)
  const [topicId, setTopicId] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'lista' | 'grafo'>('lista')

  const disciplines = useAsync(() => api.getDisciplinesWithStats(), [])
  const tree = useAsync(
    () => (disciplineId ? api.getContentTree(disciplineId) : Promise.resolve([])),
    [disciplineId]
  )
  const graph = useAsync(
    () =>
      disciplineId && viewMode === 'grafo'
        ? api.getDisciplineGraph(disciplineId)
        : Promise.resolve(null),
    [disciplineId, viewMode]
  )

  const navigateTo = (tid: number, did: number): void => {
    if (did !== disciplineId) setDisciplineId(did)
    setTopicId(tid)
  }

  const selectedDiscipline = (disciplines.data ?? []).find((d) => d.id === disciplineId) ?? null

  // ─── Visão 1: disciplinas ───
  if (!selectedDiscipline) {
    return (
      <div>
        <PageHeader
          title="Conteúdo"
          subtitle="O centro de conhecimento do edital — resumos, lei seca, dicas e pegadinhas"
          icon={<Library size={20} />}
        />
        {disciplines.loading ? (
          <Loading />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(disciplines.data ?? []).map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDisciplineId(d.id)
                  setTopicId(null)
                }}
                className="card group p-4 text-left transition hover:border-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{d.name}</span>
                  <ChevronRight size={15} className="shrink-0 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {d.topicsCount} tópicos · {fmtNum(d.questionsCount)} questões
                </p>
                <ProgressBar value={d.masteryPct} color={d.color} className="mt-2.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ─── Visão 2: árvore + painel ───
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setDisciplineId(null)
            setTopicId(null)
          }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} /> Disciplinas
        </button>
        <span className="text-muted-foreground">/</span>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: selectedDiscipline.color }} />
          <h1 className="truncate text-lg font-bold tracking-tight">{selectedDiscipline.name}</h1>
        </div>
        <div className="flex shrink-0 gap-1 rounded-lg border p-0.5">
          {(['lista', 'grafo'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setViewMode(m)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-semibold capitalize transition',
                viewMode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card className="max-h-[calc(100vh-12rem)] overflow-y-auto p-2">
          {viewMode === 'lista' ? (
            tree.loading ? (
              <Loading label="Carregando tópicos…" />
            ) : (tree.data ?? []).length === 0 ? (
              <EmptyState icon={<Library size={22} />}>Sem tópicos cadastrados.</EmptyState>
            ) : (
              <div className="space-y-0.5">
                {(tree.data ?? []).map((node) => (
                  <TopicRow key={node.id} node={node} depth={0} selectedId={topicId} onSelect={setTopicId} />
                ))}
              </div>
            )
          ) : graph.loading ? (
            <Loading label="Montando o grafo…" />
          ) : !graph.data || graph.data.roots.length === 0 ? (
            <EmptyState icon={<Landmark size={22} />}>
              Nenhuma conexão mapeada nesta disciplina ainda.
            </EmptyState>
          ) : (
            <div className="space-y-0.5">
              {graph.data.roots.map((node) => (
                <GraphNodeRow
                  key={node.topicId}
                  node={node}
                  depth={0}
                  homeDisciplineId={selectedDiscipline.id}
                  selectedId={topicId}
                  onSelect={navigateTo}
                />
              ))}
              {graph.data.unlinkedCount > 0 ? (
                <p className="px-2.5 pt-2 text-[10px] text-muted-foreground">
                  + {graph.data.unlinkedCount} tópico(s) sem conexões mapeadas (veja na Lista)
                </p>
              ) : null}
            </div>
          )}
        </Card>

        <div className="min-w-0">
          {topicId ? (
            <TopicPanel topicId={topicId} onChanged={() => tree.reload()} onNavigate={navigateTo} />
          ) : (
            <Card className="p-8">
              <EmptyState icon={<BookOpen size={28} />}>
                Selecione um tópico para ver o conhecimento disponível.
              </EmptyState>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
