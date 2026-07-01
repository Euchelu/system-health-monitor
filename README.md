# System Health Monitor

Dashboard React en tiempo real que visualiza métricas de sistema (CPU, RAM, disco) consumiendo la [DevOps Toolkit API](https://github.com/Euchelu/devops-toolkit-).

## Stack

- **React 19 + TypeScript** — UI reactiva con polling cada 3 segundos
- **Vite 8 + Tailwind CSS v4** — build rápido, diseño utility-first
- **Recharts** — gráfica de historial de las últimas 20 lecturas
- **FastAPI + psutil** — backend que expone `/health` y `/metrics` con datos reales del sistema

## Demo mode

Si la API no está disponible (ej. en GitHub Pages), el dashboard activa automáticamente el **modo demo** con datos simulados que siguen la misma lógica de umbrales que el backend real:

| Métrica | Warning | Critical |
|---|---|---|
| CPU | ≥ 70% | ≥ 90% |
| RAM | ≥ 75% | ≥ 90% |
| Disco | ≥ 80% | ≥ 95% |

## Ejecutar en local

### Backend (DevOps Toolkit API)

```bash
cd ../devops-toolkit
pip install -r requirements.txt
uvicorn app.api:app --reload --port 8001
```

### Frontend

```bash
npm install
npm run dev
```

El proxy de Vite redirige `/api/*` → `http://localhost:8001/*` automáticamente.

## CI/CD

GitHub Actions: build → deploy a GitHub Pages.
