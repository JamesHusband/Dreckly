import { CartState, ComputedCartState } from '@dreckly/types';

/**
 * Get cart statistics (item count and total quantity)
 */
export const getCartStats = (state: CartState): ComputedCartState => {
  return {
    ...state,
    itemCount: Object.keys(state.cart).length,
    totalItems: Object.values(state.cart).reduce(
      (sum, quantity) => sum + quantity,
      0
    ),
  };
};
