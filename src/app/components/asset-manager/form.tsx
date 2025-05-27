"use client";

import { useState, useRef, useEffect } from "react";
import { Asset } from "@/types/asset.type";
import { getAssets } from "@/actions";
import { useOrderStore } from "@/store/useOrderStore";
import { AssetSearch } from "./asset-search";
import { AssetFormFields } from "./asset-form-fields";
import { OrderSummary } from "./order-summary";
import { ActionButtons } from "./action-buttons";

export default function AssetForm() {
  const searchField = useRef<HTMLInputElement>(
    null as unknown as HTMLInputElement
  );
  const [result, setResult] = useState<Asset[]>([]);
  const [symbol, setSymbol] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [assetType, setAssetType] = useState<string>("buy"); // Default to "buy"
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const data = getAssets();

  useEffect(() => {
    searchField.current?.focus();
  }, []);

  // Update price calculation when selected asset or quantity changes
  useEffect(() => {
    if (selectedAsset?.price && quantity) {
      const price = selectedAsset.price * quantity;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [selectedAsset, quantity]);

  const handleFilterAssets = (value: string) => {
    if (!value) {
      setResult([]);
      return;
    }

    const filteredAssets = data.filter((asset: Asset) => {
      const assetValue = asset.symbol.toLowerCase();
      return assetValue.includes(value.toLowerCase());
    });
    setResult(filteredAssets);
    setSymbol(value);
  };

  const handleSelectedAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setSymbol(asset.symbol);

    // Normalize asset type to lowercase to match form select values
    // Map uppercase BUY/SELL to lowercase buy/sell as expected by the select component
    let normalizedType = "buy"; // Default value
    if (asset.type) {
      const assetType = asset.type.toString().toLowerCase();
      // Ensure we only have the expected values
      normalizedType = assetType === "sell" ? "sell" : "buy";
    }
    setAssetType(normalizedType);

    setResult([]);
    // Reset quantity to 1 when asset changes
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleTypeChange = (type: string) => {
    setAssetType(type);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    useOrderStore.getState().addOrder({
      ...selectedAsset,
      totalPrice,
      type: assetType,
      requestedQuantity: quantity,
      remainingQuantity: selectedAsset.remainingQuantity - quantity,
    });

    resetForm();
  };

  const resetForm = () => {
    setSelectedAsset(null);
    setSymbol("");
    setQuantity(1);
    // Don't reset the assetType to maintain the current type selection
    // setAssetType("");
    setTotalPrice(0);
    setResult([]);

    // Focus back on search field for better UX
    searchField.current?.focus();
  };

  return (
    <form
      className="p-4"
      onSubmit={handleAddAsset}
    >
      <fieldset>
        <legend>Ativos</legend>

        <AssetFormFields
          symbol={symbol}
          assetType={assetType}
          quantity={quantity}
          totalPrice={totalPrice}
          searchFieldRef={searchField}
          onFilterAssets={handleFilterAssets}
          onTypeChange={handleTypeChange}
          onQuantityChange={handleQuantityChange}
        />
      </fieldset>

      <ActionButtons
        hasSelectedAsset={!!selectedAsset}
        onReset={resetForm}
      />

      <AssetSearch
        results={result}
        onSelectAsset={handleSelectedAsset}
      />

      {selectedAsset && (
        <OrderSummary
          selectedAsset={selectedAsset}
          assetType={assetType}
          quantity={quantity}
          totalPrice={totalPrice}
        />
      )}
    </form>
  );
}
