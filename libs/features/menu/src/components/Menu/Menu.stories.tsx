import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';

const mockRestaurant = {
  id: 1,
  name: 'Mock Restaurant',
  minimumOrder: 10,
  deliveryFee: 2.5,
  cuisine: 'Asian',
  rating: 4.5,
  deliveryTime: '30-40 minutes',
  featured: false,
  menu: [
    {
      name: 'Starters',
      items: [
        {
          id: 'item1',
          name: 'Spring Rolls',
          description: 'Crispy rolls',
          price: 4.5,
          image: '',
          quantity: 0,
        },
        {
          id: 'item2',
          name: 'Soup',
          description: 'Hot soup',
          price: 3.0,
          image: '',
          quantity: 0,
        },
      ],
    },
    {
      name: 'Mains',
      items: [
        {
          id: 'item3',
          name: 'Noodles',
          description: 'Stir fried noodles',
          price: 8.0,
          image: '',
          quantity: 0,
        },
      ],
    },
  ],
};

const meta: Meta<typeof Menu> = {
  title: 'Menu/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    restaurant: mockRestaurant,
  },
};
