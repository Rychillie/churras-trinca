import { LoadingCircle, LoadingDots } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-3xl text-sm font-medium uppercase ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-950 text-white hover:bg-neutral-950/90",
        outline:
          "border border-neutral-950 bg-transparent text-neutral-950 hover:bg-amber-100",
        ghost: "bg-transparent text-neutral-950 hover:bg-amber-100",
        link: "bg-transparent text-neutral-950 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      className,
      variant,
      size,
      isLoading = false,
      asChild = false,
      ...rest
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading;

    return (
      <Comp
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      >
        {children}
        {isLoading && <LoadingCircle className="h-4 w-4" />}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };

export default Button;
