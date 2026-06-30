import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { communities, getCommunityBySlug } from "@/content/communities";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return { title: "Comunidade não encontrada" };
  return {
    title: community.name,
    description: community.summary,
  };
}

export default async function ComunidadePage({ params }: PageProps) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  return (
    <>
      <PageTitleBar title={community.name} />
      <div className="section-padding">
        <div className="container-wide mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-8 aspect-[21/9] rounded-2xl placeholder-photo" aria-hidden />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {community.neighborhood}
              {community.patron ? ` · ${community.patron}` : ""}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{community.summary}</p>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-12 border-t border-border pt-12">
              <h2 className="mb-4 font-display normal-case text-2xl text-foreground">História</h2>
              <p className="leading-relaxed text-foreground/90">{community.history}</p>
            </section>
          </ScrollReveal>

          {community.massTimes?.length ? (
            <ScrollReveal>
              <section className="mt-12 border-t border-border pt-12">
                <h2 className="mb-4 font-display normal-case text-2xl text-foreground">Horários de missa</h2>
                <ul className="space-y-2 text-muted">
                  {community.massTimes.map((time) => (
                    <li key={time}>{time}</li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          ) : null}

          {community.contact ? (
            <ScrollReveal>
              <section className="mt-12 border-t border-border pt-12">
                <h2 className="mb-4 font-display normal-case text-2xl text-foreground">Contato</h2>
                <p className="text-muted">{community.contact}</p>
              </section>
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </>
  );
}
