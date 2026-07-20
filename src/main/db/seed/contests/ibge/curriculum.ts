// Currículo do IBGE 2026 — Agente Censitário Supervisor (ACS).
// FONTE: Edital nº 01/2026 (RETIFICADO) — Processo Seletivo Simplificado do
// Censo Agropecuário, Florestal e Aquícola. Banca IBFC. Anexo IV (Conteúdos
// Programáticos do ACS) transcrito literalmente. Tópicos numerados fiéis ao
// edital; subtópicos criados quando o próprio edital enumera unidades.
//
// examQuestionEstimate = contagem REAL de questões por disciplina do edital
// (item 11.1): LP 15 · RLQ 10 · Adm/Situações Gerenciais 20 · Conhec. Téc. 15.
// Slugs 'lingua-portuguesa' e 'raciocinio-logico' são compartilhados com
// SEDES/ABGF/DATAPREV → o fator multiConcurso (M16) ativa sozinho.
import type { SeedDiscipline } from '../../curriculum'

export const IBGE_CURRICULUM: SeedDiscipline[] = [
  // ───────── Conhecimentos Gerais ─────────
  {
    slug: 'lingua-portuguesa',
    name: 'Língua Portuguesa',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 15,
    color: '#3b82f6',
    topics: [
      'Compreensão e interpretação de texto',
      {
        name: 'Significação das palavras',
        children: ['Sinônimos e antônimos', 'Homônimos e parônimos']
      },
      'Pontuação; estrutura e sequência lógica de frases e parágrafos',
      'Ortografia oficial; acentuação gráfica',
      'Classes das palavras',
      'Concordância nominal e verbal',
      'Regência nominal e verbal',
      'Emprego dos verbos regulares, irregulares e anômalos; vozes dos verbos',
      'Emprego dos pronomes',
      'Sintaxe: termos essenciais, integrantes e acessórios da oração',
      {
        name: 'Coesão e coerência',
        children: ['Referenciação, substituição e repetição', 'Conectores', 'Tempos e modos verbais']
      },
      'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)'
    ]
  },
  {
    slug: 'raciocinio-logico',
    name: 'Raciocínio Lógico Quantitativo',
    block: 'GERAL',
    weight: 1,
    examQuestionEstimate: 10,
    color: '#f59e0b',
    topics: [
      'Estrutura lógica de relações entre pessoas, lugares, coisas e/ou eventos; dedução de novas informações; avaliação de condições',
      {
        name: 'Áreas avaliadas',
        children: [
          'Estruturas lógicas',
          'Lógica de argumentação',
          'Diagramas lógicos',
          'Aritmética',
          'Álgebra e geometria básicas'
        ]
      }
    ]
  },
  // ───────── Conhecimentos Específicos ─────────
  {
    slug: 'administracao-situacoes-gerenciais',
    name: 'Noções de Administração/Situações Gerenciais',
    block: 'ESPECIFICO',
    weight: 1,
    examQuestionEstimate: 20,
    color: '#10b981',
    topics: [
      'Aspectos gerais da Administração; organizações como sistemas abertos',
      {
        name: 'Funções administrativas',
        children: ['Planejamento', 'Organização', 'Direção', 'Controle']
      },
      'Motivação, comunicação e liderança',
      'Processo decisório e resolução de problemas',
      'Noções básicas de gerência e gestão de organizações e de pessoas',
      'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho',
      'Responsabilidade, coordenação, autoridade, poder e delegação',
      'Avaliação de desempenho',
      'Compromisso com a qualidade nos serviços prestados'
    ]
  },
  {
    slug: 'conhecimentos-tecnicos-censo',
    name: 'Conhecimentos Técnicos',
    block: 'ESPECIFICO',
    weight: 1,
    examQuestionEstimate: 15,
    color: '#84cc16',
    topics: [
      'Conhecimentos técnicos do 12º Censo Agropecuário, Florestal e Aquícola (apostila oficial)',
      'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências',
      'Mediação com informantes e articulação institucional local',
      'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta'
    ]
  }
]
