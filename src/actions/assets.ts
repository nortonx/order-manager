import data from "../app/data/data.json";

export const getAssets = () => {
  return data;
};

export const getAssetById = (id: string) => {
  return data.find((asset) => asset.id === id);
};

export const getAssetBySymbol = (symbol: string) => {
  return data.find((asset) => asset.symbol === symbol);
};
