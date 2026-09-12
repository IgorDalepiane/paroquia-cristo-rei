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
  { slug: "igreja-matriz", fragment: "Com. Matriz Cristo Rei", weekly: true },
  { slug: "igreja-matriz", fragment: "Com. Matriz", weekly: false },
  {
    slug: "nossa-senhora-aparecida",
    fragment: "Com. N. Sra. Aparecida (B. Imigrante)",
    weekly: true,
  },
  { slug: "santo-antao", fragment: "Com. Santo Antão", weekly: true },
  {
    slug: "sao-pedro",
    fragment: "Com. São Pedro (15 Graciema)",
    weekly: true,
  },
  {
    slug: "sao-luis",
    fragment: "Com. São Luiz (B. Glória)",
    weekly: true,
  },
  {
    slug: "nossa-senhora-de-fatima",
    fragment: "Com. N. Sra. de Fátima",
    weekly: true,
  },
  {
    slug: "nossa-senhora-de-fatima",
    fragment: "Com. N. Sra. Fátima",
    weekly: true,
  },
  { slug: "santa-rita", fragment: "Com. Santa Rita", weekly: true },
  {
    slug: "imaculado-coracao-de-maria",
    fragment: "Com. Imaculado C. de Maria (Verona)",
    weekly: true,
  },
  {
    slug: "santo-antonio-pomarosa-ii",
    fragment: "Com. Santo Antônio (Pomarosa II)",
    weekly: true,
  },
  { slug: "santo-expedito", fragment: "Com. Santo Expedito", weekly: true },
  { slug: "santa-marta", fragment: "Com. Santa Marta", weekly: true },
  {
    slug: "nossa-senhora-das-gracas",
    fragment: "Com. N. Sra. das Graças (8 da Graciema)",
    weekly: true,
  },
  {
    slug: "sao-jose-gruta-da-garibaldina",
    fragment: "Com. São José (Garibaldina)",
    weekly: true,
  },
  {
    slug: "nossa-senhora-de-caravaggio",
    fragment: "Com. N. Sra. de Caravaggio (Tamandaré)",
    weekly: true,
  },
  {
    slug: "nossa-senhora-de-pompeia",
    fragment: "Com. N. Sra. Pompéia",
    weekly: true,
  },
  {
    slug: "nossa-senhora-das-neves",
    fragment: "Com. N. Sra. das Neves",
    weekly: true,
  },
  { slug: "sao-bento", fragment: "Com. São Bento", weekly: true },
  {
    slug: "almas-do-purgatorio",
    fragment: "Com. Almas do Purgatório",
    weekly: true,
  },
  {
    slug: "sao-jose-sertorina",
    fragment: "Com. São José (Sertorina)",
    weekly: true,
  },
  { slug: "santa-helena", fragment: "Com. Santa Helena", weekly: true },
  { slug: "sao-carlos", fragment: "Com. São Carlos", weekly: true },
  {
    slug: "nossa-senhora-da-gloria-40-da-leopoldina",
    fragment: "Com. N. Sra da Glória (40 da Leopoldina)",
    weekly: true,
  },
  {
    slug: "sagrado-coracao-de-jesus-municipal",
    fragment: "Com. Sagrado Coração de Jesus (B. Municipal)",
    weekly: true,
  },
  {
    slug: "nossa-senhora-de-lourdes-ceara",
    fragment: "Com. N. Sra. de Lourdes (Ceará da Graciema)",
    weekly: true,
  },
];
