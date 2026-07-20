// Grafo de aprendizagem do IBGE 2026 (ACS) — relações reais entre tópicos
// (M18). Nenhuma relação inventada; cada aresta tem justificativa técnica.
import type { SeedRelation } from '../types'

const t = (disciplineSlug: string, topic: string): { disciplineSlug: string; topic: string } => ({
  disciplineSlug,
  topic
})

const ADM = 'administracao-situacoes-gerenciais'
const CT = 'conhecimentos-tecnicos-censo'
const LP = 'lingua-portuguesa'

export const IBGE_RELATIONS: SeedRelation[] = [
  {
    from: t(ADM, 'Aspectos gerais da Administração; organizações como sistemas abertos'),
    to: t(ADM, 'Funções administrativas'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'A visão sistêmica da organização fundamenta o processo administrativo (PODC).'
  },
  {
    from: t(ADM, 'Funções administrativas'),
    to: t(ADM, 'Processo decisório e resolução de problemas'),
    kind: 'CONTINUIDADE',
    strength: 0.6,
    note: 'Planejar e dirigir pressupõem decidir; o processo decisório permeia as funções.'
  },
  {
    from: t(ADM, 'Motivação, comunicação e liderança'),
    to: t(ADM, 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho'),
    kind: 'COMPLEMENTA',
    strength: 0.6,
    note: 'Liderança e motivação são o que fazem grupos virarem equipes de alto desempenho.'
  },
  {
    from: t(ADM, 'Responsabilidade, coordenação, autoridade, poder e delegação'),
    to: t(ADM, 'Funções administrativas'),
    kind: 'DEPENDE_DE',
    strength: 0.5,
    note: 'Autoridade e delegação concretizam a função de organização/direção.'
  },
  {
    from: t(ADM, 'Avaliação de desempenho'),
    to: t(ADM, 'Compromisso com a qualidade nos serviços prestados'),
    kind: 'RELACIONADO',
    strength: 0.5,
    note: 'Avaliar desempenho e buscar qualidade (PDCA) integram a melhoria contínua.'
  },
  {
    from: t(ADM, 'Eficiência e funcionamento de grupos; papéis e interações; trabalho em equipe; equipes de trabalho'),
    to: t(CT, 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências'),
    kind: 'PRE_REQUISITO',
    strength: 0.75,
    note: 'A teoria de equipes e liderança se aplica diretamente à supervisão das equipes de campo do Censo.'
  },
  {
    from: t(CT, 'Supervisão de equipes de campo: roteirização, produtividade, cobertura e pendências'),
    to: t(CT, 'Uso de dispositivos móveis (DMC) e transmissão de dados de coleta'),
    kind: 'CONTINUIDADE',
    strength: 0.6,
    note: 'Monitorar cobertura/pendências depende do acompanhamento das transmissões dos DMC.'
  },
  {
    from: t(LP, 'Redação e reescrita de comunicados, ofícios e registros operacionais (clareza, objetividade, padrão formal)'),
    to: t(ADM, 'Motivação, comunicação e liderança'),
    kind: 'RELACIONADO',
    strength: 0.4,
    note: 'A comunicação administrativa formal (ofícios/registros) é ferramenta da liderança do supervisor.'
  }
]
