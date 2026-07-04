import { galleryItems } from "@/content/gallery";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreviewSection() {
  const preview = galleryItems.slice(0, 6);

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Memória viva"
              title="Galeria"
              displayTitle="fotográfica"
            />
            <ButtonLink href="/galeria" variant="outline" className="shrink-0">
              Ver galeria completa
            </ButtonLink>
          </div>
        </ScrollReveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px]">
          {preview.map((item, index) => {
            const span =
              index === 0
                ? "md:col-span-2 md:row-span-2"
                : index === 3
                  ? "md:col-span-2"
                  : "";
            return (
              <ScrollReveal key={item.id} className={span}>
                <figure
                  className={`group relative h-full min-h-[140px] overflow-hidden rounded-xl border border-border/60 bg-surface shadow-sm placeholder-photo ${span}`}
                >
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
                    {item.title}
                  </figcaption>
                </figure>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
