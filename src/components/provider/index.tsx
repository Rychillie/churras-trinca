"use client";

import { TooltipProvider } from "@/components/shared/tooltip";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "sonner";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const { isMobile } = useMediaQuery();

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <AnimatePresence initial={false}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          position={isMobile ? "bottom-center" : "bottom-right"}
          theme="system"
          richColors
        />
      </AnimatePresence>
    </ThemeProvider>
  );
}
