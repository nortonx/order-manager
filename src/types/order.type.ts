export type Order = {
  id: string;
  instrument: string;
  side: string;
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: string; // open/closed
  dateTime: Date;
};
