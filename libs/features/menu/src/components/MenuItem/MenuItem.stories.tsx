import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const mockItems = [
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
];

const mockMenu = [
  { name: 'Starters', items: mockItems },
  { name: 'Mains', items: [] },
];

const meta: Meta<typeof MenuItem> = {
  title: 'Menu/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    name: 'Starters',
    items: mockItems,
    menuIndex: 0,
    menu: mockMenu,
  },
};
