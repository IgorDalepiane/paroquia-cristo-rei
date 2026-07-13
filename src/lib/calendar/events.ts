import type { CalendarEvent } from "@/content/events";
import {
  PARISH_TIMEZONE,
  addParishMonths,
  monthStartDayKey,
  parishYearMonth,
  startOfParishDay,
} from "@/lib/calendar/parish-time";

/** Months shown: current + next 11 = 12 full calendar months */
export const DISPLAY_MONTH_COUNT = 12;

export function startOfDisplayWindow(now: Date): Date {
  const { year, month } = parishYearMonth(now);
  return startOfParishDay(monthStartDayKey(year, month));
}

export function endOfDisplayWindow(now: Date): Date {
  const { year, month } = parishYearMonth(now);
  const target = addParishMonths(year, month, DISPLAY_MONTH_COUNT - 1);
  const next = addParishMonths(target.year, target.month, 1);
  const nextStart = startOfParishDay(monthStartDayKey(next.year, next.month));
  return new Date(nextStart.getTime() - 1);
}

/** Sync RRULE expansion extends slightly past the display window for edge cases. */
export function endOfSyncWindow(now: Date): Date {
  return new Date(endOfDisplayWindow(now).getTime() + 24 * 60 * 60 * 1000);
}

export const PARISH_SCHEDULE_CALENDAR_SLUG = "agenda-paroquial";

export function eventOverlapsWindow(
  event: CalendarEvent,
  windowStart: Date,
  windowEnd: Date,
): boolean {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : start;
  return (
    end.getTime() >= windowStart.getTime() &&
    start.getTime() <= windowEnd.getTime()
  );
}

export function getDisplayEvents(
  events: CalendarEvent[],
  now = new Date(),
): CalendarEvent[] {
  const windowStart = startOfDisplayWindow(now);
  const windowEnd = endOfDisplayWindow(now);
  return events.filter((event) =>
    eventOverlapsWindow(event, windowStart, windowEnd),
  );
}

export function getUpcomingEvents(
  events: CalendarEvent[],
  now = new Date(),
): CalendarEvent[] {
  const windowEnd = endOfDisplayWindow(now);

  return events.filter((event) => {
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : start;
    if (end.getTime() < now.getTime()) return false;
    if (start.getTime() > windowEnd.getTime()) return false;
    return true;
  });
}

export function getCommunityPreviewEvents(
  events: CalendarEvent[],
  limit = 5,
  now = new Date(),
): CalendarEvent[] {
  return getUpcomingEvents(events, now)
    .filter((event) => event.calendarSlug !== PARISH_SCHEDULE_CALENDAR_SLUG)
    .slice(0, limit);
}

export function groupEventsByMonth(
  events: CalendarEvent[],
): Array<{ key: string; label: string; events: CalendarEvent[] }> {
  const groups = new Map<string, CalendarEvent[]>();

  for (const event of events) {
    const date = new Date(event.start);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const current = groups.get(key) ?? [];
    current.push(event);
    groups.set(key, current);
  }

  return [...groups.entries()].map(([key, monthEvents]) => {
    const [year, month] = key.split("-");
    const label = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
      timeZone: PARISH_TIMEZONE,
    }).format(new Date(Number(year), Number(month) - 1, 1));

    return {
      key,
      label: label.charAt(0).toUpperCase() + label.slice(1),
      events: monthEvents,
    };
  });
}

export function formatEventDate(
  event: CalendarEvent,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(event.start);
  const defaults: Intl.DateTimeFormatOptions = event.allDay
    ? {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: PARISH_TIMEZONE,
      }
    : {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: PARISH_TIMEZONE,
      };

  return new Intl.DateTimeFormat("pt-BR", {
    ...defaults,
    ...options,
  }).format(date);
}

export function formatEventDateShort(event: CalendarEvent): string {
  const date = new Date(event.start);
  if (event.allDay) {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      timeZone: PARISH_TIMEZONE,
    }).format(date);
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: PARISH_TIMEZONE,
  }).format(date);
}

export function formatEventRange(event: CalendarEvent): string | null {
  if (!event.end || event.allDay) return null;

  const start = new Date(event.start);
  const end = new Date(event.end);
  const sameDay =
    start.toLocaleDateString("pt-BR", { timeZone: PARISH_TIMEZONE }) ===
    end.toLocaleDateString("pt-BR", { timeZone: PARISH_TIMEZONE });

  const timeFmt = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: PARISH_TIMEZONE,
  });

  if (sameDay) {
    return `${timeFmt.format(start)} – ${timeFmt.format(end)}`;
  }

  return `${formatEventDate(event)} – ${formatEventDate({ ...event, start: event.end })}`;
}

export function googleCalendarAddUrl(event: CalendarEvent): string {
  const start = new Date(event.start);
  const end = event.end
    ? new Date(event.end)
    : new Date(start.getTime() + 3600000);

  const fmt = (date: Date, allDay: boolean) => {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    if (allDay) return `${y}${m}${d}`;
    const h = String(date.getUTCHours()).padStart(2, "0");
    const min = String(date.getUTCMinutes()).padStart(2, "0");
    const s = String(date.getUTCSeconds()).padStart(2, "0");
    return `${y}${m}${d}T${h}${min}${s}Z`;
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${fmt(start, event.allDay)}/${fmt(end, event.allDay)}`,
  });

  if (event.description) params.set("details", event.description);
  if (event.location) params.set("location", event.location);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
