import { COMMUNITY_MASS_ALIASES } from "@/content/community-mass-aliases";
import { getCommunityBySlug } from "@/content/communities";
import type { CalendarEvent } from "@/content/events";
import type { MassScheduleEntry } from "@/content/schedules";
import {
  addParishMonths,
  dayKeyInParish,
  monthStartDayKey,
  parishYearMonth,
  startOfParishDay,
} from "@/lib/calendar/parish-time";
import { addDaysToDayKey, weekdayInParish } from "@/lib/calendar/week";

const PARISH_TIMEZONE = "America/Sao_Paulo";
const MASS_TITLE_PREFIX = /^Missa\b/i;

const WEEKDAY_NAMES: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
};

const aliasesByLongestFragment = [...COMMUNITY_MASS_ALIASES].sort(
  (a, b) => b.fragment.length - a.fragment.length,
);

const weeklyTitlesBySlug = new Map<string, Set<string>>();
for (const alias of COMMUNITY_MASS_ALIASES) {
  if (!alias.weekly) continue;
  const titles = weeklyTitlesBySlug.get(alias.slug) ?? new Set<string>();
  titles.add(`Missa ${alias.fragment}`);
  weeklyTitlesBySlug.set(alias.slug, titles);
}

export const MATRIZ_COMMUNITY_SLUG = "comunidade-01";
export const MATRIZ_MASS_TITLE = "Missa Com. Matriz Cristo Rei";

export type MassScheduleRange = "next-8-days" | "rest-of-month";

export function matchCommunityMassAlias(title: string) {
  const trimmed = title.trim();
  if (!MASS_TITLE_PREFIX.test(trimmed)) return undefined;
  return aliasesByLongestFragment.find((alias) =>
    trimmed.includes(alias.fragment),
  );
}

export function getCommunityHrefForMassTitle(
  title: string,
): string | undefined {
  const alias = matchCommunityMassAlias(title);
  if (!alias) return undefined;
  if (!getCommunityBySlug(alias.slug)) return undefined;
  return `/comunidades/${alias.slug}`;
}

export function formatMassTimeLocal(start: string): string {
  const date = new Date(start);
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: PARISH_TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0,
  );

  if (minute === 0) return `${hour}h`;
  return `${hour}h${String(minute).padStart(2, "0")}`;
}

function capitalizePt(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLocaleUpperCase("pt-BR") + value.slice(1);
}

export function formatMassDayTitle(start: string): string {
  const date = new Date(start);
  const weekday = WEEKDAY_NAMES[weekdayInParish(date)] ?? "";
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: PARISH_TIMEZONE,
    day: "numeric",
    month: "long",
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = capitalizePt(
    parts.find((part) => part.type === "month")?.value ?? "",
  );
  return `${weekday}, ${day} de ${month}`;
}

function timeToMinutes(time: string): number {
  const match = time.match(/^(\d+)h(?:(\d{2}))?$/);
  if (!match) return 0;
  const hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  return hours * 60 + minutes;
}

function endOfParishDay(dayKey: string): Date {
  const nextKey = addDaysToDayKey(dayKey, 1);
  return new Date(startOfParishDay(nextKey).getTime() - 1);
}

function endOfRange(range: MassScheduleRange, now: Date): Date {
  if (range === "next-8-days") {
    const lastKey = addDaysToDayKey(dayKeyInParish(now), 7);
    return endOfParishDay(lastKey);
  }

  const { year, month } = parishYearMonth(now);
  const next = addParishMonths(year, month, 1);
  return new Date(
    startOfParishDay(monthStartDayKey(next.year, next.month)).getTime() - 1,
  );
}

export function getUpcomingMassSchedule(
  events: CalendarEvent[],
  slug: string,
  range: MassScheduleRange,
  now = new Date(),
): MassScheduleEntry[] {
  const weeklyTitles = weeklyTitlesBySlug.get(slug);
  if (!weeklyTitles || weeklyTitles.size === 0) return [];

  const windowEnd = endOfRange(range, now);
  const byDay = new Map<
    string,
    { label: string; times: Map<string, number> }
  >();

  for (const event of events) {
    if (event.allDay || !weeklyTitles.has(event.title)) continue;

    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : start;
    if (end.getTime() < now.getTime()) continue;
    if (start.getTime() > windowEnd.getTime()) continue;

    const dayKey = dayKeyInParish(start);
    const timeStr = formatMassTimeLocal(event.start);
    const current = byDay.get(dayKey) ?? {
      label: formatMassDayTitle(event.start),
      times: new Map<string, number>(),
    };
    current.times.set(timeStr, timeToMinutes(timeStr));
    byDay.set(dayKey, current);
  }

  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, entry]) => ({
      day: entry.label,
      times: [...entry.times.entries()]
        .sort((a, b) => a[1] - b[1])
        .map(([time]) => time),
    }));
}

export function getCommunityWeeklySchedule(
  events: CalendarEvent[],
  slug: string,
  now = new Date(),
): MassScheduleEntry[] {
  return getUpcomingMassSchedule(events, slug, "rest-of-month", now);
}

export function getMatrizWeeklySchedule(
  events: CalendarEvent[],
  now = new Date(),
): MassScheduleEntry[] {
  return getUpcomingMassSchedule(
    events,
    MATRIZ_COMMUNITY_SLUG,
    "next-8-days",
    now,
  );
}

export function getSundayMatrizTimesLine(
  events: CalendarEvent[],
  now = new Date(),
): string | null {
  const sundayEntry = getMatrizWeeklySchedule(events, now).find((entry) =>
    entry.day.startsWith("Domingo"),
  );

  if (!sundayEntry || sundayEntry.times.length === 0) return null;
  return sundayEntry.times.join(" · ");
}
