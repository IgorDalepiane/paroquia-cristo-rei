import type { MetadataRoute } from "next";
import { communities } from "@/content/communities";
import { newsArticles } from "@/content/news";
import { siteConfig } from "@/content/site";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
  {
    url: `${siteConfig.url}/paroquia`,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/comunidades`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/horarios`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteConfig.url}/noticias`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${siteConfig.url}/galeria`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${siteConfig.url}/contato`,
    changeFrequency: "monthly",
    priority: 0.8,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const communityRoutes: MetadataRoute.Sitemap = communities.map(
    (community) => ({
      url: `${siteConfig.url}/comunidades/${community.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteConfig.url}/noticias/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...communityRoutes, ...newsRoutes];
}
