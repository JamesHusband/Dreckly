import { UseCartReturn } from '../types';
import { Restaurant, MenuItem } from '@dreckly/types';

type CartStoreType = {
  getState: () => {
    cart: Record<string, number>;
    addToCart: (itemId: string, restaurant?: Restaurant) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    setItemQuantity: (itemId: string, quantity: number) => void;
    getItemQuantity: (itemId: string) => number;
    hasItems: () => boolean;
    itemCount: () => number;
    totalItems: () => number;
    currentRestaurant: Restaurant | null;
    menuItems: MenuItem[];
    setCurrentRestaurant: (restaurant: Restaurant) => void;
    startNewOrder: (restaurant: Restaurant) => void;
  };
};

export const mapCartState = (store: CartStoreType): UseCartReturn => {
  return {
    cart: store.getState().cart,
    addToCart: store.getState().addToCart,
    removeFromCart: store.getState().removeFromCart,
    clearCart: store.getState().clearCart,
    setItemQuantity: store.getState().setItemQuantity,
    getCartQuantity: store.getState().getItemQuantity,
    hasItems: store.getState().hasItems(),
    itemCount: store.getState().itemCount(),
    totalItems: store.getState().totalItems(),
    currentRestaurant: store.getState().currentRestaurant,
    menuItems: store.getState().menuItems,
    setCurrentRestaurant: store.getState().setCurrentRestaurant,
    startNewOrder: store.getState().startNewOrder,
  };
};
