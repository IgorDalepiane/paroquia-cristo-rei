"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CalendarEvent, CalendarSource } from "@/content/events";
import { buildCalendarColorMap } from "@/lib/calendar/calendar-colors";
import { endOfDisplayWindow } from "@/lib/calendar/events";
import {
  addDaysToDayKey,
  canGoToNextWeek,
  canGoToPreviousWeek,
  clampWeekStart,
  formatWeekRange,
  getEventWeekStart,
  startOfWeekSunday,
} from "@/lib/calendar/week";
import { CalendarFilter } from "./CalendarFilter";
import { EventModal, type EventModalState } from "./EventModal";
import { WeekCalendar } from "./WeekCalendar";

type AgendaViewProps = {
  sources: CalendarSource[];
  events: CalendarEvent[];
  initialEventId?: string;
};

export function AgendaView({
  sources,
  events,
  initialEventId,
}: AgendaViewProps) {
  const router = useRouter();
  const [hiddenSlugs, setHiddenSlugs] = useState<Set<string>>(() => new Set());
  const [modalState, setModalState] = useState<EventModalState>(null);

  const now = useMemo(() => new Date(), []);
  const windowEnd = useMemo(() => endOfDisplayWindow(now), [now]);

  const [weekStartKey, setWeekStartKey] = useState(() =>
    clampWeekStart(startOfWeekSunday(now), now, windowEnd),
  );

  const colorMap = useMemo(
    () => buildCalendarColorMap(sources.map((s) => s.label)),
    [sources],
  );

  const filtered = useMemo(
    () => events.filter((event) => !hiddenSlugs.has(event.calendarSlug)),
    [events, hiddenSlugs],
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
      setModalState({ type: "event", event });
      router.replace(`/agenda?event=${event.id}`, { scroll: false });
    },
    [router],
  );

  const closeModal = useCallback(() => {
    setModalState(null);
    router.replace("/agenda", { scroll: false });
  }, [router]);

  useEffect(() => {
    if (!initialEventId) return;
    const event = events.find((item) => item.id === initialEventId);
    if (!event) return;

    setWeekStartKey(
      clampWeekStart(getEventWeekStart(event), now, windowEnd),
    );
    setModalState({ type: "event", event });
  }, [initialEventId, events, now, windowEnd]);

  const goToPreviousWeek = () => {
    setWeekStartKey((current) =>
      clampWeekStart(addDaysToDayKey(current, -7), now, windowEnd),
    );
  };

  const goToNextWeek = () => {
    setWeekStartKey((current) =>
      clampWeekStart(addDaysToDayKey(current, 7), now, windowEnd),
    );
  };

  const goToToday = () => {
    setWeekStartKey(clampWeekStart(startOfWeekSunday(now), now, windowEnd));
  };

  const canGoPrev = canGoToPreviousWeek(weekStartKey, now);
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
            : "Nenhum evento nos próximos 3 meses. Volte em breve ou consulte os calendários paroquiais."}
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
