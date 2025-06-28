import { CartState, Restaurant } from '@dreckly/types';

export const setCurrentRestaurant = (set: any) => {
  return (restaurant: Restaurant) => {
    set((state: CartState) => ({
      ...state,
      currentRestaurant: restaurant,
    }));
  };
};
