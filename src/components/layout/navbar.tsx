"use client";

import {
  UserDropdown,
  useCreateEventModal,
  useSignInModal,
} from "@/components/layout";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  session: Session | null;
  hasEvents: boolean;
};

export default function NavBar({ session, hasEvents }: Props) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { CreateEventModal, setShowCreateEventModal } = useCreateEventModal();
  const scrolled = useScroll(50);

  useEffect(() => {
    if (session) {
      toast.success("Você está logado!");
    }
  }, [session]);

  return (
    <>
      {hasEvents && <SignInModal />}
      {session && <CreateEventModal />}
      <nav
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-neutral-200 bg-white/50 backdrop-blur-xl dark:border-neutral-800 dark:bg-black/50"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-prose items-center justify-between">
          <Link href="/" className="font-display flex items-center text-2xl">
            🥩 Churras
          </Link>
          <div>
            {session ? (
              <div className="flex items-center justify-center gap-2">
                {hasEvents && (
                  <button
                    className="rounded-full border border-black bg-black px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                    onClick={() => {
                      setShowCreateEventModal(true);
                    }}
                  >
                    Criar evento
                  </button>
                )}
                <UserDropdown session={session} />
              </div>
            ) : hasEvents ? (
              <button
                className="rounded-full border border-black bg-black px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
