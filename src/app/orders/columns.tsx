"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatSide, formatStatus, formatDate } from "@/utils";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    id: "actions",
    header: () => <div className="flex justify-center font-bold">Ações</div>,
    cell: ({ row }) => {
      const asset = row.original;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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
