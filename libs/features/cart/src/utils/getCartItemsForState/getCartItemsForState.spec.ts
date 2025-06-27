import { getCartItemsForState } from './getCartItemsForState';
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
      ],
    },
  ],
};

describe('getCartItemsForState', () => {
  it('should return cart items in state format', () => {
    const cart: Cart = { 'item-1': 2 };
    const menuItems = mockRestaurant.menu.flatMap((category) => category.items);

    const result = getCartItemsForState(cart, menuItems);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      item: mockRestaurant.menu[0].items[0],
      quantity: 2,
    });
  });
});
