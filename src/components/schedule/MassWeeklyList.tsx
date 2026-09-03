import type { MassScheduleEntry } from "@/content/schedules";
import { SCHEDULE_UNAVAILABLE_FALLBACK } from "@/content/schedules";

type MassWeeklyListProps = {
  entries: MassScheduleEntry[];
};

export function MassWeeklyList({ entries }: MassWeeklyListProps) {
  if (entries.length === 0) {
    return <p className="text-muted">{SCHEDULE_UNAVAILABLE_FALLBACK}</p>;
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li
          key={entry.day}
          className="border-b border-border pb-4 last:border-0"
        >
          <p className="font-semibold text-accent">{entry.day}:</p>
          <p className="mt-1 text-muted">{entry.times.join(" · ")}</p>
          {entry.note ? (
            <p className="mt-1 text-sm text-accent">* {entry.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
