export const festaAlmoco = {
  title: "Almoço festivo",
  hubIntro:
    "O Almoço festivo encerra a 80ª Festa de Cristo Rei no domingo, 22 de novembro, depois da Missa Solene na igreja matriz.",
  dateLabel: "22 de novembro de 2026",
  dateShortLabel: "22 nov",
  massTimeLabel: "9h30",
  massPlaceLabel: "Igreja Matriz Cristo Rei",
  timeLabel: "12h",
  placeLabel: "Comunidade Santa Marta",
  priceLabel: "R$ 100,00 · crianças de 7 a 12 anos R$ 50,00",
  prices: [
    { label: "Adulto", value: "R$ 100,00" },
    { label: "Crianças de 7 a 12 anos", value: "R$ 50,00" },
    { label: "Crianças até 6 anos", value: "Não pagam" },
  ],
  menu: [
    "Sopa de capeletti",
    "Carne lessa",
    "Recheio",
    "Galeto",
    "Carne de porco e de gado",
    "Maionese",
    "Salada",
    "Pão",
    "Sobremesa",
  ],
  drinksNote: "Água e vinho servidos durante o almoço.",
  motto: "Ele veio morar entre nós como bom Pastor e Rei servidor.",
  invite: "Reserve seu ingresso e venha celebrar com a gente.",
  buyFesteiros: "Com os festeiros da 80ª Festa",
  festeiroPhoneLabel: "(54) 9 9616-5918",
  festeiroWhatsapp: "5554996165918",
  whatsappMessage:
    "Olá, vim pelo site da paróquia e gostaria de adquirir ingressos do almoço festivo.",
  instagramHandle: "@paroquiacristoreibg",
  campaignLastDay: "2026-11-22",
  ticket: {
    src: "/images/festa/ingresso-almoco.jpg",
    width: 990,
    height: 686,
    alt: "Ingresso do almoço festivo da 80ª Festa de Cristo Rei: 22 de novembro de 2026, Missa Solene às 9h30 na Igreja Matriz, almoço às 12h na Comunidade Santa Marta",
  },
} as const;

const campaignDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Inclusive through the lunch day (22 Nov 2026) in Bento Gonçalves. */
export function isAlmocoCampaignLive(now = new Date()): boolean {
  return campaignDayFormatter.format(now) <= festaAlmoco.campaignLastDay;
}

/** Opens WhatsApp with the draft filled in; does not send. */
export function almocoWhatsappUrl(): string {
  return `https://wa.me/${festaAlmoco.festeiroWhatsapp}?text=${encodeURIComponent(festaAlmoco.whatsappMessage)}`;
}
