import {
  CartBaseState,
  CartActions,
  RestaurantActions,
  CartStore,
} from './types.js';
import { Restaurant } from '@dreckly/types';

describe('State Types', () => {
  describe('CartBaseState', () => {
    it('should have the correct structure', () => {
      const mockState: CartBaseState = {
        cart: {},
        currentRestaurant: null,
        menuItems: [],
      };

      expect(mockState).toHaveProperty('cart');
      expect(mockState).toHaveProperty('currentRestaurant');
      expect(mockState).toHaveProperty('menuItems');
      expect(typeof mockState.cart).toBe('object');
      expect(Array.isArray(mockState.menuItems)).toBe(true);
    });

    it('should allow cart with item quantities', () => {
      const mockState: CartBaseState = {
        cart: { 'item-1': 2, 'item-2': 1 },
        currentRestaurant: null,
        menuItems: [],
      };

      expect(mockState.cart['item-1']).toBe(2);
      expect(mockState.cart['item-2']).toBe(1);
    });

    it('should allow restaurant assignment', () => {
      const mockRestaurant: Restaurant = {
        id: 1,
        name: 'Test Restaurant',
        minOrder: 10,
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
        menu: [],
      };

      const mockState: CartBaseState = {
        cart: {},
        currentRestaurant: mockRestaurant,
        menuItems: [],
      };

      expect(mockState.currentRestaurant).toBe(mockRestaurant);
    });
  });

  describe('CartActions', () => {
    it('should define all required cart action methods', () => {
      const mockActions: CartActions = {
        hasItems: () => true,
        itemCount: () => 5,
        totalItems: () => 10,
        addToCart: () => undefined,
        removeFromCart: () => undefined,
        clearCart: () => undefined,
        setItemQuantity: () => undefined,
        getItemQuantity: () => 2,
        getCartItems: () => [],
        startNewOrder: () => undefined,
      };

      expect(typeof mockActions.hasItems).toBe('function');
      expect(typeof mockActions.itemCount).toBe('function');
      expect(typeof mockActions.totalItems).toBe('function');
      expect(typeof mockActions.addToCart).toBe('function');
      expect(typeof mockActions.removeFromCart).toBe('function');
      expect(typeof mockActions.clearCart).toBe('function');
      expect(typeof mockActions.setItemQuantity).toBe('function');
      expect(typeof mockActions.getItemQuantity).toBe('function');
      expect(typeof mockActions.getCartItems).toBe('function');
      expect(typeof mockActions.startNewOrder).toBe('function');
    });

    it('should allow cart actions to return correct types', () => {
      const mockActions: CartActions = {
        hasItems: () => false,
        itemCount: () => 0,
        totalItems: () => 0,
        addToCart: () => undefined,
        removeFromCart: () => undefined,
        clearCart: () => undefined,
        setItemQuantity: () => undefined,
        getItemQuantity: () => 0,
        getCartItems: () => [],
        startNewOrder: () => undefined,
      };

      expect(mockActions.hasItems()).toBe(false);
      expect(mockActions.itemCount()).toBe(0);
      expect(mockActions.totalItems()).toBe(0);
      expect(mockActions.getItemQuantity('test')).toBe(0);
      expect(mockActions.getCartItems()).toEqual([]);
    });
  });

  describe('RestaurantActions', () => {
    it('should define all required restaurant action methods', () => {
      const mockActions: RestaurantActions = {
        setCurrentRestaurant: () => undefined,
        setMenuItems: () => undefined,
      };

      expect(typeof mockActions.setCurrentRestaurant).toBe('function');
      expect(typeof mockActions.setMenuItems).toBe('function');
    });
  });

  describe('CartStore', () => {
    it('should combine all interfaces correctly', () => {
      const mockStore: CartStore = {
        cart: {},
        currentRestaurant: null,
        menuItems: [],
        hasItems: () => false,
        itemCount: () => 0,
        totalItems: () => 0,
        addToCart: () => undefined,
        removeFromCart: () => undefined,
        clearCart: () => undefined,
        setItemQuantity: () => undefined,
        getItemQuantity: () => 0,
        getCartItems: () => [],
        startNewOrder: () => undefined,
        setCurrentRestaurant: () => undefined,
        setMenuItems: () => undefined,
      };

      expect(mockStore).toHaveProperty('cart');
      expect(mockStore).toHaveProperty('currentRestaurant');
      expect(mockStore).toHaveProperty('menuItems');

      expect(typeof mockStore.hasItems).toBe('function');
      expect(typeof mockStore.addToCart).toBe('function');
      expect(typeof mockStore.getCartItems).toBe('function');

      expect(typeof mockStore.setCurrentRestaurant).toBe('function');
      expect(typeof mockStore.setMenuItems).toBe('function');
    });
  });
});
