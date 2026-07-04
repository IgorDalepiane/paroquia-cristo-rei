export type NewsArticle = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "bem-vindos-ao-novo-site",
    title: "Bem-vindos ao novo site da Paróquia Cristo Rei",
    date: "2026-06-28",
    excerpt:
      "Estamos preparando um espaço digital para aproximar a paróquia, as comunidades e a vida pastoral.",
    body: "Este é um conteúdo provisório para validação de layout. Em breve, a equipe pastoral publicará notícias, avisos e reflexões sobre a vida das nossas 24 comunidades.\n\nSubstitua este texto pelo conteúdo oficial quando disponível.",
  },
  {
    slug: "horarios-de-missa-atualizados",
    title: "Horários de missa — confira na matriz e nas comunidades",
    date: "2026-06-20",
    excerpt:
      "Consulte os horários dominicais e entre semana. Alguns horários de comunidade serão confirmados em breve.",
    body: "Os horários publicados no site são provisórios. Confirme sempre com a secretaria paroquial ou com a liderança de cada comunidade antes de se deslocar.",
  },
  {
    slug: "vida-pastoral-nas-comunidades",
    title: "Vida pastoral nas 24 comunidades",
    date: "2026-06-15",
    excerpt:
      "Cada comunidade guarda história, devoção e serviço. Conheça as páginas dedicadas em atualização.",
    body: "As páginas das comunidades estão sendo estruturadas para receber fotos, história e informações de contato. Colabore enviando material à secretaria.",
  },
  {
    slug: "galeria-fotografica",
    title: "Galeria fotográfica em construção",
    date: "2026-06-10",
    excerpt:
      "Em breve, fotos da igreja matriz, celebrações e momentos das comunidades.",
    body: "Aguardamos o envio de fotografias oficiais para compor a galeria do site. Imagens atuais são placeholders de layout.",
  },
  {
    slug: "contato-secretaria",
    title: "Secretaria paroquial — horário de atendimento",
    date: "2026-06-05",
    excerpt:
      "Veja horários de atendimento da secretaria e canais de contato na página dedicada.",
    body: "Telefone, e-mail e endereço provisórios estão publicados até recebermos os dados oficiais da paróquia.",
  },
  {
    slug: "participe-da-comunidade",
    title: "Participe da vida da paróquia",
    date: "2026-05-28",
    excerpt:
      "Pastorais, grupos e serviços — informações em breve na página Paróquia.",
    body: "Conteúdo provisório. A página Paróquia reunirá história, clero e pastorais quando o material for disponibilizado.",
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function formatNewsDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
