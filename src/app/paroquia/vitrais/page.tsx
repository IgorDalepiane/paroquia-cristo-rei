import type { Metadata } from "next";
import { StainedGlassWalk } from "@/components/stained-glass/StainedGlassWalk";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vitrais da matriz",
  description:
    "Vitrais da igreja matriz da Paróquia Cristo Rei — Nascimento, Eucaristia e Ressurreição.",
  path: "/paroquia/vitrais",
});

export default function VitraisPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Paróquia", path: "/paroquia" },
          { name: "Vitrais", path: "/paroquia/vitrais" },
        ])}
      />
      <PageTitleBar title="Vitrais da matriz" />
      <StainedGlassWalk showIndex />
    </>
  );
}
