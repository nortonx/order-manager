export default function PageTitle({ name }: Readonly<{ name: string }>) {
  return (
    <h1 className="font-bold text-2xl text-italic border-b-slate-300 p-4">
      {name}
    </h1>
  );
}
