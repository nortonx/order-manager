"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatSide, formatStatus, formatDate } from "@/utils";

export type Asset = {
  id: string;
  symbol: string;
  type: string; // side: buy/sell
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: string; // status: open/closed
  dateTime: string;
};

import HeaderSortButton from "@/components/header-sort-button";

export const columns: ColumnDef<Asset>[] = [
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
        <HeaderSortButton column={column} name="Instrumento" />
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
        <HeaderSortButton column={column} name="Lado" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">{formatSide(row.original.type)}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="flex justify-center font-bold">Preço</div>,
    cell: ({ row }) => (
      <div className="font-mono flex justify-center">
        {formatCurrency(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="flex justify-center">Quantidade</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.quantity}</div>
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
    cell: ({ row }) => (
      <div className="flex justify-center">
        {formatStatus(row.original.status)}
      </div>
    ),
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <div className="flex justify-center font-bold">
        <HeaderSortButton column={column} name="Data/Hora" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        {formatDate(row.original.dateTime)}
      </div>
    ),
  },
];
