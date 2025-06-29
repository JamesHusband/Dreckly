import type { Meta, StoryObj } from '@storybook/react';
import { CartLoading } from './CartLoading';

const meta: Meta<typeof CartLoading> = {
  title: 'Cart/CartLoading',
  component: CartLoading,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CartLoading>;

export const Default: Story = {};
