// Testes da AI Platform (M22) — apenas as partes PURAS (padrão M16–M18:
// nenhum import transitivo de better-sqlite3; rodam em Node puro).
import { describe, expect, it } from 'vitest'
import { buildAttribution, parseAttribution, renderAttributionText } from './attribution'
import { matchTopic, normalizeTokens } from './context/match'
import { renderStudyContext } from './context/render'
import type { StudyContext } from './context/types'
import { extractJson, parseGenerated } from './generationSchema'
import { parseProviderId } from './providerConfig'
import { getAIProviderDescriptor, listAIProviders, registerAIProvider } from './registry'
import { OLLAMA_DESCRIPTOR, parseOllamaJsonLines, tokensPerSecond } from './providers/ollama'
import { ANTHROPIC_DESCRIPTOR } from './providers/anthropic'
import { CUSTOM_DESCRIPTOR, OPENAI_DESCRIPTOR } from './providers/openai'

// ───────────────────── fixtures ─────────────────────

const CTX: StudyContext = {
  generatedAt: '2026-07-15T12:00:00Z',
  userName: 'Tarso',
  contest: {
    name: 'DATAPREV 2026',
    role: 'Analista de TI — Perfil 2',
    board: 'FGV',
    examDate: '2026-10-11',
    daysUntilExam: 88,
    city: 'Brasília/DF'
  },
  focus: {
    disciplineName: 'Computação em Nuvem e Virtualização',
    topicId: 42,
    topicName: 'Kubernetes',
    status: 'ESTUDANDO',
    subtopics: [],
    knowledge: [{ title: 'Pods e Deployments', kind: 'RESUMO', excerpt: 'Pod é a menor unidade…' }],
    prerequisites: [{ name: 'Docker', disciplineName: 'Nuvem', kind: 'PRE_REQUISITO' }],
    dependents: [{ name: 'Spring Cloud', disciplineName: 'Linguagens', kind: 'COMPLEMENTA' }],
    related: [{ name: 'Harbor', disciplineName: 'Nuvem', kind: 'CONTINUIDADE' }],
    accuracy: 0.72
  },
  performance: {
    totalAnswered: 120,
    accuracy: 0.68,
    worstDisciplines: [{ name: 'Redes', accuracy: 0.45 }],
    bestDisciplines: [{ name: 'Banco de Dados', accuracy: 0.9 }]
  },
  analytics: {
    globalTrend: 'MELHORANDO',
    profile: [{ label: 'Velocidade', classification: 'Aprende rápido' }],
    indicators: [{ label: 'Retenção', value: 81, unit: '%' }]
  },
  plan: {
    availableMinutes: 120,
    topPriority: 'Redes de Computadores',
    coveragePct: 34,
    items: [{ discipline: 'Redes', activity: 'QUESTOES', minutes: 45, reason: 'peso alto e acerto baixo' }]
  },
  reviews: { dueNow: 7, sample: [{ front: 'Pod no Kubernetes', deckName: 'DATAPREV — Redes' }] },
  errors: {
    open: 3,
    recent: [{ questionId: 9, statement: 'Sobre VLANs…', disciplineName: 'Redes de Computadores' }]
  },
  mocks: { count: 2, lastScorePct: 61 },
  goals: { dailyGoalMinutes: 120, dailyGoalQuestions: 20, answeredToday: 5, streakDays: 12 },
  history: [{ role: 'user', content: 'O que é um pod?' }]
}

// ───────────────────── AISettings / ProviderFactory ─────────────────────

describe('parseProviderId (AISettings)', () => {
  it('padrão do produto: vazio → ollama', () => {
    expect(parseProviderId(null).providerId).toBe('ollama')
    expect(parseProviderId('').providerId).toBe('ollama')
  })
  it('retrocompat M12: anthropic/claude/openai/openrouter', () => {
    expect(parseProviderId('anthropic').providerId).toBe('anthropic')
    expect(parseProviderId('Claude').providerId).toBe('anthropic')
    expect(parseProviderId('openai').providerId).toBe('openai')
    expect(parseProviderId('openrouter').providerId).toBe('openrouter')
  })
  it('URL http(s) → custom com baseUrl preservada', () => {
    const r = parseProviderId('https://llm.interno:8080/v1')
    expect(r.providerId).toBe('custom')
    expect(r.baseUrl).toBe('https://llm.interno:8080/v1')
  })
  it('gemini → gemini-cli · desconhecido → openai (comportamento antigo)', () => {
    expect(parseProviderId('gemini').providerId).toBe('gemini-cli')
    expect(parseProviderId('foo-bar').providerId).toBe('openai')
  })
})

