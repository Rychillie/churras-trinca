"use client";

import useMediaQuery from "@/lib/hooks/use-media-query";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Drawer } from "vaul";

export default function Popover({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  mobileOnly?: boolean;
}) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
        <div className="sm:hidden">{children}</div>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-neutral-100/10 backdrop-blur dark:bg-neutral-900/10" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white pb-8 align-middle shadow-xl dark:bg-black dark:shadow-none">
              {content}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger className="hidden sm:inline-flex" asChild>
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          align={align}
          className="animate-slide-up-fade z-50 hidden items-center rounded-md border border-neutral-200 bg-white drop-shadow-lg dark:border-neutral-800 dark:bg-black sm:block"
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
