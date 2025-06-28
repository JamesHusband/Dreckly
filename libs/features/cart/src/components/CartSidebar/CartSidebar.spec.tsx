import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

jest.mock('@dreckly/utils', () => ({
  formatPrice: (value: number) => `£${value.toFixed(2)}`,
}));

const mockRestaurant = {
  id: 1,
  name: 'Test Restaurant',
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

describe('CartSidebar', () => {
  const defaultProps = {
    restaurant: mockRestaurant,
    cart: { 'item-1': 2 },
    onAddToCart: jest.fn(),
    onRemoveFromCart: jest.fn(),
  };

  it('should render the cart sidebar with order summary', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('should display all pricing information correctly', () => {
    render(<CartSidebar {...defaultProps} />);

    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('Delivery fee')).toBeInTheDocument();
    expect(screen.getByText('Service fee')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
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
      cart: { 'item-1': 1 }, // Lower quantity to reduce subtotal
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

  it('should handle empty cart correctly', () => {
    const emptyCartProps = {
      ...defaultProps,
      cart: {},
    };

    render(<CartSidebar {...emptyCartProps} />);

    expect(screen.getByText('£0.00')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /minimum order £10\.00/i })
    ).toBeInTheDocument();
  });

  it('should handle restaurant with zero minimum order', () => {
    const restaurantWithZeroMin = {
      ...mockRestaurant,
      minimumOrder: 0,
    };

    const propsWithZeroMin = {
      ...defaultProps,
      restaurant: restaurantWithZeroMin,
      cart: { 'item-1': 1 }, // Low quantity
    };

    render(<CartSidebar {...propsWithZeroMin} />);

    const checkoutButton = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).not.toBeDisabled();
  });
});
