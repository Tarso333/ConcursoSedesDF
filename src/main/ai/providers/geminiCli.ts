// Provedor Gemini CLI — usa o binário `gemini` instalado na máquina
// (autenticação da conta Google feita pelo próprio CLI; sem chave no app).
import { spawn } from 'node:child_process'
import type {
  AIChatRequest,
  AIChatResponse,
  AIPingResult,
  AIProvider,
  AIProviderConfig,
  AIProviderDescriptor
} from '../types'

const CAPS = { streaming: false, local: false, needsApiKey: false, listModels: false, jsonOutput: false }
const DEFAULT_MODEL = 'gemini-2.5-flash'

function runCli(args: string[], stdin: string | null, timeoutMs: number): Promise<{ out: string; code: number }> {
  return new Promise((resolve, reject) => {
    // shell:true resolve .cmd/.ps1 no Windows.
    const child = spawn('gemini', args, { shell: true, windowsHide: true })
    let out = ''
    let err = ''
    const timer = setTimeout(() => {
      child.kill()
      reject(new Error(`Gemini CLI: tempo esgotado (${Math.round(timeoutMs / 1000)}s).`))
    }, timeoutMs)
    child.stdout.on('data', (d: Buffer) => (out += d.toString('utf8')))
    child.stderr.on('data', (d: Buffer) => (err += d.toString('utf8')))
    child.on('error', (e) => {
      clearTimeout(timer)
      reject(new Error(`Gemini CLI não encontrado (${e.message}). Instale: npm i -g @google/gemini-cli`))
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      if (code !== 0 && !out.trim()) reject(new Error(`Gemini CLI saiu com código ${code}: ${err.slice(0, 200)}`))
      else resolve({ out, code: code ?? 0 })
    })
    if (stdin != null) {
      child.stdin.write(stdin, 'utf8')
    }
    child.stdin.end()
  })
}

class GeminiCliProvider implements AIProvider {
  readonly id = 'gemini-cli' as const
  readonly label = 'Gemini CLI'
  readonly capabilities = CAPS
  readonly defaultModel = DEFAULT_MODEL
  readonly model: string

  constructor(config: AIProviderConfig) {
    this.model = config.model ?? DEFAULT_MODEL
  }

  async chat(req: AIChatRequest): Promise<AIChatResponse> {
    const model = req.model ?? this.model
    // O CLI não tem papéis: serializa a conversa num prompt único via stdin.
    const prompt = req.messages
      .map((m) => (m.role === 'system' ? `[INSTRUÇÕES]\n${m.content}` : `[${m.role.toUpperCase()}]\n${m.content}`))
      .join('\n\n')
    const { out } = await runCli(['-m', model, '-p', ''], prompt, 120_000)
    return { content: out.trim(), model, tokensPerSecond: null }
  }

  async ping(): Promise<AIPingResult> {
    const t0 = Date.now()
    try {
      const { out } = await runCli(['--version'], null, 8_000)
      return {
        ok: true,
        latencyMs: Date.now() - t0,
        detail: `Gemini CLI ${out.trim().split('\n')[0]} disponível.`
      }
    } catch (e) {
      return { ok: false, latencyMs: null, detail: e instanceof Error ? e.message : String(e) }
    }
  }
}

export const GEMINI_CLI_DESCRIPTOR: AIProviderDescriptor = {
  id: 'gemini-cli',
  label: 'Gemini CLI',
  capabilities: CAPS,
  defaultModel: DEFAULT_MODEL,
  create: (config) => new GeminiCliProvider(config)
}
