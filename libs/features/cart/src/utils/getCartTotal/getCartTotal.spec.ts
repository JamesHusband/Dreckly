import { getCartTotal } from './getCartTotal';
import { Restaurant, Cart } from '@dreckly/types';

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Test Restaurant',
  minOrder: 10,
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

describe('getCartTotal', () => {
  it('should calculate total from restaurant menu', () => {
    const cart: Cart = { 'item-1': 2, 'item-3': 1 };

    const result = getCartTotal({ cart, restaurant: mockRestaurant });

    expect(result).toBe(5.99 * 2 + 12.99);
  });

  it('should handle items not in menu', () => {
    const cart: Cart = { 'item-1': 1, 'non-existent': 5 };

    const result = getCartTotal({ cart, restaurant: mockRestaurant });

    expect(result).toBe(5.99);
  });

  it('should handle empty cart', () => {
    const cart: Cart = {};

    const result = getCartTotal({ cart, restaurant: mockRestaurant });

    expect(result).toBe(0);
  });
});
