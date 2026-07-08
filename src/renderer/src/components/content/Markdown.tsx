// Mini-renderizador de markdown (offline, sem dependências): títulos, listas,
// tabelas, negrito/itálico/código e links. Cobre o conteúdo da Engine de
// Conhecimento; pode ser trocado por uma lib completa sem afetar o domínio.
import type { ReactNode } from 'react'

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = []
  // Tokens: **negrito**, *itálico*, `código`, [rótulo](url)
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const tok = m[0]
    const key = `${keyBase}-${i++}`
    if (tok.startsWith('**')) {
      out.push(<strong key={key}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('`')) {
      out.push(
        <code key={key} className="rounded bg-muted px-1 py-0.5 text-[0.85em]">
          {tok.slice(1, -1)}
        </code>
      )
    } else if (tok.startsWith('[')) {
      const mm = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)
      if (mm) {
        out.push(
          <a key={key} href={mm[2]} target="_blank" rel="noreferrer" className="text-primary underline">
            {mm[1]}
          </a>
        )
      }
    } else {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function isTableLine(l: string): boolean {
  return l.trim().startsWith('|')
}

export function Markdown({ text }: { text: string }): JSX.Element {
  const lines = text.split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  let k = 0

  const flushParagraph = (buf: string[]): void => {
    if (buf.length === 0) return
    blocks.push(
      <p key={`p-${k++}`} className="leading-relaxed">
        {inline(buf.join(' '), `p-${k}`)}
      </p>
    )
    buf.length = 0
  }

  const para: string[] = []
  while (i < lines.length) {
    const line = lines[i]
    const t = line.trim()

    if (t === '') {
      flushParagraph(para)
      i++
      continue
    }

    const h = /^(#{1,3})\s+(.*)$/.exec(t)
    if (h) {
      flushParagraph(para)
      const level = h[1].length
      const cls =
        level === 1
          ? 'text-lg font-bold tracking-tight'
          : level === 2
            ? 'mt-2 text-base font-semibold'
            : 'mt-1 text-sm font-semibold'
      blocks.push(
        <div key={`h-${k++}`} className={cls}>
          {inline(h[2], `h-${k}`)}
        </div>
      )
      i++
      continue
    }

    if (isTableLine(t)) {
      flushParagraph(para)
      const tbl: string[] = []
      while (i < lines.length && isTableLine(lines[i].trim())) {
        tbl.push(lines[i].trim())
        i++
      }
      const rows = tbl
        .filter((r) => !/^\|[\s:-]+\|?[\s|:-]*$/.test(r)) // remove separador
        .map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()))
      if (rows.length > 0) {
        blocks.push(
          <div key={`t-${k++}`} className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {rows[0].map((c, ci) => (
                    <th key={ci} className="border-b px-2 py-1.5 text-left font-semibold">
                      {inline(c, `th-${k}-${ci}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, ci) => (
                      <td key={ci} className="border-b border-border/50 px-2 py-1.5 align-top">
                        {inline(c, `td-${k}-${ri}-${ci}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    const ul = /^[-*]\s+(.*)$/.exec(t)
    const ol = /^(\d+)[.)]\s+(.*)$/.exec(t)
    if (ul || ol) {
      flushParagraph(para)
      const items: { text: string; ordered: boolean }[] = []
      while (i < lines.length) {
        const it = lines[i].trim()
        const mu = /^[-*]\s+(.*)$/.exec(it)
        const mo = /^(\d+)[.)]\s+(.*)$/.exec(it)
        if (mu) items.push({ text: mu[1], ordered: false })
        else if (mo) items.push({ text: mo[2], ordered: true })
        else break
        i++
      }
      const ordered = items[0]?.ordered
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List
          key={`l-${k++}`}
          className={`ml-5 space-y-1 ${ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {items.map((it, ii) => (
            <li key={ii} className="leading-relaxed">
              {inline(it.text, `li-${k}-${ii}`)}
            </li>
          ))}
        </List>
      )
      continue
    }

    para.push(t)
    i++
  }
  flushParagraph(para)

  return <div className="space-y-2.5 text-sm">{blocks}</div>
}
