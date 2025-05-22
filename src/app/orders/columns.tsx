"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatSide, formatStatus } from "@/utils";

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

export const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "type",
    header: () => <div className="flex justify-center font-bold">Lado</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">{formatSide(row.original.type)}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="flex justify-center font-bold">Price</div>,
    cell: ({ row }) => (
      <div className="font-mono flex justify-center">
        {formatCurrency(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="flex justify-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "remainingQuantity",
    header: () => <div className="flex justify-center">Remaining Quantity</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.remainingQuantity}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="flex justify-center font-bold">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {formatStatus(row.original.status)}
      </div>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date Time",
  },
];
