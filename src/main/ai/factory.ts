// ProviderFactory — resolve AISettings → instância AIProvider via registry.
// Registra aqui os provedores embutidos (bootstrap único da plataforma).
import type { AIProviderId } from '@shared/domain'
import { getAIProviderDescriptor, listAIProviders, registerAIProvider } from './registry'
import { type AISettings, getAISettings } from './settings'
import type { AIProvider } from './types'
import { ANTHROPIC_DESCRIPTOR } from './providers/anthropic'
import { GEMINI_CLI_DESCRIPTOR } from './providers/geminiCli'
import { OLLAMA_DESCRIPTOR } from './providers/ollama'
import { CUSTOM_DESCRIPTOR, OPENAI_DESCRIPTOR, OPENROUTER_DESCRIPTOR } from './providers/openai'

// Bootstrap: Ollama primeiro (é o padrão do produto).
registerAIProvider(OLLAMA_DESCRIPTOR)
registerAIProvider(GEMINI_CLI_DESCRIPTOR)
registerAIProvider(OPENAI_DESCRIPTOR)
registerAIProvider(ANTHROPIC_DESCRIPTOR)
registerAIProvider(OPENROUTER_DESCRIPTOR)
registerAIProvider(CUSTOM_DESCRIPTOR)

/** Cria o provedor para um AISettings explícito (puro em relação ao DB). */
export function createProvider(settings: AISettings): AIProvider {
  const descriptor = getAIProviderDescriptor(settings.providerId) ?? OLLAMA_DESCRIPTOR
  return descriptor.create({
    model: settings.model,
    apiKey: settings.apiKey,
    baseUrl: settings.baseUrl
  })
}

/** Cria o provedor ATIVO segundo as configurações persistidas. */
export function createActiveProvider(): AIProvider {
  return createProvider(getAISettings())
}

/** O provedor está apto a funcionar (sem fazer rede)? */
export function isConfigured(settings: AISettings): boolean {
  const d = getAIProviderDescriptor(settings.providerId)
  if (!d) return false
  return d.capabilities.needsApiKey ? Boolean(settings.apiKey) : true
}

export function listDescriptorsWithState(): {
  id: AIProviderId
  label: string
  capabilities: (typeof OLLAMA_DESCRIPTOR)['capabilities']
  active: boolean
  configured: boolean
}[] {
  const s = getAISettings()
  return listAIProviders().map((d) => ({
    id: d.id,
    label: d.label,
    capabilities: d.capabilities,
    active: d.id === s.providerId,
    configured: d.capabilities.needsApiKey ? Boolean(s.apiKey) && d.id === s.providerId : true
  }))
}
