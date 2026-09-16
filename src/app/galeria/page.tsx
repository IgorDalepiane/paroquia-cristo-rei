import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { VitraisEntry } from "@/components/stained-glass/VitraisEntry";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { galleryItems } from "@/content/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Galeria",
  description:
    "Fotos da Paróquia Cristo Rei e das comunidades, e os vitrais da igreja matriz.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Galeria", path: "/galeria" },
        ])}
      />
      <PageTitleBar title="Galeria" />
      <div className="section-padding">
        <div className="container-wide space-y-14">
          <VitraisEntry track="galeria.vitrais" />

          <div>
            <p className="mb-10 max-w-2xl text-muted">
              Fotografias da matriz, das celebrações e das comunidades entram
              aqui quando estiverem prontas. Enquanto isso, os vitrais da igreja
              matriz já podem ser vistos no passeio acima.
            </p>
            <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {galleryItems.map((item, index) => {
                const span = index === 0 ? "md:col-span-2 md:row-span-2" : "";
                return (
                  <ScrollReveal key={item.id} className={span}>
                    <figure
                      className={`h-full min-h-[160px] overflow-hidden rounded-xl placeholder-photo ${span}`}
                    >
                      <PhotoPlaceholder compact={index !== 0} />
                    </figure>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
