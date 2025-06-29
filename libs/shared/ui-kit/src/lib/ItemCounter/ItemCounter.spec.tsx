import { render, screen, fireEvent } from '@testing-library/react';
import { ItemCounter } from './ItemCounter';

jest.mock('@dreckly/cart', () => ({
  useCart: jest.fn(),
}));

const mockUseCart = require('@dreckly/cart').useCart;

describe('ItemCounter', () => {
  const mockCart = {
    getItemQuantity: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with cart context and quantity > 0', () => {
    mockUseCart.mockReturnValue({ cart: mockCart });
    mockCart.getItemQuantity.mockReturnValue(2);

    render(<ItemCounter id="item-1" />);

    expect(
      screen.getByRole('button', { name: 'Remove item' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render with cart context and quantity = 0', () => {
    mockUseCart.mockReturnValue({ cart: mockCart });
    mockCart.getItemQuantity.mockReturnValue(0);

    render(<ItemCounter id="item-1" />);

    expect(
      screen.queryByRole('button', { name: 'Remove item' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('should render with explicit props when cart is not available', () => {
    mockUseCart.mockReturnValue({ cart: null });

    const onAdd = jest.fn();
    const onRemove = jest.fn();

    render(
      <ItemCounter id="item-1" quantity={3} onAdd={onAdd} onRemove={onRemove} />
    );

    expect(
      screen.getByRole('button', { name: 'Remove item' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render disabled state when no cart and no props', () => {
    mockUseCart.mockReturnValue({ cart: null });

    render(<ItemCounter id="item-1" />);

    expect(
      screen.getByRole('button', { name: 'Add item (loading)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add item (loading)' })
    ).toBeDisabled();
  });

  it('should call cart addToCart when add button is clicked with cart context', () => {
    mockUseCart.mockReturnValue({ cart: mockCart });
    mockCart.getItemQuantity.mockReturnValue(1);

    render(<ItemCounter id="item-1" />);

    const addButton = screen.getByRole('button', { name: 'Add item' });
    fireEvent.click(addButton);

    expect(mockCart.addToCart).toHaveBeenCalledWith('item-1');
  });

  it('should call cart removeFromCart when remove button is clicked with cart context', () => {
    mockUseCart.mockReturnValue({ cart: mockCart });
    mockCart.getItemQuantity.mockReturnValue(1);

    render(<ItemCounter id="item-1" />);

    const removeButton = screen.getByRole('button', { name: 'Remove item' });
    fireEvent.click(removeButton);

    expect(mockCart.removeFromCart).toHaveBeenCalledWith('item-1');
  });

  it('should call custom onAdd when add button is clicked with explicit props', () => {
    mockUseCart.mockReturnValue({ cart: null });
    const onAdd = jest.fn();

    render(
      <ItemCounter
        id="item-1"
        quantity={1}
        onAdd={onAdd}
        onRemove={jest.fn()}
      />
    );

    const addButton = screen.getByRole('button', { name: 'Add item' });
    fireEvent.click(addButton);

    expect(onAdd).toHaveBeenCalledWith('item-1');
  });

  it('should call custom onRemove when remove button is clicked with explicit props', () => {
    mockUseCart.mockReturnValue({ cart: null });
    const onRemove = jest.fn();

    render(
      <ItemCounter
        id="item-1"
        quantity={1}
        onAdd={jest.fn()}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByRole('button', { name: 'Remove item' });
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith('item-1');
  });

  it('should use provided quantity when cart is not available', () => {
    mockUseCart.mockReturnValue({ cart: null });

    render(
      <ItemCounter
        id="item-1"
        quantity={5}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
