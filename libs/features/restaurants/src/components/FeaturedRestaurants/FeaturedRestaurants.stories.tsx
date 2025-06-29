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
    featured: true,
    minimumOrder: 15,
    menu: [],
  },
];

const meta: Meta<typeof RestaurantCard> = {
  title: 'Restaurants/FeaturedRestaurants',
  component: RestaurantCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  render: () => (
    <div>
      <h2 className="text-3xl font-bold mb-8">Featured restaurants</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {mockRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  ),
};
