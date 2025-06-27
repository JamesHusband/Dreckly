import { setCurrentRestaurant } from './setCurrentRestaurant.js';
import { CartState, Restaurant } from '@dreckly/types';

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

describe('setCurrentRestaurant', () => {
  let mockSet: jest.Mock;

  beforeEach(() => {
    mockSet = jest.fn();
  });

  it('should set current restaurant and flatten menu items', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const initialState = {
      ...mockState,
      currentRestaurant: null,
      menuItems: [],
    };

    setCurrentRestaurantAction(mockRestaurant);

    expect(mockSet).toHaveBeenCalledWith(expect.any(Function));

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(mockRestaurant);
    expect(newState.menuItems).toHaveLength(2);
    expect(newState.menuItems[0].id).toBe('item-1');
    expect(newState.menuItems[1].id).toBe('item-2');
  });

  it('should update existing restaurant and menu items', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const differentRestaurant = {
      ...mockRestaurant,
      id: 2,
      name: 'Different Restaurant',
    };
    const initialState = {
      ...mockState,
      currentRestaurant: mockRestaurant,
      menuItems: mockRestaurant.menu.flatMap((category) => category.items),
    };

    setCurrentRestaurantAction(differentRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(differentRestaurant);
    expect(newState.menuItems).toHaveLength(2);
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
      menuItems: [],
    };

    setCurrentRestaurantAction(restaurantWithEmptyMenu);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithEmptyMenu);
    expect(newState.menuItems).toEqual([]);
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
      menuItems: [],
    };

    setCurrentRestaurantAction(restaurantWithMultipleCategories);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithMultipleCategories);
    expect(newState.menuItems).toHaveLength(3);
    expect(newState.menuItems[0].id).toBe('app-1');
    expect(newState.menuItems[1].id).toBe('main-1');
    expect(newState.menuItems[2].id).toBe('dessert-1');
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
      menuItems: [],
    };

    setCurrentRestaurantAction(restaurantWithEmptyCategories);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(restaurantWithEmptyCategories);
    expect(newState.menuItems).toHaveLength(1);
    expect(newState.menuItems[0].id).toBe('main-1');
  });

  it('should preserve restaurant object reference', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const initialState = {
      ...mockState,
      currentRestaurant: null,
      menuItems: [],
    };

    setCurrentRestaurantAction(mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.currentRestaurant).toBe(mockRestaurant);
  });

  it('should preserve menu item object references', () => {
    const setCurrentRestaurantAction = setCurrentRestaurant(mockSet);
    const initialState = {
      ...mockState,
      currentRestaurant: null,
      menuItems: [],
    };

    setCurrentRestaurantAction(mockRestaurant);

    const setFunction = mockSet.mock.calls[0][0];
    const newState = setFunction(initialState);

    expect(newState.menuItems[0]).toBe(mockRestaurant.menu[0].items[0]);
    expect(newState.menuItems[1]).toBe(mockRestaurant.menu[0].items[1]);
  });
});
