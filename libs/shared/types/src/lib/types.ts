// Re-export all types from separate files
export * from './base-types';
export * from './restaurant-types';
export * from './menu-types';
export * from './cart-types';
export * from './ui-types';
export * from './context-types';

// =====================
// Types that depend on multiple other types
// =====================
// These types have complex dependencies and are kept in the main file
// for now as they may need special handling or are used across multiple domains
