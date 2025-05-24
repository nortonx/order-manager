"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { capitalizeFirstLetter } from "@/utils";
import { Column } from "@tanstack/react-table";
import { Asset } from "@/app/components/data-grid/columns";

export default function HeaderSortButton({
  column,
  name,
}: Readonly<{
  column: Column<Asset, unknown>;
  name?: string;
}>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name ? capitalizeFirstLetter(name) : capitalizeFirstLetter(column.id)}
      <ArrowUpDown className="h-4 w-4" />
    </Button>
  );
}
