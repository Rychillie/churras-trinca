import { Nav } from "@/components/layout";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR" className="h-full w-full" suppressHydrationWarning>
      <body
        className={cn(
          raleway.className,
          "h-screen w-screen bg-neutral-50 dark:bg-neutral-950",
        )}
      >
        <Suspense fallback="">
          <Nav />
        </Suspense>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
