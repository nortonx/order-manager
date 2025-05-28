"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatSide, formatStatus, formatDate } from "@/utils";
import type { Order } from "@/types/order.type";
import HeaderSortButton from "@/app/components/header-sort-button";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
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
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.type}</div>
    ),
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
    accessorKey: "requestedQuantity",
    header: () => (
      <div className="flex justify-center font-bold">Qtd. Solicitada</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.requestedQuantity}
      </div>
    ),
  },
  {
    accessorKey: "remainingQuantity",
    header: () => <div className="flex justify-center">Qtd. Restante</div>,
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
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.status}</div>
    ),
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
