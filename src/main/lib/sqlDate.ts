// Formato de data uniforme com o datetime('now') do SQLite ('YYYY-MM-DD HH:MM:SS', UTC).
// Mantém comparações de string (due <= datetime('now')) corretas e lexicográficas.

export function toSqlDate(d: Date): string {
  return d.toISOString().slice(0, 19).replace('T', ' ')
}

export function parseSqlDate(s: string): Date {
  return new Date(`${s.replace(' ', 'T')}Z`)
}

export function nowSql(): string {
  return toSqlDate(new Date())
}
