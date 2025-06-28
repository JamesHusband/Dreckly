import type { MenuCategory } from './base-types';

// =====================
// Restaurant Types
// =====================
export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image?: string;
  coverImage?: string;
  featured: boolean;
  minimumOrder: number;
  description?: string;
  address?: string;
  reviewCount?: number;
  menu: MenuCategory[];
}

export interface RestaurantMetaProps {
  name: string;
  cuisine?: string;
  description?: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee: number;
  address?: string;
  variant?: 'card' | 'header';
}

export interface RestaurantMenuProps {
  restaurant: Restaurant;
}
