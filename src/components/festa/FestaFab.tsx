"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { festaAlmoco, isAlmocoCampaignLive } from "@/content/festa-almoco";
import { festaBingo } from "@/content/festa-bingo";

const ALMOCO_PATH = "/festa/almoco-festivo";

export function FestaFab() {
  const pathname = usePathname();
  const onFesta = pathname === "/festa" || pathname.startsWith("/festa/");
  const visible = isAlmocoCampaignLive() && !onFesta;

  useEffect(() => {
    if (!visible) return;
    document.documentElement.classList.add("festa-fab-active");
    return () => document.documentElement.classList.remove("festa-fab-active");
  }, [visible]);

  if (!visible) return null;

  return (
    <Link
      href={ALMOCO_PATH}
      data-track="festa.almoco-festivo.fab"
      className="festa-fab-pulse fixed right-6 bottom-6 z-40 flex flex-col items-start rounded-full bg-accent px-5 py-3 text-white shadow-lg ring-1 ring-black/10 print:hidden hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`${festaAlmoco.title} da ${festaBingo.editionLabel} — ${festaAlmoco.dateLabel}, ${festaAlmoco.timeLabel}`}
    >
      <span className="text-sm font-semibold tracking-wide">
        Almoço festivo
      </span>
      <span className="text-xs text-white/85">
        {festaAlmoco.dateShortLabel} · {festaAlmoco.timeLabel}
      </span>
    </Link>
  );
}
