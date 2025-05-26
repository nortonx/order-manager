import { Button } from "@/app/components/ui/button";
import { Asset } from "@/types/asset.type";
import { formatCurrency } from '@/utils/currency';

interface AssetSearchProps {
  results: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export function AssetSearch({ results, onSelectAsset }: Readonly<AssetSearchProps>) {
  return (
    <ul className="filtered-assets-list mt-3">
      {results.length > 0 ? (
        results.map((asset) => (
          <li key={asset.id} className="flex justify-between items-center border p-2 my-y">
            <Button 
              type="button"
              variant="outline"
              onClick={() => onSelectAsset(asset)}
              size="sm"
            >
              {asset.symbol}
            </Button>
            <div className="text-sm mr-2">{formatCurrency(asset.price ?? 0, "BRL")}</div>
          </li>
        ))
      ) : (
        <li>Nenhum resultado listado</li>
      )}
    </ul>
  );
}
