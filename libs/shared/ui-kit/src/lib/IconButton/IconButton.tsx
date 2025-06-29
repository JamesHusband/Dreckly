import { ReactNode } from 'react';
import { IconButtonProps } from '@dreckly/types';

export const IconButton = ({
  icon,
  variant = 'primary',
  size = 'md',
  onClick,
  'aria-label': ariaLabel,
  disabled = false,
}: IconButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const handleClick = disabled ? undefined : onClick;

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
