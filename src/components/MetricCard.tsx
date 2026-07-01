import type { Metric } from '../types'
import { StatusBadge } from './StatusBadge'

const COLORS = {
  ok: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
}

const LABELS: Record<string, { title: string; icon: string }> = {
  cpu_usage: { title: 'CPU', icon: '⚡' },
  memory_usage: { title: 'RAM', icon: '🧠' },
  disk_usage: { title: 'Disco', icon: '💾' },
}

export function MetricCard({ metric }: { metric: Metric }) {
  const { title, icon } = LABELS[metric.name] ?? { title: metric.name, icon: '📊' }
  const color = COLORS[metric.status]
  const pct = Math.min(metric.value, 100)

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(59,130,246,0.1)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-sm font-mono font-semibold" style={{ color: '#94a3b8' }}>{title}</span>
        </div>
        <StatusBadge status={metric.status} />
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold tabular-nums" style={{ color }}>{metric.value.toFixed(1)}</span>
        <span className="text-lg mb-1" style={{ color: '#475569' }}>{metric.unit}</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(59,130,246,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>

      <div className="flex justify-between text-xs font-mono" style={{ color: '#334155' }}>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  )
}
