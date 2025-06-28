import { MenuItem, Restaurant } from '@dreckly/types';

export interface CartItemWithDetails extends MenuItem {
  quantity: number;
}

export const createCartItemsList = (
  cart: Record<string, number>,
  restaurant: Restaurant
): CartItemWithDetails[] => {
  return Object.entries(cart)
    .map(([itemId, quantity]) => {
      const item = restaurant.menu
        ?.flatMap((category) => category.items)
        .find((menuItem) => menuItem.id === itemId);
      return item ? { ...item, quantity } : null;
    })
    .filter((item): item is CartItemWithDetails => item !== null);
};
