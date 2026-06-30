# Site brief — Paróquia Cristo Rei

Living document for **approved** design and content decisions.

## Status

| Gate | State | Notes |
|------|-------|-------|
| Plan approved | Done | Collaborative workflow with approval between phases |
| Rules persisted (Fase 0) | Done | `docs/design/` + `.cursor/rules/site-design.mdc` |
| Reference prints received | Done | 24 prints — Paróquia São Pelegrino (see `reference-sao-pelegrino.md`) |
| Layout direction chosen | Done | Editorial imersivo + hub de comunidades |
| Brand assets collected | **Provisional** | Placeholders in code; awaiting official logo, colors, photos |
| Content questionnaire | Done | V1 essencial; defaults for motion/menu documented below |
| Implementation slices | Done | V1 scaffold implemented — pending asset swap + user review |

## Goals

- Modern parish website with emphasis on the church and clear hierarchy.
- Subtle, elegant animations where they add polish — not distraction.
- All major decisions pass through the parish team before implementation is considered final.

## Confirmed scope — V1

### Routes

| Rota | Conteúdo |
|------|----------|
| `/` | Hero imersivo + horários rápidos + notícias + comunidades + galeria |
| `/horarios` | Missas, confissões, secretaria, abertura |
| `/comunidades` | Hub das 24 comunidades (grid + busca) |
| `/comunidades/[slug]` | História, fotos, contato local |
| `/noticias` | Grid de notícias |
| `/noticias/[slug]` | Artigo |
| `/paroquia` | História, clero, pastorais resumidas |
| `/contato` | Endereço, formulário, redes, secretaria |
| `/galeria` | Fotos da paróquia |

### Navigation (5 items)

- Paróquia → `/paroquia`
- Comunidades → `/comunidades`
- Horários → `/horarios`
- Notícias → `/noticias`
- Contato → `/contato`

Galeria: seção na home + link no rodapé (not in main nav).

### Home section order

1. Hero — matriz photo, name, pastoral tagline
2. Horários rápidos — summary + link to `/horarios`
3. Notícias — carousel/cards
4. Comunidades — 8 featured + link to all 24
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
- [x] Floating side button — **no**

### Content & data

- [x] Content source — static TypeScript files in `src/content/`
- [ ] Mass times — placeholder data; confirm matrix vs per-community
- [ ] 24 communities — placeholder names; awaiting official list
- [ ] News — sample articles for layout; replace with real content

## Assets needed from parish

| Asset | Status | Notes |
|-------|--------|-------|
| Logo | Placeholder | `public/logo.svg` — replace with official PNG/SVG |
| Color palette | Provisional | Update `globals.css` tokens when received |
| Church photos (hero/gallery) | Placeholder | Gradient/placeholder blocks until photos provided |
| Community list + slugs | Placeholder | 24 entries in `src/content/communities.ts` |
| Community stories & photos | Placeholder | Per-community pages ready for content swap |
| Mass schedule data | Placeholder | `src/content/schedules.ts` |
| News samples | Placeholder | 6 sample articles in `src/content/news.ts` |
| Hero tagline | Placeholder | `src/content/site.ts` — `heroTagline` |
| Contact address / map / social | Placeholder | `src/content/site.ts` |

## Reference material

- [reference-sao-pelegrino.md](./reference-sao-pelegrino.md) — inventory of 24 reference screens

## Implementation log

- **2026-06-28** — V1 scaffold: design tokens, layout (header/footer), all V1 routes, static content placeholders, low-motion scroll reveals.
