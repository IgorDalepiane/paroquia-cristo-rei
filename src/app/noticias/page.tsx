import type { Metadata } from "next";
import { NewsCard } from "@/components/news/NewsCard";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { newsArticles } from "@/content/news";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias e avisos da Paróquia Cristo Rei.",
};

export default function NoticiasPage() {
  return (
    <>
      <PageTitleBar title="Notícias" />
      <div className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <ScrollReveal key={article.slug}>
                <NewsCard article={article} featured={index % 3 === 1} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
