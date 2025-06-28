import { useCallback } from 'react';
import { Restaurant } from '@dreckly/types';
import { useCart } from '../useCart';
import { useNewOrder } from '../useNewOrder';
import { useConfirmationModal } from '../useConfirmationModal';

export const useCartActions = () => {
  const { cart } = useCart();
  const { startNewOrder } = useNewOrder();
  const { isOpen, showConfirmation, hideConfirmation, confirmAction } =
    useConfirmationModal();

  const addToCart = useCallback(
    async (itemId: string, restaurant: Restaurant): Promise<boolean> => {
      if (!cart) return false;

      console.log('addToCart called with:', {
        itemId,
        restaurantId: restaurant.id,
        currentRestaurantId: cart.currentRestaurant?.id,
        cartItems: Object.keys(cart.cart).length,
      });

      if (
        cart.currentRestaurant &&
        cart.currentRestaurant.id !== restaurant.id &&
        cart.itemCount > 0
      ) {
        console.log('Showing confirmation modal because:', {
          hasCurrentRestaurant: !!cart.currentRestaurant,
          differentRestaurant: cart.currentRestaurant.id !== restaurant.id,
          hasItems: cart.itemCount > 0,
        });
        showConfirmation(itemId, restaurant);
        return false;
      }

      try {
        cart.addToCart(itemId, restaurant);
        return true;
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        return false;
      }
    },
    [cart, showConfirmation]
  );

  const addToCartWithNewOrder = useCallback(
    (itemId: string, restaurant: Restaurant) => {
      if (!cart) return false;

      startNewOrder(restaurant);
      cart.addToCart(itemId, restaurant);
      return true;
    },
    [cart, startNewOrder]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      if (cart) {
        cart.removeFromCart(itemId);
      }
    },
    [cart]
  );

  const handleConfirmAddToCart = useCallback(
    (itemId: string, restaurant: Restaurant) => {
      if (!cart) return false;

      cart.startNewOrder(restaurant, itemId);
      return true;
    },
    [cart]
  );

  return {
    addToCart,
    addToCartWithNewOrder,
    removeFromCart,
    handleConfirmAddToCart,
    isOpen,
    showConfirmation,
    hideConfirmation,
    confirmAction,
  };
};
