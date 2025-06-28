import type { MenuItem, MenuCategory, Cart } from './base-types';

// =====================
// Menu Component Props
// =====================
export interface MenuProps {
  name: string;
  items: MenuItem[];
  menuIndex: number;
  menu: MenuCategory[];
}

export interface MenuCategoryProps {
  category: MenuCategory;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
  isLast?: boolean;
  restaurantName: string;
}
