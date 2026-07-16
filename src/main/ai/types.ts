// Contratos internos da AI Platform (M22) — processo main.
// A plataforma NUNCA conversa com um provedor diretamente: toda chamada passa
// pela interface AIProvider, resolvida por registry + factory (ADR-016).
// O renderer nunca vê estes tipos — só os DTOs de @shared/domain.
import type { AICapabilities, AIModelInfo, AIProviderId } from '@shared/domain'

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIChatRequest {
  model: string | null // null = defaultModel do provedor
  messages: AIChatMessage[]
  maxTokens?: number
  temperature?: number
  /** Pedir saída JSON estrita (quando o provedor suporta). */
  json?: boolean
  /** Streaming opcional: recebe cada trecho de texto assim que chega. */
  onChunk?: (text: string) => void
}

export interface AIChatResponse {
  content: string
  model: string
  tokensPerSecond: number | null // medido quando o provedor informa (Ollama)
}

export interface AIPingResult {
  ok: boolean
  latencyMs: number | null
  detail: string
}

/** Interface única de provedor. Implementações: Ollama, OpenAI, Anthropic, Gemini CLI. */
export interface AIProvider {
  readonly id: AIProviderId
  readonly label: string
  readonly capabilities: AICapabilities
  readonly defaultModel: string
  /** Modelo efetivo configurado (ou default). */
  readonly model: string
  chat(req: AIChatRequest): Promise<AIChatResponse>
  /** Enumerar modelos disponíveis (quando capabilities.listModels). */
  listModels?(): Promise<AIModelInfo[]>
  /** Verificação barata de disponibilidade (instalação/chave/latência). */
  ping(): Promise<AIPingResult>
}

/** Configuração injetada pela factory (derivada de AISettings). */
export interface AIProviderConfig {
  model: string | null
  apiKey: string | null
  baseUrl: string | null
}

/** Descritor registrável (Open/Closed): adicionar provedor = 1 registro. */
export interface AIProviderDescriptor {
  id: AIProviderId
  label: string
  capabilities: AICapabilities
  defaultModel: string
  create(config: AIProviderConfig): AIProvider
}
