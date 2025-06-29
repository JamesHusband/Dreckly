import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantCard } from './RestaurantCard';

const mockRestaurant = {
  id: 1,
  name: 'Mock Restaurant',
  cuisine: 'Asian',
  rating: 4.5,
  deliveryTime: '30-40 minutes',
  deliveryFee: 2.5,
  featured: true,
};

const meta: Meta<typeof RestaurantCard> = {
  title: 'Restaurants/RestaurantCard',
  component: RestaurantCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  args: {
    ...mockRestaurant,
  },
};
