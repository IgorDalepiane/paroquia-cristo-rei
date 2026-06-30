import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const discoverCards = [
  {
    title: "Paróquia",
    description: "História, clero e vida pastoral da matriz.",
    href: "/paroquia",
  },
  {
    title: "Comunidades",
    description: "Conheça as 24 comunidades de fé do território paroquial.",
    href: "/comunidades",
  },
  {
    title: "Horários",
    description: "Missas, confissões e atendimento da secretaria.",
    href: "/horarios",
  },
];

export function DiscoverSection() {
  return (
    <section className="section-padding border-b border-border bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Explore"
              title="Descubra"
              displayTitle="a paróquia"
              align="center"
            />
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discoverCards.map((card) => (
              <ScrollReveal key={card.href}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-colors hover:border-accent/30"
                >
                  <h3 className="font-display normal-case text-2xl text-foreground group-hover:text-accent">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {card.description}
                  </p>
                  <span className="mt-6 text-sm font-medium text-accent">Saiba mais →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
  );
}
