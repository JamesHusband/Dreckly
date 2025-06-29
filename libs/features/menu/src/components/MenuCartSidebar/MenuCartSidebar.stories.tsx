import type { Meta, StoryObj } from '@storybook/react';
import { MenuCartSidebar } from './MenuCartSidebar';

const mockMenu = [
  {
    name: 'Starters',
    items: [
      {
        id: 'item1',
        name: 'Spring Rolls',
        description: 'Crispy rolls',
        price: 4.5,
        image: '',
        quantity: 1,
      },
      {
        id: 'item2',
        name: 'Soup',
        description: 'Hot soup',
        price: 3.0,
        image: '',
        quantity: 1,
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
        quantity: 1,
      },
    ],
  },
];

const meta: Meta<typeof MenuCartSidebar> = {
  title: 'Menu/MenuCartSidebar',
  component: MenuCartSidebar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MenuCartSidebar>;

export const Default: Story = {
  args: {
    name: 'Mock Restaurant',
    minimumOrder: 10,
    deliveryFee: 2.5,
    menu: mockMenu,
    cart: {
      item1: 2,
      item2: 1,
      item3: 0,
    },
    onAddToCart: () => {
      console.log('add to cart');
    },
    onRemoveFromCart: () => {
      console.log('remove from cart');
    },
  },
};
