import { CartState } from '@dreckly/types';

export const clearCart = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return () => {
    set((state: CartState) => ({
      ...state,
      cart: {},
      currentRestaurant: null,
      menuItems: [],
    }));
  };
};
