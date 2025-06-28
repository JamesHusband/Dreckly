import { getCartItems } from './getCartItems.js';
import { CartState, MenuItem } from '@dreckly/types';

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
  price: 14.99,
  image: '/pasta.jpg',
};

const mockState: CartState = {
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
  setCurrentRestaurant: () => undefined,
  setMenuItems: () => undefined,
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
      menuItems: [mockMenuItem1, mockMenuItem2],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: 2,
    });
    expect(result[1]).toEqual({
      item: mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should filter out items not found in menuItems', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1, 'item-3': 3 },
      menuItems: [mockMenuItem1],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: 2,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle cart with only non-existent items', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-3': 2, 'item-4': 1 },
      menuItems: [mockMenuItem1, mockMenuItem2],
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
      menuItems: [],
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
      menuItems: [mockMenuItem1, mockMenuItem2],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: 0,
    });
    expect(result[1]).toEqual({
      item: mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle cart with negative quantities', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': -1, 'item-2': 1 },
      menuItems: [mockMenuItem1, mockMenuItem2],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: -1,
    });
    expect(result[1]).toEqual({
      item: mockMenuItem2,
      quantity: 1,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle large quantities', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 999 },
      menuItems: [mockMenuItem1],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: 999,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should preserve menu item object references', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 1 },
      menuItems: [mockMenuItem1],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result[0].item).toBe(mockMenuItem1);
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('should handle mixed valid and invalid cart items', () => {
    const mockGet = jest.fn(() => ({
      ...mockState,
      cart: { 'item-1': 2, 'invalid-item': 1, 'item-2': 3 },
      menuItems: [mockMenuItem1, mockMenuItem2],
    }));
    const getCartItemsAction = getCartItems(mockGet);

    const result = getCartItemsAction();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      item: mockMenuItem1,
      quantity: 2,
    });
    expect(result[1]).toEqual({
      item: mockMenuItem2,
      quantity: 3,
    });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });
});
