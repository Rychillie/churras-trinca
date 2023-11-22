import { Event } from "@prisma/client";
import { Session } from "next-auth";

type ListEventsProps = {
  session: Session | null;
  events: Event[];
  userId?: string;
};

export function ListEvents({ session, events, userId }: ListEventsProps) {
  return session
    ? events.filter(
        (event) => event.status === "published" || event.creatorId === userId,
      )
    : events.filter((event) => event.status === "published");
}
