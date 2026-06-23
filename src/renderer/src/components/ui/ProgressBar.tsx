import { cn } from '../../lib/cn'

interface ProgressBarProps {
  value: number // 0..100
  className?: string
  color?: string
}

export function ProgressBar({ value, className, color }: ProgressBarProps): JSX.Element {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${clamped}%`, backgroundColor: color ?? 'hsl(var(--primary))' }}
      />
    </div>
  )
}
