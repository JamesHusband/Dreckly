import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartStore, CartBaseState } from './types';
import * as cartActions from './actions/cart';
import * as restaurantActions from './actions/restaurant';

const initialState: CartBaseState = {
  cart: {},
  currentRestaurant: null,
};

const createCartStore = () =>
  create<CartStore>()(
    devtools(
      persist(
        (set, get) => ({
          ...initialState,
          // Cart actions
          itemCount: () => cartActions.itemCount(get)(),
          totalItems: () => cartActions.totalItems(get),
          addToCart: cartActions.addToCart(set),
          removeFromCart: cartActions.removeFromCart(set),
          clearCart: cartActions.clearCart(set),
          setItemQuantity: cartActions.setItemQuantity(set),
          getItemQuantity: cartActions.getItemQuantity(get),
          getCartItems: cartActions.getCartItems(get),
          startNewOrder: cartActions.startNewOrder(set),
          // Restaurant actions
          setCurrentRestaurant: restaurantActions.setCurrentRestaurant(set),
        }),
        {
          name: 'cart-storage',
        }
      ),
      {
        name: 'cart-store',
      }
    )
  );

export const useCartStore = createCartStore();

// Function to clear cart storage (for debugging)
export const clearCartStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart-storage');
  }
};
