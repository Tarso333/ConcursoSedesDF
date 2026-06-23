import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, icon, actions }: PageHeaderProps): JSX.Element {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
            {icon}
          </span>
        ) : null}
        <div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {actions}
    </div>
  )
}
