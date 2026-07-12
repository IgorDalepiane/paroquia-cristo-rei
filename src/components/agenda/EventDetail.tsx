import type { CalendarEvent } from "@/content/events";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  formatEventDate,
  formatEventRange,
  googleCalendarAddUrl,
} from "@/lib/calendar/events";

type EventDetailContentProps = {
  event: CalendarEvent;
  calendarColor?: string;
};

export function EventDetailContent({
  event,
  calendarColor,
}: EventDetailContentProps) {
  const timeRange = formatEventRange(event);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-medium text-foreground"
          style={{ backgroundColor: calendarColor }}
        >
          {event.calendarLabel}
        </span>
      </div>

      <h2
        id="event-modal-title"
        className="mt-3 text-xl font-semibold text-foreground"
      >
        {event.title}
      </h2>

      <p className="mt-2 text-sm text-muted">
        <time dateTime={event.start}>{formatEventDate(event)}</time>
        {timeRange ? ` · ${timeRange}` : null}
      </p>

      {event.location ? (
        <p className="mt-2 text-sm text-foreground">{event.location}</p>
      ) : null}

      {event.description ? (
        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {event.description}
        </div>
      ) : null}

      <div className="mt-6">
        <ButtonLink
          href={googleCalendarAddUrl(event)}
          variant="outline"
          className="text-xs"
        >
          Adicionar ao calendário
        </ButtonLink>
      </div>
    </>
  );
}
