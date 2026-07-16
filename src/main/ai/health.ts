// HealthCheck da AI Platform: disponibilidade + latência do provedor ativo,
// e velocidade medida (tokens/s) quando o provedor é o Ollama.
import type { AIHealth } from '@shared/domain'
import { createActiveProvider } from './factory'
import { isOllamaProvider } from './providers/ollama'

export async function checkAIHealth(): Promise<AIHealth> {
  const provider = createActiveProvider()
  const ping = await provider.ping()
  let tokensPerSecond: number | null = null
  if (ping.ok && isOllamaProvider(provider)) {
    tokensPerSecond = await provider.bench()
  }
  return {
    ok: ping.ok,
    provider: provider.id,
    model: provider.model,
    latencyMs: ping.latencyMs,
    tokensPerSecond,
    detail: ping.detail
  }
}
