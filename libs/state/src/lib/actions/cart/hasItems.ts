import { CartState } from '@dreckly/types';

export const hasItems = (get: () => CartState) => {
  const cart = get().cart;
  return Object.keys(cart).length > 0;
};
