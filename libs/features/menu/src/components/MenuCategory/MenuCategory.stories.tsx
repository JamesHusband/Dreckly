import type { Meta, StoryObj } from '@storybook/react';
import { MenuCategory } from './MenuCategory';

const mockCategory = {
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
};

const meta: Meta<typeof MenuCategory> = {
  title: 'Menu/MenuCategory',
  component: MenuCategory,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MenuCategory>;

export const Default: Story = {
  args: {
    category: mockCategory,
    cart: {},
    onAddToCart: () => {
      console.log('add to cart');
    },
    onRemoveFromCart: () => {
      console.log('remove from cart');
    },
    isLast: false,
    restaurantName: 'Mock Restaurant',
  },
};
