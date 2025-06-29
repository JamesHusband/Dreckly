import type { Meta, StoryObj } from '@storybook/react';
import { MenuHeader } from './MenuHeader';

const meta: Meta<typeof MenuHeader> = {
  title: 'Menu/MenuHeader',
  component: MenuHeader,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MenuHeader>;

export const Default: Story = {
  args: {
    name: 'Mock Restaurant',
    description: 'A wonderful place for mock food.',
    rating: 4.7,
    reviewCount: 123,
    deliveryTime: '30-40 min',
    deliveryFee: 2.5,
    address: '123 Mock St, Mocksville',
    menu: [],
    id: 1,
    cuisine: 'Mock Cuisine',
    featured: false,
    minimumOrder: 10,
  },
};
