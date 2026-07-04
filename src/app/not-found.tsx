import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Página não encontrada",
          isPartOf: { "@id": "https://paroquiacristoreibg.org.br/#website" },
        }}
      />
      <div className="section-padding">
        <div className="container-wide mx-auto max-w-lg text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            404
          </p>
          <h1 className="font-display normal-case mt-4 text-3xl text-foreground md:text-4xl">
            Página não encontrada
          </h1>
          <p className="mt-4 text-muted">
            O endereço que você acessou não existe ou foi movido.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-accent-light"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </>
  );
}
