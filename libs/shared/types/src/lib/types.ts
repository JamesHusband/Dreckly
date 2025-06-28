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

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  ageRestricted?: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

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

export interface Cart {
  [itemId: string]: number;
}

export interface MenuItemProps {
  name: string;
  items: MenuItem[];
  menuIndex: number;
  menu: MenuCategory[];
}

export type CartState = {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  menuItems: MenuItem[];
};
