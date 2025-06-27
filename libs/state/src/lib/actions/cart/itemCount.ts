import { CartState } from '@dreckly/types';

export const itemCount = (get: () => CartState) => {
  const cart = get().cart;
  return Object.keys(cart).length;
};
