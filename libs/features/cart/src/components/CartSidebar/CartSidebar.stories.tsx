import type { Meta, StoryObj } from '@storybook/react';
import { CartSidebar } from './CartSidebar';

const mockRestaurant = {
  id: 1,
  name: 'Mock Restaurant',
  minimumOrder: 10,
  deliveryFee: 2.5,
  cuisine: 'Asian',
  rating: 4.5,
  deliveryTime: '30-40 minutes',
  featured: false,
  menu: [],
};

const mockCart = {
  item1: 2,
  item2: 1,
};

const meta: Meta<typeof CartSidebar> = {
  title: 'Cart/CartSidebar',
  component: CartSidebar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CartSidebar>;

export const Default: Story = {
  args: {
    restaurant: mockRestaurant,
    cart: mockCart,
  },
};
