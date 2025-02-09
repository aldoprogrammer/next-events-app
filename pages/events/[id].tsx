import { useRouter } from "next/router";

import { getEventById } from "@/providers/EventRepository";
import EventSummary from "@/components/event-detail/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventContent from "@/components/event-detail/EventContent";

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query?.id;

  if (typeof eventId === "string") {
    const event = getEventById(eventId);

    if (!event) {
      return <p>No event found!</p>;
    }

    return (
      <>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </>
    );
  }
}

export default EventDetailPage;