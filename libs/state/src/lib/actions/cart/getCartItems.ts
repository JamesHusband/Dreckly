import { CartState, MenuItem } from '@dreckly/types';

export const getCartItems = (get: () => CartState) => {
  return () => {
    const { cart, menuItems } = get();
    return Object.entries(cart)
      .map(([itemId, quantity]) => {
        const item = menuItems.find(
          (menuItem: MenuItem) => menuItem.id === itemId
        );
        return item ? { item, quantity } : null;
      })
      .filter((cartItem) => cartItem !== null);
  };
};
