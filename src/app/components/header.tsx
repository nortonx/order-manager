"use client";

import React from "react";
import Link from "next/link";
import ModeToggle from "@/app/components/mode-toggle";

export default function Header() {
  return (
    <header
      className="flex justify-between items-center mt-10"
      data-testid="header-component"
    >
      <Link href="/" className="text-xl font-bold">
        Flowa Order Management
      </Link>
      <div className="flex justify-between items-center gap-4">
        <div>
          <Link href="/assets" className="text-lg hover:underline">
            Assets
          </Link>
        </div>
        <div>
          <Link href="/manager" className="text-lg hover:underline">
            Order Manager
          </Link>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
