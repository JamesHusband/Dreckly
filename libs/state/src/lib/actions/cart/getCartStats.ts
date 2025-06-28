import { CartState, Restaurant } from '@dreckly/types';

interface CartStats {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  itemCount: number;
  totalItems: number;
}

/**
 * Get cart statistics (item count and total quantity)
 */
export const getCartStats = (state: CartState): CartStats => {
  const cart = state.cart || {};

  return {
    ...state,
    cart,
    itemCount: Object.keys(cart).length,
    totalItems: Object.values(cart).reduce(
      (sum, quantity) => sum + quantity,
      0
    ),
  };
};
