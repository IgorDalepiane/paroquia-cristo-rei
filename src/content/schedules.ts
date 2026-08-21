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
  { day: "Terça a quinta-feira", times: ["09h às 11h", "14h às 17h"] },
  { day: "Sexta-feira", times: ["09h às 11h", "14h às 15h"] },
  { day: "Sábados", times: ["09h às 11h"] },
];

export const quickScheduleHighlight = {
  label: "Próximas missas dominicais",
  location: "Igreja matriz — Paróquia Cristo Rei",
};

export const SCHEDULE_UNAVAILABLE_FALLBACK =
  "Horários indisponíveis — consulte a agenda";
