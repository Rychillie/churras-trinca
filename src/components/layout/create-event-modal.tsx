"use client";

import { QuestionMarkCircle } from "@/components/shared/icons";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const url = process.env.NEXTAUTH_URL?.replace("https://", "").replace(
    "http://",
    "",
  );

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
          <div>
            <label
              htmlFor="name"
              className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300"
            >
              <p className="block text-sm font-medium">Nome do evento</p>
              <QuestionMarkCircle className="h-4 w-4 md:inline-flex" />
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="name"
                required
                autoComplete="off"
                className="block w-full rounded-md border-neutral-300 bg-white text-neutral-900 placeholder-neutral-300 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:placeholder-neutral-700 sm:text-sm"
                placeholder="Digite o nome do evento"
                aria-invalid="true"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300"
            >
              <p className="block text-sm font-medium">Descrição do evento</p>
              <QuestionMarkCircle className="h-4 w-4 md:inline-flex" />
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <input
                id="description"
                required
                autoComplete="off"
                pattern="[a-zA-Z0-9\-.]+"
                className="block w-full rounded-md border-neutral-300 bg-white text-neutral-900 placeholder-neutral-300 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:placeholder-neutral-700 sm:text-sm"
                placeholder="Descrição do evento"
                aria-invalid="true"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="slug"
              className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300"
            >
              <p className="block text-sm font-medium">Slug do Evento</p>
              <QuestionMarkCircle className="h-4 w-4 md:inline-flex" />
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-5 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 sm:text-sm">
                {url}
              </span>
              <input
                id="slug"
                required
                autoComplete="off"
                pattern="[a-zA-Z0-9\-]+"
                className="block w-full rounded-r-md border-neutral-300 bg-white text-neutral-900 placeholder-neutral-300 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:placeholder-neutral-700 sm:text-sm"
                placeholder="slug-do-evento"
                aria-invalid="true"
                type="text"
                name="slug"
                onChange={(e) => setSlug(e.target.value)}
                value={slug}
              />
            </div>
          </div>
          <button
            className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-black bg-black px-4 text-sm text-white transition-all hover:bg-white hover:text-black focus:outline-none dark:border-white dark:bg-white dark:text-black dark:hover:bg-black hover:dark:text-white"
            onClick={() => {
              setCreateEventClicked(true);
              toast.loading("Carregando...");
            }}
          >
            <p>Criar evento</p>
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
