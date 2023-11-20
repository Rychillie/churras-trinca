import { NoEvents, NoLogin } from "@/components/layout";
import { getEvents, getSession } from "@/lib/actions";

export default async function Home() {
  const events = await getEvents();
  const session = await getSession();

  return (
    <main>
      {events.length > 0 ? <></> : session ? <NoEvents /> : <NoLogin />}
    </main>
  );
}
