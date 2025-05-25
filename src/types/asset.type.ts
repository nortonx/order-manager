import type { Status } from "../enums/status.enum";
import type { Side } from "../enums/side.enum";

export type Asset = {
  id: string;
  symbol: string;
  type: Side | string;
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: Status | string;
  dateTime: string;
};
