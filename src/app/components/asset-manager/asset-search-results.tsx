import { Button } from "@/app/components/ui/button";
import { Asset } from "@/types/asset.type";
import { formatCurrency } from "@/utils/currency";

interface AssetSearchResultsProps {
  results: Asset[];
  onSelectAsset: (asset: Asset) => void;
}

export function AssetSearchResults({
  results,
  onSelectAsset,
}: Readonly<AssetSearchResultsProps>) {
  return (
    <ul
      className="filtered-assets-list mt-4 text-sm"
      data-testid="asset-search-results"
    >
      {results.length > 0 ? (
        results.map((asset) => (
          <li
            key={asset.id}
            className="flex justify-between items-center p-2"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => onSelectAsset(asset)}
              size="sm"
              name="assetButton"
            >
              {asset.symbol}
            </Button>
            <div className="text-sm mr-2">
              {formatCurrency(asset.price ?? 0, "BRL")}
            </div>
          </li>
        ))
      ) : (
        <li>Nenhum resultado listado</li>
      )}
    </ul>
  );
}
