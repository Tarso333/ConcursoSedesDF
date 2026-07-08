import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarRange,
  ClipboardCheck,
  LayoutDashboard,
  Layers,
  Library,
  type LucideIcon,
  Rocket,
  RotateCcw,
  Settings,
  Sparkles,
  Target
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export interface NavGroup {
  title?: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  { items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    title: 'Estudo',
    items: [
      { to: '/conteudo', label: 'Conteúdo', icon: Library },
      { to: '/questoes', label: 'Banco de Questões', icon: BookOpen },
      { to: '/simulados', label: 'Simulados', icon: ClipboardCheck },
      { to: '/flashcards', label: 'Flashcards', icon: Layers },
      { to: '/revisao', label: 'Revisão Espaçada', icon: RotateCcw },
      { to: '/erros', label: 'Caderno de Erros', icon: AlertTriangle }
    ]
  },
  {
    title: 'Estratégia',
    items: [
      { to: '/estatisticas', label: 'Estatísticas', icon: BarChart3 },
      { to: '/planejamento', label: 'Planejamento', icon: CalendarRange },
      { to: '/metas', label: 'Metas & Conquistas', icon: Target },
      { to: '/aprovacao', label: 'Modo Aprovação', icon: Rocket }
    ]
  },
  {
    title: 'Apoio',
    items: [
      { to: '/tutor', label: 'Tutor IA', icon: Sparkles },
      { to: '/config', label: 'Configurações', icon: Settings }
    ]
  }
]
