import { CartState } from '@dreckly/types';
import { createCartItemsList } from '@dreckly/utils';

export const getCartItems = (get: () => CartState) => {
  return () => {
    const { cart, currentRestaurant } = get();
    if (!currentRestaurant) return [];

    return createCartItemsList(cart, currentRestaurant);
  };
};
