import { create } from "zustand";
import { Asset } from "@/types/asset.type";

type AssetStore = {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
  updateAsset: (updatedAsset: Asset) => void;
  clearAssets: () => void;
  getLength: () => number;
};

const useAssetStore = create<AssetStore>((set, get) => ({
  assets: [],
  addAsset: (asset: Asset) =>
    set((state: AssetStore) => ({ assets: [...state.assets, asset] })),
  removeAsset: (id: string) =>
    set((state: AssetStore) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
  updateAsset: (updatedAsset: Asset) =>
    set((state: AssetStore) => ({
      assets: state.assets.map((asset) =>
        asset.id === updatedAsset.id ? updatedAsset : asset,
      ),
    })),
  clearAssets: () => set({ assets: [] }),
  getLength: (): number => get().assets.length,
}));

export { useAssetStore };
