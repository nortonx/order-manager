"use client";

import { useState, useRef, useEffect } from "react";
import { Asset } from "@/types/asset.type";
import { getAssets } from "@/actions";
import { useOrderStore } from "@/store/useOrderStore";
import { AssetSearchResults } from "./asset-search-results";
import { AssetFormFields } from "./asset-form-fields";
import { OrderSummary } from "./order-summary";
import { ActionButtons } from "./action-buttons";
import {
  validateAssetForm,
  type AssetFormData,
} from "@/lib/validations/asset-form";

export default function AssetForm() {
  const searchField = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;
  const [result, setResult] = useState<Asset[]>([]);
  const [symbol, setSymbol] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [assetType, setAssetType] = useState<string>("compra"); // Default to "compra"
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  const data = getAssets();

  useEffect(() => {
    searchField.current?.focus();
  }, []);

  // Validation effect - validates form whenever form data changes, but only after user interaction
  useEffect(() => {
    // Don't validate during initial load
    if (!hasUserInteracted) {
      return;
    }

    const formData: Partial<AssetFormData> = {
      symbol: symbol.trim(),
      assetType: assetType as "compra" | "venda",
      quantity,
      selectedAssetId: selectedAsset?.id ?? "",
    };

    const validation = validateAssetForm(formData);
    setValidationErrors(validation.errors);
    setIsFormValid(validation.success);
  }, [symbol, assetType, quantity, selectedAsset, hasUserInteracted]);

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
    // Mark that user has started interacting with the form
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    // Clear symbol validation error on input
    if (validationErrors.symbol) {
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { symbol: _symbol, ...rest } = prev;
        return rest;
      });
    }

    if (!value) {
      setResult([]);
      setSymbol("");
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
    // Mark that user has interacted with the form
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    setSelectedAsset(asset);
    setSymbol(asset.symbol);

    // Clear selectedAssetId validation error
    if (validationErrors.selectedAssetId) {
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { selectedAssetId, ...rest } = prev;
        return rest;
      });
    }

    // Normalize asset type to lowercase to match form select values
    // Map uppercase BUY/SELL to lowercase buy/sell as expected by the select component
    let normalizedType = "compra"; // Default value
    if (asset.type) {
      const assetType = asset.type.toString().toLowerCase();
      // Ensure we only have the expected values
      normalizedType = assetType === "venda" ? "venda" : "compra";
    }
    setAssetType(normalizedType);

    setResult([]);
    // Reset quantity to 1 when asset changes
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    // Mark that user has interacted with the form
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    // Clear quantity validation error on input
    if (validationErrors.quantity) {
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { quantity, ...rest } = prev;
        return rest;
      });
    }

    setQuantity(newQuantity);
  };

  const handleTypeChange = (type: string) => {
    // Mark that user has interacted with the form
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    // Clear type validation error on change
    if (validationErrors.assetType) {
      setValidationErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { assetType, ...rest } = prev;
        return rest;
      });
    }

    setAssetType(type);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();

    setIsValidating(true);

    // Final validation before submission
    const formData: AssetFormData = {
      symbol: symbol.trim(),
      assetType: assetType as "compra" | "venda",
      quantity,
      selectedAssetId: selectedAsset?.id ?? "",
    };

    const validation = validateAssetForm(formData);

    if (!validation.success) {
      setValidationErrors(validation.errors);
      setIsValidating(false);
      return;
    }

    if (!selectedAsset) {
      setValidationErrors({
        selectedAssetId: "Você deve selecionar um ativo da lista",
      });
      setIsValidating(false);
      return;
    }

    try {
      useOrderStore.getState().addOrder({
        ...selectedAsset,
        totalPrice,
        type: "compra",
        requestedQuantity: quantity,
        remainingQuantity: selectedAsset.remainingQuantity - quantity,
        status: "aberta",
      });

      useOrderStore.getState().triggerUpdate();

      resetForm();
    } catch (error) {
      console.error("Error adding asset:", error);
      setValidationErrors({
        general: "Erro ao adicionar ativo. Tente novamente.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const resetForm = () => {
    setSelectedAsset(null);
    setSymbol("");
    setQuantity(1);
    // Don't reset the assetType to maintain the current type selection
    // setAssetType("");
    setTotalPrice(0);
    setResult([]);
    setValidationErrors({});
    setIsValidating(false);
    setHasUserInteracted(false);

    // Focus back on search field for better UX
    searchField.current?.focus();
  };

  return (
    <form
      className="p-4"
      onSubmit={handleAddAsset}
    >
      <fieldset>
        <legend className="font-bold py-2 underline">Busca por ativos</legend>

        <AssetFormFields
          symbol={symbol}
          assetType={assetType}
          quantity={quantity}
          totalPrice={totalPrice}
          searchFieldRef={searchField}
          onFilterAssets={handleFilterAssets}
          onTypeChange={handleTypeChange}
          onQuantityChange={handleQuantityChange}
          errors={validationErrors}
          isValidating={isValidating}
        />
      </fieldset>

      <ActionButtons
        hasSelectedAsset={!!selectedAsset && isFormValid}
        onReset={resetForm}
      />

      {validationErrors.general && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {validationErrors.general}
          </p>
        </div>
      )}

      <AssetSearchResults
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
