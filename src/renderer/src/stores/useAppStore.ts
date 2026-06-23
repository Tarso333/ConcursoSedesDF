import { create } from 'zustand'
import type { Settings, ThemeMode } from '@shared/domain'
import { api } from '../lib/api'

interface AppState {
  settings: Settings | null
  ready: boolean
  init: () => Promise<void>
  refreshSettings: () => Promise<void>
  setTheme: (theme: ThemeMode) => Promise<void>
}

function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export const useAppStore = create<AppState>((set) => ({
  settings: null,
  ready: false,
  init: async () => {
    const settings = await api.getSettings()
    applyTheme(settings.theme)
    set({ settings, ready: true })
  },
  refreshSettings: async () => {
    const settings = await api.getSettings()
    applyTheme(settings.theme)
    set({ settings })
  },
  setTheme: async (theme) => {
    applyTheme(theme)
    const settings = await api.updateSettings({ theme })
    set({ settings })
  }
}))

export const useThemeMode = (): ThemeMode => useAppStore((s) => s.settings?.theme ?? 'dark')
