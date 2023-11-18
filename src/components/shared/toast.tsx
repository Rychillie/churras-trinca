"use client";

import {
  CheckCircle,
  ExclamationTriangle,
  Info,
  X,
  XCircle,
} from "@/components/shared/icons";
import { useToastStore } from "@/lib/stores/toast";
import clsx from "clsx";
import { motion } from "framer-motion";
import map from "lodash/map";
import { tv } from "tailwind-variants";

type ToastAction = {
  onClick: () => void;
  type: "confirm" | "cancel";
  title: string;
};

export type ToastType = {
  toastId: string;
  title: string;
  message?: string;
  variant?: "info" | "success" | "error" | "warning";
  actions?: ToastAction[];
};

type ToastProps = {
  isOpen: boolean;
} & ToastType;

const IconVariant = {
  info: Info,
  success: CheckCircle,
  error: XCircle,
  warning: ExclamationTriangle,
};

const iconClassName = tv({
  base: "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-xl",
  variants: {
    variant: {
      info: "text-blue-500 bg-blue-100 dark:text-blue-300 dark:bg-blue-900",
      success:
        "text-green-500 bg-green-100 dark:text-green-300 dark:bg-green-900",
      error: "text-red-500 bg-red-100 dark:text-red-300 dark:bg-red-900",
      warning:
        "text-orange-500 bg-orange-100 dark:text-orange-300 dark:bg-orange-900",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const actionButtonClassName = tv({
  base: "inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white rounded-xl focus:ring-4 focus:outline-none",
  variants: {
    type: {
      confirm: "",
      cancel:
        "bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-300 dark:bg-neutral-500 dark:hover:bg-neutral-600 dark:focus:ring-neutral-800",
    },
    variant: {
      info: "",
      success: "",
      error: "",
      warning: "",
    },
  },
  defaultVariants: {
    type: "confirm",
  },
  compoundVariants: [
    {
      type: "confirm",
      variant: "info",
      className:
        "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800",
    },
    {
      type: "confirm",
      variant: "success",
      className:
        "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800",
    },
    {
      type: "confirm",
      variant: "error",
      className:
        "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800",
    },
    {
      type: "confirm",
      variant: "warning",
      className:
        "bg-orange-600 hover:bg-orange-700 focus:ring-orange-300 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800",
    },
  ],
});

export const Toast = ({
  toastId,
  title,
  message,
  actions,
  variant = "info",
}: ToastProps) => {
  const handleCloseToast = useToastStore((state) => state.closeToast);
  const Icon = IconVariant[variant];

  return (
    <motion.div
      id={toastId}
      role="alert"
      initial={{ opacity: 0, bottom: -24 }}
      animate={{ opacity: 1, bottom: 0 }}
      exit={{ opacity: 0, bottom: -24 }}
      transition={{
        opacity: { duration: 0.2 },
        bottom: { type: "spring", bounce: 0.5, duration: 1 },
      }}
      className="overflow-hidden rounded-xl bg-white p-4 text-neutral-500 shadow transition-all dark:bg-neutral-800 dark:text-neutral-400 sm:shadow-lg md:shadow-xl"
    >
      <div className="flex">
        <div className={iconClassName({ variant })}>
          <Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
        <div
          className={clsx(
            "ml-3 text-sm font-normal",
            !message && "flex items-center justify-center",
          )}
        >
          <span className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
            {title}
          </span>
          {message && <div className="text-sm font-normal">{message}</div>}
          {actions && actions.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {actions &&
                map(actions, (action) => (
                  <div key={action.title}>
                    <button
                      onClick={action.onClick}
                      className={actionButtonClassName({
                        type: action.type,
                        variant,
                      })}
                    >
                      {action.title}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleCloseToast(toastId)}
          className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white"
          aria-label="Fechar"
        >
          <span className="sr-only">Fechar</span>
          <X className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const items = useToastStore((state) => state.items);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      className="fixed bottom-5 left-5 right-5 flex w-[calc(100%-40px)] flex-col-reverse gap-2 transition-all sm:left-auto sm:w-full sm:max-w-xs"
    >
      {map(items, (item) => (
        <Toast key={item.toastId} isOpen {...item} />
      ))}
    </motion.div>
  );
};
