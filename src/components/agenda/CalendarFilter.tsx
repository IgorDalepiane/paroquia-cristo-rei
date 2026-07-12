"use client";

import type { CalendarSource } from "@/content/events";
import { buildCalendarColorMap } from "@/lib/calendar/calendar-colors";

type CalendarFilterProps = {
  sources: CalendarSource[];
  hiddenSlugs: Set<string>;
  onToggle: (slug: string) => void;
};

export function CalendarFilter({
  sources,
  hiddenSlugs,
  onToggle,
}: CalendarFilterProps) {
  const colorMap = buildCalendarColorMap(sources.map((s) => s.label));

  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => {
        const color = colorMap.get(source.label);
        const isHidden = hiddenSlugs.has(source.slug);
        return (
          <button
            key={source.slug}
            type="button"
            onClick={() => onToggle(source.slug)}
            aria-pressed={!isHidden}
            className={`cursor-pointer rounded-full border px-3 py-1 text-sm text-foreground transition-all ${
              isHidden ? "opacity-45 grayscale" : "opacity-100 hover:opacity-90"
            }`}
            style={{
              backgroundColor: color,
              borderColor: color,
            }}
          >
            {source.label}
          </button>
        );
      })}
    </div>
  );
}
