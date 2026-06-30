import { getFeaturedCommunities } from "@/content/communities";
import { CommunityCard } from "@/components/communities/CommunityCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionFade } from "@/components/ui/SectionFade";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CommunitiesPreviewSection() {
  const featured = getFeaturedCommunities(8);

  return (
    <>
      <SectionFade from="background" to="muted-bg" />
      <section className="section-padding bg-muted-bg">
        <div className="container-wide">
          <ScrollReveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="24 comunidades"
                title="Nossa"
                displayTitle="comunidade"
              />
              <ButtonLink href="/comunidades" variant="outline" className="shrink-0">
                Ver as 24 comunidades
              </ButtonLink>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((community) => (
              <ScrollReveal key={community.slug}>
                <CommunityCard community={community} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
