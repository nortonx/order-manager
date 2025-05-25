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

import { getAssets } from "@/actions";
import { Asset } from "@/types/asset.type";
import { useState, useRef, useEffect } from "react";
import useAssetStore from "@/store/useAssetStore";
import { formatCurrency } from '@/utils/currency';

export default function AssetForm() {
  const searchField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<Asset[]>([]);
  const [symbol, setSymbol] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const price = formatCurrency(selectedAsset?.price, "BRL") || 0;
  
  const data = getAssets();
  
  useEffect(() => {
    searchField.current?.focus();
  }, [])

  const handleFilterAssets = (value: string) => {
    const filteredAssets = data.filter((asset: Asset) => {
      const assetValue = asset.symbol.toLowerCase();
      setSymbol(assetValue.toUpperCase());
      return assetValue.includes(value.toLowerCase());
    });
    setResult(filteredAssets);
  };

  const handleSelectedAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setResult((prev) => prev.filter((item) => item.id !== asset.id));
    setSymbol(asset.symbol);
  }

  const handleCalculatePrice = (asset: Asset) => {
    // calculate the price based on the selected asset and quantity
  }

  return (
    <form className="p-4">
      <fieldset>
        <legend>Assets (data length is: {data.length})</legend>
        <Input
          placeholder="Instrumento"
          className="my-1"
          onChange={(e) => handleFilterAssets(e.target.value)}
          ref={searchField}
          value={selectedAsset?.symbol}
        />
        <div className="select-container my-1">
          <Select value={selectedAsset?.type} >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Compra ou Venda?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Compra</SelectItem>
              <SelectItem value="sell">Venda</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input type="number" placeholder="Quantidade" className="my-1" value={1} onChange={handleCalculatePrice}/>
        <Input type="text" placeholder="Preço" className="my-1" disabled ref={priceField} value={price} />
      </fieldset>
      <div className="action-buttons p-2 flex justify-evenly">
        <Button>Adicionar</Button>
        <Button variant="secondary">Cancelar</Button>
      </div>
      <ul className="filtered-assets-list">
        {result.length > 0 ? (
          result.map((asset) => (
            <li key={asset.id} className="flex justify-between border p-2 my-1">
              <Button 
                variant="outline"
                onClick={() => handleSelectedAsset(asset)}
              >
                {asset.symbol}
              </Button>
              <Button variant="secondary">
                {asset.type}
              </Button>
              
            </li>
          ))
        ) : (
          <li>No results yet</li>
        )}
      </ul>
      <code className="my-4 w-full">Selected Asset value: {JSON.stringify(selectedAsset)}</code>
    </form>
  );
}
