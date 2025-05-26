import { Button } from "@/app/components/ui/button";
import { Asset } from "@/types/asset.type";
import { formatCurrency } from '@/utils/currency';

interface AssetSearchProps {
  results: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export function AssetSearch({ results, onSelectAsset }: AssetSearchProps) {
  return (
    <ul className="filtered-assets-list">
      {results.length > 0 ? (
        results.map((asset) => (
          <li key={asset.id} className="flex justify-between border p-2 my-1">
            <Button 
              type="button"
              variant="outline"
              onClick={() => onSelectAsset(asset)}
            >
              {asset.symbol}
            </Button>
            <span>{formatCurrency(asset.price ?? 0, "BRL")}</span>
          </li>
        ))
      ) : (
        <li>No results yet</li>
      )}
    </ul>
  );
}
