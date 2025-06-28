import { render, screen } from '@testing-library/react';
import { RestaurantCard } from '.';

describe('RestaurantCard', () => {
  it('should render', () => {
    const restaurant = {
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
    };
    render(<RestaurantCard {...restaurant} />);
    expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
    expect(screen.getByText('Cuisine 1')).toBeInTheDocument();
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getByText('£2.99')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});
