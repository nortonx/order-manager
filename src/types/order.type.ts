import { Asset } from './asset.type';

export type Order = Asset & {
  requestedQuantity?: number ;
};