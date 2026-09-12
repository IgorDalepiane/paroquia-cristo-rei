import type { Metadata } from "next";
import Link from "next/link";
import { BingoFesteirosContact } from "@/components/festa/BingoFesteirosContact";
import { BingoTicketLightbox } from "@/components/festa/BingoTicketLightbox";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { bingoRounds, festaBingo } from "@/content/festa-bingo";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${festaBingo.title} — ${festaBingo.editionLabel}`,
  description:
    "Noite de bingo — ação entre amigos — da 80ª Festa de Cristo Rei. 2 de outubro de 2026, 19h30, Comunidade Santa Rita. Ingresso R$ 30,00 (8 rodadas).",
  path: "/festa/bingo",
});

export default function FestaBingoPage() {
  const instagramHref = siteConfig.social.instagram;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: festaBingo.editionLabel, path: "/festa" },
          { name: festaBingo.title, path: "/festa/bingo" },
        ])}
      />
      <PageTitleBar title={festaBingo.title} />

      <div className="section-padding">
        <div className="container-wide mx-auto max-w-4xl space-y-16">
          <div className="mx-auto max-w-3xl">
            <BingoTicketLightbox />
            <div className="mt-6 flex justify-center">
              <a
                href="#comprar"
                data-track="festa.bingo.adquirir"
                className="inline-flex rounded-full bg-accent px-8 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-accent-light"
              >
                Adquirir
              </a>
            </div>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                Quando e onde
              </h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Data" value={festaBingo.dateLabel} />
                <InfoItem label="Horário" value={festaBingo.timeLabel} />
                <InfoItem label="Local" value={festaBingo.placeLabel} />
                <InfoItem label="Ingresso" value={festaBingo.priceLabel} />
                <div className="rounded-2xl border border-accent-gold/40 bg-accent-gold/10 px-5 py-5 sm:col-span-2">
                  <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
                    Prêmios
                  </p>
                  <p className="mt-1 font-display text-2xl text-accent md:text-3xl">
                    Mais de R$ 20.000
                  </p>
                  <p className="mt-1 text-foreground/80">em prêmios no bingo</p>
                </div>
              </dl>
              <ul className="mt-6 space-y-2 text-muted">
                <li>{festaBingo.extraCardsNote}</li>
                <li>{festaBingo.foodNote}</li>
                <li>{festaBingo.solidarity}</li>
              </ul>
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
                  <BingoFesteirosContact />
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
                        {festaBingo.instagramHandle}
                      </a>
                    ) : (
                      festaBingo.instagramHandle
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section id="brindes">
            <h2 className="mb-2 font-display normal-case text-2xl text-foreground">
              Brindes principais
            </h2>
            <p className="mb-8 text-sm text-muted">
              Oito rodadas no ingresso, mais uma rodada extra no dia. Cada
              rodada tem prêmios de 4 cantos e de cartela cheia.
            </p>
            <ol className="grid gap-5 md:grid-cols-2">
              {bingoRounds.map((round) => (
                <li
                  key={round.id}
                  className={`rounded-2xl border bg-surface p-6 ${
                    round.extra
                      ? "border-accent-gold/50 md:col-span-2"
                      : "border-border"
                  }`}
                >
                  <h3 className="font-display normal-case text-xl text-foreground">
                    {round.label}
                    {round.extra ? (
                      <span className="ml-2 text-sm font-sans font-medium tracking-wide text-muted uppercase">
                        vendida no dia
                      </span>
                    ) : null}
                  </h3>
                  <div
                    className={`mt-4 grid gap-4 ${round.extra ? "md:grid-cols-2" : ""}`}
                  >
                    <PrizeGroup heading="4 cantos" items={round.corners} />
                    <PrizeGroup heading="Cheia" items={round.full} />
                  </div>
                </li>
              ))}
            </ol>
          </section>

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

function PrizeGroup({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
        {heading}
      </p>
      <ul className="mt-2 space-y-1 text-sm leading-relaxed text-foreground/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
