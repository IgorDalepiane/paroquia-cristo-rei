"use client";

import type { CalendarEvent } from "@/content/events";
import {
  WEEKDAY_LABELS,
  formatDayNumber,
  groupEventsByDay,
  isToday,
} from "@/lib/calendar/week";

const PARISH_TIMEZONE = "America/Sao_Paulo";

function formatEventTime(event: CalendarEvent): string | null {
  if (event.allDay) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: PARISH_TIMEZONE,
  }).format(new Date(event.start));
}

type EventChipProps = {
  event: CalendarEvent;
  calendarColor?: string;
  onClick: () => void;
};

function EventChip({ event, calendarColor, onClick }: EventChipProps) {
  const time = formatEventTime(event);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-start gap-1.5 rounded border border-border bg-background px-2 py-1.5 text-left text-xs transition-colors hover:border-accent/30 hover:bg-surface"
      style={{ borderLeftWidth: "3px", borderLeftColor: calendarColor }}
    >
      <span className="min-w-0 flex-1">
        {time ? (
          <span className="block text-[0.65rem] text-muted">{time}</span>
        ) : null}
        <span className="line-clamp-2 font-medium text-foreground">
          {event.title}
        </span>
      </span>
    </button>
  );
}

type WeekCalendarProps = {
  events: CalendarEvent[];
  weekStartKey: string;
  colorMap: Map<string, string>;
  onEventClick: (event: CalendarEvent) => void;
};

export function WeekCalendar({
  events,
  weekStartKey,
  colorMap,
  onEventClick,
}: WeekCalendarProps) {
  const eventsByDay = groupEventsByDay(events, weekStartKey);
  const dayKeys = Array.from(eventsByDay.keys());

  return (
    <>
      <div className="hidden gap-2 md:grid md:grid-cols-7">
        {dayKeys.map((dayKey, index) => (
          <DayColumn
            key={dayKey}
            dayKey={dayKey}
            weekdayLabel={WEEKDAY_LABELS[index]}
            events={eventsByDay.get(dayKey) ?? []}
            colorMap={colorMap}
            onEventClick={onEventClick}
          />
        ))}
      </div>

      <div className="space-y-2 md:hidden">
        {dayKeys.map((dayKey, index) => (
          <DayRow
            key={dayKey}
            dayKey={dayKey}
            weekdayLabel={WEEKDAY_LABELS[index]}
            events={eventsByDay.get(dayKey) ?? []}
            colorMap={colorMap}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </>
  );
}

type DayProps = {
  dayKey: string;
  weekdayLabel: string;
  events: CalendarEvent[];
  colorMap: Map<string, string>;
  onEventClick: (event: CalendarEvent) => void;
};

function DayColumn({
  dayKey,
  weekdayLabel,
  events,
  colorMap,
  onEventClick,
}: DayProps) {
  const today = isToday(dayKey);

  return (
    <div
      className={`min-h-32 rounded-lg border border-border p-2 ${
        today ? "bg-muted-bg ring-1 ring-accent/20" : "bg-background"
      }`}
    >
      <DayHeader dayKey={dayKey} weekdayLabel={weekdayLabel} today={today} />
      <div className="mt-2 space-y-1.5">
        {events.length === 0 ? (
          <p className="py-2 text-center text-xs text-muted">—</p>
        ) : (
          events.map((event) => (
            <EventChip
              key={event.id}
              event={event}
              calendarColor={colorMap.get(event.calendarLabel)}
              onClick={() => onEventClick(event)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DayRow({
  dayKey,
  weekdayLabel,
  events,
  colorMap,
  onEventClick,
}: DayProps) {
  const today = isToday(dayKey);

  return (
    <div
      className={`rounded-lg border border-border px-3 py-2 ${
        today ? "bg-muted-bg ring-1 ring-accent/20" : "bg-background"
      }`}
    >
      <DayHeader
        dayKey={dayKey}
        weekdayLabel={weekdayLabel}
        today={today}
        compact
      />
      <div className="mt-2 space-y-1.5">
        {events.length === 0 ? (
          <p className="text-xs text-muted">Sem eventos</p>
        ) : (
          events.map((event) => (
            <EventChip
              key={event.id}
              event={event}
              calendarColor={colorMap.get(event.calendarLabel)}
              onClick={() => onEventClick(event)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DayHeader({
  dayKey,
  weekdayLabel,
  today,
  compact = false,
}: {
  dayKey: string;
  weekdayLabel: string;
  today: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "flex-col"}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {weekdayLabel}
      </span>
      <span
        className={`flex items-center gap-1 text-sm font-semibold ${
          today ? "text-accent" : "text-foreground"
        }`}
      >
        {formatDayNumber(dayKey)}
        {today ? (
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        ) : null}
      </span>
    </div>
  );
}
