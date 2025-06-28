import { getCartTotal } from './getCartTotal.js';
import { Restaurant, Cart } from '@dreckly/types';

describe('getCartTotal', () => {
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
          {
            id: 'item-4',
            name: 'Pasta Carbonara',
            description: 'Creamy pasta carbonara',
            price: 14.99,
            image: '/pasta.jpg',
          },
        ],
      },
    ],
  };

  it('should calculate total for empty cart', () => {
    const cart: Cart = {};
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(0);
  });

  it('should calculate total for single item', () => {
    const cart: Cart = { 'item-1': 1 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99);
  });

  it('should calculate total for multiple items', () => {
    const cart: Cart = { 'item-1': 2, 'item-3': 1 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99 * 2 + 12.99);
  });

  it('should calculate total for items from different categories', () => {
    const cart: Cart = { 'item-1': 1, 'item-3': 2, 'item-4': 1 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99 + 12.99 * 2 + 14.99);
  });

  it('should handle items not in cart', () => {
    const cart: Cart = { 'item-1': 1, 'non-existent-item': 2 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99);
  });

  it('should handle zero quantities', () => {
    const cart: Cart = { 'item-1': 0, 'item-3': 1 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(12.99);
  });

  it('should handle large quantities', () => {
    const cart: Cart = { 'item-1': 10, 'item-3': 5 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99 * 10 + 12.99 * 5);
  });

  it('should handle decimal prices correctly', () => {
    const cart: Cart = { 'item-1': 3, 'item-2': 2 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(5.99 * 3 + 3.99 * 2);
  });

  it('should return 0 for cart with only non-existent items', () => {
    const cart: Cart = { 'non-existent-1': 5, 'non-existent-2': 3 };
    const result = getCartTotal({ cart, restaurant: mockRestaurant });
    expect(result).toBe(0);
  });

  it('should handle restaurant with empty menu', () => {
    const emptyMenuRestaurant: Restaurant = {
      ...mockRestaurant,
      menu: [],
    };
    const cart: Cart = { 'item-1': 1 };
    const result = getCartTotal({ cart, restaurant: emptyMenuRestaurant });
    expect(result).toBe(0);
  });
});
