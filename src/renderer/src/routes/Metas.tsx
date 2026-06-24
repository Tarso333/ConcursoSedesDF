import {
  Activity,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Flame,
  Footprints,
  Layers,
  Lock,
  type LucideIcon,
  Target,
  Trophy
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { Loading } from '../components/ui/Feedback'
import { ProgressBar } from '../components/ui/ProgressBar'
import { fmtNum } from '../lib/format'
import { api } from '../lib/api'
import { cn } from '../lib/cn'
import { useAsync } from '../lib/useAsync'

const ICONS: Record<string, LucideIcon> = {
  Footprints,
  Activity,
  Flame,
  ClipboardCheck,
  Target,
  CalendarCheck,
  Trophy,
  Brain,
  Layers
}

export function Metas(): JSX.Element {
  const g = useAsync(() => api.getGamification(), [])

  if (g.loading || !g.data) return <Loading />
  const d = g.data
  const dailyPct = d.dailyGoalQuestions > 0 ? Math.min(100, (d.answeredToday / d.dailyGoalQuestions) * 100) : 0
  const unlockedCount = d.achievements.filter((a) => a.unlocked).length

  return (
    <div>
      <PageHeader
        title="Metas & Conquistas"
        subtitle="Constância vira hábito — e aprovação"
        icon={<Trophy size={20} />}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
              {d.level}
            </div>
            <div>
              <p className="stat-label">Nível</p>
              <p className="text-sm text-muted-foreground">{fmtNum(d.xp)} XP no total</p>
            </div>
          </div>
          <ProgressBar value={(d.xpIntoLevel / d.xpForNextLevel) * 100} className="mt-4" />
          <p className="mt-1.5 text-xs text-muted-foreground">
            {d.xpIntoLevel}/{d.xpForNextLevel} XP para o nível {d.level + 1}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 text-warning">
            <Flame size={20} />
            <span className="text-3xl font-extrabold">{d.streakDays}</span>
          </div>
          <p className="mt-1 text-sm font-medium">dias seguidos estudando</p>
          <p className="text-xs text-muted-foreground">Recorde: {d.longestStreak} dias</p>
        </Card>

        <Card className="p-5">
          <p className="stat-label">Meta de hoje</p>
          <p className="mt-1 text-2xl font-bold">
            {d.answeredToday}
            <span className="text-base font-medium text-muted-foreground">/{d.dailyGoalQuestions} questões</span>
          </p>
          <ProgressBar
            value={dailyPct}
            className="mt-3"
            color={dailyPct >= 100 ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            {dailyPct >= 100 ? 'Meta batida hoje! 🎉' : 'Continue resolvendo questões'}
          </p>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Conquistas</h2>
          <span className="text-xs text-muted-foreground">
            {unlockedCount}/{d.achievements.length} desbloqueadas
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {d.achievements.map((a) => {
            const Icon = ICONS[a.icon] ?? Trophy
            return (
              <Card
                key={a.code}
                className={cn('flex items-center gap-3 p-4', !a.unlocked && 'opacity-55')}
              >
                <div
                  className={cn(
                    'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                    a.unlocked ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {a.unlocked ? <Icon size={22} /> : <Lock size={18} />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
