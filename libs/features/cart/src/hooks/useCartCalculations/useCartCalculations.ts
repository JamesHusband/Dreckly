import { useMemo } from 'react';
import { useCart } from '../useCart';
import { calculateCart } from '../../utils/calculateCart';

export const useCartCalculations = () => {
  const { cart } = useCart();

  return useMemo(() => {
    if (!cart || !cart.currentRestaurant) {
      return {
        cartItemsList: [],
        subtotal: 0,
        deliveryFee: 0,
        serviceFee: 1.49,
        total: 1.49,
        hasCartItems: false,
        itemCount: 0,
        totalItems: 0,
      };
    }

    const { cart: cartItems, currentRestaurant } = cart;

    return calculateCart({
      cart: cartItems,
      restaurant: currentRestaurant,
    });
  }, [cart]);
};
