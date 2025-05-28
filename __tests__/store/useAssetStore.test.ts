import { useAssetStore } from "@/store/useAssetStore";
import { Asset } from "@/types/asset.type";

describe("useAssetStore", () => {
  // Reset the store before each test
  beforeEach(() => {
    useAssetStore.getState().clearAssets();
  });

  const mockAsset: Asset = {
    id: "123",
    symbol: "AAPL",
    price: 150.5,
    type: "compra",
    remainingQuantity: 100,
    status: "active",
    dateTime: new Date().toISOString(),
  };

  const mockAsset2: Asset = {
    id: "456",
    symbol: "GOOGL",
    price: 2500,
    type: "sell",
    remainingQuantity: 50,
    status: "active",
    dateTime: new Date().toISOString(),
  };

  it("should initialize with empty assets array", () => {
    const { assets } = useAssetStore.getState();
    expect(assets).toEqual([]);
    expect(useAssetStore.getState().getLength()).toBe(0);
  });

  it("should add an asset", () => {
    useAssetStore.getState().addAsset(mockAsset);
    const { assets } = useAssetStore.getState();

    expect(assets).toHaveLength(1);
    expect(assets[0]).toEqual(mockAsset);
    expect(useAssetStore.getState().getLength()).toBe(1);
  });

  it("should add multiple assets", () => {
    useAssetStore.getState().addAsset(mockAsset);
    useAssetStore.getState().addAsset(mockAsset2);

    const { assets } = useAssetStore.getState();

    expect(assets).toHaveLength(2);
    expect(assets[0]).toEqual(mockAsset);
    expect(assets[1]).toEqual(mockAsset2);
    expect(useAssetStore.getState().getLength()).toBe(2);
  });

  it("should remove an asset by id", () => {
    // Add assets
    useAssetStore.getState().addAsset(mockAsset);
    useAssetStore.getState().addAsset(mockAsset2);

    // Verify both are added
    let assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(2);
    expect(useAssetStore.getState().getLength()).toBe(2);

    // Remove one asset
    useAssetStore.getState().removeAsset(mockAsset.id);

    // Verify only one remains
    assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(1);
    expect(assets[0]).toEqual(mockAsset2);
    expect(useAssetStore.getState().getLength()).toBe(1);
  });

  it("should update an existing asset", () => {
    // Add asset
    useAssetStore.getState().addAsset(mockAsset);

    // Create updated version with same id
    const updatedAsset = {
      ...mockAsset,
      price: 160,
      remainingQuantity: 50,
    };

    // Update the asset
    useAssetStore.getState().updateAsset(updatedAsset);

    // Verify it was updated
    const assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(1);
    expect(assets[0]).toEqual(updatedAsset);
    expect(assets[0].price).toBe(160);
    expect(assets[0].remainingQuantity).toBe(50);
    expect(useAssetStore.getState().getLength()).toBe(1);
  });

  it("should not update if asset id does not exist", () => {
    // Add asset
    useAssetStore.getState().addAsset(mockAsset);

    // Create an asset with different id
    const nonExistentAsset = {
      ...mockAsset,
      id: "non-existent",
      price: 200,
    };

    // Try to update
    useAssetStore.getState().updateAsset(nonExistentAsset);

    // Verify original is unchanged
    const assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(1);
    expect(assets[0]).toEqual(mockAsset);
    expect(assets[0].price).toBe(150.5);
  });

  it("should clear all assets", () => {
    // Add multiple assets
    useAssetStore.getState().addAsset(mockAsset);
    useAssetStore.getState().addAsset(mockAsset2);

    // Verify they are added
    let assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(2);
    expect(useAssetStore.getState().getLength()).toBe(2);

    // Clear all assets
    useAssetStore.getState().clearAssets();

    // Verify store is empty
    assets = useAssetStore.getState().assets;
    expect(assets).toHaveLength(0);
    expect(assets).toEqual([]);
    expect(useAssetStore.getState().getLength()).toBe(0);
  });

  it("getLength should return correct asset count", () => {
    expect(useAssetStore.getState().getLength()).toBe(0);

    useAssetStore.getState().addAsset(mockAsset);
    expect(useAssetStore.getState().getLength()).toBe(1);

    useAssetStore.getState().addAsset(mockAsset2);
    expect(useAssetStore.getState().getLength()).toBe(2);

    useAssetStore.getState().removeAsset(mockAsset.id);
    expect(useAssetStore.getState().getLength()).toBe(1);

    useAssetStore.getState().clearAssets();
    expect(useAssetStore.getState().getLength()).toBe(0);
  });
});
