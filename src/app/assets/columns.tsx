"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/utils";
import type { Order } from "@/types/order.type";
import HeaderSortButton from "@/app/components/header-sort-button";
import { Button } from "@/app/components/ui/button";

export const columnsAssets: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="font-bold">
        <HeaderSortButton column={column} />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
        <HeaderSortButton
          column={column}
          name="Instrumento"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.symbol}</div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
        <HeaderSortButton
          column={column}
          name="Lado"
        />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="flex justify-center">{row.original.type}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="flex justify-center font-bold">Preço</div>,
    cell: ({ row }) => (
      <div className="font-mono flex justify-center">
        {formatCurrency(row.original.price ?? 0)}
      </div>
    ),
  },
  {
    accessorKey: "remainingQuantity",
    header: () => (
      <div className="flex justify-center">Quantidade Restante</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.remainingQuantity}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
        <HeaderSortButton column={column} />
      </div>
    ),
    cell: ({ row }) => {
      const open =
        "border-green-700 dark:border-green-500 text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20";
      const closed =
        "border-red-700 dark:border-red-500 text-red-700 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20";
      const statusClass =
        row.original.status.toLowerCase() === "aberto" ? open : closed;

      return (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className={`${statusClass} capitalize`}
          >
            {row.original.status}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
        <HeaderSortButton
          column={column}
          name="Data/Hora"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {formatDate(row.original.dateTime)}
      </div>
    ),
  },
];
