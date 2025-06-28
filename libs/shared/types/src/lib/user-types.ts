interface Address {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
}
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