describe('AIRegistry + descritores', () => {
  it('registra e resolve por id (idempotente)', () => {
    registerAIProvider(OLLAMA_DESCRIPTOR)
    registerAIProvider(OLLAMA_DESCRIPTOR)
    expect(listAIProviders().filter((d) => d.id === 'ollama')).toHaveLength(1)
    expect(getAIProviderDescriptor('ollama')?.label).toContain('Ollama')
  })
  it('capacidades estáticas coerentes: Ollama local sem chave; remotos exigem chave', () => {
    expect(OLLAMA_DESCRIPTOR.capabilities.local).toBe(true)
    expect(OLLAMA_DESCRIPTOR.capabilities.needsApiKey).toBe(false)
    expect(OLLAMA_DESCRIPTOR.capabilities.streaming).toBe(true)
    expect(OPENAI_DESCRIPTOR.capabilities.needsApiKey).toBe(true)
    expect(ANTHROPIC_DESCRIPTOR.capabilities.needsApiKey).toBe(true)
  })
  it('factory de descritor injeta modelo configurado (ou default)', () => {
    const p = CUSTOM_DESCRIPTOR.create({ model: 'meu-modelo', apiKey: 'k', baseUrl: 'http://x/v1' })
    expect(p.model).toBe('meu-modelo')
    const q = OLLAMA_DESCRIPTOR.create({ model: null, apiKey: null, baseUrl: null })
    expect(q.model).toBe(OLLAMA_DESCRIPTOR.defaultModel)
  })
})

// ───────────────────── Ollama (camada única) ─────────────────────

describe('Ollama: parser JSON-Lines e velocidade', () => {
  it('separa chunks completos e preserva o resto parcial', () => {
    const buf = '{"message":{"content":"Olá"}}\n{"message":{"content":" mundo"}}\n{"mess'
    const { chunks, rest } = parseOllamaJsonLines(buf)
    expect(chunks.map((c) => c.message?.content)).toEqual(['Olá', ' mundo'])
    expect(rest).toBe('{"mess')
  })
  it('ignora linhas corrompidas sem derrubar o stream', () => {
    const { chunks } = parseOllamaJsonLines('not-json\n{"done":true,"eval_count":50,"eval_duration":2000000000}\n')
    expect(chunks).toHaveLength(1)
    expect(chunks[0].done).toBe(true)
  })
  it('tokens/s a partir dos contadores nativos', () => {
    expect(tokensPerSecond(50, 2_000_000_000)).toBe(25)
    expect(tokensPerSecond(undefined, 1)).toBeNull()
    expect(tokensPerSecond(10, 0)).toBeNull()
  })
})

// ───────────────────── Context Builder ─────────────────────

describe('matching determinístico de tópico', () => {
  const topics = [
    { topicId: 1, name: 'Kubernetes' },
    { topicId: 2, name: 'Modelagem e normalização de dados' },
    { topicId: 3, name: 'Noções dos modelos de referência OSI (Open Systems Interconnection)' }
  ]
  it('normaliza acentos e caixa', () => {
    expect(normalizeTokens('Normalização de DADOS')).toEqual(['normalizacao', 'dados'])
  })
  it('encontra o tópico pela pergunta', () => {
    expect(matchTopic('Como funciona a normalização de dados na modelagem?', topics)?.topicId).toBe(2)
    expect(matchTopic('me explique kubernetes', topics)?.topicId).toBe(1)
  })
  it('não inventa foco quando a pergunta não cita tópicos', () => {
    expect(matchTopic('bom dia, tudo bem?', topics)).toBeNull()
  })
})

