import type { Metadata } from "next";
import { DiscoverSection } from "@/components/home/DiscoverSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsListSection } from "@/components/home/NewsListSection";
import { QuickScheduleSection } from "@/components/home/QuickScheduleSection";
import { siteConfig } from "@/content/site";
import { canonicalPath, defaultOpenGraph, defaultTwitter } from "@/lib/seo";

const homeDescription =
  "Paróquia Cristo Rei em Bento Gonçalves — RS. Comunidade de fé com 24 comunidades, horários de missas, notícias e vida pastoral.";

export const metadata: Metadata = {
  description: homeDescription,
  alternates: canonicalPath("/"),
  openGraph: defaultOpenGraph({
    url: "/",
    title: siteConfig.name,
    description: homeDescription,
  }),
  twitter: defaultTwitter({
    title: siteConfig.name,
    description: homeDescription,
  }),
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickScheduleSection />
      <NewsListSection />
      <DiscoverSection />
      <GalleryPreviewSection />
    </>
  );
}
