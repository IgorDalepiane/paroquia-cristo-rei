import Link from "next/link";
import { LogoBrandText, LogoIcon } from "@/components/layout/LogoBrand";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { calendarEvents } from "@/content/events.generated";
import {
  quickScheduleHighlight,
  SCHEDULE_UNAVAILABLE_FALLBACK,
} from "@/content/schedules";
import {
  formatChurchLines,
  formatContactLines,
  googleMapsChurchUrl,
  navItems,
  siteConfig,
} from "@/content/site";
import { getSundayMatrizTimesLine } from "@/lib/calendar/matriz-schedule";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    key: "instagram" as const,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    key: "facebook" as const,
  },
].filter((item) => item.href);

function SocialIcon({ type }: { type: (typeof socialLinks)[number]["key"] }) {
  const className = "h-5 w-5";
  if (type === "instagram") return <InstagramIcon className={className} />;
  return <FacebookIcon className={className} />;
}

export function Footer() {
  const footerNavItems = navItems.filter((item) => item.href !== "/contato");
  const contactLines = formatContactLines();
  const churchLines = formatChurchLines();
  const sundayTimes = getSundayMatrizTimesLine(calendarEvents);

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
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
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
            <ul className="mt-5 space-y-2 text-base leading-relaxed text-foreground/80">
              <li className="font-medium text-foreground">
                {churchLines.title}
              </li>
              <li>{churchLines.street}</li>
              <li>{churchLines.neighborhood}</li>
              <li>{churchLines.locality}</li>
              <li>{churchLines.postal}</li>
              <li>
                <a
                  href={googleMapsChurchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-colors hover:text-accent-light"
                >
                  Ver no Google Maps
                </a>
              </li>
            </ul>
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
                  {sundayTimes ?? SCHEDULE_UNAVAILABLE_FALLBACK}
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
