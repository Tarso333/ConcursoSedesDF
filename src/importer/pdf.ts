// Extração determinística de texto de PDF usando apenas Node + zlib
// (streams FlateDecode). Mesma técnica validada nas cargas ABGF/DATAPREV.
// Sem dependências externas, sem IA, sem OCR.
import zlib from 'node:zlib'

function decodePdfString(s: string): string {
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '\\') {
      const n = s[i + 1]
      if (n >= '0' && n <= '7') {
        let oct = ''
        let j = i + 1
        while (j < s.length && oct.length < 3 && s[j] >= '0' && s[j] <= '7') {
          oct += s[j]
          j++
        }
        out += String.fromCharCode(parseInt(oct, 8))
        i = j - 1
      } else {
        const map: Record<string, string> = {
          n: '\n', r: '', t: ' ', b: '', f: '', '(': '(', ')': ')', '\\': '\\'
        }
        out += map[n] ?? n
        i++
      }
    } else {
      out += c
    }
  }
  return out
}

function inflateStreams(buf: Buffer): Buffer[] {
  const chunks: Buffer[] = []
  let idx = 0
  while (true) {
    const s = buf.indexOf('stream', idx)
    if (s === -1) break
    let dataStart = s + 6
    if (buf[dataStart] === 0x0d) dataStart++
    if (buf[dataStart] === 0x0a) dataStart++
    const e = buf.indexOf('endstream', dataStart)
    if (e === -1) break
    try {
      chunks.push(zlib.inflateSync(buf.subarray(dataStart, e)))
    } catch {
      /* stream não-flate (imagens, fontes) — ignora */
    }
    idx = e + 9
  }
  return chunks
}

const CONTROL_CHARS = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g

/** Extrai o texto legível de um PDF (Buffer) de forma determinística. */
export function extractPdfText(buffer: Buffer): string {
  const chunks = inflateStreams(buffer)
  let result = ''
  for (const chunk of chunks) {
    const content = chunk.toString('latin1')
    if (!content.includes('BT')) continue // só streams de conteúdo de texto
    let i = 0
    while (i < content.length) {
      const c = content[i]
      if (c === '(') {
        let depth = 1
        let j = i + 1
        let raw = ''
        while (j < content.length && depth > 0) {
          const ch = content[j]
          if (ch === '\\') {
            raw += ch + (content[j + 1] ?? '')
            j += 2
            continue
          }
          if (ch === '(') depth++
          if (ch === ')') depth--
          if (depth > 0) raw += ch
          j++
        }
        result += decodePdfString(raw)
        i = j
      } else if (
        content.startsWith('Td', i) ||
        content.startsWith('TD', i) ||
        content.startsWith('T*', i) ||
        content.startsWith('ET', i)
      ) {
        result += '\n'
        i += 2
      } else {
        i++
      }
    }
  }
  return result.replace(CONTROL_CHARS, '')
}
