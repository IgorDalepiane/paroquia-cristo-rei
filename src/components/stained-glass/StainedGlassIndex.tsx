"use client";

import type { MouseEvent } from "react";
import { stainedGlassWindows } from "@/content/stained-glass";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function jumpToVitral(
  event: MouseEvent<HTMLAnchorElement>,
  slug: string,
) {
  event.preventDefault();
  const target = document.getElementById(slug);
  if (!target) return;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.pushState(null, "", `#${slug}`);
}

export function StainedGlassIndex() {
  return (
    <nav aria-label="Vitrais nesta página">
      <p className="mb-4 text-xs font-medium tracking-[0.2em] text-muted uppercase">
        Índice
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stainedGlassWindows.map((piece) => (
          <li key={piece.slug}>
            <a
              href={`#${piece.slug}`}
              onClick={(event) => jumpToVitral(event, piece.slug)}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/30"
            >
              <span className="font-display normal-case text-xl text-foreground">
                {piece.title}
              </span>
              <span className="mt-2 text-sm text-muted">
                {piece.shots.length} fotos
              </span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="#rosto-de-jesus"
            onClick={(event) => jumpToVitral(event, "rosto-de-jesus")}
            className="flex h-full flex-col rounded-2xl border border-accent/30 bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="font-display normal-case text-xl text-foreground">
              Rosto de Jesus
            </span>
            <span className="mt-2 text-sm text-muted">
              Detalhes em cada vitral
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
