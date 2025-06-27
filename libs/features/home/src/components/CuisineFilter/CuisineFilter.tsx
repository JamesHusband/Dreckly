'use client';

import { Cuisine } from '@dreckly/types';
import { CuisineCard } from '@dreckly/ui-kit';
import React, { useEffect, useState, createContext, useContext } from 'react';
import {
  PieChart,
  Fish,
  Utensils,
  Soup,
  Pizza,
  Hamburger,
  Cake,
  Salad,
} from 'lucide-react';

const cuisineIcons: Record<Cuisine['icon'], React.ElementType> = {
  PieChart,
  Fish,
  Utensils,
  Soup,
  Pizza,
  Hamburger,
  Cake,
  Salad,
};

interface CuisineContextType {
  selectedCuisine: string | null;
  setSelectedCuisine: (cuisine: string | null) => void;
}

const CuisineContext = createContext<CuisineContextType | undefined>(undefined);

export const useCuisineFilter = () => {
  const context = useContext(CuisineContext);
  if (!context) {
    throw new Error('useCuisineFilter must be used within a CuisineProvider');
  }
  return context;
};

export const CuisineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  return (
    <CuisineContext.Provider value={{ selectedCuisine, setSelectedCuisine }}>
      {children}
    </CuisineContext.Provider>
  );
};

export const CuisineFilter = () => {
  const [cuisineTypes, setCuisineTypes] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { selectedCuisine, setSelectedCuisine } = useCuisineFilter();

  useEffect(() => {
    const loadCuisines = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cuisines');
        if (!response.ok) {
          throw new Error('Failed to fetch cuisines');
        }
        const cuisines = await response.json();
        setCuisineTypes(cuisines);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadCuisines();
  }, []);

  // const handleCuisineClick = (cuisineName: string) => {
  //   const newSelection = selectedCuisine === cuisineName ? null : cuisineName;
  //   setSelectedCuisine(newSelection);
  // };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            What are you craving?
          </h2>
          <div className="text-center">Loading cuisines...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            What are you craving?
          </h2>
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          What are you craving?
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
          {cuisineTypes.map((cuisine: Cuisine): React.JSX.Element => {
            const Icon = cuisineIcons[cuisine.icon];
            return (
              <CuisineCard
                key={cuisine.name}
                {...cuisine}
                iconComponent={Icon}
                // onClick={() => handleCuisineClick(cuisine.name)}
                // isSelected={selectedCuisine === cuisine.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
