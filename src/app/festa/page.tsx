import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { festaBingo } from "@/content/festa-bingo";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: festaBingo.editionLabel,
  description:
    "80ª Festa de Cristo Rei em Bento Gonçalves. Noite de bingo — ação entre amigos — em 2 de outubro de 2026, na Comunidade Santa Rita.",
  path: "/festa",
});

export default function FestaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: festaBingo.editionLabel, path: "/festa" },
        ])}
      />
      <PageTitleBar title={festaBingo.editionLabel} />

      <div className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="container-wide grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <Image
            src={festaBingo.logo.src}
            alt={festaBingo.logo.alt}
            width={festaBingo.logo.width}
            height={festaBingo.logo.height}
            priority
            className="h-auto w-52 justify-self-start md:w-full"
          />
          <div className="space-y-10">
            <p className="text-lg leading-relaxed text-muted">
              {festaBingo.hubIntro}
            </p>

            <article className="rounded-3xl border border-border bg-surface p-8 shadow-sm md:p-10">
              <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                {festaBingo.legalSubtitle}
              </p>
              <h2 className="mt-2 font-display normal-case text-3xl text-foreground md:text-4xl">
                {festaBingo.title}
              </h2>
              <dl className="mt-6 space-y-3 text-base text-foreground/80">
                <div>
                  <dt className="inline font-medium text-foreground">Data: </dt>
                  <dd className="inline">{festaBingo.dateLabel}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">
                    Horário:{" "}
                  </dt>
                  <dd className="inline">{festaBingo.timeLabel}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">
                    Local:{" "}
                  </dt>
                  <dd className="inline">{festaBingo.placeLabel}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">
                    Ingresso:{" "}
                  </dt>
                  <dd className="inline">{festaBingo.priceLabel}</dd>
                </div>
              </dl>
              <p className="mt-6 font-medium text-accent">
                {festaBingo.prizesHook}
              </p>
              <p className="mt-4 font-display text-xl text-foreground italic">
                {festaBingo.invite}
              </p>
              <Link
                href="/festa/bingo"
                data-track="festa.bingo"
                className="mt-8 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors hover:bg-accent-light"
              >
                Ver ingresso e brindes
              </Link>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
