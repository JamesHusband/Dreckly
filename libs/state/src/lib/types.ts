import { MenuItem, Restaurant } from '@dreckly/types';

export type CartBaseState = {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  menuItems: MenuItem[];
};

export interface CartActions {
  hasItems: () => boolean;
  itemCount: () => number;
  totalItems: () => number;
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => Array<{ item: MenuItem; quantity: number }>;
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
}

export interface RestaurantActions {
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  setMenuItems: (items: MenuItem[]) => void;
}

export type CartStore = CartBaseState & CartActions & RestaurantActions;
