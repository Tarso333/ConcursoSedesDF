// Registro de adaptadores (Open/Closed). Adicionar uma banca = importar o
// adaptador e registrá-lo aqui; o pipeline não muda.
import { AOCP_ADAPTER } from './aocp'
import { CEBRASPE_ADAPTER } from './cebraspe'
import { FCC_ADAPTER } from './fcc'
import { FGV_ADAPTER } from './fgv'
import { GENERIC_ADAPTER } from './generic'
import { QUADRIX_ADAPTER } from './quadrix'
import type { BankAdapter } from './types'

const ADAPTERS: BankAdapter[] = []

/** Registra um adaptador de banca (idempotente por id). */
export function registerAdapter(adapter: BankAdapter): void {
  const i = ADAPTERS.findIndex((a) => a.id === adapter.id)
  if (i >= 0) ADAPTERS[i] = adapter
  else ADAPTERS.push(adapter)
}

/** Lista os adaptadores específicos registrados (sem o genérico). */
export function listAdapters(): BankAdapter[] {
  return ADAPTERS.filter((a) => a.id !== GENERIC_ADAPTER.id)
}

/** Detecta o adaptador pela assinatura da banca no texto (ou null). */
export function detectAdapter(deaccentedUpper: string): BankAdapter | null {
  return listAdapters().find((a) => a.matches(deaccentedUpper)) ?? null
}

/**
 * Resolve o adaptador a usar: id explícito → detecção → genérico.
 */
export function resolveAdapter(explicitId: string | undefined, deaccentedUpper: string): BankAdapter {
  if (explicitId) {
    const found = ADAPTERS.find((a) => a.id === explicitId)
    if (found) return found
  }
  return detectAdapter(deaccentedUpper) ?? GENERIC_ADAPTER
}

// Registro dos adaptadores embutidos.
registerAdapter(GENERIC_ADAPTER)
registerAdapter(FGV_ADAPTER)
registerAdapter(FCC_ADAPTER)
registerAdapter(QUADRIX_ADAPTER)
registerAdapter(CEBRASPE_ADAPTER)
registerAdapter(AOCP_ADAPTER)
