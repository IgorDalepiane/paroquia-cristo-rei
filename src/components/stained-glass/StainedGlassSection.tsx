import { StainedGlassCarousel } from "@/components/stained-glass/StainedGlassCarousel";
import type { StainedGlassWindow } from "@/content/stained-glass";

type StainedGlassSectionProps = {
  piece: StainedGlassWindow;
};

export function StainedGlassSection({ piece }: StainedGlassSectionProps) {
  return (
    <section
      id={piece.slug}
      aria-labelledby={`${piece.slug}-title`}
      className="scroll-mt-28 border-t border-border pt-14 md:pt-20"
    >
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12">
        <div className="contents lg:order-2 lg:flex lg:flex-col">
          <h2
            id={`${piece.slug}-title`}
            className="order-1 font-display normal-case text-3xl text-foreground md:text-4xl"
          >
            {piece.title}
          </h2>
          <p className="order-3 mt-0 text-base leading-relaxed text-muted lg:mt-5">
            {piece.story}
          </p>
        </div>
        <div className="order-2 lg:order-1">
          <StainedGlassCarousel title={piece.title} shots={piece.shots} />
        </div>
      </div>
    </section>
  );
}
