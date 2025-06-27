import { Restaurant, Cart } from '@dreckly/types';
import { CartItemWithDetails } from '../createCartItemsList';
import { createCartItemsList } from '../createCartItemsList';
import { calculateSubtotal } from '../calculateSubtotal';

export interface CartCalculationResult {
  cartItemsList: CartItemWithDetails[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  hasCartItems: boolean;
  itemCount: number;
  totalItems: number;
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
  const menuItems = restaurant.menu.flatMap((category) => category.items);

  const cartItemsList = createCartItemsList(cart, menuItems);

  const subtotal = calculateSubtotal(cartItemsList);
  const deliveryFee = restaurant.deliveryFee || 0;
  const total = subtotal + deliveryFee + serviceFee;
  const hasCartItems = cartItemsList.length > 0;
  const itemCount = Object.keys(cart).length;
  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return {
    cartItemsList,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
    hasCartItems,
    itemCount,
    totalItems,
  };
};
