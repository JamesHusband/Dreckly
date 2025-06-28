import { CartState } from '@dreckly/types';

export const getItemQuantity = (get: () => CartState) => {
  return (itemId: string) => {
    return get().cart[itemId] || 0;
  };
};
