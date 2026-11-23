export type MassScheduleEntry = {
  day: string;
  times: string[];
  note?: string;
};

export type ConfessionSchedule = {
  day: string;
  times: string[];
};

export const confessionSchedules: ConfessionSchedule[] = [
  {
    day: "Segunda a sexta-feira",
    times: ["08h30 às 11h", "14h às 17h"],
  },
];

export const quickScheduleHighlight = {
  label: "Próximas missas dominicais",
  location: "Igreja matriz — Paróquia Cristo Rei",
};

export const SCHEDULE_UNAVAILABLE_FALLBACK =
  "Horários indisponíveis — consulte a agenda";
