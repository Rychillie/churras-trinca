import { OptionsDropdown } from "@/components/layout";
import { getEvent } from "@/lib/actions/events";
import { getSession, getUser } from "@/lib/actions/session";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  if (!params.slug) return notFound();
  const session = await getSession();
  const user = await getUser({ session });
  const event = await getEvent({
    slug: params.slug,
  });

  if (!event || (event.status === "draft" && event.creatorId !== user?.id))
    return notFound();

  const isEditor = event.creatorId === user?.id;

  return (
    <>
      {isEditor && <OptionsDropdown />}
      <header className="relative mx-auto mt-20 flex w-full max-w-prose flex-col px-6 pb-6 pt-4 transition-all">
        <h1 className="text-xl font-bold text-black dark:text-white">
          {event.name}
        </h1>
        {event.status === "draft" && (
          <span className="absolute right-6 top-4 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-950 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-50">
            Draft
          </span>
        )}
        <p className="mt-1 line-clamp-2 text-sm text-neutral-700 dark:text-neutral-300">
          {event.description}
        </p>
        <div className="mt-1 flex flex-col gap-1 text-xs text-neutral-700 dark:text-neutral-300 sm:mt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <span>Criado por: {event.creator.name}</span>
          <span>
            {event.date ? event.date.toDateString() : "Sem data definida"} -{" "}
            {event.location ? event.location : "Sem local definido"}
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-prose p-6">
        {event.invites?.length > 0 ? (
          <>
            <h2>Convidados:</h2>

            <ul className="mt-2">
              {event.invites.map((invite) => (
                <li key={invite.id} className="flex items-center gap-2">
                  <span>{invite.email}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex w-full items-center justify-center py-16">
            <h2>Sem convidados</h2>
          </div>
        )}
      </main>
    </>
  );
}
