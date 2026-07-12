import type { MassScheduleEntry } from "@/content/schedules";
import type { CalendarEvent } from "@/content/events";
import { getUpcomingEvents } from "@/lib/calendar/events";
import { weekdayInParish } from "@/lib/calendar/week";

const PARISH_TIMEZONE = "America/Sao_Paulo";

export const MATRIZ_MASS_TITLE = "Missa Com. Matriz Cristo Rei";

const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

const WEEKDAY_NAMES: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
};

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

function timeToMinutes(time: string): number {
  const match = time.match(/^(\d+)h(?:(\d{2}))?$/);
  if (!match) return 0;
  const hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  return hours * 60 + minutes;
}

export function getMatrizWeeklySchedule(
  events: CalendarEvent[],
  now = new Date(),
): MassScheduleEntry[] {
  const upcoming = getUpcomingEvents(events, now);
  const byWeekday = new Map<number, Map<string, number>>();

  for (const event of upcoming) {
    if (event.title !== MATRIZ_MASS_TITLE || event.allDay) continue;

    const weekday = weekdayInParish(new Date(event.start));
    const timeStr = formatMassTimeLocal(event.start);
    const dayTimes = byWeekday.get(weekday) ?? new Map<string, number>();
    dayTimes.set(timeStr, timeToMinutes(timeStr));
    byWeekday.set(weekday, dayTimes);
  }

  return WEEKDAY_ORDER.filter((weekday) => byWeekday.has(weekday)).map(
    (weekday) => ({
      day: WEEKDAY_NAMES[weekday],
      times: [...(byWeekday.get(weekday)?.entries() ?? [])]
        .sort((a, b) => a[1] - b[1])
        .map(([time]) => time),
    }),
  );
}

export function getSundayMatrizTimesLine(
  events: CalendarEvent[],
  now = new Date(),
): string | null {
  const sundayEntry = getMatrizWeeklySchedule(events, now).find(
    (entry) => entry.day === "Domingo",
  );

  if (!sundayEntry || sundayEntry.times.length === 0) return null;
  return sundayEntry.times.join(" · ");
}
