// Registro de concursos da plataforma. Para adicionar um concurso novo:
// criar o arquivo de dados e registrá-lo aqui — nenhuma funcionalidade
// precisa mudar.
import type { ContestSeed } from './types'
import { ABGF_CONTEST } from './abgf'
import { DATAPREV_CONTEST } from './dataprev'
import { IBGE_CONTEST, IBGE_ACA_CONTEST } from './ibge'
import { SEDES_CONTEST } from './sedes'

export type { ContestSeed } from './types'

export const SEED_CONTESTS: ContestSeed[] = [
  SEDES_CONTEST,
  ABGF_CONTEST,
  DATAPREV_CONTEST,
  IBGE_CONTEST,
  IBGE_ACA_CONTEST
]
