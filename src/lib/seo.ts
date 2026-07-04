import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const OG_HORIZONTAL = "/images/og-horizontal.png";
export const OG_VERTICAL = "/images/og-vertical.png";
export const LOGO_ICON = "/images/logo-icon.png";

export function siteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalPath(path: string): Metadata["alternates"] {
  return { canonical: path };
}

const defaultOgImages: NonNullable<Metadata["openGraph"]>["images"] = [
  {
    url: OG_HORIZONTAL,
    width: 1400,
    height: 550,
    alt: siteConfig.name,
  },
  {
    url: OG_VERTICAL,
    width: 1400,
    height: 1400,
    alt: siteConfig.name,
  },
];

export function defaultOpenGraph(
  overrides: Partial<NonNullable<Metadata["openGraph"]>> = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    images: defaultOgImages,
    ...overrides,
  };
}

export function defaultTwitter(
  overrides: Partial<NonNullable<Metadata["twitter"]>> = {},
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    images: [OG_HORIZONTAL],
    ...overrides,
  };
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
};

export function pageMetadata({
  title,
  description,
  path,
  openGraph,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: canonicalPath(path),
    openGraph: defaultOpenGraph({
      title,
      description,
      url: path,
      ...openGraph,
    }),
    twitter: defaultTwitter({ title, description }),
  };
}

export function churchJsonLd() {
  const { contact, name, url } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${url}/#church`,
    name,
    url,
    logo: siteUrl(LOGO_ICON),
    image: siteUrl(OG_HORIZONTAL),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: contact.city,
      addressRegion: contact.state,
      postalCode: contact.postalCode,
      addressCountry: contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    publisher: { "@id": `${siteConfig.url}/#church` },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  slug: string;
  date: string;
};

export function articleJsonLd({
  title,
  description,
  slug,
  date,
}: ArticleJsonLdOptions) {
  const url = siteUrl(`/noticias/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    url,
    image: siteUrl(OG_HORIZONTAL),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: siteUrl(LOGO_ICON),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: canonicalPath("/"),
    openGraph: defaultOpenGraph({
      url: "/",
      title: siteConfig.name,
      description: siteConfig.description,
    }),
    twitter: defaultTwitter({
      title: siteConfig.name,
      description: siteConfig.description,
    }),
    robots: { index: true, follow: true },
  };
}
