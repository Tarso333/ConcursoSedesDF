import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: ReactNode
  sub?: ReactNode
  icon?: ReactNode
  accent?: string
}

export function StatCard({ label, value, sub, icon, accent }: StatCardProps): JSX.Element {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        {icon ? (
          <span
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{
              backgroundColor: `${accent ?? 'hsl(var(--primary))'}1f`,
              color: accent ?? 'hsl(var(--primary))'
            }}
          >
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-bold leading-none">{value}</p>
      {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
    </Card>
  )
}
