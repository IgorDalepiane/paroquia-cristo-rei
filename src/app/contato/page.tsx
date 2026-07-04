import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatContactLines, googleMapsUrl, siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Entre em contato com a Paróquia Cristo Rei em Bento Gonçalves — RS. Endereço, e-mail e horário da secretaria.",
  path: "/contato",
});

export default function ContatoPage() {
  const contactLines = formatContactLines();

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
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">Secretaria paroquial</h2>
              <address className="not-italic space-y-3 text-muted">
                <p>{contactLines.street}</p>
                <p>{contactLines.locality}</p>
                <p>
                  <a
                    href={googleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    Ver no Google Maps
                  </a>
                </p>
                <p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-accent">
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </address>
              <div className="mt-8 space-y-2 text-sm text-muted">
                <p className="font-semibold text-foreground">Horário de atendimento</p>
                <p>{siteConfig.secretaryHours.weekdays}</p>
                <p>{siteConfig.secretaryHours.saturday}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form className="space-y-5 rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <h2 className="font-display normal-case text-xl text-foreground">Envie uma mensagem</h2>
              <p className="text-sm text-muted">
                Formulário visual — integração com envio de e-mail pode ser adicionada na V2.
              </p>
              <div>
                <label htmlFor="nome" className="mb-1 block text-sm font-medium">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="mb-1 block text-sm font-medium">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent/30"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <button
                type="button"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-accent-light"
              >
                Enviar mensagem
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
