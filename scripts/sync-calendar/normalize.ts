import type { CalendarEvent, CalendarSource } from "../../src/content/events";

export function trimCalendarEvent(event: CalendarEvent): CalendarEvent {
  const trimmed: CalendarEvent = {
    ...event,
    title: event.title.trim(),
    calendarLabel: event.calendarLabel.trim(),
    calendarSlug: event.calendarSlug.trim(),
  };

  if (event.description !== undefined) {
    const description = event.description.trim();
    if (description) {
      trimmed.description = description;
    }
  }

  if (event.location !== undefined) {
    const location = event.location.trim();
    if (location) {
      trimmed.location = location;
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

export function normalizeEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
}
