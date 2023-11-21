import { NoEvents } from "@/components/layout";
import { getEvents, getSession } from "@/lib/actions";

export default async function Home() {
  const events = await getEvents();
  const session = await getSession();

  return (
    <main>{events.length > 0 ? <></> : <NoEvents session={session} />}</main>
  );
}
