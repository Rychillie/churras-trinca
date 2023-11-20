import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...rest }: React.ComponentProps<"div">) => (
  <div
    role="status"
    className={cn(
      "animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800",
      className,
    )}
    {...rest}
  />
);

export default Skeleton;
