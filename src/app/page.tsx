"use client";

import { Button } from "@/components/elements";
import { useToastStore } from "@/lib/stores/toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [hydratate, setHydratate] = useState(false);
  const openToast = useToastStore((state) => state.openToast);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydratate(true);
      openToast({
        message: "Carregado com sucesso!",
        title: "😃",
        variant: "success",
      });
    }
  }, [openToast]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-2 px-6 py-12 md:gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">Hello world</h1>
      <p>This project is under development!</p>
      <Button
        variant="outline"
        size="lg"
        isLoading={!hydratate}
        onClick={() =>
          openToast({
            title: "Toast aberto!",
            variant: "success",
          })
        }
      >
        Button
      </Button>
    </main>
  );
}
