import { newsArticles } from "@/content/news";
import { NewsCard } from "@/components/news/NewsCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionFade } from "@/components/ui/SectionFade";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsPreviewSection() {
  const preview = newsArticles.slice(0, 3);

  return (
    <>
      <SectionFade from="surface" to="background" />
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Fique por dentro"
                title="Últimas"
                displayTitle="notícias"
              />
              <ButtonLink
                href="/noticias"
                variant="outline"
                className="shrink-0"
              >
                Ver todas as notícias
              </ButtonLink>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {preview.map((article, index) => (
              <ScrollReveal key={article.slug}>
                <NewsCard article={article} featured={index === 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
