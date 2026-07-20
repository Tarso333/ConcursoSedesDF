// Decks iniciais de flashcards do IBGE 2026 (ACS) — entram na fila FSRS.
import type { SeedStarterDeck } from '../types'

export const IBGE_STARTER_DECKS: SeedStarterDeck[] = [
  {
    name: 'IBGE ACS — Administração & Gestão',
    disciplineSlug: 'administracao-situacoes-gerenciais',
    description: 'O bloco de maior peso do ACS (20 questões), no estilo IBFC.',
    cards: [
      {
        front: 'Funções administrativas (PODC)',
        back: 'Planejamento (objetivos), Organização (estrutura), Direção (pessoas), Controle (corrige desvios). O controle realimenta o ciclo.',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Funções administrativas' }
      },
      {
        front: 'Herzberg: higiênico × motivacional',
        back: 'Higiênicos (salário, condições, chefia) evitam insatisfação, não motivam. Motivacionais (reconhecimento, responsabilidade) geram satisfação.',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Motivação, comunicação e liderança' }
      },
      {
        front: 'Delega-se responsabilidade?',
        back: 'NÃO. Delega-se autoridade e execução; a responsabilidade final perante o superior permanece com quem delega.',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Responsabilidade, coordenação, autoridade, poder e delegação' }
      },
      {
        front: 'Eficiência × eficácia × efetividade',
        back: 'Eficiência = meios (fazer bem, poucos recursos). Eficácia = fins (atingir o objetivo). Efetividade = impacto duradouro.',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho' }
      },
      {
        front: 'Grupo × equipe',
        back: 'Grupo: metas individuais somadas. Equipe: meta comum, responsabilidade mútua, sinergia positiva (resultado > soma).',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho' }
      },
      {
        front: 'Efeito halo (avaliação)',
        back: 'Uma característica (boa/má) contamina o julgamento das demais. Diferente da tendência central (avaliar todos como médios).',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Avaliação de desempenho' }
      },
      {
        front: 'Racionalidade limitada (Simon)',
        back: 'Decide-se com informação/tempo limitados, buscando solução SATISFATÓRIA (satisficing), não a ótima.',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Processo decisório e resolução de problemas' }
      },
      {
        front: 'Ciclo PDCA',
        back: 'Plan (planejar) → Do (executar) → Check (verificar) → Act (agir/padronizar). Motor da melhoria contínua (Deming).',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Compromisso com a qualidade nos serviços prestados' }
      },
      {
        front: 'Autoridade × poder',
        back: 'Autoridade = direito formal do CARGO. Poder = capacidade real de influenciar (pode independer do cargo; bases de French & Raven).',
        topic: { disciplineSlug: 'administracao-situacoes-gerenciais', topic: 'Responsabilidade, coordenação, autoridade, poder e delegação' }
      }
    ]
  },
  {
    name: 'IBGE ACS — Português, RLQ e Censo',
    disciplineSlug: 'lingua-portuguesa',
    description: 'Pontos de alta incidência em Português, Raciocínio Lógico e Conhecimentos Técnicos.',
    cards: [
      {
        front: 'Haver × existir (concordância)',
        back: 'Haver (= existir) é impessoal → singular: "Houve problemas". Existir concorda: "Existiram problemas".',
        topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Concordância nominal e verbal' }
      },
      {
        front: '"A partir de" tem crase?',
        back: 'NUNCA. Mas "às 10h" (horas determinadas) tem crase. Antes de verbo/pronome/masculino não há crase.',
        topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Regência nominal e verbal' }
      },
      {
        front: 'Parônimos',
        back: 'Palavras parecidas na grafia/som, sentidos diferentes: ratificar (confirmar) × retificar (corrigir); tráfego × tráfico.',
        topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Significação das palavras' }
      },
      {
        front: 'Fechos do ofício',
        back: 'Respeitosamente = autoridade superior. Atenciosamente = mesma hierarquia ou inferior.',
        topic: { disciplineSlug: 'lingua-portuguesa', topic: 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)' }
      },
      {
        front: 'Negação de "Todo A é B"',
        back: '"Algum A NÃO é B" (basta um contraexemplo). NÃO é "Nenhum A é B".',
        topic: { disciplineSlug: 'raciocinio-logico', topic: 'Áreas avaliadas' }
      },
      {
        front: 'Equivalente de p → q',
        back: 'Contrapositiva ~q → ~p. Negação: p ∧ ~q. A condicional só é falsa quando V → F.',
        topic: { disciplineSlug: 'raciocinio-logico', topic: 'Áreas avaliadas' }
      },
      {
        front: 'Sigilo estatístico (IBGE)',
        back: 'Dados dos informantes são sigilosos e de uso exclusivamente estatístico; não podem ser divulgados de forma individualizada (Lei 5.534/1968).',
        topic: { disciplineSlug: 'conhecimentos-tecnicos-censo', topic: 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta' }
      },
      {
        front: 'Papel do ACS no Censo',
        back: 'Distribuir cargas, roteirizar equipes, monitorar produtividade/cobertura/pendências, mediar resistências e articular com autoridades locais.',
        topic: { disciplineSlug: 'conhecimentos-tecnicos-censo', topic: 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências' }
      }
    ]
  }
]
