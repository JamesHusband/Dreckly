import { Restaurant } from '@dreckly/types';

export async function getRestaurant(id: string): Promise<Restaurant> {
  const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Restaurant>;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  // Mock data - in a real app this would come from a database
  return [
    {
      id: 1,
      name: 'The Cornish Pasty Co.',
      cuisine: 'Traditional Cornish',
      rating: 4.8,
      deliveryTime: '25-40 min',
      deliveryFee: 2.99,
      image: '/placeholder.svg?height=200&width=300',
      featured: true,
    },
    {
      id: 2,
      name: "Fisherman's Catch",
      cuisine: 'Fish & Chips',
      rating: 4.6,
      deliveryTime: '30-45 min',
      deliveryFee: 3.49,
      image: '/placeholder.svg?height=200&width=300',
      featured: true,
    },
    {
      id: 3,
      name: 'Kernow Kitchen',
      cuisine: 'Modern British',
      rating: 4.7,
      deliveryTime: '35-50 min',
      deliveryFee: 2.49,
      image: '/placeholder.svg?height=200&width=300',
      featured: false,
    },
    {
      id: 4,
      name: 'Seaside Spice',
      cuisine: 'Indian',
      rating: 4.5,
      deliveryTime: '20-35 min',
      deliveryFee: 2.99,
      image: '/placeholder.svg?height=200&width=300',
      featured: false,
    },
    {
      id: 5,
      name: 'Pizza Porthcurno',
      cuisine: 'Italian',
      rating: 4.4,
      deliveryTime: '25-40 min',
      deliveryFee: 3.99,
      image: '/placeholder.svg?height=200&width=300',
      featured: false,
    },
    {
      id: 6,
      name: 'The Cornish Creamery',
      cuisine: 'Desserts',
      rating: 4.9,
      deliveryTime: '15-30 min',
      deliveryFee: 1.99,
      image: '/placeholder.svg?height=200&width=300',
      featured: false,
    },
  ];
}
