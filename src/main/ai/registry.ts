// AIRegistry — registro Open/Closed de provedores (mesmo padrão dos fatores
// do Strategy Engine e dos adapters do Importador): adicionar um provedor =
// criar o arquivo e registrá-lo aqui; nenhum consumidor muda.
import type { AIProviderId } from '@shared/domain'
import type { AIProviderDescriptor } from './types'

const DESCRIPTORS: AIProviderDescriptor[] = []

export function registerAIProvider(descriptor: AIProviderDescriptor): void {
  const i = DESCRIPTORS.findIndex((d) => d.id === descriptor.id)
  if (i >= 0) DESCRIPTORS[i] = descriptor
  else DESCRIPTORS.push(descriptor)
}

export function listAIProviders(): AIProviderDescriptor[] {
  return [...DESCRIPTORS]
}

export function getAIProviderDescriptor(id: AIProviderId): AIProviderDescriptor | null {
  return DESCRIPTORS.find((d) => d.id === id) ?? null
}
