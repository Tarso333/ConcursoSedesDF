// Resolução PURA do provedor a partir do valor cru persistido (testável em
// Node — sem better-sqlite3 na cadeia de imports, como os engines M16–M18).
import type { AIProviderId } from '@shared/domain'

/**
 * Interpreta `settings.ai_provider`. Retrocompat M12: 'anthropic'/'claude',
 * 'openai', 'openrouter' e URLs http(s) (→ custom OpenAI-compatível).
 * Padrão do produto (M22): vazio/nulo → OLLAMA (local, sem chave).
 */
export function parseProviderId(raw: string | null | undefined): {
  providerId: AIProviderId
  baseUrl: string | null
} {
  const v = (raw ?? '').trim().toLowerCase()
  if (!v) return { providerId: 'ollama', baseUrl: null }
  if (v.startsWith('http')) return { providerId: 'custom', baseUrl: (raw ?? '').trim() }
  if (v.includes('ollama')) return { providerId: 'ollama', baseUrl: null }
  if (v.includes('anthropic') || v.includes('claude')) return { providerId: 'anthropic', baseUrl: null }
  if (v.includes('openrouter')) return { providerId: 'openrouter', baseUrl: null }
  if (v.includes('gemini')) return { providerId: 'gemini-cli', baseUrl: null }
  if (v.includes('openai') || v.includes('gpt')) return { providerId: 'openai', baseUrl: null }
  // valor desconhecido: preserva o comportamento antigo (OpenAI-compatível)
  return { providerId: 'openai', baseUrl: null }
}
