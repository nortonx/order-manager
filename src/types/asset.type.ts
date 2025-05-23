import type { Status } from "../enums/status.enum";
import type { Side } from "../enums/side.enum";

export type Asset = {
  id: string;
  symbol: string;
  type: Side;
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: Status;
  dateTime: string;
};
