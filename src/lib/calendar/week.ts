import type { CalendarEvent } from "@/content/events";

const PARISH_TIMEZONE = "America/Sao_Paulo";

const EN_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const WEEKDAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const MAX_CHIPS_PER_DAY = 4;

export function dayKeyInParish(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PARISH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function weekdayInParish(date: Date): number {
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: PARISH_TIMEZONE,
    weekday: "short",
  }).format(date);
  return EN_WEEKDAYS.indexOf(label as (typeof EN_WEEKDAYS)[number]);
}

export function addDaysToDayKey(dayKey: string, days: number): string {
  const [year, month, day] = dayKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return dayKeyInParish(shifted);
}

export function startOfWeekSunday(date: Date): string {
  const dayKey = dayKeyInParish(date);
  const weekday = weekdayInParish(date);
  return addDaysToDayKey(dayKey, -weekday);
}

export function endOfWeekDayKey(weekStartKey: string): string {
  return addDaysToDayKey(weekStartKey, 6);
}

export function getWeekDayKeys(weekStartKey: string): string[] {
  return Array.from({ length: 7 }, (_, index) =>
    addDaysToDayKey(weekStartKey, index),
  );
}

export function formatWeekRange(weekStartKey: string): string {
  const endKey = endOfWeekDayKey(weekStartKey);
  const startDate = dateFromDayKey(weekStartKey);
  const endDate = dateFromDayKey(endKey);

  const startFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    timeZone: PARISH_TIMEZONE,
  });
  const endFmt = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PARISH_TIMEZONE,
  });

  const startMonth = startDate.toLocaleDateString("pt-BR", {
    timeZone: PARISH_TIMEZONE,
    month: "long",
  });
  const endMonth = endDate.toLocaleDateString("pt-BR", {
    timeZone: PARISH_TIMEZONE,
    month: "long",
  });

  const startDay = startFmt.format(startDate).split(" ")[0];
  const endPart = endFmt.format(endDate);

  if (startMonth === endMonth) {
    return `${startDay} – ${endPart}`;
  }

  return `${startFmt.format(startDate)} – ${endPart}`;
}

function dateFromDayKey(dayKey: string): Date {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function formatDayLabel(dayKey: string): string {
  const date = dateFromDayKey(dayKey);
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: PARISH_TIMEZONE,
  }).format(date);
}

export function formatDayNumber(dayKey: string): string {
  const date = dateFromDayKey(dayKey);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    timeZone: PARISH_TIMEZONE,
  }).format(date);
}

export function isToday(dayKey: string, now = new Date()): boolean {
  return dayKey === dayKeyInParish(now);
}

export function groupEventsByDay(
  events: CalendarEvent[],
  weekStartKey: string,
): Map<string, CalendarEvent[]> {
  const weekDays = new Set(getWeekDayKeys(weekStartKey));
  const map = new Map<string, CalendarEvent[]>();

  for (const day of weekDays) {
    map.set(day, []);
  }

  for (const event of events) {
    const key = dayKeyInParish(new Date(event.start));
    if (!weekDays.has(key)) continue;
    const list = map.get(key) ?? [];
    list.push(event);
    map.set(key, list);
  }

  for (const [, list] of map) {
    list.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  }

  return map;
}

export function clampWeekStart(
  weekStartKey: string,
  now: Date,
  windowEnd: Date,
): string {
  const min = startOfWeekSunday(now);
  const max = startOfWeekSunday(windowEnd);
  if (weekStartKey < min) return min;
  if (weekStartKey > max) return max;
  return weekStartKey;
}

export function getEventWeekStart(event: CalendarEvent): string {
  return startOfWeekSunday(new Date(event.start));
}

export function canGoToPreviousWeek(
  weekStartKey: string,
  now: Date,
): boolean {
  const min = startOfWeekSunday(now);
  return weekStartKey > min;
}

export function canGoToNextWeek(
  weekStartKey: string,
  windowEnd: Date,
): boolean {
  const max = startOfWeekSunday(windowEnd);
  return weekStartKey < max;
}
