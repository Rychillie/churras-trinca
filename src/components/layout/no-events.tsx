"use client";

import { useCreateEventModal } from "@/components/layout";

export default function NoEvents() {
  const { CreateEventModal, setShowCreateEventModal } = useCreateEventModal();

  return (
    <>
      <CreateEventModal />
      <div className="mx-auto flex h-screen w-full max-w-prose flex-col items-center justify-center gap-2 px-6 py-12 text-center md:gap-4">
        <h2 className="text-2xl font-bold text-black dark:text-white md:text-4xl">
          Ainda não há eventos!
        </h2>
        <p className="text-neutral-800 dark:text-neutral-200">
          Crie um evento para começar a organizar o seu churras.
        </p>

        <button
          className="mt-3 flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-neutral-200 bg-white text-sm text-black shadow-sm transition-all duration-75 hover:bg-neutral-50 focus:outline-none dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950 sm:max-w-xs"
          onClick={() => setShowCreateEventModal(true)}
        >
          Criar evento
        </button>
      </div>
    </>
  );
}
