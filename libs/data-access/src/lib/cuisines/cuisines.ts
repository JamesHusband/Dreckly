import { Cuisine } from '@dreckly/types';

export const getCuisines = async (): Promise<Cuisine[]> => {
  // TODO: replace Mock data with actual DB data
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
};
