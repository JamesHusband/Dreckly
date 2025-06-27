import { BackButton } from './BackButton';
import { render, screen } from '@testing-library/react';

describe('BackButton', () => {
  it('should render the back button', () => {
    render(<BackButton />);
    expect(screen.getByText('Back to restaurants')).toBeInTheDocument();
  });
});
