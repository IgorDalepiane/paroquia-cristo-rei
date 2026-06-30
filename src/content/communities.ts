export type Community = {
  slug: string;
  name: string;
  neighborhood: string;
  patron?: string;
  summary: string;
  history: string;
  featured?: boolean;
  massTimes?: string[];
  contact?: string;
};

const PLACEHOLDER_HISTORY =
  "História e memória desta comunidade serão publicadas em breve. Este texto é provisório para revisão de layout — substituir com o conteúdo oficial fornecido pela paróquia.";

const COMMUNITY_NAMES = [
  "Comunidade Igreja Matriz",
  "Comunidade Nossa Senhora Aparecida",
  "Comunidade Santo Antão",
  "Comunidade São Pedro",
  "Comunidade São Luís",
  "Comunidade Nossa Senhora de Fátima",
  "Comunidade Santa Rita",
  "Comunidade Imaculado Coração de Maria",
  "Comunidade Santo Antônio - Pomarosa II",
  "Comunidade Santo Expedito",
  "Comunidade Santa Marta",
  "Comunidade Nossa Senhora das Graças",
  "Comunidade São José - Gruta da Garibaldina",
  "Comunidade Nossa Senhora de Caravaggio",
  "Comunidade Nossa Senhora de Pompéia",
  "Comunidade Nossa Senhora das Neves",
  "Comunidade São Bento",
  "Comunidade das Almas do Purgatório",
  "Comunidade São José - Sertorina",
  "Comunidade Santa Helena",
  "Comunidade São Carlos",
  "Comunidade Nossa Senhora da Glória - 40 da Leopoldina",
  "Comunidade Sagrado Coração de Jesus - Municipal",
  "Comunidade Nossa Senhora de Lourdes - Ceará",
] as const;

function parseCommunityName(name: string): { patron?: string; neighborhood: string } {
  const withoutPrefix = name.replace(/^Comunidade\s+/, "");
  const dashIndex = withoutPrefix.indexOf(" - ");

  if (dashIndex === -1) {
    return {
      patron: withoutPrefix,
      neighborhood: "Bairro a definir",
    };
  }

  return {
    patron: withoutPrefix.slice(0, dashIndex),
    neighborhood: withoutPrefix.slice(dashIndex + 3),
  };
}

function buildCommunity(index: number, name: string): Community {
  const num = String(index).padStart(2, "0");
  const { patron, neighborhood } = parseCommunityName(name);

  return {
    slug: `comunidade-${num}`,
    name,
    neighborhood,
    patron,
    summary: `${name} — informações em atualização.`,
    history: PLACEHOLDER_HISTORY,
    featured: index <= 8,
    massTimes: index % 3 === 0 ? ["Domingo, 19h"] : undefined,
    contact: "Contato local a definir",
  };
}

export const communities: Community[] = COMMUNITY_NAMES.map((name, index) =>
  buildCommunity(index + 1, name),
);

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export function getFeaturedCommunities(limit = 8): Community[] {
  return communities.filter((c) => c.featured).slice(0, limit);
}
