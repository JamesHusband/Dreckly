import { Restaurant, CartActions } from '@dreckly/types';

export interface UseCartReturn {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  // Cart actions
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => Array<{ item: any; quantity: number }>;
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
  // Computed values
  itemCount: number;
  totalItems: number;
}
