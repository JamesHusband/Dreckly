import { CartState } from '@dreckly/types';

export const clearCart = (set: any) => {
  return () => {
    set((state: CartState) => ({
      ...state,
      cart: {},
    }));
  };
};
