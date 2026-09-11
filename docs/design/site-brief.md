# Site brief — Paróquia Cristo Rei

Living document for **approved** design and content decisions.

## Status

| Gate                      | State           | Notes                                                                 |
| ------------------------- | --------------- | --------------------------------------------------------------------- |
| Plan approved             | Done            | Collaborative workflow with approval between phases                   |
| Rules persisted (Fase 0)  | Done            | `docs/design/` + `.cursor/rules/site-design.mdc`                      |
| Reference prints received | Done            | 24 prints — Paróquia São Pelegrino (see `reference-sao-pelegrino.md`) |
| Layout direction chosen   | Done            | Editorial imersivo + hub de comunidades                               |
| Brand assets collected    | **Provisional** | Placeholders in code; awaiting official logo, colors, photos          |
| Content questionnaire     | Done            | V1 essencial; defaults for motion/menu documented below               |
| Implementation slices     | Done            | V1 scaffold implemented — pending asset swap + user review            |

## Goals

- Modern parish website with emphasis on the church and clear hierarchy.
- Subtle, elegant animations where they add polish — not distraction.
- All major decisions pass through the parish team before implementation is considered final.

## Confirmed scope — V1

### Routes

| Rota                  | Conteúdo                                                            |
| --------------------- | ------------------------------------------------------------------- |
| `/`                   | Hero imersivo + horários rápidos + notícias + comunidades + galeria |
| `/horarios`           | Missas, confissões, secretaria, abertura                            |
| `/comunidades`        | Hub das 24 comunidades (grid + busca)                               |
| `/comunidades/[slug]` | História, fotos, contato local                                      |
| `/noticias`           | Grid de notícias                                                    |
| `/noticias/[slug]`    | Artigo                                                              |
| `/paroquia`           | História, clero, pastorais resumidas                                |
| `/contato`            | Endereço, formulário, redes, secretaria                             |
| `/galeria`            | Fotos da paróquia                                                   |
| `/festa`              | Hub da 80ª Festa de Cristo Rei (bingo em destaque; sem rifa ainda)  |
| `/festa/bingo`        | Noite de bingo — ação entre amigos: ingresso, compra, brindes       |

### Navigation

- Paróquia → `/paroquia`
- Comunidades → `/comunidades`
- Horários → `/horarios`
- Agenda → `/agenda`
- Festa → `/festa`
- Galeria → `/galeria`
- Contato → `/contato`

Notícias: rotas `/noticias` existem, mas **fora da navegação e da home** por enquanto (conteúdo placeholder).

### Home section order

1. Hero — matriz photo, name, pastoral tagline
2. Horários rápidos — summary + link to `/horarios`
3. Agenda — próximos eventos
4. Descubra a paróquia — atalhos
5. Galeria — preview mosaic
6. Footer

### V2 backlog (not in V1)

Batismo, Casamento, Catequese, Dízimo, agenda/eventos, vídeos, downloads, vela virtual, busca global.

## Decisions recorded

### Visual identity

- [x] Reference prints analyzed — São Pelegrino, structure only
- [x] Layout archetype — Editorial sereno + community hub
- [x] Tone — contemporary clean with minimal script accents
- [ ] Official logo — **placeholder** (`/logo.svg`)
- [ ] Brand colors — **provisional** charcoal `#1c1c1c` + accent `#9b1c1c` + gold `#c4a035` until official palette
- [x] Language — PT-BR only

### Motion & interaction (Portão 3 — provisional defaults)

- [x] Animation level — **low** (fade-up on scroll, light card hover)
- [x] Scroll effects — Intersection Observer reveal; `prefers-reduced-motion` respected
- [x] Gallery in menu — **no** (home + footer only)
- [x] Floating side button — **no** as default chrome
- [x] Campaign FAB — Bingo chip (parish red, bottom-right) on all routes except `/festa` and `/festa/bingo`, through 2 Oct 2026 (America/Sao_Paulo); links to `/festa/bingo`

### Content & data

- [x] Content source — static TypeScript files in `src/content/`
- [ ] Mass times — placeholder data; confirm matrix vs per-community
- [ ] 24 communities — placeholder names; awaiting official list
- [ ] News — sample articles for layout; replace with real content

## Assets needed from parish

| Asset                          | Status      | Notes                                                                       |
| ------------------------------ | ----------- | --------------------------------------------------------------------------- |
| Logo                           | Placeholder | `public/logo.svg` — replace with official PNG/SVG                           |
| Color palette                  | Provisional | Update `globals.css` tokens when received                                   |
| Church photos (hero/gallery)   | Placeholder | Gradient/placeholder blocks until photos provided                           |
| Community list + slugs         | Placeholder | 24 entries in `src/content/communities.ts`                                  |
| Community stories & photos     | Placeholder | Per-community pages ready for content swap                                  |
| Mass schedule data             | Placeholder | `src/content/schedules.ts`                                                  |
| News samples                   | Placeholder | 6 sample articles in `src/content/news.ts`                                  |
| Hero tagline                   | Placeholder | `src/content/site.ts` — `heroTagline`                                       |
| Contact address / map / social | Partial     | Instagram `@paroquiacristoreibg` in `site.ts`; Facebook/YouTube still empty |
| 80ª Festa seal                 | In use      | `public/images/festa/logo-80-anos.jpg` on `/festa`                          |
| Bingo ticket art               | In use      | `public/images/festa/ingresso-bingo.jpg` on `/festa/bingo`                  |

## Reference material

- [reference-sao-pelegrino.md](./reference-sao-pelegrino.md) — inventory of 24 reference screens

## Implementation log

- **2026-06-28** — V1 scaffold: design tokens, layout (header/footer), all V1 routes, static content placeholders, low-motion scroll reveals.
- **2026-09-11** — 80ª Festa hub + bingo page (ação entre amigos, no e-commerce, prize names without per-item R$); site-wide Bingo FAB; parish Instagram in footer/contato.
