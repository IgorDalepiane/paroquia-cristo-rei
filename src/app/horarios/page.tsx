import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { MassWeeklyList } from "@/components/schedule/MassWeeklyList";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { calendarEvents } from "@/content/events.generated";
import { siteConfig } from "@/content/site";
import { confessionSchedules } from "@/content/schedules";
import { getMatrizWeeklySchedule } from "@/lib/calendar/matriz-schedule";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Horários",
  description: "Horários de missas, confissões e atendimento da secretaria.",
  path: "/horarios",
});

export default function HorariosPage() {
  const massSchedules = getMatrizWeeklySchedule(calendarEvents);

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
                Próximas missas
              </h2>
              <MassWeeklyList entries={massSchedules} />
              <p className="mt-6 text-sm text-muted">
                Horários das comunidades nas{" "}
                <Link
                  href="/comunidades"
                  className="text-accent hover:underline"
                >
                  páginas de cada comunidade
                </Link>
                .
              </p>
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
                    <span className="text-muted">{entry.day}:</span>{" "}
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
              <p className="text-muted">{siteConfig.churchHours.open}</p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
