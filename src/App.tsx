import { useMetrics } from './useMetrics'
import { MetricCard } from './components/MetricCard'
import { HistoryChart } from './components/HistoryChart'
import { SystemInfo } from './components/SystemInfo'
import { StatusBadge } from './components/StatusBadge'

export default function App() {
  const { data, history, isDemo, connected } = useMetrics()

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: '#020b18' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#3b82f6' }}>
                DevOps Toolkit
              </span>
              {isDemo && (
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                  DEMO MODE
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#e2e8f0' }}>
              System Health Monitor
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(59,130,246,0.1)', color: '#64748b' }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: connected === null ? '#64748b' : connected ? '#10b981' : '#f59e0b',
                  boxShadow: connected ? '0 0 6px #10b981' : undefined,
                }}
              />
              {connected === null ? 'conectando...' : connected ? 'API conectada' : 'modo demo'}
            </div>

            {data && <StatusBadge status={data.overall_status} large />}
          </div>
        </div>

        {!data ? (
          <div className="flex items-center justify-center h-64 text-sm font-mono" style={{ color: '#334155' }}>
            Cargando métricas...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.metrics.map((m) => (
                <MetricCard key={m.name} metric={m} />
              ))}
            </div>

            {history.length >= 2 && <HistoryChart data={history} />}

            <SystemInfo info={data.system} />

            <div className="text-center text-xs font-mono py-4" style={{ color: '#1e293b' }}>
              Última actualización: {new Date(data.timestamp * 1000).toLocaleTimeString()} ·{' '}
              {isDemo
                ? 'Datos simulados — ejecuta la API localmente para datos reales'
                : 'Datos en tiempo real via FastAPI + psutil'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
