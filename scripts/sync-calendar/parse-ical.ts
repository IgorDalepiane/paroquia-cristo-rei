import { createHash } from "node:crypto";
import ical, {
  type CalendarResponse,
  type EventInstance,
  type VEvent,
} from "node-ical";
import type { CalendarEvent, CalendarSource } from "../../src/content/events";
import { dedupeSlugs } from "./slugify";

/** Expand RRULE through ~4 months; display trims to 3 calendar months */
const RECURRENCE_WINDOW_DAYS = 120;

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function textValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "val" in value) {
    const val = (value as { val?: unknown }).val;
    return typeof val === "string" ? val : "";
  }
  return String(value);
}

function toIso(date: Date): string {
  return date.toISOString();
}

function eventId(uid: string, calendarSlug: string, startIso: string): string {
  return createHash("sha256")
    .update(`${uid}:${calendarSlug}:${startIso}`)
    .digest("hex")
    .slice(0, 16);
}

function isPast(end: Date | null, start: Date, now: Date): boolean {
  const compare = end ?? start;
  return compare.getTime() < now.getTime();
}

function expandEvent(
  event: VEvent,
  now: Date,
  rangeEnd: Date,
): EventInstance[] {
  if (event.rrule) {
    return ical.expandRecurringEvent(event, {
      from: now,
      to: rangeEnd,
      expandOngoing: true,
    });
  }

  const start =
    event.start instanceof Date ? event.start : new Date(event.start);
  const end =
    event.end instanceof Date
      ? event.end
      : event.end
        ? new Date(event.end)
        : null;

  if (isPast(end, start, now)) return [];

  return [
    {
      start: event.start,
      end: event.end ?? event.start,
      summary: event.summary,
      isFullDay: Boolean(event.datetype === "date"),
      isRecurring: false,
      isOverride: false,
      event,
    },
  ];
}

function instanceToEvent(
  instance: EventInstance,
  calendarSlug: string,
  calendarLabel: string,
  uid: string,
): CalendarEvent | null {
  const startDate =
    instance.start instanceof Date ? instance.start : new Date(instance.start);
  const endDate =
    instance.end instanceof Date ? instance.end : new Date(instance.end);

  const title = textValue(instance.summary) || "Evento";
  const description = stripHtml(textValue(instance.event.description ?? ""));
  const location = textValue(instance.event.location ?? "") || undefined;

  return {
    id: eventId(uid, calendarSlug, toIso(startDate)),
    calendarSlug,
    calendarLabel,
    title,
    description,
    start: toIso(startDate),
    end: instance.isFullDay ? null : toIso(endDate),
    allDay: instance.isFullDay,
    location,
  };
}

export function parseFeed(
  body: string,
  calendarSlug: string,
  calendarLabel: string,
  now: Date,
): CalendarEvent[] {
  const data: CalendarResponse = ical.sync.parseICS(body);
  const rangeEnd = new Date(now);
  rangeEnd.setDate(rangeEnd.getDate() + RECURRENCE_WINDOW_DAYS);

  const events: CalendarEvent[] = [];

  for (const [uid, component] of Object.entries(data)) {
    if (!component || typeof component !== "object") continue;
    if (component.type !== "VEVENT") continue;

    const vevent = component as VEvent;
    if (vevent.status === "CANCELLED") continue;

    const instances = expandEvent(vevent, now, rangeEnd);
    for (const instance of instances) {
      const mapped = instanceToEvent(
        instance,
        calendarSlug,
        calendarLabel,
        uid,
      );
      if (mapped) events.push(mapped);
    }
  }

  return events;
}

export function readCalendarLabel(body: string, fallback: string): string {
  const data = ical.sync.parseICS(body);
  const name = data.vcalendar?.["WR-CALNAME"];
  if (typeof name === "string" && name.trim()) return name.trim();
  return fallback;
}

export function buildSources(
  feeds: Array<{ label: string; slug: string }>,
): CalendarSource[] {
  const slugMap = dedupeSlugs(feeds.map((f) => f.label));
  return feeds.map((feed) => ({
    label: feed.label,
    slug: slugMap.get(feed.label) ?? feed.slug,
  }));
}
