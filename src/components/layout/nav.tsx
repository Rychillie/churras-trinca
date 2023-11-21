import { getEvents } from "@/lib/actions/events";
import { getSession } from "@/lib/actions/session";
import Navbar from "./navbar";

export default async function Nav() {
  const events = await getEvents();
  const session = await getSession();

  return <Navbar session={session} hasEvents={events.length > 0} />;
}
