import { create } from "zustand";
import { Order } from "@/types/order.type";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (id: string) => void;
  updateOrder: (updatedOrder: Order) => void;
  clearOrders: () => void;
  triggerUpdate: () => void;
  getOrderStatus: (id: string) => string | undefined;
};

const getOrderStatus = (id: string) => {
  const state = useOrderStore.getState();
  const order = state.orders.find((order) => order.id === id);
  return order ? order.status : undefined;
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
  triggerUpdate: () => {
    setTimeout(() => {
      set((state) => {
        if (state.orders.length === 0) return {};
        const orders = [...state.orders];
        const lastIndex = orders.length - 1;
        orders[lastIndex] = {
          ...orders[lastIndex],
          dateTime: new Date().toISOString(),
          fulfilledAt: new Date().toISOString(),
          status: "fechada",
        };
        return { orders };
      });
    }, 8000);
  },
  getOrderStatus, // assign the function here
}));

export { useOrderStore };
