import { render, screen, fireEvent } from '@testing-library/react';
import { CuisineCard } from './CuisineCard';

const MockIcon = ({ className }: { className?: string }) => (
  <div data-testid="mock-icon" className={className}>
    ICON
  </div>
);

describe('CuisineCard', () => {
  it('should render with name and icon', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should render as a button', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Italian');
  });

  it('should have proper styling classes', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-white',
      'hover:shadow-md',
      'transition-shadow',
      'cursor-pointer',
      'text-center',
      'p-4',
      'h-24',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'rounded-lg',
      'border'
    );
  });

  it('should render icon with proper styling', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveClass('h-8', 'w-8', 'text-gray-700');
  });

  it('should render name with proper styling', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    const nameElement = screen.getByText('Italian');
    expect(nameElement).toHaveClass('text-sm', 'font-medium', 'leading-tight');
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <CuisineCard
        name="Italian"
        icon="🍕"
        iconComponent={MockIcon}
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply selected styling when isSelected is true', () => {
    render(
      <CuisineCard
        name="Italian"
        icon="🍕"
        iconComponent={MockIcon}
        isSelected={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
  });

  it('should not apply selected styling when isSelected is false', () => {
    render(
      <CuisineCard
        name="Italian"
        icon="🍕"
        iconComponent={MockIcon}
        isSelected={false}
      />
    );

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
  });

  it('should not apply selected styling when isSelected is not provided', () => {
    render(<CuisineCard name="Italian" icon="🍕" iconComponent={MockIcon} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
  });
});
