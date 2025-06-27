import { CartState } from '@dreckly/types';

export const totalItems = (get: () => CartState) => {
  const cart = get().cart;
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
};
