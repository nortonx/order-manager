import { useOrderStore } from '@/store/useOrderStore';
import type { Order } from '@/types/order.type';

describe('useOrderStore', () => {
  // Reset the store before each test
  beforeEach(() => {
    useOrderStore.getState().clearOrders();
  });

  const mockOrder: Order = {
    id: '456',
    symbol: 'GOOGL',
    price: 2500,
    requestedQuantity: 5,
    remainingQuantity: 5,
    totalPrice: 12500,
    type: 'sell',
    status: 'pending',
    dateTime: new Date().toISOString(),
  };

  const mockOrder2: Order = {
    id: '457',
    symbol: 'AAPL',
    price: 2500,
    requestedQuantity: 5,
    remainingQuantity: 5,
    totalPrice: 12500,
    type: 'sell',
    status: 'pending',
    dateTime: new Date().toISOString(),
  };

  it('should initialize with empty orders array', () => {
    const { orders } = useOrderStore.getState();
    expect(orders).toEqual([]);
  });

  it('should add an order', () => {
    useOrderStore.getState().addOrder(mockOrder);
    const { orders } = useOrderStore.getState();
    
    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual(mockOrder);
  });

  it('should add multiple orders', () => {
    useOrderStore.getState().addOrder(mockOrder);
    useOrderStore.getState().addOrder(mockOrder2);
    
    const { orders } = useOrderStore.getState();
    
    expect(orders).toHaveLength(2);
    expect(orders[0]).toEqual(mockOrder);
    expect(orders[1]).toEqual(mockOrder2);
  });

  
  it('should remove an order by id', () => {
    // Add orders
    useOrderStore.getState().addOrder(mockOrder);
    useOrderStore.getState().addOrder(mockOrder2);
    
    // Verify both are added
    let orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(2);
    
    // Remove one order
    useOrderStore.getState().removeOrder(mockOrder.id);
    
    // Verify only one remains
    orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual(mockOrder2);
  });

  it('should update an existing order', () => {
    // Add order
    useOrderStore.getState().addOrder(mockOrder);
    
    // Create updated version with same id
    const updatedOrder = {
      ...mockOrder,
      price: 160,
      totalPrice: 1600,
      remainingQuantity: 5
    };
    
    // Update the order
    useOrderStore.getState().updateOrder(updatedOrder);
    
    // Verify it was updated
    const orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual(updatedOrder);
    expect(orders[0].price).toBe(160);
    expect(orders[0].remainingQuantity).toBe(5);
  });

  it('should not update if order id does not exist', () => {
    // Add order
    useOrderStore.getState().addOrder(mockOrder);
    
    // Create an order with different id
    const nonExistentOrder = {
      ...mockOrder,
      id: 'non-existent',
      price: 200
    };
    
    // Try to update
    useOrderStore.getState().updateOrder(nonExistentOrder);
    
    // Verify original is unchanged
    const orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual(mockOrder);
    expect(orders[0].price).toBe(2500);
  });

  it('should clear all orders', () => {
    // Add multiple orders
    useOrderStore.getState().addOrder(mockOrder);
    useOrderStore.getState().addOrder(mockOrder2);
    
    // Verify they are added
    let orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(2);
    
    // Clear all orders
    useOrderStore.getState().clearOrders();
    
    // Verify store is empty
    orders = useOrderStore.getState().orders;
    expect(orders).toHaveLength(0);
    expect(orders).toEqual([]);
  });
});
