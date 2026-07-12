import type { CalendarEvent, CalendarSource } from "../../src/content/events";

export function trimCalendarEvent(event: CalendarEvent): CalendarEvent {
  const { description, location, ...rest } = event;
  const trimmed: CalendarEvent = {
    ...rest,
    title: event.title.trim(),
    calendarLabel: event.calendarLabel.trim(),
    calendarSlug: event.calendarSlug.trim(),
  };

  if (description !== undefined) {
    const trimmedDescription = description.trim();
    if (trimmedDescription) {
      trimmed.description = trimmedDescription;
    }
  }

  if (location !== undefined) {
    const trimmedLocation = location.trim();
    if (trimmedLocation) {
      trimmed.location = trimmedLocation;
    }
  }

  return trimmed;
}

export function trimCalendarSources(
  sources: CalendarSource[],
): CalendarSource[] {
  return sources.map((source) => ({
    ...source,
    label: source.label.trim(),
    slug: source.slug.trim(),
  }));
}

export function compareCalendarEvents(
  a: CalendarEvent,
  b: CalendarEvent,
): number {
  const byStart = new Date(a.start).getTime() - new Date(b.start).getTime();
  if (byStart !== 0) return byStart;

  const byEnd = (a.end ?? "").localeCompare(b.end ?? "");
  if (byEnd !== 0) return byEnd;

  const bySlug = a.calendarSlug.localeCompare(b.calendarSlug);
  if (bySlug !== 0) return bySlug;

  const byTitle = a.title.localeCompare(b.title, "pt-BR");
  if (byTitle !== 0) return byTitle;

  return a.id.localeCompare(b.id);
}

export function normalizeEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort(compareCalendarEvents);
}
