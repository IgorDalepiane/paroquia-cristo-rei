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

| Rota                    | Conteúdo                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| `/`                     | Hero imersivo + horários rápidos + notícias + comunidades + galeria         |
| `/horarios`             | Missas, confissões, secretaria, abertura                                    |
| `/comunidades`          | Hub das 24 comunidades (grid + busca)                                       |
| `/comunidades/[slug]`   | História, fotos, contato local — slug pelo nome (`/comunidades/santa-rita`) |
| `/galeria`              | Hub da galeria: entrada para vitrais + fotos da paróquia (placeholders)     |
| `/galeria/vitrais`      | Passeio pelos vitrais da matriz                                             |
| `/noticias`             | Grid de notícias                                                            |
| `/noticias/[slug]`      | Artigo                                                                      |
| `/paroquia`             | História, clero, pastorais resumidas                                        |
| `/contato`              | Igreja, secretaria (com horário) e programador                              |
| `/festa`                | Hub da 80ª Festa de Cristo Rei (almoço em destaque; bingo como realizado)   |
| `/festa/almoco-festivo` | Almoço festivo: ingresso, missa, cardápio, valores, reserva por WhatsApp    |
| `/festa/bingo`          | Noite de bingo — ação entre amigos: ingresso esgotado, brindes              |

### Navigation

- Paróquia → `/paroquia` (fora do menu por enquanto; só por URL)
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
- [x] Campaign FAB — Almoço festivo chip (parish red, bottom-right, soft pulsing halo; static under reduced motion) on all routes except `/festa*`, through 22 Nov 2026 (America/Sao_Paulo); links to `/festa/almoco-festivo`. Previously the Bingo chip through 2 Oct 2026.

### Content & data

- [x] Content source — static TypeScript files in `src/content/`
- [ ] Mass times — placeholder data; confirm matrix vs per-community
- [ ] 24 communities — placeholder names; awaiting official list
- [ ] News — sample articles for layout; replace with real content

## Assets needed from parish

| Asset                          | Status      | Notes                                                                   |
| ------------------------------ | ----------- | ----------------------------------------------------------------------- |
| Logo                           | Placeholder | `public/logo.svg` — replace with official PNG/SVG                       |
| Color palette                  | Provisional | Update `globals.css` tokens when received                               |
| Church photos (hero/gallery)   | Partial     | Hero uses church photo; home mosaic + `/galeria` entry point to vitrais |
| Community list + slugs         | In use      | Name slugs in `communities.ts`; old `comunidade-NN` URLs redirect       |
| Community stories & photos     | Placeholder | Per-community pages ready for content swap                              |
| Mass schedule data             | Placeholder | `src/content/schedules.ts`                                              |
| News samples                   | Placeholder | 6 sample articles in `src/content/news.ts`                              |
| Hero tagline                   | Placeholder | `src/content/site.ts` — `heroTagline`                                   |
| Contact address / map / social | In use      | Instagram + Facebook in `site.ts`; YouTube still empty                  |
| 80ª Festa seal                 | In use      | Transparent PNG `logo-80-anos.png` on `/festa`                          |
| Bingo ticket art               | In use      | `public/images/festa/ingresso-bingo.jpg` on `/festa/bingo`              |
| Almoço ticket art              | In use      | `public/images/festa/ingresso-almoco.jpg` on `/festa/almoco-festivo`    |

## Reference material

- [reference-sao-pelegrino.md](./reference-sao-pelegrino.md) — inventory of 24 reference screens

## Implementation log

- **2026-06-28** — V1 scaffold: design tokens, layout (header/footer), all V1 routes, static content placeholders, low-motion scroll reveals.
- **2026-09-11** — 80ª Festa hub + bingo page (ação entre amigos, no e-commerce, prize names without per-item R$); site-wide Bingo FAB; parish Instagram in footer/contato.
- **2026-09-16** — Contato has three cards: church, secretariat (hours included), programmer. Footer shows version and programmer credit above copyright.
- **2026-09-16** — Paróquia menu item hidden (header, footer, home cards); `/paroquia` still live.
- **2026-09-30** — Bingo tickets sold out: `/festa/bingo` CTA and how-to section show Esgotado (no WhatsApp/Instagram purchase); `/festa` invite updated.
- **2026-11-06** — Almoço festivo page (22 Nov: Missa Solene 9h30 na matriz, almoço 12h na Santa Marta; cardápio; R$ 100 / R$ 50 de 7 a 12 anos / até 6 não pagam; reserva com festeiros por WhatsApp + Instagram; no sponsors list). `/festa` leads with the almoço; bingo card marked Realizado. FAB switched to the almoço with a pulsing halo.
