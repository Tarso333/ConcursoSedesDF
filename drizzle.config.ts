import { defineConfig } from 'drizzle-kit'

// Usado apenas para geração de artefatos de schema durante o desenvolvimento.
// O runtime NÃO depende do drizzle-kit: as migrations são aplicadas no boot
// via PRAGMA user_version (ver src/main/db/migrate.ts).
export default defineConfig({
  dialect: 'sqlite',
  schema: './src/main/db/schema.ts',
  out: './src/main/db/drizzle',
  verbose: true,
  strict: true
})
