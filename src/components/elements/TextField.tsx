import { QuestionMarkCircle } from "@/components/shared/icons";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  isSlug?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ label, name, isSlug, ...props }: Props) {
  const url = process.env.NEXTAUTH_URL?.replace("https://", "").replace(
    "http://",
    "",
  );

  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300"
      >
        <p className="block text-sm font-medium">{label}</p>
        <QuestionMarkCircle className="h-4 w-4 md:inline-flex" />
      </label>
      <div
        className={clsx("mt-1 flex rounded-md shadow-sm", isSlug && "relative")}
      >
        {isSlug && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-5 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 sm:text-sm">
            {url}
          </span>
        )}
        <input
          id={name}
          className={clsx(
            "block w-full border-neutral-300 bg-white text-neutral-900 placeholder-neutral-300 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:placeholder-neutral-700 sm:text-sm",
            isSlug ? "rounded-r-md" : "rounded-md",
          )}
          placeholder={props.placeholder}
          name={name}
          {...props}
        />
      </div>
    </div>
  );
}
