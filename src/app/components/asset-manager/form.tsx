"use client";

import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getAssets } from "@/actions/assets";

export default function AssetForm() {
  const data = getAssets();
  console.log(`data length is: ${data.length}`);
  return (
    <form className="p-4">
      <fieldset>
        <legend>Assets</legend>
        <Input placeholder="Instrumento" className="mb-1" />
        <div className="select-container mb-1">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Compra ou Venda?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Compra</SelectItem>
              <SelectItem value="sell">Venda</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input type="number" placeholder="Quantidade" className="mb-1" />
        <Input type="text" placeholder="Preço" className="mb-1" disabled />
      </fieldset>
      <div className="action-buttons p-2 flex justify-evenly">
        <Button>Adicionar</Button>
        <Button variant="secondary">Cancelar</Button>
      </div>
    </form>
  );
}
