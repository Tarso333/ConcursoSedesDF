// Tutor IA (M12) — fachada de retrocompatibilidade sobre a AI Platform (M22).
// O contrato público (status/histórico/enviar/limpar) é o MESMO do M12;
// a implementação delega para src/main/ai (registry/factory/context/tutor).
// Justificativa: elimina as chamadas hardcoded a provedores que viviam aqui
// (duplicação com a AI Platform) preservando todos os canais IPC existentes.
import { eq } from 'drizzle-orm'
import type { AiMessageDTO, AiStatus, Contest } from '@shared/domain'
import { getDb } from '../db/connection'
import { aiMessages } from '../db/schema'
import { isConfigured } from '../ai/factory'
import { getAISettings } from '../ai/settings'
import { askTutor, historyWithAttribution } from '../ai/tutor'

export function getAiStatus(): AiStatus {
  const s = getAISettings()
  return {
    configured: isConfigured(s),
    provider: s.providerId,
    model: s.model
  }
}

export function getAiHistory(contestId: number): AiMessageDTO[] {
  return historyWithAttribution(contestId)
}

export function clearAiHistory(contestId: number): void {
  getDb().delete(aiMessages).where(eq(aiMessages.contestId, contestId)).run()
}

export async function sendAiMessage(
  contest: Contest,
  content: string,
  onChunk?: (text: string) => void
): Promise<AiMessageDTO> {
  return askTutor(contest, content, { onChunk })
}
