# Site design rules (reference)

Canonical Cursor rule: [`.cursor/rules/site-design.mdc`](../.cursor/rules/site-design.mdc). Keep this file in sync when the rule changes.

## Authority

- Layout, colors, typography, copy, images, animations, and scroll effects require **explicit user approval** before treating as final.
- Approved decisions live in [`site-brief.md`](site-brief.md). Update that file when the user confirms a choice.
- Reference sites (including the example parish site) inform **structure and features only** — never copy their colors, logo, photos, or text.

## Product scope

- Paróquia Cristo Rei informational site: **24 communities** (dedicated pages with history and photos), parish gallery, **news feed**, **mass schedules**, contact/about as needed.
- Suggest additional sections (donations, calendar, first visit, etc.) as options; implement only after approval.

## Visual direction

- Modern, high-quality, **church-first** hierarchy: the parish and its mission lead the page.
- Well-positioned elements; generous spacing; strong mobile layout.
- Animations: **elegant and subtle** (fade-up, light opacity/scale). Respect `prefers-reduced-motion`.
- Avoid flashy motion, heavy smooth-scroll libs, or startup aesthetics unless the user explicitly asks.

## Process

1. **Suggest** — always offer options with brief rationale and current references (sites, inspiration boards, trends).
2. **Gate** — pause at approval points; do not advance to the next slice without user OK (see brief “Status”).
3. **Implement** — small slices aligned with `frontend.mdc`; no one-shot full-site rewrites.
4. **Verify** — run dev preview; capture desktop/tablet/mobile; check overflow, typography, contrast, and brief compliance.
5. **Iterate** — if visual quality or rules are not met, fix before moving on.

## Research and quality

- Web research for up-to-date layout and UX patterns is encouraged when proposing directions.
- Use subagents or todos for multi-step design work when it improves fidelity.
- Authentic parish photography over generic stock when assets exist; request assets when missing.

## Placeholders

- Use neutral placeholders only when the user allows temporary content for layout review.
- List missing assets in `site-brief.md` (logo, colors, photos, community copy).
