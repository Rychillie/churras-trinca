import { getEvents } from "@/lib/actions/events";
import { getSession, getUser } from "@/lib/actions/session";
import { ListEvents } from "@/lib/utils";
import Navbar from "./navbar";

export default async function Nav() {
  const events = await getEvents();
  const session = await getSession();
  const user = await getUser({ session });
  const filteredEvents = ListEvents({
    events,
    session,
    userId: user?.id,
  });

  return <Navbar session={session} hasEvents={filteredEvents.length > 0} />;
}
