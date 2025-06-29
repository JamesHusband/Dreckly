import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCard } from '../RestaurantCard/RestaurantCard';

const mockRestaurants = [
  {
    id: 1,
    name: 'Mock Restaurant 1',
    cuisine: 'Asian',
    rating: 4.5,
    deliveryTime: '30-40 minutes',
    deliveryFee: 2.5,
    featured: true,
    minimumOrder: 10,
    menu: [],
  },
  {
    id: 2,
    name: 'Mock Restaurant 2',
    cuisine: 'Italian',
    rating: 4.2,
    deliveryTime: '20-30 minutes',
    deliveryFee: 1.5,
    featured: false,
    minimumOrder: 15,
    menu: [],
  },
];

const meta: Meta<typeof RestaurantCard> = {
  title: 'Restaurants/RestaurantList',
  component: RestaurantCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
    </div>
  ),
};
