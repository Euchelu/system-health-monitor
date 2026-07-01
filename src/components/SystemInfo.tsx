import type { SystemInfo as SI } from '../types'

export function SystemInfo({ info }: { info: SI }) {
  const rows = [
    { label: 'Sistema Operativo', value: `${info.os} ${info.os_version.split(' ')[0]}` },
    { label: 'Arquitectura', value: info.architecture },
    { label: 'Hostname', value: info.hostname },
    { label: 'Python', value: info.python_version },
  ]

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(59,130,246,0.1)' }}
    >
      <span className="text-sm font-mono font-semibold block mb-4" style={{ color: '#94a3b8' }}>
        🖥 SISTEMA
      </span>
      <div className="grid grid-cols-2 gap-3">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <div className="text-xs font-mono mb-0.5" style={{ color: '#334155' }}>{label}</div>
            <div className="text-sm font-mono" style={{ color: '#64748b' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
