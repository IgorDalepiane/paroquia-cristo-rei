---
name: release-tag
description: >-
  Shared steps to cut a semver git tag on origin/main and push it so production
  promotes. Used by /patch, /minor, and /major. Do not invoke directly.
disable-model-invocation: true
---

# Release tag from main

Speak Portuguese. Execute; do not only print commands.

The bump type comes from the command that invoked this skill (`/patch`, `/minor`, or `/major`).

Pushing `v*` runs `.github/workflows/promote-production.yml`, which force-pushes that commit to `production`.

## Bump

| Command | From `vX.Y.Z` |
|---------|----------------|
| `/patch` | `vX.Y.(Z+1)` |
| `/minor` | `vX.(Y+1).0` |
| `/major` | `v(X+1).0.0` |

Ignore tags that are not exactly `v` + three integers (skip `v.0.2.3`, `0.2.4`).

## Steps

1. `git fetch origin main --tags`
2. Latest current tag:

```bash
git tag -l 'v*.*.*' --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1
```

If none, treat current as `v0.0.0`.
3. Compute **next**. Abort if `git rev-parse -q --verify "refs/tags/$NEXT"` exists.
4. Tag **origin/main**, not the current branch:

```bash
SHA=$(git rev-parse origin/main)
git tag "$NEXT" "$SHA"
git push origin "$NEXT"
```

5. Reply with current → next, short SHA, and that production will follow.

## Do not

- Tag a feature branch or local `HEAD` unless it **is** `origin/main`
- `--force` a tag
- Skip numbers or invent a version the bump table does not produce
- Wait for Cloudflare
