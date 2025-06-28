import { sumCartItems } from './sumCartItems';
import { CartItem } from '@dreckly/types';

describe('sumCartItems', () => {
  it('should calculate subtotal correctly', () => {
    const cartItemsList: CartItem[] = [
      {
        id: 'item-1',
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes',
        price: 5.99,
        image: '/bruschetta.jpg',
        quantity: 2,
      },
      {
        id: 'item-3',
        name: 'Margherita Pizza',
        description: 'Classic margherita pizza',
        price: 12.99,
        image: '/pizza.jpg',
        quantity: 1,
      },
    ];

    const result = sumCartItems(cartItemsList);

    expect(result).toBe(5.99 * 2 + 12.99);
  });

  it('should return 0 for empty list', () => {
    const result = sumCartItems([]);
    expect(result).toBe(0);
  });

  it('should handle zero quantities', () => {
    const cartItemsList: CartItem[] = [
      {
        id: 'item-1',
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes',
        price: 5.99,
        image: '/bruschetta.jpg',
        quantity: 0,
      },
      {
        id: 'item-3',
        name: 'Margherita Pizza',
        description: 'Classic margherita pizza',
        price: 12.99,
        image: '/pizza.jpg',
        quantity: 1,
      },
    ];

    const result = sumCartItems(cartItemsList);

    expect(result).toBe(12.99);
  });

  it('should handle large quantities', () => {
    const cartItemsList: CartItem[] = [
      {
        id: 'item-1',
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes',
        price: 5.99,
        image: '/bruschetta.jpg',
        quantity: 10,
      },
    ];

    const result = sumCartItems(cartItemsList);

    expect(result).toBe(5.99 * 10);
  });

  it('should handle decimal prices correctly', () => {
    const cartItemsList: CartItem[] = [
      {
        id: 'item-1',
        name: 'Bruschetta',
        description: 'Toasted bread with tomatoes',
        price: 5.99,
        image: '/bruschetta.jpg',
        quantity: 3,
      },
      {
        id: 'item-2',
        name: 'Garlic Bread',
        description: 'Fresh garlic bread',
        price: 3.99,
        image: '/garlic-bread.jpg',
        quantity: 2,
      },
    ];

    const result = sumCartItems(cartItemsList);

    expect(result).toBe(5.99 * 3 + 3.99 * 2);
  });
});
