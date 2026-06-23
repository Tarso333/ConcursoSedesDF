import { useEffect, useState } from 'react'

export interface AsyncResult<T> {
  data: T | undefined
  loading: boolean
  error: string | undefined
  reload: () => void
}

/** Executa uma chamada assíncrona (tipicamente ao main via IPC) e expõe estado. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncResult<T> {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    fn()
      .then((d) => {
        if (!active) return
        setData(d)
        setError(undefined)
      })
      .catch((e: unknown) => {
        if (!active) return
        setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return { data, loading, error, reload: () => setTick((t) => t + 1) }
}
