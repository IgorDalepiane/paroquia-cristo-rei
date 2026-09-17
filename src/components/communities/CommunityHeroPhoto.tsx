import Image from "next/image";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { getCommunityHeroPhoto } from "@/content/community-photos";

type CommunityHeroPhotoProps = {
  slug: string;
  variant: "page" | "card";
  priority?: boolean;
};

export function CommunityHeroPhoto({
  slug,
  variant,
  priority = false,
}: CommunityHeroPhotoProps) {
  const photo = getCommunityHeroPhoto(slug);
  const isPage = variant === "page";
  const portrait = photo?.orientation === "portrait";
  const eager = isPage || priority;

  const frame = !isPage
    ? "relative aspect-[16/10] overflow-hidden"
    : portrait
      ? "relative mb-8 mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-2xl"
      : "relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl";

  if (!photo) {
    return (
      <div className={`${frame} placeholder-photo`}>
        <PhotoPlaceholder compact={!isPage} />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Image
        src={isPage ? photo.src : photo.cardSrc}
        alt={photo.alt}
        fill
        unoptimized
        priority={eager}
        sizes={
          isPage
            ? portrait
              ? "(max-width: 512px) 100vw, 512px"
              : "(max-width: 768px) 100vw, 768px"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        }
        className="object-cover"
        style={{
          objectPosition:
            photo.objectPosition ?? (portrait ? "center 30%" : "center 40%"),
        }}
      />
    </div>
  );
}
