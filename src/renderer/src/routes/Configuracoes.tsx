import { Check, Database, Download, RefreshCw, Save, Settings as SettingsIcon, Upload, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { AIHealth } from '@shared/domain'
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
  const activeContest = useAppStore((s) => s.activeContest)
  const refreshSettings = useAppStore((s) => s.refreshSettings)
  const refreshContests = useAppStore((s) => s.refreshContests)
  const info = useAsync(() => api.getInfo(), [])

  const [form, setForm] = useState<SettingsUpdateInput>({})
  const [examDate, setExamDate] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [backupMsg, setBackupMsg] = useState('')

  // AI Platform (M22)
  const providers = useAsync(() => api.getAiProviders(), [])
  const models = useAsync(() => api.getAiModels(), [])
  const [health, setHealth] = useState<AIHealth | null>(null)
  const [testing, setTesting] = useState(false)
  const selectedProvider = (providers.data ?? []).find(
    (p) => p.id === (form.aiProvider ?? 'ollama')
  )
  const testHealth = async (): Promise<void> => {
    setTesting(true)
    setHealth(null)
    try {
      setHealth(await api.checkAiHealth())
    } finally {
      setTesting(false)
    }
  }

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
        dailyGoalQuestions: settings.dailyGoalQuestions,
        dailyGoalMinutes: settings.dailyGoalMinutes,
        theme: settings.theme,
        aiProvider: settings.aiProvider,
        aiModel: settings.aiModel
      })
    }
  }, [settings])

  useEffect(() => {
    setExamDate(activeContest?.examDate ?? '')
  }, [activeContest])

  const set = <K extends keyof SettingsUpdateInput>(key: K, value: SettingsUpdateInput[K]): void => {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  const onSave = async (): Promise<void> => {
    setSaving(true)
    try {
      await api.updateSettings(form)
      await refreshSettings()
      // A data da prova pertence ao concurso ativo, não às preferências.
      if (activeContest && examDate && examDate !== (activeContest.examDate ?? '')) {
        await api.updateContest(activeContest.id, { examDate })
        await refreshContests()
      }
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
          <CardHeader title="Perfil & prova" subtitle={activeContest?.name} />
          <Field label="Seu nome">
            <input
              className={inputCls}
              value={form.userName ?? ''}
              onChange={(e) => set('userName', e.target.value)}
              placeholder="Como devo te chamar?"
            />
          </Field>
          <Field
            label="Data da prova"
            hint={`Do concurso ${activeContest?.name ?? 'ativo'} — usada na contagem regressiva e no planejamento`}
          >
            <input
              type="date"
              className={inputCls}
              value={examDate}
              onChange={(e) => {
                setExamDate(e.target.value)
                setSaved(false)
              }}
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
              title="Inteligência Artificial"
              subtitle="Padrão: Ollama local (grátis, offline). O app inteiro funciona sem IA."
            />
            <Field label="Provedor">
              <select
                className={inputCls}
                value={form.aiProvider ?? 'ollama'}
                onChange={(e) => set('aiProvider', e.target.value)}
              >
                {(providers.data ?? []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                    {p.capabilities.local ? ' · local' : ''}
                    {p.capabilities.needsApiKey ? ' · exige chave' : ''}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Modelo"
              hint={
                selectedProvider?.capabilities.listModels
                  ? models.data?.length
                    ? `${models.data.length} modelo(s) instalados detectados.`
                    : 'Nenhum modelo detectado — instale um com: ollama pull llama3.2:3b'
                  : 'Deixe vazio para usar o modelo padrão do provedor.'
              }
            >
              <div className="flex gap-2">
                <input
                  className={inputCls}
                  list="ai-models"
                  value={form.aiModel ?? ''}
                  onChange={(e) => set('aiModel', e.target.value)}
                  placeholder={selectedProvider?.id === 'ollama' ? 'llama3.2' : 'modelo padrão'}
                />
                {selectedProvider?.capabilities.listModels ? (
                  <button
                    type="button"
                    onClick={() => void models.reload()}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted"
                    title="Detectar modelos instalados"
                  >
                    <RefreshCw size={14} /> Detectar
                  </button>
                ) : null}
                <datalist id="ai-models">
                  {(models.data ?? []).map((m) => (
                    <option key={m.name} value={m.name} />
                  ))}
                </datalist>
              </div>
            </Field>
            {selectedProvider?.capabilities.needsApiKey ? (
              <Field
                label="Chave de API"
                hint={settings?.hasAiKey ? 'Uma chave já está salva.' : 'Nenhuma chave salva.'}
              >
                <input
                  type="password"
                  className={inputCls}
                  value={form.aiApiKey ?? ''}
                  onChange={(e) => set('aiApiKey', e.target.value)}
                  placeholder={settings?.hasAiKey ? '•••••••• (preencha para substituir)' : 'cole sua chave aqui'}
                />
              </Field>
            ) : null}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => void testHealth()}
                disabled={testing}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-60"
              >
                <Zap size={14} />
                {testing ? 'Testando…' : 'Testar conexão'}
              </button>
              {health ? (
                <div
                  className={`rounded-lg border p-2.5 text-xs ${
                    health.ok ? 'border-success/40 bg-success/10' : 'border-warning/40 bg-warning/10'
                  }`}
                >
                  <p className="font-medium">
                    {health.ok ? '✓ Conectado' : '✗ Indisponível'} · {health.provider}
                    {health.model ? ` · ${health.model}` : ''}
                    {health.latencyMs != null ? ` · ${health.latencyMs}ms` : ''}
                    {health.tokensPerSecond != null ? ` · ${health.tokensPerSecond} tokens/s` : ''}
                  </p>
                  <p className="mt-1 text-muted-foreground">{health.detail}</p>
                </div>
              ) : null}
              <p className="text-xs text-muted-foreground">
                O teste usa as configurações <strong>salvas</strong> — salve antes de testar.
              </p>
            </div>
          </Card>

          <Card className="space-y-2 p-5">
            <CardHeader title="Concurso ativo" subtitle={activeContest?.name ?? '—'} />
            <div className="grid gap-1 text-xs text-muted-foreground">
              {activeContest?.role ? <p>Cargo: {activeContest.role}</p> : null}
              {activeContest?.board ? <p>Banca: {activeContest.board}</p> : null}
              {activeContest?.city ? <p>Cidade: {activeContest.city}</p> : null}
              {activeContest?.salary ? <p>Salário: {activeContest.salary}</p> : null}
              {activeContest?.benefits ? <p>Benefícios: {activeContest.benefits}</p> : null}
            </div>
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
