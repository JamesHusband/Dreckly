import { createCartItemsList } from './getCartItems';
import { Restaurant, Cart } from '@dreckly/types';

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Test Restaurant',
  cuisine: 'Italian',
  rating: 4.5,
  deliveryTime: '30-45 min',
  deliveryFee: 2.99,
  minimumOrder: 10,
  image: '/test-image.jpg',
  featured: true,
  description: 'Test restaurant description',
  address: '123 Test St',
  reviewCount: 100,
  menu: [
    {
      name: 'Starters',
      items: [
        {
          id: 'item-1',
          name: 'Bruschetta',
          description: 'Toasted bread with tomatoes',
          price: 5.99,
          image: '/bruschetta.jpg',
        },
        {
          id: 'item-2',
          name: 'Garlic Bread',
          description: 'Fresh garlic bread',
          price: 3.99,
          image: '/garlic-bread.jpg',
        },
      ],
    },
    {
      name: 'Mains',
      items: [
        {
          id: 'item-3',
          name: 'Margherita Pizza',
          description: 'Classic margherita pizza',
          price: 12.99,
          image: '/pizza.jpg',
        },
      ],
    },
  ],
};

describe('createCartItemsList', () => {
  it('should create cart items list with details', () => {
    const cart: Cart = { 'item-1': 2, 'item-3': 1 };

    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'item-1',
      name: 'Bruschetta',
      description: 'Toasted bread with tomatoes',
      price: 5.99,
      image: '/bruschetta.jpg',
      quantity: 2,
    });
    expect(result[1]).toEqual({
      id: 'item-3',
      name: 'Margherita Pizza',
      description: 'Classic margherita pizza',
      price: 12.99,
      image: '/pizza.jpg',
      quantity: 1,
    });
  });

  it('should filter out items not in menu', () => {
    const cart: Cart = { 'item-1': 1, 'non-existent': 2 };

    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('item-1');
  });

  it('should return empty array for empty cart', () => {
    const cart: Cart = {};

    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(0);
  });

  it('should handle zero quantities', () => {
    const cart: Cart = { 'item-1': 0, 'item-3': 1 };

    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(2);
    expect(result[0].quantity).toBe(0);
    expect(result[1].quantity).toBe(1);
  });
});
