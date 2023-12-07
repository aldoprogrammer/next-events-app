import data from "@/events-data.json";

import { Event } from "@/models/Event";


export function allEvents(): Event[] {
  return data;
}

export function filterEvent(year: number, month: number) {
  return data.filter((event) => {
    const eventDate = event.date.split("-"); // 2023-12-25 => [2023, 12, 25]
    return +eventDate[0] === year && +eventDate[1] === month;
  });
}

export function featuredEvents(): Event[] {
  return data.filter((event) => event.isFeatured);
}
