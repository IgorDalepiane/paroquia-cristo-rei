import type { Metadata } from "next";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Paróquia",
  description: "História, clero e vida pastoral da Paróquia Cristo Rei.",
};

export default function ParoquiaPage() {
  return (
    <>
      <PageTitleBar title="Paróquia" />
      <div className="section-padding">
        <div className="container-wide mx-auto max-w-3xl space-y-12">
          <ScrollReveal>
            <section>
              <h2 className="mb-4 font-display normal-case text-2xl text-foreground">Nossa história</h2>
              <p className="leading-relaxed text-muted">
                Texto provisório para layout. A história da Paróquia Cristo Rei será publicada
                aqui com o material oficial — origem, missão, marcos e presença no território
                paroquial.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="border-t border-border pt-12">
              <h2 className="mb-4 font-display normal-case text-2xl text-foreground">Nosso clero</h2>
              <p className="leading-relaxed text-muted">
                Informações sobre pároco, vigários e equipe pastoral serão adicionadas quando
                o conteúdo for disponibilizado, incluindo fotos e breves apresentações.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="border-t border-border pt-12">
              <h2 className="mb-4 font-display normal-case text-2xl text-foreground">
                Pastorais e serviços
              </h2>
              <p className="leading-relaxed text-muted">
                Resumo das pastorais, movimentos e serviços paroquiais. Na V2, páginas
                dedicadas podem ser criadas conforme a necessidade pastoral.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
