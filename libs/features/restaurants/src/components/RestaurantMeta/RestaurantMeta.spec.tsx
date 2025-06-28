import { render, screen } from '@testing-library/react';
import { RestaurantMeta } from './RestaurantMeta';

const defaultProps = {
  name: 'Test Restaurant',
  cuisine: 'Italian',
  description: 'Delicious Italian food',
  rating: 4.5,
  reviewCount: 123,
  deliveryTime: '20-30 min',
  deliveryFee: 2.99,
  address: '123 Test Street',
};

describe('RestaurantMeta', () => {
  it('should render with default card variant', () => {
    render(<RestaurantMeta {...defaultProps} />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getByText('£2.99')).toBeInTheDocument();
  });

  it('should render with header variant', () => {
    render(<RestaurantMeta {...defaultProps} variant="header" />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Delicious Italian food')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(123 reviews)')).toBeInTheDocument();
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getByText('£2.99 delivery')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
  });

  it('should render without optional props in card variant', () => {
    const minimalProps = {
      name: 'Test Restaurant',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
    };
    render(<RestaurantMeta {...minimalProps} />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getByText('£2.99')).toBeInTheDocument();
  });

  it('should render without optional props in header variant', () => {
    const minimalProps = {
      name: 'Test Restaurant',
      rating: 4.5,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
    };
    render(<RestaurantMeta {...minimalProps} variant="header" />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getByText('£2.99 delivery')).toBeInTheDocument();
  });

  it('should render restaurant name with proper styling in header variant', () => {
    render(<RestaurantMeta {...defaultProps} variant="header" />);
    const name = screen.getByText('Test Restaurant');
    expect(name).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold');
  });

  it('should render restaurant name with proper styling in card variant', () => {
    render(<RestaurantMeta {...defaultProps} />);
    const name = screen.getByText('Test Restaurant');
    expect(name).toHaveClass('text-base', 'font-semibold');
  });

  it('should render cuisine with proper styling in card variant', () => {
    render(<RestaurantMeta {...defaultProps} />);
    const cuisine = screen.getByText('Italian');
    expect(cuisine).toHaveClass('text-sm', 'text-gray-600');
  });

  it('should render rating with star icon', () => {
    render(<RestaurantMeta {...defaultProps} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should render delivery time with clock icon', () => {
    render(<RestaurantMeta {...defaultProps} />);
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
  });

  it('should render delivery fee with truck icon', () => {
    render(<RestaurantMeta {...defaultProps} />);
    expect(screen.getByText('£2.99')).toBeInTheDocument();
  });
});
