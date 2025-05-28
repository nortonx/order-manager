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
    <div
      className="order-summary mt-4 p-3 border rounded text-sm"
      data-testid="order-summary"
    >
      <h3 className="font-bold underline mb-2">Ativo Selecionado</h3>
      <p>Instrumento: {selectedAsset.symbol}</p>
      <p>Lado: {assetType === "compra" ? "Compra" : "Venda"}</p>
      <p>Preço unitário: {formatCurrency(selectedAsset.price ?? 0, "BRL")}</p>
      <p>Quantidade solicitada: {quantity}</p>
      <p>Quantidade Restante: {selectedAsset.remainingQuantity - quantity}</p>
      <p className="font-bold">Total: {formatCurrency(totalPrice, "BRL")}</p>
    </div>
  );
}
