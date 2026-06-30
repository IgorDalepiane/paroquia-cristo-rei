import Link from "next/link";
import { formatNewsDate, type NewsArticle } from "@/content/news";

type NewsCardProps = {
  article: NewsArticle;
  featured?: boolean;
};

export function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <article className="group flex flex-col">
      <Link href={`/noticias/${article.slug}`} className="flex flex-col gap-4">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-lg placeholder-photo transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none ${
            featured ? "ring-2 ring-accent-gold/40" : ""
          }`}
        >
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
            <span className="text-sm text-white/90 line-clamp-2">{article.excerpt}</span>
          </div>
        </div>
        <div>
          <time className="text-xs text-muted" dateTime={article.date}>
            {formatNewsDate(article.date)}
          </time>
          <h3
            className={`mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-accent ${
              featured ? "text-accent" : "text-foreground"
            }`}
          >
            {article.title}
          </h3>
          <div
            className={`mt-3 h-0.5 w-12 rounded-full transition-all group-hover:w-16 ${
              featured ? "bg-accent-gold" : "bg-border group-hover:bg-accent-gold"
            }`}
          />
        </div>
      </Link>
    </article>
  );
}
