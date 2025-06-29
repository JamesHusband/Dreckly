import { CartState, Restaurant } from '@dreckly/types';

// Pure business logic functions
export const shouldStartNewOrder = (
  state: CartState,
  restaurant: Restaurant
): boolean => {
  return state.currentRestaurant?.id !== restaurant.id;
};

export const createNewOrderState = (
  state: CartState,
  itemId: string,
  restaurant: Restaurant
): CartState => {
  return {
    ...state,
    cart: { [itemId]: 1 },
    currentRestaurant: restaurant,
  };
};

export const incrementItemQuantity = (
  state: CartState,
  itemId: string,
  restaurant: Restaurant
): CartState => {
  return {
    ...state,
    cart: {
      ...state.cart,
      [itemId]: (state.cart[itemId] || 0) + 1,
    },
    currentRestaurant: restaurant,
  };
};

export const determineCartAction = (
  state: CartState,
  itemId: string,
  restaurant: Restaurant
): CartState => {
  if (shouldStartNewOrder(state, restaurant)) {
    return createNewOrderState(state, itemId, restaurant);
  }

  return incrementItemQuantity(state, itemId, restaurant);
};

export const addToCart = (
  set: (fn: (state: CartState) => CartState) => void
) => {
  return (itemId: string, restaurant?: Restaurant) => {
    set((state: CartState) => {
      if (!restaurant) {
        throw new Error('Restaurant parameter is required for addToCart');
      }

      return determineCartAction(state, itemId, restaurant);
    });
  };
};
