// IBGE 2026 — quarto concurso da plataforma (apenas DADOS; engines M14..M18
// intactas). Cargo: Agente Censitário Supervisor (ACS).
//
// FONTE: Edital nº 01/2026 (RETIFICADO) — Processo Seletivo Simplificado do
// IBGE para o 12º Censo Agropecuário, Florestal e Aquícola. Banca: IBFC.
// Contratação TEMPORÁRIA (Lei nº 8.745/1993). PDF oficial analisado
// integralmente (extração via pdftotext/ToUnicode; Anexo IV do ACS literal).
//
// FATOS DO EDITAL:
// - Remuneração: R$ 3.858,00; jornada 40h semanais (8h/dia); exige CNH.
// - 2.692 vagas para ACS; prova objetiva de 60 questões (5 alternativas),
//   peso 1 cada, janela de aplicação 28–30/09/2026, duração 4h (item 11/12).
// - Estrutura do ACS (item 11.1): Língua Portuguesa 15 · Raciocínio Lógico
//   Quantitativo 10 · Noções de Administração/Situações Gerenciais 20 ·
//   Conhecimentos Técnicos 15 (= 60).
// - Aprovação (item 11.2): mínimo 18,00 pts no TOTAL e mínimo 1,00 pt em CADA
//   disciplina (não zerar disciplina).
//
// DECISÕES DOCUMENTADAS (ambiguidades → modelagem):
// 1. SPLIT Adm × Conhec. Técnicos: a tabela de pontos do edital (extração com
//    layout) interleava ACR e ACS. Pela ordem das funções (ACS é a última),
//    atribuiu-se ao ACS Adm 20 + CT 15 (a outra leitura, 15/20, é do ACR). Os
//    tópicos das duas disciplinas são idênticos entre ACR/ACS no Anexo IV; a
//    escolha afeta só o peso (examQuestionEstimate), documentado aqui.
// 2. CORTES: a regra real é ≥18 pts no total (30%) E ≥1 pt por disciplina.
//    Não é um corte por BLOCO → minScorePct = 0 nos blocos; a regra fica
//    registrada em `benefits`. approvalTargetPct = 50: alvo prudente acima do
//    piso de eliminação (é também classificatório, com forte concorrência).
// 3. CIDADE: é processo NACIONAL (vagas em diversos municípios/UF, Anexo I) →
//    city = 'Nacional (diversos municípios)'.
// 4. CONHECIMENTOS TÉCNICOS: o Anexo IV remete a uma APOSTILA EXTERNA do 12º
//    Censo (link no edital). O conteúdo desta disciplina foi construído a
//    partir das ATRIBUIÇÕES do ACS descritas no próprio edital (supervisão de
//    campo, DMC, sigilo estatístico), documentado como tal — a apostila
//    detalhada não integra o texto do edital.
// 5. examDate = 2026-09-28 (início da janela 28–30/09/2026 do item 19 do
//    cronograma).
// 6. SINERGIA (M16/M18): slugs 'lingua-portuguesa' e 'raciocinio-logico' são
//    os MESMOS de SEDES/ABGF/DATAPREV — o fator multiConcurso ativa sozinho.
import type { ContestSeed } from '../types'
import { IBGE_CURRICULUM } from './curriculum'
import { IBGE_STARTER_DECKS } from './decks'
import { IBGE_KNOWLEDGE } from './knowledge'
import { IBGE_QUESTIONS } from './questions'
import { IBGE_RELATIONS } from './relations'
import {
  IBGE_RLQ_KNOWLEDGE,
  IBGE_SHARED_DECKS,
  IBGE_SHARED_KNOWLEDGE,
  IBGE_SHARED_QUESTIONS
} from './shared'
import { ACS_GAP_DECKS, ACS_GAP_KNOWLEDGE, ACS_GAP_QUESTIONS, ACS_GAP_RELATIONS } from './acsGap'

// Reexporta o contest do ACA (segundo cargo do IBGE) para o registro.
export { IBGE_ACA_CONTEST } from './aca'

export const IBGE_CONTEST: ContestSeed = {
  slug: 'ibge-2026',
  name: 'IBGE 2026 — Censo Agropecuário',
  role: 'Agente Censitário Supervisor (ACS)',
  board: 'IBFC',
  examDate: '2026-09-28',
  city: 'Nacional (diversos municípios)',
  salary: 'R$ 3.858,00',
  benefits:
    'Contratação temporária (Lei nº 8.745/1993); Edital nº 01/2026 (IBFC); jornada 40h semanais (8h/dia); exige CNH; 2.692 vagas para ACS; 12º Censo Agropecuário, Florestal e Aquícola; prova objetiva 60 questões (peso 1, janela 28–30/09/2026, 4h); aprovação: mínimo 18 pts no total e ao menos 1 ponto em cada disciplina',
  examConfig: {
    durationMin: 240,
    blocks: [
      { block: 'GERAL', label: 'Conhecimentos Gerais', questions: 25, weightPerQuestion: 1, minScorePct: 0 },
      { block: 'ESPECIFICO', label: 'Conhecimentos Específicos', questions: 35, weightPerQuestion: 1, minScorePct: 0 }
    ],
    approvalTargetPct: 50
  },
  disciplines: IBGE_CURRICULUM,
  questions: [...IBGE_QUESTIONS, ...IBGE_SHARED_QUESTIONS, ...ACS_GAP_QUESTIONS],
  knowledge: [...IBGE_KNOWLEDGE, ...IBGE_SHARED_KNOWLEDGE, ...IBGE_RLQ_KNOWLEDGE, ...ACS_GAP_KNOWLEDGE],
  relations: [...IBGE_RELATIONS, ...ACS_GAP_RELATIONS],
  starterDecks: [...IBGE_STARTER_DECKS, ...IBGE_SHARED_DECKS, ...ACS_GAP_DECKS]
}
