type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden hero-gradient md:min-h-[45vh]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgb(196 160 53 / 0.25), transparent 50%), radial-gradient(circle at 70% 60%, rgb(155 28 28 / 0.3), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 px-6 py-24 text-center">
        {subtitle ? (
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            {subtitle}
          </p>
        ) : null}
        <h1 className="text-4xl font-bold uppercase tracking-wide text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
