import { CartCalculationResult, GetCartTotalsParams } from '@dreckly/types';
import { sumCartItems } from '../sumCartItems/sumCartItems';
import { createCartItemsList } from '@dreckly/utils';

export const getCartTotals = ({
  cart,
  restaurant,
  serviceFee = 1.49,
}: GetCartTotalsParams): CartCalculationResult => {
  const cartItems = createCartItemsList(cart, restaurant);
  const subtotal = sumCartItems(cartItems);
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const itemCount = Object.keys(cart).length;
  const hasCartItems = totalItems > 0;

  return {
    cartItems,
    subtotal,
    deliveryFee: restaurant.deliveryFee,
    serviceFee,
    total: subtotal + restaurant.deliveryFee + serviceFee,
    hasCartItems,
    itemCount,
    totalItems,
  };
};
