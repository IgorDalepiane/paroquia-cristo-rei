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
  { day: "Sábado", times: ["15h às 17h30"] },
  { day: "Domingo", times: ["30 minutos antes de cada missa"] },
];

export const quickScheduleHighlight = {
  label: "Próximas missas dominicais",
  location: "Igreja matriz — Paróquia Cristo Rei",
};

export const SCHEDULE_UNAVAILABLE_FALLBACK =
  "Horários indisponíveis — consulte a agenda";
