import { renderHook, act } from '@testing-library/react';
import { useCartStore } from './cartStore.js';
import { Restaurant } from '@dreckly/types';

jest.mock('zustand/middleware', () => ({
  devtools: (fn: unknown) => fn,
  persist: (fn: unknown) => fn,
}));

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Test Restaurant',
  cuisine: 'Italian',
  rating: 4.5,
  deliveryTime: '25-40 minutes',
  deliveryFee: 2.5,
  minimumOrder: 10,
  image: '/test.jpg',
  featured: true,
  description: 'Test description',
  address: '123 Test St',
  reviewCount: 100,
  menu: [
    {
      name: 'Main Dishes',
      items: [
        {
          id: 'item-1',
          name: 'Pizza Margherita',
          description: 'Classic tomato and mozzarella',
          price: 12.99,
          image: '/pizza.jpg',
        },
        {
          id: 'item-2',
          name: 'Pasta Carbonara',
          description: 'Creamy pasta with bacon',
          price: 14.99,
          image: '/pasta.jpg',
        },
      ],
    },
  ],
};

describe('CartStore', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.cart).toEqual({});
      expect(result.current.currentRestaurant).toBeNull();
    });

    it('should have all required methods', () => {
      const { result } = renderHook(() => useCartStore());

      expect(typeof result.current.itemCount).toBe('function');
      expect(typeof result.current.totalItems).toBe('function');
      expect(typeof result.current.addToCart).toBe('function');
      expect(typeof result.current.removeFromCart).toBe('function');
      expect(typeof result.current.clearCart).toBe('function');
      expect(typeof result.current.setItemQuantity).toBe('function');
      expect(typeof result.current.getItemQuantity).toBe('function');
      expect(typeof result.current.getCartItems).toBe('function');
      expect(typeof result.current.startNewOrder).toBe('function');
      expect(typeof result.current.setCurrentRestaurant).toBe('function');
    });
  });

  describe('Cart Operations', () => {
    it('should add item to cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
      });

      expect(result.current.cart).toEqual({ 'item-1': 1 });
      expect(result.current.currentRestaurant).toBe(mockRestaurant);
    });

    it('should increment quantity when adding same item', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-1', mockRestaurant);
      });

      expect(result.current.cart).toEqual({ 'item-1': 2 });
    });

    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.removeFromCart('item-1');
      });

      expect(result.current.cart).toEqual({});
    });

    it('should clear cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-2', mockRestaurant);
        result.current.clearCart();
      });

      expect(result.current.cart).toEqual({});
    });

    it('should set item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.setItemQuantity('item-1', 5);
      });

      expect(result.current.cart).toEqual({ 'item-1': 5 });
    });

    it('should get item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.setItemQuantity('item-1', 3);
      });

      expect(result.current.getItemQuantity('item-1')).toBe(3);
      expect(result.current.getItemQuantity('item-2')).toBe(0);
    });

    it('should get item count', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.itemCount()).toBe(0);

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-2', mockRestaurant);
      });

      expect(result.current.itemCount()).toBe(2);
    });

    it('should get total items', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.totalItems()).toBe(0);

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-2', mockRestaurant);
      });

      expect(result.current.totalItems()).toBe(3);
    });

    it('should get cart items with menu item details', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-1', mockRestaurant);
      });

      const cartItems = result.current.getCartItems();
      expect(cartItems).toHaveLength(1);
      expect(cartItems[0]).toEqual({
        ...mockRestaurant.menu[0].items[0],
        quantity: 2,
      });
    });
  });

  describe('Restaurant Operations', () => {
    it('should set current restaurant', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.setCurrentRestaurant(mockRestaurant);
      });

      expect(result.current.currentRestaurant).toBe(mockRestaurant);
    });

    it('should start new order', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.startNewOrder(mockRestaurant);
      });

      expect(result.current.cart).toEqual({});
      expect(result.current.currentRestaurant).toBe(mockRestaurant);
    });
  });

  describe('Edge Cases', () => {
    it('should handle adding item without restaurant', () => {
      const { result } = renderHook(() => useCartStore());

      expect(() => {
        act(() => {
          result.current.addToCart('item-1');
        });
      }).toThrow('Restaurant parameter is required for addToCart');
    });

    it('should handle different restaurants by clearing cart', () => {
      const { result } = renderHook(() => useCartStore());
      const differentRestaurant = {
        ...mockRestaurant,
        id: 2,
        name: 'Different Restaurant',
      };

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.addToCart('item-2', differentRestaurant);
      });

      expect(result.current.cart).toEqual({ 'item-2': 1 });
      expect(result.current.currentRestaurant).toBe(differentRestaurant);
    });

    it('should remove item when setting quantity to zero', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.setItemQuantity('item-1', 0);
      });

      expect(result.current.cart).toEqual({});
    });

    it('should remove item when setting quantity to negative', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart('item-1', mockRestaurant);
        result.current.setItemQuantity('item-1', -1);
      });

      expect(result.current.cart).toEqual({});
    });
  });
});
