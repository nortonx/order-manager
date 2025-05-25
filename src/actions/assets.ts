import data from "@/app/data/data.json";
import useAssetStore from "@/store/useAssetStore";
import { Asset } from "@/types/asset.type";

export const getAssets = () => {
  return data;
};

export const getAssetById = (id: string) => {
  return data.find((asset) => asset.id === id);
};

export const getAssetBySymbol = (symbol: string) => {
  return data.find((asset) => asset.symbol === symbol);
};

export const loadAssetsToStore = () => {
  const assets = getAssets();
  const assetStore = useAssetStore.getState();
  assetStore.clearAssets();
  assets.forEach((asset: Asset) => {
    assetStore.addAsset(asset);
  });
}
