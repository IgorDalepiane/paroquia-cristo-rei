import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { festaAlmoco } from "@/content/festa-almoco";
import { festaBingo } from "@/content/festa-bingo";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: festaBingo.editionLabel,
  description:
    "80ª Festa de Cristo Rei em Bento Gonçalves. Festa encerrada em 22 de novembro de 2026 com o almoço festivo, depois da Missa Solene na Igreja Matriz. Veja também a noite de bingo.",
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
            className="mx-auto h-auto w-52 justify-self-center md:mx-0 md:w-full md:justify-self-start"
          />
          <div className="space-y-10">
            <p className="text-lg leading-relaxed text-muted">
              {festaAlmoco.hubIntro}
            </p>

            <article className="rounded-3xl border border-border bg-muted-bg/60 p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                  Encerramento da festa
                </p>
                <span className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium tracking-wide text-foreground/70 uppercase">
                  {festaAlmoco.pastLabel}
                </span>
              </div>
              <h2 className="mt-2 font-display normal-case text-2xl text-foreground md:text-3xl">
                {festaAlmoco.title}
              </h2>
              <p className="mt-3 text-foreground/70">
                {festaAlmoco.dateLabel} · {festaAlmoco.timeLabel} ·{" "}
                {festaAlmoco.placeLabel}
              </p>
              <p className="mt-4 text-muted">{festaAlmoco.pastInvite}</p>
              <Link
                href="/festa/almoco-festivo"
                data-track="festa.almoco-festivo"
                className="mt-6 inline-flex text-sm font-medium text-accent hover:text-accent-light"
              >
                Ver ingresso e cardápio →
              </Link>
            </article>

            <article className="rounded-3xl border border-border bg-muted-bg/60 p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
                  {festaBingo.legalSubtitle}
                </p>
                <span className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium tracking-wide text-foreground/70 uppercase">
                  {festaBingo.pastLabel}
                </span>
              </div>
              <h2 className="mt-2 font-display normal-case text-2xl text-foreground md:text-3xl">
                {festaBingo.title}
              </h2>
              <p className="mt-3 text-foreground/70">
                {festaBingo.dateLabel} · {festaBingo.placeLabel}
              </p>
              <p className="mt-4 text-muted">{festaBingo.pastInvite}</p>
              <Link
                href="/festa/bingo"
                data-track="festa.bingo"
                className="mt-6 inline-flex text-sm font-medium text-accent hover:text-accent-light"
              >
                Ver brindes do bingo →
              </Link>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
