import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stainedGlassGalleryPreview } from "@/content/stained-glass";

export function GalleryPreviewSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide">
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Memória viva"
              title="Galeria"
              displayTitle="e vitrais"
            />
            <ButtonLink
              href="/galeria"
              variant="outline"
              className="shrink-0"
              track="home.galeria"
            >
              Ver galeria completa
            </ButtonLink>
          </div>
        </ScrollReveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px]">
          {stainedGlassGalleryPreview.map((item, index) => {
            const span =
              index === 0
                ? "md:col-span-2 md:row-span-2"
                : index === 3 || index === 4 || index === 5
                  ? "md:col-span-2"
                  : "";
            return (
              <ScrollReveal key={item.slug} className={span}>
                <Link
                  href={`/galeria/vitrais#${item.slug}`}
                  data-track={`home.galeria.vitrais.${item.slug}`}
                  className={`group relative block h-full min-h-[140px] overflow-hidden rounded-xl bg-foreground ${span}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:scale-100">
                    {item.title}
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
