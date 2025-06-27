'use client';

// import { useCartCount } from '../../hooks/useCartCount';

interface CartCountProps {
  className?: string;
}

export const CartCount = ({ className = '' }: CartCountProps) => {
  // const { count, isVisible, isLoading } = useCartCount();

  const isLoading = false;
  const isVisible = true;
  const count = 3;

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
