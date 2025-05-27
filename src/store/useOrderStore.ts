import { create } from "zustand";
import { Order } from "@/types/order.type";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (id: string) => void;
  updateOrder: (updatedOrder: Order) => void;
  clearOrders: () => void;
};

const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  addOrder: (order: Order) =>
    set((state: OrderStore) => ({ orders: [...state.orders, order] })),
  removeOrder: (id: string) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),
  updateOrder: (updatedOrder: Order) =>
    set((state: OrderStore) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      ),
    })),
  clearOrders: () => set({ orders: [] }),
}));

export { useOrderStore };
