import React from 'react';

// Temporary cart module to resolve import errors
export const useCart = () => ({ cart: null });
export const useCartCalculations = () => ({
  cartItemsList: [],
  subtotal: 0,
  deliveryFee: 0,
  serviceFee: 0,
  total: 0,
  hasCartItems: false,
});
export const useRestaurantLoader = () => ({ isClient: true });
export const createAddToCartHandler = () => () => undefined;
export const createRemoveFromCartHandler = () => () => undefined;
export const createSetQuantityHandler = () => () => undefined;
export const CartSidebar = () => null;
export const EmptyCart = () =>
  React.createElement('div', null, 'Cart is empty');
