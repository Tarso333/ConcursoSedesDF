import { BarChart3, CalendarRange, Rocket, Sparkles, Target } from 'lucide-react'
import { ComingSoon } from '../components/common/ComingSoon'

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
