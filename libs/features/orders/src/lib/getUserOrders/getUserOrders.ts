import { Order } from '@dreckly/types';

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  const response = await fetch(`/api/orders?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user orders');
  }

  return response.json();
};
