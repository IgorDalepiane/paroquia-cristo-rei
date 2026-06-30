type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  displayTitle,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-10 flex flex-col gap-2 ${alignClass}`}>
      {eyebrow ? (
        <p className="text-xs font-medium tracking-[0.2em] text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="font-display normal-case text-balance text-3xl font-normal leading-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
        {displayTitle ? (
          <>
            {" "}
            <span className="text-accent">{displayTitle}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}
