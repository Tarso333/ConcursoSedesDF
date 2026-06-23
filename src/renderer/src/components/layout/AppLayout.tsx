import { GraduationCap } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppStore } from '../../stores/useAppStore'
import { Sidebar } from './Sidebar'

function Splash(): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <GraduationCap size={28} />
      </div>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
    </div>
  )
}

export function AppLayout(): JSX.Element {
  const ready = useAppStore((s) => s.ready)
  const init = useAppStore((s) => s.init)

  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <Splash />

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl animate-fade-in px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
