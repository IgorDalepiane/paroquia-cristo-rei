import Image from "next/image";

type LogoBrandTextProps = {
  size?: "sm" | "md" | "lg";
  showLocation?: boolean;
};

const sizeClasses = {
  sm: {
    eyebrow: "text-[0.55rem] tracking-[0.28em]",
    name: "text-lg leading-none",
    location: "text-[0.5rem] tracking-[0.2em]",
  },
  md: {
    eyebrow: "text-[0.6rem] tracking-[0.3em]",
    name: "text-xl leading-none md:text-2xl",
    location: "text-[0.55rem] tracking-[0.22em]",
  },
  lg: {
    eyebrow: "text-xs tracking-[0.32em]",
    name: "text-3xl leading-none md:text-4xl",
    location: "text-[0.6rem] tracking-[0.25em]",
  },
};

export function LogoBrandText({
  size = "md",
  showLocation = false,
}: LogoBrandTextProps) {
  const sizes = sizeClasses[size];

  return (
    <span className="flex flex-col">
      <span className={`font-medium uppercase text-muted ${sizes.eyebrow}`}>
        Paróquia
      </span>
      <span
        className={`mt-0.5 font-brand font-semibold uppercase text-foreground ${sizes.name}`}
      >
        Cristo Rei
      </span>
      {showLocation ? (
        <span
          className={`mt-1 font-medium uppercase text-muted ${sizes.location}`}
        >
          Bento Gonçalves — RS
        </span>
      ) : null}
    </span>
  );
}

type LogoIconProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function LogoIcon({
  size = 48,
  className = "",
  priority = false,
}: LogoIconProps) {
  return (
    <Image
      src="/images/logo-icon.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      style={{ height: size, width: "auto" }}
      priority={priority}
    />
  );
}
