// ABGF 2026 — segundo concurso cadastrado na plataforma (apenas DADOS;
// nenhuma engine foi alterada — M14..M18 consomem este cadastro).
//
// FONTE: Edital nº 01/2026 de Abertura de Inscrições — FCC (PDF oficial,
// Anexo IV analisado integralmente). Prova prevista: 27/09/2026 (cronograma
// divulgado pela banca/imprensa especializada).
//
// DECISÕES DOCUMENTADAS (ambiguidades do edital → modelagem):
// 1. CARGO: o edital agrupa em E05 quatro especialidades de Analista (TI)
//    (Análise de Dados; Análise e Segurança de Dados; Front-End/Back-End/
//    DevOps; Infraestrutura e Redes) com o MESMO conteúdo programático e a
//    MESMA prova — um único cadastro cobre todas (Cargo é atributo do
//    agregado Contest, ADR-011).
// 2. HABILITAÇÃO: a FCC usa NOTAS PADRONIZADAS (habilitado com somatório
//    CG+CE ≥ 200; eliminado quem zerar qualquer disciplina). Padronização
//    estatística não é replicável offline → aproximação: corte de 50% por
//    bloco (proxy do desempenho historicamente necessário) e alvo de
//    aprovação de 65% da pontuação bruta (140 pts = 20×1 + 40×3).
// 3. PROVA DISCURSIVA (redação, 1 item, peso 1): fora do simulado objetivo
//    (exam_config modela a prova objetiva); registrada em `benefits` como
//    informação do certame.
// 4. INCIDÊNCIA POR DISCIPLINA: o edital fixa itens por PROVA (CG 20 ·
//    CE 40), não por disciplina — examQuestionEstimate é estimativa
//    fundamentada (somas conferem 20 e 40), consumida pelo Strategy Engine.
// 5. JORNADA/BENEFÍCIOS: o corpo do edital remete ao PCCS da ABGF (emprego
//    público celetista); registrado sem inventar valores.
// 6. SINERGIA (M16/M18): slugs 'lingua-portuguesa' e 'direito-const-adm'
//    são deliberadamente os MESMOS do SEDES — o fator multiConcurso ativa
//    sozinho para disciplinas compartilhadas.
import type { ContestSeed } from '../types'
import { ABGF_CURRICULUM } from './curriculum'
import { ABGF_STARTER_DECKS } from './decks'
import { ABGF_KNOWLEDGE } from './knowledge'
import { ABGF_QUESTIONS } from './questions'
import { ABGF_RELATIONS } from './relations'
import {
  ABGF_PACK_DECKS,
  ABGF_PACK_KNOWLEDGE,
  ABGF_PACK_QUESTIONS,
  ABGF_PACK_RELATIONS
} from './pack'
import {
  ABGF_ES_DECKS,
  ABGF_ES_KNOWLEDGE,
  ABGF_ES_QUESTIONS,
  ABGF_ES_RELATIONS
} from './engSoftwarePack'
import { ABGF_BANK_ESPECIFICAS } from './bankEspecificas'
import { ABGF_BANK_ESPECIFICAS2 } from './bankEspecificas2'
import { ABGF_BANK_ESPECIFICAS3 } from './bankEspecificas3'
import { ABGF_BANK_GERAIS } from './bankGerais'
import { ABGF_BANK_GERAIS2 } from './bankGerais2'
import { ABGF_BANK_GERAIS3 } from './bankGerais3'
import { ABGF_BANK_KNOWLEDGE } from './bankKnowledge'
import { ABGF_BANK_DECKS } from './bankFlashcards'

export const ABGF_CONTEST: ContestSeed = {
  slug: 'abgf-2026',
  name: 'ABGF 2026',
  role: 'Analista (TI) — E05: Análise de Dados · Análise e Segurança de Dados · Front-End/Back-End/DevOps · Infraestrutura e Redes',
  board: 'Fundação Carlos Chagas (FCC)',
  examDate: '2026-09-27',
  city: 'Brasília/DF',
  salary: 'R$ 8.000,00',
  benefits:
    'Emprego público celetista (PCCS da ABGF); Edital nº 01/2026; inscrição R$ 145,00; prova objetiva (CG 20×1 + CE 40×3, 4h30) + discursiva-redação (1 item, peso 1); habilitação: soma padronizada ≥ 200 e nenhuma disciplina zerada',
  examConfig: {
    durationMin: 270,
    blocks: [
      { block: 'GERAL', label: 'Conhecimentos Gerais', questions: 20, weightPerQuestion: 1, minScorePct: 50 },
      { block: 'ESPECIFICO', label: 'Conhecimentos Específicos', questions: 40, weightPerQuestion: 3, minScorePct: 50 }
    ],
    approvalTargetPct: 65
  },
  disciplines: ABGF_CURRICULUM,
  questions: [
    ...ABGF_QUESTIONS,
    ...ABGF_PACK_QUESTIONS,
    ...ABGF_ES_QUESTIONS,
    ...ABGF_BANK_ESPECIFICAS,
    ...ABGF_BANK_ESPECIFICAS2,
    ...ABGF_BANK_ESPECIFICAS3,
    ...ABGF_BANK_GERAIS,
    ...ABGF_BANK_GERAIS2,
    ...ABGF_BANK_GERAIS3
  ],
  knowledge: [...ABGF_KNOWLEDGE, ...ABGF_PACK_KNOWLEDGE, ...ABGF_ES_KNOWLEDGE, ...ABGF_BANK_KNOWLEDGE],
  relations: [...ABGF_RELATIONS, ...ABGF_PACK_RELATIONS, ...ABGF_ES_RELATIONS],
  starterDecks: [...ABGF_STARTER_DECKS, ...ABGF_PACK_DECKS, ...ABGF_ES_DECKS, ...ABGF_BANK_DECKS]
}
