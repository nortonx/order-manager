"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/utils";
import type { Order } from "@/types/order.type";
import HeaderSortButton from "@/components/header-sort-button";
import StatusButton from "@/components/asset-manager/status-button";

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
      return (
        <div className="flex justify-center capitalize">
          {row.original.type}
        </div>
      );
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
      return <StatusButton row={row.original} />;
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
