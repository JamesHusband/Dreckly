import { CartState } from '@dreckly/types';

export const setItemQuantity = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return (itemId: string, quantity: number) => {
    set((state: CartState) => {
      const newCart = { ...state.cart };
      if (quantity <= 0) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = quantity;
      }
      return { ...state, cart: newCart };
    });
  };
};
