import type { MenuItem, Cart } from './base-types';
import type { Restaurant } from './restaurant-types';

// =====================
// Core Cart Types
// =====================
export type CartState = {
  cart: Record<string, number>;
  currentRestaurant: Restaurant | null;
};

// Cart item with quantity (used consistently across the app)
export interface CartItem extends MenuItem {
  quantity: number;
}

// =====================
// Cart Actions
// =====================
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

// =====================
// Cart Store & Hook Return
// =====================
export type CartStore = CartState & CartActions;

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
export interface CartCalculationParams {
  cart: Cart;
  restaurant: Restaurant;
  serviceFee?: number;
}

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

export interface CartSidebarProps {
  restaurant: Restaurant;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  currentRestaurant: Restaurant;
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
  action: 'add' | 'remove';
  timestamp: number;
}
