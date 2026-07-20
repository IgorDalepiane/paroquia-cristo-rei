import { clampWeekStart, startOfWeek } from "@/lib/calendar/week";

const DAY_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function dateFromDayKey(dayKey: string): Date {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function parseWeekParam(value: string | undefined): string | null {
  if (!value || !DAY_KEY_PATTERN.test(value)) return null;
  const [, month, day] = value.split("-").map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = dateFromDayKey(value);
  if (Number.isNaN(date.getTime())) return null;
  return value;
}

export function normalizeWeekStartKey(dayKey: string): string {
  return startOfWeek(dateFromDayKey(dayKey));
}

export function resolveInitialWeekStart(
  weekParam: string | undefined,
  windowStart: Date,
  windowEnd: Date,
  now: Date,
): string {
  const fallback = clampWeekStart(startOfWeek(now), windowStart, windowEnd);
  const parsed = parseWeekParam(weekParam);
  if (!parsed) return fallback;
  return clampWeekStart(normalizeWeekStartKey(parsed), windowStart, windowEnd);
}

export type AgendaSearchParams = {
  week?: string;
  event?: string;
};

export function buildAgendaSearchParams({
  week,
  event,
}: AgendaSearchParams): string {
  const params = new URLSearchParams();
  if (week) params.set("week", week);
  if (event) params.set("event", event);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function buildAgendaPath(params: AgendaSearchParams): string {
  return `/agenda${buildAgendaSearchParams(params)}`;
}

export function agendaPathMatches(
  pathname: string,
  search: string,
  target: AgendaSearchParams,
): boolean {
  return `${pathname}${search}` === buildAgendaPath(target);
}

/** Sync agenda query params without a Next soft navigation / RSC refetch. */
export function replaceAgendaUrl(params: AgendaSearchParams): void {
  if (typeof window === "undefined") return;
  if (
    agendaPathMatches(window.location.pathname, window.location.search, params)
  ) {
    return;
  }
  window.history.replaceState(
    window.history.state,
    "",
    buildAgendaPath(params),
  );
}
