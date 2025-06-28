'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@dreckly/state';
import { Restaurant } from '@dreckly/types';
import { UseCartReturn } from '../types';

export const useCart = (): {
  cart: UseCartReturn | null;
  isClient: boolean;
} => {
  const [isClient, setIsClient] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cart: UseCartReturn | null = isClient
    ? {
        cart: store.cart,
        addToCart: store.addToCart,
        removeFromCart: store.removeFromCart,
        clearCart: store.clearCart,
        setItemQuantity: store.setItemQuantity,
        getCartQuantity: store.getItemQuantity,
        itemCount: store.itemCount(),
        totalItems: store.totalItems(),
        currentRestaurant: store.currentRestaurant,
        setCurrentRestaurant: store.setCurrentRestaurant,
        startNewOrder: (restaurant: Restaurant, itemId?: string) =>
          store.startNewOrder(restaurant, itemId),
      }
    : null;

  return { cart, isClient };
};
