import { setCurrentRestaurant } from './setCurrentRestaurant.js';
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

describe('setCurrentRestaurant', () => {
  let mockSet: jest.Mock;

  beforeEach(() => {
    mockSet = jest.fn();
  });

  it('should set current restaurant', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const initialState = {
      ...mockState,
      currentRestaurant: null,
    };

    setCurrentRestaurantAction(mockRestaurant);

    expect(mockSet).toHaveBeenCalledWith(expect.any(Function));

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should update existing restaurant', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const differentRestaurant = {
      ...mockRestaurant,
      id: 2,
      name: 'Different Restaurant',
    };
    const initialState = {
      ...mockState,
      currentRestaurant: mockRestaurant,
    };

    setCurrentRestaurantAction(differentRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(differentRestaurant);
  });

  it('should handle restaurant with empty menu', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const restaurantWithEmptyMenu = {
      ...mockRestaurant,
      menu: [],
    };
    const initialState = {
      ...mockState,
      currentRestaurant: null,
    };

    setCurrentRestaurantAction(restaurantWithEmptyMenu);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithEmptyMenu);
  });

  it('should handle restaurant with multiple menu categories', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const restaurantWithMultipleCategories = {
      ...mockRestaurant,
      menu: [
        {
          name: 'Appetizers',
          items: [
            {
              id: 'app-1',
              name: 'Bruschetta',
              description: 'Toasted bread with tomatoes',
              price: 6.99,
              image: '/bruschetta.jpg',
            },
          ],
        },
        {
          name: 'Main Dishes',
          items: [
            {
              id: 'main-1',
              name: 'Pizza',
              description: 'Classic pizza',
              price: 12.99,
              image: '/pizza.jpg',
            },
          ],
        },
        {
          name: 'Desserts',
          items: [
            {
              id: 'dessert-1',
              name: 'Tiramisu',
              description: 'Classic Italian dessert',
              price: 8.99,
              image: '/tiramisu.jpg',
            },
          ],
        },
      ],
    };
    const initialState = {
      ...mockState,
      currentRestaurant: null,
    };

    setCurrentRestaurantAction(restaurantWithMultipleCategories);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithMultipleCategories);
  });

  it('should handle restaurant with categories containing no items', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const restaurantWithEmptyCategories = {
      ...mockRestaurant,
      menu: [
        {
          name: 'Appetizers',
          items: [],
        },
        {
          name: 'Main Dishes',
          items: [
            {
              id: 'main-1',
              name: 'Pizza',
              description: 'Classic pizza',
              price: 12.99,
              image: '/pizza.jpg',
            },
          ],
        },
        {
          name: 'Desserts',
          items: [],
        },
      ],
    };
    const initialState = {
      ...mockState,
      currentRestaurant: null,
    };

    setCurrentRestaurantAction(restaurantWithEmptyCategories);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithEmptyCategories);
  });

  it('should preserve restaurant object reference', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const initialState = {
      ...mockState,
      currentRestaurant: null,
    };

    setCurrentRestaurantAction(mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });
});
