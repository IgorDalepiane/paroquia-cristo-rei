"use client";

import { useMemo, useState } from "react";
import { CommunityCard } from "@/components/communities/CommunityCard";
import type { Community } from "@/content/communities";

type CommunityGridProps = {
  communities: Community[];
};

export function CommunityGrid({ communities }: CommunityGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return communities;
    return communities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.neighborhood.toLowerCase().includes(q) ||
        c.patron?.toLowerCase().includes(q),
    );
  }, [communities, query]);

  return (
    <div>
      <label className="mb-8 block">
        <span className="sr-only">Buscar comunidade</span>
        <input
          type="search"
          placeholder="Buscar por nome, bairro ou padroeiro…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-xl rounded-full border border-border bg-surface px-5 py-3 text-sm outline-none ring-accent/20 transition-shadow focus:ring-2"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="text-muted">
          Nenhuma comunidade encontrada para &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((community) => (
            <CommunityCard key={community.slug} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}
