import type { Metadata } from "next";
import { CommunityGrid } from "@/components/communities/CommunityGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { communities } from "@/content/communities";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Comunidades",
  description: "Conheça as 24 comunidades da Paróquia Cristo Rei.",
  path: "/comunidades",
});

export default function ComunidadesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Comunidades", path: "/comunidades" },
        ])}
      />
      <PageTitleBar title="Comunidades" />
      <div className="section-padding">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              title="24 comunidades"
              displayTitle="de fé"
              eyebrow="Paróquia Cristo Rei"
            />
            <p className="-mt-6 mb-10 max-w-2xl text-muted">
              Cada comunidade tem sua história, devoção e serviço. Use a busca
              para encontrar por nome, bairro ou padroeiro. Conteúdo em
              atualização.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <CommunityGrid communities={communities} />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
