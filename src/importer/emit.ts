// Serialização do ContestSeed para código-fonte .ts (codegen determinístico).
// Gera um arquivo no MESMO formato de seed/contests/<slug>/, pronto para
// revisão humana e registro em seed/contests/index.ts.
import type { ContestSeed } from '@main/db/seed/contests/types'

function q(s: string | null): string {
  if (s == null) return 'null'
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
}

/** Emite o ContestSeed como fonte TypeScript (um único arquivo autocontido). */
export function emitSeedModule(seed: ContestSeed, constName = 'IMPORTED_CONTEST'): string {
  const json = JSON.stringify(
    {
      slug: seed.slug,
      name: seed.name,
      role: seed.role,
      board: seed.board,
      examDate: seed.examDate,
      city: seed.city,
      salary: seed.salary,
      benefits: seed.benefits,
      examConfig: seed.examConfig,
      disciplines: seed.disciplines,
      questions: seed.questions,
      knowledge: seed.knowledge,
      relations: seed.relations
    },
    null,
    2
  )
  return (
    `// Gerado pelo Universal Contest Import Engine (revisar antes de usar).\n` +
    `// Concurso: ${seed.name} (${seed.slug}).\n` +
    `import type { ContestSeed } from '../types'\n\n` +
    `export const ${constName}: ContestSeed = ${json}\n`
  )
}

/** Resumo textual (uma linha) para logs — sem depender de emitSeedModule. */
export function summarize(seed: ContestSeed): string {
  const topics = seed.disciplines.reduce((s, d) => s + d.topics.length, 0)
  return `${q(seed.name)}: ${seed.disciplines.length} disciplinas, ${topics} tópicos`
}
