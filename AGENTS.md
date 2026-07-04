# Paróquia Cristo Rei — AI development guide

Static informational website: **Next.js 15**, **React 19**, **TypeScript**, **Tailwind v4**, deployed on **Cloudflare Workers** (OpenNext + Wrangler).

## Rules (Cursor)

Detailed rules live in [`.cursor/rules/`](.cursor/rules/):

| File                    | When it applies                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.mdc`            | Always — process, validation, safety                                                                                                                                                    |
| `frontend.mdc`          | Editing `src/` or `public/`                                                                                                                                                             |
| `site-design.mdc`       | Site UX/visual work — approval gates, quality checks ([`docs/design/site-brief.md`](docs/design/site-brief.md), [`docs/design/site-design-rules.md`](docs/design/site-design-rules.md)) |
| `cloudflare-deploy.mdc` | Editing deploy/config files                                                                                                                                                             |

## Workflow

1. **Plan** — goal, scope, not-to-do, acceptance criteria.
2. **Implement** one small slice; touch only relevant files.
3. **Review diff** — deletions, new deps, out-of-scope edits.
4. **Validate** — `pnpm lint`, `pnpm build`, `pnpm exec tsc --noEmit` when needed.
5. **Checkpoint** — commit stable work before the next slice.

If output degrades or fixes loop: new chat, narrower scope, diagnose before patching.

## Commands

```bash
pnpm dev          # local dev (Turbopack)
pnpm lint
pnpm build
pnpm preview      # Cloudflare preview
pnpm deploy       # production deploy
```

## Off-limits (without explicit approval)

- Deploy/runtime config (`wrangler.jsonc`, `next.config.ts`, `open-next.config.ts`, deploy scripts)
- Secrets in source
- Large rewrites or new dependencies for trivial UI/content changes

## Site design (discovery phase)

Design decisions and agent rules for the parish site rebuild:

- [`docs/design/site-brief.md`](docs/design/site-brief.md) — approved choices, pending assets, gate status
- [`docs/design/site-design-rules.md`](docs/design/site-design-rules.md) — human-readable mirror of `site-design.mdc`
