import Link from "next/link";
import { LogoBrandText, LogoIcon } from "@/components/layout/LogoBrand";
import { quickScheduleHighlight } from "@/content/schedules";
import { navItems, formatContactLines, siteConfig } from "@/content/site";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram || "#",
    key: "instagram",
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook || "#",
    key: "facebook",
  },
  { label: "YouTube", href: siteConfig.social.youtube || "#", key: "youtube" },
] as const;

function SocialIcon({ type }: { type: (typeof socialLinks)[number]["key"] }) {
  const className = "h-5 w-5";

  switch (type) {
    case "instagram":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
  }
}

export function Footer() {
  const footerNavItems = navItems.filter((item) => item.href !== "/contato");
  const contactLines = formatContactLines();

  return (
    <footer className="border-t border-border bg-footer-bg text-foreground">
      <div className="container-wide px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-5"
            aria-label={siteConfig.name}
          >
            <LogoIcon size={72} />
            <LogoBrandText size="lg" showLocation />
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-white p-3 text-foreground/80 transition-colors hover:border-accent/30 hover:text-accent"
                    aria-label={item.label}
                    {...(item.href === "#" ? { "aria-disabled": true } : {})}
                  >
                    <SocialIcon type={item.key} />
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-accent-light"
            >
              Fale conosco
            </Link>
          </div>
        </div>

        <div className="grid gap-16 border-t border-border py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display normal-case text-xl text-foreground">
              Secretaria paroquial
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed">
              <li className="text-foreground/80">{contactLines.street}</li>
              <li className="text-foreground/80">{contactLines.locality}</li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-accent hover:text-accent-light"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-accent hover:text-accent-light"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="pt-1 text-muted">
                {siteConfig.secretaryHours.weekdays}
              </li>
              <li className="text-muted">
                {siteConfig.secretaryHours.saturday}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display normal-case text-xl text-foreground">
              Links
            </h2>
            <ul className="mt-5 space-y-3 text-base lg:text-lg">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-accent transition-colors hover:text-accent-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display normal-case text-xl text-foreground">
              Localização
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              {contactLines.street}
              <br />
              {contactLines.locality}
            </p>
          </div>

          <div>
            <h2 className="font-display normal-case text-xl text-foreground">
              Horários rápidos
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed">
              <li>
                <span className="font-medium text-foreground">
                  {quickScheduleHighlight.label}
                </span>
                <br />
                <span className="text-foreground/80">
                  {quickScheduleHighlight.times}
                </span>
              </li>
              <li className="text-foreground/80">
                {quickScheduleHighlight.location}
              </li>
              <li>
                <Link
                  href="/horarios"
                  className="text-accent transition-colors hover:text-accent-light"
                >
                  Ver todos os horários →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
