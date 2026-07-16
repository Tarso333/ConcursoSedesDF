// Tutor Inteligente (M22) — NÃO é um chatbot genérico.
// Regra de ouro: os DADOS DA PLATAFORMA vêm primeiro (Knowledge, grafo,
// analytics, strategy, erros, FSRS); a IA apenas complementa. Cada resposta
// carrega ATRIBUIÇÃO DETERMINÍSTICA (ver ./attribution.ts).
import { eq } from 'drizzle-orm'
import type { AiMessageDTO, Contest, TutorAttribution } from '@shared/domain'
import { getDb } from '../db/connection'
import { aiMessages } from '../db/schema'
import { buildAttribution, parseAttribution, renderAttributionText } from './attribution'
import { buildStudyContext } from './context/builder'
import { renderStudyContext } from './context/render'
import type { StudyContext } from './context/types'
import { createActiveProvider } from './factory'
import type { AIChatMessage } from './types'

function systemPrompt(ctx: StudyContext): string {
  const c = ctx.contest
  return (
    `Você é o Tutor da plataforma APROVA, especialista no concurso ${c.name}` +
    `${c.board ? ` (banca ${c.board})` : ''}${c.role ? `, cargo ${c.role}` : ''}. ` +
    `Aluno: ${ctx.userName ?? 'candidato(a)'}.\n\n` +
    'REGRAS OBRIGATÓRIAS:\n' +
    '1. Use PRIMEIRO os dados da plataforma fornecidos no contexto (conhecimento do tópico, ' +
    'grafo de dependências, desempenho, plano do dia, erros e revisões). Eles são a fonte primária.\n' +
    '2. Só complemente com seu conhecimento geral quando o contexto não cobrir — e sinalize com "Complemento:".\n' +
    '3. Adapte a resposta ao desempenho do aluno (reforce onde ele erra; seja direto onde ele domina).\n' +
    '4. Estilo da banca importa: oriente pensando em como a banca cobra o tema.\n' +
    '5. Responda em português do Brasil, de forma didática, objetiva e motivadora. Use markdown leve.'
  )
}

export interface AskTutorOptions {
  onChunk?: (text: string) => void
}

export async function askTutor(
  contest: Contest,
  question: string,
  options: AskTutorOptions = {}
): Promise<AiMessageDTO> {
  const db = getDb()
  db.insert(aiMessages).values({ contestId: contest.id, role: 'user', content: question }).run()

  const ctx = buildStudyContext(contest, { question, includeHeavyAnalytics: true })
  const attribution = buildAttribution(ctx)

  let reply: string
  let attributionToPersist: TutorAttribution | null = attribution
  try {
    const provider = createActiveProvider()
    // Conversa multi-turno: histórico (sem a pergunta atual) + pergunta com contexto.
    const turns: AIChatMessage[] = ctx.history.slice(0, -1).map((h) => ({ role: h.role, content: h.content }))
    while (turns.length && turns[0].role === 'assistant') turns.shift()
    const res = await provider.chat({
      model: null,
      messages: [
        { role: 'system', content: systemPrompt(ctx) },
        ...turns,
        {
          role: 'user',
          content: `CONTEXTO DA PLATAFORMA (fonte primária):\n${renderStudyContext(ctx)}\n\nPERGUNTA DO ALUNO:\n${question}`
        }
      ],
      onChunk: options.onChunk
    })
    reply = (res.content || '(sem resposta do modelo)') + renderAttributionText(attribution)
  } catch (e) {
    reply =
      `Não consegui falar com o provedor de IA: ${e instanceof Error ? e.message : String(e)}\n\n` +
      'Verifique o provedor em **Configurações → Inteligência Artificial** (o padrão é o Ollama local).'
    attributionToPersist = null
  }

  const res = db
    .insert(aiMessages)
    .values({
      contestId: contest.id,
      role: 'assistant',
      content: reply,
      contextType: attributionToPersist ? JSON.stringify(attributionToPersist) : null
    })
    .run()
  return {
    id: Number(res.lastInsertRowid),
    role: 'assistant',
    content: reply,
    createdAt: new Date().toISOString(),
    attribution: attributionToPersist
  }
}

export function historyWithAttribution(contestId: number): AiMessageDTO[] {
  return getDb()
    .select()
    .from(aiMessages)
    .where(eq(aiMessages.contestId, contestId))
    .orderBy(aiMessages.id)
    .all()
    .map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt,
      attribution: parseAttribution(m.contextType)
    }))
}
