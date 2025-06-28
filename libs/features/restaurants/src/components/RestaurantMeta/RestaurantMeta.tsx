'use client';

import React from 'react';
import { Star, Clock, Truck, MapPin } from 'lucide-react';
import { RestaurantMetaProps } from '@dreckly/types';
// import { formatPrice } from '@dreckly/utils';

export function formatPrice(value: number) {
  return `£${value}`;
}

export const RestaurantMeta: React.FC<RestaurantMetaProps> = ({
  name,
  cuisine,
  description,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  address,
  variant = 'card',
}) => {
  const isHeader = variant === 'header';
  return (
    <div className={isHeader ? 'text-white space-y-2' : 'p-4'}>
      {isHeader ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
          {description && <p className="text-lg opacity-90">{description}</p>}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              {reviewCount !== undefined && (
                <span className="opacity-75">({reviewCount} reviews)</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>{formatPrice(deliveryFee)} delivery</span>
            </div>
            {address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-semibold">{name}</h3>
              {cuisine && <p className="text-sm text-gray-600">{cuisine}</p>}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              <span>{formatPrice(deliveryFee)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
