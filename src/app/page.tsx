import EventCard from "@/components/elements/event-card";
import { NoEvents } from "@/components/layout";
import { getEvents } from "@/lib/actions/events";
import { getSession, getUser } from "@/lib/actions/session";
import { ListEvents } from "@/lib/utils";
import { Suspense } from "react";

export default async function Home() {
  const events = await getEvents();
  const session = await getSession();
  const user = await getUser({ session });
  const filteredEvents = ListEvents({
    events,
    session,
    userId: user?.id,
  });

  return (
    <main className="mx-auto my-16 w-full max-w-prose px-6 py-8 h-auto">
      {filteredEvents.length > 0 ? (
        events.map((event) => (
          <Suspense key={event.id} fallback="">
            <EventCard slug={event.slug} />
          </Suspense>
        ))
      ) : (
        <NoEvents session={session} creatorId={user?.id} />
      )}
    </main>
  );
}
