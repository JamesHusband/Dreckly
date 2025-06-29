'use client';

import { useCartCount } from '@dreckly/cart';
import { CartCountProps } from '@dreckly/types';

export const CartCount = ({ className = '' }: CartCountProps) => {
  const { count, isVisible, isLoading } = useCartCount();

  return (
    <span
      className={`absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center ${
        isLoading || !isVisible ? 'hidden' : ''
      } ${className}`}
    >
      {count}
    </span>
  );
};
