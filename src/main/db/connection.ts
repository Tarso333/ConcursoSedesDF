import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import Database from 'better-sqlite3'
import { type BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
import { app } from 'electron'
import * as schema from './schema'

export type DB = BetterSQLite3Database<typeof schema>

let _sqlite: Database.Database | null = null
let _db: DB | null = null

export function getDbPath(): string {
  const dir = app.getPath('userData')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return join(dir, 'aprova-sedes.db')
}

export function getSqlite(): Database.Database {
  if (!_sqlite) {
    _sqlite = new Database(getDbPath())
    _sqlite.pragma('journal_mode = WAL')
    _sqlite.pragma('foreign_keys = ON')
  }
  return _sqlite
}

export function getDb(): DB {
  if (!_db) _db = drizzle(getSqlite(), { schema })
  return _db
}

export function closeDb(): void {
  if (_sqlite) {
    _sqlite.close()
    _sqlite = null
    _db = null
  }
}
