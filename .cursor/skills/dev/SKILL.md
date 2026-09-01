---
name: dev
description: >-
  Full feature loop for this parish site: grill the demand, plan, wait for
  confirmation, implement, run locally, screenshot UI, then hand off clickable
  manual tests. Use when the user types /dev, brings a stakeholder demand, or
  asks to take a change from request through local preview.
disable-model-invocation: true
---

# /dev

End-to-end loop for a demand on this repo. Speak Portuguese with the user.

Copy this checklist and tick as you go. **If the conversation already finished earlier stages, resume — do not restart.**

```
/dev
- [ ] 0 Locate stage
- [ ] 1 Grill (align loose points)
- [ ] 2 Plan + wait for confirmation
- [ ] 3 Implement
- [ ] 4 Run app + screenshots + UI pass
- [ ] 5 Handoff (URL + manual tests)
- [ ] 6 Skill harness (end of every turn)
```

## 0. Locate stage

State the current stage in one line. Skip anything already done in this chat (grill, plan approval, code). A mid-pipeline `/dev` is a resume, not a reset.

## 1. Grill

Interview like grill-with-docs: one round, then wait, then the next round.

- Read the codebase first. Do not ask what the repo already answers.
- 1–2 questions per round. Recommend an option. Prefer `AskQuestion` when available.
- Forks that change the plan (layout vs behavior, desktop vs mobile, keep vs remove a control) must be asked. Everything else can wait.
- Do not dump every question at once. Do not write a spec during the grill.
- Optional glossary: only if a **project word** actually settled. Then append it to `CONTEXT.md` (vocabulary only — no implementation notes). Skip ADRs unless the decision is hard to reverse, surprising without context, **and** a real trade-off. Most sessions write none.

Stop grilling when you and the user share one understanding of the change.

## 2. Plan + wait

Present a short plan: goal, files, not-to-do, acceptance. Then **stop**. Do not implement until the user confirms.

Use `CreatePlan` / SwitchMode to plan when the environment supports it. Confirmation in chat also counts.

## 3. Implement

Follow `.cursor/rules/` (`global.mdc`, `frontend.mdc`, `site-design.mdc`). Small slice, only relevant files.

Validation:

```bash
pnpm lint
pnpm exec tsc --noEmit   # when TypeScript-heavy
```

If `pnpm lint` dies on an install gate (`ERR_PNPM_IGNORED_BUILDS` or similar), run `./node_modules/.bin/next lint` and `./node_modules/.bin/tsc --noEmit` instead. Do not disable lint to go green.

## 4. Run app + screenshots + UI pass

1. **Pick a live URL for this app.** Port 3000 is often some other Node/Express process. Probe the candidate (`GET /` should be this Next.js site, not a JSON 404). If the port is taken or is the wrong app, use the next free port (`3001`, `3002`, …) and tell the user **that** URL.
2. Start `pnpm dev` / `next dev --turbopack` on the chosen port. Wait until Ready. Hit the affected route and confirm HTTP 200.
3. Screenshot **desktop (~1440×900) and mobile (~390×844)** of every affected view (and a nearby state if the change is interactive: overflow gone, modal open, empty day). Save under `.dev-preview/` (gitignored). Do not commit shots.
4. Capture method, in order:
   - Cursor browser tools if present.
   - Else Playwright Chromium via `npx --yes playwright@1.55.0` (`screenshot --browser=chromium --full-page --wait-for-timeout=2500`). Mobile = `--viewport-size=390,844`, **not** `--device=` (that needs WebKit, which we do not install). Install Chromium once with `npx playwright@1.55.0 install chromium` if the cache is empty.
   - Do not use Brave/Chrome `--headless` on this machine — it hangs with no output even with a timeout.
     Tall week grids: `--full-page` so chips are not cropped.
5. **Read the images.** Check overflow, clipped text, contrast, unequal columns, missing times, controls that should be gone, mobile stacking. If you find a real UI bug, fix it, re-shot, re-read. Do not hand off a broken layout.

## 5. Handoff

Tell the user the app is running and they can start manual tests. Include:

- The base URL as a markdown link.
- A short list of manual tests, each with a **clickable** URL (deep-link with `?week=` / `?event=` when the route supports it).
- What to look for in one line per test.

Do not stop the dev server at handoff.

## 6. Skill harness (every turn)

After the user-facing answer, decide whether this turn produced a **durable** improvement to `/dev` itself.

Change the skill only if **all** of these hold:

- It will fire again (a recurring failure, a missing gate, a technique that changed the outcome).
- The instruction is short and specific (a check, a fallback, a “do not”).
- Leaving it out would likely cause the same miss.

Do **not** edit the skill for one-off context, prose polish, or “while we’re here.” No change is the default. If you do edit, say so in one sentence.

## Anti-patterns

- Restarting grill/plan after the user already confirmed.
- Asking mobile/desktop separately when the same UI bug exists in both and the recommendation is obvious.
- Assuming `localhost:3000` is this app.
- Handing off without looking at screenshots.
- Writing `CONTEXT.md` / ADRs by default.
- Growing this file without a recurring payoff.
