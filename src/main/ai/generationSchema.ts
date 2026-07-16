// Esquema/validação da geração de conteúdo — funções PURAS (testáveis em
// Node, sem DB): prompts por tipo, extração e validação estrita do JSON.
import type { GenerationKind } from '@shared/domain'

export interface GeneratedFlashcard {
  front: string
  back: string
}

export interface GeneratedQuestion {
  enunciado: string
  alternativas: string[]
  corretaIndex: number
  dificuldade: 'FACIL' | 'MEDIO' | 'DIFICIL'
  comentario: string
}

export interface GeneratedPayload {
  resumo?: string
  mapa?: string
  titulo?: string
  explicacao?: string
  exemplos?: { titulo: string; texto: string }[]
  flashcards?: GeneratedFlashcard[]
  questoes?: GeneratedQuestion[]
  relacionados?: string[]
}

/** Extrai o primeiro objeto JSON de uma resposta (tolerante a cercas de código). */
export function extractJson(raw: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(raw)
  const body = fenced ? fenced[1] : raw
  const start = body.indexOf('{')
  const end = body.lastIndexOf('}')
  if (start === -1 || end <= start) throw new Error('A resposta do modelo não contém JSON.')
  return body.slice(start, end + 1)
}

/** Valida o payload por tipo de geração (estrito; a falha explica o problema). */
export function parseGenerated(kind: GenerationKind, raw: string): GeneratedPayload {
  const j = JSON.parse(extractJson(raw)) as GeneratedPayload
  const fail = (msg: string): never => {
    throw new Error(`Conteúdo gerado inválido (${kind}): ${msg}`)
  }
  switch (kind) {
    case 'RESUMO':
      if (!j.resumo || j.resumo.trim().length < 40) fail('campo "resumo" ausente ou curto demais')
      break
    case 'MAPA_MENTAL':
      if (!j.mapa || !j.mapa.includes('-')) fail('campo "mapa" ausente ou sem estrutura hierárquica')
      break
    case 'EXPLICACAO':
      if (!j.explicacao || j.explicacao.trim().length < 40) fail('campo "explicacao" ausente ou curto')
      break
    case 'EXEMPLOS':
      if (!Array.isArray(j.exemplos) || j.exemplos.length === 0) fail('lista "exemplos" vazia')
      break
    case 'FLASHCARDS':
      if (!Array.isArray(j.flashcards) || j.flashcards.length === 0) fail('lista "flashcards" vazia')
      for (const f of j.flashcards ?? []) if (!f.front?.trim() || !f.back?.trim()) fail('flashcard sem frente/verso')
      break
    case 'QUESTOES':
      if (!Array.isArray(j.questoes) || j.questoes.length === 0) fail('lista "questoes" vazia')
      for (const q of j.questoes ?? []) {
        if (!q.enunciado?.trim()) fail('questão sem enunciado')
        if (!Array.isArray(q.alternativas) || q.alternativas.length !== 5) fail('questão sem 5 alternativas')
        if (q.corretaIndex < 0 || q.corretaIndex > 4) fail('corretaIndex fora de 0..4')
        if (!['FACIL', 'MEDIO', 'DIFICIL'].includes(q.dificuldade)) q.dificuldade = 'MEDIO'
        if (!q.comentario?.trim()) fail('questão sem comentário')
      }
      break
  }
  return j
}

export function promptFor(kind: GenerationKind, count: number): string {
  switch (kind) {
    case 'RESUMO':
      return `Gere um resumo técnico de estudo em markdown (títulos, tabelas quando úteis, foco no que a banca cobra). JSON: {"resumo": "...", "relacionados": ["nomes de tópicos do edital ligados a este"]}`
    case 'MAPA_MENTAL':
      return `Gere a ESTRUTURA de um mapa mental em markdown aninhado (listas "-" com até 4 níveis, do conceito central para os detalhes). JSON: {"mapa": "- Tema central\\n  - Ramo...", "relacionados": []}`
    case 'FLASHCARDS':
      return `Gere ${count} flashcards de revisão (frente = pergunta/termo curto; verso = resposta objetiva de até 2 frases). JSON: {"flashcards": [{"front": "...", "back": "..."}]}`
    case 'QUESTOES':
      return `Gere ${count} questões INÉDITAS de múltipla escolha no estilo da banca (5 alternativas, uma correta, comentário explicando o gabarito). JSON: {"questoes": [{"enunciado": "...", "alternativas": ["A","B","C","D","E"], "corretaIndex": 0, "dificuldade": "FACIL|MEDIO|DIFICIL", "comentario": "..."}]}`
    case 'EXPLICACAO':
      return `Explique o tópico de forma didática e aprofundada para a prova. JSON: {"titulo": "...", "explicacao": "markdown", "relacionados": []}`
    case 'EXEMPLOS':
      return `Gere 3 exemplos práticos/aplicados do tópico (situações concretas, código ou casos, conforme o tema). JSON: {"exemplos": [{"titulo": "...", "texto": "markdown"}]}`
  }
}
