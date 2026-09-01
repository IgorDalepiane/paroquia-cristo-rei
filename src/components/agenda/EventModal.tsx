"use client";

import { useEffect, useRef } from "react";
import type { CalendarEvent } from "@/content/events";
import { EventDetailContent } from "./EventDetail";

export type EventModalState = CalendarEvent | null;

type EventModalProps = {
  state: EventModalState;
  colorMap: Map<string, string>;
  onClose: () => void;
};

export function EventModal({ state, colorMap, onClose }: EventModalProps) {
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

            <EventDetailContent
              event={state}
              calendarColor={colorMap.get(state.calendarLabel)}
            />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
