import type { MenuItem, Cart } from './base-types';
import type { Restaurant } from './restaurant-types';
import type { MenuCategory } from './base-types';

// =====================
// Core Cart Types
// =====================
export type CartState = {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
};

export interface CartActions {
  // Core cart operations
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;

  // Cart queries
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => CartItem[];

  // Computed values
  itemCount: () => number;
  totalItems: () => number;

  // Order management
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
  setCurrentRestaurant: (restaurant: Restaurant) => void;
}

// Cart item with quantity (used consistently across the app)
export interface CartItem extends MenuItem {
  quantity: number;
}

export type CartStore = CartState & CartActions;

// =====================
// Cart Actions
// =====================

// =====================
// Cart Store & Hook Return
// =====================

export interface UseCartReturn extends CartState {
  // Cart operations
  addToCart: (itemId: string, restaurant?: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (itemId: string, quantity: number) => void;

  // Cart queries
  getItemQuantity: (itemId: string) => number;
  getCartItems: () => CartItem[];

  // Order management
  startNewOrder: (restaurant: Restaurant, itemId?: string) => void;
  setCurrentRestaurant: (restaurant: Restaurant) => void;

  // Computed values as properties (not functions)
  itemCount: number;
  totalItems: number;
}

// =====================
// Cart Calculations
// =====================

export interface CartCalculationResult {
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  hasCartItems: boolean;
  itemCount: number;
  totalItems: number;
}

// =====================
// Cart Component Props
// =====================
export interface CartItemProps {
  item: MenuItem;
  quantity: number;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export interface GetCartTotalsParams {
  cart: Record<string, number>;
  restaurant: CartRestaurant;
  serviceFee?: number;
}

// Slim version of Restaurant for MenuCartSidebar
export interface CartSidebarProps {
  name: string;
  menu: MenuCategory[];
  deliveryFee: number;
  minimumOrder: number;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export interface CartCountProps {
  className?: string;
}

export interface ItemCounterProps {
  id: string;
  onAdd?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
  quantity?: number;
}

// =====================
// Cart State Management
// =====================
export interface PendingAction {
  itemId: string;
  restaurant: Restaurant;
  action?: 'add' | 'remove';
  timestamp?: number;
}

// Minimal shape for restaurant used in cart calculations
export type CartRestaurant = {
  name: string;
  menu: MenuCategory[];
  deliveryFee: number;
  minimumOrder: number;
};
