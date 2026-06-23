import type { ReactNode } from 'react'

export function Loading({ label = 'Carregando…' }: { label?: string }): JSX.Element {
  return (
    <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
      {label}
    </div>
  )
}

export function ErrorState({ message }: { message: string }): JSX.Element {
  return (
    <div className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
      Erro ao carregar: {message}
    </div>
  )
}

export function EmptyState({ icon, children }: { icon?: ReactNode; children: ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-sm text-muted-foreground">
      {icon ? <span className="text-muted-foreground/70">{icon}</span> : null}
      {children}
    </div>
  )
}
