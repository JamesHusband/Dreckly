import type { Meta, StoryObj } from '@storybook/react';
import { RestaurantMeta } from './RestaurantMeta';

const meta: Meta<typeof RestaurantMeta> = {
  title: 'Restaurants/RestaurantMeta',
  component: RestaurantMeta,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof RestaurantMeta>;

export const Default: Story = {
  args: {
    name: 'Mock Restaurant',
    cuisine: 'Asian',
    description: 'A great place for noodles and more.',
    rating: 4.5,
    reviewCount: 120,
    deliveryTime: '30-40 minutes',
    deliveryFee: 2.5,
    address: '123 Main St, City',
    variant: 'card',
  },
};
