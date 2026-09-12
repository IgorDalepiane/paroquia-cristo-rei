"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { festaBingo, isBingoCampaignLive } from "@/content/festa-bingo";

const BINGO_PATH = "/festa/bingo";

export function BingoFab() {
  const pathname = usePathname();
  const onFesta = pathname === "/festa" || pathname.startsWith("/festa/");
  const visible = isBingoCampaignLive() && !onFesta;

  useEffect(() => {
    if (!visible) return;
    document.documentElement.classList.add("bingo-fab-active");
    return () => document.documentElement.classList.remove("bingo-fab-active");
  }, [visible]);

  if (!visible) return null;

  return (
    <Link
      href={BINGO_PATH}
      data-track="festa.bingo.fab"
      className="fixed right-6 bottom-6 z-40 flex flex-col items-start rounded-full bg-accent px-5 py-3 text-white shadow-lg ring-1 ring-black/10 print:hidden hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`${festaBingo.title} da ${festaBingo.editionLabel} — ${festaBingo.dateLabel}, ${festaBingo.timeLabel}`}
    >
      <span className="text-sm font-semibold tracking-wide">Bingo</span>
      <span className="text-xs text-white/85">
        {festaBingo.dateShortLabel} · {festaBingo.timeLabel}
      </span>
    </Link>
  );
}
