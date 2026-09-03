/**
 * Maps parish calendar titles to community slugs.
 *
 * Calendar titles use short forms (`Com.`, `N. Sra.`, neighborhood in
 * parentheses). Community pages use the full names in `communities.ts`.
 * Longest `fragment` match wins, so `Com. Matriz Cristo Rei` beats `Com. Matriz`.
 *
 * `weekly: true` → exact title `Missa ${fragment}` feeds the community timetable.
 * `weekly: false` → modal "Ver comunidade" only (novena, festa, tríduo, …).
 */
export type CommunityMassAlias = {
  slug: string;
  fragment: string;
  weekly: boolean;
};

export const COMMUNITY_MASS_ALIASES: readonly CommunityMassAlias[] = [
  { slug: "comunidade-01", fragment: "Com. Matriz Cristo Rei", weekly: true },
  { slug: "comunidade-01", fragment: "Com. Matriz", weekly: false },
  {
    slug: "comunidade-02",
    fragment: "Com. N. Sra. Aparecida (B. Imigrante)",
    weekly: true,
  },
  { slug: "comunidade-03", fragment: "Com. Santo Antão", weekly: true },
  {
    slug: "comunidade-04",
    fragment: "Com. São Pedro (15 Graciema)",
    weekly: true,
  },
  {
    slug: "comunidade-05",
    fragment: "Com. São Luiz (B. Glória)",
    weekly: true,
  },
  { slug: "comunidade-06", fragment: "Com. N. Sra. de Fátima", weekly: true },
  { slug: "comunidade-06", fragment: "Com. N. Sra. Fátima", weekly: true },
  { slug: "comunidade-07", fragment: "Com. Santa Rita", weekly: true },
  {
    slug: "comunidade-08",
    fragment: "Com. Imaculado C. de Maria (Verona)",
    weekly: true,
  },
  {
    slug: "comunidade-09",
    fragment: "Com. Santo Antônio (Pomarosa II)",
    weekly: true,
  },
  { slug: "comunidade-10", fragment: "Com. Santo Expedito", weekly: true },
  { slug: "comunidade-11", fragment: "Com. Santa Marta", weekly: true },
  {
    slug: "comunidade-12",
    fragment: "Com. N. Sra. das Graças (8 da Graciema)",
    weekly: true,
  },
  {
    slug: "comunidade-13",
    fragment: "Com. São José (Garibaldina)",
    weekly: true,
  },
  {
    slug: "comunidade-14",
    fragment: "Com. N. Sra. de Caravaggio (Tamandaré)",
    weekly: true,
  },
  { slug: "comunidade-15", fragment: "Com. N. Sra. Pompéia", weekly: true },
  { slug: "comunidade-16", fragment: "Com. N. Sra. das Neves", weekly: true },
  { slug: "comunidade-17", fragment: "Com. São Bento", weekly: true },
  { slug: "comunidade-18", fragment: "Com. Almas do Purgatório", weekly: true },
  {
    slug: "comunidade-19",
    fragment: "Com. São José (Sertorina)",
    weekly: true,
  },
  { slug: "comunidade-20", fragment: "Com. Santa Helena", weekly: true },
  { slug: "comunidade-21", fragment: "Com. São Carlos", weekly: true },
  {
    slug: "comunidade-22",
    fragment: "Com. N. Sra da Glória (40 da Leopoldina)",
    weekly: true,
  },
  {
    slug: "comunidade-23",
    fragment: "Com. Sagrado Coração de Jesus (B. Municipal)",
    weekly: true,
  },
  {
    slug: "comunidade-24",
    fragment: "Com. N. Sra. de Lourdes (Ceará da Graciema)",
    weekly: true,
  },
];
