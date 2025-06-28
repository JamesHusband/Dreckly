import { addToCart } from './addToCart.js';
import { CartState, Restaurant } from '@dreckly/types';

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

const mockState: CartState = {
  cart: {},
  currentRestaurant: null,
};

describe('addToCart', () => {
  let mockSet: jest.Mock;

  beforeEach(() => {
    mockSet = jest.fn();
  });

  it('should throw error when restaurant is not provided', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = { ...mockState, cart: {} };

    addToCartAction('item-1');

    expect(mockSet).toHaveBeenCalledWith(expect.any(Function));

    const setFunction = mockSet.mock.calls[0][0];

    expect(() => {
      setFunction(initialState);
    }).toThrow('Restaurant parameter is required for addToCart');
  });

  it('should add item to empty cart with restaurant', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = { ...mockState, cart: {} };

    addToCartAction('item-1', mockRestaurant);

    expect(mockSet).toHaveBeenCalledWith(expect.any(Function));

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-1': 1 });
    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should increment quantity when adding same item to existing cart', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = {
      ...mockState,
      cart: { 'item-1': 2 },
      currentRestaurant: mockRestaurant,
    };

    addToCartAction('item-1', mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-1': 3 });
    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should clear cart and start fresh when adding item from different restaurant', () => {
    const addToCartAction = addToCart(mockSet);
    const differentRestaurant = {
      ...mockRestaurant,
      id: 2,
      name: 'Different Restaurant',
    };
    const initialState = {
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1 },
      currentRestaurant: mockRestaurant,
    };

    addToCartAction('item-3', differentRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-3': 1 });
    expect(newState.currentRestaurant).toBe(differentRestaurant);
  });

  it('should clear cart and start fresh when cart has items but no current restaurant', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = {
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1 },
      currentRestaurant: null,
    };

    addToCartAction('item-3', mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-3': 1 });
    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should add new item to existing cart with same restaurant', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = {
      ...mockState,
      cart: { 'item-1': 2 },
      currentRestaurant: mockRestaurant,
    };

    addToCartAction('item-2', mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-1': 2, 'item-2': 1 });
    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should handle restaurant with empty menu', () => {
    const addToCartAction = addToCart(mockSet);
    const restaurantWithEmptyMenu = {
      ...mockRestaurant,
      menu: [],
    };

    const initialState = { ...mockState, cart: {} };

    addToCartAction('item-1', restaurantWithEmptyMenu);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-1': 1 });
    expect(newState.currentRestaurant).toBe(restaurantWithEmptyMenu);
  });

  it('should preserve existing cart items when adding to same restaurant', () => {
    const addToCartAction = addToCart(mockSet);
    const initialState = {
      ...mockState,
      cart: { 'item-1': 2, 'item-2': 1 },
      currentRestaurant: mockRestaurant,
    };

    addToCartAction('item-1', mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.cart).toEqual({ 'item-1': 3, 'item-2': 1 });
    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });
});
