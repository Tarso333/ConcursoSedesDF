import { asc, desc, eq } from 'drizzle-orm'
import type { AiMessageDTO, AiStatus } from '@shared/domain'
import { getDb } from '../db/connection'
import { aiMessages, settings } from '../db/schema'

const SYSTEM_PROMPT =
  'Você é um tutor particular especialista no concurso SEDES DF 2026 (Secretaria de Estado de ' +
  'Desenvolvimento Social do Distrito Federal, banca Instituto Quadrix), cargo Técnico em ' +
  'Desenvolvimento e Assistência Social — Técnico Administrativo. Ajude o candidato com explicações ' +
  'didáticas e objetivas, resumos, mapas mentais em texto, macetes de memorização e questões ' +
  'comentadas. Responda sempre em português do Brasil, de forma clara e motivadora.'

function settingsRow(): typeof settings.$inferSelect | undefined {
  return getDb().select().from(settings).where(eq(settings.id, 1)).get()
}

export function getAiStatus(): AiStatus {
  const s = settingsRow()
  return {
    configured: Boolean(s?.aiApiKey && s.aiApiKey.length > 0),
    provider: s?.aiProvider ?? null,
    model: s?.aiModel ?? null
  }
}

export function getAiHistory(): AiMessageDTO[] {
  return getDb()
    .select({
      id: aiMessages.id,
      role: aiMessages.role,
      content: aiMessages.content,
      createdAt: aiMessages.createdAt
    })
    .from(aiMessages)
    .orderBy(asc(aiMessages.id))
    .all()
}

export function clearAiHistory(): void {
  getDb().delete(aiMessages).run()
}

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

async function callProvider(
  provider: string,
  model: string | null,
  key: string,
  history: ChatMsg[],
  userText: string
): Promise<string> {
  const p = (provider || '').toLowerCase()

  if (p.includes('anthropic') || p.includes('claude')) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-latest',
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [...history, { role: 'user', content: userText }]
      })
    })
    const j = (await res.json()) as { content?: { text?: string }[]; error?: { message?: string } }
    if (!res.ok) throw new Error(j?.error?.message || `HTTP ${res.status}`)
    return j.content?.[0]?.text ?? '(sem resposta)'
  }

  const base = p.startsWith('http')
    ? provider.replace(/\/$/, '')
    : p.includes('openrouter')
      ? 'https://openrouter.ai/api/v1'
      : 'https://api.openai.com/v1'
  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      max_tokens: 1200,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: userText }]
    })
  })
  const j = (await res.json()) as {
    choices?: { message?: { content?: string } }[]
    error?: { message?: string }
  }
  if (!res.ok) throw new Error(j?.error?.message || `HTTP ${res.status}`)
  return j.choices?.[0]?.message?.content ?? '(sem resposta)'
}

export async function sendAiMessage(content: string): Promise<AiMessageDTO> {
  const db = getDb()
  db.insert(aiMessages).values({ role: 'user', content }).run()

  const s = settingsRow()
  let reply: string
  if (!s?.aiApiKey) {
    reply =
      'O Tutor IA ainda não está ativado. Vá em **Configurações** e cole a sua chave de API de um ' +
      'provedor de LLM (ex.: provider "anthropic" ou "openai"). Tudo o mais do app funciona sem isso. 😉'
  } else {
    try {
      const history = db
        .select({ role: aiMessages.role, content: aiMessages.content })
        .from(aiMessages)
        .orderBy(desc(aiMessages.id))
        .limit(11)
        .all()
        .reverse()
        .slice(0, -1) // remove a última (a que acabamos de inserir)
      // Algumas APIs exigem que a conversa comece com 'user'.
      while (history.length && history[0].role === 'assistant') history.shift()
      reply = await callProvider(s.aiProvider ?? 'openai', s.aiModel ?? null, s.aiApiKey, history, content)
    } catch (e) {
      reply = `Não consegui falar com o provedor de IA: ${e instanceof Error ? e.message : String(e)}`
    }
  }

  const res = db.insert(aiMessages).values({ role: 'assistant', content: reply }).run()
  return {
    id: Number(res.lastInsertRowid),
    role: 'assistant',
    content: reply,
    createdAt: new Date().toISOString()
  }
}
