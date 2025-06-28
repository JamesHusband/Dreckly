import { MenuItem, Restaurant, CartItem } from '@dreckly/types';

export const createCartItemsList = (
  cart: Record<string, number>,
  restaurant: Restaurant
): CartItem[] => {
  return Object.entries(cart)
    .map(([itemId, quantity]) => {
      const item = restaurant.menu
        ?.flatMap((category) => category.items)
        .find((menuItem) => menuItem.id === itemId);
      return item ? { ...item, quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);
};
