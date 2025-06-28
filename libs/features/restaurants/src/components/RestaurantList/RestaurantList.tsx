'use client';

import { RestaurantCard } from '../RestaurantCard';
import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Restaurant } from '@dreckly/types';
import { useCuisineFilter } from '@dreckly/home';

export const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);
  const { selectedCuisine, setSelectedCuisine } = useCuisineFilter();

  useEffect(() => {
    if (isInitialized.current) return;

    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const allRestaurants = await response.json();
        setRestaurants(allRestaurants);
        isInitialized.current = true;
      } catch (error) {
        console.error('Failed to load restaurants:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const filteredRestaurants = selectedCuisine
    ? restaurants.filter((restaurant) => restaurant.cuisine === selectedCuisine)
    : restaurants;

  const handleClearFilter = () => {
    setSelectedCuisine(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {selectedCuisine && (
        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-orange-800">
              Filtered by: {selectedCuisine}
            </span>
          </div>
          <button
            onClick={handleClearFilter}
            className="text-orange-600 hover:text-orange-800 p-1"
            aria-label="Clear filter"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>

      {filteredRestaurants.length === 0 && !selectedCuisine && (
        <div className="text-center py-12">
          <p className="text-gray-600">No restaurants found.</p>
        </div>
      )}

      {filteredRestaurants.length === 0 && selectedCuisine && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No restaurants found for {selectedCuisine} cuisine.
          </p>
          <button
            onClick={handleClearFilter}
            className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};
