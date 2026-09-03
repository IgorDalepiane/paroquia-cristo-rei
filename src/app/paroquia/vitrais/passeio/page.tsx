import type { Metadata } from "next";
import { StainedGlassWalk } from "@/components/stained-glass/StainedGlassWalk";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Vitrais — passeio",
  description:
    "Passeio pelos vitrais da matriz da Paróquia Cristo Rei, em scroll contínuo.",
  path: "/paroquia/vitrais/passeio",
});

export default function VitraisPasseioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Paróquia", path: "/paroquia" },
          { name: "Vitrais", path: "/paroquia/vitrais" },
          { name: "Passeio", path: "/paroquia/vitrais/passeio" },
        ])}
      />
      <PageTitleBar title="Vitrais da matriz" />
      <StainedGlassWalk showIndex={false} />
    </>
  );
}
