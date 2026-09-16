export type CommunityHeroPhoto = {
  src: string;
  alt: string;
  orientation: "landscape" | "portrait";
  /** Crop so the facade stays in frame. */
  objectPosition?: string;
};

/**
 * Place photos from the community's Google Maps pin (or the parish hero
 * for the matriz). Missing slugs keep the layout placeholder.
 */
const COMMUNITY_HERO_PHOTOS: Partial<Record<string, CommunityHeroPhoto>> = {
  "igreja-matriz": {
    src: "/images/igreja-hero.webp",
    alt: "Fachada da Paróquia Cristo Rei com torre e cruz",
    orientation: "landscape",
    objectPosition: "center 35%",
  },
  "sao-bento": {
    src: "/images/comunidades/sao-bento.webp",
    alt: "Igreja São Bento em um dia de sol, com cerejeiras em flor",
    orientation: "landscape",
    objectPosition: "center 42%",
  },
  "santo-antao": {
    src: "/images/comunidades/santo-antao.webp",
    alt: "Capela Santo Antão vista de lado em um dia claro",
    orientation: "portrait",
    objectPosition: "center 38%",
  },
  "sao-pedro": {
    src: "/images/comunidades/sao-pedro.webp",
    alt: "Capela São Pedro iluminada à noite",
    orientation: "portrait",
    objectPosition: "center 40%",
  },
  "sao-luis": {
    src: "/images/comunidades/sao-luis.webp",
    alt: "Capela São Luiz com fachada de pedra e cruz dourada",
    orientation: "landscape",
    objectPosition: "center 45%",
  },
  "santo-antonio-pomarosa-ii": {
    src: "/images/comunidades/santo-antonio-pomarosa-ii.webp",
    alt: "Capela Santo Antônio no Pomarosa II",
    orientation: "portrait",
    objectPosition: "center 42%",
  },
  "nossa-senhora-das-neves": {
    src: "/images/comunidades/nossa-senhora-das-neves.webp",
    alt: "Capela Nossa Senhora das Neves, de 1907",
    orientation: "portrait",
    objectPosition: "center 32%",
  },
  "nossa-senhora-das-gracas": {
    src: "/images/comunidades/nossa-senhora-das-gracas.webp",
    alt: "Capela Nossa Senhora das Graças, na Graciema",
    orientation: "portrait",
    objectPosition: "center 35%",
  },
  "sao-jose-gruta-da-garibaldina": {
    src: "/images/comunidades/sao-jose-gruta-da-garibaldina.webp",
    alt: "Capela São José da Garibaldina em um dia de céu azul",
    orientation: "portrait",
    objectPosition: "center 28%",
  },
  "almas-do-purgatorio": {
    src: "/images/comunidades/almas-do-purgatorio.webp",
    alt: "Capela das Almas do Purgatório na Linha Leopoldina",
    orientation: "portrait",
    objectPosition: "center 35%",
  },
  "nossa-senhora-da-gloria-40-da-leopoldina": {
    src: "/images/comunidades/nossa-senhora-da-gloria-40-da-leopoldina.webp",
    alt: "Capela Nossa Senhora da Glória na Linha 40 da Leopoldina",
    orientation: "portrait",
    objectPosition: "center 28%",
  },
  "santo-expedito": {
    src: "/images/comunidades/santo-expedito.webp",
    alt: "Capela da Comunidade Santo Expedito, no Vinosul",
    orientation: "landscape",
    objectPosition: "center 42%",
  },
  "sao-jose-sertorina": {
    src: "/images/comunidades/sao-jose-sertorina.webp",
    alt: "Capela São José da Linha Sertorina, de 1760",
    orientation: "landscape",
    objectPosition: "center 45%",
  },
  "nossa-senhora-de-pompeia": {
    src: "/images/comunidades/nossa-senhora-de-pompeia.webp",
    alt: "Capela Nossa Senhora de Pompéia, com a sigla NSOP na fachada",
    orientation: "portrait",
    objectPosition: "center 72%",
  },
  "nossa-senhora-aparecida": {
    src: "/images/comunidades/nossa-senhora-aparecida.webp",
    alt: "Igreja Nossa Senhora Aparecida no Bairro Imigrante, à noite",
    orientation: "portrait",
    objectPosition: "center 70%",
  },
};

export function getCommunityHeroPhoto(
  slug: string,
): CommunityHeroPhoto | undefined {
  return COMMUNITY_HERO_PHOTOS[slug];
}
