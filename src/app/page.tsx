import { NoEvents } from "@/components/layout";
import { getEvents } from "@/lib/actions/events";
import { getSession, getUser } from "@/lib/actions/session";
import Link from "next/link";

export default async function Home() {
  const events = await getEvents();
  const session = await getSession();
  const user = await getUser({ session });

  return (
    <main className="mx-auto w-full max-w-prose px-6 py-16">
      {events.length > 0 ? (
        events.map((event) => (
          <Link key={event.id} href={`/${event.slug}`}>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
          </Link>
        ))
      ) : (
        <NoEvents session={session} creatorId={user?.id} />
      )}
    </main>
  );
}
