import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/currency";
import { RefObject } from "react";

interface AssetFormFieldsProps {
  symbol: string;
  assetType: string;
  quantity: number;
  totalPrice: number;
  searchFieldRef: RefObject<HTMLInputElement>;
  onFilterAssets: (value: string) => void;
  onTypeChange: (type: string) => void;
  onQuantityChange: (quantity: number) => void;
  // Validation props
  errors?: Record<string, string>;
  isValidating?: boolean;
}

interface FieldWrapperProps {
  children: React.ReactNode;
  error?: string;
  label?: string;
}

function FieldWrapper({ children, error, label }: Readonly<FieldWrapperProps>) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function AssetFormFields({
  symbol,
  assetType,
  quantity,
  totalPrice,
  searchFieldRef,
  onFilterAssets,
  onTypeChange,
  onQuantityChange,
  errors = {},
  isValidating = false,
}: Readonly<AssetFormFieldsProps>) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input for better UX, but convert to number for validation
    if (value === "") {
      onQuantityChange(0);
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        onQuantityChange(numValue);
      }
    }
  };

  return (
    <div data-testid="asset-form-fields">
      <FieldWrapper
        error={errors.symbol}
        label="Instrumento"
      >
        <Input
          placeholder="Instrumento"
          className={`my-2 ${errors.symbol ? "border-red-500 focus:border-red-500" : ""}`}
          onChange={(e) => onFilterAssets(e.target.value.toUpperCase())}
          ref={searchFieldRef}
          value={symbol}
          name="symbol"
          aria-invalid={!!errors.symbol}
          aria-describedby={errors.symbol ? "symbol-error" : undefined}
        />
      </FieldWrapper>

      <FieldWrapper
        error={errors.assetType}
        label="Tipo de Operação"
      >
        <div className="select-container">
          <Select
            value={assetType}
            onValueChange={onTypeChange}
            data-testid="asset-type-select"
            name="type"
          >
            <SelectTrigger
              className={`w-full ${errors.assetType ? "border-red-500 focus:border-red-500" : ""}`}
              aria-invalid={!!errors.assetType}
            >
              <SelectValue placeholder="Selecione: Compra ou Venda?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compra">Compra</SelectItem>
              <SelectItem value="venda">Venda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FieldWrapper>

      <FieldWrapper
        error={errors.quantity}
        label="Quantidade"
      >
        <Input
          type="number"
          placeholder="Quantidade"
          className={`my-2 ${errors.quantity ? "border-red-500 focus:border-red-500" : ""}`}
          min="1"
          max="10000"
          value={quantity || ""}
          onChange={handleQuantityChange}
          name="quantity"
          aria-invalid={!!errors.quantity}
          aria-describedby={errors.quantity ? "quantity-error" : undefined}
        />
      </FieldWrapper>

      <FieldWrapper label="Preço Total">
        <Input
          type="text"
          placeholder="Preço"
          className="my-1 bg-gray-50 dark:bg-gray-800"
          disabled
          value={totalPrice ? formatCurrency(totalPrice, "BRL") : "R$ 0,00"}
          name="totalPrice"
          readOnly
        />
      </FieldWrapper>

      {errors.selectedAssetId && (
        <div className="my-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p
            className="text-sm text-green-600 dark:text-green-400"
            role="alert"
          >
            {errors.selectedAssetId}
          </p>
        </div>
      )}

      {isValidating && (
        <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400">
          <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
          <span className="text-sm">Validando...</span>
        </div>
      )}
    </div>
  );
}
