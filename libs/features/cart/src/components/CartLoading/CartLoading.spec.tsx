import { render, screen } from '@testing-library/react';
import { CartLoading } from './CartLoading';

describe('CartLoading', () => {
  it('should render loading component', () => {
    render(<CartLoading />);
    expect(screen.getByText('Loading menu...')).toBeInTheDocument();
  });

  it('should have proper text styling', () => {
    render(<CartLoading />);
    const text = screen.getByText('Loading menu...');
    expect(text).toHaveClass('text-gray-600');
  });

  it('should render with proper structure', () => {
    render(<CartLoading />);

    expect(screen.getByText('Loading menu...')).toBeInTheDocument();

    expect(screen.getByText('Loading menu...')).toBeInTheDocument();
  });
});
