import { Order } from '@dreckly/types';

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  // TODO: Proper base URL - environment variables for production
  const baseUrl = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/orders?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user orders');
  }

  return response.json();
};
