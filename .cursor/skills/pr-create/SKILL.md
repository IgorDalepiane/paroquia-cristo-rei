---
name: pr-create
description: >-
  Open a GitHub pull request for this parish site and enable squash auto-merge.
  Use when creating a PR, after COMMIT-SPLIT, or when the user asks to criar o PR.
---

# Create PR

After the branch is pushed to `origin`:

```bash
gh pr create --title "..." --body "..."
gh pr merge --auto --squash
```

`gh pr merge` without a number targets the PR for the current branch.

- Always **squash**. Never `--merge` or `--rebase`.
- Always `--auto` so CI can finish; do not wait for the user to press merge.
- Do not open the PR as a draft (auto-merge will not arm).
- If `--auto` fails, paste the error. Do not switch merge strategy.

PR body: `## Summary` bullets + `## Test plan` checkboxes, in English to match existing PRs.
