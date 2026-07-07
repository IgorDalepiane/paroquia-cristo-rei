import type { Metadata } from "next";
import { ConstructionBanner } from "@/components/layout/ConstructionBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { cinzel, cormorant, figtree } from "@/lib/fonts";
import { churchJsonLd, rootMetadata, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = rootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${figtree.variable} ${cinzel.variable} ${cormorant.variable} ${figtree.className} flex min-h-screen flex-col pb-[4.75rem] antialiased md:pb-20`}
      >
        <JsonLd data={[websiteJsonLd(), churchJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConstructionBanner />
      </body>
    </html>
  );
}
