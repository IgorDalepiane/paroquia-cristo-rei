import type { Metadata } from "next";
import { AgendaView } from "@/components/agenda/AgendaView";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTitleBar } from "@/components/ui/PageTitleBar";
import {
  calendarEvents,
  calendarSources,
} from "@/content/events.generated";
import {
  breadcrumbJsonLd,
  eventJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { getUpcomingEvents } from "@/lib/calendar/events";

export const metadata: Metadata = pageMetadata({
  title: "Agenda",
  description:
    "Agenda paroquial — eventos, festas e atividades da Paróquia Cristo Rei.",
  path: "/agenda",
});

type AgendaPageProps = {
  searchParams: Promise<{ event?: string }>;
};

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const params = await searchParams;
  const eventId =
    typeof params.event === "string" ? params.event : undefined;

  const upcomingEvents = getUpcomingEvents(calendarEvents);

  const selectedEvent = eventId
    ? upcomingEvents.find((event) => event.id === eventId)
    : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Agenda", path: "/agenda" },
        ])}
      />
      {selectedEvent ? (
        <JsonLd
          data={eventJsonLd({
            id: selectedEvent.id,
            title: selectedEvent.title,
            description: selectedEvent.description || undefined,
            start: selectedEvent.start,
            end: selectedEvent.end,
            location: selectedEvent.location,
          })}
        />
      ) : null}
      <PageTitleBar title="Agenda" />
      <div className="section-padding">
        <div className="container-wide">
          <AgendaView
            sources={calendarSources}
            events={upcomingEvents}
            initialEventId={eventId}
          />
        </div>
      </div>
    </>
  );
}
