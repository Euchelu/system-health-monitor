import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useMetrics } from './useMetrics'
import type { HealthResponse } from './types'

const SNAPSHOT: HealthResponse = {
  timestamp: 1_700_000_000,
  overall_status: 'ok',
  system: { os: 'Linux', os_version: '6.0', architecture: 'x86_64', hostname: 'host', python_version: '3.13' },
  metrics: [
    { name: 'cpu_usage', value: 10, unit: '%', status: 'ok' },
    { name: 'memory_usage', value: 20, unit: '%', status: 'ok' },
    { name: 'disk_usage', value: 30, unit: '%', status: 'ok' },
  ],
}

function setVisibility(hidden: boolean) {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
  document.dispatchEvent(new Event('visibilitychange'))
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.restoreAllMocks()
  setVisibility(false)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useMetrics — polling', () => {
  it('hace fetch inmediatamente y luego cada 3s mientras la pestaña está visible', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => SNAPSHOT })
    vi.stubGlobal('fetch', fetchMock)

    renderHook(() => useMetrics())
    await act(async () => {}) // deja correr el fetch inicial

    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      vi.advanceTimersByTime(3000)
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('pausa el polling cuando la pestaña pasa a segundo plano', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => SNAPSHOT })
    vi.stubGlobal('fetch', fetchMock)

    renderHook(() => useMetrics())
    await act(async () => {})
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      setVisibility(true) // pestaña oculta
    })

    await act(async () => {
      vi.advanceTimersByTime(9000) // 3 intervalos que no deberían ejecutarse
    })
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('al volver a primer plano hace fetch inmediatamente y reanuda el polling', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => SNAPSHOT })
    vi.stubGlobal('fetch', fetchMock)

    renderHook(() => useMetrics())
    await act(async () => {})
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await act(async () => {
      setVisibility(true)
    })
    await act(async () => {
      setVisibility(false) // vuelve a primer plano
    })

    expect(fetchMock).toHaveBeenCalledTimes(2)

    await act(async () => {
      vi.advanceTimersByTime(3000)
    })
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })
})

describe('useMetrics — modo demo', () => {
  it('activa el modo demo si la API no responde', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    const { result } = renderHook(() => useMetrics())
    await act(async () => {})

    expect(result.current.isDemo).toBe(true)
    expect(result.current.connected).toBe(false)
    expect(result.current.data).not.toBeNull()
  })
})
