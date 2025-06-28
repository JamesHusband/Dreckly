import { CartState, ComputedCartState } from '@dreckly/types';
import { getCartStats } from '@dreckly/utils';

export const mapCartState = (state: CartState): ComputedCartState => {
  return getCartStats(state);
};
