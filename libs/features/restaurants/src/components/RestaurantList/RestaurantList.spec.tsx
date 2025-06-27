import { render, screen, waitFor } from '@testing-library/react';
import { RestaurantList } from './';
import { CuisineProvider } from '@dreckly/feature-home';

jest.mock('@dreckly/data-access', () => ({
  getRestaurants: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Restaurant 1',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
      image: 'https://via.placeholder.com/150',
      featured: true,
      minOrder: 10,
      minimumOrder: 10,
      description: 'Test restaurant 1',
      address: 'Test address 1',
      reviewCount: 100,
      menu: [],
    },
    {
      id: 2,
      name: 'Restaurant 2',
      cuisine: 'Chinese',
      rating: 4.2,
      deliveryTime: '25-35 min',
      deliveryFee: 3.49,
      image: 'https://via.placeholder.com/150',
      featured: false,
      minOrder: 15,
      minimumOrder: 15,
      description: 'Test restaurant 2',
      address: 'Test address 2',
      reviewCount: 85,
      menu: [],
    },
    {
      id: 3,
      name: 'Restaurant 3',
      cuisine: 'Italian',
      rating: 4.0,
      deliveryTime: '30-40 min',
      deliveryFee: 1.99,
      image: 'https://via.placeholder.com/150',
      featured: false,
      minOrder: 12,
      minimumOrder: 12,
      description: 'Test restaurant 3',
      address: 'Test address 3',
      reviewCount: 120,
      menu: [],
    },
  ]),
}));

jest.mock('@dreckly/ui-kit', () => ({
  RestaurantCard: jest.fn().mockImplementation(({ name }) => (
    <div>
      <h3>{name}</h3>
    </div>
  )),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CuisineProvider>{component}</CuisineProvider>);
};

describe('RestaurantList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the restaurant list with all restaurants initially', async () => {
    renderWithProvider(<RestaurantList />);

    await waitFor(() => {
      expect(screen.getByText('All restaurants')).toBeInTheDocument();
    });

    expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
    expect(screen.getByText('Restaurant 2')).toBeInTheDocument();
    expect(screen.getByText('Restaurant 3')).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    renderWithProvider(<RestaurantList />);
    expect(screen.getByText('Loading restaurants...')).toBeInTheDocument();
  });

  it('should not show clear filter button when no cuisine is selected', async () => {
    renderWithProvider(<RestaurantList />);

    await waitFor(() => {
      expect(screen.getByText('All restaurants')).toBeInTheDocument();
    });

    expect(screen.queryByText('Clear filter')).not.toBeInTheDocument();
  });
});
