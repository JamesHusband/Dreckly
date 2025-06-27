import { Restaurant, Cart } from '@dreckly/types';

interface GetCartTotalParams {
  cart: Cart;
  restaurant: Restaurant;
}

export const getCartTotal = ({
  cart,
  restaurant,
}: GetCartTotalParams): number => {
  let total = 0;
  restaurant.menu.forEach((category) => {
    category.items.forEach((item) => {
      total += (cart[item.id] || 0) * item.price;
    });
  });
  return total;
};
