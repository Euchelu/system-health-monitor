import { useState, useEffect, useCallback, useRef } from 'react'
import type { HealthResponse, HistoryPoint } from './types'
import { generateMockSnapshot } from './mockData'

const MAX_HISTORY = 20
const POLL_MS = 3000

function toHistoryPoint(data: HealthResponse): HistoryPoint {
  const find = (name: string) => data.metrics.find((m) => m.name === name)?.value ?? 0
  const d = new Date(data.timestamp * 1000)
  return {
    time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`,
    cpu: find('cpu_usage'),
    memory: find('memory_usage'),
    disk: find('disk_usage'),
  }
}

export function useMetrics() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [isDemo, setIsDemo] = useState(false)
  const [connected, setConnected] = useState<boolean | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const push = useCallback((snapshot: HealthResponse) => {
    setData(snapshot)
    setHistory((prev) => {
      const next = [...prev, toHistoryPoint(snapshot)]
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    })
  }, [])

  const fetchReal = useCallback(async () => {
    try {
      const res = await fetch('/api/health', { signal: AbortSignal.timeout(2000) })
      if (!res.ok) throw new Error('bad response')
      const json: HealthResponse = await res.json()
      setConnected(true)
      setIsDemo(false)
      push(json)
    } catch {
      setConnected(false)
      setIsDemo(true)
      push(generateMockSnapshot())
    }
  }, [push])

  useEffect(() => {
    fetchReal()
    intervalRef.current = setInterval(fetchReal, POLL_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchReal])

  return { data, history, isDemo, connected }
}
