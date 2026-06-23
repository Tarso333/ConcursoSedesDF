import { CalendarClock, GraduationCap, Moon, Sun } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { daysUntil } from '../../lib/exam'
import { fmtDatePtBR } from '../../lib/format'
import { useAppStore } from '../../stores/useAppStore'
import { NAV_GROUPS } from './nav'

export function Sidebar(): JSX.Element {
  const settings = useAppStore((s) => s.settings)
  const setTheme = useAppStore((s) => s.setTheme)
  const theme = settings?.theme ?? 'dark'
  const examDate = settings?.examDate ?? '2026-09-06'
  const days = daysUntil(examDate)

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-surface">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <GraduationCap size={22} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight">APROVA</p>
          <p className="text-xs font-medium text-muted-foreground">SEDES DF 2026</p>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.title ? (
              <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.title}
              </p>
            ) : null}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/12 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t p-3">
        <div className="rounded-lg bg-primary/10 px-3 py-2.5">
          <div className="flex items-center gap-2 text-primary">
            <CalendarClock size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">Contagem regressiva</span>
          </div>
          <p className="mt-1 text-2xl font-bold leading-none">
            {days}
            <span className="ml-1 text-sm font-medium text-muted-foreground">dias</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Prova: {fmtDatePtBR(examDate)}</p>
        </div>

        <button
          type="button"
          onClick={() => void setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        </button>
      </div>
    </aside>
  )
}
