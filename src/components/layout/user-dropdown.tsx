"use client";

import Popover from "@/components/shared/popover";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeftOnRectangle, Squares2x2 } from "../shared/icons";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-flex items-center justify-center text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 dark:bg-black sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-neutral-500">
                {session?.user?.email}
              </p>
            </div>
            <button
              className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              disabled
            >
              <Squares2x2 className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              onClick={() => signOut()}
            >
              <ArrowLeftOnRectangle className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-neutral-300 transition-all duration-75 focus:outline-none active:scale-95 dark:border-neutral-700 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
