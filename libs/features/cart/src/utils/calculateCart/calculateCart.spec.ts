import { calculateCart } from './calculateCart';
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

describe('calculateCart', () => {
  it('should calculate comprehensive cart details', () => {
    const cart: Cart = { 'item-1': 2, 'item-3': 1 };

    const result = calculateCart({ cart, restaurant: mockRestaurant });

    expect(result).toEqual({
      cartItemsList: expect.arrayContaining([
        expect.objectContaining({ id: 'item-1', quantity: 2 }),
        expect.objectContaining({ id: 'item-3', quantity: 1 }),
      ]),
      subtotal: 5.99 * 2 + 12.99,
      deliveryFee: 2.99,
      serviceFee: 1.49,
      total: 5.99 * 2 + 12.99 + 2.99 + 1.49,
      hasCartItems: true,
      itemCount: 2,
      totalItems: 3,
    });
  });

  it('should handle empty cart', () => {
    const cart: Cart = {};

    const result = calculateCart({ cart, restaurant: mockRestaurant });

    expect(result).toEqual({
      cartItemsList: [],
      subtotal: 0,
      deliveryFee: 2.99,
      serviceFee: 1.49,
      total: 2.99 + 1.49,
      hasCartItems: false,
      itemCount: 0,
      totalItems: 0,
    });
  });

  it('should use custom service fee', () => {
    const cart: Cart = { 'item-1': 1 };

    const result = calculateCart({
      cart,
      restaurant: mockRestaurant,
      serviceFee: 2.5,
    });

    expect(result.serviceFee).toBe(2.5);
    expect(result.total).toBe(5.99 + 2.99 + 2.5);
  });

  it('should handle restaurant with no delivery fee', () => {
    const restaurantWithoutDelivery = {
      ...mockRestaurant,
      deliveryFee: 0,
    };
    const cart: Cart = { 'item-1': 1 };

    const result = calculateCart({
      cart,
      restaurant: restaurantWithoutDelivery,
    });

    expect(result.deliveryFee).toBe(0);
    expect(result.total).toBe(5.99 + 1.49);
  });
});
