"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type FesteirosContactProps = {
  description: string;
  phoneLabel: string;
  whatsappHref: string;
  trackPrefix: string;
};

export function FesteirosContact({
  description,
  phoneLabel,
  whatsappHref,
  trackPrefix,
}: FesteirosContactProps) {
  const [copied, setCopied] = useState(false);
  const hideTimer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(phoneLabel);
      setCopied(true);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <h3 className="font-medium text-foreground">Festeiros</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="select-all rounded-lg bg-muted-bg px-3 py-2 font-medium tabular-nums text-foreground">
          {phoneLabel}
        </p>
        <button
          type="button"
          onClick={copyPhone}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent/30 hover:text-accent"
          aria-label="Copiar número"
          data-track={`${trackPrefix}.copiar-telefone`}
        >
          <CopyIcon />
        </button>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        data-track={`${trackPrefix}.whatsapp`}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1ebe5d]"
      >
        <WhatsAppIcon />
        Conversar pelo WhatsApp
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
      className="h-4 w-4"
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
