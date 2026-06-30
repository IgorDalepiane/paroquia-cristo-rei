import { siteConfig } from "@/content/site";
import { ChurchHeroImage } from "@/components/home/ChurchHeroImage";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden" aria-label="Destaque principal">
      <div className="absolute inset-0">
        <ChurchHeroImage priority objectPosition="center center" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-overlay)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100dvh-5rem)] items-center justify-center px-6 py-20">
        <div className="hero-slideshow-caption">
          <div className="hero-slideshow-stack">
            <p className="hero-slideshow-eyebrow">
              <span className="hero-slideshow-eyebrow-line" aria-hidden />
              <span>Bem-vindo a</span>
              <span className="hero-slideshow-eyebrow-line" aria-hidden />
            </p>
            <h1 className="hero-slideshow-title">{siteConfig.name}</h1>
            <p className="hero-slideshow-tagline">{siteConfig.heroTagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
