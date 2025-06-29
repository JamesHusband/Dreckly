import type { Meta, StoryObj } from '@storybook/react';
import { MenuCartItem } from './MenuCartItem';

const mockItem = {
  id: 'item1',
  name: 'Spring Rolls',
  description: 'Crispy rolls',
  price: 4.5,
  image: '',
  quantity: 1,
};

const meta: Meta<typeof MenuCartItem> = {
  title: 'Menu/MenuCartItem',
  component: MenuCartItem,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MenuCartItem>;

export const Default: Story = {
  args: {
    item: mockItem,
    quantity: 1,
    onAdd: () => {
      console.log('add');
    },
    onRemove: () => {
      console.log('remove');
    },
  },
};
