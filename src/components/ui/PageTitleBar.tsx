type PageTitleBarProps = {
  title: string;
};

export function PageTitleBar({ title }: PageTitleBarProps) {
  return (
    <section className="bg-accent py-8 md:py-10" aria-label={title}>
      <h1 className="font-display normal-case text-center text-2xl font-medium tracking-wide text-white md:text-3xl">
        {title}
      </h1>
    </section>
  );
}
