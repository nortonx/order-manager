import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { formatCurrency } from '@/utils/currency';
import { RefObject } from 'react';

interface AssetFormFieldsProps {
  symbol: string;
  assetType: string;
  quantity: number;
  totalPrice: number;
  searchFieldRef: RefObject<HTMLInputElement>;
  onFilterAssets: (value: string) => void;
  onTypeChange: (type: string) => void;
  onQuantityChange: (quantity: number) => void;
}

export function AssetFormFields({
  symbol,
  assetType,
  quantity,
  totalPrice,
  searchFieldRef,
  onFilterAssets,
  onTypeChange,
  onQuantityChange
}: Readonly<AssetFormFieldsProps>) {
  return (
    <div data-testid="asset-form-fields">
      <Input
        placeholder="Instrumento"
        className="my-1"
        onChange={(e) => onFilterAssets(e.target.value)}
        ref={searchFieldRef}
        value={symbol}
      />
      <div className="select-container my-2">
        <Select value={assetType} onValueChange={onTypeChange} data-testid="asset-type-select">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Compra ou Venda?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buy">Compra</SelectItem>
            <SelectItem value="sell">Venda</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input
        type="number"
        placeholder="Quantidade"
        className="my-1"
        min="1"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
      />
      <Input 
        type="text"
        placeholder="Preço"
        className="my-2"
        disabled 
        value={totalPrice ? formatCurrency(totalPrice, "BRL") : ""} 
      />
    </div>
  );
}
