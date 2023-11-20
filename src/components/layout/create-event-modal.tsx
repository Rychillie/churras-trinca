"use client";

import { LoadingDots } from "@/components/shared/icons";
import Modal from "@/components/shared/modal";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

const CreateEventModal = ({
  showCreateEventModal,
  setShowCreateEventModal,
}: {
  showCreateEventModal: boolean;
  setShowCreateEventModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [createEventClicked, setCreateEventClicked] = useState(false);

  return (
    <Modal
      showModal={showCreateEventModal}
      setShowModal={setShowCreateEventModal}
    >
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-neutral-200 dark:md:border-neutral-800">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 bg-white px-4 py-6 pt-8 text-center dark:border-neutral-800 dark:bg-black md:px-16">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-300 bg-yellow-100 text-xl dark:border-yellow-900 dark:bg-yellow-950/40"
          >
            🥩
          </Link>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-neutral-500">
            Faça login com sua conta Google para participar do churras.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-neutral-50 px-4 py-8 dark:bg-neutral-950 md:px-16">
          <button
            disabled={createEventClicked}
            className={`${
              createEventClicked
                ? "cursor-not-allowed border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                : "border border-neutral-200 bg-white text-black hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setCreateEventClicked(true);
              toast.loading("Carregando...");
            }}
          >
            {createEventClicked ? (
              <LoadingDots color="#737373" />
            ) : (
              <>
                <p>Sign In com Google</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default function useCreateEventModal() {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const CreateEventModalCallback = useCallback(() => {
    return (
      <CreateEventModal
        showCreateEventModal={showCreateEventModal}
        setShowCreateEventModal={setShowCreateEventModal}
      />
    );
  }, [showCreateEventModal, setShowCreateEventModal]);

  return useMemo(
    () => ({
      setShowCreateEventModal,
      CreateEventModal: CreateEventModalCallback,
    }),
    [setShowCreateEventModal, CreateEventModalCallback],
  );
}
