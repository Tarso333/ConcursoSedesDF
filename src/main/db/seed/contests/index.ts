// Registro de concursos da plataforma. Para adicionar um concurso novo
// (ex.: ABGF, DATAPREV): criar o arquivo de dados e registrá-lo aqui —
// nenhuma funcionalidade precisa mudar.
import type { ContestSeed } from './types'
import { SEDES_CONTEST } from './sedes'

export type { ContestSeed } from './types'

export const SEED_CONTESTS: ContestSeed[] = [SEDES_CONTEST]
