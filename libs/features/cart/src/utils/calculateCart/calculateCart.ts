import {
  Restaurant,
  Cart,
  CartCalculationResult,
  CartCalculationParams,
  CartItemWithDetails,
} from '@dreckly/types';
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
  const deliveryFee = restaurant.deliveryFee || 0;
  const total = subtotal + deliveryFee + serviceFee;

  const computedState = getCartStats({
    cart,
    currentRestaurant: restaurant,
  });
  const hasCartItems = computedState.itemCount > 0;

  return {
    cartItemsList,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
    hasCartItems,
    itemCount: computedState.itemCount,
    totalItems: computedState.totalItems,
  };
};
