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
import { useState, useRef, useEffect, use } from "react";
import useAssetStore from "@/store/useAssetStore";

export default function AssetForm() {
  const searchField = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  
  const data = getAssets();
  
  useEffect(() => {
    searchField.current?.focus();
  }, [])

  const handleFilterAssets = (value: string) => {
    const filteredAssets = data.filter((asset: Asset) => {
      const assetValue = asset.symbol.toLowerCase();
      return assetValue.includes(value.toLowerCase());
    });
    setResult(filteredAssets);
  };

  return (
    <form className="p-4">
      <fieldset>
        <legend>Assets (data length is: {data.length})</legend>
        <Input
          placeholder="Instrumento"
          className="mb-1" 
          onChange={(e) => handleFilterAssets(e.target.value)}
          ref={searchField}
        />
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
        <Input type="number" placeholder="Quantidade" className="mb-1" onChange={(e) => filterAssets(e.target.value)} />
        <Input type="text" placeholder="Preço" className="mb-1" disabled />
      </fieldset>
      <div className="action-buttons p-2 flex justify-evenly">
        <Button>Adicionar</Button>
        <Button variant="secondary">Cancelar</Button>
      </div>
      <ul className="filtered-assets-list">
        {result.length > 0 ? (
          result.map((asset) => (
            <li key={asset.id} className="flex justify-between">
              <span>{asset.symbol}</span>
              <span>{asset.type}</span>
            </li>
          ))
        ) : (
          <li>No results yet</li>
        )}
      </ul>
    </form>
  );
}
