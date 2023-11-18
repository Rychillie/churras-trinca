import { ToastContainer } from "@/components/shared/toast";
import { TooltipProvider } from "@/components/shared/tooltip";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
      <ToastContainer />
    </>
  );
}
