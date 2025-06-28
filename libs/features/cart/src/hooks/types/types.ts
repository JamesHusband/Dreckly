import { Restaurant, MenuItem } from '@dreckly/types';

export interface UseCartReturn {
  cart: Record<string, number>;
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  getCartQuantity: (itemId: string) => number;
  hasItems: boolean;
  itemCount: number;
  totalItems: number;
  currentRestaurant: Restaurant | null;
  menuItems: MenuItem[];
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  startNewOrder: (restaurant: Restaurant) => void;
}