describe('renderStudyContext (prompt determinístico)', () => {
  const text = renderStudyContext(CTX)
  it('inclui concurso, foco, plano, erros e metas', () => {
    expect(text).toContain('DATAPREV 2026')
    expect(text).toContain('TÓPICO EM FOCO')
    expect(text).toContain('Kubernetes')
    expect(text).toContain('Prioridade nº 1: Redes de Computadores')
    expect(text).toContain('erros em aberto: 3')
    expect(text).toContain('streak: 12d')
  })
  it('expõe o grafo (pré-requisitos e desbloqueios)', () => {
    expect(text).toContain('Pré-requisitos: Docker')
    expect(text).toContain('Este tema destrava: Spring Cloud')
  })
})

// ───────────────────── Tutor: atribuição determinística ─────────────────────

describe('atribuição do Tutor', () => {
  const attr = buildAttribution(CTX)
  it('deriva do contexto (não do modelo)', () => {
    expect(attr.topicsConsulted).toEqual([
      { topicId: 42, name: 'Kubernetes', disciplineName: 'Computação em Nuvem e Virtualização' }
    ])
    expect(attr.knowledgeUsed[0].entryTitle).toBe('Pods e Deployments')
    expect(attr.errorsInfluencing[0].questionId).toBe(9)
    expect(attr.reviewsRelated[0].front).toBe('Pod no Kubernetes')
    expect(attr.dependentTopics[0].name).toBe('Spring Cloud')
  })
  it('renderiza o bloco textual de fontes', () => {
    const t = renderAttributionText(attr)
    expect(t).toContain('Fontes da plataforma')
    expect(t).toContain('🧭 Tópicos: Kubernetes')
  })
  it('round-trip pela persistência (context_type JSON)', () => {
    expect(parseAttribution(JSON.stringify(attr))).toEqual(attr)
    expect(parseAttribution(null)).toBeNull()
    expect(parseAttribution('legado-nao-json')).toBeNull()
  })
  it('sem foco: atribuição não inventa tópicos', () => {
    const a = buildAttribution({ ...CTX, focus: null })
    expect(a.topicsConsulted).toHaveLength(0)
    expect(a.knowledgeUsed).toHaveLength(0)
  })
})

// ───────────────────── Geração: validação estrita ─────────────────────

describe('geração de conteúdo: parse/validação', () => {
  it('extrai JSON mesmo com cercas de código', () => {
    expect(extractJson('```json\n{"a":1}\n```')).toBe('{"a":1}')
    expect(extractJson('texto {"a":1} fim')).toBe('{"a":1}')
    expect(() => extractJson('sem json')).toThrow()
  })
  it('valida flashcards', () => {
    const ok = parseGenerated('FLASHCARDS', '{"flashcards":[{"front":"F","back":"V"}]}')
    expect(ok.flashcards).toHaveLength(1)
    expect(() => parseGenerated('FLASHCARDS', '{"flashcards":[]}')).toThrow(/vazia/)
    expect(() => parseGenerated('FLASHCARDS', '{"flashcards":[{"front":"só frente"}]}')).toThrow()
  })
  it('valida questões (5 alternativas, correta em 0..4, comentário)', () => {
    const q = {
      enunciado: 'Qual é a menor unidade do K8s?',
      alternativas: ['Pod', 'Node', 'Service', 'Deployment', 'Namespace'],
      corretaIndex: 0,
      dificuldade: 'MEDIO',
      comentario: 'Pod é a menor unidade implantável.'
    }
    expect(parseGenerated('QUESTOES', JSON.stringify({ questoes: [q] })).questoes).toHaveLength(1)
    expect(() =>
      parseGenerated('QUESTOES', JSON.stringify({ questoes: [{ ...q, alternativas: ['a', 'b'] }] }))
    ).toThrow(/5 alternativas/)
    expect(() =>
      parseGenerated('QUESTOES', JSON.stringify({ questoes: [{ ...q, corretaIndex: 7 }] }))
    ).toThrow(/corretaIndex/)
  })
  it('valida resumo/mapa/explicação/exemplos', () => {
    expect(() => parseGenerated('RESUMO', '{"resumo":"curto"}')).toThrow()
    expect(parseGenerated('MAPA_MENTAL', '{"mapa":"- Centro\\n  - Ramo"}').mapa).toContain('Centro')
    expect(() => parseGenerated('EXEMPLOS', '{"exemplos":[]}')).toThrow()
  })
})
