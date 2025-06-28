import { Restaurant, Cart, ComputedCartState } from '@dreckly/types';
import { getCartStats } from '@dreckly/utils';
import { CartItemWithDetails } from '../createCartItemsList';
import { createCartItemsList } from '../createCartItemsList';
import { calculateSubtotal } from '../calculateSubtotal';

export interface CartCalculationResult extends ComputedCartState {
  cartItemsList: CartItemWithDetails[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  hasCartItems: boolean;
}

export interface CartCalculationParams {
  cart: Cart;
  restaurant: Restaurant;
  serviceFee?: number;
}

export const calculateCart = ({
  cart,
  restaurant,
  serviceFee = 1.49,
}: CartCalculationParams): CartCalculationResult => {
  const cartItemsList = createCartItemsList(cart, restaurant);

  const subtotal = calculateSubtotal(cartItemsList);
  const deliveryFee = restaurant.deliveryFee || 0;
  const total = subtotal + deliveryFee + serviceFee;

  // Use shared computation logic
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
    ...computedState,
  };
};
