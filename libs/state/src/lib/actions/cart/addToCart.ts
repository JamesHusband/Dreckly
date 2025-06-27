import { CartState, Restaurant } from '@dreckly/types';

export const addToCart = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return (itemId: string, restaurant?: Restaurant) => {
    set((state: CartState) => {
      if (!restaurant) {
        throw new Error('Restaurant parameter is required for addToCart');
      }

      if (
        state.currentRestaurant &&
        state.currentRestaurant.id !== restaurant.id
      ) {
        const newMenuItems = (restaurant.menu ?? []).flatMap(
          (category) => category.items
        );

        return {
          ...state,
          cart: { [itemId]: 1 },
          currentRestaurant: restaurant,
          menuItems: newMenuItems,
        };
      }

      if (Object.keys(state.cart).length > 0 && !state.currentRestaurant) {
        const newMenuItems = (restaurant.menu ?? []).flatMap(
          (category) => category.items
        );

        return {
          ...state,
          cart: { [itemId]: 1 },
          currentRestaurant: restaurant,
          menuItems: newMenuItems,
        };
      }

      const newMenuItems = (restaurant.menu ?? []).flatMap(
        (category) => category.items
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          [itemId]: (state.cart[itemId] || 0) + 1,
        },
        currentRestaurant: restaurant,
        menuItems: newMenuItems,
      };
    });
  };
};
