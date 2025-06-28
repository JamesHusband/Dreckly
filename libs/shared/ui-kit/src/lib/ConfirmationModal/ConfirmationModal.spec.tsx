import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    title: 'Test Title',
    message: 'Test Message',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Message')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should render with default button text', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should render with custom button text', () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        confirmText="Yes, proceed"
        cancelText="No, go back"
      />
    );
    expect(
      screen.getByRole('button', { name: 'No, go back' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Yes, proceed' })
    ).toBeInTheDocument();
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<ConfirmationModal {...defaultProps} onCancel={onCancel} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const onConfirm = jest.fn();
    render(<ConfirmationModal {...defaultProps} onConfirm={onConfirm} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have proper modal structure', () => {
    render(<ConfirmationModal {...defaultProps} />);

    const backdrop = screen.getByRole('presentation');
    expect(backdrop).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-50'
    );

    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveClass('bg-white', 'rounded-lg');
  });

  it('should have proper heading structure', () => {
    render(<ConfirmationModal {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Title');
    expect(heading).toHaveClass('text-lg', 'font-semibold');
  });

  it('should display the message correctly', () => {
    render(<ConfirmationModal {...defaultProps} />);

    const message = screen.getByText('Test Message');
    expect(message).toHaveClass('text-gray-600');
  });

  it('should have proper button styling', () => {
    render(<ConfirmationModal {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });

    expect(cancelButton).toHaveClass('border', 'border-gray-300');
    expect(confirmButton).toHaveClass('bg-orange-500', 'text-white');
  });
});
