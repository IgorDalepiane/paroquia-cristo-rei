export type CalendarSource = {
  slug: string;
  label: string;
};

export type CalendarEvent = {
  id: string;
  calendarSlug: string;
  calendarLabel: string;
  title: string;
  description?: string;
  start: string;
  end: string | null;
  allDay: boolean;
  location?: string;
};
