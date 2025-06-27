import { render, screen } from '@testing-library/react';
import { Copyright } from './Copyright';

describe('Copyright', () => {
  it('should render copyright text', () => {
    render(<Copyright />);
    expect(
      screen.getByText('© 2024 Dreckly. All rights reserved.')
    ).toBeInTheDocument();
  });

  it('should have proper text styling', () => {
    render(<Copyright />);
    const text = screen.getByText('© 2024 Dreckly. All rights reserved.');
    expect(text).toHaveClass('text-gray-400', 'text-sm');
  });

  it('should render with proper structure', () => {
    render(<Copyright />);

    expect(
      screen.getByText('© 2024 Dreckly. All rights reserved.')
    ).toBeInTheDocument();

    expect(
      screen.getByText('© 2024 Dreckly. All rights reserved.')
    ).toBeInTheDocument();
  });
});
