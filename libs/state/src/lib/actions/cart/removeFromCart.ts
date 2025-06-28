import { CartState } from '@dreckly/types';

export const removeFromCart = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return (itemId: string) => {
    set((state: CartState) => {
      const newCart = { ...state.cart };
      const currentQuantity = newCart[itemId] || 0;
      if (currentQuantity <= 1) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = currentQuantity - 1;
      }
      return { ...state, cart: newCart };
    });
  };
};
