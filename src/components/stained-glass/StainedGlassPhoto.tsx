import Image from "next/image";
import type { StainedGlassShot } from "@/content/stained-glass";

type StainedGlassPhotoProps = {
  shot: Pick<StainedGlassShot, "src" | "alt">;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function StainedGlassPhoto({
  shot,
  sizes,
  priority = false,
  className = "",
}: StainedGlassPhotoProps) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
