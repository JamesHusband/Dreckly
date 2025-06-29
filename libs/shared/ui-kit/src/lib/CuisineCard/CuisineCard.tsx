import { Cuisine, CuisineCardProps } from '@dreckly/types';
import React from 'react';

export const CuisineCard = ({
  name,
  iconComponent: Icon,
  onClick,
  isSelected = false,
}: CuisineCardProps) => (
  <button
    onClick={onClick}
    className={`bg-white hover:shadow-md transition-shadow cursor-pointer text-center p-4 h-24 flex flex-col items-center justify-center rounded-lg border ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
    }`}
  >
    <div className="mb-2">
      {Icon && <Icon className="h-8 w-8 text-gray-700" />}
    </div>
    <p className="text-sm font-medium leading-tight">{name}</p>
  </button>
);
