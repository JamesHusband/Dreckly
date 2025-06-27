'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../useCart';

export const useCartCount = () => {
  const { cart, isClient } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !isClient || !cart) {
    return {
      count: 0,
      isVisible: false,
      isLoading: true,
    };
  }

  const count = cart.totalItems;
  const isVisible = count > 0;

  return {
    count,
    isVisible,
    isLoading: false,
  };
};
