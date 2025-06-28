import { CartCalculationResult, CartCalculationParams } from '@dreckly/types';
import { getCartStats } from '@dreckly/utils';
import { createCartItemsList } from '../createCartItemsList';
import { calculateSubtotal } from '../calculateSubtotal';

export const getCartTotals = ({
  cart,
  restaurant,
  serviceFee = 1.49,
}: CartCalculationParams): CartCalculationResult => {
  const cartItems = createCartItemsList(cart, restaurant);

  const subtotal = calculateSubtotal(cartItems);

  const cartStats = getCartStats({
    cart,
    currentRestaurant: restaurant,
  });
  const hasCartItems = cartStats.itemCount > 0;

  return {
    cartItems,
    subtotal,
    deliveryFee: restaurant.deliveryFee,
    serviceFee,
    total: subtotal + restaurant.deliveryFee + serviceFee,
    hasCartItems,
    itemCount: cartStats.itemCount,
    totalItems: cartStats.totalItems,
  };
};
