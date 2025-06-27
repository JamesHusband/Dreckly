export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Cuisine {
  name: string;
  icon:
    | 'PieChart'
    | 'Fish'
    | 'Utensils'
    | 'Soup'
    | 'Pizza'
    | 'Hamburger'
    | 'Cake'
    | 'Salad';
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  featured: boolean;
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
