/**
 * Click names: `{pagina}.{acao}` (hyphens like URLs). Navigation from
 * another page prefixes the source (`home.festa.bingo`,
 * `agenda.comunidades.santa-rita`).
 *
 * Cloudflare Web Analytics only counts pageviews — not named clicks.
 * `trackEvent` sends Zaraz `click` events (enable Zaraz in the dashboard
 * to see them). In-page actions (Adquirir âncora, WhatsApp, copiar) need
 * this; navigation to another route already shows up as that page's visits.
 */
export function eventNameFromHref(href: string, pathname = "/"): string {
  if (href.startsWith("tel:")) return `${pageKey(pathname)}.telefone`;
  if (href.startsWith("mailto:")) return `${pageKey(pathname)}.email`;
  if (/wa\.me|whatsapp/i.test(href)) return `${pageKey(pathname)}.whatsapp`;
  if (href.startsWith("http") && !href.includes("paroquiacristoreibg.org.br")) {
    return `${pageKey(pathname)}.externo`;
  }

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
  const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const path = pathPart.startsWith("/")
    ? pathPart
    : pathPart
      ? pathname
      : pathname;

  const dest = pageKey(path);
  const src = pageKey(pathname);
  const named = hash ? `${dest}.${slugSegment(hash)}` : dest;
  if (named === src || named.startsWith(`${src}.`)) return named;
  return `${src}.${named}`;
}

function pageKey(path: string): string {
  const clean = path.split("?")[0].replace(/\/$/, "") || "/";
  if (clean === "/") return "home";
  return clean.slice(1).split("/").map(slugSegment).filter(Boolean).join(".");
}

function slugSegment(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function trackEvent(name: string, extra?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const zaraz = (
    window as Window & {
      zaraz?: {
        track: (event: string, props?: Record<string, string>) => void;
      };
    }
  ).zaraz;
  zaraz?.track("click", { name, ...extra });
}
