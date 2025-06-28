import * as React from 'react';

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
};

export interface CartActions {
  itemCount: () => number;
  totalItems: () => number;
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => Array<{ item: MenuItem; quantity: number }>;
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
}

export interface ComputedCartState {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  itemCount: number;
  totalItems: number;
}

export interface UseCartReturn {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
  // Cart actions
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => Array<{ item: MenuItem; quantity: number }>;
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
  // Computed values
  itemCount: number;
  totalItems: number;
}

export interface RestaurantActions {
  setCurrentRestaurant: (restaurant: Restaurant) => void;
}

export type CartStore = CartState & CartActions & RestaurantActions;

// Context Types
export interface CuisineContextType {
  selectedCuisine: string | null;
  setSelectedCuisine: (cuisine: string | null) => void;
}

// Cart Utility Types
export interface CartItemWithDetails extends MenuItem {
  quantity: number;
}

export interface CartCalculationResult {
  cartItemsList: CartItemWithDetails[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  hasCartItems: boolean;
  itemCount: number;
  totalItems: number;
}

export interface CartCalculationParams {
  cart: Cart;
  restaurant: Restaurant;
  serviceFee?: number;
}

// Modal Types
export interface PendingAction {
  itemId: string;
  restaurant: Restaurant;
}

// Cart Component Props
export interface CartCountProps {
  className?: string;
}

export interface CartSidebarProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  currentRestaurant: Restaurant;
}

export interface MenuCartItemProps {
  item: MenuItem;
  quantity: number;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export interface MenuCartSidebarProps {
  restaurant: Restaurant;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
}

// Menu Component Props
export interface RestaurantMenuProps {
  restaurant: Restaurant;
}

// UI Kit Component Props
export interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface CuisineCardProps extends Cuisine {
  iconComponent: React.ElementType;
  onClick?: () => void;
  isSelected?: boolean;
}

export interface DropdownMenuItem {
  href: string;
  label: string;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  items: DropdownMenuItem[];
  onItemClick?: () => void;
  className?: string;
}

export interface LogoProps {
  textColor?: 'grey' | 'white';
}

export interface NavButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showText?: boolean;
  text?: string;
}

export interface MenuCategoryProps {
  category: MenuCategory;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
  isLast?: boolean;
  restaurantName: string;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  'aria-label': string;
  disabled?: boolean;
}

export interface ItemCounterProps {
  id: string;
  onAdd?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
  quantity?: number;
}
