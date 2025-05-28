import { getAssetById, getAssetBySymbol } from "@/actions/assets";

describe("getAssetById", () => {
  it("should return the asset with the given id", () => {
    const asset = getAssetById("1");
    expect(asset).toEqual({
      id: "1",
      symbol: "PETR4",
      price: 32.45,
      quantity: 1,
      remainingQuantity: 100,
      status: "aberta",
      type: "compra",
      dateTime: "2024-06-01T10:15:00Z",
    });
  });
});

describe("getAssetBySymbol", () => {
  it("should return the asset with the given symbol", () => {
    const asset = getAssetBySymbol("PETR4");
    expect(asset).toEqual({
      id: "1",
      symbol: "PETR4",
      price: 32.45,
      quantity: 1,
      remainingQuantity: 100,
      status: "aberta",
      type: "compra",
      dateTime: "2024-06-01T10:15:00Z",
    });
  });
});
