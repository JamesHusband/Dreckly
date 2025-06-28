import { MinimumOrder } from './MinimumOrder';
import { render, screen } from '@testing-library/react';

describe('MinimumOrder', () => {
  it('should render the minimum order', () => {
    render(<MinimumOrder minOrder={10} />);
    expect(screen.getByText('Minimum order: £10.00')).toBeInTheDocument();
  });
});
