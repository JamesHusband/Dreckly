import type { Meta, StoryObj } from '@storybook/react';
import { ItemCounter } from './ItemCounter';

const meta: Meta<typeof ItemCounter> = {
  title: 'UI Kit/ItemCounter',
  component: ItemCounter,
};

export default meta;

type Story = StoryObj<typeof ItemCounter>;

export const Default: Story = {
  args: {
    id: 'item-1',
    quantity: 2,
    onAdd: () => {
      console.log('Add');
    },
    onRemove: () => {
      console.log('Remove');
    },
  },
};
