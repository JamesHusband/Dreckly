import { createCartItemsList } from './createCartItemsList';
import { Restaurant, MenuItem } from '@dreckly/types';

describe('createCartItemsList', () => {
  const mockRestaurant: Restaurant = {
    id: 1,
    name: 'Test Restaurant',
    cuisine: 'Test Cuisine',
    rating: 4.5,
    deliveryTime: '30-45 minutes',
    deliveryFee: 2.99,
    featured: false,
    minimumOrder: 10,
    description: 'Test description',
    address: '123 Test St, Test City, TE1 1ST',
    menu: [
      {
        name: 'Main Dishes',
        items: [
          {
            id: 'item1',
            name: 'Burger',
            description: 'Delicious burger',
            price: 12.99,
            image: '/burger.jpg',
          },
          {
            id: 'item2',
            name: 'Pizza',
            description: 'Tasty pizza',
            price: 15.99,
            image: '/pizza.jpg',
          },
        ],
      },
    ],
  };

  it('should return empty array when cart is empty', () => {
    const result = createCartItemsList({}, mockRestaurant);
    expect(result).toEqual([]);
  });

  it('should return cart items with menu item details', () => {
    const cart = { item1: 2, item2: 1 };
    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'item1',
      name: 'Burger',
      description: 'Delicious burger',
      price: 12.99,
      image: '/burger.jpg',
      quantity: 2,
    });
    expect(result[1]).toEqual({
      id: 'item2',
      name: 'Pizza',
      description: 'Tasty pizza',
      price: 15.99,
      image: '/pizza.jpg',
      quantity: 1,
    });
  });

  it('should filter out items not found in menu', () => {
    const cart = { item1: 1, nonexistent: 2 };
    const result = createCartItemsList(cart, mockRestaurant);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('item1');
  });

  it('should handle null cart', () => {
    const result = createCartItemsList(null as any, mockRestaurant);
    expect(result).toEqual([]);
  });
});
