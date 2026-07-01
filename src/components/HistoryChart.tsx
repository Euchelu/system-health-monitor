import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { HistoryPoint } from '../types'

const lines = [
  { key: 'cpu', color: '#3b82f6', label: 'CPU' },
  { key: 'memory', color: '#06b6d4', label: 'RAM' },
  { key: 'disk', color: '#8b5cf6', label: 'Disco' },
]

export function HistoryChart({ data }: { data: HistoryPoint[] }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(59,130,246,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-mono font-semibold" style={{ color: '#94a3b8' }}>
          📈 HISTORIAL (últimas {data.length} lecturas)
        </span>
        <span className="text-xs font-mono" style={{ color: '#334155' }}>actualiza cada 3s</span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.06)" />
          <XAxis
            dataKey="time"
            tick={{ fill: '#334155', fontSize: 10, fontFamily: 'monospace' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#334155', fontSize: 10, fontFamily: 'monospace' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: '#0a1628',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 8,
              color: '#e2e8f0',
              fontSize: 12,
              fontFamily: 'monospace',
            }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: 'monospace', color: '#64748b', paddingTop: 16 }}
          />
          {lines.map(({ key, color, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
