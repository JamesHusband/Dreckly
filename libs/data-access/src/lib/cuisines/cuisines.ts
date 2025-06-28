import { Cuisine } from '@dreckly/types';

export async function getCuisines(): Promise<Cuisine[]> {
  // Mock data - in a real app this would come from a database
  return [
    { name: 'Cornish', icon: 'PieChart' },
    { name: 'Fish & Chips', icon: 'Fish' },
    { name: 'Indian', icon: 'Utensils' },
    { name: 'Chinese', icon: 'Soup' },
    { name: 'Italian', icon: 'Pizza' },
    { name: 'Burgers', icon: 'Hamburger' },
    { name: 'Desserts', icon: 'Cake' },
    { name: 'Healthy', icon: 'Salad' },
  ];
}
