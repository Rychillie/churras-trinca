import { Event } from "@prisma/client";
import { Session } from "next-auth";

type ListEventsProps = {
  session: Session | null;
  events: Event[];
  userId?: string;
};

export function ListEvents({ session, events, userId }: ListEventsProps) {
  return session
    ? events.map((event) => {
        if (event.status === "published") {
          return event;
        } else if (event.status === "draft" && event.creatorId === userId) {
          return event;
        }
      })
    : events.filter((event) => event.status === "published");
}
