import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    href: "/manager",
    title: "Gerenciador de Ordens",
    description: "Registre ordens e acompanhe o status no blotter.",
  },
  {
    href: "/assets",
    title: "Ativos",
    description: "Explore a lista de instrumentos disponíveis.",
  },
];

export default function Home() {
  return (
    <section
      className="w-full"
      data-testid="home-page"
    >
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Mesa de operações
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Gerencie ordens de compra e venda em um só lugar.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Busque ativos, registre ordens de compra e venda e acompanhe o status
          em tempo real.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/50"
            >
              <span className="flex items-center justify-between font-medium text-foreground">
                {section.title}
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {section.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
