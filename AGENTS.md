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
pnpm preview      # Cloudflare preview (local)
pnpm cf:deploy:prod  # production deploy (production branch only)
pnpm cf:upload    # preview version upload (main + feature branches)
```

Cloudflare Workers Builds (single project, Igordalepiane account). Do not use `pnpm deploy` — conflicts with pnpm built-in.

| Trigger                | Mechanism                                         | Command               | URL                          |
| ---------------------- | ------------------------------------------------- | --------------------- | ---------------------------- |
| Push to `main`         | Workers Builds (non-prod)                         | `pnpm cf:upload`      | Preview version URL          |
| Push to feature branch | Workers Builds (non-prod)                         | `pnpm cf:upload`      | Preview version URL          |
| Push tag `v*`          | GHA promotes `production` branch → Workers Builds | `pnpm cf:deploy:prod` | `paroquiacristoreibg.org.br` |

Workers Builds dashboard settings:

| Setting                    | Command                                        |
| -------------------------- | ---------------------------------------------- |
| Build                      | _(empty — OpenNext runs inside deploy/upload)_ |
| Production branch          | `production`                                   |
| Deploy (production branch) | `pnpm cf:deploy:prod`                          |
| Non-production deploy      | `pnpm cf:upload`                               |

**Release:** after merging to `main` and verifying (preview URL or `pnpm preview` locally):

```bash
git tag v0.2.0
git push origin v0.2.0
```

The `promote-production` workflow resets the `production` branch to the tagged commit; Cloudflare deploys automatically. No Cloudflare secrets in GitHub.

`pnpm build` is for local quick checks only — not used in CI or Cloudflare pipelines (OpenNext invokes it internally).

## Off-limits (without explicit approval)

- Deploy/runtime config (`wrangler.jsonc`, `next.config.ts`, `open-next.config.ts`, deploy scripts)
- Secrets in source
- Large rewrites or new dependencies for trivial UI/content changes

## Site design (discovery phase)

Design decisions and agent rules for the parish site rebuild:

- [`docs/design/site-brief.md`](docs/design/site-brief.md) — approved choices, pending assets, gate status
- [`docs/design/site-design-rules.md`](docs/design/site-design-rules.md) — human-readable mirror of `site-design.mdc`
