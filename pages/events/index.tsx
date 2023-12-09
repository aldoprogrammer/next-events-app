import React, { useEffect, useState } from "react";
import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { allEvents } from "@/providers/EventDBRepository";
import { useRouter } from "next/router";
import { formatHumanReadableDate } from "@/components/utils/dateReadable";
import classes from "@/pages/events/events-newSearch.module.css";
import Button from "@/components/ui/Button";


interface EventProps {
  _id: string;
  title: string;
  location: string;
  date: string;
}

function AllEventsPage() {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const router = useRouter();

  const fetchEvents = async () => {
    const eventsData = await allEvents();
    setEvents(eventsData);
  };

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const findEventHandler = (year: number, month: number) => {
    const eventSearchPath = `events/${year}/${month}`;
    router.push(eventSearchPath);
  };

  const searchByIdTitleLocHandler = async (query: string) => {
    setSearchQuery(query);

    // Wait for the fetchEvents function to complete
    await fetchEvents();

    const filteredEvents = events.filter((event) => {
      const { _id, title, location, date } = event;
      const lowerCaseQuery = query.toLowerCase();
      const formattedDate = formatHumanReadableDate(date);

      // Check if the query matches title, location, id, or formatted date
      return (
        _id.toLowerCase().includes(lowerCaseQuery) ||
        title.toLowerCase().includes(lowerCaseQuery) ||
        location.toLowerCase().includes(lowerCaseQuery) ||
        formattedDate.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFilteredEvents(filteredEvents);
    setNoResults(filteredEvents.length === 0);
  };

  const addEventForm = `/events/add-event`;


  return (
    <>
      <EventSearch onSearch={findEventHandler} onSearchByIdTitleLoc={searchByIdTitleLocHandler} />
      <div className={classes.h2}>
      <Button link={addEventForm}
      >
          <span >
            Add Event
          </span>
        </Button>
        </div>
      {searchQuery && <h2 className={classes.h2}>Search results for: {searchQuery}</h2>}
      
      {noResults ? (
        <h2 className={classes.h2}>No events found here</h2>
      ) : (
        <EventList items={searchQuery ? filteredEvents : events} />
      )}
    </>
  );
}

export default AllEventsPage;
