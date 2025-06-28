import { Restaurant, Cart } from '@dreckly/types';

/**
 * Calculates cart total from restaurant menu (legacy method)
 */
export const getCartTotal = ({
  cart,
  restaurant,
}: {
  cart: Cart;
  restaurant: Restaurant;
}): number => {
  let total = 0;
  restaurant.menu?.forEach((category) => {
    category.items.forEach((item) => {
      total += (cart[item.id] || 0) * item.price;
    });
  });
  return total;
};
