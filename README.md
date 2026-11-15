# LineTrack

LineTrack is a garment production line tracking system. This repo is a pnpm
monorepo: a NestJS API, a React web app, and a shared TypeScript package.

## Requirements

- Node.js 20+
- pnpm 9+
- Docker Desktop (PostgreSQL 16 + Redis 7 for local development)

## Setup

```sh
docker compose up -d
cp .env.example .env
pnpm install
pnpm run generate
pnpm run db:migrate
pnpm run db:seed
pnpm run dev
```

The API runs at http://localhost:3000 (Swagger docs at `/docs`), and the web
app runs at http://localhost:5173.

## Scripts

Run from the repo root unless noted otherwise.

| Script | What it does |
| --- | --- |
| `pnpm run generate` | Generates the Prisma client for `apps/api` |
| `pnpm run db:migrate:test` | Applies migrations against `TEST_DATABASE_URL` |
| `pnpm run db:migrate` | Applies migrations against `DATABASE_URL` |
| `pnpm run db:seed` | Seeds a demo tenant (`apps/api`, safe to re-run) |
| `pnpm --filter @linetrack/api run db:new-migration <name>` | Creates a new Prisma migration from schema changes |
| `pnpm run typecheck` | Type-checks every package |
| `pnpm run lint` | Lints every package (no warnings allowed) |
| `pnpm run test` | Runs unit tests in every package, then Playwright e2e tests |
| `pnpm run build` | Builds every package |
| `pnpm run dev` | Runs the API and web app together for local development |

## Working with Foreman

Feature work in this repo (beyond the initial project skeleton) is built
story by story by [Foreman](https://www.npmjs.com/package/claude-foreman), an
automated coding agent runner. See `BACKLOG.md` for the backlog of stories and
`foreman.config.yaml` / `tasks.yaml` for how Foreman is configured to run
them. Foreman is not allowed to modify `package.json` scripts, CI
configuration, or lint/test/TypeScript config — those are expected to be
complete and final from this skeleton onward.
