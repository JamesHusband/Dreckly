import { CartItem } from '@dreckly/types';

/**
 * Calculates the subtotal from cart items
 */
export const calculateSubtotal = (cartItemsList: CartItem[]): number => {
  return cartItemsList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};
