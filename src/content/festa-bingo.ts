export const festaBingo = {
  editionLabel: "80ª Festa de Cristo Rei",
  hubIntro:
    "A edição de 2026 da festa da paróquia. A programação completa entra nesta página quando estiver fechada; a Noite de bingo — ação entre amigos — já tem data, local e ingresso.",
  title: "Noite de bingo",
  legalSubtitle: "Ação entre amigos",
  dateLabel: "2 de outubro de 2026",
  dateShortLabel: "2 out",
  timeLabel: "19h30",
  placeLabel: "Comunidade Santa Rita",
  priceLabel: "R$ 30,00 (8 rodadas)",
  extraCardsNote:
    "Cartelas adicionais e a rodada extra são vendidas no dia do evento.",
  prizesHook: "Mais de R$ 20.000,00 em prêmios",
  foodNote: "Comida e bebida à venda no local.",
  solidarity:
    "Durante o evento serão arrecadados alimentos não perecíveis para a Cáritas — Cristo Rei.",
  invite: "Reserve seu ingresso e venha com a gente.",
  buyFesteiros: "Com os festeiros da 80ª Festa",
  festeiroPhoneLabel: "(54) 9 9616-5918",
  festeiroPhoneTel: "+5554996165918",
  festeiroWhatsapp: "5554996165918",
  whatsappMessage:
    "Olá, vim pelo site da paróquia e gostaria de adquirir ingressos do bingo.",
  instagramHandle: "@paroquiacristoreibg",
  campaignLastDay: "2026-10-02",
  logo: {
    src: "/images/festa/logo-80-anos.png",
    width: 359,
    height: 317,
    alt: "Selo da 80ª Festa de Cristo Rei — Bento Gonçalves, RS",
  },
  ticket: {
    src: "/images/festa/ingresso-bingo.jpg",
    width: 1800,
    height: 1075,
    alt: "Ingresso do bingo da 80ª Festa de Cristo Rei: 2 de outubro de 2026, 19h30, Comunidade Santa Rita",
  },
} as const;

export type BingoRound = {
  id: string;
  label: string;
  extra?: boolean;
  corners: string[];
  full: string[];
};

export const bingoRounds: BingoRound[] = [
  {
    id: "1",
    label: "1ª rodada",
    corners: ["3 almofadas", "Cadeira"],
    full: ["Bolsa Arezzo", "2 aparadores"],
  },
  {
    id: "2",
    label: "2ª rodada",
    corners: ["Mesa para escritório", "Pufe"],
    full: ["Mesa de apoio", "Vale-almoço Zandonai"],
  },
  {
    id: "3",
    label: "3ª rodada",
    corners: ["Móvel de ferramentas", "Estúdio Paula Araújo"],
    full: ["Cozinha completa", "Sapateira"],
  },
  {
    id: "4",
    label: "4ª rodada",
    corners: ["Espelho", "Porta-vinho de couro"],
    full: ["Cama com sapateira", "Vale Estúdio Angela Matias"],
  },
  {
    id: "5",
    label: "5ª rodada",
    corners: ["Balcão com rodízio", "Medalha de ouro"],
    full: ["Cama baú solteiro", "Par de brincos", "Ducha elétrica"],
  },
  {
    id: "6",
    label: "6ª rodada",
    corners: ["Puff", "Clínica estética", "Voucher de academia"],
    full: ["Cama de casal de parede", "Cadeira com rodízio"],
  },
  {
    id: "7",
    label: "7ª rodada",
    corners: ["Criado-mudo", "Gaveteiro"],
    full: ["Puff", "Estante de livros"],
  },
  {
    id: "8",
    label: "8ª rodada",
    corners: ["2 banquetas", "Estante de canto (BRV)"],
    full: ["Aparador", "Almoço da Cristofoli"],
  },
  {
    id: "extra",
    label: "Rodada extra",
    extra: true,
    corners: ["Voucher de voo", "Luminária Anceski", "Cama casal baú (BRV)"],
    full: ["Tablet", "Poltrona", "Puff Anceski"],
  },
];

const campaignDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Inclusive through the bingo night (2 Oct 2026) in Bento Gonçalves. */
export function isBingoCampaignLive(now = new Date()): boolean {
  return campaignDayFormatter.format(now) <= festaBingo.campaignLastDay;
}

/** Opens WhatsApp with the draft filled in; does not send. */
export function bingoWhatsappUrl(): string {
  return `https://wa.me/${festaBingo.festeiroWhatsapp}?text=${encodeURIComponent(festaBingo.whatsappMessage)}`;
}
