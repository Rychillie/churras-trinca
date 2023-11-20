import { getEvents, getSession } from "@/lib/actions";
import Navbar from "./navbar";

export default async function Nav() {
  const events = await getEvents();
  const session = await getSession();

  return <Navbar session={session} hasEvents={events.length > 0} />;
}
