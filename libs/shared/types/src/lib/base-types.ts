// =====================
// Base/Primitive Types
// =====================
export interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
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

export interface Cart {
  [itemId: string]: number;
}
