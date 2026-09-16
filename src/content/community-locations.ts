import { googleMapsChurchUrl, siteConfig } from "@/content/site";

export type CommunityLocation = {
  street: string;
  neighborhood: string;
  areaLine: string;
  locality: string;
  postal?: string;
  mapsUrl: string;
};

const LOCALITY = "Bento Gonçalves — RS";

function mapsSearch(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

type ListedLocation = {
  street: string;
  neighborhood: string;
  mapsUrl: string;
};

/**
 * Parish list for display. `mapsUrl` is the official Maps pin when the
 * parish sent one; otherwise a church pin or an address search.
 */
const LISTED_LOCATIONS: Record<string, ListedLocation> = {
  "sao-bento": {
    street: "Rua Henry Hugo Dreher, 610",
    neighborhood: "São Bento",
    mapsUrl: "https://maps.app.goo.gl/w7AAAYbEq1cmyeQJ7",
  },
  "nossa-senhora-aparecida": {
    street: "Rua Venâncio Fiametti, 23",
    neighborhood: "Imigrante",
    mapsUrl: mapsSearch(
      "Igreja Nossa Senhora Aparecida, Rua Venâncio Fiametti, Bairro Imigrante, Bento Gonçalves - RS",
    ),
  },
  "santa-marta": {
    street: "Rua Francisco de Carli, 132",
    neighborhood: "Santa Marta",
    mapsUrl: "https://maps.app.goo.gl/eV7LBmahC42ACJt26",
  },
  "nossa-senhora-de-fatima": {
    street: "Rua Francisco Tomasi, 1070",
    neighborhood: "Fátima",
    mapsUrl: "https://maps.app.goo.gl/DxnJrsewqNq3EJTZA",
  },
  "santa-helena": {
    street: "Rua Amos Perissutti, 541",
    neighborhood: "Santa Helena",
    mapsUrl: mapsSearch(
      "Igreja Santa Helena, Rua Amos Perissutti, 541, Bento Gonçalves - RS",
    ),
  },
  "santo-antao": {
    street: "Rua Nelson Carraro, 375",
    neighborhood: "Santo Antão",
    mapsUrl: "https://maps.app.goo.gl/YfnB21TmAiQxiYpD8",
  },
  "santa-rita": {
    street: "Rua Antônio Michelon, 321",
    neighborhood: "Santa Rita",
    mapsUrl: "https://maps.app.goo.gl/jJGAcmjNVS8TmHPC8",
  },
  "sao-luis": {
    street: "Rua Caxias do Sul, 940",
    neighborhood: "Jardim Glória",
    mapsUrl: "https://maps.app.goo.gl/vk4umxDpSub9rTdb8",
  },
  "sagrado-coracao-de-jesus-municipal": {
    street: "Rua Anunciante Antinolffi, 382",
    neighborhood: "Municipal",
    mapsUrl: "https://maps.app.goo.gl/FhZDT8Q22Ps1ZeSD6",
  },
  "santo-expedito": {
    street: "Rua Lino Colussi, 198",
    neighborhood: "Vinosul",
    mapsUrl: mapsSearch(
      "Igreja Santo Expedito, Rua Lino Colussi, 198, Vinosul, Bento Gonçalves - RS",
    ),
  },
  "sao-carlos": {
    street: "Rua Elói Seccondo, 78",
    neighborhood: "Conceição",
    mapsUrl: "https://maps.app.goo.gl/K5oCfDXwDy1hHoWf8",
  },
  "imaculado-coracao-de-maria": {
    street: "Rua Cantineiro Giacomello, s/n",
    neighborhood: "Verona",
    mapsUrl: mapsSearch(
      "Igreja Imaculado Coração de Maria, Rua Cantineiro Giacomello, Verona, Bento Gonçalves - RS",
    ),
  },
  "santo-antonio-pomarosa-ii": {
    street: "Rua Davile Sandrin",
    neighborhood: "Pomarosa II",
    mapsUrl: "https://maps.app.goo.gl/gSCUGr6pFnNAHiSv5",
  },
  "nossa-senhora-das-neves": {
    street: "Linha 06 da Leopoldina",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/zrz1Qcod159mYaKP7",
  },
  "almas-do-purgatorio": {
    street: "Linha Leopoldina",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/5cJD4rbiUfZ1kcbp7",
  },
  "nossa-senhora-da-gloria-40-da-leopoldina": {
    street: "Linha 40 da Leopoldina",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/63cZ9ok555941ENe9",
  },
  "sao-pedro": {
    street: "Linha 15 da Graciema",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/uyja36nTGSaGoy7q6",
  },
  "nossa-senhora-das-gracas": {
    street: "Linha 08 da Graciema",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/QbxHpeuw6duiQsA98",
  },
  "nossa-senhora-de-lourdes-ceara": {
    street: "Linha Ceará da Graciema",
    neighborhood: "Vale dos Vinhedos",
    mapsUrl: "https://maps.app.goo.gl/K3EErFerSovZvSEk9",
  },
  "nossa-senhora-de-pompeia": {
    street: "Rua Davile Sandri, 330",
    neighborhood: "Vinosul",
    mapsUrl: mapsSearch(
      "Igreja Nossa Senhora de Pompéia, Rua Davile Sandri, 330, Vinosul, Bento Gonçalves - RS",
    ),
  },
  "sao-jose-gruta-da-garibaldina": {
    street: "Estrada Buarque de Macedo, s/n",
    neighborhood: "Garibaldina",
    mapsUrl: "https://maps.app.goo.gl/EJgAeJa8vx3KvDaV9",
  },
  "nossa-senhora-de-caravaggio": {
    street: "Rua José Gava, 1270",
    neighborhood: "Tamandaré",
    mapsUrl: "https://maps.app.goo.gl/LudFCiLRPTshczKd6",
  },
  "sao-jose-sertorina": {
    street: "Linha Sertorina",
    neighborhood: "Sertorina",
    mapsUrl: mapsSearch(
      "Igreja São José da Linha Sertorina, Bento Gonçalves - RS",
    ),
  },
};

export function formatCommunityAreaLine(
  slug: string,
  neighborhood: string,
): string {
  if (slug === "igreja-matriz") return neighborhood;
  if (/^(vale dos vinhedos|sertorina)$/i.test(neighborhood))
    return neighborhood;
  if (/^bairro\s/i.test(neighborhood)) return neighborhood;
  return `Bairro ${neighborhood}`;
}

export function getCommunityLocation(
  slug: string,
): CommunityLocation | undefined {
  if (slug === "igreja-matriz") {
    const { contact } = siteConfig;
    return {
      street: contact.address,
      neighborhood: contact.neighborhood,
      areaLine: contact.neighborhood,
      locality: `${contact.city} — ${contact.state}`,
      postal: `CEP ${contact.postalCode}`,
      mapsUrl: googleMapsChurchUrl(),
    };
  }

  const listed = LISTED_LOCATIONS[slug];
  if (!listed) return undefined;

  return {
    street: listed.street,
    neighborhood: listed.neighborhood,
    areaLine: formatCommunityAreaLine(slug, listed.neighborhood),
    locality: LOCALITY,
    mapsUrl: listed.mapsUrl,
  };
}
