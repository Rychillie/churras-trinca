"use client";

import { Bars3, PencilSquare, UserPlus } from "@/components/shared/icons";
import Popover from "@/components/shared/popover";
import clsx from "clsx";
import { useState } from "react";

export default function OptionsDropdown() {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="fixed bottom-0 left-1/2 flex w-full max-w-prose -translate-x-1/2 items-center justify-end bg-neutral-50/60 p-6 backdrop-blur-xl dark:bg-neutral-950/60">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 dark:bg-black sm:w-56">
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <UserPlus className="h-4 w-4" />
              <p className="text-sm">Convidar</p>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <PencilSquare className="h-4 w-4" />
              <p className="text-sm">Editar</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="aspect-square rounded-full border border-neutral-200 bg-white p-3 text-black transition-all hover:bg-neutral-100 focus:outline-none active:scale-95 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
        >
          <Bars3 className="h-4 w-4" />
        </button>
      </Popover>
    </div>
  );
}
