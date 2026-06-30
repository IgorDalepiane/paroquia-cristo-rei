export type MassScheduleEntry = {
  day: string;
  times: string[];
  note?: string;
};

export type ConfessionSchedule = {
  day: string;
  times: string[];
};

export const massSchedules: MassScheduleEntry[] = [
  { day: "Segunda-feira", times: ["18h30"] },
  { day: "Terça-feira", times: ["18h30"] },
  { day: "Quarta-feira", times: ["18h30"] },
  { day: "Quinta-feira", times: ["18h30"], note: "Horário provisório — confirmar com a paróquia" },
  { day: "Sexta-feira", times: ["18h30"] },
  { day: "Sábado", times: ["18h"] },
  { day: "Domingo", times: ["8h", "10h", "17h", "19h"] },
];

export const confessionSchedules: ConfessionSchedule[] = [
  { day: "Sábado", times: ["15h às 17h30"] },
  { day: "Domingo", times: ["30 minutos antes de cada missa"] },
];

export const quickScheduleHighlight = {
  label: "Próximas missas dominicais",
  times: "8h · 10h · 17h · 19h",
  location: "Igreja matriz — Paróquia Cristo Rei",
};
