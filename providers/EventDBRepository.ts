import { Event } from "@/models/Event";
import axios from "axios";

interface AllEventsParams {
  year?: number;
  month?: number;
  searchQuery?: string;
}

export async function allEvents({
  year,
  month,
  searchQuery,
}: AllEventsParams = {}): Promise<Event[]> {
  const queryParams = new URLSearchParams();

  if (year !== undefined) {
    queryParams.set("year", year.toString());
  }
  if (month !== undefined) {
    queryParams.set("month", month.toString());
  }
  if (searchQuery) {
    queryParams.set("searchQuery", searchQuery);
  }

  const url = `http://localhost:3000/api/events?${queryParams.toString()}`;
  const response = await axios.get(url);

  console.log(JSON.stringify(response.data, null, 2));
  return response.data;
}
