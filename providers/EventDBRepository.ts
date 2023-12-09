import axios from "axios";
import { API_MONGODB_URL, API_POSTGRESTDB_URL } from "@/config";
import { Event } from "@/models/Event";

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

  
  const connectDb: string = "mongo"; 

  // Switch the backend api url from Mongo to Postgrest
  const url =
    connectDb === "mongo"
      ? `${API_MONGODB_URL}/events`
      : `${API_POSTGRESTDB_URL}/events`;

  const response = await axios.get(url);

  console.log(JSON.stringify(response.data, null, 2));
  return response.data;
}

export function getEventById(_id: string): Event | undefined {
  const connectDb: string = "mongo";
  const url =
  connectDb === "mongo"
    ? `${API_MONGODB_URL}/events/${_id}`
    : `${API_POSTGRESTDB_URL}/events/${_id}`;
  return url.find((event) => event.id === _id);
}

export async function findEventById(eventId: string): Promise<Event | null> {
  const connectDb: string = "mongo";

  // Switch the backend api url from Mongo to Postgrest
  const url =
    connectDb === "mongo"
      ? `${API_MONGODB_URL}/events/${eventId}`
      : `${API_POSTGRESTDB_URL}/events/${eventId}`;

  try {
    const response = await axios.get(url);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    // Handle errors, for example, log the error and return null
    console.error("Error finding event by ID:", error);
    return null;
  }
}
