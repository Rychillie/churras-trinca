type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-screen-lg p-6">
      <h1 className="text-2xl font-bold text-black dark:text-white">{title}</h1>
    </header>
  );
}
