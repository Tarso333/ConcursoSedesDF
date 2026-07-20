// DATAPREV 2026 — terceiro concurso cadastrado na plataforma (apenas DADOS;
// nenhuma engine foi alterada — M14..M18 consomem este cadastro).
//
// FONTE: Edital nº 001/2026 — Concurso Público DATAPREV, banca FGV (PDF
// oficial analisado integralmente). Cargo: Analista de Tecnologia da
// Informação — PERFIL 2: Arquitetura, Engenharia e Sustentação Tecnológica
// (30 vagas imediatas + 183 CR). Prova objetiva: 11/10/2026, das 13h às 17h.
// Estrutura real: 70 questões ME (5 alternativas) — Módulo I (CG) 40×1,0
// (Língua Portuguesa 12, Língua Inglesa 12, Raciocínio Lógico Matemático 5,
// Atualidades e IA 6, Legislação de SI e Proteção de Dados 5) + Módulo II
// (CE) 30×2,5 = 115 pontos. Aprovação (subitem 9.17): mínimo de 57,5 pontos
// E não zerar nenhuma disciplina.
//
// DECISÕES DOCUMENTADAS (Fase 1 + ambiguidades do edital → modelagem):
// 1. FASE 1 = NÚCLEO TÉCNICO: cadastradas somente as 5 disciplinas de
//    Conhecimentos Específicos do Perfil 2 (Redes, Banco de Dados,
//    Arquitetura Tecnológica, Nuvem/Virtualização, Linguagens/Frameworks).
//    O Módulo I (CG) fica para a Fase 2. O exam_config mantém os DOIS
//    blocos reais da prova: o simulado OFICIAL monta com as questões
//    existentes (bloco sem questões contribui com zero itens, sem erro).
// 2. CORTES: o edital NÃO define mínimo por módulo — o corte é global
//    (57,5 pts = 50% de 115) + "não zerar disciplina" (regra por disciplina,
//    não modelável por bloco) → minScorePct = 0 nos blocos, corte global
//    documentado aqui. approvalTargetPct = 65: alvo PRUDENTE acima do corte
//    formal, dada a concorrência (mesmo racional do proxy da ABGF).
// 3. DURAÇÃO: o edital informa o horário da prova (13h às 17h) e não o
//    número de horas → durationMin = 240 (derivado do quadro de horários).
// 4. INCIDÊNCIA POR DISCIPLINA: a distribuição das 30 questões do Módulo II
//    por disciplina NÃO é pública → examQuestionEstimate é estimativa
//    fundamentada no tamanho das seções do programa (5+6+8+6+5 = 30).
// 5. Item 24 de Arquitetura Tecnológica traz DOIS assuntos distintos
//    ("Engenharia de desempenho...; DEVSECOPS") → dois tópicos separados
//    (instrução de não agrupar assuntos diferentes).
// 6. "17 35 GRASP" no PDF: o "35" é artefato de numeração de página da
//    extração → tópico GRASP (item 17).
// 7. Item 9 de Nuvem é uma enumeração de ferramentas (Docker, Harbor,
//    Kubernetes, VMware NSX/vCenter/vCloud Director/vRealize ×4) → tópico-
//    pai "Contêineres e virtualização..." com um SUBTÓPICO por ferramenta.
// 8. "Java e Javascript React.js" (texto corrido ambíguo no edital) → três
//    tópicos: Java, JavaScript e React.js.
// 9. Sub-item 7.1 de Banco de Dados (Oracle 19C, MySql, Postgresql, MongoDB,
//    MS-SQLSERVER 2019) → subtópicos de "SQL (ANSI)", como no edital.
// 10. SINERGIA (M16/M18): slugs 'banco-de-dados', 'engenharia-software' e
//    'nuvem-infraestrutura' são deliberadamente os MESMOS da ABGF — o fator
//    multiConcurso ativa sozinho para disciplinas compartilhadas.
// 11. GRAFO: a relação-exemplo "Linux → Containers" NÃO foi cadastrada —
//    Linux não consta do conteúdo programático do Perfil 2 (não inventar
//    relações). As demais cadeias-exemplo têm correspondência real e foram
//    cadastradas com justificativa (ver relations.ts).
import type { ContestSeed } from '../types'
import { DATAPREV_CURRICULUM } from './curriculum'
import { DATAPREV_STARTER_DECKS } from './decks'
import { DATAPREV_KNOWLEDGE } from './knowledge'
import { DATAPREV_QUESTIONS } from './questions'
import { DATAPREV_RELATIONS } from './relations'
import { DATAPREV_PACK_DECKS, DATAPREV_PACK_QUESTIONS, DATAPREV_PACK_RELATIONS } from './pack'
import {
  DATAPREV_ES_DECKS,
  DATAPREV_ES_KNOWLEDGE,
  DATAPREV_ES_QUESTIONS,
  DATAPREV_ES_RELATIONS
} from './engSoftwarePack'

export const DATAPREV_CONTEST: ContestSeed = {
  slug: 'dataprev-2026',
  name: 'DATAPREV 2026',
  role: 'Analista de Tecnologia da Informação — Perfil 2: Arquitetura, Engenharia e Sustentação Tecnológica',
  board: 'Fundação Getulio Vargas (FGV)',
  examDate: '2026-10-11',
  city: 'Brasília/DF',
  salary: 'R$ 8.273,94 a R$ 10.685,44',
  benefits:
    'Emprego público celetista; Edital nº 001/2026; inscrição R$ 110,00; Perfil 2: 30 vagas imediatas + 183 CR (Brasília, São Paulo, Florianópolis, Fortaleza, João Pessoa, Natal, Rio de Janeiro); prova objetiva 70 questões (CG 40×1,0 + CE 30×2,5 = 115 pts, 13h–17h); aprovação: mínimo 57,5 pts e nenhuma disciplina zerada',
  examConfig: {
    durationMin: 240,
    blocks: [
      { block: 'GERAL', label: 'Módulo I — Conhecimentos Gerais', questions: 40, weightPerQuestion: 1, minScorePct: 0 },
      { block: 'ESPECIFICO', label: 'Módulo II — Conhecimentos Específicos', questions: 30, weightPerQuestion: 2.5, minScorePct: 0 }
    ],
    approvalTargetPct: 65
  },
  disciplines: DATAPREV_CURRICULUM,
  questions: [...DATAPREV_QUESTIONS, ...DATAPREV_PACK_QUESTIONS, ...DATAPREV_ES_QUESTIONS],
  knowledge: [...DATAPREV_KNOWLEDGE, ...DATAPREV_ES_KNOWLEDGE],
  relations: [...DATAPREV_RELATIONS, ...DATAPREV_PACK_RELATIONS, ...DATAPREV_ES_RELATIONS],
  starterDecks: [...DATAPREV_STARTER_DECKS, ...DATAPREV_PACK_DECKS, ...DATAPREV_ES_DECKS]
}
