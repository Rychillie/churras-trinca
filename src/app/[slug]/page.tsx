import { getEvent } from "@/lib/actions/events";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  if (!params.slug) return notFound();
  const data = await getEvent({
    slug: params.slug,
  });

  if (!data) return notFound();

  return (
    <>
      <header className="mx-auto mt-20 w-full max-w-prose px-6">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>{data.description}</p>
      </header>
      <main className="mx-auto w-full max-w-prose px-6"></main>
    </>
  );
}
