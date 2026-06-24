export default function PageTitle({ name }: Readonly<{ name: string }>) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="h-7 w-1 rounded-full bg-primary"
        aria-hidden="true"
      />
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {name}
      </h1>
    </div>
  );
}
