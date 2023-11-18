"use client";

import { Button } from "@/components/elements";
import { Eye, EyeSlash } from "@/components/shared/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shared/tooltip";
import { cn } from "@/lib/utils";
import toString from "lodash/toString";
import { HTMLInputTypeAttribute, useState } from "react";
import { useController, type Control } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import { tv } from "tailwind-variants";

export const helperTextClassName = tv({
  base: "text-[0.625rem] mt-1",
  variants: {
    isInvalid: {
      true: "text-orange-500",
      false: "text-gray-500",
    },
  },
  defaultVariants: {
    isInvalid: false,
  },
});

type TextFieldProps = React.ComponentProps<"input"> & {
  name: string;
  control: Control<any>;
  label: React.ReactNode | string;
  withPasswordStrength?: boolean;
  helperText?: string;
};

export default function TextField({
  name,
  label,
  helperText,
  control,
  className,
  withPasswordStrength = false,
  ...rest
}: TextFieldProps) {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
    rest.type || "text",
  );

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: rest.value || "",
  });

  function handleChangeType() {
    setInputType(inputType === "password" ? "text" : "password");
  }

  return (
    <div className={cn("relative z-0 mb-4", className)}>
      <input
        {...field}
        id={name}
        className="peer block w-full appearance-none border-0 border-b-2 border-slate-500 bg-transparent px-0 py-2.5 text-sm text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-0 dark:border-slate-300 dark:text-slate-100 dark:focus:border-amber-400"
        role="textbox"
        {...rest}
        type={inputType}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-slate-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-amber-400 dark:text-slate-300 peer-focus:dark:text-amber-400"
      >
        {label}
      </label>

      {rest.type === "password" && (
        <div className="absolute right-1 top-0 flex h-10 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                onClick={handleChangeType}
                variant="ghost"
                size="icon"
                aria-label={inputType === "password" ? "Mostrar" : "Ocultar"}
              >
                {inputType === "password" ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeSlash className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {inputType === "password" ? "Mostrar" : "Ocultar"}
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {(helperText || invalid) && (
        <div
          className={helperTextClassName({ isInvalid: invalid })}
          role={invalid ? "alert" : "note"}
        >
          {invalid ? error?.message : helperText}
        </div>
      )}

      {withPasswordStrength === true && rest.type === "password" && (
        <PasswordStrengthBar
          password={toString(field.value)}
          shortScoreWord="curta demais"
          scoreWords={["fraca", "fraca", "ok", "boa", "forte"]}
          scoreWordClassName="impo text-[0.625rem] text-slate-500"
        />
      )}
    </div>
  );
}
