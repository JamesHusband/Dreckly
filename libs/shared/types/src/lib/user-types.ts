import { Address } from './base-types';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  passwordHash: string;
  favouriteRestaurants?: string[];
  orderHistory?: string[];
  createdAt: string;
}
