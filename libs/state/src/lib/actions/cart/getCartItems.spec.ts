import { getCartItems } from './getCartItems.js';
import { CartState, MenuItem, Restaurant } from '@dreckly/types';

const mockMenuItem1: MenuItem = {
  id: 'item-1',
  name: 'Pizza Margherita',
  description: 'Classic tomato and mozzarella',
  price: 12.99,
  image: '/pizza.jpg',
};

const mockMenuItem2: MenuItem = {
  id: 'item-2',
  name: 'Pasta Carbonara',
  description: 'Creamy pasta with bacon',
  price: 10.99,
  image: '/pasta.jpg',
};

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Test Restaurant',
  cuisine: 'Italian',
  rating: 4.5,
  deliveryTime: '30-45 min',
  deliveryFee: 2.99,
  minimumOrder: 10,
  image: '/test.jpg',
  featured: true,
  description: 'Test description',
  address: '123 Test St',
  reviewCount: 100,
  menu: [
    {
      name: 'Main Dishes',
      items: [mockMenuItem1, mockMenuItem2],
    },
  ],
};

const mockState: CartState = {
  cart: {},
  currentRestaurant: null,
};

describe('getCartItems', () => {
  it('should return empty array when cart is empty', () => {
    const mockGet = jest.fn(() => ({ ...mockState, cart: {} }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toEqual([]);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should return cart items with menu item details', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: 2,
    });
    expect(result[1]).toEqual({
      ...mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should filter out items not found in menuItems', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1, 'item-3': 3 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: 2,
    });
    expect(result[1]).toEqual({
      ...mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle cart with only non-existent items', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-3': 2, 'item-4': 1 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toEqual([]);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle empty menuItems array', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1 },
      currentRestaurant: { ...mockRestaurant, menu: [] },
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toEqual([]);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle cart with zero quantities', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 0, 'item-2': 1 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: 0,
    });
    expect(result[1]).toEqual({
      ...mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle cart with negative quantities', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': -1, 'item-2': 1 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: -1,
    });
    expect(result[1]).toEqual({
      ...mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle large quantities', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 999 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: 999,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should preserve menu item object references', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 1 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result[0].id).toBe(mockMenuItem1.id);
    expect(result[0].name).toBe(mockMenuItem1.name);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle mixed valid and invalid cart items', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'invalid-item': 1, 'item-2': 3 },
      currentRestaurant: mockRestaurant,
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      ...mockMenuItem1,
      quantity: 2,
    });
    expect(result[1]).toEqual({
      ...mockMenuItem2,
      quantity: 3,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });
});
