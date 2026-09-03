import Link from "next/link";
import { StainedGlassPhoto } from "@/components/stained-glass/StainedGlassPhoto";
import { stainedGlassEntryWindows } from "@/content/stained-glass";

export function VitraisEntry() {
  return (
    <Link
      href="/paroquia/vitrais"
      className="relative block overflow-hidden rounded-3xl bg-foreground"
    >
      <div className="grid h-56 grid-cols-3 gap-1 md:h-80 md:grid-cols-5">
        {stainedGlassEntryWindows.map((piece, index) => (
          <div
            key={piece.slug}
            className={`relative min-w-0 ${
              index >= 3 ? "hidden md:block" : ""
            }`}
          >
            <StainedGlassPhoto
              shot={piece.shots[0]}
              sizes="(min-width: 768px) 20vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/45 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <h2 className="font-display normal-case text-3xl text-white md:text-4xl">
          Vitrais da matriz
        </h2>
        <p className="mt-2 max-w-md text-sm text-white/80 md:text-base">
          Cada vitral da igreja matriz narra uma passagem.
        </p>
        <span className="mt-5 text-sm font-medium text-accent-gold">
          Ver os vitrais →
        </span>
      </div>
    </Link>
  );
}
