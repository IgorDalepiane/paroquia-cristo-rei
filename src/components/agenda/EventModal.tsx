"use client";

import { useEffect, useRef } from "react";
import type { CalendarEvent } from "@/content/events";
import { formatDayLabel } from "@/lib/calendar/week";
import { EventDetailContent } from "./EventDetail";

export type EventModalState =
  | { type: "event"; event: CalendarEvent }
  | { type: "day"; dayKey: string; events: CalendarEvent[] }
  | null;

type EventModalProps = {
  state: EventModalState;
  colorMap: Map<string, string>;
  onClose: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
};

export function EventModal({
  state,
  colorMap,
  onClose,
  onSelectEvent,
}: EventModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [state]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/40"
    >
      {state ? (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div
            role="document"
            className="relative w-full max-w-lg rounded-lg border border-border bg-surface p-5 shadow-lg md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 cursor-pointer rounded-full p-1 text-muted transition-colors hover:bg-muted-bg hover:text-foreground"
              aria-label="Fechar"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>

            {state.type === "event" ? (
              <EventDetailContent
                event={state.event}
                calendarColor={colorMap.get(state.event.calendarLabel)}
              />
            ) : (
              <div>
                <h2
                  id="event-modal-title"
                  className="pr-8 text-lg font-semibold text-foreground"
                >
                  {formatDayLabel(state.dayKey)}
                </h2>
                <ul className="mt-4 space-y-2">
                  {state.events.map((event) => (
                    <li key={event.id}>
                      <button
                        type="button"
                        onClick={() => onSelectEvent(event)}
                        className="w-full cursor-pointer rounded-md border border-border px-3 py-2 text-left text-sm transition-colors hover:border-accent/30 hover:bg-background"
                      >
                        <span
                          className="mr-2 inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: colorMap.get(event.calendarLabel),
                          }}
                        />
                        {event.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
