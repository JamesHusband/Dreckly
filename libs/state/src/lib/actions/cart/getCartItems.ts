import { CartState, MenuItem, CartItem } from '@dreckly/types';

export const getCartItems = (get: () => CartState) => {
  return () => {
    const { cart, currentRestaurant } = get();
    if (!currentRestaurant) return [];

    return Object.entries(cart)
      .map(([itemId, quantity]) => {
        const item = currentRestaurant.menu
          ?.flatMap((category) => category.items)
          .find((menuItem: MenuItem) => menuItem.id === itemId);
        return item ? { ...item, quantity } : null;
      })
      .filter((cartItem): cartItem is CartItem => cartItem !== null);
  };
};
