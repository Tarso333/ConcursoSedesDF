// CLI opcional do importador (ferramenta de dev; não faz parte do runtime do
// app). Uso:
//   node --import tsx src/importer/cli.ts <edital.pdf> [--bank fgv] [--slug x]
//     [--name "Nome"] [--block ESPECIFICO] [--out <dir>]
// Sem --out, imprime o relatório; com --out, grava <slug>/index.ts.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { emitSeedModule } from './emit'
import { importContestFromPdf } from './pipeline'
import type { DisciplineBlock } from '@shared/domain'

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}

function main(): void {
  const pdfPath = process.argv[2]
  if (!pdfPath || pdfPath.startsWith('--')) {
    console.error('Uso: cli.ts <edital.pdf> [--bank id] [--slug s] [--name n] [--block B] [--out dir]')
    process.exit(1)
  }
  const buffer = readFileSync(pdfPath)
  const { seed, report } = importContestFromPdf(buffer, {
    bank: arg('--bank'),
    slug: arg('--slug'),
    name: arg('--name'),
    defaultBlock: arg('--block') as DisciplineBlock | undefined
  })

  console.error('=== Relatório de importação ===')
  console.error(JSON.stringify(report, null, 2))

  const out = arg('--out')
  if (out) {
    const dir = join(out, seed.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.ts'), emitSeedModule(seed), 'utf8')
    console.error(`\nSeed gravado em ${join(dir, 'index.ts')}`)
  } else {
    console.log(emitSeedModule(seed))
  }
}

main()
