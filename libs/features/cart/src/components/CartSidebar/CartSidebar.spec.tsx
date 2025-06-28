import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

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

const mockCart = {
  'item-1': 2,
  'item-2': 1,
};

const mockOnAddToCart = jest.fn();
const mockOnRemoveFromCart = jest.fn();

describe('CartSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render order summary with correct totals', () => {
    render(
      <CartSidebar
        restaurant={mockRestaurant}
        cart={mockCart}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('Delivery fee')).toBeInTheDocument();
    expect(screen.getByText('Service fee')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('should display minimum order message when subtotal is below minimum', () => {
    const smallCart = { 'item-1': 1 };

    render(
      <CartSidebar
        restaurant={mockRestaurant}
        cart={smallCart}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByText(/Minimum order/)).toBeInTheDocument();
  });

  it('should not display minimum order message when subtotal meets minimum', () => {
    const largeCart = { 'item-1': 3 }; // 3 * 5.99 = 17.97 > 10 minimum

    render(
      <CartSidebar
        restaurant={mockRestaurant}
        cart={largeCart}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.queryByText(/Minimum order/)).not.toBeInTheDocument();
  });

  it('should display estimated delivery time', () => {
    render(
      <CartSidebar
        restaurant={mockRestaurant}
        cart={mockCart}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(
      screen.getByText('Estimated delivery: 25-40 minutes')
    ).toBeInTheDocument();
  });

  it('should display terms and conditions text', () => {
    render(
      <CartSidebar
        restaurant={mockRestaurant}
        cart={mockCart}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(
      screen.getByText(
        /By placing your order, you agree to our Terms of Service and Privacy Policy/
      )
    ).toBeInTheDocument();
  });

  it('should handle empty cart correctly', () => {
    const emptyCartProps = {
      restaurant: mockRestaurant,
      cart: {},
      onAddToCart: mockOnAddToCart,
      onRemoveFromCart: mockOnRemoveFromCart,
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
      restaurant: restaurantWithZeroMin,
      cart: { 'item-1': 1 }, // Low quantity
      onAddToCart: mockOnAddToCart,
      onRemoveFromCart: mockOnRemoveFromCart,
    };

    render(<CartSidebar {...propsWithZeroMin} />);

    const checkoutButton = screen.getByRole('button', {
      name: /proceed to checkout/i,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).not.toBeDisabled();
  });
});
