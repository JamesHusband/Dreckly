import { CartItemWithDetails } from '../createCartItemsList';

/**
 * Calculates the subtotal from cart items
 */
export const calculateSubtotal = (
  cartItemsList: CartItemWithDetails[]
): number => {
  return cartItemsList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};
