// pages/events/FilteredEventsPage.tsx
import { useRouter } from "next/router";
import { filterEvent } from "@/providers/EventRepository";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import { getMonthName } from "@/components/layout/GetMonthName"; 
import Button from "@/components/ui/Button";

function FilteredEventsPage() {
  const router = useRouter();
  const handleExploreEvent = () => {
    router.back();
  };
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear < 2023 ||
    filteredYear > 2024 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return <h2 className="center">Invalid filter, please adjust your value!</h2>;
  }

  const filteredEvents = filterEvent(filteredYear, filteredMonth);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <h2>No events found in {getMonthName(filteredMonth)} {filteredYear}</h2>
        <Button 
            title="Back Button" 
            onClick={handleExploreEvent} 
          />
      </div>
    );
  }

  return (
    <>
      <ResultsTitle year={filteredYear.toString()} month={filteredMonth.toString()} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
