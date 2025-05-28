"use client";

import { Column } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import type { Order } from "@/types/order.type";
export default function FilterInput({
  column,
  placeholder,
}: Readonly<{
  column: Column<Order, unknown>;
  placeholder?: string;
}>) {
  const DebounceTimeout = 300; // milliseconds
  const [inputValue, setInputValue] = useState(
    (column.getFilterValue() as string) ?? ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      column.setFilterValue(inputValue === "" ? undefined : inputValue);
    }, DebounceTimeout);
    return () => clearTimeout(timeout);
  }, [inputValue, column, DebounceTimeout]);

  return (
    <Input
      placeholder={placeholder ?? `Filter ${column.id}...`}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      className="h-8 w-[150px] mt-1 text-sm" // Adjust styling as needed
      onClick={(e) => e.stopPropagation()} // Prevent sorting when clicking input
    />
  );
}
