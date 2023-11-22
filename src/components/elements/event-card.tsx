import { getEvent } from "@/lib/actions/events";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { Event } from "@prisma/client";
import Link from "next/link";

export default async function EventCard({ slug }: { slug: Event["slug"] }) {
  const event = await getEvent({ slug });
  if (!event) return null;

  return (
    <Link
      href={`/${event.slug}`}
      className="relative flex w-full flex-col rounded-lg bg-neutral-200/50 p-4 transition-all hover:bg-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-900/50"
    >
      <h1 className="text-xl font-bold text-black dark:text-white">
        {event.name}
      </h1>
      {event.status === "draft" && (
        <span className="absolute right-4 top-4 rounded-full border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-950 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-50">
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
    </Link>
  );
}
