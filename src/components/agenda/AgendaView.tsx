"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CalendarEvent } from "@/content/events";
import { calendarEvents, calendarSources } from "@/content/events.generated";
import { replaceAgendaUrl } from "@/lib/calendar/agenda-url";
import { buildCalendarColorMap } from "@/lib/calendar/calendar-colors";
import {
  DISPLAY_MONTH_COUNT,
  endOfDisplayWindow,
  getDisplayEvents,
  startOfDisplayWindow,
} from "@/lib/calendar/events";
import {
  addDaysToDayKey,
  canGoToNextWeek,
  canGoToPreviousWeek,
  clampWeekStart,
  formatWeekRange,
  getEventWeekStart,
  startOfWeek,
} from "@/lib/calendar/week";
import { CalendarFilter } from "./CalendarFilter";
import { EventModal, type EventModalState } from "./EventModal";
import { WeekCalendar } from "./WeekCalendar";

type AgendaViewProps = {
  initialEventId?: string;
  initialWeekStartKey: string;
};

export function AgendaView({
  initialEventId,
  initialWeekStartKey,
}: AgendaViewProps) {
  const hydratedEventIdRef = useRef<string | undefined>(undefined);
  const [hiddenSlugs, setHiddenSlugs] = useState<Set<string>>(() => new Set());
  const [modalState, setModalState] = useState<EventModalState>(null);

  const now = useMemo(() => new Date(), []);
  const windowStart = useMemo(() => startOfDisplayWindow(now), [now]);
  const windowEnd = useMemo(() => endOfDisplayWindow(now), [now]);
  const sources = calendarSources;
  const events = useMemo(() => getDisplayEvents(calendarEvents, now), [now]);

  const [weekStartKey, setWeekStartKey] = useState(initialWeekStartKey);

  const colorMap = useMemo(
    () => buildCalendarColorMap(sources.map((s) => s.label)),
    [sources],
  );

  const filtered = useMemo(
    () => events.filter((event) => !hiddenSlugs.has(event.calendarSlug)),
    [events, hiddenSlugs],
  );

  const syncUrl = useCallback((week: string, eventId?: string) => {
    replaceAgendaUrl({ week, event: eventId });
  }, []);

  const setWeek = useCallback(
    (nextWeek: string, eventId?: string) => {
      const clamped = clampWeekStart(nextWeek, windowStart, windowEnd);
      setWeekStartKey(clamped);
      syncUrl(clamped, eventId);
    },
    [syncUrl, windowEnd, windowStart],
  );

  const toggleCalendar = useCallback((slug: string) => {
    setHiddenSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const allCalendarsHidden =
    sources.length > 0 && hiddenSlugs.size >= sources.length;

  const openEvent = useCallback(
    (event: CalendarEvent) => {
      const eventWeek = clampWeekStart(
        getEventWeekStart(event),
        windowStart,
        windowEnd,
      );
      setWeekStartKey(eventWeek);
      setModalState({ type: "event", event });
      hydratedEventIdRef.current = event.id;
      syncUrl(eventWeek, event.id);
    },
    [syncUrl, windowEnd, windowStart],
  );

  const closeModal = useCallback(() => {
    setModalState(null);
    hydratedEventIdRef.current = undefined;
    syncUrl(weekStartKey);
  }, [syncUrl, weekStartKey]);

  useEffect(() => {
    if (!initialEventId) {
      hydratedEventIdRef.current = undefined;
      return;
    }
    if (hydratedEventIdRef.current === initialEventId) return;

    const event = events.find((item) => item.id === initialEventId);
    if (!event) return;

    const eventWeek = clampWeekStart(
      getEventWeekStart(event),
      windowStart,
      windowEnd,
    );
    setWeekStartKey(eventWeek);
    setModalState({ type: "event", event });
    hydratedEventIdRef.current = initialEventId;

    if (eventWeek !== initialWeekStartKey) {
      syncUrl(eventWeek, event.id);
    }
  }, [
    initialEventId,
    initialWeekStartKey,
    events,
    syncUrl,
    windowEnd,
    windowStart,
  ]);

  const goToPreviousWeek = () => {
    setWeek(addDaysToDayKey(weekStartKey, -7));
  };

  const goToNextWeek = () => {
    setWeek(addDaysToDayKey(weekStartKey, 7));
  };

  const goToToday = () => {
    setWeek(startOfWeek(now));
  };

  const canGoPrev = canGoToPreviousWeek(weekStartKey, windowStart);
  const canGoNext = canGoToNextWeek(weekStartKey, windowEnd);

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 -mx-1 border-b border-border bg-background/95 px-1 pb-3 backdrop-blur">
        {sources.length > 1 ? (
          <CalendarFilter
            sources={sources}
            hiddenSlugs={hiddenSlugs}
            onToggle={toggleCalendar}
          />
        ) : null}

        <div
          className={`flex flex-wrap items-center justify-between gap-3 ${
            sources.length > 1 ? "mt-3" : ""
          }`}
        >
          <p className="text-sm font-medium text-foreground">
            {formatWeekRange(weekStartKey)}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToToday}
              className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-foreground/30 hover:bg-surface"
            >
              Hoje
            </button>
            <button
              type="button"
              onClick={goToPreviousWeek}
              disabled={!canGoPrev}
              aria-label="Semana anterior"
              className="cursor-pointer rounded-full border border-border px-2.5 py-1 text-sm transition-colors hover:border-foreground/30 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goToNextWeek}
              disabled={!canGoNext}
              aria-label="Próxima semana"
              className="cursor-pointer rounded-full border border-border px-2.5 py-1 text-sm transition-colors hover:border-foreground/30 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-surface px-4 py-8 text-center text-sm text-muted">
          {allCalendarsHidden
            ? "Nenhum calendário visível. Toque nos filtros para exibir eventos."
            : `Nenhum evento nos próximos ${DISPLAY_MONTH_COUNT} meses. Volte em breve ou consulte os calendários paroquiais.`}
        </p>
      ) : (
        <WeekCalendar
          events={filtered}
          weekStartKey={weekStartKey}
          colorMap={colorMap}
          onEventClick={openEvent}
          onDayOverflowClick={(dayKey, dayEvents) =>
            setModalState({ type: "day", dayKey, events: dayEvents })
          }
        />
      )}

      <EventModal
        state={modalState}
        colorMap={colorMap}
        onClose={closeModal}
        onSelectEvent={openEvent}
      />
    </div>
  );
}
