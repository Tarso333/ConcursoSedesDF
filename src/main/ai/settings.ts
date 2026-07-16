// AISettings — visão TIPADA das colunas ai_* já existentes em `settings`
// (ai_provider, ai_model, ai_api_key — desde a v1). ZERO migration:
// o provider id, o modelo e a chave usam as colunas atuais; uma URL custom
// é reconhecida quando ai_provider começa com http(s).
import { eq } from 'drizzle-orm'
import type { AIProviderId } from '@shared/domain'
import { getDb } from '../db/connection'
import { settings } from '../db/schema'
import { parseProviderId } from './providerConfig'

export interface AISettings {
  providerId: AIProviderId
  model: string | null
  apiKey: string | null
  baseUrl: string | null // somente para providerId 'custom'
}

export { parseProviderId }

export function getAISettings(): AISettings {
  const s = getDb().select().from(settings).where(eq(settings.id, 1)).get()
  const { providerId, baseUrl } = parseProviderId(s?.aiProvider)
  return {
    providerId,
    model: s?.aiModel?.trim() || null,
    apiKey: s?.aiApiKey?.trim() || null,
    baseUrl
  }
}
