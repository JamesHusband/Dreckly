import { CartState, Restaurant } from '@dreckly/types';

export const setCurrentRestaurant = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return (restaurant: Restaurant) => {
    set((state: CartState) => ({
      ...state,
      currentRestaurant: restaurant,
    }));
  };
};
