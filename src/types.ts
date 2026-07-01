export type HealthStatus = 'ok' | 'warning' | 'critical'

export interface Metric {
  name: string
  value: number
  unit: string
  status: HealthStatus
}

export interface SystemInfo {
  os: string
  os_version: string
  architecture: string
  hostname: string
  python_version: string
}

export interface HealthResponse {
  timestamp: number
  overall_status: HealthStatus
  system: SystemInfo
  metrics: Metric[]
}

export interface HistoryPoint {
  time: string
  cpu: number
  memory: number
  disk: number
}
