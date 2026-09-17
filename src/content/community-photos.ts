export type CommunityHeroPhoto = {
  src: string;
  /** Downscaled listing thumbnail (`src` with `.card.webp`). */
  cardSrc: string;
  alt: string;
  orientation: "landscape" | "portrait";
  /** Crop so the facade stays in frame. */
  objectPosition?: string;
};

type StoredCommunityHeroPhoto = Omit<CommunityHeroPhoto, "cardSrc">;

/**
 * Place photos from the community's Google Maps pin (or the parish hero
 * for the matriz). Missing slugs keep the layout placeholder.
 */
const COMMUNITY_HERO_PHOTOS: Partial<Record<string, StoredCommunityHeroPhoto>> =
  {
    "igreja-matriz": {
      src: "/images/comunidades/igreja-matriz.webp",
      alt: "Fachada da Paróquia Cristo Rei, com torre gótica e portal dourado",
      orientation: "portrait",
      objectPosition: "center 38%",
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
      alt: "Capela São Pedro, creme, com torre, rosácea e portas de madeira",
      orientation: "portrait",
      objectPosition: "center 38%",
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
      objectPosition: "center 42%",
    },
    "nossa-senhora-aparecida": {
      src: "/images/comunidades/nossa-senhora-aparecida.webp",
      alt: "Igreja Nossa Senhora Aparecida no Bairro Imigrante, com cruz de vidro na fachada",
      orientation: "landscape",
      objectPosition: "center 42%",
    },
    "nossa-senhora-de-fatima": {
      src: "/images/comunidades/nossa-senhora-de-fatima.webp",
      alt: "Capela Nossa Senhora de Fátima, com a imagem na fachada e escadaria",
      orientation: "portrait",
      objectPosition: "center 40%",
    },
    "santa-rita": {
      src: "/images/comunidades/santa-rita.webp",
      alt: "Comunidade Santa Rita, com a placa na fachada",
      orientation: "landscape",
      objectPosition: "center 48%",
    },
    "imaculado-coracao-de-maria": {
      src: "/images/comunidades/imaculado-coracao-de-maria.webp",
      alt: "Comunidade Imaculado Coração de Maria no Bairro Verona",
      orientation: "landscape",
      objectPosition: "center 45%",
    },
    "santa-marta": {
      src: "/images/comunidades/santa-marta.webp",
      alt: "Capela Santa Marta, com torre, cruz e portas de madeira",
      orientation: "portrait",
      objectPosition: "center 38%",
    },
    "nossa-senhora-de-caravaggio": {
      src: "/images/comunidades/nossa-senhora-de-caravaggio.webp",
      alt: "Capela Nossa Senhora de Caravaggio, branca, com torre e porta de madeira",
      orientation: "portrait",
      objectPosition: "center 40%",
    },
    "santa-helena": {
      src: "/images/comunidades/santa-helena.webp",
      alt: "Capela Santa Helena, com portas de madeira e cruz na fachada",
      orientation: "landscape",
      objectPosition: "center 48%",
    },
    "sao-carlos": {
      src: "/images/comunidades/sao-carlos.webp",
      alt: "Capela São Carlos, com torre e medalhão na fachada",
      orientation: "portrait",
      objectPosition: "center 40%",
    },
    "sagrado-coracao-de-jesus-municipal": {
      src: "/images/comunidades/sagrado-coracao-de-jesus-municipal.webp",
      alt: "Capela Sagrado Coração de Jesus, branca, com torre e cruz dourada",
      orientation: "portrait",
      objectPosition: "center 35%",
    },
    "nossa-senhora-de-lourdes-ceara": {
      src: "/images/comunidades/nossa-senhora-de-lourdes-ceara.webp",
      alt: "Gruta de Nossa Senhora de Lourdes na Linha Ceará da Graciema",
      orientation: "landscape",
      objectPosition: "25% 48%",
    },
  };

export function communityCardSrc(src: string): string {
  return src.replace(/\.webp$/i, ".card.webp");
}

export function getCommunityHeroPhoto(
  slug: string,
): CommunityHeroPhoto | undefined {
  const photo = COMMUNITY_HERO_PHOTOS[slug];
  if (!photo) return undefined;
  return { ...photo, cardSrc: communityCardSrc(photo.src) };
}
