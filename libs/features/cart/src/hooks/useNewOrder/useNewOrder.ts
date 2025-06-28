import { useCallback } from 'react';
import { Restaurant } from '@dreckly/types';
import { useCart } from '../useCart';

export const useNewOrder = () => {
  const { cart } = useCart();

  const needsRestaurantSwitch = useCallback(
    (restaurant: Restaurant): boolean => {
      if (!cart) return false;
      return cart.currentRestaurant?.id !== restaurant.id;
    },
    [cart]
  );

  const canAddToCart = useCallback(
    (restaurant: Restaurant): boolean => {
      if (!cart) return false;

      if (!cart.currentRestaurant) return true;

      if (cart.currentRestaurant.id === restaurant.id) return true;

      if (!cart.hasItems) return true;

      return false;
    },
    [cart]
  );

  const startNewOrderWithConfirmation = useCallback(
    async (restaurant: Restaurant): Promise<boolean> => {
      if (!cart) return false;

      if (cart.hasItems) {
        return false;
      }

      cart.startNewOrder(restaurant);
      return true;
    },
    [cart]
  );

  const startNewOrder = useCallback(
    (restaurant: Restaurant) => {
      if (cart) {
        cart.startNewOrder(restaurant);
      }
    },
    [cart]
  );

  return {
    startNewOrderWithConfirmation,
    startNewOrder,
    needsRestaurantSwitch,
    canAddToCart,
    hasItems: cart?.hasItems || false,
    currentRestaurant: cart?.currentRestaurant || null,
  };
};
