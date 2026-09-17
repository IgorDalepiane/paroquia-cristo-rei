export const siteConfig = {
  name: "Paróquia Cristo Rei",
  shortName: "Cristo Rei",
  url: "https://paroquiacristoreibg.org.br",
  /** Footer label; keep aligned with the latest GitHub release (no `v`). */
  version: "0.5.3",
  description:
    "Paróquia Cristo Rei — comunidade de fé, 24 comunidades, horários de missas e vida pastoral.",
  heroTagline: "Bento Gonçalves — RS",
  heroSubtitle: "Vida pastoral",
  contact: {
    city: "Bento Gonçalves",
    state: "RS",
    country: "BR",
    phone: "(54) 3452-1093",
    phoneNote: "Telefone e WhatsApp apenas para mensagens",
    email: "cristorei@diocesedecaxias.org.br",
    whatsapp: "555434521093",
    /** Igreja matriz */
    address: "Av. Dr. Antônio Casagrande, 27-89",
    neighborhood: "Cidade Alta",
    postalCode: "95700-342",
    churchMapsUrl: "https://maps.app.goo.gl/fmx52WEZs6g73MBo9",
    geo: {
      latitude: -29.1723674,
      longitude: -51.5202798,
    },
    /** Secretaria paroquial */
    secretaryAddress: "Rua Silva Paes, 121, Sala 01",
    secretaryNeighborhood: "Cidade Alta",
    secretaryPostalCode: "95700-378",
  },
  social: {
    instagram: "https://www.instagram.com/paroquiacristoreibg/",
    facebook: "https://www.facebook.com/cristoreibentogoncalves",
    youtube: "",
  },
  secretaryHours: {
    weekdays: "Segunda a sexta-feira, das 08h30 às 11h45 e das 13h30 às 17h45",
    saturday: "Sábado, das 08h30 às 11h30",
  },
  churchHours: {
    open: "De terça a domingo, das 12h às 19h",
  },
  developer: {
    role: "Programador",
    name: "Igor Dalepiane da Costa",
    phone: "(54) 9 9616-5918",
    whatsapp: "5554996165918",
  },
} as const;

export const navItems = [
  { label: "Paróquia", href: "/paroquia", hidden: true },
  { label: "Comunidades", href: "/comunidades" },
  { label: "Horários", href: "/horarios" },
  { label: "Agenda", href: "/agenda" },
  { label: "Festa", href: "/festa" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
] as const;

/** Header, footer and similar menus — hidden items stay reachable by URL. */
export const visibleNavItems = navItems.filter(
  (item) => !("hidden" in item && item.hidden),
);

/** Endereço da secretaria (contato / rodapé). */
export function formatContactLines() {
  const { contact } = siteConfig;
  return {
    street: `${contact.secretaryAddress} — ${contact.secretaryNeighborhood}`,
    locality: `${contact.city} — ${contact.state} · CEP ${contact.secretaryPostalCode}`,
  };
}

/** Endereço da igreja matriz. */
export function formatChurchLines() {
  const { contact } = siteConfig;
  return {
    title: "Igreja matriz",
    street: contact.address,
    neighborhood: contact.neighborhood,
    locality: `${contact.city} — ${contact.state}`,
    postal: `CEP ${contact.postalCode}`,
  };
}

export function googleMapsUrl() {
  const { contact } = siteConfig;
  const query = [
    contact.secretaryAddress,
    contact.secretaryNeighborhood,
    contact.city,
    contact.state,
    contact.secretaryPostalCode,
  ].join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsChurchUrl() {
  return siteConfig.contact.churchMapsUrl;
}

export function developerWhatsappUrl() {
  return `https://wa.me/${siteConfig.developer.whatsapp}`;
}
