import { render, screen } from '@testing-library/react';
import { EmptyCart } from './EmptyCart';

describe('EmptyCart', () => {
  it('should render the empty cart message', () => {
    render(<EmptyCart />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
});
