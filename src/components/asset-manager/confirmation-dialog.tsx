"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { Order } from "@/types/order.type";

export default function ConfirmationDialog({ row }: Readonly<{ row: Order }>) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log("Confirmed");
    useOrderStore.getState().removeOrder(row.id);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
          >
            <CircleX />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja cancelar a ordem?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between gap-4">
            <Button onClick={handleConfirm}>Sim</Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
            >
              Não
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
