'use client';

import { useState, useEffect } from 'react';
import { getRestaurant } from '@dreckly/data-access';
import { Restaurant } from '@dreckly/types';

export const useRestaurantLoader = () => {
  const [isClient, setIsClient] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadRestaurant = async (id: string) => {
    if (!isClient) return;

    setLoading(true);
    setError(null);

    try {
      const restaurantData = await getRestaurant(id);
      setRestaurant(restaurantData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load restaurant'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    isClient,
    restaurant,
    loading,
    error,
    loadRestaurant,
  };
};
