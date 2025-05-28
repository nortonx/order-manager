import { Asset } from "./asset.type";

export type Order = Asset & {
  requestedQuantity?: number;
  updatedAt?: string;
  fulfilledAt?: string;
};
