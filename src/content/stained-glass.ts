export type StainedGlassShot = {
  id: string;
  src: string;
  alt: string;
};

export type StainedGlassWindow = {
  slug: string;
  title: string;
  shots: StainedGlassShot[];
  story: string;
};

export type StainedGlassFace = {
  slug: string;
  title: string;
  src: string;
};

function story(title: string) {
  return `Este é o vitral ${title}, na igreja matriz. Em breve a história desta obra será publicada aqui.`;
}

export const stainedGlassWindows: StainedGlassWindow[] = [
  {
    slug: "moises",
    title: "Moisés",
    shots: [
      {
        id: "moises-1",
        src: "/images/vitrais/moises/vertical.webp",
        alt: "Vitral Moisés",
      },
      {
        id: "moises-2",
        src: "/images/vitrais/moises/02.webp",
        alt: "Vitral Moisés, vista 2",
      },
      {
        id: "moises-3",
        src: "/images/vitrais/moises/03.webp",
        alt: "Vitral Moisés, vista 3",
      },
    ],
    story: story("Moisés"),
  },
  {
    slug: "sacrificio-de-abraao",
    title: "Sacrifício de Abraão",
    shots: [
      {
        id: "sacrificio-de-abraao-1",
        src: "/images/vitrais/sacrificio-de-abraao/vertical.webp",
        alt: "Vitral Sacrifício de Abraão",
      },
      {
        id: "sacrificio-de-abraao-2",
        src: "/images/vitrais/sacrificio-de-abraao/02.webp",
        alt: "Vitral Sacrifício de Abraão, vista 2",
      },
      {
        id: "sacrificio-de-abraao-3",
        src: "/images/vitrais/sacrificio-de-abraao/03.webp",
        alt: "Vitral Sacrifício de Abraão, vista 3",
      },
      {
        id: "sacrificio-de-abraao-4",
        src: "/images/vitrais/sacrificio-de-abraao/04.webp",
        alt: "Vitral Sacrifício de Abraão, vista 4",
      },
      {
        id: "sacrificio-de-abraao-5",
        src: "/images/vitrais/sacrificio-de-abraao/05.webp",
        alt: "Vitral Sacrifício de Abraão, vista 5",
      },
      {
        id: "sacrificio-de-abraao-6",
        src: "/images/vitrais/sacrificio-de-abraao/06.webp",
        alt: "Vitral Sacrifício de Abraão, vista 6",
      },
    ],
    story: story("Sacrifício de Abraão"),
  },
  {
    slug: "nascimento",
    title: "Nascimento",
    shots: [
      {
        id: "nascimento-1",
        src: "/images/vitrais/nascimento/vertical.webp",
        alt: "Vitral Nascimento",
      },
      {
        id: "nascimento-2",
        src: "/images/vitrais/nascimento/02.webp",
        alt: "Vitral Nascimento, vista 2",
      },
      {
        id: "nascimento-3",
        src: "/images/vitrais/nascimento/03.webp",
        alt: "Vitral Nascimento, vista 3",
      },
      {
        id: "nascimento-4",
        src: "/images/vitrais/nascimento/04.webp",
        alt: "Vitral Nascimento, vista 4",
      },
      {
        id: "nascimento-5",
        src: "/images/vitrais/nascimento/05.webp",
        alt: "Vitral Nascimento, vista 5",
      },
    ],
    story: story("Nascimento"),
  },
  {
    slug: "fuga-para-o-egito",
    title: "Fuga para o Egito",
    shots: [
      {
        id: "fuga-para-o-egito-1",
        src: "/images/vitrais/fuga-para-o-egito/vertical.webp",
        alt: "Vitral Fuga para o Egito",
      },
      {
        id: "fuga-para-o-egito-2",
        src: "/images/vitrais/fuga-para-o-egito/02.webp",
        alt: "Vitral Fuga para o Egito, vista 2",
      },
      {
        id: "fuga-para-o-egito-3",
        src: "/images/vitrais/fuga-para-o-egito/03.webp",
        alt: "Vitral Fuga para o Egito, vista 3",
      },
      {
        id: "fuga-para-o-egito-4",
        src: "/images/vitrais/fuga-para-o-egito/04.webp",
        alt: "Vitral Fuga para o Egito, vista 4",
      },
      {
        id: "fuga-para-o-egito-5",
        src: "/images/vitrais/fuga-para-o-egito/05.webp",
        alt: "Vitral Fuga para o Egito, vista 5",
      },
    ],
    story: story("Fuga para o Egito"),
  },
  {
    slug: "encontro-de-jesus-no-templo",
    title: "Encontro de Jesus no templo",
    shots: [
      {
        id: "encontro-de-jesus-no-templo-1",
        src: "/images/vitrais/encontro-de-jesus-no-templo/vertical.webp",
        alt: "Vitral Encontro de Jesus no templo",
      },
      {
        id: "encontro-de-jesus-no-templo-2",
        src: "/images/vitrais/encontro-de-jesus-no-templo/02.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 2",
      },
      {
        id: "encontro-de-jesus-no-templo-3",
        src: "/images/vitrais/encontro-de-jesus-no-templo/03.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 3",
      },
      {
        id: "encontro-de-jesus-no-templo-4",
        src: "/images/vitrais/encontro-de-jesus-no-templo/04.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 4",
      },
      {
        id: "encontro-de-jesus-no-templo-5",
        src: "/images/vitrais/encontro-de-jesus-no-templo/05.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 5",
      },
      {
        id: "encontro-de-jesus-no-templo-6",
        src: "/images/vitrais/encontro-de-jesus-no-templo/06.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 6",
      },
      {
        id: "encontro-de-jesus-no-templo-7",
        src: "/images/vitrais/encontro-de-jesus-no-templo/07.webp",
        alt: "Vitral Encontro de Jesus no templo, vista 7",
      },
    ],
    story: story("Encontro de Jesus no templo"),
  },
  {
    slug: "batismo-de-jesus",
    title: "Batismo de Jesus",
    shots: [
      {
        id: "batismo-de-jesus-1",
        src: "/images/vitrais/batismo-de-jesus/vertical.webp",
        alt: "Vitral Batismo de Jesus",
      },
      {
        id: "batismo-de-jesus-2",
        src: "/images/vitrais/batismo-de-jesus/02.webp",
        alt: "Vitral Batismo de Jesus, vista 2",
      },
      {
        id: "batismo-de-jesus-3",
        src: "/images/vitrais/batismo-de-jesus/03.webp",
        alt: "Vitral Batismo de Jesus, vista 3",
      },
      {
        id: "batismo-de-jesus-4",
        src: "/images/vitrais/batismo-de-jesus/04.webp",
        alt: "Vitral Batismo de Jesus, vista 4",
      },
    ],
    story: story("Batismo de Jesus"),
  },
  {
    slug: "bodas-de-canaa",
    title: "Bodas de Canaã",
    shots: [
      {
        id: "bodas-de-canaa-1",
        src: "/images/vitrais/bodas-de-canaa/vertical.webp",
        alt: "Vitral Bodas de Canaã",
      },
      {
        id: "bodas-de-canaa-2",
        src: "/images/vitrais/bodas-de-canaa/02.webp",
        alt: "Vitral Bodas de Canaã, vista 2",
      },
      {
        id: "bodas-de-canaa-3",
        src: "/images/vitrais/bodas-de-canaa/03.webp",
        alt: "Vitral Bodas de Canaã, vista 3",
      },
      {
        id: "bodas-de-canaa-4",
        src: "/images/vitrais/bodas-de-canaa/04.webp",
        alt: "Vitral Bodas de Canaã, vista 4",
      },
      {
        id: "bodas-de-canaa-5",
        src: "/images/vitrais/bodas-de-canaa/05.webp",
        alt: "Vitral Bodas de Canaã, vista 5",
      },
      {
        id: "bodas-de-canaa-6",
        src: "/images/vitrais/bodas-de-canaa/06.webp",
        alt: "Vitral Bodas de Canaã, vista 6",
      },
    ],
    story: story("Bodas de Canaã"),
  },
  {
    slug: "samaritana",
    title: "Samaritana",
    shots: [
      {
        id: "samaritana-1",
        src: "/images/vitrais/samaritana/vertical.webp",
        alt: "Vitral Samaritana",
      },
      {
        id: "samaritana-2",
        src: "/images/vitrais/samaritana/02.webp",
        alt: "Vitral Samaritana, vista 2",
      },
      {
        id: "samaritana-3",
        src: "/images/vitrais/samaritana/03.webp",
        alt: "Vitral Samaritana, vista 3",
      },
      {
        id: "samaritana-4",
        src: "/images/vitrais/samaritana/04.webp",
        alt: "Vitral Samaritana, vista 4",
      },
      {
        id: "samaritana-5",
        src: "/images/vitrais/samaritana/05.webp",
        alt: "Vitral Samaritana, vista 5",
      },
    ],
    story: story("Samaritana"),
  },
  {
    slug: "multiplicacao-dos-paes",
    title: "Multiplicação dos pães",
    shots: [
      {
        id: "multiplicacao-dos-paes-1",
        src: "/images/vitrais/multiplicacao-dos-paes/vertical.webp",
        alt: "Vitral Multiplicação dos pães",
      },
      {
        id: "multiplicacao-dos-paes-2",
        src: "/images/vitrais/multiplicacao-dos-paes/02.webp",
        alt: "Vitral Multiplicação dos pães, vista 2",
      },
      {
        id: "multiplicacao-dos-paes-3",
        src: "/images/vitrais/multiplicacao-dos-paes/03.webp",
        alt: "Vitral Multiplicação dos pães, vista 3",
      },
      {
        id: "multiplicacao-dos-paes-4",
        src: "/images/vitrais/multiplicacao-dos-paes/04.webp",
        alt: "Vitral Multiplicação dos pães, vista 4",
      },
      {
        id: "multiplicacao-dos-paes-5",
        src: "/images/vitrais/multiplicacao-dos-paes/05.webp",
        alt: "Vitral Multiplicação dos pães, vista 5",
      },
    ],
    story: story("Multiplicação dos pães"),
  },
  {
    slug: "pesca-milagrosa",
    title: "Pesca milagrosa",
    shots: [
      {
        id: "pesca-milagrosa-1",
        src: "/images/vitrais/pesca-milagrosa/vertical.webp",
        alt: "Vitral Pesca milagrosa",
      },
      {
        id: "pesca-milagrosa-2",
        src: "/images/vitrais/pesca-milagrosa/02.webp",
        alt: "Vitral Pesca milagrosa, vista 2",
      },
      {
        id: "pesca-milagrosa-3",
        src: "/images/vitrais/pesca-milagrosa/03.webp",
        alt: "Vitral Pesca milagrosa, vista 3",
      },
      {
        id: "pesca-milagrosa-4",
        src: "/images/vitrais/pesca-milagrosa/04.webp",
        alt: "Vitral Pesca milagrosa, vista 4",
      },
    ],
    story: story("Pesca milagrosa"),
  },
  {
    slug: "primado-de-pedro",
    title: "Primado de Pedro",
    shots: [
      {
        id: "primado-de-pedro-1",
        src: "/images/vitrais/primado-de-pedro/vertical.webp",
        alt: "Vitral Primado de Pedro",
      },
      {
        id: "primado-de-pedro-2",
        src: "/images/vitrais/primado-de-pedro/02.webp",
        alt: "Vitral Primado de Pedro, vista 2",
      },
      {
        id: "primado-de-pedro-3",
        src: "/images/vitrais/primado-de-pedro/03.webp",
        alt: "Vitral Primado de Pedro, vista 3",
      },
      {
        id: "primado-de-pedro-4",
        src: "/images/vitrais/primado-de-pedro/04.webp",
        alt: "Vitral Primado de Pedro, vista 4",
      },
      {
        id: "primado-de-pedro-5",
        src: "/images/vitrais/primado-de-pedro/05.webp",
        alt: "Vitral Primado de Pedro, vista 5",
      },
      {
        id: "primado-de-pedro-6",
        src: "/images/vitrais/primado-de-pedro/06.webp",
        alt: "Vitral Primado de Pedro, vista 6",
      },
    ],
    story: story("Primado de Pedro"),
  },
  {
    slug: "entrada-em-jerusalem",
    title: "Entrada em Jerusalém",
    shots: [
      {
        id: "entrada-em-jerusalem-1",
        src: "/images/vitrais/entrada-em-jerusalem/vertical.webp",
        alt: "Vitral Entrada em Jerusalém",
      },
      {
        id: "entrada-em-jerusalem-2",
        src: "/images/vitrais/entrada-em-jerusalem/02.webp",
        alt: "Vitral Entrada em Jerusalém, vista 2",
      },
      {
        id: "entrada-em-jerusalem-3",
        src: "/images/vitrais/entrada-em-jerusalem/03.webp",
        alt: "Vitral Entrada em Jerusalém, vista 3",
      },
      {
        id: "entrada-em-jerusalem-4",
        src: "/images/vitrais/entrada-em-jerusalem/04.webp",
        alt: "Vitral Entrada em Jerusalém, vista 4",
      },
    ],
    story: story("Entrada em Jerusalém"),
  },
  {
    slug: "eucaristia",
    title: "Eucaristia",
    shots: [
      {
        id: "eucaristia-1",
        src: "/images/vitrais/eucaristia/vertical.webp",
        alt: "Vitral Eucaristia",
      },
      {
        id: "eucaristia-2",
        src: "/images/vitrais/eucaristia/02.webp",
        alt: "Vitral Eucaristia, vista 2",
      },
      {
        id: "eucaristia-3",
        src: "/images/vitrais/eucaristia/03.webp",
        alt: "Vitral Eucaristia, vista 3",
      },
    ],
    story: story("Eucaristia"),
  },
  {
    slug: "agonia",
    title: "Agonia",
    shots: [
      {
        id: "agonia-1",
        src: "/images/vitrais/agonia/vertical.webp",
        alt: "Vitral Agonia",
      },
      {
        id: "agonia-2",
        src: "/images/vitrais/agonia/02.webp",
        alt: "Vitral Agonia, vista 2",
      },
      {
        id: "agonia-3",
        src: "/images/vitrais/agonia/03.webp",
        alt: "Vitral Agonia, vista 3",
      },
      {
        id: "agonia-4",
        src: "/images/vitrais/agonia/04.webp",
        alt: "Vitral Agonia, vista 4",
      },
      {
        id: "agonia-5",
        src: "/images/vitrais/agonia/05.webp",
        alt: "Vitral Agonia, vista 5",
      },
      {
        id: "agonia-6",
        src: "/images/vitrais/agonia/06.webp",
        alt: "Vitral Agonia, vista 6",
      },
      {
        id: "agonia-7",
        src: "/images/vitrais/agonia/07.webp",
        alt: "Vitral Agonia, vista 7",
      },
    ],
    story: story("Agonia"),
  },
  {
    slug: "paixao",
    title: "Paixão",
    shots: [
      {
        id: "paixao-1",
        src: "/images/vitrais/paixao/vertical.webp",
        alt: "Vitral Paixão",
      },
      {
        id: "paixao-2",
        src: "/images/vitrais/paixao/02.webp",
        alt: "Vitral Paixão, vista 2",
      },
      {
        id: "paixao-3",
        src: "/images/vitrais/paixao/03.webp",
        alt: "Vitral Paixão, vista 3",
      },
      {
        id: "paixao-4",
        src: "/images/vitrais/paixao/04.webp",
        alt: "Vitral Paixão, vista 4",
      },
      {
        id: "paixao-5",
        src: "/images/vitrais/paixao/05.webp",
        alt: "Vitral Paixão, vista 5",
      },
      {
        id: "paixao-6",
        src: "/images/vitrais/paixao/06.webp",
        alt: "Vitral Paixão, vista 6",
      },
      {
        id: "paixao-7",
        src: "/images/vitrais/paixao/07.webp",
        alt: "Vitral Paixão, vista 7",
      },
    ],
    story: story("Paixão"),
  },
  {
    slug: "ressurreicao",
    title: "Ressurreição",
    shots: [
      {
        id: "ressurreicao-1",
        src: "/images/vitrais/ressurreicao/vertical.webp",
        alt: "Vitral Ressurreição",
      },
      {
        id: "ressurreicao-2",
        src: "/images/vitrais/ressurreicao/02.webp",
        alt: "Vitral Ressurreição, vista 2",
      },
      {
        id: "ressurreicao-3",
        src: "/images/vitrais/ressurreicao/03.webp",
        alt: "Vitral Ressurreição, vista 3",
      },
    ],
    story: story("Ressurreição"),
  },
];

