// CapabilityDetector — capacidades ESTÁTICAS (do descritor) combinadas com a
// verificação DINÂMICA de disponibilidade (o Ollama pode estar instalado sem
// modelos; um provedor remoto pode estar sem chave).
import type { AIProviderInfo } from '@shared/domain'
import { listDescriptorsWithState } from './factory'

export function detectProviders(): AIProviderInfo[] {
  return listDescriptorsWithState().map((d) => ({
    id: d.id,
    label: d.label,
    capabilities: d.capabilities,
    active: d.active,
    configured: d.configured
  }))
}
