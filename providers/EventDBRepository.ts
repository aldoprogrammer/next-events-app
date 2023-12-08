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

  
  const connectDb: string = "mongo"; // Set your condition here, e.g., process.env.DBConnect_ENV

  // Choose the appropriate URL based on the condition
  const url =
    connectDb === "mongo"
      ? `${API_MONGODB_URL}/events`
      : `${API_POSTGRESTDB_URL}/events`;

  const response = await axios.get(url);

  console.log(JSON.stringify(response.data, null, 2));
  return response.data;
}
