import { CartState, Restaurant } from '@dreckly/types';

export const startNewOrder = (set: any) => {
  return (restaurant: Restaurant) => {
    set((state: CartState) => ({
      ...state,
      cart: {},
      currentRestaurant: restaurant,
      menuItems: restaurant.menu.flatMap((category) => category.items),
    }));
  };
};
