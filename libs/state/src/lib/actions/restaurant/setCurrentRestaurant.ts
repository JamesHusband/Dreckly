import { CartState, Restaurant } from '@dreckly/types';

export const setCurrentRestaurant = (set: any) => {
  return (restaurant: Restaurant) => {
    const allMenuItems = restaurant.menu.flatMap((category) => category.items);
    set((state: CartState) => ({
      ...state,
      currentRestaurant: restaurant,
      menuItems: allMenuItems,
    }));
  };
};
