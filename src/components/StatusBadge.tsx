import type { HealthStatus } from '../types'

const config = {
  ok: { label: 'OK', color: '#10b981', bg: 'rgba(16,185,129,0.12)', pulse: '#10b981' },
  warning: { label: 'WARNING', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', pulse: '#f59e0b' },
  critical: { label: 'CRITICAL', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', pulse: '#ef4444' },
}

export function StatusBadge({ status, large }: { status: HealthStatus; large?: boolean }) {
  const c = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-widest ${large ? 'text-sm px-4 py-2 rounded-xl' : 'text-xs px-3 py-1 rounded-lg'}`}
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.color}30` }}
    >
      <span
        className="rounded-full animate-pulse"
        style={{ width: large ? 8 : 6, height: large ? 8 : 6, background: c.pulse, flexShrink: 0 }}
      />
      {c.label}
    </span>
  )
}
