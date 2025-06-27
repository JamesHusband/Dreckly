import { CartState, Restaurant } from '@dreckly/types';

export const startNewOrder = (set: any) => {
  return (restaurant: Restaurant, itemId?: string) => {
    set((state: CartState) => {
      const newMenuItems = (restaurant.menu ?? []).flatMap(
        (category) => category.items
      );

      const newState = {
        ...state,
        cart: itemId ? { [itemId]: 1 } : {},
        currentRestaurant: restaurant,
        menuItems: newMenuItems,
      };

      return newState;
    });
  };
};
