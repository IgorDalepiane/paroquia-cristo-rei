---
name: commit-split
description: >-
  Propose grouped git add/commit commands when the user asks COMMIT-SPLIT or to
  split commits. Run the repo's formatter first, then output per-commit commands.
  Stack-agnostic — detects Dart, Node, Python, Go, Rust, etc. from project files.
disable-model-invocation: true
---

# COMMIT-SPLIT — grouped git commits

When the user message contains **`COMMIT-SPLIT`** (any case) **or** explicitly asks to **split commits / staged commits / git commands per commit** (without asking for new code):

1. **Do not** implement features or refactors — only format (step 0), then propose commits.
2. Respond in **Portuguese** if the user wrote in Portuguese; otherwise match their language. **`git commit -m` strings are always English.**
3. For **each commit**, in this order:
   - **Arquivos** — paths relative to repo root
   - Ready-to-paste commands: `git add` (those files only) + `git commit -m "..."` (single line, imperative, optional `feat`/`fix`/`chore`/`refactor`/`docs`/`ci` prefix)
4. Order commits by **logical dependency** (e.g. shared types before consumers, backend before frontend).
5. **Do not** include `git push` unless the user asks.

If there are no pending changes or grouping is unclear, ask for `git status` / `git diff` in one line.

---

## Step 0 — Format before grouping (execute)

**Always run formatting once** on the working tree before listing commits. This avoids CI format failures after the user commits.

### How to pick the command

Use the **first match** in this table. Prefer project wrappers (`Makefile`, `package.json` scripts, FVM) over bare tools.

| Repo signal                                               | Format command                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------- |
| `Makefile` target `format` / `fmt`                        | `make format` or `make fmt` (whichever exists)                      |
| `.github/workflows/*` runs a format step                  | Use **that exact command** (e.g. `dart format .`, `npm run format`) |
| `pubspec.yaml` + `.fvmrc` or `.fvm/fvm_config.json`       | `fvm dart format .`                                                 |
| `pubspec.yaml` (no FVM)                                   | `dart format .`                                                     |
| `melos.yaml`                                              | `melos run format` or `melos exec -- dart format .` (if defined)    |
| `package.json` script `format` / `fmt`                    | `npm run format` or `pnpm format` or `yarn format`                  |
| `.prettierrc*` / `prettier` in `package.json` (no script) | `npx prettier --write .`                                            |
| `pyproject.toml` + `ruff`                                 | `ruff format .`                                                     |
| `pyproject.toml` + `black`                                | `black .`                                                           |
| `Cargo.toml`                                              | `cargo fmt --all`                                                   |
| `go.mod`                                                  | `go fmt ./...`                                                      |
| `.editorconfig` only, no tool above                       | Skip format; note "no formatter detected"                           |

**CI vs local:** CI often uses `--check` / `--set-exit-if-changed`. For COMMIT-SPLIT, run the **write** variant (format in place), not check-only.

### After formatting

1. Re-run `git status` and `git diff --stat`.
2. If format changed files, **include those paths** in the appropriate commit groups (usually the commit that owns the formatted source files, or the last touch commit for that file).
3. Tell the user formatting ran and which command was used (one line).

If formatting fails (missing tool), report the error and still propose commits — do not block on format unless the user wants to fix the tool first.

---

## Commit message rules

- One line, English, imperative: `feat: add push notification channel`
- Group related hunks; avoid one giant commit unless the change is truly atomic
- Never stage secrets (`.env`, `.keys/`, keystores, Firebase plist/json if gitignored) or paths the project's gitignore marks as local-only
- If the project has a gitignore checklist (e.g. L02 / `AGENTS.md`), apply it before proposing `git add`

---

## Example output shape

```markdown
### Pré-commit: formatação

Rodado: `fvm dart format .` (2 arquivos alterados)

### Commit 1 — dependências

**Arquivos:** `pubspec.yaml`, `pubspec.lock`

\`\`\`bash
git add pubspec.yaml pubspec.lock
git commit -m "chore: add Firebase messaging dependencies"
\`\`\`
```
