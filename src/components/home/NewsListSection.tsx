import Link from "next/link";
import { formatNewsDate, newsArticles } from "@/content/news";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsListSection() {
  const preview = newsArticles.slice(0, 5);

  return (
    <section className="section-padding border-b border-border bg-surface">
      <div className="container-wide">
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Fique por dentro" title="Últimas" displayTitle="notícias" />
            <ButtonLink href="/noticias" variant="outline" className="shrink-0">
              Ver todas as notícias
            </ButtonLink>
          </div>
        </ScrollReveal>

        <ul className="space-y-0">
          {preview.map((article, index) => (
            <ScrollReveal key={article.slug}>
              <li
                className={`border-b border-border py-6 ${index === 0 ? "border-t" : ""}`}
              >
                <Link
                  href={`/noticias/${article.slug}`}
                  className="group grid gap-4 md:grid-cols-[140px_1fr]"
                >
                  <time className="text-sm text-muted" dateTime={article.date}>
                    {formatNewsDate(article.date)}
                  </time>
                  <div>
                    <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
                  </div>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
