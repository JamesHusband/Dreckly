import { CartCalculationResult, CartCalculationParams } from '@dreckly/types';
import { getCartStats } from '@dreckly/utils';
import { createCartItemsList } from '../createCartItemsList';
import { calculateSubtotal } from '../calculateSubtotal';

export const calculateCart = ({
  cart,
  restaurant,
  serviceFee = 1.49,
}: CartCalculationParams): CartCalculationResult => {
  const cartItemsList = createCartItemsList(cart, restaurant);

  const subtotal = calculateSubtotal(cartItemsList);

  const computedState = getCartStats({
    cart,
    currentRestaurant: restaurant,
  });
  const hasCartItems = computedState.itemCount > 0;

  return {
    cartItems: cartItemsList,
    subtotal,
    deliveryFee: restaurant.deliveryFee,
    serviceFee,
    total: subtotal + restaurant.deliveryFee + serviceFee,
    hasCartItems,
    itemCount: computedState.itemCount,
    totalItems: computedState.totalItems,
  };
};
