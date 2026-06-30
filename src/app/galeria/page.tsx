import type { Metadata } from "next";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { galleryCategoryLabels, galleryItems } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos da Paróquia Cristo Rei e das comunidades.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageTitleBar title="Galeria" />
      <div className="section-padding">
        <div className="container-wide">
          <p className="mb-10 max-w-2xl text-muted">
            Placeholders de layout — substituir por fotografias autênticas da matriz,
            celebrações e comunidades quando disponíveis.
          </p>
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item, index) => {
              const span = index === 0 ? "md:col-span-2 md:row-span-2" : "";
              return (
                <ScrollReveal key={item.id} className={span}>
                  <figure
                    className={`group relative h-full min-h-[160px] overflow-hidden rounded-xl placeholder-photo ${span}`}
                  >
                    <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-foreground/85 to-transparent p-4">
                      <span className="text-xs uppercase tracking-wider text-accent-gold">
                        {galleryCategoryLabels[item.category]}
                      </span>
                      <span className="text-sm font-medium text-white">{item.title}</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
