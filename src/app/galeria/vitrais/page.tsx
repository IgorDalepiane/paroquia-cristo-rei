import type { Metadata } from "next";
import { StainedGlassWalk } from "@/components/stained-glass/StainedGlassWalk";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vitrais da matriz",
  description:
    "Passeio pelos vitrais da igreja matriz da Paróquia Cristo Rei em Bento Gonçalves.",
  path: "/galeria/vitrais",
});

export default function GaleriaVitraisPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Galeria", path: "/galeria" },
          { name: "Vitrais", path: "/galeria/vitrais" },
        ])}
      />
      <PageTitleBar title="Vitrais da matriz" />
      <StainedGlassWalk showIndex />
    </>
  );
}
