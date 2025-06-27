import { render, screen } from '@testing-library/react';
import { FeaturedRestaurants } from './';
import { getRestaurants } from '@dreckly/data-access';

jest.mock('@dreckly/data-access', () => ({
  getRestaurants: jest.fn(),
}));

jest.mock('../RestaurantCard', () => ({
  RestaurantCard: jest
    .fn()
    .mockImplementation(() => <div>Mocked Restaurant Card</div>),
}));

describe('FeaturedRestaurants', () => {
  const mockRestaurants = [
    {
      id: 1,
      name: 'Restaurant 1',
      cuisine: 'Cuisine 1',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
      image: 'https://via.placeholder.com/150',
      featured: true,
      minOrder: 10,
      minimumOrder: 10,
      description: 'A great restaurant',
      address: '123 Main St',
      menu: [],
      reviewCount: 42,
    },
    {
      id: 2,
      name: 'Restaurant 2',
      cuisine: 'Cuisine 2',
      rating: 4.2,
      deliveryTime: '25-35 min',
      deliveryFee: 3.49,
      image: 'https://via.placeholder.com/150',
      featured: false,
      minOrder: 15,
      minimumOrder: 15,
      description: 'Another great restaurant',
      address: '456 Oak St',
      menu: [],
      reviewCount: 38,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);
  });

  it('should render', async () => {
    render(await FeaturedRestaurants());
    expect(screen.getByText('Featured restaurants')).toBeInTheDocument();
  });

  it('should only render featured restaurants', async () => {
    render(await FeaturedRestaurants());
    expect(screen.getAllByText('Mocked Restaurant Card')).toHaveLength(1);
  });
});
