import { Button } from "@/components/elements";

export default function Home() {
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
