"use client";

import { Button } from "@/components/elements";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [hydratate, setHydratate] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydratate(true);
      toast.success("Carregado com sucesso! 😃");
    }
  }, []);

  return (
    <>
      <main className="mx-auto flex h-screen w-full max-w-prose flex-col items-center justify-center gap-2 px-6 py-12 md:gap-4">
        <h2 className="text-2xl font-bold text-black dark:text-white md:text-4xl">
          Hello world
        </h2>
        <p className="text-neutral-800 dark:text-neutral-200">
          This project is under development!
        </p>

        <button
          className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border border-neutral-200 bg-white text-sm text-black shadow-sm transition-all duration-75 hover:bg-neutral-50 focus:outline-none dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950 sm:max-w-sm"
          onClick={() => {
            toast.success("Botão clicado!");
          }}
        >
          Button
        </button>
      </main>
    </>
  );
}
