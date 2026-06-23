import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarRange,
  ClipboardCheck,
  Layers,
  Rocket,
  RotateCcw,
  Sparkles,
  Target
} from 'lucide-react'
import { ComingSoon } from '../components/common/ComingSoon'

export function Questoes(): JSX.Element {
  return (
    <ComingSoon
      title="Banco de Questões"
      subtitle="Resolva com filtros avançados, no estilo QConcursos"
      icon={<BookOpen size={20} />}
      milestone="M3"
      features={[
        'Filtros por disciplina, assunto, dificuldade e status',
        'Resolução com feedback imediato e comentário',
        'Favoritar e marcar questões',
        'Registro de tempo por questão',
        'Filtro de “somente erradas” e “favoritas”',
        'Erros alimentam o caderno automaticamente'
      ]}
    />
  )
}

export function Simulados(): JSX.Element {
  return (
    <ComingSoon
      title="Simulados Inteligentes"
      subtitle="Treine no formato real da prova Quadrix"
      icon={<ClipboardCheck size={20} />}
      milestone="M7"
      features={[
        'Modo oficial: 60 questões, pesos 20/80, cronometrado',
        'Corte de eliminação (10 gerais / 40 específicos)',
        'Simulado por disciplina ou assunto',
        'Modo personalizado e modo livre',
        'Resultado detalhado por bloco e disciplina',
        'Histórico e evolução entre simulados'
      ]}
    />
  )
}

export function Flashcards(): JSX.Element {
  return (
    <ComingSoon
      title="Flashcards"
      subtitle="Memorização ativa, com foco em lei seca"
      icon={<Layers size={20} />}
      milestone="M5"
      features={[
        'Decks por disciplina e assunto',
        'Geração automática a partir das questões erradas',
        'Decks de lei seca (LOAS, PNAS, Maria da Penha, 14.133)',
        'Modo de estudo com virada de carta (flip)',
        'Integração com a revisão espaçada'
      ]}
    />
  )
}

export function Revisao(): JSX.Element {
  return (
    <ComingSoon
      title="Revisão Espaçada"
      subtitle="Algoritmo FSRS — o motor científico de retenção"
      icon={<RotateCcw size={20} />}
      milestone="M6"
      features={[
        'Fila diária calculada pelo FSRS',
        'Avaliação Errei / Difícil / Bom / Fácil',
        'Repete conteúdos críticos no momento certo',
        'Integra flashcards e caderno de erros',
        'Estatísticas de retenção de memória'
      ]}
    />
  )
}

export function CadernoErros(): JSX.Element {
  return (
    <ComingSoon
      title="Caderno de Erros"
      subtitle="Transforme erros em pontos ganhos"
      icon={<AlertTriangle size={20} />}
      milestone="M4"
      features={[
        'Registro automático de cada erro',
        'Classificação do tipo de erro',
        'Filtros por disciplina, assunto e período',
        'Revisar o caderno como um mini-quiz',
        'Marcar questões como compreendidas'
      ]}
    />
  )
}

export function Estatisticas(): JSX.Element {
  return (
    <ComingSoon
      title="Estatísticas Avançadas"
      subtitle="Onde você está e o que falta para a aprovação"
      icon={<BarChart3 size={20} />}
      milestone="M8"
      features={[
        'Radar de desempenho por disciplina',
        'Curva de aprendizado e evolução semanal/mensal',
        'Probabilidade de aprovação calibrada',
        'Tempo ideal de revisão por conteúdo',
        'Comparativo planejado × realizado'
      ]}
    />
  )
}

export function Planejamento(): JSX.Element {
  return (
    <ComingSoon
      title="Planejamento Automático"
      subtitle="Seu cronograma até 06/09/2026, montado sozinho"
      icon={<CalendarRange size={20} />}
      milestone="M10"
      features={[
        'Cronograma automático a partir do edital e dos pesos',
        'Prioriza disciplinas de maior incidência',
        'Sessões planejadas com metas de tempo',
        'Replanejamento automático quando você atrasa',
        'Visão diária, semanal e mensal'
      ]}
    />
  )
}

export function Metas(): JSX.Element {
  return (
    <ComingSoon
      title="Metas & Conquistas"
      subtitle="Constância vira hábito — e XP"
      icon={<Target size={20} />}
      milestone="M9"
      features={[
        'Metas diárias, semanais e mensais',
        'XP, níveis e barra de progresso',
        'Medalhas e conquistas desbloqueáveis',
        'Sequência de estudos (streak)',
        'Feedback motivacional'
      ]}
    />
  )
}

export function ModoAprovacao(): JSX.Element {
  return (
    <ComingSoon
      title="Modo Aprovação"
      subtitle="Plano agressivo focado no maior retorno estatístico"
      icon={<Rocket size={20} />}
      milestone="M11"
      features={[
        'Identifica suas fraquezas automaticamente',
        'Prioriza conteúdo por fraqueza × peso na prova',
        'Específicos primeiro, sem deixar gerais cair do corte',
        'Plano diário até a prova',
        'Ajuste contínuo conforme seu desempenho'
      ]}
    />
  )
}

export function TutorIA(): JSX.Element {
  return (
    <ComingSoon
      title="Tutor IA"
      subtitle="Seu professor particular, dentro do app"
      icon={<Sparkles size={20} />}
      milestone="M12"
      features={[
        'Chat de dúvidas sobre qualquer conteúdo',
        'Resumos e mapas mentais sob demanda',
        'Geração de flashcards automáticos',
        'Explicações alternativas para o que você erra',
        'Requer chave de provedor de IA (configurável)'
      ]}
    />
  )
}
