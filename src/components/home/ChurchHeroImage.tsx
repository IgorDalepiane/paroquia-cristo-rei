import Image from "next/image";

type ChurchHeroImageProps = {
  className?: string;
  priority?: boolean;
  objectPosition?: string;
};

export function ChurchHeroImage({
  className = "",
  priority = false,
  objectPosition = "center center",
}: ChurchHeroImageProps) {
  return (
    <Image
      src="/images/igreja-hero.webp"
      alt="Fachada da Paróquia Cristo Rei com torre e cruz"
      fill
      priority={priority}
      sizes="100vw"
      className={`object-cover object-center ${className}`}
      style={{ objectPosition }}
    />
  );
}
