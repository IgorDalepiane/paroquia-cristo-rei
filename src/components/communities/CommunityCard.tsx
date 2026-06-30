import Link from "next/link";
import type { Community } from "@/content/communities";

type CommunityCardProps = {
  community: Community;
};

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link
      href={`/comunidades/${community.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-md motion-reduce:transform-none"
    >
      <div className="aspect-[16/10] placeholder-photo" aria-hidden />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-accent-gold">
          {community.neighborhood}
        </p>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
          {community.name}
        </h3>
        {community.patron ? (
          <p className="text-sm text-muted">Padroeiro: {community.patron}</p>
        ) : null}
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {community.summary}
        </p>
      </div>
    </Link>
  );
}
