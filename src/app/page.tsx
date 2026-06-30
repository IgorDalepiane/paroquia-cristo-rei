import { DiscoverSection } from "@/components/home/DiscoverSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsListSection } from "@/components/home/NewsListSection";
import { QuickScheduleSection } from "@/components/home/QuickScheduleSection";

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
