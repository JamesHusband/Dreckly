import type { Meta, StoryObj } from '@storybook/react';
import { EmptyCart } from './EmptyCart';

const meta: Meta<typeof EmptyCart> = {
  title: 'Cart/EmptyCart',
  component: EmptyCart,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof EmptyCart>;

export const Default: Story = {};
