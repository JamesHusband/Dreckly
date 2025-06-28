import { Cart, MenuItem, Restaurant } from '@dreckly/types';

/**
 * Get cart items in the format expected by state management
 */
export const getCartItemsForState = (
  cart: Cart,
  restaurant: Restaurant
): Array<{ item: MenuItem; quantity: number }> => {
  return Object.entries(cart)
    .map(([itemId, quantity]) => {
      const item = restaurant.menu
        ?.flatMap((category) => category.items)
        .find((menuItem) => menuItem.id === itemId);
      return item ? { item, quantity } : null;
    })
    .filter(
      (cartItem): cartItem is { item: MenuItem; quantity: number } =>
        cartItem !== null
    );
};
