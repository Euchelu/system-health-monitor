import type { HealthResponse } from './types'

export function generateMockSnapshot(): HealthResponse {
  const cpu = 20 + Math.random() * 55
  const memory = 45 + Math.random() * 30
  const disk = 62 + Math.random() * 8

  const classify = (v: number, warn: number, crit: number) =>
    v >= crit ? 'critical' : v >= warn ? 'warning' : 'ok'

  const metrics = [
    { name: 'cpu_usage', value: parseFloat(cpu.toFixed(2)), unit: '%', status: classify(cpu, 70, 90) },
    { name: 'memory_usage', value: parseFloat(memory.toFixed(2)), unit: '%', status: classify(memory, 75, 90) },
    { name: 'disk_usage', value: parseFloat(disk.toFixed(2)), unit: '%', status: classify(disk, 80, 95) },
  ] as const

  const statuses = metrics.map((m) => m.status)
  const overall = statuses.includes('critical') ? 'critical' : statuses.includes('warning') ? 'warning' : 'ok'

  return {
    timestamp: Date.now() / 1000,
    overall_status: overall,
    system: {
      os: 'Windows',
      os_version: '10.0.19045',
      architecture: 'AMD64',
      hostname: 'demo-host',
      python_version: '3.12.0',
    },
    metrics: metrics as unknown as import('./types').Metric[],
  }
}
