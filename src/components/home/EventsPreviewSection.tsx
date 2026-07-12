import Link from "next/link";
import {
  calendarEvents,
  calendarSources,
} from "@/content/events.generated";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildCalendarColorMap } from "@/lib/calendar/calendar-colors";
import {
  formatEventDateShort,
  getCommunityPreviewEvents,
} from "@/lib/calendar/events";

export function EventsPreviewSection() {
  const preview = getCommunityPreviewEvents(calendarEvents);
  const colorMap = buildCalendarColorMap(
    calendarSources.map((source) => source.label),
  );

  if (preview.length === 0) return null;

  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Comunidade"
              title="Próximos"
              displayTitle="eventos"
            />
            <ButtonLink href="/agenda" variant="outline" className="shrink-0">
              Ver agenda completa
            </ButtonLink>
          </div>
        </ScrollReveal>

        <ul className="space-y-0">
          {preview.map((event, index) => {
            const color = colorMap.get(event.calendarLabel);
            return (
              <ScrollReveal key={event.id}>
                <li
                  className={`border-b border-border py-6 ${index === 0 ? "border-t" : ""}`}
                >
                  <Link
                    href={`/agenda?event=${event.id}`}
                    className="group grid gap-4 md:grid-cols-[160px_1fr]"
                  >
                    <time
                      className="text-sm text-muted"
                      dateTime={event.start}
                    >
                      {formatEventDateShort(event)}
                    </time>
                    <div>
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-foreground"
                        style={{ backgroundColor: color }}
                      >
                        {event.calendarLabel}
                      </span>
                      <h3 className="mt-2 text-lg font-medium text-foreground transition-colors group-hover:text-accent">
                        {event.title}
                      </h3>
                      {event.location ? (
                        <p className="mt-1 text-sm text-muted">
                          {event.location}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              </ScrollReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
