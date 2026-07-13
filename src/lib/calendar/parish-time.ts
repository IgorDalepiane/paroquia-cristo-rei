export const PARISH_TIMEZONE = "America/Sao_Paulo";

export function dayKeyInParish(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PARISH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function parishYearMonth(now: Date): { year: number; month: number } {
  const dayKey = dayKeyInParish(now);
  const [year, month] = dayKey.split("-").map(Number);
  return { year, month };
}

function parishHourMinute(date: Date): { hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PARISH_TIMEZONE,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  return {
    hour: Number(parts.find((part) => part.type === "hour")?.value ?? 0),
    minute: Number(parts.find((part) => part.type === "minute")?.value ?? 0),
  };
}

/** Midnight on a parish calendar day (YYYY-MM-DD). */
export function startOfParishDay(dayKey: string): Date {
  const [year, month, day] = dayKey.split("-").map(Number);
  let candidate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  while (dayKeyInParish(candidate) === dayKey) {
    const { hour, minute } = parishHourMinute(candidate);
    if (hour === 0 && minute === 0) return candidate;
    candidate = new Date(candidate.getTime() - 60 * 60 * 1000);
  }

  candidate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  while (dayKeyInParish(candidate) === dayKey) {
    const { hour, minute } = parishHourMinute(candidate);
    if (hour === 0 && minute === 0) return candidate;
    candidate = new Date(candidate.getTime() + 60 * 60 * 1000);
  }

  return new Date(Date.UTC(year, month - 1, day, 3, 0, 0));
}

export function addParishMonths(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const index = year * 12 + (month - 1) + delta;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

export function monthStartDayKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}
