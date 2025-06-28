import { Restaurant } from '@dreckly/types';

export const createAddToCartHandler = (
  addToCart: (itemId: string, restaurant?: Restaurant) => void,
  currentRestaurant: Restaurant | null
) => {
  return (itemId: string) => addToCart(itemId, currentRestaurant || undefined);
};

export const createRemoveFromCartHandler = (
  removeFromCart: (itemId: string) => void
) => {
  return (itemId: string) => removeFromCart(itemId);
};

export const createSetQuantityHandler = (
  setItemQuantity: (itemId: string, quantity: number) => void
) => {
  return (itemId: string, quantity: number) =>
    setItemQuantity(itemId, quantity);
};
