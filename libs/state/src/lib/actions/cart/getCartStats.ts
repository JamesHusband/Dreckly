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
  return {
    ...state,
    itemCount: Object.keys(state.cart).length,
    totalItems: Object.values(state.cart).reduce(
      (sum, quantity) => sum + quantity,
      0
    ),
  };
};
