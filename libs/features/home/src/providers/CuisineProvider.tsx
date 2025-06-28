'use client';

import React, { useState, createContext } from 'react';
import { CuisineContextType } from '@dreckly/types';

export const CuisineContext = createContext<CuisineContextType | undefined>(
  undefined
);

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
