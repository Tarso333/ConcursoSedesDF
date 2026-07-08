import { create } from 'zustand'
import type { Contest, Settings, ThemeMode } from '@shared/domain'
import { api } from '../lib/api'

interface AppState {
  settings: Settings | null
  contests: Contest[]
  activeContest: Contest | null
  ready: boolean
  init: () => Promise<void>
  refreshSettings: () => Promise<void>
  refreshContests: () => Promise<void>
  setActiveContest: (id: number) => Promise<void>
  setTheme: (theme: ThemeMode) => Promise<void>
}

function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export const useAppStore = create<AppState>((set) => ({
  settings: null,
  contests: [],
  activeContest: null,
  ready: false,
  init: async () => {
    const [settings, contests, activeContest] = await Promise.all([
      api.getSettings(),
      api.listContests(),
      api.getActiveContest()
    ])
    applyTheme(settings.theme)
    set({ settings, contests, activeContest, ready: true })
  },
  refreshSettings: async () => {
    const settings = await api.getSettings()
    applyTheme(settings.theme)
    set({ settings })
  },
  refreshContests: async () => {
    const [contests, activeContest] = await Promise.all([api.listContests(), api.getActiveContest()])
    set({ contests, activeContest })
  },
  setActiveContest: async (id) => {
    const activeContest = await api.setActiveContest(id)
    set({ activeContest })
  },
  setTheme: async (theme) => {
    applyTheme(theme)
    const settings = await api.updateSettings({ theme })
    set({ settings })
  }
}))

export const useThemeMode = (): ThemeMode => useAppStore((s) => s.settings?.theme ?? 'dark')
