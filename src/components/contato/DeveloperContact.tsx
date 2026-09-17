"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { developerWhatsappUrl, siteConfig } from "@/content/site";

export function DeveloperContact() {
  const [copied, setCopied] = useState(false);
  const hideTimer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(siteConfig.developer.phone);
      setCopied(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={copyPhone}
        className="flex w-full items-center justify-between gap-3 rounded-lg bg-muted-bg px-4 py-3 text-left font-medium tabular-nums text-foreground transition-colors hover:bg-border/50"
        aria-label="Copiar número"
        data-track="contato.desenvolvedor.copiar-telefone"
      >
        <span>{siteConfig.developer.phone}</span>
        <CopyIcon />
      </button>

      <a
        href={developerWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-track="contato.desenvolvedor.whatsapp"
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent bg-white px-5 py-2.5 text-sm font-medium tracking-wide uppercase text-accent transition-colors hover:bg-accent/5"
      >
        <WhatsAppIcon />
        Conversar no WhatsApp
      </a>

      {copied ? (
        <p
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 text-sm text-white shadow-lg"
        >
          Número copiado
        </p>
      ) : null}
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-foreground/70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
