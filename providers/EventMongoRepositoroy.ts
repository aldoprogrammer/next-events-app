import { Event } from "@/models/Event";
import axios from "axios";

export async function allEvents() {
    const response = await axios.get("http://localhost:3000/api/events");
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
}