export const stainedGlassFaces: StainedGlassFace[] = [
  {
    slug: "nascimento",
    title: "Nascimento",
    src: "/images/vitrais/rosto/nascimento.webp",
  },
  {
    slug: "fuga-para-o-egito",
    title: "Fuga para o Egito",
    src: "/images/vitrais/rosto/fuga-para-o-egito.webp",
  },
  {
    slug: "encontro-de-jesus-no-templo",
    title: "Encontro de Jesus no templo",
    src: "/images/vitrais/rosto/encontro-de-jesus-no-templo.webp",
  },
  {
    slug: "batismo-de-jesus",
    title: "Batismo de Jesus",
    src: "/images/vitrais/rosto/batismo-de-jesus.webp",
  },
  {
    slug: "bodas-de-canaa",
    title: "Bodas de Canaã",
    src: "/images/vitrais/rosto/bodas-de-canaa.webp",
  },
  {
    slug: "samaritana",
    title: "Samaritana",
    src: "/images/vitrais/rosto/samaritana.webp",
  },
  {
    slug: "multiplicacao-dos-paes",
    title: "Multiplicação dos pães",
    src: "/images/vitrais/rosto/multiplicacao-dos-paes.webp",
  },
  {
    slug: "pesca-milagrosa",
    title: "Pesca milagrosa",
    src: "/images/vitrais/rosto/pesca-milagrosa.webp",
  },
  {
    slug: "primado-de-pedro",
    title: "Primado de Pedro",
    src: "/images/vitrais/rosto/primado-de-pedro.webp",
  },
  {
    slug: "entrada-em-jerusalem",
    title: "Entrada em Jerusalém",
    src: "/images/vitrais/rosto/entrada-em-jerusalem.webp",
  },
  {
    slug: "agonia",
    title: "Agonia",
    src: "/images/vitrais/rosto/agonia.webp",
  },
  {
    slug: "paixao",
    title: "Paixão",
    src: "/images/vitrais/rosto/paixao.webp",
  },
  {
    slug: "ressurreicao",
    title: "Ressurreição",
    src: "/images/vitrais/rosto/ressurreicao.webp",
  },
];

const entrySlugs = new Set([
  "nascimento",
  "batismo-de-jesus",
  "eucaristia",
  "paixao",
  "ressurreicao",
]);

export const stainedGlassEntryWindows = stainedGlassWindows.filter((piece) =>
  entrySlugs.has(piece.slug),
);
