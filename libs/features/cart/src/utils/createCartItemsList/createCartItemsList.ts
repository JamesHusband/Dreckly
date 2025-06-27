import { MenuItem } from '@dreckly/types';

export interface CartItemWithDetails extends MenuItem {
  quantity: number;
}

/**
 * Creates a list of cart items with full details
 */
export const createCartItemsList = (
  cart: Record<string, number>,
  menuItems: MenuItem[]
): CartItemWithDetails[] => {
  return Object.entries(cart)
    .map(([itemId, quantity]) => {
      const item = menuItems.find((menuItem) => menuItem.id === itemId);
      return item ? { ...item, quantity } : null;
    })
    .filter((item): item is CartItemWithDetails => item !== null);
};
