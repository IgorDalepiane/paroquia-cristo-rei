import type { Metadata } from "next";
import Link from "next/link";
import { FesteirosContact } from "@/components/festa/FesteirosContact";
import { TicketLightbox } from "@/components/festa/TicketLightbox";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { almocoWhatsappUrl, festaAlmoco } from "@/content/festa-almoco";
import { festaBingo } from "@/content/festa-bingo";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/festa/almoco-festivo";

export const metadata: Metadata = pageMetadata({
  title: `${festaAlmoco.title} — ${festaBingo.editionLabel}`,
  description:
    "Almoço festivo da 80ª Festa de Cristo Rei. 22 de novembro de 2026: Missa Solene às 9h30 na Igreja Matriz e almoço às 12h na Comunidade Santa Marta. Ingresso R$ 100,00; crianças de 7 a 12 anos R$ 50,00.",
  path: PATH,
});

export default function FestaAlmocoPage() {
  const instagramHref = siteConfig.social.instagram;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: festaBingo.editionLabel, path: "/festa" },
          { name: festaAlmoco.title, path: PATH },
        ])}
      />
      <PageTitleBar title={festaAlmoco.title} />

      <div className="section-padding">
        <div className="container-wide mx-auto max-w-4xl space-y-16">
          <div className="mx-auto max-w-3xl">
            <TicketLightbox ticket={festaAlmoco.ticket} />
            <div className="mt-6 flex justify-center">
              <a
                href="#comprar"
                data-track="festa.almoco-festivo.adquirir"
                className="inline-flex rounded-full bg-accent px-8 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-accent-light"
              >
                Adquirir
              </a>
            </div>
          </div>

          <section>
            <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
              Quando e onde
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <InfoItem label="Data" value={festaAlmoco.dateLabel} />
              <InfoItem
                label="Missa Solene"
                value={`${festaAlmoco.massTimeLabel} — ${festaAlmoco.massPlaceLabel}`}
              />
              <InfoItem label="Almoço" value={festaAlmoco.timeLabel} />
              <InfoItem
                label="Local do almoço"
                value={festaAlmoco.placeLabel}
              />
            </dl>
          </section>

          <section>
            <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
              Cardápio
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <ul className="grid gap-x-8 gap-y-2 text-foreground/80 sm:grid-cols-2">
                {festaAlmoco.menu.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm text-muted">
                {festaAlmoco.drinksNote}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
              Valores
            </h2>
            <dl className="grid gap-4 sm:grid-cols-3">
              {festaAlmoco.prices.map((price) => (
                <InfoItem
                  key={price.label}
                  label={price.label}
                  value={price.value}
                />
              ))}
            </dl>
          </section>

          <section id="comprar" className="scroll-mt-28">
            <h2 className="mb-4 font-display normal-case text-2xl text-foreground">
              Como conseguir o ingresso
            </h2>
            <p className="mb-6 text-muted">
              Não há venda online. Reserve com os festeiros pelo WhatsApp ou
              fale com a paróquia no Instagram.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <FesteirosContact
                  description={festaAlmoco.buyFesteiros}
                  phoneLabel={festaAlmoco.festeiroPhoneLabel}
                  whatsappHref={almocoWhatsappUrl()}
                  trackPrefix="festa.almoco-festivo"
                />
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-medium text-foreground">Instagram</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {instagramHref ? (
                    <a
                      href={instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:text-accent-light"
                    >
                      {festaAlmoco.instagramHandle}
                    </a>
                  ) : (
                    festaAlmoco.instagramHandle
                  )}
                </p>
              </div>
            </div>
          </section>

          <p className="text-center font-display text-xl text-foreground italic">
            {festaAlmoco.motto}
          </p>

          <p>
            <Link
              href="/festa"
              className="text-sm font-medium text-accent hover:text-accent-light"
            >
              ← Voltar à 80ª Festa
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-5 py-4">
      <dt className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-foreground">{value}</dd>
    </div>
  );
}
