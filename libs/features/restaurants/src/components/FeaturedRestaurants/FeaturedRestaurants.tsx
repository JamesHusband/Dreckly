'use client';

import { getRestaurants } from '@dreckly/data-access';
import { Restaurant } from '@dreckly/types';
import { RestaurantCard } from '../RestaurantCard';
import { useEffect, useState } from 'react';

export const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const allRestaurants = await getRestaurants();
        setRestaurants(allRestaurants);
      } catch (error) {
        console.error('Failed to load restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  if (loading) {
    return <div>Loading featured restaurants...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Featured restaurants</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {restaurants
          .filter((r) => r.featured)
          .map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
      </div>
    </>
  );
};
