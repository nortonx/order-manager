import data from "@/app/data/data.json";
import { Asset } from "@/types/asset.type";

/**
 * Retrieves all available assets from the data source
 * @returns An array of Asset objects containing all available assets
 */
export const getAssets = (): Asset[] => {
  return data;
};

/**
 * Finds and returns an asset by its unique identifier
 * @param id - The unique identifier of the asset to find
 * @returns The matching Asset object or undefined if not found
 */
export const getAssetById = (id: string): Asset | undefined => {
  return data.find((asset) => asset.id === id);
};

/**
 * Finds and returns an asset by its trading symbol
 * @param symbol - The trading symbol to search for
 * @returns The matching Asset object or undefined if not found
 */
export const getAssetBySymbol = (symbol: string): Asset | undefined => {
  return data.find((asset) => asset.symbol === symbol);
};
