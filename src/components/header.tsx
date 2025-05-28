"use client";

import React from "react";
import Link from "next/link";
import ModeToggle from "@/components/mode-toggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const baseClasses = "text-lg font-bold";
    const activeClasses = "active font-bold text-green-600 dark:text-green-400";

    return pathname === href ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  return (
    <header
      className="flex justify-between items-center mt-10 p-4 "
      data-testid="header-component"
    >
      <Link
        href="/"
        className="text-xl font-bold"
      >
        Flowa Order Management
      </Link>
      <div className="flex justify-between items-center gap-4">
        <div>
          <Link
            href="/assets"
            className={getLinkClassName("/assets")}
          >
            Assets
          </Link>
        </div>
        <div>
          <Link
            href="/manager"
            className={getLinkClassName("/manager")}
          >
            Order Manager
          </Link>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
