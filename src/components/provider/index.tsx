"use client";

import { ToastContainer } from "@/components/shared/toast";
import { TooltipProvider } from "@/components/shared/tooltip";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <>
      <AnimatePresence initial={false}>
        <TooltipProvider>{children}</TooltipProvider>
        <ToastContainer />
      </AnimatePresence>
    </>
  );
}
