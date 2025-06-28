import { Restaurant, CartState, CartActions } from '@dreckly/types';

export interface RestaurantActions {
  setCurrentRestaurant: (restaurant: Restaurant) => void;
}

export type CartStore = CartState & CartActions & RestaurantActions;
