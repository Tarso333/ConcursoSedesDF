// SEDES DF 2026 — primeiro concurso cadastrado na plataforma.
// Um concurso é 100% dados: metadados + estrutura da prova (examConfig) +
// disciplinas/tópicos + banco de questões. Nenhuma funcionalidade conhece
// este arquivo; ela conhece apenas o formato ContestSeed.
import type { ContestSeed } from './types'
import { CURRICULUM } from '../curriculum'
import { SEED_QUESTIONS } from '../questions'
import { SEED_QUESTIONS_BANK } from '../questionsBank'
import { SEED_QUESTIONS_BANK_2 } from '../questionsBank2'
import { SEDES_KNOWLEDGE } from './sedesKnowledge'
import { SEDES_RELATIONS } from './sedesRelations'
import {
  SEDES_PACK_DECKS,
  SEDES_PACK_KNOWLEDGE,
  SEDES_PACK_QUESTIONS,
  SEDES_PACK_RELATIONS
} from './sedesPack'

export const SEDES_CONTEST: ContestSeed = {
  slug: 'sedes-df-2026',
  name: 'SEDES DF 2026',
  role: 'Técnico em Desenvolvimento e Assistência Social — Técnico Administrativo',
  board: 'Instituto Quadrix',
  examDate: '2026-09-06',
  city: 'Brasília/DF',
  salary: 'R$ 4.320,16',
  benefits: null,
  examConfig: {
    durationMin: 180,
    blocks: [
      { block: 'GERAL', label: 'Conhecimentos Gerais', questions: 20, weightPerQuestion: 1, minScorePct: 50 },
      { block: 'ESPECIFICO', label: 'Conhecimentos Específicos', questions: 40, weightPerQuestion: 2, minScorePct: 50 }
    ],
    approvalTargetPct: 68
  },
  disciplines: CURRICULUM,
  questions: [...SEED_QUESTIONS, ...SEED_QUESTIONS_BANK, ...SEED_QUESTIONS_BANK_2, ...SEDES_PACK_QUESTIONS],
  knowledge: [...SEDES_KNOWLEDGE, ...SEDES_PACK_KNOWLEDGE],
  relations: [...SEDES_RELATIONS, ...SEDES_PACK_RELATIONS],
  starterDecks: SEDES_PACK_DECKS
}
