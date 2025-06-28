import { CartState, Restaurant } from '@dreckly/types';

export const startNewOrder = (set: any) => {
  return (restaurant: Restaurant, itemId?: string) => {
    set((state: CartState) => {
      const newState = {
        ...state,
        cart: itemId ? { [itemId]: 1 } : {},
        currentRestaurant: restaurant,
      };

      return newState;
    });
  };
};
