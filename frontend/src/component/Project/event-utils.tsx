import { EventInput } from "@fullcalendar/core";
import uuid from "react-uuid";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: uuid(),
    title: "All-day event",
    start: "2023-09-19",
    end: "2023-09-20",
    allDay: true,
  },
  {
    id: uuid(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
