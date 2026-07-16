// Provedor Anthropic (API /v1/messages).
import type {
  AIChatRequest,
  AIChatResponse,
  AIPingResult,
  AIProvider,
  AIProviderConfig,
  AIProviderDescriptor
} from '../types'

const CAPS = { streaming: false, local: false, needsApiKey: true, listModels: false, jsonOutput: true }
const DEFAULT_MODEL = 'claude-opus-4-8'

class AnthropicProvider implements AIProvider {
  readonly id = 'anthropic' as const
  readonly label = 'Anthropic (Claude)'
  readonly capabilities = CAPS
  readonly defaultModel = DEFAULT_MODEL
  readonly model: string
  private readonly apiKey: string | null

  constructor(config: AIProviderConfig) {
    this.model = config.model ?? DEFAULT_MODEL
    this.apiKey = config.apiKey
  }

  async chat(req: AIChatRequest): Promise<AIChatResponse> {
    if (!this.apiKey) throw new Error('Anthropic: configure a chave de API em Configurações.')
    const model = req.model ?? this.model
    // A API separa o system das mensagens.
    const system = req.messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n')
    const messages = req.messages.filter((m) => m.role !== 'system')
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: req.maxTokens ?? 1600,
        temperature: req.temperature ?? 0.4,
        system: system || undefined,
        messages
      })
    })
    const j = (await res.json()) as { content?: { text?: string }[]; error?: { message?: string } }
    if (!res.ok) throw new Error(j?.error?.message || `Anthropic HTTP ${res.status}`)
    return { content: j.content?.[0]?.text ?? '', model, tokensPerSecond: null }
  }

  async ping(): Promise<AIPingResult> {
    if (!this.apiKey) return { ok: false, latencyMs: null, detail: 'Anthropic: sem chave de API configurada.' }
    const t0 = Date.now()
    try {
      await this.chat({
        model: null,
        messages: [{ role: 'user', content: 'ping — responda "ok"' }],
        maxTokens: 4,
        temperature: 0
      })
      return { ok: true, latencyMs: Date.now() - t0, detail: 'Anthropic respondeu.' }
    } catch (e) {
      return { ok: false, latencyMs: null, detail: e instanceof Error ? e.message : String(e) }
    }
  }
}

export const ANTHROPIC_DESCRIPTOR: AIProviderDescriptor = {
  id: 'anthropic',
  label: 'Anthropic (Claude)',
  capabilities: CAPS,
  defaultModel: DEFAULT_MODEL,
  create: (config) => new AnthropicProvider(config)
}
