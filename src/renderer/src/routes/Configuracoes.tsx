import { Check, Database, Download, Save, Settings as SettingsIcon, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { SettingsUpdateInput } from '@shared/ipc'
import { PageHeader } from '../components/common/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { api } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { useAppStore } from '../stores/useAppStore'

const inputCls =
  'w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring'

function Field({
  label,
  hint,
  children
}: {
  label: string
  hint?: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function Configuracoes(): JSX.Element {
  const settings = useAppStore((s) => s.settings)
  const refreshSettings = useAppStore((s) => s.refreshSettings)
  const info = useAsync(() => api.getInfo(), [])

  const [form, setForm] = useState<SettingsUpdateInput>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [backupMsg, setBackupMsg] = useState('')

  const doExport = async (): Promise<void> => {
    const r = await api.exportBackup()
    if (r.ok) setBackupMsg(`Backup salvo em: ${r.path}`)
  }
  const doImport = async (): Promise<void> => {
    await api.importBackup() // se confirmado, o app reinicia
  }

  useEffect(() => {
    if (settings) {
      setForm({
        userName: settings.userName,
        examDate: settings.examDate,
        dailyGoalQuestions: settings.dailyGoalQuestions,
        dailyGoalMinutes: settings.dailyGoalMinutes,
        theme: settings.theme,
        aiProvider: settings.aiProvider,
        aiModel: settings.aiModel
      })
    }
  }, [settings])

  const set = <K extends keyof SettingsUpdateInput>(key: K, value: SettingsUpdateInput[K]): void => {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  const onSave = async (): Promise<void> => {
    setSaving(true)
    try {
      await api.updateSettings(form)
      await refreshSettings()
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Configurações"
        subtitle="Ajuste seu perfil, metas e integração de IA"
        icon={<SettingsIcon size={20} />}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-4 p-5">
          <CardHeader title="Perfil & prova" />
          <Field label="Seu nome">
            <input
              className={inputCls}
              value={form.userName ?? ''}
              onChange={(e) => set('userName', e.target.value)}
              placeholder="Como devo te chamar?"
            />
          </Field>
          <Field label="Data da prova" hint="Usada na contagem regressiva e no planejamento">
            <input
              type="date"
              className={inputCls}
              value={form.examDate ?? ''}
              onChange={(e) => set('examDate', e.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Meta diária (questões)">
              <input
                type="number"
                min={0}
                className={inputCls}
                value={form.dailyGoalQuestions ?? 0}
                onChange={(e) => set('dailyGoalQuestions', Number(e.target.value))}
              />
            </Field>
            <Field label="Meta diária (minutos)">
              <input
                type="number"
                min={0}
                className={inputCls}
                value={form.dailyGoalMinutes ?? 0}
                onChange={(e) => set('dailyGoalMinutes', Number(e.target.value))}
              />
            </Field>
          </div>
          <Field label="Tema">
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('theme', t)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    form.theme === t ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-muted'
                  }`}
                >
                  {t === 'light' ? 'Claro' : 'Escuro'}
                </button>
              ))}
            </div>
          </Field>
        </Card>

        <div className="space-y-4">
          <Card className="space-y-4 p-5">
            <CardHeader
              title="Tutor IA (opcional)"
              subtitle="O app funciona 100% offline; a IA é um extra"
            />
            <Field label="Provedor" hint="anthropic (Claude/Opus), openai ou openrouter">
              <input
                className={inputCls}
                value={form.aiProvider ?? ''}
                onChange={(e) => set('aiProvider', e.target.value)}
                placeholder="anthropic"
              />
            </Field>
            <Field label="Modelo" hint="Padrão do Opus 4.8 se deixar vazio com provedor anthropic">
              <input
                className={inputCls}
                value={form.aiModel ?? ''}
                onChange={(e) => set('aiModel', e.target.value)}
                placeholder="claude-opus-4-8"
              />
            </Field>
            <Field label="Chave de API" hint={settings?.hasAiKey ? 'Uma chave já está salva.' : 'Nenhuma chave salva.'}>
              <input
                type="password"
                className={inputCls}
                value={form.aiApiKey ?? ''}
                onChange={(e) => set('aiApiKey', e.target.value)}
                placeholder={settings?.hasAiKey ? '•••••••• (preencha para substituir)' : 'cole sua chave aqui'}
              />
            </Field>
          </Card>

          <Card className="space-y-2 p-5">
            <CardHeader title="Sobre" icon={<Database size={16} />} />
            <p className="text-xs text-muted-foreground">Versão: {info.data?.version ?? '—'}</p>
            <p className="break-all text-xs text-muted-foreground">
              Banco local: {info.data?.dbPath ?? '—'}
            </p>
            <p className="text-xs text-muted-foreground">
              Seus dados ficam apenas neste computador.
            </p>
          </Card>

          <Card className="space-y-3 p-5">
            <CardHeader title="Backup" subtitle="Exporte ou restaure todos os seus dados" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void doExport()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <Download size={15} /> Exportar
              </button>
              <button
                type="button"
                onClick={() => void doImport()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <Upload size={15} /> Importar
              </button>
            </div>
            {backupMsg ? <p className="break-all text-xs text-success">{backupMsg}</p> : null}
          </Card>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void onSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? 'Salvando…' : 'Salvar alterações'}
        </button>
        {saved ? (
          <span className="inline-flex items-center gap-1 text-sm text-success">
            <Check size={16} /> Salvo!
          </span>
        ) : null}
      </div>
    </div>
  )
}
