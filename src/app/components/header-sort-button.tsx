"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { capitalizeFirstLetter } from "@/utils";
import { Column } from "@tanstack/react-table";
import type { Order } from "@/types/order.type";
import FilterInput from "@/app/components/data-grid/filter-input";

export default function HeaderSortButton({
  column,
  name,
}: Readonly<{
  column: Column<Order, unknown>;
  name?: string;
}>) {
  return (
    <div className="py-2">
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {name ? capitalizeFirstLetter(name) : capitalizeFirstLetter(column.id)}
        <ArrowUpDown className="h-4 w-4" />
      </Button>
      <FilterInput
        column={column}
        placeholder={`Filtrar ${name ?? column.id}...`}
      />
    </div>
  );
}
