"use client";

import { TextField } from "@/components/elements";
import { LoadingDots } from "@/components/shared/icons";
import Modal from "@/components/shared/modal";
import clsx from "clsx";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  return (
    <Modal
      showModal={showCreateEventModal}
      setShowModal={setShowCreateEventModal}
    >
      <div className="w-full overflow-hidden shadow-xl dark:shadow-none md:max-w-md md:rounded-2xl md:border md:border-neutral-200 dark:md:border-neutral-800">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 px-4 py-4 pt-8 dark:border-neutral-800 sm:px-16">
          <Link
            href="/"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-300 bg-yellow-100 text-xl dark:border-yellow-900 dark:bg-yellow-950/40"
          >
            🥩
          </Link>
          <h3 className="text-lg font-medium">Criar um novo evento</h3>
        </div>

        <form className="flex flex-col space-y-6 bg-neutral-50 px-4 py-8 text-left dark:bg-neutral-950 sm:px-16">
          <TextField
            required
            autoComplete="off"
            label="Nome do evento"
            name="name"
            placeholder="Digite o nome do evento"
            aria-invalid="true"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            required
            autoComplete="off"
            pattern="[a-zA-Z0-9\-.]+"
            label="Descrição do evento"
            name="description"
            placeholder="Descrição do evento"
            aria-invalid="true"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextField
            isSlug
            required
            autoComplete="off"
            pattern="[a-zA-Z0-9\-]+"
            label="Slug do Evento"
            placeholder="slug-do-evento"
            aria-invalid="true"
            type="text"
            name="slug"
            onChange={(e) => setSlug(e.target.value)}
            value={slug}
          />
          <button
            disabled={createEventClicked}
            className={clsx(
              "flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none",
              createEventClicked
                ? "cursor-not-allowed border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                : "border-neutral-200 bg-white text-black hover:bg-neutral-50 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-950",
            )}
            onClick={() => {
              setCreateEventClicked(true);
              toast.loading("Carregando...");
            }}
          >
            {createEventClicked ? (
              <LoadingDots color="#737373" />
            ) : (
              <p>Criar evento</p>
            )}
          </button>
        </form>
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
