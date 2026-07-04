import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/content/site";
import { confessionSchedules, massSchedules } from "@/content/schedules";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Horários",
  description: "Horários de missas, confissões e atendimento da secretaria.",
  path: "/horarios",
});

export default function HorariosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Horários", path: "/horarios" },
        ])}
      />
      <PageTitleBar title="Horários" />
      <div className="section-padding">
        <div className="container-wide mx-auto max-w-3xl">
          <ScrollReveal>
            <section className="mb-12">
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                Horários de missas
              </h2>
              <ul className="space-y-4">
                {massSchedules.map((entry) => (
                  <li
                    key={entry.day}
                    className="border-b border-border pb-4 last:border-0"
                  >
                    <p className="font-semibold text-accent">{entry.day}:</p>
                    <p className="mt-1 text-muted">{entry.times.join(" · ")}</p>
                    {entry.note ? (
                      <p className="mt-1 text-sm text-accent">* {entry.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-12 border-t border-border pt-12">
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                Confissões
              </h2>
              <ul className="space-y-3">
                {confessionSchedules.map((entry) => (
                  <li key={entry.day}>
                    <span className="font-semibold">{entry.day}:</span>{" "}
                    <span className="text-muted">
                      {entry.times.join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mb-12 border-t border-border pt-12">
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                Horário da secretaria
              </h2>
              <p className="text-muted">{siteConfig.secretaryHours.weekdays}</p>
              <p className="mt-2 text-muted">
                {siteConfig.secretaryHours.saturday}
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="border-t border-border pt-12">
              <h2 className="mb-6 font-display normal-case text-2xl text-foreground">
                Abertura da igreja
              </h2>
              <p className="text-muted">{siteConfig.churchHours.weekdays}</p>
              <p className="mt-2 text-muted">
                {siteConfig.churchHours.saturday}
              </p>
              <p className="mt-2 text-muted">{siteConfig.churchHours.sunday}</p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
