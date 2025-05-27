import { Asset } from "@/types/asset.type";
import { formatCurrency } from "@/utils/currency";

interface OrderSummaryProps {
  readonly selectedAsset: Asset;
  readonly assetType: string;
  readonly quantity: number;
  readonly totalPrice: number;
}

export function OrderSummary({
  selectedAsset,
  assetType,
  quantity,
  totalPrice,
}: OrderSummaryProps) {
  return (
    <div className="order-summary mt-4 p-3 border rounded">
      <h3 className="font-bold">Order Summary</h3>
      <p>Symbol: {selectedAsset.symbol}</p>
      <p>Type: {assetType === "buy" ? "Compra" : "Venda"}</p>
      <p>Price per unit: {formatCurrency(selectedAsset.price ?? 0, "BRL")}</p>
      <p>Quantity: {quantity}</p>
      <p className="font-bold">Total: {formatCurrency(totalPrice, "BRL")}</p>
    </div>
  );
}
