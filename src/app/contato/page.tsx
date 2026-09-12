import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
} from "@/components/ui/BrandIcons";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  formatChurchLines,
  formatContactLines,
  googleMapsChurchUrl,
  googleMapsUrl,
  siteConfig,
} from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Entre em contato com a Paróquia Cristo Rei em Bento Gonçalves — RS. Secretaria, igreja matriz e horário de atendimento.",
  path: "/contato",
});

export default function ContatoPage() {
  const contactLines = formatContactLines();
  const churchLines = formatChurchLines();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
      <PageTitleBar title="Contato" />
      <div className="section-padding">
        <div className="container-wide mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <section className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                  {churchLines.title}
                </h2>
                <address className="not-italic space-y-3 text-muted">
                  <p>{churchLines.street}</p>
                  <p>{churchLines.neighborhood}</p>
                  <p>{churchLines.locality}</p>
                  <p>{churchLines.postal}</p>
                </address>
                <div className="mt-8 flex flex-col items-start gap-3">
                  <ExternalAction
                    href={googleMapsChurchUrl()}
                    track="contato.igreja.maps"
                  >
                    <MapPinIcon />
                    Ver no Google Maps
                  </ExternalAction>
                  {siteConfig.social.instagram ? (
                    <ExternalAction
                      href={siteConfig.social.instagram}
                      track="contato.instagram"
                      variant="outline"
                    >
                      <InstagramIcon />
                      Instagram
                    </ExternalAction>
                  ) : null}
                  {siteConfig.social.facebook ? (
                    <ExternalAction
                      href={siteConfig.social.facebook}
                      track="contato.facebook"
                      variant="outline"
                    >
                      <FacebookIcon />
                      Facebook
                    </ExternalAction>
                  ) : null}
                </div>
              </section>

              <section className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                  Secretaria paroquial
                </h2>
                <address className="not-italic space-y-3 text-muted">
                  <p>{contactLines.street}</p>
                  <p>{contactLines.locality}</p>
                  <p>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="hover:text-accent"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                  <p className="text-sm">{siteConfig.contact.phoneNote}</p>
                  <p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-accent"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </address>
                <ExternalAction
                  href={googleMapsUrl()}
                  track="contato.secretaria.maps"
                  variant="outline"
                  className="mt-8"
                >
                  <MapPinIcon />
                  Ver no Google Maps
                </ExternalAction>
              </section>

              <section className="h-full rounded-2xl border border-border bg-surface p-8 shadow-sm md:col-span-2 lg:col-span-1">
                <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                  Horário de atendimento
                </h2>
                <div className="space-y-3 text-muted">
                  <p>{siteConfig.secretaryHours.weekdays}</p>
                  <p>{siteConfig.secretaryHours.saturday}</p>
                </div>
              </section>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

function ExternalAction({
  href,
  track,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  track: string;
  variant?: "primary" | "outline";
  className?: string;
  children: ReactNode;
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-light"
      : "border border-accent bg-white text-accent hover:bg-accent/5";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track={track}
      className={`inline-flex w-fit items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
