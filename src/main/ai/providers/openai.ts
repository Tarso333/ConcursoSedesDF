// Provedor OpenAI-compatível (OpenAI, OpenRouter e endpoints custom).
// Um único código atende os três descritores — a diferença é a base URL.
import type { AIProviderId } from '@shared/domain'
import type {
  AIChatRequest,
  AIChatResponse,
  AIPingResult,
  AIProvider,
  AIProviderConfig,
  AIProviderDescriptor
} from '../types'

const CAPS = { streaming: false, local: false, needsApiKey: true, listModels: false, jsonOutput: true }

class OpenAICompatibleProvider implements AIProvider {
  readonly capabilities = CAPS
  readonly model: string

  constructor(
    readonly id: AIProviderId,
    readonly label: string,
    readonly defaultModel: string,
    private readonly baseUrl: string,
    private readonly apiKey: string | null,
    config: AIProviderConfig
  ) {
    this.model = config.model ?? defaultModel
  }

  async chat(req: AIChatRequest): Promise<AIChatResponse> {
    if (!this.apiKey) throw new Error(`${this.label}: configure a chave de API em Configurações.`)
    const model = req.model ?? this.model
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({
        model,
        max_tokens: req.maxTokens ?? 1600,
        temperature: req.temperature ?? 0.4,
        response_format: req.json ? { type: 'json_object' } : undefined,
        messages: req.messages
      })
    })
    const j = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
      error?: { message?: string }
    }
    if (!res.ok) throw new Error(j?.error?.message || `${this.label} HTTP ${res.status}`)
    const content = j.choices?.[0]?.message?.content ?? ''
    return { content, model, tokensPerSecond: null }
  }

  async ping(): Promise<AIPingResult> {
    if (!this.apiKey) {
      return { ok: false, latencyMs: null, detail: `${this.label}: sem chave de API configurada.` }
    }
    const t0 = Date.now()
    try {
      await this.chat({
        model: null,
        messages: [{ role: 'user', content: 'ping — responda "ok"' }],
        maxTokens: 4,
        temperature: 0
      })
      return { ok: true, latencyMs: Date.now() - t0, detail: `${this.label} respondeu.` }
    } catch (e) {
      return { ok: false, latencyMs: null, detail: e instanceof Error ? e.message : String(e) }
    }
  }
}

export const OPENAI_DESCRIPTOR: AIProviderDescriptor = {
  id: 'openai',
  label: 'OpenAI',
  capabilities: CAPS,
  defaultModel: 'gpt-4o-mini',
  create: (config) =>
    new OpenAICompatibleProvider('openai', 'OpenAI', 'gpt-4o-mini', 'https://api.openai.com/v1', config.apiKey, config)
}

export const OPENROUTER_DESCRIPTOR: AIProviderDescriptor = {
  id: 'openrouter',
  label: 'OpenRouter',
  capabilities: CAPS,
  defaultModel: 'meta-llama/llama-3.1-70b-instruct',
  create: (config) =>
    new OpenAICompatibleProvider(
      'openrouter',
      'OpenRouter',
      'meta-llama/llama-3.1-70b-instruct',
      'https://openrouter.ai/api/v1',
      config.apiKey,
      config
    )
}

export const CUSTOM_DESCRIPTOR: AIProviderDescriptor = {
  id: 'custom',
  label: 'Endpoint custom (OpenAI-compatível)',
  capabilities: CAPS,
  defaultModel: 'gpt-4o-mini',
  create: (config) =>
    new OpenAICompatibleProvider(
      'custom',
      'Endpoint custom',
      'gpt-4o-mini',
      (config.baseUrl ?? 'https://api.openai.com/v1').replace(/\/$/, ''),
      config.apiKey,
      config
    )
}
