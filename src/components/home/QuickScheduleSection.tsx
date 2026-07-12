import { calendarEvents } from "@/content/events.generated";
import {
  quickScheduleHighlight,
  SCHEDULE_UNAVAILABLE_FALLBACK,
} from "@/content/schedules";
import { siteConfig } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSundayMatrizTimesLine } from "@/lib/calendar/matriz-schedule";

function ScheduleCardContent({ sundayTimes }: { sundayTimes: string | null }) {
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {quickScheduleHighlight.label}
      </p>
      <p className="mt-4 font-display normal-case text-3xl leading-tight text-foreground md:text-4xl">
        {sundayTimes ?? SCHEDULE_UNAVAILABLE_FALLBACK}
      </p>
      <p className="mt-3 text-muted">{quickScheduleHighlight.location}</p>
      <p className="mt-6 text-sm text-muted">
        Confissões, secretaria e horários das comunidades na página completa.
      </p>
    </>
  );
}

export function QuickScheduleSection() {
  const sundayTimes = getSundayMatrizTimesLine(calendarEvents);

  return (
    <section
      id="horarios"
      className="section-padding border-b border-border bg-muted-bg"
    >
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            eyebrow={siteConfig.name}
            title="Horários"
            displayTitle="de missa"
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <ScheduleCardContent sundayTimes={sundayTimes} />
              </div>
              <ButtonLink
                href="/horarios"
                variant="outline"
                className="shrink-0"
              >
                Ver todos os horários
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
