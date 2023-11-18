import type { ToastType } from "@/components/shared/toast";
import filter from "lodash/filter";
import { create } from "zustand";

type ToastStoreProps = {
  items: ToastType[];
  openToast: (item: Omit<ToastType, "toastId">) => void;
  closeToast: (toastId: string) => void;
};

export const useToastStore = create<ToastStoreProps>((set, get) => ({
  items: [],
  openToast: (item: Omit<ToastType, "toastId">) => {
    const toastId = crypto.randomUUID();

    set((state) => ({
      items: [...state.items, { ...item, toastId }],
    }));

    const handleCloseToast = get().closeToast;

    window.setTimeout(() => {
      handleCloseToast(toastId);
    }, 5000);
  },
  closeToast: (toastId) =>
    set((state) => ({
      items: filter(state.items, (toast) => toast.toastId !== toastId),
    })),
}));
