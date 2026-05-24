# landing

pnpm monorepo with two Next.js 16 apps and a shared UI package.

```
landing/
├── apps/
│   ├── substack-ops/   → substack-ops.chavan.in
│   └── medium-ops/     → medium-ops.chavan.in
└── packages/
    └── ui/             → @landing/ui (shared components + globals.css)
```

## Dev

```bash
pnpm install
pnpm dev:substack   # http://localhost:3000
pnpm dev:medium     # http://localhost:3001
```

## Build

```bash
pnpm build:substack
pnpm build:medium
pnpm build           # both
```

## Deploy (two Vercel projects, one repo)

Create **two** Vercel projects pointing at the same Git repo, with different
root directories:

| Project        | Root Directory            | Domain                    |
| -------------- | ------------------------- | ------------------------- |
| `substack-ops` | `landing/apps/substack-ops` | `substack-ops.chavan.in`  |
| `medium-ops`   | `landing/apps/medium-ops`   | `medium-ops.chavan.in`    |

Vercel auto-detects pnpm workspaces — no extra config. Each project builds
independently, only redeploys when files in its app or in `packages/ui` change.

### Build settings (per project)

- Framework: Next.js
- Install Command: `pnpm install` (default)
- Build Command: `pnpm build` (default)
- Output: `.next` (default)

### Migrating an existing Vercel project

If you previously deployed `landing/` as one project with the host-rewrite
middleware, do this:

1. Edit the existing Vercel project → **Settings → Root Directory** →
   `landing/apps/substack-ops`. Save and redeploy.
2. Create a new Vercel project from the same Git repo, set Root Directory to
   `landing/apps/medium-ops`, attach `medium-ops.chavan.in`.

The old `src/middleware.ts` host-sniffing rewrite is gone — each domain now
has its own deployment.
