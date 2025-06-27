'use client';

// import { getRestaurants } from '@dreckly/data-access';
// import { Restaurant } from '@dreckly/types';
import { RestaurantCard } from '../RestaurantCard';
import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Restaurant } from '@dreckly/types';
// import { useCuisineFilter } from '@dreckly/feature-home';

export const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);
  // const { selectedCuisine, setSelectedCuisine } = useCuisineFilter();

  useEffect(() => {
    if (hasLoaded.current) return;

    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const allRestaurants = await response.json();
        setRestaurants(allRestaurants);
        hasLoaded.current = true;
      } catch (error) {
        console.error('Failed to load restaurants:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // const filteredRestaurants = selectedCuisine
  //   ? restaurants.filter((restaurant) => restaurant.cuisine === selectedCuisine)
  //   : restaurants;

  // const handleClearFilter = () => {
  //   setSelectedCuisine(null);
  // };

  if (loading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <>
      {/* {selectedCuisine && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleClearFilter}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            Clear filter
          </button>
        </div>
      )} */}
      <div className="mb-8">
        {/* <h2 className="text-3xl font-bold">
          {selectedCuisine
            ? `${selectedCuisine} restaurants`
            : 'All restaurants'}
        </h2> */}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </>
  );
};
