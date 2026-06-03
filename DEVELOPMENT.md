# Vakeel — Local Development

## Prerequisites

- Node.js 20+
- MongoDB 7 (local or Atlas) — required from Phase 1 auth/schemas onward
- Redis 7 — required from Phase 1 sessions/queues onward

Docker is optional and not used in this repo setup.

## Quick start

```bash
# Install dependencies (from repo root)
npm install

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Run API + frontend together
npm run dev
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| API health | http://localhost:5000/health |
| API v1 root | http://localhost:5000/api/v1 |

## Workspace scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Client (Vite) + server (tsx watch) |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | Backend only |
| `npm run build` | Production build for both packages |
| `npm run type-check` | TypeScript validation |

## Project layout

```text
client/     React + Vite + Tailwind + Redux + TanStack Query
server/     Express + TypeScript (Socket.io, Bull, Mongoose — wired in later phases)
```

See the main [README.md](./README.md) for the full product blueprint.
