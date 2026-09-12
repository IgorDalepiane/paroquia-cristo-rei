"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { eventNameFromHref, trackEvent } from "@/lib/analytics";

export function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest("a, button");
      if (!(control instanceof HTMLElement)) return;

      const explicit = control.dataset.track;
      if (explicit) {
        trackEvent(explicit);
        return;
      }

      if (control instanceof HTMLAnchorElement && control.href) {
        trackEvent(
          eventNameFromHref(
            control.getAttribute("href") ?? control.href,
            pathname,
          ),
        );
        return;
      }

      if (control instanceof HTMLButtonElement) {
        const label =
          control.getAttribute("aria-label") || control.textContent || "botao";
        trackEvent(`${eventNameFromHref(pathname, pathname)}.${slug(label)}`);
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}

function slug(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "botao"
  );
}
