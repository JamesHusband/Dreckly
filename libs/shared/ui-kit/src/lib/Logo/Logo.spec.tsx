import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('should render with default grey text color', () => {
    render(<Logo />);
    expect(screen.getByText('Dreckly')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('should render with grey text color explicitly', () => {
    render(<Logo textColor="grey" />);
    const logoText = screen.getByText('Dreckly');
    expect(logoText).toHaveClass('text-gray-900');
  });

  it('should render with white text color', () => {
    render(<Logo textColor="white" />);
    const logoText = screen.getByText('Dreckly');
    expect(logoText).toHaveClass('text-white');
  });

  it('should render as a link to home page', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should have proper link styling', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'flex',
      'items-center',
      'space-x-2',
      'hover:opacity-80',
      'transition-opacity'
    );
  });

  it('should have proper logo icon styling', () => {
    render(<Logo />);
    const logoIcon = screen.getByText('D');
    expect(logoIcon).toHaveClass(
      'bg-orange-500',
      'text-white',
      'p-2',
      'rounded-lg',
      'font-bold',
      'text-xl'
    );
  });

  it('should have proper logo text styling', () => {
    render(<Logo />);
    const logoText = screen.getByText('Dreckly');
    expect(logoText).toHaveClass('text-2xl', 'font-bold');
  });

  it('should render both logo icon and text', () => {
    render(<Logo />);
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('Dreckly')).toBeInTheDocument();
  });
});
