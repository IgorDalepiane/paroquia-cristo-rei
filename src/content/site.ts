export const siteConfig = {
  name: "Paróquia Cristo Rei",
  shortName: "Cristo Rei",
  url: "https://paroquiacristoreibg.org.br",
  description:
    "Paróquia Cristo Rei — comunidade de fé, 24 comunidades, horários de missas e vida pastoral.",
  heroTagline: "Bento Gonçalves — RS",
  heroSubtitle: "Vida pastoral",
  contact: {
    address: "Av. Dr. Antônio Casagrande, 27-89",
    neighborhood: "Cidade Alta",
    city: "Bento Gonçalves",
    state: "RS",
    postalCode: "95700-000",
    country: "BR",
    geo: {
      latitude: -29.1723674,
      longitude: -51.5202798,
    },
    phone: "(00) 0000-0000",
    email: "contato@paroquiacristoreibg.org.br",
    whatsapp: "",
  },
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  secretaryHours: {
    weekdays: "Segunda a sexta: 8h às 11h45 / 13h30 às 18h",
    saturday: "Sábado: 9h às 11h45",
  },
  churchHours: {
    weekdays: "Segunda a sexta: 8h às 12h / 13h30 às 19h",
    saturday: "Sábado: 8h às 12h / 16h às 18h30",
    sunday: "Domingo: 8h às 12h / 16h às 20h30",
  },
} as const;

export const navItems = [
  { label: "Paróquia", href: "/paroquia" },
  { label: "Comunidades", href: "/comunidades" },
  { label: "Horários", href: "/horarios" },
  { label: "Notícias", href: "/noticias" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
] as const;

export function formatContactLines() {
  const { contact } = siteConfig;
  return {
    street: `${contact.address} — ${contact.neighborhood}`,
    locality: `${contact.city} — ${contact.state} · CEP ${contact.postalCode}`,
  };
}

export function googleMapsUrl() {
  const { geo } = siteConfig.contact;
  return `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`;
}
