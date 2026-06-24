"use client";

import React from "react";
import Link from "next/link";
import ModeToggle from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const baseClasses =
      "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
    const activeClasses = "text-foreground";

    return pathname === href ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 py-4 backdrop-blur"
      data-testid="header-component"
    >
      <Link
        href="/"
        className="flex items-baseline gap-2"
      >
        <span
          className="h-2.5 w-2.5 self-center rounded-full bg-primary"
          aria-hidden="true"
        />
        <span className="text-lg font-bold tracking-tight">Flowa</span>
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Order Manager
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/assets"
          className={getLinkClassName("/assets")}
        >
          Ativos
        </Link>
        <Link
          href="/manager"
          className={getLinkClassName("/manager")}
        >
          Gerenciador de Ordens
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}
