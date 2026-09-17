import Link from "next/link";
import { CommunityHeroPhoto } from "@/components/communities/CommunityHeroPhoto";
import type { Community } from "@/content/communities";

type CommunityCardProps = {
  community: Community;
  prefetch?: boolean;
  priority?: boolean;
};

export function CommunityCard({
  community,
  prefetch,
  priority,
}: CommunityCardProps) {
  return (
    <Link
      href={`/comunidades/${community.slug}`}
      prefetch={prefetch}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-md motion-reduce:transform-none"
    >
      <CommunityHeroPhoto
        slug={community.slug}
        variant="card"
        priority={priority}
      />
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
