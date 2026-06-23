import { Hammer } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card } from '../ui/Card'
import { PageHeader } from './PageHeader'

interface ComingSoonProps {
  title: string
  subtitle: string
  icon: ReactNode
  milestone: string
  features: string[]
}

export function ComingSoon({ title, subtitle, icon, milestone, features }: ComingSoonProps): JSX.Element {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} icon={icon} />
      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-warning">
          <Hammer size={16} />
          Em construção — previsto para o milestone {milestone}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Esta área já está planejada na arquitetura do app. O que vem aqui:
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 rounded-lg border bg-background/40 px-3 py-2 text-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {f}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
