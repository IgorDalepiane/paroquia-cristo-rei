import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatNewsDate, getNewsBySlug, newsArticles } from "@/content/news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Notícia não encontrada" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const paragraphs = article.body.split("\n\n");

  return (
    <>
      <PageTitleBar title="Notícias" />
      <article className="section-padding">
        <div className="container-wide mx-auto max-w-3xl">
          <ScrollReveal>
            <Link
              href="/noticias"
              className="mb-8 inline-block text-sm font-medium text-accent hover:text-accent-light"
            >
              ← Voltar às notícias
            </Link>
            <time className="text-sm text-muted" dateTime={article.date}>
              {formatNewsDate(article.date)}
            </time>
            <h1 className="font-display normal-case mt-3 text-balance text-3xl leading-tight md:text-4xl">
              {article.title}
            </h1>
            <div className="mt-4 aspect-[21/9] rounded-2xl placeholder-photo" aria-hidden />
          </ScrollReveal>

          <ScrollReveal>
            <div className="prose prose-neutral mt-10 max-w-none space-y-4 leading-relaxed text-foreground/90">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
