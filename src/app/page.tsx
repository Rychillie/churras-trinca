"use client";

import { Button } from "@/components/elements";
import { useToastStore } from "@/stores/toast";
import { useEffect } from "react";

export default function Home() {
  const handleOpenToast = useToastStore((state) => state.openToast);

  useEffect(() => {
    handleOpenToast({
      message: "Hello World",
      title: "Hello World",
      variant: "error",
    });
  }, [handleOpenToast]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-2 px-6 py-12 md:gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">Hello world</h1>
      <p>This project is under development!</p>
      <Button variant="outline" size="lg" isLoading>
        Button
      </Button>
    </main>
  );
}
