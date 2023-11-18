"use client";

import {
  CheckCircle,
  ExclamationTriangle,
  Info,
  X,
  XCircle,
} from "@/components/shared/icons";
import { useToastStore } from "@/stores/toast";
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
  message: string;
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
        "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800",
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
    <div
      id={toastId}
      className="fixed bottom-5 right-5 w-full max-w-xs rounded-xl bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="flex">
        <div className={iconClassName({ variant })}>
          <Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
          <div className="mb-2 text-sm font-normal">{message}</div>
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
              {/* <For each={actions}>
                {(action) => (
                  <div key={action.title}>
                    <button onClick={action.onClick} className={actionButtonClassName({ type: action.type, variant })}>
                      {action.title}
                    </button>
                  </div>
                )}
              </For> */}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleCloseToast(toastId)}
          className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          aria-label="Fechar"
        >
          <span className="sr-only">Fechar</span>
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = () => {
  const items = useToastStore((state) => state.items);

  return map(items, (item) => <Toast key={item.toastId} isOpen {...item} />);
};
