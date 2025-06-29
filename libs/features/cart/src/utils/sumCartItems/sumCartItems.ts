import { CartItem } from '@dreckly/types';

export const sumCartItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
