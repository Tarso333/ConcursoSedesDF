const ptNumber = new Intl.NumberFormat('pt-BR')

export const fmtNum = (n: number): string => ptNumber.format(n)

export const pct = (ratio: number, digits = 0): string => `${(ratio * 100).toFixed(digits)}%`

export function fmtDatePtBR(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`
}

export function fmtMinutes(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h <= 0) return `${m}min`
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export function fmtWeekday(iso: string): string {
  const date = new Date(`${iso}T12:00:00`)
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
}
