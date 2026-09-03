import { StainedGlassFaces } from "@/components/stained-glass/StainedGlassFaces";
import { StainedGlassIndex } from "@/components/stained-glass/StainedGlassIndex";
import { StainedGlassSection } from "@/components/stained-glass/StainedGlassSection";
import { stainedGlassWindows } from "@/content/stained-glass";

type StainedGlassWalkProps = {
  showIndex: boolean;
};

export function StainedGlassWalk({ showIndex }: StainedGlassWalkProps) {
  return (
    <div className="section-padding">
      <div className="container-wide mx-auto max-w-6xl">
        {showIndex ? <StainedGlassIndex /> : null}

        <div className={showIndex ? "mt-6" : ""}>
          {stainedGlassWindows.map((piece) => (
            <StainedGlassSection key={piece.slug} piece={piece} />
          ))}
          <StainedGlassFaces />
        </div>
      </div>
    </div>
  );
}
