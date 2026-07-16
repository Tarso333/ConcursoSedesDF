// Provedor OLLAMA — o padrão da plataforma (local, offline, sem chave).
// Camada ÚNICA de acesso ao Ollama: nenhuma outra parte do projeto fala com
// http://127.0.0.1:11434 diretamente. Streaming nativo (JSON Lines).
import type { AIModelInfo } from '@shared/domain'
import type {
  AIChatRequest,
  AIChatResponse,
  AIPingResult,
  AIProvider,
  AIProviderConfig,
  AIProviderDescriptor
} from '../types'

export const OLLAMA_BASE_URL = 'http://127.0.0.1:11434'
export const OLLAMA_DEFAULT_MODEL = 'llama3.2'

/** Modelos leves sugeridos quando o Ollama está instalado sem modelos. */
export const OLLAMA_SUGGESTED_MODELS = ['llama3.2:3b', 'qwen2.5:3b', 'gemma2:2b']

interface OllamaChunk {
  message?: { content?: string }
  done?: boolean
  eval_count?: number
  eval_duration?: number // nanossegundos
}

/**
 * Parser PURO de um buffer JSON-Lines do streaming do Ollama (testável):
 * devolve os chunks completos e o resto ainda não terminado em \n.
 */
export function parseOllamaJsonLines(buffer: string): { chunks: OllamaChunk[]; rest: string } {
  const lines = buffer.split('\n')
  const rest = lines.pop() ?? ''
  const chunks: OllamaChunk[] = []
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    try {
      chunks.push(JSON.parse(t) as OllamaChunk)
    } catch {
      /* linha parcial/corrompida: ignora (o transporte reenvia no rest) */
    }
  }
  return { chunks, rest }
}

/** tokens/s a partir dos contadores nativos do Ollama (função pura). */
export function tokensPerSecond(evalCount?: number, evalDurationNs?: number): number | null {
  if (!evalCount || !evalDurationNs || evalDurationNs <= 0) return null
  return Math.round((evalCount / (evalDurationNs / 1e9)) * 10) / 10
}

class OllamaProvider implements AIProvider {
  readonly id = 'ollama' as const
  readonly label = 'Ollama (local)'
  readonly capabilities = {
    streaming: true,
    local: true,
    needsApiKey: false,
    listModels: true,
    jsonOutput: true
  }
  readonly defaultModel = OLLAMA_DEFAULT_MODEL
  private readonly baseUrl: string
  readonly model: string

  constructor(config: AIProviderConfig) {
    this.baseUrl = config.baseUrl ?? OLLAMA_BASE_URL
    this.model = config.model ?? OLLAMA_DEFAULT_MODEL
  }

  async chat(req: AIChatRequest): Promise<AIChatResponse> {
    const model = req.model ?? this.model
    const body = {
      model,
      messages: req.messages,
      stream: Boolean(req.onChunk),
      format: req.json ? 'json' : undefined,
      options: {
        num_predict: req.maxTokens ?? 1600,
        temperature: req.temperature ?? 0.4
      }
    }
    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(this.explainHttpError(res.status, text, model))
    }

    if (!req.onChunk) {
      const j = (await res.json()) as OllamaChunk
      return {
        content: j.message?.content ?? '',
        model,
        tokensPerSecond: tokensPerSecond(j.eval_count, j.eval_duration)
      }
    }

    // Streaming JSON-Lines
    const reader = res.body?.getReader()
    if (!reader) throw new Error('Streaming indisponível na resposta do Ollama.')
    const decoder = new TextDecoder()
    let buffer = ''
    let content = ''
    let tps: number | null = null
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const { chunks, rest } = parseOllamaJsonLines(buffer)
      buffer = rest
      for (const c of chunks) {
        const piece = c.message?.content ?? ''
        if (piece) {
          content += piece
          req.onChunk(piece)
        }
        if (c.done) tps = tokensPerSecond(c.eval_count, c.eval_duration)
      }
    }
    return { content, model, tokensPerSecond: tps }
  }

  async listModels(): Promise<AIModelInfo[]> {
    const res = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(2500) })
    if (!res.ok) throw new Error(`Ollama respondeu HTTP ${res.status} ao listar modelos.`)
    const j = (await res.json()) as {
      models?: { name: string; size?: number; details?: { family?: string } }[]
    }
    return (j.models ?? []).map((m) => ({
      name: m.name,
      sizeBytes: m.size ?? null,
      family: m.details?.family ?? null
    }))
  }

  async ping(): Promise<AIPingResult> {
    const t0 = Date.now()
    try {
      const res = await fetch(`${this.baseUrl}/api/version`, { signal: AbortSignal.timeout(1500) })
      if (!res.ok) return { ok: false, latencyMs: null, detail: `Ollama respondeu HTTP ${res.status}.` }
      const j = (await res.json()) as { version?: string }
      const latencyMs = Date.now() - t0
      // Instalado — verifica se há ao menos um modelo baixado.
      const models = await this.listModels().catch(() => [])
      if (models.length === 0) {
        return {
          ok: false,
          latencyMs,
          detail:
            `Ollama ${j.version ?? ''} instalado, mas SEM modelos. ` +
            `Baixe um: \`ollama pull ${OLLAMA_SUGGESTED_MODELS[0]}\``
        }
      }
      const hasModel = models.some((m) => m.name === this.model || m.name.startsWith(`${this.model}:`))
      return {
        ok: true,
        latencyMs,
        detail: hasModel
          ? `Ollama ${j.version ?? ''} pronto · ${models.length} modelo(s) instalados.`
          : `Ollama pronto, mas o modelo "${this.model}" não está instalado — use um da lista ou \`ollama pull ${this.model}\`.`
      }
    } catch {
      return {
        ok: false,
        latencyMs: null,
        detail: 'Ollama não encontrado em 127.0.0.1:11434. Instale em https://ollama.com e execute o serviço.'
      }
    }
  }

  /** Mede a velocidade real (tokens/s) com um prompt mínimo. */
  async bench(): Promise<number | null> {
    try {
      const r = await this.chat({
        model: null,
        messages: [{ role: 'user', content: 'Responda apenas: ok' }],
        maxTokens: 8,
        temperature: 0
      })
      return r.tokensPerSecond
    } catch {
      return null
    }
  }

  private explainHttpError(status: number, body: string, model: string): string {
    if (status === 404 && body.includes('model')) {
      return `Modelo "${model}" não instalado no Ollama. Baixe com: ollama pull ${model}`
    }
    return `Ollama HTTP ${status}: ${body.slice(0, 160)}`
  }
}

export const OLLAMA_DESCRIPTOR: AIProviderDescriptor = {
  id: 'ollama',
  label: 'Ollama (local)',
  capabilities: { streaming: true, local: true, needsApiKey: false, listModels: true, jsonOutput: true },
  defaultModel: OLLAMA_DEFAULT_MODEL,
  create: (config) => new OllamaProvider(config)
}

/** Acesso tipado ao bench sem expor a classe (usado pelo health check). */
export function isOllamaProvider(p: AIProvider): p is OllamaProvider & { bench(): Promise<number | null> } {
  return p.id === 'ollama'
}
