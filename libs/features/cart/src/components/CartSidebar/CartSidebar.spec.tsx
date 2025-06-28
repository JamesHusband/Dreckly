import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

jest.mock('@dreckly/utils', () => ({
  formatPrice: (value: number) => `£${value.toFixed(2)}`,
}));

const mockRestaurant = {
  id: 1,
  name: 'Test Restaurant',
  minOrder: 10,
  cuisine: 'Italian',
  rating: 4.5,
  deliveryTime: '25-40 minutes',
  deliveryFee: 2.5,
  minimumOrder: 10,
  image: '/test-image.jpg',
  featured: true,
  description: 'A test restaurant',
  address: '123 Test Street',
  reviewCount: 100,
  menu: [],
};

describe('CartSidebar', () => {
  const defaultProps = {
    subtotal: 15.0,
    deliveryFee: 2.5,
    serviceFee: 1.5,
    total: 19.0,
    currentRestaurant: mockRestaurant,
  };

  it('should render the cart sidebar with order summary', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('should display all pricing information correctly', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('£15.00')).toBeInTheDocument();

    expect(screen.getByText('Delivery fee')).toBeInTheDocument();
    expect(screen.getByText('£2.50')).toBeInTheDocument();

    expect(screen.getByText('Service fee')).toBeInTheDocument();
    expect(screen.getByText('£1.50')).toBeInTheDocument();

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('£19.00')).toBeInTheDocument();
  });

  it('should show proceed to checkout button when subtotal meets minimum order', () => {
    render(<CartSidebar {...defaultProps} />);

    const checkoutButton = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).not.toBeDisabled();
  });

  it('should show minimum order message when subtotal is below minimum', () => {
    const propsBelowMinimum = {
      ...defaultProps,
      subtotal: 5.0,
      total: 9.0,
    };

    render(<CartSidebar {...propsBelowMinimum} />);

    const button = screen.getByRole('button', {
      name: /minimum order £10\.00/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should display estimated delivery time', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(
      screen.getByText('Estimated delivery: 25-40 minutes')
    ).toBeInTheDocument();
  });

  it('should display terms and conditions text', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(
      screen.getByText(
        /By placing your order, you agree to our Terms of Service and Privacy Policy/
      )
    ).toBeInTheDocument();
  });

  it('should handle zero values correctly', () => {
    const zeroProps = {
      ...defaultProps,
      subtotal: 0,
      deliveryFee: 0,
      serviceFee: 0,
      total: 0,
    };

    render(<CartSidebar {...zeroProps} />);

    const zeroElements = screen.getAllByText('£0.00');
    expect(zeroElements).toHaveLength(4);

    expect(
      screen.getByRole('button', { name: /minimum order £10\.00/i })
    ).toBeInTheDocument();
  });

  it('should handle decimal values correctly', () => {
    const decimalProps = {
      ...defaultProps,
      subtotal: 12.99,
      deliveryFee: 1.99,
      serviceFee: 0.99,
      total: 15.97,
    };

    render(<CartSidebar {...decimalProps} />);

    expect(screen.getByText('£12.99')).toBeInTheDocument();
    expect(screen.getByText('£1.99')).toBeInTheDocument();
    expect(screen.getByText('£0.99')).toBeInTheDocument();
    expect(screen.getByText('£15.97')).toBeInTheDocument();
  });

  it('should handle restaurant with zero minimum order', () => {
    const restaurantWithZeroMin = {
      ...mockRestaurant,
      minimumOrder: 0,
    };

    const propsWithZeroMin = {
      ...defaultProps,
      currentRestaurant: restaurantWithZeroMin,
      subtotal: 5.0,
      total: 9.0,
    };

    render(<CartSidebar {...propsWithZeroMin} />);

    const checkoutButton = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).not.toBeDisabled();
  });
});
